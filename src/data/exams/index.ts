import { ExamConfiguration, ExamLevel, ExamProvider } from '../../types/exam';
import { GOETHE_A1_EXAM } from './goethe/a1';
import { GOETHE_A2_EXAM } from './goethe/a2';
import { GOETHE_B1_EXAM } from './goethe/b1';
import { GOETHE_B2_EXAM } from './goethe/b2';
import { TELC_A1_EXAM } from './telc/a1';
import { TELC_A2_EXAM } from './telc/a2';
import { TELC_B1_EXAM } from './telc/b1';
import { TELC_B2_EXAM } from './telc/b2';

export const ALL_EXAM_CONFIGURATIONS: ExamConfiguration[] = [
  GOETHE_A1_EXAM,
  GOETHE_A2_EXAM,
  GOETHE_B1_EXAM,
  GOETHE_B2_EXAM,
  TELC_A1_EXAM,
  TELC_A2_EXAM,
  TELC_B1_EXAM,
  TELC_B2_EXAM,
];

export function getExamConfiguration(
  provider: ExamProvider,
  level: ExamLevel,
): ExamConfiguration {
  const match = ALL_EXAM_CONFIGURATIONS.find(
    (cfg) => cfg.provider === provider && cfg.level === level,
  );
  if (!match) {
    return GOETHE_A1_EXAM;
  }
  return match;
}

export function getExamConfigurationById(examId: string): ExamConfiguration | undefined {
  return ALL_EXAM_CONFIGURATIONS.find((cfg) => cfg.id === examId);
}

export {
  GOETHE_A1_EXAM,
  GOETHE_A2_EXAM,
  GOETHE_B1_EXAM,
  GOETHE_B2_EXAM,
  TELC_A1_EXAM,
  TELC_A2_EXAM,
  TELC_B1_EXAM,
  TELC_B2_EXAM,
};
