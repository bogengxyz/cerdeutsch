import { ALL_EXERCISES } from '../exercises';
import { CEFRLevel, Exercise, ModuleSkill } from '../../types/exercise';

export type QuestionBankSliceLoader = () => Promise<Exercise[]>;

const SLICE_CACHE = new Map<string, Exercise[]>();

/**
 * Registry of lazy-loaded question bank slices per CEFR level and module.
 * Each slice is dynamically imported so the initial app bundle stays lightweight
 * while supporting 4,800+ structured questions across A1-B2.
 */
const SLICE_LOADERS: Record<string, QuestionBankSliceLoader[]> = {
  'A1:lesen': [
    () => import('./a1/lesen/part1').then((m) => m.A1_LESEN_PART1),
    () => import('./a1/lesen/part2').then((m) => m.A1_LESEN_PART2),
    () => import('./a1/lesen/part3').then((m) => m.A1_LESEN_PART3),
    () => import('./a1/lesen/part4').then((m) => m.A1_LESEN_PART4),
  ],
  'A1:hoeren': [
    () => import('./a1/hoeren/part1').then((m) => m.A1_HOEREN_PART1),
    () => import('./a1/hoeren/part2').then((m) => m.A1_HOEREN_PART2),
    () => import('./a1/hoeren/part3').then((m) => m.A1_HOEREN_PART3),
    () => import('./a1/hoeren/part4').then((m) => m.A1_HOEREN_PART4),
  ],
  'A1:grammatik': [
    () => import('./a1/grammatik/part1').then((m) => m.A1_GRAMMATIK_PART1),
    () => import('./a1/grammatik/part2').then((m) => m.A1_GRAMMATIK_PART2),
    () => import('./a1/grammatik/part3').then((m) => m.A1_GRAMMATIK_PART3),
    () => import('./a1/grammatik/part4').then((m) => m.A1_GRAMMATIK_PART4),
  ],
  'A1:wortschatz': [
    () => import('./a1/wortschatz/part1').then((m) => m.A1_WORTSCHATZ_PART1),
    () => import('./a1/wortschatz/part2').then((m) => m.A1_WORTSCHATZ_PART2),
    () => import('./a1/wortschatz/part3').then((m) => m.A1_WORTSCHATZ_PART3),
  ],
  'A1:schreiben': [() => import('./a1/produktiv').then((m) => m.A1_PRODUKTIV_SCHREIBEN)],
  'A1:sprechen': [() => import('./a1/produktiv').then((m) => m.A1_PRODUKTIV_SPRECHEN)],
  'A2:lesen': [
    () => import('./a2/lesen/part1').then((m) => m.A2_LESEN_PART1),
    () => import('./a2/lesen/part2').then((m) => m.A2_LESEN_PART2),
    () => import('./a2/lesen/part3').then((m) => m.A2_LESEN_PART3),
    () => import('./a2/lesen/part4').then((m) => m.A2_LESEN_PART4),
  ],
  'A2:hoeren': [
    () => import('./a2/hoeren/part1').then((m) => m.A2_HOEREN_PART1),
    () => import('./a2/hoeren/part2').then((m) => m.A2_HOEREN_PART2),
    () => import('./a2/hoeren/part3').then((m) => m.A2_HOEREN_PART3),
    () => import('./a2/hoeren/part4').then((m) => m.A2_HOEREN_PART4),
  ],
  'A2:grammatik': [
    () => import('./a2/grammatik/part1').then((m) => m.A2_GRAMMATIK_PART1),
    () => import('./a2/grammatik/part2').then((m) => m.A2_GRAMMATIK_PART2),
    () => import('./a2/grammatik/part3').then((m) => m.A2_GRAMMATIK_PART3),
    () => import('./a2/grammatik/part4').then((m) => m.A2_GRAMMATIK_PART4),
  ],
  'A2:wortschatz': [
    () => import('./a2/wortschatz/part1').then((m) => m.A2_WORTSCHATZ_PART1),
    () => import('./a2/wortschatz/part2').then((m) => m.A2_WORTSCHATZ_PART2),
    () => import('./a2/wortschatz/part3').then((m) => m.A2_WORTSCHATZ_PART3),
  ],
  'A2:schreiben': [() => import('./a2/produktiv').then((m) => m.A2_PRODUKTIV_SCHREIBEN)],
  'A2:sprechen': [() => import('./a2/produktiv').then((m) => m.A2_PRODUKTIV_SPRECHEN)],
  'B1:lesen': [
    () => import('./b1/lesen/part1').then((m) => m.B1_LESEN_PART1),
    () => import('./b1/lesen/part2').then((m) => m.B1_LESEN_PART2),
    () => import('./b1/lesen/part3').then((m) => m.B1_LESEN_PART3),
    () => import('./b1/lesen/part4').then((m) => m.B1_LESEN_PART4),
  ],
  'B1:hoeren': [
    () => import('./b1/hoeren/part1').then((m) => m.B1_HOEREN_PART1),
    () => import('./b1/hoeren/part2').then((m) => m.B1_HOEREN_PART2),
    () => import('./b1/hoeren/part3').then((m) => m.B1_HOEREN_PART3),
    () => import('./b1/hoeren/part4').then((m) => m.B1_HOEREN_PART4),
  ],
  'B1:grammatik': [
    () => import('./b1/grammatik/part1').then((m) => m.B1_GRAMMATIK_PART1),
    () => import('./b1/grammatik/part2').then((m) => m.B1_GRAMMATIK_PART2),
    () => import('./b1/grammatik/part3').then((m) => m.B1_GRAMMATIK_PART3),
    () => import('./b1/grammatik/part4').then((m) => m.B1_GRAMMATIK_PART4),
  ],
  'B1:wortschatz': [
    () => import('./b1/wortschatz/part1').then((m) => m.B1_WORTSCHATZ_PART1),
    () => import('./b1/wortschatz/part2').then((m) => m.B1_WORTSCHATZ_PART2),
    () => import('./b1/wortschatz/part3').then((m) => m.B1_WORTSCHATZ_PART3),
  ],
  'B1:schreiben': [() => import('./b1/produktiv').then((m) => m.B1_PRODUKTIV_SCHREIBEN)],
  'B1:sprechen': [() => import('./b1/produktiv').then((m) => m.B1_PRODUKTIV_SPRECHEN)],
  'B2:lesen': [
    () => import('./b2/lesen/part1').then((m) => m.B2_LESEN_PART1),
    () => import('./b2/lesen/part2').then((m) => m.B2_LESEN_PART2),
    () => import('./b2/lesen/part3').then((m) => m.B2_LESEN_PART3),
    () => import('./b2/lesen/part4').then((m) => m.B2_LESEN_PART4),
  ],
  'B2:hoeren': [
    () => import('./b2/hoeren/part1').then((m) => m.B2_HOEREN_PART1),
    () => import('./b2/hoeren/part2').then((m) => m.B2_HOEREN_PART2),
    () => import('./b2/hoeren/part3').then((m) => m.B2_HOEREN_PART3),
    () => import('./b2/hoeren/part4').then((m) => m.B2_HOEREN_PART4),
  ],
  'B2:grammatik': [
    () => import('./b2/grammatik/part1').then((m) => m.B2_GRAMMATIK_PART1),
    () => import('./b2/grammatik/part2').then((m) => m.B2_GRAMMATIK_PART2),
    () => import('./b2/grammatik/part3').then((m) => m.B2_GRAMMATIK_PART3),
    () => import('./b2/grammatik/part4').then((m) => m.B2_GRAMMATIK_PART4),
  ],
  'B2:wortschatz': [
    () => import('./b2/wortschatz/part1').then((m) => m.B2_WORTSCHATZ_PART1),
    () => import('./b2/wortschatz/part2').then((m) => m.B2_WORTSCHATZ_PART2),
    () => import('./b2/wortschatz/part3').then((m) => m.B2_WORTSCHATZ_PART3),
  ],
  'B2:schreiben': [() => import('./b2/produktiv').then((m) => m.B2_PRODUKTIV_SCHREIBEN)],
  'B2:sprechen': [() => import('./b2/produktiv').then((m) => m.B2_PRODUKTIV_SPRECHEN)],
};

