import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  Copy,
  HelpCircle,
  Info,
  Lightbulb,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  BEGINNER_QUIZ_QUESTIONS,
  CORE_SECRETS,
  ESSENTIAL_DIPHTHONGS,
  GERMAN_ALPHABET,
  SURVIVAL_PHRASES,
  UMLAUTS_AND_SPECIALS,
  SurvivalPhrase,
} from '../../data/a0Data';
import { NavPage } from '../../types/learning';
import { UILanguage } from '../../types/progress';
import { GermanFlagMark } from '../ui/TouchFlowPrimitives';

interface ErsteSchritteViewProps {
  onNavigate: (page: NavPage) => void;
  uiLanguage?: UILanguage;
  soundEnabled?: boolean;
}

type TabType = 'alphabet' | 'phrases' | 'secrets' | 'quiz';

export function ErsteSchritteView({
  onNavigate,
  uiLanguage = 'id',
  soundEnabled = true,
}: ErsteSchritteViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('alphabet');

  // Phrases Filter
  const [phraseCategory, setPhraseCategory] = useState<string>('all');
  const [copiedPhraseId, setCopiedPhraseId] = useState<string | null>(null);

  // Alphabet Search / Filter
  const [alphabetSearch, setAlphabetSearch] = useState('');

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleCopy = (phrase: SurvivalPhrase) => {
    try {
      navigator.clipboard.writeText(`${phrase.german} - ${phrase.indonesian}`);
      setCopiedPhraseId(phrase.id);
      setTimeout(() => setCopiedPhraseId(null), 2000);
    } catch {
      // Ignore
    }
  };

  const filteredPhrases = SURVIVAL_PHRASES.filter((p) => {
    if (phraseCategory === 'all') return true;
    return p.category === phraseCategory;
  });

  const filteredLetters = GERMAN_ALPHABET.filter((item) => {
    if (!alphabetSearch.trim()) return true;
    const q = alphabetSearch.toLowerCase();
    return (
      item.letter.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.exampleWord.toLowerCase().includes(q) ||
      item.exampleMeaningId.toLowerCase().includes(q)
    );
  });

  // Quiz evaluation
  const handleSelectAnswer = (qId: string, idx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
  };

  const quizScore = BEGINNER_QUIZ_QUESTIONS.reduce((score, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? score + 1 : score;
  }, 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#FAF5EC] via-[#F4EDE0] to-[#EAE0D0] dark:from-[#26221D] dark:via-[#1F1C18] dark:to-[#171512] border border-[#E4DAC8] dark:border-[#383229] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#2C2721] border border-[#DFCBB5] dark:border-[#423A30] text-[12.5px] font-bold text-[#B91C1C] dark:text-[#FCA5A5] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zona Pemula Mutlak · Level A0</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB] tracking-tight">
              Langkah Pertama: Belajar Bahasa Jerman dari Nol
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#57524C] dark:text-[#C8C1B8] leading-relaxed">
              Selamat datang di cerDeutsch! Di zona pemula ini, Anda akan mempelajari cara membaca alfabet Jerman, membunyikan huruf unik seperti <em>ä, ö, ü, ß</em>, menguasai 20 kalimat percakapan penyelamat hari pertama, serta memahami 3 rahasia tata bahasa dasar hanya dalam beberapa menit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('lernen')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-semibold text-[14px] shadow-sm transition-all cursor-pointer"
            >
              <span>Langsung ke Kurikulum A1</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-[12px] text-center text-[#786E64] dark:text-[#9E968C]">
              100% Gratis & Mandiri (Offline)
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation Controls */}
      <section className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#EFEAE0] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F]">
        {[
          { id: 'alphabet', label: '1. Alfabet & Bunyi Unik', icon: BookOpen },
          { id: 'phrases', label: '2. 20 Kalimat Penyelamat', icon: MessageCircle },
          { id: 'secrets', label: '3. Tiga Rahasia Dasar', icon: Lightbulb },
          { id: 'quiz', label: '4. Cek Cepat Pemula', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              aria-pressed={active}
              className={`flex-1 min-w-[140px] sm:min-w-fit flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                active
                  ? 'bg-white text-[#B91C1C] shadow-xs dark:bg-[#1F1D1A] dark:text-[#FCA5A5]'
                  : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8] dark:hover:text-[#F5F2EB]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </section>

      {/* ========================================================================= */}
      {/* TAB 1: ALFABET & BUNYI UNIK JERMAN */}
      {/* ========================================================================= */}
      {activeTab === 'alphabet' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Notice */}
          <div className="p-4 rounded-2xl bg-[#FFFBEB] dark:bg-[#282110] border border-[#FDE68A] dark:border-[#524119] flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[13.5px] text-amber-900 dark:text-amber-200 space-y-1">
              <p className="font-semibold">Kunci Pengucapan Bahasa Jerman:</p>
              <p>
                Bahasa Jerman adalah bahasa yang <strong>konsisten secara fonetik</strong>—hampir semua kata dibaca persis seperti huruf yang tertulis, tidak seperti bahasa Inggris! Huruf yang paling sering mengecoh pemula adalah <strong>J (dibaca Y)</strong>, <strong>V (dibaca F)</strong>, <strong>W (dibaca V)</strong>, dan <strong>Z (dibaca TS)</strong>.
              </p>
            </div>
          </div>

          {/* Special Sounds Section (Umlauts & Eszett) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
              <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Huruf Unik Khas Jerman (Umlaut & Eszett)
              </h2>
            </div>
            <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
              Bahasa Jerman memiliki 4 karakter unik yang tidak ada di alfabet dasar Indonesia. Pelajari posisi bibir dan lidah berikut:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UMLAUTS_AND_SPECIALS.map((item) => (
                <div
                  key={item.symbol}
                  className="p-5 rounded-2xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3 hover:border-[#B91C1C]/40 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-display font-extrabold text-[#B91C1C] dark:text-[#EF4444]">
                      {item.symbol}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FAF5EC] dark:bg-[#2C2721] text-[12px] font-bold text-[#786E64] dark:text-[#C8C1B8] border border-[#EADBC0] dark:border-[#423A30]">
                      {item.name}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[13.5px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      Cara Pengucapan:
                    </p>
                    <p className="text-[13.5px] text-[#B91C1C] dark:text-[#FCA5A5] font-medium bg-[#FDF2F2] dark:bg-[#2C1A19] p-2.5 rounded-xl border border-[#F5D0D0] dark:border-[#4A2624]">
                      {item.pronunciationId}
                    </p>
                  </div>

                  <p className="text-[13px] text-[#57524C] dark:text-[#B5AEA5] leading-relaxed">
                    {item.explanationId}
                  </p>

                  <div className="pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25] space-y-1.5">
                    <p className="text-[12px] font-bold text-[#786E64] dark:text-[#9E968C] uppercase tracking-wide">
                      Contoh Kata:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((ex) => (
                        <div
                          key={ex.word}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F4] dark:bg-[#262320] text-[12.5px] text-[#1C1917] dark:text-[#F5F2EB] border border-[#E6E0D4] dark:border-[#3A352F]"
                        >
                          <strong>{ex.word}</strong> <span className="text-[#877E73]">[{ex.phonetic}]</span> = {ex.meaningId}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Diphthongs Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
              <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Kombinasi Huruf Penting (Diftong & Desis)
              </h2>
            </div>
            <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
              Perhatikan kombinasi vokal berikut karena bunyinya berbeda dari huruf terpisah:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ESSENTIAL_DIPHTHONGS.map((item) => (
                <div
                  key={item.symbol}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-[#B91C1C] dark:text-[#EF4444]">
                      {item.symbol}
                    </span>
                    <span className="text-[12px] font-semibold text-[#786E64] dark:text-[#9E968C]">
                      {item.name}
                    </span>
                  </div>
                  <p className="text-[13px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
                    {item.pronunciationId}
                  </p>
                  <p className="text-[12.5px] text-[#57524C] dark:text-[#B5AEA5]">
                    {item.explanationId}
                  </p>
                  <div className="space-y-1 pt-1 text-[12px]">
                    {item.examples.map((ex) => (
                      <div key={ex.word} className="text-[#3F3A35] dark:text-[#D1CBC2]">
                        • <strong>{ex.word}</strong> [{ex.phonetic}] = {ex.meaningId}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Full A-Z Alphabet Cards */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  Tabel Alfabet Lengkap A–Z
                </h2>
                <p className="text-[13.5px] text-[#57524C] dark:text-[#C8C1B8]">
                  Klik atau pelajari nama huruf dan contoh kata pengingatnya:
                </p>
              </div>
              <input
                type="text"
                placeholder="Cari huruf atau contoh..."
                value={alphabetSearch}
                onChange={(e) => setAlphabetSearch(e.target.value)}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] bg-white dark:bg-[#1F1D1A] text-[13.5px] text-[#1C1917] dark:text-[#F5F2EB] placeholder:text-[#877E73] focus:outline-none focus:border-[#B91C1C]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredLetters.map((item) => (
                <div
                  key={item.letter}
                  className={`p-3.5 rounded-2xl bg-white dark:bg-[#1F1D1A] border transition-all space-y-1.5 ${
                    item.tip
                      ? 'border-amber-300 dark:border-amber-700 bg-amber-50/20 dark:bg-amber-950/10'
                      : 'border-[#E6E0D4] dark:border-[#2E2A25]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {item.letter}
                    </span>
                    <span className="text-[11.5px] font-bold text-[#B91C1C] dark:text-[#FCA5A5] px-1.5 py-0.5 rounded-md bg-[#FAF5EC] dark:bg-[#2C2721]">
                      "{item.name}"
                    </span>
                  </div>

                  <p className="text-[11.5px] text-[#57524C] dark:text-[#C8C1B8] leading-tight">
                    {item.phoneticId}
                  </p>

                  <div className="pt-1 border-t border-[#EFEAE0] dark:border-[#2E2A25] text-[11px] leading-tight text-[#786E64] dark:text-[#9E968C]">
                    <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">{item.exampleWord}</span> ({item.exampleMeaningId})
                  </div>

                  {item.tip && (
                    <p className="text-[10px] text-amber-800 dark:text-amber-300 font-semibold bg-amber-100/60 dark:bg-amber-900/30 p-1 rounded">
                      ⚠️ {item.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 20 UNGKAPAN PENYELAMAT HARI PERTAMA */}
      {/* ========================================================================= */}
      {activeTab === 'phrases' && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              20 Kalimat Penyelamat Hari Pertama (Survival Phrases)
            </h2>
            <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
              Hafalkan ungkapan-ungkapan kunci ini. Kalimat-kalimat ini akan langsung berguna sejak hari pertama Anda berinteraksi dengan orang Jerman atau mulai belajar bahasa Jerman!
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Semua (20)' },
              { id: 'salam', label: 'Salam & Sapaan (7)' },
              { id: 'perkenalan', label: 'Perkenalan Diri (4)' },
              { id: 'kesopanan', label: 'Kesopanan (4)' },
              { id: 'darurat', label: 'Darurat & Minta Tolong (5)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setPhraseCategory(cat.id)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors cursor-pointer ${
                  phraseCategory === cat.id
                    ? 'bg-[#B91C1C] text-white shadow-2xs'
                    : 'bg-white dark:bg-[#1F1D1A] text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8] dark:hover:text-[#F5F2EB] border border-[#E6E0D4] dark:border-[#3A352F]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Phrases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrases.map((phrase, idx) => (
              <div
                key={phrase.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3 hover:border-[#B91C1C]/40 transition-colors shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5] px-2.5 py-0.5 rounded-full bg-[#FAF5EC] dark:bg-[#2C2721]">
                      {phrase.categoryLabelId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(phrase)}
                      title="Salin kalimat"
                      className="p-1.5 rounded-lg text-[#786E64] hover:bg-[#EFEAE0] dark:text-[#A8A095] dark:hover:bg-[#262320] transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {phrase.german}
                    </h3>
                    <p className="text-[13px] font-mono text-[#877E73] dark:text-[#9E968C]">
                      [{phrase.phoneticId}]
                    </p>
                  </div>

                  <p className="text-[15px] font-semibold text-emerald-800 dark:text-emerald-300">
                    "{phrase.indonesian}"
                  </p>

                  <p className="text-[12.5px] text-[#57524C] dark:text-[#B5AEA5] leading-relaxed pt-1">
                    💡 <em>{phrase.contextId}</em>
                  </p>
                </div>

                {copiedPhraseId === phrase.id && (
                  <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-1 rounded text-center">
                    Tersalin ke papan klip!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 3 RAHASIA DASAR TATA BAHASA */}
      {/* ========================================================================= */}
      {activeTab === 'secrets' && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              3 Rahasia Inti Tata Bahasa Jerman (Pahami dalam 3 Menit)
            </h2>
            <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
              Tata bahasa Jerman terkenal teratur dan logis. Tiga konsep berikut adalah pondasi terpenting sebelum Anda mulai belajar materi tingkat lanjut:
            </p>
          </div>

          <div className="space-y-6">
            {CORE_SECRETS.map((secret) => (
              <div
                key={secret.number}
                className="p-6 rounded-3xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4 shadow-2xs"
              >
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#B91C1C] text-white font-display text-xl font-bold flex items-center justify-center shrink-0">
                    {secret.number}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {secret.titleId}
                    </h3>
                    <p className="text-[13px] text-[#786E64] dark:text-[#9E968C] font-mono">
                      {secret.titleDe}
                    </p>
                  </div>
                </div>

                <p className="text-[14.5px] font-medium text-[#1C1917] dark:text-[#F5F2EB] bg-[#FAF5EC] dark:bg-[#2C2721] p-3.5 rounded-2xl border border-[#EADBC0] dark:border-[#3A3122]">
                  {secret.summaryId}
                </p>

                <div className="space-y-2 pl-2 border-l-2 border-[#B91C1C]/40">
                  {secret.detailsId.map((detail, dIdx) => (
                    <p key={dIdx} className="text-[13.5px] text-[#57524C] dark:text-[#C8C1B8] leading-relaxed">
                      • {detail}
                    </p>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25] space-y-2">
                  <p className="text-[12.5px] font-bold text-[#786E64] dark:text-[#9E968C] uppercase tracking-wider">
                    Contoh Penerapan Nyata:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {secret.examples.map((ex, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-3 rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] space-y-1 text-[13px]"
                      >
                        <p className="font-bold text-[#1C1917] dark:text-[#F5F2EB]">{ex.german}</p>
                        <p className="text-[#57524C] dark:text-[#C8C1B8]">{ex.indonesian}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CEK CEPAT PEMULA (MINI QUIZ) */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Cek Cepat Pemula (5 Pertanyaan Santai)
            </h2>
            <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
              Uji pemahaman Anda tentang pengucapan, kalimat darurat, dan aturan dasar bahasa Jerman yang baru saja dipelajari:
            </p>
          </div>

          <div className="space-y-5">
            {BEGINNER_QUIZ_QUESTIONS.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const isSubmitted = submittedQuiz;
              const isCorrect = selected === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#FAF5EC] dark:bg-[#2C2721] border border-[#EADBC0] dark:border-[#423A30] text-[13px] font-bold text-[#B91C1C] dark:text-[#FCA5A5] flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <h3 className="text-[15.5px] font-bold text-[#1C1917] dark:text-[#F5F2EB] leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((option, optIdx) => {
                      const optSelected = selected === optIdx;
                      let btnStyle = 'border-[#E6E0D4] bg-[#FAF8F4] text-[#3F3A35] hover:bg-[#F3EFE6] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#D1CBC2]';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-700';
                        } else if (optSelected && !isCorrect) {
                          btnStyle = 'border-red-400 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200 dark:border-red-800';
                        }
                      } else if (optSelected) {
                        btnStyle = 'border-[#B91C1C] bg-[#FDF2F2] text-[#B91C1C] font-semibold dark:bg-[#2C1A19] dark:text-[#FCA5A5] dark:border-[#DC2626]';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          disabled={submittedQuiz}
                          className={`min-h-[46px] p-3 rounded-xl border text-left text-[13.5px] transition-colors cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {isSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && optSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="p-3 rounded-xl bg-[#FAF5EC] dark:bg-[#26221D] text-[12.5px] text-[#57524C] dark:text-[#C8C1B8] border border-[#EADBC0] dark:border-[#3A3122]">
                      <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB]">Penjelasan:</span> {q.explanationId}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Action Buttons & Result */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col sm:flex-row items-center justify-between gap-4">
            {!submittedQuiz ? (
              <>
                <p className="text-[13px] text-[#786E64] dark:text-[#9E968C]">
                  {Object.keys(selectedAnswers).length} dari 5 soal telah dijawab.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedQuiz(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="min-h-[44px] px-6 rounded-2xl bg-[#B91C1C] hover:bg-[#991B1B] disabled:opacity-50 text-white font-bold text-[14px] transition-colors cursor-pointer"
                >
                  Periksa Jawaban
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold font-display text-[#B91C1C] dark:text-[#EF4444]">
                    Skor: {quizScore} / 5
                  </span>
                  <span className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                    {quizScore === 5 ? '🎉 Sempurna! Anda siap lanjut ke A1.' : 'Bagus sekali! Pengulangan akan membuat Anda semakin mahir.'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="min-h-[42px] px-4 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] text-[13px] font-semibold text-[#57524C] hover:bg-[#FAF8F4] dark:text-[#C8C1B8] dark:hover:bg-[#262320] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ulangi Kuis</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('lernen')}
                    className="min-h-[42px] px-5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-semibold text-[13px] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Lanjut ke Kurikulum A1</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
