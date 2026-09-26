import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';
import { GlobalControls } from '../components/GlobalControls';

const DEMO_ID = 'officer@qnion.demo';
const DEMO_PASSWORD = 'QN-Demo-2026-Only!';

export const OfficerAuthPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { t } = useI18n();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [signUp, setSignUp] = useState(false);

  const autofill = () => {
    setId(DEMO_ID);
    setPassword(DEMO_PASSWORD);
    setError('');
    setSignUp(false);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (id.trim() === DEMO_ID && password === DEMO_PASSWORD) {
      sessionStorage.setItem('qnion:officer', 'true');
      navigate('/officer/dashboard');
    } else {
      setError(t('invalidLogin'));
    }
  };

  return (
    <main className="min-h-screen bg-[var(--surface)] px-4 py-8 text-[var(--text)] font-sans">
      <div className="mx-auto flex w-full max-w-5xl justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--primary)] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backHome')}
        </button>
        <GlobalControls compact />
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <section>
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{signUp ? t('signup') : t('login')}</h1>
          <p className="mt-3 max-w-lg text-[var(--muted)]">{t('loginSub')}</p>
          <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
            <p className="font-semibold text-[var(--text)]">{t('demoCredentials')}</p>
            <p className="mt-2 font-mono">Officer ID: {DEMO_ID}</p>
            <p className="mt-2 font-mono">Password: {DEMO_PASSWORD}</p>
            <p className="mt-2 text-xs">{t('demoNote')}</p>
          </div>
        </section>
        <form
          onSubmit={submit}
          autoComplete="off"
          className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_14px_40px_var(--shadow)]"
        >
          <label className="block text-sm font-semibold text-[var(--text)]">
            {t('officerId')}
            <input
              required
              value={id}
              onChange={(e) => { setId(e.target.value); setError(''); }}
              type="email"
              autoComplete="username"
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-[var(--text)]">
            {t('password')}
            <span className="relative mt-2 block">
              <input
                required
                name="demo-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                data-demo-credential="true"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                spellCheck={false}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 pr-11 outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] cursor-pointer"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </label>
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 dark:bg-red-950/50 px-3 py-2 text-sm text-red-700 dark:text-red-300">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)] cursor-pointer"
          >
            {t('loginButton')}
          </button>
          <button
            type="button"
            onClick={autofill}
            className="mt-3 w-full rounded-xl border border-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary-soft)] cursor-pointer"
          >
            {t('autofillCredentials')}
          </button>
          <button
            type="button"
            onClick={() => { setSignUp(!signUp); setError(''); }}
            className="mt-4 w-full text-sm font-semibold text-[var(--primary)] cursor-pointer"
          >
            {signUp ? t('login') : t('signup')}
          </button>
        </form>
      </div>
    </main>
  );
};
