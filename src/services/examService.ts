import {
  ALL_EXAM_CONFIGURATIONS,
  getExamConfiguration,
  getExamConfigurationById,
} from '../data/exams';
import {
  ExamConfiguration,
  ExamLevel,
  ExamMode,
  ExamModuleConfig,
  ExamModuleKey,
  ExamProvider,
  ExamQuestion,
  ExamQuestionType,
  ExamSectionConfig,
} from '../types/exam';

export interface FlattenedExamQuestionItem {
  globalIndex: number;
  moduleIndex: number;
  moduleKey: ExamModuleKey;
  moduleTitleDe: string;
  sectionIndex: number;
  sectionId: string;
  sectionTitleDe: string;
  question: ExamQuestion;
}

export interface ExamDatabaseValidationReport {
  valid: boolean;
  errors: string[];
  examCount: number;
  questionCountByExam: Record<string, number>;
}

const OBJECTIVE_TYPES = new Set<ExamQuestionType>([
  'single-choice',
  'multiple-select',
  'true-false',
  'matching',
  'text-matching',
  'sentence-ordering',
  'fill-blank',
  'dropdown',
  'short-text',
  'form-completion',
]);

export function isObjectiveExamQuestionType(type: ExamQuestionType): boolean {
  return OBJECTIVE_TYPES.has(type);
}

export function isWritingExamQuestionType(type: ExamQuestionType): boolean {
  return (
    type === 'email-writing' ||
    type === 'letter-writing' ||
    type === 'forum-post' ||
    type === 'long-text'
  );
}

export function getActiveModulesForSession(
  exam: ExamConfiguration,
  mode: ExamMode,
  selectedModuleKey?: ExamModuleKey,
): ExamModuleConfig[] {
  if ((mode === 'module' || mode === 'practice') && selectedModuleKey) {
    const match = exam.modules.find((m) => m.moduleKey === selectedModuleKey);
    return match ? [match] : [exam.modules[0]];
  }
  return exam.modules;
}

export function flattenModuleQuestions(
  modules: ExamModuleConfig[],
): FlattenedExamQuestionItem[] {
  const result: FlattenedExamQuestionItem[] = [];
  let globalIndex = 0;

  modules.forEach((mod, moduleIndex) => {
    mod.sections.forEach((section: ExamSectionConfig, sectionIndex: number) => {
      section.questions.forEach((question) => {
        result.push({
          globalIndex,
          moduleIndex,
          moduleKey: mod.moduleKey,
          moduleTitleDe: mod.titleDe,
          sectionIndex,
          sectionId: section.id,
          sectionTitleDe: section.titleDe,
          question,
        });
        globalIndex += 1;
      });
    });
  });

  return result;
}

export function findExamConfig(
  provider: ExamProvider,
  level: ExamLevel,
): ExamConfiguration {
  return getExamConfiguration(provider, level);
}

export function findExamConfigById(examId: string): ExamConfiguration | undefined {
  return getExamConfigurationById(examId);
}