export function registerSliceKey(level: CEFRLevel, skill: ModuleSkill): string {
  return `${level}:${skill}`;
}

export async function loadQuestionBankSlice(
  level: CEFRLevel,
  skill: ModuleSkill,
): Promise<Exercise[]> {
  const key = registerSliceKey(level, skill);
  const cached = SLICE_CACHE.get(key);
  if (cached) return cached;

  const loaders = SLICE_LOADERS[key] ?? [];
  if (loaders.length === 0) {
    SLICE_CACHE.set(key, []);
    return [];
  }

  const chunks = await Promise.all(loaders.map((fn) => fn()));
  const merged = chunks.flat();
  SLICE_CACHE.set(key, merged);
  return merged;
}

export async function loadCombinedExercisesFor(
  skill: ModuleSkill | 'Alle',
  level: CEFRLevel | 'Alle',
): Promise<Exercise[]> {
  const levels: CEFRLevel[] = level === 'Alle' ? ['A1', 'A2', 'B1', 'B2'] : [level];
  const skills: ModuleSkill[] =
    skill === 'Alle'
      ? ['lesen', 'hoeren', 'grammatik', 'wortschatz', 'schreiben', 'sprechen']
      : [skill];

  const base = ALL_EXERCISES.filter(
    (ex) =>
      (skill === 'Alle' || ex.skill === skill) &&
      (level === 'Alle' || ex.level === level),
  );

  const bankChunks = await Promise.all(
    levels.flatMap((lvl) => skills.map((sk) => loadQuestionBankSlice(lvl, sk))),
  );

  return [...base, ...bankChunks.flat()];
}

export async function loadAllCombinedExercises(): Promise<Exercise[]> {
  return loadCombinedExercisesFor('Alle', 'Alle');
}

export async function findCombinedExerciseById(
  exerciseId: string,
  hintLevel?: CEFRLevel,
  hintSkill?: ModuleSkill,
): Promise<Exercise | undefined> {
  const inBase = ALL_EXERCISES.find((ex) => ex.id === exerciseId);
  if (inBase) return inBase;

  if (hintLevel && hintSkill) {
    const slice = await loadQuestionBankSlice(hintLevel, hintSkill);
    const found = slice.find((ex) => ex.id === exerciseId);
    if (found) return found;
  }

  const all = await loadAllCombinedExercises();
  return all.find((ex) => ex.id === exerciseId);
}

export function clearQuestionBankCache(): void {
  SLICE_CACHE.clear();
}

export { SLICE_LOADERS };
