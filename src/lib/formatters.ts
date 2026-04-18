import { format, parseISO } from 'date-fns';

export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  try {
    return format(parseISO(iso), 'dd.MM.yyyy');
  } catch {
    return iso;
  }
}

export function fmtDateTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  try {
    return format(parseISO(iso), 'dd.MM.yyyy HH:mm');
  } catch {
    return iso;
  }
}

export function fmtNumber(v: number | null | undefined): string {
  if (v == null) return '—';
  return new Intl.NumberFormat('ru-RU').format(v);
}
