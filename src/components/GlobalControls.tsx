import React from 'react';
import { Globe2, Moon, Sun } from 'lucide-react';
import { Language, useI18n } from '../i18n';
import { useTheme } from '../context/ThemeContext';

export const GlobalControls: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'flex-wrap justify-center'}`}>
      <label className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 py-2 text-xs font-semibold text-[var(--muted)]">
        <Globe2 className="h-4 w-4 text-[var(--primary)]" />
        <span className="sr-only">{t('selectLanguage')}</span>
        <select
          aria-label={t('selectLanguage')}
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-transparent outline-none cursor-pointer"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
        </select>
      </label>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t('toggleTheme')}
        title={theme === 'light' ? t('dark') : t('light')}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] transition hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
      >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    </div>
  );
};
