import React from 'react';
import { Layers, Scan, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n';

export interface PipelineStage {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PipelineStepperProps {
  currentStageIndex: number;
  stageProgress: number; // 0 to 100
  stageLabel: string;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  currentStageIndex,
  stageProgress,
  stageLabel
}) => {
  const { t } = useI18n();
  const stages: PipelineStage[] = [
    { id: 'prep', name: t('stagePrep'), icon: <Layers className="w-4 h-4" /> },
    { id: 'detection', name: t('stageDetection'), icon: <Scan className="w-4 h-4" /> },
    { id: 'grading', name: t('stageGrading'), icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'verdict', name: t('stageVerdict'), icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full bg-[var(--card)] rounded-2xl p-4 shadow-sm border border-[var(--border)] font-sans flex flex-col gap-3 animate-fadeIn">
      {/* Header with live progress % */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
          <span className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">
            {t('analysis')}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-[var(--primary)]">
          {Math.min(100, Math.round(stageProgress))}%
        </span>
      </div>

      {/* Progress Bar with warm onion gradient */}
      <div className="w-full h-2 bg-[var(--surface-strong)] rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[var(--primary)] via-[var(--warning)] to-[var(--success)] transition-all duration-300 rounded-full"
          style={{ width: `${stageProgress}%` }}
        />
      </div>

      {/* 4 Stages Indicator */}
      <div className="grid grid-cols-4 gap-1 pt-1">
        {stages.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={stage.id}
              className={`flex flex-col items-center text-center gap-1 transition-all ${
                isDone
                  ? 'text-[var(--success)]'
                  : isCurrent
                  ? 'text-[var(--primary)] font-semibold scale-105'
                  : 'text-[var(--muted)]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                  isDone
                    ? 'bg-[var(--success-soft)] border-[var(--success-border)] text-[var(--success)]'
                    : isCurrent
                    ? 'bg-[var(--primary-soft)] border-[var(--primary)] text-[var(--primary)] shadow-xs'
                    : 'bg-[var(--surface-strong)] border-[var(--border)] text-[var(--muted)]'
                }`}
              >
                {stage.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] leading-tight">
                {stage.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Stage Status Subtitle */}
      <div className="text-center text-xs text-[var(--muted)] font-medium pt-1">
        {stageLabel}
      </div>
    </div>
  );
};
