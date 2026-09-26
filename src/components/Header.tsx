import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { GlobalControls } from './GlobalControls';
import { useI18n } from '../i18n';

interface HeaderProps {
  onOpenProfile?: () => void;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile, onBack }) => {
  const { t } = useI18n();
  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl pt-safe">
      <div className="h-16 px-4 max-w-[1280px] mx-auto flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="hidden rounded-lg p-1.5 text-[var(--muted)] hover:text-[var(--primary)] sm:inline-flex"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <img
            src="/assets/qnion-logo.png"
            alt="Qnion onion logo"
            className="h-10 w-10 shrink-0 rounded-xl bg-[#fff4de] object-contain"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-lg font-bold leading-none tracking-tight">Qnion</span>
            <span className="mt-0.5 text-[11px] leading-none tracking-wide text-[var(--muted)]">{t('motto')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GlobalControls compact />
          <div className="hidden rounded-full bg-[var(--primary-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--primary)] sm:inline-flex">
            {t('prototype')}
          </div>
          {onOpenProfile && (
            <button
              type="button"
              onClick={onOpenProfile}
              aria-label={t('meetTeam')}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-sm transition hover:bg-[var(--primary-hover)] cursor-pointer"
            >
              <User className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
