import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  return (
    <div className="min-h-screen flex bg-brand-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <Outlet />
        </main>
        <footer className="px-8 py-3 text-xs text-gray-400 border-t border-gray-200 bg-white">
          TERMY Demo · Phase 1 · Данные Master KB v1.1 + mock · Production build = не этот прототип
        </footer>
      </div>
    </div>
  );
}
