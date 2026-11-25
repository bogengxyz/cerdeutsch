import { useEffect, useState } from 'react';
import { getExercisesBySkillAndLevel } from '../data/exercises';
import { loadCombinedExercisesFor } from '../data/questionBank';
import { CEFRLevel, Exercise, ModuleSkill } from '../types/exercise';

export function useQuestionBankExercises(
  skill: ModuleSkill | 'Alle',
  level: CEFRLevel | 'Alle',
): { exercises: Exercise[]; loading: boolean } {
  const [exercises, setExercises] = useState<Exercise[]>(() =>
    skill === 'Alle'
      ? []
      : getExercisesBySkillAndLevel(skill, level),
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void loadCombinedExercisesFor(skill, level).then((loaded) => {
      if (!active) return;
      setExercises(loaded);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [skill, level]);

  return { exercises, loading };
}
