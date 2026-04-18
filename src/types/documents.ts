export type DocumentType =
  | 'declaration'
  | 'certificate'
  | 'patent'
  | 'trademark'
  | 'technical_conditions'
  | 'test_protocol';

export type DocumentStatus =
  | 'valid'
  | 'expiring_soon'
  | 'expired'
  | 'in_renewal'
  | 'not_started';

export interface RegulatoryDocument {
  id: string;
  doc_type: DocumentType;
  number: string;
  title: string;
  issuing_authority?: string | null;
  issued_date?: string | null;
  expiry_date?: string | null;
  status: DocumentStatus;
  file_path?: string | null;
  public_allowed: boolean;
  applicable_sku_ids: string[];
  notes?: string | null;
  source_reference?: string | null;
}

export interface SKUDocumentMap {
  sku_id: string;
  document_id: string;
  scope_note?: string | null;
}
