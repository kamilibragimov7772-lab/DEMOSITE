type Variant = 'ok' | 'warn' | 'danger' | 'neutral' | 'info' | 'blocked';

const COLOR: Record<Variant, string> = {
  ok: 'bg-green-100 text-green-800 border-green-200',
  warn: 'bg-amber-100 text-amber-800 border-amber-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
  neutral: 'bg-gray-100 text-gray-700 border-gray-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  blocked: 'bg-violet-100 text-violet-800 border-violet-200',
};

export function StatusBadge({ label, variant = 'neutral' }: { label: string; variant?: Variant }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${COLOR[variant]}`}>
      {label}
    </span>
  );
}
