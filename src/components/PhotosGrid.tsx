import React from 'react';
import { SampleDataset } from '../types';
import { useI18n } from '../i18n';

interface PhotosGridProps {
  isOpen: boolean;
  samples: SampleDataset[];
  onSelectSample: (sample: SampleDataset) => void;
  onCancel: () => void;
}

export const PhotosGrid: React.FC<PhotosGridProps> = ({
  isOpen,
  samples,
  onSelectSample,
  onCancel
}) => {
  const { t } = useI18n();
  if (!isOpen) return null;

  const displaySamples = samples;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--surface)] flex flex-col font-sans select-none animate-fadeIn">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-10 bg-[var(--card)]/90 backdrop-blur-xl border-b border-[var(--border)] pt-safe">
        <div className="h-14 px-4 flex items-center justify-between relative">
          <button
            type="button"
            onClick={onCancel}
            className="text-[var(--primary)] text-[17px] font-normal active:opacity-60 transition-opacity min-h-[44px] flex items-center cursor-pointer"
          >
            {t('cancel')}
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <h1 className="text-[17px] font-semibold text-[var(--text)] tracking-tight">
              {t('photos')}
            </h1>
          </div>
          <div className="w-12" />
        </div>
      </header>

      {/* Grid of sample crates/heaps */}
      <main className="flex-1 overflow-y-auto pb-safe">
        <div className="grid grid-cols-3 gap-[2px] bg-[var(--border)]">
          {displaySamples.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="relative aspect-square w-full bg-[var(--surface-strong)] overflow-hidden active:opacity-60 transition-opacity cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <img
                src={sample.thumbnailUrl || sample.imagePath}
                alt=""
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
