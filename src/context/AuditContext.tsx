import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuditLogEntry } from '@/types';
import initial from '@/data/mock/audit_log.json';

interface AuditContextValue {
  entries: AuditLogEntry[];
  append: (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'demo'>) => void;
  clearSessionEntries: () => void;
}

const AuditContext = createContext<AuditContextValue | null>(null);
const LS_KEY = 'termy_demo.audit_log';

export function AuditProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<AuditLogEntry[]>(() => {
    if (typeof window === 'undefined') return initial as AuditLogEntry[];
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) return JSON.parse(saved) as AuditLogEntry[];
    } catch {
      /* ignore */
    }
    return initial as AuditLogEntry[];
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(entries));
  }, [entries]);

  const value = useMemo<AuditContextValue>(
    () => ({
      entries,
      append: (entry) => {
        const newEntry: AuditLogEntry = {
          ...entry,
          id: `AL-${Date.now()}`,
          timestamp: new Date().toISOString(),
          demo: true,
        };
        setEntries((prev) => [newEntry, ...prev]);
      },
      clearSessionEntries: () => setEntries(initial as AuditLogEntry[]),
    }),
    [entries]
  );

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
}

export function useAudit() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error('useAudit must be used within AuditProvider');
  return ctx;
}
