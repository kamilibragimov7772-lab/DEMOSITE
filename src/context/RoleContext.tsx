import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { RoleCode } from '@/types';
import users from '@/data/mock/users.json';
import type { User } from '@/types';

interface RoleContextValue {
  currentUser: User;
  currentRole: RoleCode;
  setRoleCode: (code: RoleCode) => void;
  users: User[];
}

const RoleContext = createContext<RoleContextValue | null>(null);
const LS_KEY = 'termy_demo.current_role';

export function RoleProvider({ children }: { children: ReactNode }) {
  const typedUsers = users as User[];
  const [roleCode, setRoleCodeState] = useState<RoleCode>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY) : null;
    return (saved as RoleCode) || 'admin';
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, roleCode);
  }, [roleCode]);

  const currentUser = useMemo(
    () => typedUsers.find((u) => u.role_code === roleCode) ?? typedUsers[0],
    [typedUsers, roleCode]
  );

  const value: RoleContextValue = {
    currentUser,
    currentRole: roleCode,
    setRoleCode: setRoleCodeState,
    users: typedUsers,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
