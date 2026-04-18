export interface PrintingMethod {
  id: string;
  name: string;
  surface_types?: string[] | null;
  max_colors?: number | null;
  min_order?: number | null;
  optimal_order?: number | null;
  lead_time_weeks_min?: number | null;
  lead_time_weeks_max?: number | null;
  gradient_allowed?: boolean | null;
  edge_printing_allowed?: boolean | null;
  default_print_area?: string | null;
  contractor?: string | null;
  stability_note?: string | null;
}

export interface PrintConstraint {
  id: string;
  parameter: string;
  value: string;
  applies_to_method_id?: string | null;
  rule_type?: 'mandatory' | 'recommended' | 'warning';
  description?: string | null;
}

export interface ColorPaletteEntry {
  id: string;
  pantone_code: string;
  cmyk_code?: string | null;
  name_ru: string;
  available_for_method_id?: string | null;
}

export interface SKUPrintingSupport {
  sku_id: string;
  printing_method_id: string;
  moq_override?: number | null;
  lead_time_override_weeks?: string | null;
  notes?: string | null;
}

export interface PrintingPartner {
  id: string;
  name: string;
  specialization: 'silkscreen' | 'flexo' | 'mixed';
  stability_note?: string | null;
  contact_info?: string | null;
}

export type FLFStatus =
  | 'active'
  | 'expired_by_count'
  | 'expired_by_date'
  | 'expired_by_runs'
  | 'destroyed_with_notice';

export interface FLFForm {
  id: string;
  partner_id: string;
  customer_id: string;
  sku_id: string;
  printed_since: string;
  prints_count: number;
  last_used_at?: string | null;
  status: FLFStatus;
  expiry_by_count: 1000000;
  expiry_by_date_months: 18;
  expiry_by_runs: 6;
  runs_count: number;
  demo: true;
}

export type MockupRuleId =
  | 'format_pdf'
  | 'color_cmyk'
  | 'pantones_solid_coated'
  | 'text_in_curves'
  | 'black_overprint'
  | 'min_text_size'
  | 'min_line_width'
  | 'no_system_fonts'
  | 'no_self_intersect'
  | 'max_curve_nodes'
  | 'size_matches_print'
  | 'no_rgb_spot';

export interface MockupRule {
  id: MockupRuleId;
  label_ru: string;
  check: 'auto' | 'manual';
  description: string;
}

export interface MockupValidationResult {
  rule_id: MockupRuleId;
  passed: boolean | null;
  note?: string;
}
