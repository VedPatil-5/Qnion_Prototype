import { SAMPLE_DATASETS } from './presets';
const dashboardSamples = SAMPLE_DATASETS.slice(0, 4);
const average = (key: 'gradeA' | 'urs' | 'rejected') => Math.round(dashboardSamples.reduce((sum, sample) => sum + sample.gradeBreakdown[key], 0) / dashboardSamples.length);
export const officerStats = { inspections: 128, compliant: average('gradeA'), nonCompliant: dashboardSamples.filter((sample) => sample.gradeBreakdown.rejected >= 10).length, violations: average('rejected'), reports: 117 };
const statusFor = (sample: typeof dashboardSamples[number]) => sample.gradeBreakdown.rejected >= 10 ? 'FLAGGED' : 'REVIEWED';
const issueFor = (sample: typeof dashboardSamples[number]) => sample.violations[0]?.code ?? 'GOOD';
export const recentInspections = dashboardSamples.map((sample) => ({ id: sample.caseReference ?? sample.id, sampleId: sample.id, product: sample.name, time: sample.inspectionDateTime ?? 'Date/time not recorded', status: statusFor(sample), violation: sample.violations.length ? sample.violations.map((item) => item.code).join(' / ') : 'None', report: true }));
export const violationRecords = dashboardSamples.map((sample) => ({ product: sample.name, issue: issueFor(sample), rule: `${sample.gradeBreakdown.gradeA}% Grade A · ${sample.gradeBreakdown.urs}% URS · ${sample.gradeBreakdown.rejected}% Rejected`, status: statusFor(sample) }));
export const penaltyRecords = SAMPLE_DATASETS.filter((sample) => sample.defaultStatus !== 'COMPLIANT').flatMap((sample) => {
  const item = sample.violations[0];
  return item ? [{ product: sample.name, issue: item.code, amount: item.badge, status: item.desc }] : [];
});
export const repeatedOffenders = [{ entity: 'Sprouting', count: 3, recent: 'Visible sprout markers', status: 'Sort to URS' }, { entity: 'Skin damage', count: 3, recent: 'Surface damage markers', status: 'Review' }, { entity: 'Rotten onions', count: 2, recent: 'Soft-rot markers', status: 'Reject' }];
export const evidenceRecords = dashboardSamples.map((sample) => ({ id: `EV-${sample.caseReference ?? sample.id}`, product: sample.name, location: sample.inspectionLocation ?? 'Not recorded', timestamp: sample.inspectionDateTime ?? 'Not recorded', rule: `${sample.gradeBreakdown.gradeA}% Grade A`, hash: `sample:${sample.id}` }));
