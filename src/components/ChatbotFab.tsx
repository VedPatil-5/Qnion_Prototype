import React, { useMemo, useState } from 'react';
import { ExternalLink, MessageCircle, Send, ShieldCheck, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { assistantFaqs, AssistantFaq } from '../data/gradingFaqs';

const findAnswer = (question: string): AssistantFaq | null => {
  const normalized = question.toLowerCase();
  const match = assistantFaqs
    .map((faq) => ({ faq, score: faq.keywords.reduce((score, keyword) => score + (normalized.includes(keyword) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score)[0];
  return match?.score ? match.faq : null;
};

export const ChatbotFab: React.FC<{ officerMode?: boolean }> = ({ officerMode = false }) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<AssistantFaq | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { t } = useI18n();
  const prompt = useMemo(() => t('questionPlaceholder'), [t]);

  const ask = (event?: React.FormEvent) => {
    event?.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion) return;
    setAnswer(findAnswer(submittedQuestion));
    setHasSubmitted(true);
  };

  return <>
    <div className="fixed bottom-6 right-4 z-40">
      <button type="button" onClick={() => setOpen(true)} aria-label={t('aiAssistant')} className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--primary)] text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"><MessageCircle className="h-6 w-6" /></button>
    </div>
    {open && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="assistant-title" onClick={() => setOpen(false)}>
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-[var(--text)] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]"><ShieldCheck className="h-6 w-6" /></div><div><h2 id="assistant-title" className="font-display text-lg font-bold">{officerMode ? t('assistantTitle') : t('aiAssistant')}</h2><p className="text-xs text-[var(--muted)]">{officerMode ? t('assistantSub') : t('prototype')}</p></div></div>
          <button type="button" onClick={() => setOpen(false)} aria-label={t('close')} className="rounded-full p-2 text-[var(--muted)] hover:bg-[var(--surface-strong)]"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={ask} className="mt-5 flex gap-2">
          <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={prompt} aria-label={t('askQuestion')} className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          <button type="submit" disabled={!question.trim()} className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-3 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-4 w-4" /><span className="hidden sm:inline">{t('ask')}</span></button>
        </form>
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4" aria-live="polite">
          {answer ? <><p className="text-sm leading-relaxed">{answer.answer}</p><a href={answer.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)]">{t('source')}: {answer.sourceName}<ExternalLink className="h-3 w-3" /></a></> : hasSubmitted ? <p className="text-sm leading-relaxed">{t('assistantNoMatch')}</p> : <><p className="text-sm leading-relaxed">{t('askQuestion')}</p><p className="mt-3 text-xs text-[var(--muted)]">{t('assistantDisclaimer')}</p></>}
        </div>
        <button type="button" onClick={() => setOpen(false)} className="mt-5 w-full rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white">{t('gotIt')}</button>
      </div>
    </div>}
  </>;
};
