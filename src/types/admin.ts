import type { RoleCode } from './common';

export interface Role {
  id: string;
  code: RoleCode;
  name_ru: string;
  confirmed: boolean;
  description: string;
  pending_validation: boolean;
}

export interface User {
  id: string;
  login: string;
  full_name: string;
  primary_role_id: string;
  role_code: RoleCode;
  status: 'active' | 'inactive';
  demo: true;
}

export interface AuditLogEntry {
  id: string;
  user_id: string;
  user_login?: string;
  action: string;
  object_type: string;
  object_id?: string | null;
  timestamp: string;
  diff_before?: Record<string, unknown> | null;
  diff_after?: Record<string, unknown> | null;
  demo: true;
}

export interface Settings {
  reminder_days: number[];
}
