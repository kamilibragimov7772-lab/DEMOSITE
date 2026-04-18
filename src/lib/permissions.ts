import type { RoleCode } from '@/types';

/**
 * Упрощённая матрица прав для demo. Соответствует TERMY_04B_Screen_and_Route_Map.md §5.
 * Production-роли (prod_*_inferred) намеренно получают только `/` и `/profile`.
 */

export type Area =
  | 'catalog'
  | 'documents'
  | 'documents:write'
  | 'orders'
  | 'orders:write'
  | 'samples'
  | 'samples:write'
  | 'samples:approve'
  | 'customers'
  | 'print:reference'
  | 'print:check_mockup'
  | 'print:flf_registry'
  | 'carriers'
  | 'admin';

const MATRIX: Record<RoleCode, Area[]> = {
  admin: [
    'catalog', 'documents', 'documents:write', 'orders', 'orders:write',
    'samples', 'samples:write', 'samples:approve', 'customers',
    'print:reference', 'print:check_mockup', 'print:flf_registry', 'carriers', 'admin',
  ],
  director: [
    'catalog', 'documents', 'orders', 'samples', 'customers',
    'print:reference', 'print:flf_registry', 'carriers',
  ],
  rop: [
    'catalog', 'documents', 'orders', 'orders:write',
    'samples', 'samples:write', 'samples:approve', 'customers',
    'print:reference', 'print:check_mockup', 'print:flf_registry', 'carriers',
  ],
  manager: [
    'catalog', 'documents', 'orders', 'orders:write',
    'samples', 'samples:write', 'customers',
    'print:reference', 'print:check_mockup', 'carriers',
  ],
  accountant: [
    'catalog', 'documents', 'documents:write', 'orders', 'customers',
    'print:reference', 'carriers',
  ],
  secretary: [
    'documents', 'samples', 'samples:write', 'customers', 'carriers',
  ],
  designer: [
    'catalog', 'documents',
    'print:reference', 'print:check_mockup', 'print:flf_registry',
  ],
  driver: [
    'carriers',
  ],
  prod_head_inferred: [],
  prod_master_inferred: [],
  prod_operator_inferred: [],
  prod_packer_inferred: [],
  warehouseman_inferred: [],
  qc_inferred: [],
};

export function can(role: RoleCode, area: Area): boolean {
  return MATRIX[role]?.includes(area) ?? false;
}

export function allowedAreas(role: RoleCode): Area[] {
  return MATRIX[role] ?? [];
}
