import { differenceInDays, parseISO } from 'date-fns';
import type { DocumentStatus, RegulatoryDocument } from '@/types';

export function computeDocumentStatus(
  doc: RegulatoryDocument,
  today: Date = new Date(),
  thresholdDays = 90
): DocumentStatus {
  if (doc.status === 'in_renewal' || doc.status === 'not_started') return doc.status;
  if (!doc.expiry_date) return 'valid';
  const expiry = parseISO(doc.expiry_date);
  const diff = differenceInDays(expiry, today);
  if (diff < 0) return 'expired';
  if (diff <= thresholdDays) return 'expiring_soon';
  return 'valid';
}

export function daysUntilExpiry(doc: RegulatoryDocument, today: Date = new Date()): number | null {
  if (!doc.expiry_date) return null;
  return differenceInDays(parseISO(doc.expiry_date), today);
}
