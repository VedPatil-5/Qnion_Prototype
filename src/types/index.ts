export type OnionGrade = 'GOOD' | 'DAMAGED' | 'ROTTEN' | 'SPROUTED' | 'UNDERSIZED';
export type BoxColor = 'green' | 'amber' | 'red';
export type SeverityLevel = 'critical' | 'major' | 'minor';
export interface BoundingBox { id: string; xPercent: number; yPercent: number; widthPercent: number; heightPercent: number; label: OnionGrade; boxColor: BoxColor; detail?: string; ruleCode?: string; }
export interface ViolationItem { id: string; code: OnionGrade; severity: SeverityLevel; badge: 'Rejected' | 'URS'; desc: string; rule: string; }
export interface CompliantItem { id: string; label: string; status: 'Grade A'; desc: string; value: string; }
export interface ChangeLogItem { id: string; targetViolation: string; actionRequired: string; qualityGuidance: string; }
export interface GradeBreakdown { gradeA: number; urs: number; rejected: number; }
export interface SampleDataset { id: string; caseReference?: string; inspectionDateTime?: string; inspectionLocation?: string; name: string; category: string; netQuantity: string; harvestLot: string; imagePath: string; thumbnailUrl?: string; summary: string; badgeText: string; defaultStatus: 'COMPLIANT' | 'WARNING' | 'VIOLATION'; gradeBreakdown: GradeBreakdown; boundingBoxes: BoundingBox[]; violations: ViolationItem[]; compliant: CompliantItem[]; changeLog: ChangeLogItem[]; }
export interface TeamMember { id: string; name: string; role: string; photoUrl: string; githubUrl: string; linkedinUrl: string; }
