import { CEFRLevel, DifficultyLevel } from './exercise';

export type VocabularyPartOfSpeech =
  | 'Nomen'
  | 'Verb'
  | 'Adjektiv'
  | 'Adverb'
  | 'Präposition'
  | 'Konjunktion'
  | 'Pronomen'
  | 'Ausdruck'
  | string;

export interface VocabularyEntry {
  id: string;
  level: CEFRLevel;
  topic: string;
  subtopic?: string;
  word: string;
  article?: 'der' | 'die' | 'das' | '';
  plural?: string;
  partOfSpeech: VocabularyPartOfSpeech;
  meaningId: string;
  exampleDe: string;
  exampleId: string;
  difficulty?: DifficultyLevel;
  audioPath?: string;
  /** Präsens 3. Person Singular (z. B. "geht", "fährt") */
  praesens?: string;
  /** Präteritum 3. Person Singular (z. B. "ging", "fuhr") */
  praeteritum?: string;
  /** Perfekt mit Hilfsverb (z. B. "ist gegangen", "hat gearbeitet") */
  perfekt?: string;
  /** Partizip II (z. B. "gegangen", "gearbeitet") */
  partizip2?: string;
  /** Komparativ für Adjektive (z. B. "schneller") */
  comparative?: string;
  /** Superlativ für Adjektive (z. B. "am schnellsten") */
  superlative?: string;
  relatedWords?: string[];
}

