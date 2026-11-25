import { CEFRLevel, Exercise, ModuleSkill } from '../types/exercise';
import { resolveAudioStatusForPath } from './audioManifest';
import { normalizeAudioExercise } from '../utils/listeningAudioHelpers';
import { A1_EXERCISES } from './a1/exercises';
import { A1_EXPANSION_EXERCISES } from './a1/expansion';
import { A2_EXERCISES } from './a2/exercises';
import { A2_EXPANSION_EXERCISES } from './a2/expansion';
import { B1_EXERCISES } from './b1/exercises';
import { B1_EXPANSION_EXERCISES } from './b1/expansion';
import { B2_EXERCISES } from './b2/exercises';
import { B2_EXPANSION_EXERCISES } from './b2/expansion';
import { EXTRA_PHASE4_EXERCISES } from './extraPrompts';

export const ALL_EXERCISES: Exercise[] = [
  ...A1_EXERCISES,
  ...A1_EXPANSION_EXERCISES,
  ...A2_EXERCISES,
  ...A2_EXPANSION_EXERCISES,
  ...B1_EXERCISES,
  ...B1_EXPANSION_EXERCISES,
  ...B2_EXERCISES,
  ...B2_EXPANSION_EXERCISES,
  ...EXTRA_PHASE4_EXERCISES,
].map((ex) => normalizeAudioExercise(ex, resolveAudioStatusForPath));

export function getExercisesBySkillAndLevel(
  skill: ModuleSkill,
  level: CEFRLevel | 'Alle',
): Exercise[] {
  return ALL_EXERCISES.filter(
    (ex) => ex.skill === skill && (level === 'Alle' || ex.level === level),
  );
}

export function getExerciseById(id: string): Exercise | undefined {
  return ALL_EXERCISES.find((ex) => ex.id === id);
}

