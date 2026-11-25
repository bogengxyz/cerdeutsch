import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookMarked,
  BookOpen,
  Headphones,
  Layers,
  Mic,
  PenLine,
  Search,
  Trash2,
} from 'lucide-react';
import { GRAMMAR_TOPICS } from '../../data/curriculum';
import { useVocabularyForBookmarkIds } from '../../data/vocabulary';
import { loadAllCombinedExercises } from '../../data/questionBank';
import { getTotalBookmarkCount } from '../../services/bookmarkService';
import { buildRandomPracticeExercise } from '../../services/randomPracticeService';
import { CEFRLevel, Exercise } from '../../types/exercise';
import { NavPage } from '../../types/learning';
import { BookmarkCategory, BookmarkCollection } from '../../types/phase4';
import { sanitizeExamBrandingText } from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface SammlungViewProps {
  bookmarks: BookmarkCollection;
  onRemoveBookmark: (category: BookmarkCategory, itemId: string) => void;
  onStartExercise: (exercise: Exercise) => void;
  onOpenGrammar: (grammarId: string, level: CEFRLevel) => void;
  onOpenVocab: (level: CEFRLevel) => void;
  onNavigate: (page: NavPage) => void;
  recentQuestionIds?: string[];
}

const CATEGORY_TABS: {
  id: BookmarkCategory | 'alle';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'alle', label: 'Alle', icon: Bookmark },
  { id: 'vocab', label: 'Wortschatz', icon: BookMarked },
  { id: 'grammar', label: 'Grammatik', icon: Layers },
  { id: 'lesen', label: 'Lesen', icon: BookOpen },
  { id: 'hoeren', label: 'Hören', icon: Headphones },
  { id: 'schreiben', label: 'Schreiben', icon: PenLine },
  { id: 'sprechen', label: 'Sprechen', icon: Mic },
];

interface ResolvedBookmarkItem {
  category: BookmarkCategory;
  categoryLabel: string;
  id: string;
  level: CEFRLevel;
  title: string;
  subtitle: string;
  meta: string;
  onOpen: () => void;
}

