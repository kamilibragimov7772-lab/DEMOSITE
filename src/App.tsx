import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { CatalogListPage } from './pages/CatalogListPage';
import { SKUDetailPage } from './pages/SKUDetailPage';
import { DocumentsListPage } from './pages/DocumentsListPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { DocumentsExpiringPage } from './pages/DocumentsExpiringPage';
import { PrintMethodsPage } from './pages/PrintMethodsPage';
import { PrintCheckMockupPage } from './pages/PrintCheckMockupPage';
import { FLFRegistryPage } from './pages/FLFRegistryPage';
import { SamplesListPage } from './pages/SamplesListPage';
import { SampleNewPage } from './pages/SampleNewPage';
import { SampleDetailPage } from './pages/SampleDetailPage';
import { CustomersListPage } from './pages/CustomersListPage';
import { CarriersPage } from './pages/CarriersPage';
import { OrdersListPage } from './pages/OrdersListPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { AdminAuditPage } from './pages/AdminAuditPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminRolesPage } from './pages/AdminRolesPage';
import { AdminReferencesPage } from './pages/AdminReferencesPage';
import { LockedPage } from './pages/LockedPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/catalog" element={<CatalogListPage />} />
        <Route path="/catalog/:skuId" element={<SKUDetailPage />} />

        <Route path="/documents" element={<DocumentsListPage />} />
        <Route path="/documents/expiring" element={<DocumentsExpiringPage />} />
        <Route path="/documents/:docId" element={<DocumentDetailPage />} />

        <Route path="/print" element={<Navigate to="/print/methods" replace />} />
        <Route path="/print/methods" element={<PrintMethodsPage />} />
        <Route path="/print/check-mockup" element={<PrintCheckMockupPage />} />
        <Route path="/print/flf-registry" element={<FLFRegistryPage />} />

        <Route path="/samples" element={<SamplesListPage />} />
        <Route path="/samples/new" element={<SampleNewPage />} />
        <Route path="/samples/:sampleId" element={<SampleDetailPage />} />

        <Route path="/customers" element={<CustomersListPage />} />
        <Route path="/carriers" element={<CarriersPage />} />

        <Route path="/orders" element={<OrdersListPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />

        <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/roles" element={<AdminRolesPage />} />
        <Route path="/admin/references/:refName?" element={<AdminReferencesPage />} />
        <Route path="/admin/audit" element={<AdminAuditPage />} />

        <Route
          path="/warehouse"
          element={
            <LockedPage
              title="Склад и остатки"
              phase="Phase 3"
              requirements={[
                'Выгрузка остатков по SKU из 1С УНФ',
                'Схема зон склада',
                'Регламенты приёмки / отгрузки / инвентаризации',
                'Фото склада с разметкой зон',
              ]}
              reference="TERMY_03B_Blockers_and_Client_Data_Request_Pack.md раздел 3"
            />
          }
        />
        <Route
          path="/shifts"
          element={
            <LockedPage
              title="Сменный выпуск"
              phase="Phase 3"
              requirements={[
                'Штатка производства (роль → количество)',
                'Список участков и оборудования',
                'График смен',
                'Образец сменного журнала',
                'Техкарты для топ-3 SKU',
                'Справочник причин брака и простоя',
              ]}
              reference="TERMY_03B раздел 4"
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <LockedPage
              title="Аналитика"
              phase="Roadmap v2"
              requirements={[
                'Стабилизация M3 (Склад) и M4 (Сменный выпуск)',
                'Регулярный поток данных о выпуске, остатках, заказах',
              ]}
              reference="после Phase 3"
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
