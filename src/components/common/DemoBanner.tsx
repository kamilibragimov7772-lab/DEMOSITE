export function DemoBanner({ text = 'Demo data' }: { text?: string }) {
  return <span className="demo-banner" title="Это mock-данные, не из production">{text}</span>;
}
