export type AssistantFaq = { keywords: string[]; answer: string; sourceName: string; sourceUrl: string; };
export const assistantFaqs: AssistantFaq[] = [
  { keywords: ['grade a', 'good', 'grade'], answer: 'In this prototype, Grade A represents sound, marketable onions in the selected sample dataset.', sourceName: 'Qnion prototype grading note', sourceUrl: 'https://example.com/qnion-prototype' },
  { keywords: ['urs', 'damaged', 'undersized', 'sprouted'], answer: 'URS is the prototype’s downgrade category for onions that need sorting because of visible damage, sprouting or undersize.', sourceName: 'Qnion prototype grading note', sourceUrl: 'https://example.com/qnion-prototype' },
  { keywords: ['rejected', 'rotten', 'rot'], answer: 'Rejected identifies onions marked rotten in the selected sample. Remove and segregate them before considering a batch.', sourceName: 'Qnion prototype grading note', sourceUrl: 'https://example.com/qnion-prototype' },
  { keywords: ['report', 'pdf', 'download'], answer: 'The PDF report is generated from the selected pre-set sample image and its hand-placed onion classifications.', sourceName: 'Qnion prototype data note', sourceUrl: 'https://example.com/qnion-prototype' }
];
