import { GRAMMAR_TOPICS, TOPIC_CURRICULUM } from '../data/curriculum';
import { getLoadedVocabulary } from '../data/vocabulary';
import { ALL_EXERCISES } from '../data/exercises';
import { CEFRLevel, Exercise, ModuleSkill } from '../types/exercise';
import { GrammarTopic } from '../types/learning';
import { VocabularyEntry } from '../types/vocabulary';

export type SearchItemKind =
  | 'vocab'
  | 'grammar'
  | 'exercise'
  | 'topic';

export interface SearchFilterOptions {
  query: string;
  level: CEFRLevel | 'Alle';
  module: ModuleSkill | 'Alle';
  kind: SearchItemKind | 'Alle';
  difficulty: Exercise['difficulty'] | 'Alle';
  topic: string | 'Alle';
  vocabList?: VocabularyEntry[];
}

export interface SearchResultBundle {
  vocab: VocabularyEntry[];
  grammar: GrammarTopic[];
  exercises: Exercise[];
  topics: typeof TOPIC_CURRICULUM;
  totalCount: number;
}

export function getAllAvailableTopics(
  level: CEFRLevel | 'Alle' = 'Alle',
  vocabList?: VocabularyEntry[],
): string[] {
  const set = new Set<string>();
  for (const t of TOPIC_CURRICULUM) {
    if (level === 'Alle' || t.level === level) set.add(t.topic);
  }
  for (const ex of ALL_EXERCISES) {
    if (level === 'Alle' || ex.level === level) set.add(ex.topic);
  }
  const vList = vocabList ?? getLoadedVocabulary(level);
  for (const v of vList) {
    if (level === 'Alle' || v.level === level) set.add(v.topic);
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'de'));
}

export function searchLearningContent(filters: SearchFilterOptions): SearchResultBundle {
  const q = filters.query.trim().toLowerCase();

  const matchesLevel = (lvl: CEFRLevel) => filters.level === 'Alle' || lvl === filters.level;
  const matchesTopic = (topicName: string) =>
    filters.topic === 'Alle' || topicName.toLowerCase() === filters.topic.toLowerCase();

  const includeVocab =
    (filters.kind === 'Alle' || filters.kind === 'vocab') &&
    (filters.module === 'Alle' || filters.module === 'wortschatz') &&
    filters.difficulty === 'Alle';

  const includeGrammar =
    (filters.kind === 'Alle' || filters.kind === 'grammar') &&
    (filters.module === 'Alle' || filters.module === 'grammatik') &&
    filters.difficulty === 'Alle';

  const includeTopics =
    (filters.kind === 'Alle' || filters.kind === 'topic') &&
    filters.module === 'Alle' &&
    filters.difficulty === 'Alle';

  const includeExercises = filters.kind === 'Alle' || filters.kind === 'exercise';

  const candidateVocab = filters.vocabList ?? getLoadedVocabulary(filters.level);
  const vocab = includeVocab
    ? candidateVocab.filter((item) => {
        if (!matchesLevel(item.level) || !matchesTopic(item.topic)) return false;
        if (!q) return true;
        return (
          item.word.toLowerCase().includes(q) ||
          item.meaningId.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q) ||
          item.exampleDe.toLowerCase().includes(q) ||
          (item.relatedWords ?? []).some((w) => w.toLowerCase().includes(q))
        );
      })
    : [];

  const grammar = includeGrammar
    ? GRAMMAR_TOPICS.filter((item) => {
        if (!matchesLevel(item.level)) return false;
        if (filters.topic !== 'Alle') {
          const matchesCat = item.category.toLowerCase().includes(filters.topic.toLowerCase());
          const matchesTitle = item.title.toLowerCase().includes(filters.topic.toLowerCase());
          if (!matchesCat && !matchesTitle) return false;
        }
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.explanationDe.toLowerCase().includes(q) ||
          item.explanationId.toLowerCase().includes(q)
        );
      })
    : [];

  const exercises = includeExercises
    ? ALL_EXERCISES.filter((ex) => {
        if (!matchesLevel(ex.level) || !matchesTopic(ex.topic)) return false;
        if (filters.module !== 'Alle' && ex.skill !== filters.module) return false;
        if (filters.difficulty !== 'Alle' && ex.difficulty !== filters.difficulty) return false;
        if (!q) return true;
        return (
          ex.title.toLowerCase().includes(q) ||
          ex.subtitle.toLowerCase().includes(q) ||
          ex.topic.toLowerCase().includes(q) ||
          ex.formatLabel.toLowerCase().includes(q) ||
          (ex.learningObjectiveDe ?? '').toLowerCase().includes(q) ||
          ex.questions.some((qq) => qq.question.toLowerCase().includes(q))
        );
      })
    : [];

  const topics = includeTopics
    ? TOPIC_CURRICULUM.filter((t) => {
        if (!matchesLevel(t.level) || !matchesTopic(t.topic)) return false;
        if (!q) return true;
        return (
          t.topic.toLowerCase().includes(q) ||
          t.objectiveDe.toLowerCase().includes(q) ||
          t.grammarFocus.toLowerCase().includes(q) ||
          t.keyWords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : [];

  return {
    vocab,
    grammar,
    exercises,
    topics,
    totalCount: vocab.length + grammar.length + exercises.length + topics.length,
  };
}
