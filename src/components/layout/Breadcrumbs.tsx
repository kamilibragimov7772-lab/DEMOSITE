import { Link } from 'react-router-dom';

interface Segment {
  label: string;
  to?: string;
}

export function Breadcrumbs({ segments }: { segments: Segment[] }) {
  return (
    <nav className="text-xs text-gray-500 mb-4">
      {segments.map((seg, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5 text-gray-300">›</span>}
          {seg.to ? (
            <Link to={seg.to} className="hover:text-brand-primary">{seg.label}</Link>
          ) : (
            <span className="text-gray-700">{seg.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
