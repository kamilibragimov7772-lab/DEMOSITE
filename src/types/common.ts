export type ConfidenceStatus = 'confirmed' | 'provisional' | 'under_review' | 'conflicting';

export type Phase = 'Phase 2' | 'Phase 3' | 'Roadmap v2';

export type RoleCode =
  | 'admin'
  | 'director'
  | 'rop'
  | 'manager'
  | 'accountant'
  | 'secretary'
  | 'designer'
  | 'driver'
  | 'prod_head_inferred'
  | 'prod_master_inferred'
  | 'prod_operator_inferred'
  | 'prod_packer_inferred'
  | 'warehouseman_inferred'
  | 'qc_inferred';
