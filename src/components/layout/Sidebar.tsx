import { NavLink } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';

interface NavItem {
  to: string;
  label: string;
  icon?: string;
  group: 'workspace' | 'reference' | 'admin' | 'locked';
  allowedFor?: string[]; // role codes; undefined = visible for all
}

const ITEMS: NavItem[] = [
  { to: '/', label: 'Главная', icon: '🏠', group: 'workspace' },
  { to: '/catalog', label: 'Каталог', icon: '📦', group: 'workspace' },
  { to: '/documents', label: 'Документы', icon: '📄', group: 'workspace' },
  { to: '/orders', label: 'Производственные задания', icon: '📝', group: 'workspace' },
  { to: '/samples', label: 'Заявки на образцы', icon: '📬', group: 'workspace' },
  { to: '/customers', label: 'Клиенты', icon: '👥', group: 'workspace' },

  { to: '/print/methods', label: 'Печать · справочник', icon: '🖨️', group: 'reference' },
  { to: '/print/check-mockup', label: 'Печать · валидатор макета', icon: '✅', group: 'reference' },
  { to: '/print/flf-registry', label: 'Печать · реестр ФЛФ', icon: '🗂', group: 'reference' },
  { to: '/carriers', label: 'Транспортные компании', icon: '🚚', group: 'reference' },

  { to: '/admin/users', label: 'Пользователи', icon: '⚙️', group: 'admin', allowedFor: ['admin'] },
  { to: '/admin/roles', label: 'Роли', icon: '⚙️', group: 'admin', allowedFor: ['admin'] },
  { to: '/admin/references', label: 'Справочники', icon: '⚙️', group: 'admin', allowedFor: ['admin'] },
  { to: '/admin/audit', label: 'Audit log', icon: '📜', group: 'admin', allowedFor: ['admin', 'director'] },

  { to: '/warehouse', label: 'Склад', icon: '🔒', group: 'locked' },
  { to: '/shifts', label: 'Смены', icon: '🔒', group: 'locked' },
  { to: '/analytics', label: 'Аналитика', icon: '🔒', group: 'locked' },
];

const GROUP_TITLES: Record<NavItem['group'], string> = {
  workspace: 'Workspace',
  reference: 'Reference',
  admin: 'Admin',
  locked: 'Phase 3 / Roadmap',
};

export function Sidebar() {
  const { currentRole } = useRole();
  const groups = (['workspace', 'reference', 'admin', 'locked'] as const).map((g) => ({
    key: g,
    items: ITEMS.filter((i) => i.group === g).filter(
      (i) => !i.allowedFor || i.allowedFor.includes(currentRole)
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 py-5 px-3 overflow-y-auto">
      <div className="px-3 pb-5 mb-4 border-b border-gray-100">
        <div className="text-lg font-bold text-brand-primary">TERMY</div>
        <div className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">Внутренняя система · Demo</div>
      </div>

      {groups.map((g) => (
        <div key={g.key} className="mb-5">
          <div className="text-[10px] uppercase tracking-widest text-gray-400 px-3 mb-2">{GROUP_TITLES[g.key]}</div>
          <ul className="space-y-0.5">
            {g.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-brand-primary text-white font-medium'
                        : g.key === 'locked'
                          ? 'text-gray-500 hover:bg-gray-100'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="text-sm w-5 text-center">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
