export type CustomerSegmentType = 'b2b_termopakety' | 'b2b_shoppers' | 'b2c' | 'distributor' | 'pharma';

export interface CustomerSegment {
  id: string;
  name: string;
  segment_type: CustomerSegmentType;
  decision_maker?: string | null;
  pains?: string | null;
  expectations?: string | null;
  offer?: string | null;
  constraints?: string | null;
}

export type CRMStatusCode = 'active' | 'in_work' | 'rejected' | 'in_mailing';

export interface CRMStatus {
  id: string;
  code: CRMStatusCode;
  name_ru: string;
  description?: string | null;
}

export interface LegalEntity {
  id: string;
  name: string;
  inn?: string | null;
  vat_profile: 'with_vat' | 'without_vat';
  role: 'main' | 'additional' | 'distributor';
}

export interface Carrier {
  id: string;
  name: string;
  is_preferred_near_warehouse?: boolean;
  covers_moscow?: boolean;
  covers_russia?: boolean;
  priority?: number | null;
  notes?: string | null;
}

export interface Customer {
  id: string;
  name: string;
  primary_legal_entity_id?: string | null;
  bitrix_deal_id?: string | null;
  segment_id: string;
  crm_status_code: CRMStatusCode;
  public_allowed_for_mention: boolean;
  demo: true;
}
