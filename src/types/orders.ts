export type OrderType = 'serial' | 'stm_silkscreen' | 'stm_flexo' | 'nonstandard';

export type OrderState =
  | 'draft'
  | 'awaiting_payment'
  | 'awaiting_mockup_approval'
  | 'registered_in_1c'
  | 'in_production'
  | 'ready_to_ship'
  | 'shipped'
  | 'delivered'
  | 'nps_requested'
  | 'closed';

export interface DeliveryAttributes {
  recipient_name: string;
  recipient_inn: string;
  recipient_kpp?: string | null;
  recipient_phone: string;
  carrier_id: string;
  address: string;
  reception_hours?: string | null;
  delivery_payer: 'sender' | 'receiver';
  pallet_requirements?: string | null;
  document_requirements?: string | null;
  pass_requirements?: string | null;
}

export interface OrderLine {
  id: string;
  order_id: string;
  sku_id: string;
  quantity: number;
  notes?: string | null;
  demo: true;
}

export type MockupSignStatus = 'not_requested' | 'requested' | 'signed' | 'rejected';

export interface ApprovalArtifact {
  id: string;
  order_id: string;
  mockup_id?: string | null;
  sign_status: MockupSignStatus;
  signed_at?: string | null;
  scan_path?: string | null;
  demo: true;
}

export interface ProductionOrder {
  id: string;
  external_ref_1c: string | null;
  customer_id: string;
  contract_id?: string | null;
  order_type: OrderType;
  state: OrderState;
  planned_shipment_date?: string | null;
  approved_mockup_id?: string | null;
  rop_responsible_id?: string | null;
  manager_responsible_id?: string | null;
  telegram_ref?: string | null;
  created_at: string;
  delivery?: DeliveryAttributes | null;
  demo: true;
}
