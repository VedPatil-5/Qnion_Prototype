import React from 'react';
import { Users } from 'lucide-react';
import { useI18n } from '../i18n';

interface DashboardActionsProps {
  onNavigateToScanner: () => void;
  onNavigateToTeam: () => void;
}

/** The shared scan/team entry points used by both role dashboards. */
export const DashboardActions: React.FC<DashboardActionsProps> = ({
  onNavigateToScanner,
  onNavigateToTeam
}) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col sm:flex-row w-full gap-3 pt-2 max-w-sm mx-auto">
      <button
        type="button"
        onClick={onNavigateToScanner}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm shadow-md active:scale-[0.98] transition-all hover:bg-[var(--primary-hover)] cursor-pointer"
      >
        <span>{t('scanProduct')}</span>
      </button>

      <button
        type="button"
        onClick={onNavigateToTeam}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[var(--surface-strong)] text-[var(--text)] font-semibold text-sm border border-[var(--border)] active:scale-[0.98] transition-all hover:bg-[var(--surface-soft)] cursor-pointer"
      >
        <span>{t('meetTeam')}</span>
        <Users className="w-4 h-4 text-[var(--primary)]" />
      </button>
    </div>
  );
};