export function validateExamDatabase(
  configs: ExamConfiguration[] = ALL_EXAM_CONFIGURATIONS,
): ExamDatabaseValidationReport {
  const errors: string[] = [];
  const seenExamIds = new Set<string>();
  const seenQuestionIds = new Set<string>();
  const questionCountByExam: Record<string, number> = {};

  const requiredWritingCriteria = [
    'aufgabenerfuellung',
    'inhaltliche-relevanz',
    'aufbau-kohaerenz',
    'wortschatz',
    'grammatik',
    'rechtschreibung',
  ];

  for (const exam of configs) {
    if (seenExamIds.has(exam.id)) {
      errors.push(`Duplicate exam id: ${exam.id}`);
    }
    seenExamIds.add(exam.id);

    if (!exam.officialName.trim() || !exam.verificationSource.trim()) {
      errors.push(`Exam ${exam.id} missing officialName or verificationSource.`);
    }

    const moduleKeys = exam.modules.map((m) => m.moduleKey);
    for (const expectedKey of ['lesen', 'hoeren', 'schreiben', 'sprechen'] as ExamModuleKey[]) {
      if (!moduleKeys.includes(expectedKey)) {
        errors.push(`Exam ${exam.id} is missing module ${expectedKey}.`);
      }
    }

    let totalQuestions = 0;

    for (const mod of exam.modules) {
      if (mod.sections.length === 0) {
        errors.push(`Exam ${exam.id} module ${mod.moduleKey} has no sections.`);
      }
      for (const sec of mod.sections) {
        if (sec.questions.length === 0) {
          errors.push(`Exam ${exam.id} section ${sec.id} has no questions.`);
        }
        for (const q of sec.questions) {
          totalQuestions += 1;
          if (seenQuestionIds.has(q.id)) {
            errors.push(`Duplicate question id: ${q.id}`);
          }
          seenQuestionIds.add(q.id);

          if (!q.promptDe.trim()) {
            errors.push(`Question ${q.id} missing promptDe.`);
          }
          if (!q.explanationId.trim()) {
            errors.push(`Question ${q.id} missing explanationId.`);
          }
          if (q.points <= 0) {
            errors.push(`Question ${q.id} points must be > 0.`);
          }

          if (q.type === 'single-choice' || q.type === 'true-false') {
            if (!q.options || q.options.length < 2) {
              errors.push(`Question ${q.id} requires at least 2 options.`);
            } else if (typeof q.correctAnswer !== 'string' || !q.options.includes(q.correctAnswer)) {
              errors.push(`Question ${q.id} correctAnswer must be in options.`);
            }
          } else if (q.type === 'multiple-select') {
            if (!q.options || q.options.length < 3) {
              errors.push(`Question ${q.id} (multiple-select) requires >= 3 options.`);
            }
            if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length < 1) {
              errors.push(`Question ${q.id} (multiple-select) requires array correctAnswer.`);
            }
          } else if (q.type === 'matching' || q.type === 'text-matching') {
            if (!q.matchingPairs || q.matchingPairs.length < 2) {
              errors.push(`Question ${q.id} requires >= 2 matchingPairs.`);
            }
          } else if (q.type === 'sentence-ordering') {
            if (!q.orderingItems || !q.correctOrder || q.orderingItems.length !== q.correctOrder.length) {
              errors.push(`Question ${q.id} sentence-ordering items/correctOrder mismatch.`);
            }
          } else if (
            q.type === 'dropdown' ||
            q.type === 'form-completion' ||
            (q.type === 'fill-blank' && q.blankFields && q.blankFields.length > 0)
          ) {
            if (!q.blankFields || q.blankFields.length === 0) {
              errors.push(`Question ${q.id} missing blankFields.`);
            }
          } else if (isWritingExamQuestionType(q.type)) {
            if (!q.sampleAnswerDe?.trim()) {
              errors.push(`Writing question ${q.id} missing sampleAnswerDe.`);
            }
            const criteriaIds = (q.rubricCriteria ?? []).map((c) => c.id);
            for (const reqCrit of requiredWritingCriteria) {
              if (!criteriaIds.includes(reqCrit)) {
                errors.push(`Writing question ${q.id} missing rubric criterion ${reqCrit}.`);
              }
            }
          } else if (q.type === 'speaking-prompt') {
            if (!q.sampleAnswerDe?.trim() || !q.rubricCriteria || q.rubricCriteria.length === 0) {
              errors.push(`Speaking question ${q.id} missing sampleAnswerDe or rubricCriteria.`);
            }
          }

          if (mod.moduleKey === 'hoeren') {
            if (!q.audio || !q.audio.url.startsWith('/audio/exams/')) {
              errors.push(`Listening question ${q.id} missing /audio/exams/ path.`);
            }
            if (!q.audio?.transcriptDe.trim()) {
              errors.push(`Listening question ${q.id} missing transcriptDe.`);
            }
          }
        }
      }
    }

    questionCountByExam[exam.id] = totalQuestions;
  }

  return {
    valid: errors.length === 0,
    errors,
    examCount: configs.length,
    questionCountByExam,
  };
}
