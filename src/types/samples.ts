export type SampleChannel = 'cdek' | 'russian_post';
export type SamplePayer = 'sender' | 'receiver';

export type SampleState =
  | 'requested'
  | 'approved_by_rop'
  | 'sent'
  | 'delivered'
  | 'converted_to_deal'
  | 'lost';

export interface SampleRequest {
  id: string;
  customer_id: string;
  requested_items: { sku_id: string; quantity: number }[];
  recipient_name: string;
  recipient_inn: string;
  recipient_phone: string;
  recipient_address: string;
  payer: SamplePayer;
  payer_email: string;
  channel: SampleChannel;
  telegram_ref?: string | null;
  tracking_number?: string | null;
  approved_by_rop: boolean;
  state: SampleState;
  sent_at?: string | null;
  created_at: string;
  demo: true;
}
