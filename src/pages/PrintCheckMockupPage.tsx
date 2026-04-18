import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MOCKUP_RULES, validateMockup } from '@/lib/mockupValidator';
import type { MockupValidationResult, MockupRuleId } from '@/types';
import { useAudit } from '@/context/AuditContext';
import { useRole } from '@/context/RoleContext';

export function PrintCheckMockupPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [results, setResults] = useState<MockupValidationResult[]>([]);
  const [manualChecks, setManualChecks] = useState<Record<MockupRuleId, boolean | null>>(
    Object.fromEntries(MOCKUP_RULES.map((r) => [r.id, null])) as Record<MockupRuleId, boolean | null>
  );
  const { append } = useAudit();
  const { currentUser } = useRole();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const r = await validateMockup(file);
    setResults(r);
  };

  const runFinalReport = () => {
    const combined = MOCKUP_RULES.map((rule) => {
      const auto = results.find((r) => r.rule_id === rule.id);
      const passed = rule.check === 'auto' ? (auto?.passed ?? null) : manualChecks[rule.id];
      return { rule, passed };
    });
    const pass = combined.filter((x) => x.passed === true).length;
    const fail = combined.filter((x) => x.passed === false).length;
    const manual = combined.filter((x) => x.passed === null).length;
    append({
      user_id: currentUser.id,
      user_login: currentUser.login,
      action: 'mockup.validate',
      object_type: 'Mockup',
      object_id: fileName ?? 'unknown',
      diff_before: null,
      diff_after: { passed: pass, failed: fail, manual },
    });
    alert(`Отчёт: ${pass} pass / ${fail} fail / ${manual} требует ручной проверки.\nЗаписано в audit log.`);
  };

  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Печать · валидатор макета' }]} />
      <PageTitle
        title="Валидатор макета СТМ"
        subtitle="12 правил из «Требования к шелкографии.md». Автопроверки — формат файла; остальное — ручная отметка."
      />

      <Section title="1. Загрузить макет">
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFile}
          className="block text-sm"
        />
        {fileName && (
          <div className="text-xs text-gray-500 mt-2">
            Файл: <span className="font-mono">{fileName}</span>
          </div>
        )}
        <div className="text-[11px] text-gray-400 mt-3">
          💡 Для демонстрации можно не загружать реальный файл — правила можно пройти через чек-боксы ниже.
        </div>
      </Section>

      <Section title="2. Чек-лист (12 правил)">
        <ul className="space-y-2">
          {MOCKUP_RULES.map((rule, idx) => {
            const auto = results.find((r) => r.rule_id === rule.id);
            const isAuto = rule.check === 'auto';
            const manualValue = manualChecks[rule.id];

            return (
              <li key={rule.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="text-sm text-gray-400 w-6 font-mono flex-shrink-0">{(idx + 1).toString().padStart(2, '0')}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{rule.label_ru}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{rule.description}</div>
                </div>
                <div className="flex-shrink-0">
                  {isAuto ? (
                    auto?.passed === true ? <StatusBadge label="✓ PDF" variant="ok" />
                    : auto?.passed === false ? <StatusBadge label="✗ не PDF" variant="danger" />
                    : <StatusBadge label="ждёт файла" variant="neutral" />
                  ) : (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setManualChecks((s) => ({ ...s, [rule.id]: true }))}
                        className={`px-2 py-1 text-xs rounded-md border ${manualValue === true ? 'bg-green-100 text-green-800 border-green-300' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
                        pass
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualChecks((s) => ({ ...s, [rule.id]: false }))}
                        className={`px-2 py-1 text-xs rounded-md border ${manualValue === false ? 'bg-red-100 text-red-800 border-red-300' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
                        fail
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <button
        onClick={runFinalReport}
        className="bg-brand-primary text-white px-4 py-2 rounded-md text-sm hover:bg-brand-primary/90"
      >
        Сформировать итоговый отчёт
      </button>
    </div>
  );
}
