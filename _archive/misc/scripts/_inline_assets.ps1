param(
    [Parameter(Mandatory=$true)][string]$RepoRoot,
    [Parameter(Mandatory=$true)][string]$OutputFile
)

$ErrorActionPreference = 'Stop'

$indexPath = Join-Path $RepoRoot 'index.html'
Write-Host ("Reading: " + $indexPath)
$html = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
$origLen = $html.Length
Write-Host ("Original HTML size: " + $origLen + " chars")

$mimeMap = @{
    '.webp' = 'image/webp';
    '.png'  = 'image/png';
    '.jpg'  = 'image/jpeg';
    '.jpeg' = 'image/jpeg';
    '.gif'  = 'image/gif';
    '.svg'  = 'image/svg+xml';
    '.webm' = 'video/webm';
    '.mp4'  = 'video/mp4';
    '.ico'  = 'image/x-icon';
}

function ConvertTo-DataUri {
    param([string]$RelPath, [string]$Root)
    $abs = Join-Path $Root $RelPath
    if (-not (Test-Path -LiteralPath $abs)) {
        Write-Warning ("MISSING: " + $RelPath)
        return $null
    }
    $ext = [System.IO.Path]::GetExtension($abs).ToLower()
    if (-not $mimeMap.ContainsKey($ext)) {
        Write-Warning ("UNKNOWN MIME: " + $RelPath)
        return $null
    }
    $mime = $mimeMap[$ext]
    $bytes = [System.IO.File]::ReadAllBytes($abs)
    $b64 = [Convert]::ToBase64String($bytes)
    return ("data:" + $mime + ";base64," + $b64)
}

# Regex: match src="..." or href="..." where value starts with img/, assets/, knowledge-base/, or ends with .webm
$pattern = '(?:src|href)="(img/[^"]+|assets/[^"]+|knowledge-base/[^"]+|[^"]+\.webm)"'
$foundMatches = [regex]::Matches($html, $pattern)

$unique = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($m in $foundMatches) {
    $val = $m.Groups[1].Value
    if ($val -match '^https?://') { continue }
    [void]$unique.Add($val)
}
Write-Host ("Unique local assets found: " + $unique.Count)

$replacements = @{}
$totalBytes = 0
$skipped = 0
foreach ($rel in $unique) {
    $dataUri = ConvertTo-DataUri -RelPath $rel -Root $RepoRoot
    if ($null -eq $dataUri) { $skipped++; continue }
    $replacements[$rel] = $dataUri
    $totalBytes += $dataUri.Length
}
Write-Host ("Inlined: " + $replacements.Count + " assets, " + $totalBytes + " base64 chars")
if ($skipped -gt 0) { Write-Host ("Skipped: " + $skipped) }

# Apply replacements longest-first to avoid substring clashes
$sortedKeys = $replacements.Keys | Sort-Object -Property Length -Descending

$sb = New-Object System.Text.StringBuilder $html
foreach ($key in $sortedKeys) {
    $search = '"' + $key + '"'
    $replace = '"' + $replacements[$key] + '"'
    [void]$sb.Replace($search, $replace)
}
$result = $sb.ToString()

# Small banner
$ts = Get-Date -Format 'yyyy-MM-dd HH:mm'
$banner = "`n<!-- PORTABLE SINGLE-FILE BUILD: all 65 images and hero video inlined as data: URIs. Inter font loads from Google Fonts (needs internet for perfect look). Built " + $ts + ". -->`n"
$result = [regex]::Replace($result, '(?i)(<body[^>]*>)', '$1' + $banner)

[System.IO.File]::WriteAllText($OutputFile, $result, (New-Object System.Text.UTF8Encoding $true))
$finalSize = (Get-Item $OutputFile).Length
Write-Host ""
Write-Host ("==> Written: " + $OutputFile)
Write-Host ("    Size: " + [Math]::Round($finalSize / 1MB, 2) + " MB (" + $finalSize + " bytes)")
