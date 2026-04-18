import { useRole } from '@/context/RoleContext';
import type { RoleCode } from '@/types';

const ORDER: RoleCode[] = ['admin', 'director', 'rop', 'manager', 'accountant', 'secretary', 'designer', 'driver'];

export function RoleSwitcher() {
  const { currentRole, setRoleCode } = useRole();

  return (
    <div className="flex items-center gap-2">
      <span className="demo-banner">Demo</span>
      <label className="text-xs text-gray-500">Роль:</label>
      <select
        value={currentRole}
        onChange={(e) => setRoleCode(e.target.value as RoleCode)}
        className="text-sm px-2 py-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
      >
        {ORDER.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
