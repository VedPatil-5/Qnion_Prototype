import React from 'react';
import { TEAM_MEMBERS } from '../data/presets';
import { useI18n } from '../i18n';

interface TeamTabProps {
  onNavigateToHome: () => void;
  onNavigateToScanner: () => void;
}

export const TeamTab: React.FC<TeamTabProps> = ({
  onNavigateToHome,
  onNavigateToScanner
}) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto space-y-6 sm:space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col space-y-1 text-left">
        <h1 className="font-display text-2xl sm:text-3xl text-[var(--text)] tracking-tight font-bold">
          {t('meetTeam')}
        </h1>
      </div>

      {/* Team Grid: 6 members with both GitHub and LinkedIn buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEAM_MEMBERS.map((member) => {
          return (
            <div
              key={member.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[var(--card)] shadow-xs hover:shadow-md transition-all duration-300 border border-[var(--border)]"
            >
              <div className="flex items-start gap-4">
                <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-xs bg-[var(--surface-strong)]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    src={member.photoUrl}
                    alt={member.name}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-display text-base text-[var(--text)] truncate font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[var(--primary)] font-medium mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Social Links Bar */}
              <div className="flex items-center gap-2 mt-5 pt-3 bg-[var(--surface-raised)] -mx-5 -mb-5 px-5 py-3 rounded-b-2xl border-t border-[var(--border)]">
                <a
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[var(--surface-soft)] text-[var(--text)] text-xs font-semibold hover:bg-[var(--surface-border)] transition-colors"
                  href={member.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[var(--surface-soft)] text-[var(--text)] text-xs font-semibold hover:bg-[var(--surface-border)] transition-colors"
                  href={member.linkedinUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.87 0-1.58.7-1.58 1.58 0 .87.71 1.58 1.58 1.58.87 0 1.58-.71 1.58-1.58 0-.88-.71-1.58-1.58-1.58z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Pathways Banner - warm onion gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#6b2c1a] via-[#8b4513] to-[#a0522d] p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col space-y-1 text-center md:text-left z-10">
          <span className="font-display text-lg font-bold tracking-tight">
            {t('demo')}
          </span>
          <p className="text-xs text-white/90">
            {t('recentSub')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto z-10">
          <button
            type="button"
            onClick={onNavigateToHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/20 text-white border border-white/30 text-xs font-semibold shadow-xs hover:bg-white/30 transition-colors cursor-pointer"
          >
            <span>{t('backHome')}</span>
          </button>
          <button
            type="button"
            onClick={onNavigateToScanner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#fff4de] text-[#8b4513] text-xs font-bold shadow-xs hover:bg-white transition-colors cursor-pointer"
          >
            <span>{t('tryScanner')}</span>
          </button>
        </div>
      </div>

      {/* Micro Footer */}
      <footer className="pt-4 pb-2 text-center text-xs text-[var(--muted)]">
        <p>© 2026 Qnion prototype · SIH 2026.</p>
      </footer>
    </div>
  );
};