export function SammlungView({
  bookmarks,
  onRemoveBookmark,
  onStartExercise,
  onOpenGrammar,
  onOpenVocab,
  onNavigate,
  recentQuestionIds = [],
}: SammlungViewProps) {
  const [categoryFilter, setCategoryFilter] = useState<BookmarkCategory | 'alle'>('alle');
  const [levelFilter, setLevelFilter] = useState<CEFRLevel | 'Alle'>('Alle');
  const [search, setSearch] = useState('');
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [launchingPractice, setLaunchingPractice] = useState(false);

  React.useEffect(() => {
    let active = true;
    void loadAllCombinedExercises().then((exs) => {
      if (active) setAllExercises(exs);
    });
    return () => {
      active = false;
    };
  }, []);

  const totalCount = getTotalBookmarkCount(bookmarks);
  const bookmarkedQuestionCount = bookmarks.questions?.length ?? 0;

  const handlePracticeBookmarked = async () => {
    setLaunchingPractice(true);
    try {
      const exs = allExercises.length > 0 ? allExercises : await loadAllCombinedExercises();
      const built = buildRandomPracticeExercise({
        exercises: exs,
        mode: 'bookmarked',
        count: 30,
        level: levelFilter,
        skill: 'Alle',
        topic: 'Alle',
        difficulty: 'Alle',
        bookmarks,
        recentQuestionIds,
        includePendingAudio: true,
      });
      if (built) {
        onStartExercise(built);
      }
    } finally {
      setLaunchingPractice(false);
    }
  };

  const { words: vocabWords } = useVocabularyForBookmarkIds(bookmarks.vocab);

  const items = useMemo<ResolvedBookmarkItem[]>(() => {
    const resolved: ResolvedBookmarkItem[] = [];

    for (const id of bookmarks.vocab) {
      const v = vocabWords.find((w) => w.id === id);
      if (v) {
        const displayWord = v.article ? `${v.article} ${v.word}` : v.word;
        resolved.push({
          category: 'vocab',
          categoryLabel: 'Wortschatz',
          id: v.id,
          level: v.level,
          title: displayWord,
          subtitle: `${v.meaningId} · „${v.exampleDe}“`,
          meta: `${v.level} · ${v.topic} · ${v.partOfSpeech}`,
          onOpen: () => onOpenVocab(v.level),
        });
      }
    }

    for (const id of bookmarks.grammar) {
      const g = GRAMMAR_TOPICS.find((item) => item.id === id);
      if (g) {
        resolved.push({
          category: 'grammar',
          categoryLabel: 'Grammatik',
          id: g.id,
          level: g.level,
          title: g.title,
          subtitle: g.summary,
          meta: `${g.level} · ${g.category}`,
          onOpen: () => onOpenGrammar(g.id, g.level),
        });
      }
    }

    const skillCategories: { key: 'lesen' | 'hoeren' | 'schreiben' | 'sprechen'; label: string }[] =
      [
        { key: 'lesen', label: 'Lesen' },
        { key: 'hoeren', label: 'Hören' },
        { key: 'schreiben', label: 'Schreiben' },
        { key: 'sprechen', label: 'Sprechen' },
      ];

    for (const { key, label } of skillCategories) {
      for (const id of bookmarks[key]) {
        const ex = allExercises.find((e) => e.id === id);
        if (ex) {
          resolved.push({
            category: key,
            categoryLabel: label,
            id: ex.id,
            level: ex.level,
            title: sanitizeExamBrandingText(ex.title),
            subtitle: sanitizeExamBrandingText(ex.subtitle),
            meta: `${ex.level} · ${ex.topic} · ${sanitizeExamBrandingText(ex.formatLabel)}`,
            onOpen: () => onStartExercise(ex),
          });
        }
      }
    }

    const qBookmarkIds = new Set(bookmarks.questions ?? []);
    if (qBookmarkIds.size > 0) {
      for (const ex of allExercises) {
        for (const q of ex.questions) {
          if (qBookmarkIds.has(q.id)) {
            resolved.push({
              category: 'questions',
              categoryLabel: 'Frage',
              id: q.id,
              level: ex.level,
              title: q.question,
              subtitle: sanitizeExamBrandingText(ex.title),
              meta: `${ex.level} · ${ex.topic} · ${ex.skill}`,
              onOpen: () => onStartExercise(ex),
            });
          }
        }
      }
    }

    return resolved;
  }, [bookmarks, allExercises, onOpenGrammar, onOpenVocab, onStartExercise, vocabWords]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (categoryFilter !== 'alle' && item.category !== categoryFilter) return false;
      if (levelFilter !== 'Alle' && item.level !== levelFilter) return false;
      if (q) {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.meta.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, categoryFilter, levelFilter, search]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Meine Sammlung ({totalCount})
          </h1>
          <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
            Deine persönlich gespeicherten Vokabeln, Grammatikthemen sowie Lese-, Hör-, Schreib- und
            Sprechaufgaben an einem Ort.
          </p>
        </div>

        <div
          role="group"
          aria-label="Sammlung nach Niveau filtern"
          className="flex flex-wrap items-center gap-1.5 bg-[#EFEAE0] dark:bg-[#262320] p-1 rounded-xl self-start shrink-0 border border-[#E6E0D4] dark:border-[#3A352F]"
        >
          {(['Alle', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => {
            const active = levelFilter === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevelFilter(lvl)}
                aria-pressed={active}
                className={`min-h-[38px] px-3.5 rounded-lg text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#B91C1C] text-white shadow-xs dark:bg-[#DC2626]'
                    : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8] dark:hover:text-[#F5F2EB]'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </section>

      {/* Category Filter Tabs & Search */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const count = tab.id === 'alle' ? items.length : (bookmarks[tab.id]?.length ?? 0);
              const active = categoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  aria-pressed={active}
                  className={`min-h-[42px] px-3.5 rounded-xl text-[13px] font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer border ${
                    active
                      ? 'bg-[#B91C1C] text-white border-[#B91C1C] dark:bg-[#DC2626] dark:border-[#DC2626]'
                      : 'bg-white text-[#57524C] hover:bg-[#FAF8F4] border-[#E6E0D4] dark:bg-[#1F1D1A] dark:text-[#C8C1B8] dark:border-[#2E2A25]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  <span className="tabular-nums opacity-85">({count})</span>
                </button>
              );
            })}
          </div>

          {(bookmarkedQuestionCount > 0 ||
            bookmarks.lesen.length + bookmarks.hoeren.length > 0) && (
            <TouchButton
              variant="primary"
              size="sm"
              disabled={launchingPractice}
              onClick={() => void handlePracticeBookmarked()}
            >
              {launchingPractice ? 'Wird geladen...' : 'Gespeicherte Fragen üben'}
              <ArrowRight className="w-4 h-4" />
            </TouchButton>
          )}
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#7C756D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <label htmlFor="sammlung-search" className="sr-only">
            In Sammlung suchen
          </label>
          <input
            id="sammlung-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Gespeicherte Inhalte durchsuchen..."
            className="w-full min-h-[48px] pl-10 pr-4 rounded-xl border border-[#E6E0D4] bg-white text-[15px] text-[#1C1917] placeholder:text-[#7C756D] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/10 dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
          />
        </div>
      </div>

      {totalCount === 0 ? (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center space-y-4 border border-[#E6E0D4] dark:border-[#2E2A25]">
          <Bookmark className="w-9 h-9 text-[#B91C1C] dark:text-[#EF4444] mx-auto" />
          <div className="space-y-1.5 max-w-lg mx-auto">
            <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Deine Sammlung ist noch leer
            </h2>
            <p className="text-[14px] leading-6 text-[#57524C] dark:text-[#C8C1B8]">
              Tippe bei Vokabeln, Grammatikthemen oder Übungen auf das Lesezeichen-Symbol, um
              wichtige Inhalte hier für eine gezielte Wiederholung zu speichern.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <TouchButton variant="primary" size="sm" onClick={() => onNavigate('wortschatz')}>
              Wortschatz öffnen
            </TouchButton>
            <TouchButton variant="secondary" size="sm" onClick={() => onNavigate('grammatik')}>
              Grammatik öffnen
            </TouchButton>
          </div>
        </section>
      ) : filtered.length === 0 ? (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center space-y-3 border border-[#E6E0D4] dark:border-[#2E2A25]">
          <p className="text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
            Keine gespeicherten Einträge für diesen Filter gefunden.
          </p>
          <TouchButton
            variant="secondary"
            size="sm"
            onClick={() => {
              setCategoryFilter('alle');
              setLevelFilter('Alle');
              setSearch('');
            }}
          >
            Alle gespeicherten Inhalte anzeigen
          </TouchButton>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          {filtered.map((item) => (
            <article
              key={`${item.category}::${item.id}`}
              className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] flex flex-col justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#FCA5A5]">
                    {item.categoryLabel} · {item.meta}
                  </span>
                </div>
                <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  {item.title}
                </h2>
                <p className="text-[14px] leading-5 text-[#57524C] dark:text-[#C8C1B8] line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                <TouchButton
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveBookmark(item.category, item.id)}
                  aria-label={`${item.title} aus Sammlung entfernen`}
                >
                  <Trash2 className="w-4 h-4 text-[#6B6560]" />
                  Entfernen
                </TouchButton>

                <TouchButton variant="primary" size="sm" onClick={item.onOpen}>
                  Öffnen
                  <ArrowRight className="w-4 h-4" />
                </TouchButton>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
