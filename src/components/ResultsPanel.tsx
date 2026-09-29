import React, { useRef, useState } from 'react';
import { SampleDataset } from '../types';
import { QRCodeCanvas } from 'qrcode.react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Download, Printer, RefreshCw, Sprout } from 'lucide-react';
import { useI18n } from '../i18n';
import { getGs1DigitalLink } from '../services/qrService';

interface ResultsPanelProps {
  sample: SampleDataset;
  onDownloadPdf: () => void;
  onGenerateSticker: (qrDataUrl: string) => void;
  isGeneratingPdf?: boolean;
  isGeneratingSticker?: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  sample,
  onDownloadPdf,
  onGenerateSticker,
  isGeneratingPdf = false,
  isGeneratingSticker = false
}) => {
  const { t } = useI18n();
  const [downgradedOpen, setDowngradedOpen] = useState(true);
  const [gradeOpen, setGradeOpen] = useState(true);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const { gradeA, urs, rejected } = sample.gradeBreakdown;
  const gs1DigitalLink = getGs1DigitalLink(sample);

  const handleGenerateSticker = () => {
    const qrDataUrl = qrCanvasRef.current?.toDataURL('image/png');
    if (qrDataUrl) onGenerateSticker(qrDataUrl);
  };

  return (
    <div className="flex flex-col gap-4 font-sans">
      {/* Grade Breakdown Cards */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
        <div className="p-4 bg-[var(--surface-raised)]">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--primary)]">
            {t('batchBreakdown')}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Grade label={t('gradeA')} value={gradeA} tone="bg-[#6b8e23]" />
            <Grade label={t('urs')} value={urs} tone="bg-[#c98a12]" />
            <Grade label={t('rejected')} value={rejected} tone="bg-[#8b2d1c]" />
          </div>
        </div>
      </section>

      {/* GS1 Digital Link QR and compact sticker export */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
        <div className="p-4 bg-[var(--surface-raised)]">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--primary)]">
            GS1 Digital Link
          </p>
          <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="shrink-0 rounded-xl bg-white p-2 shadow-xs" role="img" aria-label="GS1 Digital Link QR code">
              <QRCodeCanvas
                ref={qrCanvasRef}
                value={gs1DigitalLink}
                size={160}
                includeMargin
                level="M"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p className="break-all text-[11px] leading-relaxed text-[var(--muted)]">{gs1DigitalLink}</p>
              <button
                type="button"
                onClick={handleGenerateSticker}
                disabled={isGeneratingSticker}
                className="w-full rounded-xl border border-[var(--primary)] bg-[var(--card)] py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary-soft)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isGeneratingSticker ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
                {isGeneratingSticker ? t('preparingSticker') : t('generateSticker')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rejected / Downgraded Onions */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => setDowngradedOpen(!downgradedOpen)}
          className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
        >
          <span className="flex items-center gap-2 font-display font-bold text-[var(--text)]">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-[var(--danger-soft)] text-[var(--danger)]">
              <AlertCircle className="w-4 h-4" />
            </span>
            {t('violationsFound')}
            <em className="not-italic rounded-full bg-[var(--danger-soft)] px-2 py-0.5 text-xs text-[var(--danger)] font-mono">
              {sample.violations.length}
            </em>
          </span>
          {downgradedOpen ? (
            <ChevronUp className="w-5 h-5 text-[var(--muted)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--muted)]" />
          )}
        </button>
        {downgradedOpen && (
          <div className="border-t border-[var(--border)] p-4 space-y-2.5">
            {sample.violations.length === 0 ? (
              <p className="text-xs text-[var(--muted)]">{t('noViolations')}</p>
            ) : (
              sample.violations.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[var(--danger-border)] bg-[var(--danger-soft)]/40 p-3"
                >
                  <div className="flex gap-2 items-center">
                    <b className="text-xs text-[var(--danger)]">{item.code}</b>
                    <span className="rounded-full bg-[var(--warning)] px-2 py-0.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text)]">{item.desc}</p>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">{item.rule}</p>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* Grade A Compliant Onions */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => setGradeOpen(!gradeOpen)}
          className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
        >
          <span className="flex items-center gap-2 font-display font-bold text-[var(--text)]">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-[var(--success-soft)] text-[var(--success)]">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            {t('compliantElements')}
            <em className="not-italic rounded-full bg-[var(--success-soft)] px-2 py-0.5 text-xs text-[var(--success)] font-mono">
              {gradeA}%
            </em>
          </span>
          {gradeOpen ? (
            <ChevronUp className="w-5 h-5 text-[var(--muted)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--muted)]" />
          )}
        </button>
        {gradeOpen && (
          <div className="border-t border-[var(--border)] p-4 space-y-2">
            {sample.compliant.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--success-border)] bg-[var(--success-soft)]/40 p-3 flex gap-3"
              >
                <Sprout className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
                <div>
                  <b className="text-xs text-[var(--text)]">{item.label}</b>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.desc}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--success)]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Download PDF Button */}
      <button
        type="button"
        onClick={onDownloadPdf}
        disabled={isGeneratingPdf}
        className="w-full py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors cursor-pointer shadow-md"
      >
        {isGeneratingPdf ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {isGeneratingPdf ? t('preparingReport') : t('downloadPdf')}
      </button>
    </div>
  );
};

const Grade = ({ label, value, tone }: { label: string; value: number; tone: string }) => (
  <div className="text-center">
    <div className={`h-1.5 rounded-full ${tone}`} style={{ width: `${value}%` }} />
    <b className="block mt-2 text-lg text-[var(--text)]">{value}%</b>
    <span className="text-[10px] font-semibold text-[var(--muted)]">{label}</span>
  </div>
);
