import { jsPDF } from 'jspdf';
import { SampleDataset } from '../types';
import { getCrateId, getGs1DigitalLink } from './qrService';
export type PdfLanguage = 'en' | 'hi' | 'mr';

const brown: [number, number, number] = [74, 29, 18];
const orange: [number, number, number] = [201, 111, 34];
const green: [number, number, number] = [93, 143, 20];
const red: [number, number, number] = [169, 70, 28];
const stickerGreen: [number, number, number] = [107, 142, 35];
const stickerAmber: [number, number, number] = [201, 138, 18];
const stickerRed: [number, number, number] = [139, 45, 28];
const wrap = (doc: jsPDF, text: string, x: number, y: number, width: number, leading = 5) => {
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, x, y);
  return y + lines.length * leading;
};

/** Generates a Qnion prototype report from the selected pre-set batch dataset. */
export async function generateInspectionPdf(sample: SampleDataset, _options: { language?: PdfLanguage } = {}): Promise<Blob> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 18;
  doc.setFillColor(...brown); doc.rect(0, 0, width, 31, 'F');
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(21); doc.text('Qnion', margin, y);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text('QUALIFYING ONIONS  |  BATCH QUALITY REPORT', margin, y + 7);
  y = 43; doc.setTextColor(...brown); doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.text('Onion Batch Grade Summary', margin, y);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); y = wrap(doc, sample.summary, margin, y + 7, width - margin * 2) + 4;
  const details = [['Batch reference', sample.caseReference ?? sample.id], ['Batch', sample.name], ['Source', sample.inspectionLocation ?? 'Prototype sample'], ['Captured', sample.inspectionDateTime ?? 'Not recorded'], ['Lot', sample.harvestLot]];
  doc.setFillColor(255, 248, 234); doc.roundedRect(margin, y, width - margin * 2, 43, 3, 3, 'F');
  doc.setFontSize(8); details.forEach(([label, value], index) => { const row = y + 7 + index * 7; doc.setFont('helvetica', 'bold'); doc.setTextColor(...brown); doc.text(label.toUpperCase(), margin + 4, row); doc.setFont('helvetica', 'normal'); doc.setTextColor(75, 59, 45); doc.text(value, margin + 40, row); });
  y += 54; doc.setTextColor(...brown); doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text('Batch grade breakdown', margin, y);
  const grades = [['Grade A', sample.gradeBreakdown.gradeA, green], ['URS', sample.gradeBreakdown.urs, orange], ['Rejected', sample.gradeBreakdown.rejected, red]] as const;
  y += 8; grades.forEach(([label, value, color], index) => { const x = margin + index * 61; doc.setFillColor(...color); doc.roundedRect(x, y, 55, 25, 3, 3, 'F'); doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.text(`${value}%`, x + 4, y + 12); doc.setFontSize(9); doc.text(label, x + 4, y + 19); });
  y += 38; doc.setTextColor(...brown); doc.setFontSize(13); doc.text('Rejected / downgraded onions', margin, y); y += 7;
  doc.setFontSize(9); sample.violations.forEach((item) => { doc.setFillColor(255, 247, 241); doc.roundedRect(margin, y - 4, width - margin * 2, 15, 2, 2, 'F'); doc.setTextColor(...red); doc.setFont('helvetica', 'bold'); doc.text(`${item.code} - ${item.badge}`, margin + 3, y + 1); doc.setTextColor(75, 59, 45); doc.setFont('helvetica', 'normal'); y = wrap(doc, item.desc, margin + 3, y + 6, width - margin * 2 - 6, 4) + 5; });
  y += 3; doc.setTextColor(...brown); doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text('Grade A onions', margin, y); y += 8;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9); sample.compliant.forEach((item) => { doc.setTextColor(...green); doc.text(`${item.label}: ${item.value}`, margin, y); doc.setTextColor(75, 59, 45); y = wrap(doc, item.desc, margin, y + 5, width - margin * 2, 4) + 4; });
  doc.setDrawColor(222, 202, 176); doc.line(margin, 282, width - margin, 282); doc.setTextColor(112, 88, 66); doc.setFontSize(8); doc.text('Qnion prototype - sample data only. This report is not a procurement decision.', margin, 288);
  doc.save(`Qnion_Batch_Report_${sample.caseReference ?? sample.id}.pdf`);
  return doc.output('blob');
}

/** Generates the compact thermal/inkjet sticker for one batch. */
export async function generateBatchStickerPdf(sample: SampleDataset, qrDataUrl: string): Promise<Blob> {
  if (!qrDataUrl) {
    throw new Error('The batch QR code is not ready yet.');
  }

  const qrSize = 30;
  const badgeWidth = 24;
  const badgeGap = 0.8;
  const qrBadgeGap = 1.5;
  const badgeHeight = (qrSize - badgeGap * 2) / 3;
  const stickerWidth = qrSize + qrBadgeGap + badgeWidth;
  const stickerHeight = qrSize;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [stickerWidth, stickerHeight], compress: true });
  const { gradeA, urs, rejected } = sample.gradeBreakdown;

  doc.addImage(qrDataUrl, 'PNG', 0, 0, qrSize, qrSize);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  const badges = [
    [`Grade A: ${gradeA}%`, stickerGreen],
    [`URS: ${urs}%`, stickerAmber],
    [`Rejected: ${rejected}%`, stickerRed]
  ] as const;
  badges.forEach(([label, color], index) => {
    const badgeY = index * (badgeHeight + badgeGap);
    doc.setFillColor(...color);
    doc.roundedRect(qrSize + qrBadgeGap, badgeY, badgeWidth, badgeHeight, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(label, qrSize + qrBadgeGap + badgeWidth / 2, badgeY + badgeHeight / 2 + 1.7, { align: 'center' });
  });

  const crateId = getCrateId(sample);
  // Keep the URL construction in the sticker flow so malformed batch references fail loudly.
  getGs1DigitalLink(sample);
  doc.save(`Qnion_Batch_Sticker_${crateId}.pdf`);
  return doc.output('blob');
}
