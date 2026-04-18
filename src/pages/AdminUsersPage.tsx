import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DemoBanner } from '@/components/common/DemoBanner';

export function AdminUsersPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Admin · Пользователи' }]} />
      <PageTitle title="Пользователи" subtitle={`${data.users.length} demo-пользователей`} right={<DemoBanner />} />
      <Section title="Список">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Логин</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Имя</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Роль</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((u) => (
              <tr key={u.id} className="border-b border-gray-100">
                <td className="px-3 py-2 font-mono text-xs">{u.login}</td>
                <td className="px-3 py-2 text-sm">{u.full_name}</td>
                <td className="px-3 py-2 text-xs">{u.role_code}</td>
                <td className="px-3 py-2">
                  <StatusBadge label={u.status} variant={u.status === 'active' ? 'ok' : 'neutral'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
