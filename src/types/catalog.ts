import type { ConfidenceStatus } from './common';

export type ProductLineCategory = 'Термоупаковка' | 'Аккумуляторы температуры' | 'Посуда';
export type ProductLineStatus = 'active' | 'under_review' | 'in_development';

export interface ProductLine {
  id: string;
  name_canonical: string;
  name_variants?: string[] | null;
  category: ProductLineCategory;
  status: ProductLineStatus;
  description: string;
  standard_reference?: string | null;
  construction_summary?: string | null;
  source_reference?: string | null;
  confidence_status: ConfidenceStatus;
  evidence_type?: string[] | null;
  conflict_flag?: boolean;
  notes?: string | null;
  created_date?: string | null;
  last_updated?: string | null;
}

export type SKUStatus = 'active' | 'archived' | 'in_development' | 'under_review';
export type SKUSource = 'production' | 'purchased' | 'distributed';

export interface SKU {
  id: string;
  product_line_id: string;
  variant_name: string;
  sub_series?: string | null;
  size_descriptor?: string | null;
  dimensions_mm?: string | null;
  volume_liters?: number | null;
  load_capacity_kg?: number | null;
  article_number: string;
  ean_13?: string | null;
  pack_quantity?: number | null;
  handle_type?: string | null;
  closure_type?: string | null;
  color_options?: string | null;
  sku_status?: SKUStatus;
  sku_source: SKUSource;
  confidence_status: ConfidenceStatus;
  conflict_flag?: boolean;
  source_reference?: string | null;
  notes?: string | null;
}

export interface TechSpec {
  id: string;
  sku_id: string;
  layer_count?: number | null;
  layer_composition_text?: string | null;
  mat_meta_thickness_um?: number | null;
  vpe_thickness_um?: number | null;
  vpp_thickness_cm?: number | null;
  pvd_thickness_um?: number | null;
  bopp_thickness_um?: number | null;
  spanbond_thickness_um?: number | null;
  holding_time_hours?: number | null;
  holding_time_description?: string | null;
  temperature_range?: string | null;
  bubble_diameter?: string | null;
  notes?: string | null;
  confidence_status?: ConfidenceStatus;
  conflict_flag?: boolean;
}

export type MaterialFunction =
  | 'layer_outer'
  | 'layer_middle'
  | 'layer_inner'
  | 'handle'
  | 'bottom'
  | 'coolant'
  | 'frame'
  | 'other';

export interface Material {
  id: string;
  code: string;
  name_ru: string;
  function_in_product: MaterialFunction;
  nomenclature_1c?: string | null;
  unit?: string | null;
}

export interface SKUMaterialLink {
  sku_id: string;
  material_id: string;
  function: MaterialFunction;
  consumption_norm_per_unit: null;
  tolerance_pct: null;
}

export interface Claim {
  id: string;
  text_ru: string;
  segment?: string | null;
  evidence_level: 'verified' | 'practice' | 'internal';
  public_allowed: boolean;
  linked_to?: { type: 'product_line' | 'sku'; id: string }[];
}

export interface PackagingUnit {
  sku_id: string;
  pack_quantity: number;
  box_dimensions_mm?: string | null;
  pallet_boxes_min?: number | null;
  pallet_boxes_max?: number | null;
  pallet_height_mm?: number | null;
}
