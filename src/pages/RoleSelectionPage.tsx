import React from 'react';
import { ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useI18n } from '../i18n';
import { GlobalControls } from '../components/GlobalControls';

export const RoleSelectionPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { t } = useI18n();
  const roles = [
    { id: 'officer', icon: ShieldCheck, title: t('officer'), desc: t('officerDesc'), path: '/officer' },
    { id: 'customer', icon: ShoppingBag, title: t('customer'), desc: t('customerDesc'), path: '/customer' }
  ];
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-[var(--surface)] text-[var(--text)] font-sans">
      <div className="w-full max-w-5xl">
        <div className="flex justify-end mb-10"><GlobalControls /></div>
        <section className="mx-auto max-w-2xl text-center mb-10">
          <img
            src="/assets/qnion-logo.png"
            alt={t('brand')}
            className="mx-auto mb-5 h-24 w-24 rounded-3xl bg-[#fff4de] object-contain shadow-md"
          />
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[var(--primary)]">{t('brand')}</p>
          <p className="mt-2 text-sm italic text-[var(--muted)]">{t('motto')}</p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight">{t('roleTitle')}</h1>
          <p className="mt-4 text-[var(--muted)]">{t('roleSubtitle')}</p>
        </section>
        <div className="grid gap-5 md:grid-cols-2">
          {roles.map(({ id, icon: Icon, title, desc, path }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(path)}
              className="group text-left rounded-3xl border border-[var(--border)] bg-[var(--card)]/80 p-7 shadow-[0_12px_35px_var(--shadow)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_var(--shadow-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                  <Icon className="h-7 w-7" />
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--primary)]" />
              </div>
              <h2 className="mt-7 font-display text-2xl font-bold">{title}</h2>
              <p className="mt-2 leading-relaxed text-[var(--muted)]">{desc}</p>
              <span className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white group-hover:bg-[var(--primary-hover)] transition-colors">
                {t('continue')}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-[var(--muted)]">{t('pagePrototype')}</p>
      </div>
    </main>
  );
};
