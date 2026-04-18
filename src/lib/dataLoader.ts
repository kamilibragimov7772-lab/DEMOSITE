import type {
  ProductLine,
  SKU,
  TechSpec,
  Material,
  SKUMaterialLink,
  PrintingMethod,
  PrintConstraint,
  ColorPaletteEntry,
  SKUPrintingSupport,
  PrintingPartner,
  Claim,
  RegulatoryDocument,
  SKUDocumentMap,
  Carrier,
  CustomerSegment,
  CRMStatus,
  LegalEntity,
  Role,
  User,
  Customer,
  SampleRequest,
  ProductionOrder,
  OrderLine,
  ApprovalArtifact,
  FLFForm,
} from '@/types';

import productLines from '@/data/real/product_lines.json';
import skus from '@/data/real/skus.json';
import techSpecs from '@/data/real/tech_specs.json';
import materials from '@/data/real/materials.json';
import skuMaterials from '@/data/real/sku_materials.json';
import printingMethods from '@/data/real/printing_methods.json';
import printConstraints from '@/data/real/print_constraints.json';
import colorPalette from '@/data/real/color_palette.json';
import skuPrintingSupport from '@/data/real/sku_printing_support.json';
import printingPartners from '@/data/real/printing_partners.json';
import claims from '@/data/real/claims.json';
import regulatoryDocuments from '@/data/real/regulatory_documents.json';
import skuDocumentMap from '@/data/real/sku_document_map.json';
import carriers from '@/data/real/carriers.json';
import customerSegments from '@/data/real/customer_segments.json';
import crmStatuses from '@/data/real/crm_statuses.json';
import legalEntities from '@/data/real/legal_entities_termy.json';
import roles from '@/data/real/roles.json';

import mockUsers from '@/data/mock/users.json';
import mockCustomers from '@/data/mock/customers.json';
import mockOrders from '@/data/mock/orders.json';
import mockOrderLines from '@/data/mock/order_lines.json';
import mockSamples from '@/data/mock/sample_requests.json';
import mockApproval from '@/data/mock/approval_artifacts.json';
import mockFLF from '@/data/mock/flf_forms.json';

export const data = {
  productLines: productLines as ProductLine[],
  skus: skus as SKU[],
  techSpecs: techSpecs as TechSpec[],
  materials: materials as Material[],
  skuMaterials: skuMaterials as SKUMaterialLink[],
  printingMethods: printingMethods as unknown as PrintingMethod[],
  printConstraints: printConstraints as unknown as PrintConstraint[],
  colorPalette: colorPalette as unknown as ColorPaletteEntry[],
  skuPrintingSupport: skuPrintingSupport as SKUPrintingSupport[],
  printingPartners: printingPartners as PrintingPartner[],
  claims: claims as Claim[],
  regulatoryDocuments: regulatoryDocuments as RegulatoryDocument[],
  skuDocumentMap: skuDocumentMap as SKUDocumentMap[],
  carriers: carriers as Carrier[],
  customerSegments: customerSegments as CustomerSegment[],
  crmStatuses: crmStatuses as CRMStatus[],
  legalEntities: legalEntities as LegalEntity[],
  roles: roles as Role[],

  users: mockUsers as User[],
  customers: mockCustomers as Customer[],
  orders: mockOrders as ProductionOrder[],
  orderLines: mockOrderLines as OrderLine[],
  sampleRequests: mockSamples as SampleRequest[],
  approvalArtifacts: mockApproval as ApprovalArtifact[],
  flfForms: mockFLF as FLFForm[],
};

export function findSKU(id: string) {
  return data.skus.find((s) => s.id === id);
}

export function findProductLine(id: string) {
  return data.productLines.find((l) => l.id === id);
}

export function findTechSpecsForSKU(skuId: string) {
  return data.techSpecs.filter((t) => t.sku_id === skuId);
}

export function findDocsForSKU(skuId: string) {
  const ids = data.skuDocumentMap.filter((m) => m.sku_id === skuId).map((m) => m.document_id);
  const docSet = new Set(ids);
  return data.regulatoryDocuments.filter((d) => docSet.has(d.id));
}

export function findPrintingSupportForSKU(skuId: string) {
  const records = data.skuPrintingSupport.filter((s) => s.sku_id === skuId);
  return records.map((r) => ({
    method: data.printingMethods.find((m) => m.id === r.printing_method_id)!,
    moqOverride: r.moq_override,
    leadTimeOverrideWeeks: r.lead_time_override_weeks,
    notes: r.notes,
  }));
}

export function findMaterialsForSKU(skuId: string) {
  const links = data.skuMaterials.filter((s) => s.sku_id === skuId);
  return links.map((l) => ({
    material: data.materials.find((m) => m.id === l.material_id)!,
    function: l.function,
  }));
}

export function findCarrierById(id: string) {
  return data.carriers.find((c) => c.id === id);
}

export function findCustomerById(id: string) {
  return data.customers.find((c) => c.id === id);
}

export function findSegmentById(id: string) {
  return data.customerSegments.find((s) => s.id === id);
}

export function findUserById(id: string) {
  return data.users.find((u) => u.id === id);
}

export function findRoleByCode(code: string) {
  return data.roles.find((r) => r.code === code);
}

export function findOrderById(id: string) {
  return data.orders.find((o) => o.id === id);
}

export function findOrderLinesFor(orderId: string) {
  return data.orderLines.filter((l) => l.order_id === orderId);
}

export function findApprovalForOrder(orderId: string) {
  return data.approvalArtifacts.find((a) => a.order_id === orderId);
}

export function findSampleById(id: string) {
  return data.sampleRequests.find((s) => s.id === id);
}

export function findDocumentById(id: string) {
  return data.regulatoryDocuments.find((d) => d.id === id);
}
