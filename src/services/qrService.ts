import { SampleDataset } from '../types';

export const GS1_DIGITAL_LINK_BASE = 'https://qnion-prototype.vercel.app/01/0000000000000/10';

/** Gets the three-digit crate identifier stored in the sample's batch reference. */
export function getCrateId(sample: SampleDataset): string {
  const crateId = sample.caseReference?.match(/(\d{3})$/)?.[1];
  if (!crateId) {
    throw new Error(`Sample ${sample.id} does not contain a three-digit crate ID.`);
  }
  return crateId;
}

/** Builds the GS1 Digital Link used by the QR code and sticker. */
export function getGs1DigitalLink(sample: SampleDataset): string {
  return `${GS1_DIGITAL_LINK_BASE}/${getCrateId(sample)}`;
}
