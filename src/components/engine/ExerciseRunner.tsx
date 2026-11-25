import React, { useMemo, useState } from 'react';
import { ArrowLeft, Bookmark, BookOpen, Target } from 'lucide-react';
import { Exercise } from '../../types/exercise';
import {
  ExerciseEvaluationResult,
  QuestionAnswerValue,
  calculateExerciseResult,
  isObjectiveQuestionType,
  isQuestionAnswered,
} from '../../services/scoringService';
import { sanitizeExamBrandingText } from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';
import { AudioPlayer } from './AudioPlayer';
import { ExerciseNavigation } from './ExerciseNavigation';
import { ExerciseResult } from './ExerciseResult';
import { ProgressIndicator } from './ProgressIndicator';
import { QuestionRenderer } from './QuestionRenderer';

interface ExerciseRunnerProps {
  exercise: Exercise;
  soundEnabled: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  bookmarkedQuestionIds?: string[];
  onToggleQuestionBookmark?: (questionId: string) => void;
  onComplete: (
    exercise: Exercise,
    evaluation: ExerciseEvaluationResult,
    details?: {
      answers: Record<string, QuestionAnswerValue>;
      selfChecks: Record<string, boolean[]>;
    },
  ) => void;
  onBack: () => void;
}

const SKILL_LABELS: Record<Exercise['skill'], string> = {
  lesen: 'Lesen',
  hoeren: 'Hören',
  sprechen: 'Sprechen',
  schreiben: 'Schreiben',
  grammatik: 'Grammatik',
  wortschatz: 'Wortschatz',
};

export function ExerciseRunner({
  exercise,
  soundEnabled,
  isBookmarked = false,
  onToggleBookmark,
  bookmarkedQuestionIds = [],
  onToggleQuestionBookmark,
  onComplete,
  onBack,
}: ExerciseRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswerValue>>({});
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [selfChecks, setSelfChecks] = useState<Record<string, boolean[]>>({});
  const [completedResult, setCompletedResult] = useState<ExerciseEvaluationResult | null>(null);

  const questions = exercise.questions;
  const currentQuestion = questions[currentIndex] ?? questions[0];

  const totalPoints = useMemo(
    () => questions.reduce((sum, q) => sum + q.points, 0),
    [questions],
  );

  const answeredCount = useMemo(
    () => questions.filter((q) => isQuestionAnswered(q, answers[q.id])).length,
    [questions, answers],
  );

  const allChecked = useMemo(
    () => questions.length > 0 && questions.every((q) => Boolean(checkedMap[q.id])),
    [questions, checkedMap],
  );

  const handleRepeat = () => {
    setCurrentIndex(0);
    setAnswers({});
    setCheckedMap({});
    setSelfChecks({});
    setCompletedResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckCurrent = () => {
    if (!currentQuestion) return;
    setCheckedMap((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  };

  const handleFinishExercise = () => {
    const nextChecked: Record<string, boolean> = {};
    for (const q of questions) {
      nextChecked[q.id] = true;
    }
    setCheckedMap(nextChecked);
    const evaluation = calculateExerciseResult(exercise, answers, selfChecks);
    setCompletedResult(evaluation);
    onComplete(exercise, evaluation, { answers, selfChecks });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleChecklist = (questionId: string, index: number, next: boolean) => {
    setSelfChecks((prev) => {
      const currentArr = [...(prev[questionId] ?? [])];
      currentArr[index] = next;
      const updated = { ...prev, [questionId]: currentArr };
      if (completedResult) {
        const refreshed = calculateExerciseResult(exercise, answers, updated);
        setCompletedResult(refreshed);
        onComplete(exercise, refreshed, { answers, selfChecks: updated });
      }
      return updated;
    });
  };

  const isCurrentQuestionBookmarked = currentQuestion
    ? bookmarkedQuestionIds.includes(currentQuestion.id)
    : false;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TouchButton variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </TouchButton>
        <div className="flex items-center gap-2.5">
          <span className="text-[13px] font-medium text-[#6B6560] dark:text-[#B5AEA5]">
            {sanitizeExamBrandingText(exercise.formatLabel)} · ca. {exercise.durationMinutes} Min.
          </span>
          {onToggleQuestionBookmark && currentQuestion && !completedResult && (
            <button
              type="button"
              onClick={() => onToggleQuestionBookmark(currentQuestion.id)}
              aria-pressed={isCurrentQuestionBookmarked}
              aria-label={
                isCurrentQuestionBookmarked
                  ? 'Frage aus Sammlung entfernen'
                  : 'Aktuelle Frage merken'
              }
              className={`min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 rounded-xl text-[13px] font-semibold border transition-colors cursor-pointer ${
                isCurrentQuestionBookmarked
                  ? 'bg-[#FDF2F2] text-[#B91C1C] border-[#E9B8B8] dark:bg-[#2C1A19] dark:text-[#F87171] dark:border-[#5C2926]'
                  : 'bg-white text-[#57524C] border-[#E6E0D4] hover:bg-[#F3EFE6] dark:bg-[#1F1D1A] dark:text-[#C8C1B8] dark:border-[#2E2A25]'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isCurrentQuestionBookmarked ? 'fill-current' : ''}`}
              />
              <span className="hidden sm:inline">
                {isCurrentQuestionBookmarked ? 'Frage gemerkt' : 'Frage merken'}
              </span>
            </button>
          )}
          {onToggleBookmark && (
            <button
              type="button"
              onClick={onToggleBookmark}
              aria-pressed={isBookmarked}
              aria-label={isBookmarked ? 'Übung aus Sammlung entfernen' : 'Übung in Sammlung speichern'}
              className={`min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 rounded-xl text-[13px] font-semibold border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#FDF2F2] text-[#B91C1C] border-[#E9B8B8] dark:bg-[#2C1A19] dark:text-[#F87171] dark:border-[#5C2926]'
                  : 'bg-white text-[#57524C] border-[#E6E0D4] hover:bg-[#F3EFE6] dark:bg-[#1F1D1A] dark:text-[#C8C1B8] dark:border-[#2E2A25]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Gespeichert' : 'Übung merken'}</span>
            </button>
          )}
        </div>
      </div>

      {completedResult ? (
        <div className="space-y-6">
          {exercise.skill === 'hoeren' && exercise.transcript && (
            <AudioPlayer
              audioUrl={exercise.audioUrl}
              audioStatus={exercise.audioStatus}
              transcript={exercise.transcript}
              level={exercise.level}
              soundEnabled={soundEnabled}
              isSubmitted={true}
            />
          )}
          <ExerciseResult
            exercise={exercise}
            result={completedResult}
            onRepeat={handleRepeat}
            onBackToOverview={onBack}
          />
        </div>
      ) : (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 sm:p-7 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] text-balance">
              {sanitizeExamBrandingText(exercise.title)}
            </h1>
            <p className="text-[14px] text-[#57524C] dark:text-[#B5AEA5]">
              {sanitizeExamBrandingText(exercise.instructions)}
            </p>
            {exercise.learningObjectiveDe && (
              <p className="text-[13px] text-[#B91C1C] dark:text-[#F87171] flex items-center gap-1.5 font-medium">
                <Target className="w-4 h-4 shrink-0" />
                <span>Lernziel: {sanitizeExamBrandingText(exercise.learningObjectiveDe)}</span>
              </p>
            )}
          </div>

          <ProgressIndicator
            level={exercise.level}
            skill={exercise.skill}
            skillLabel={SKILL_LABELS[exercise.skill]}
            topic={exercise.topic}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            answeredCount={answeredCount}
            totalPoints={totalPoints}
          />

          {/* Reading passage / context text (Strictly German, comfortable editorial reading width) */}
          {exercise.passage && (
            <div className="bg-[#F7F4EC] dark:bg-[#1A1816] rounded-2xl p-5 sm:p-6 space-y-2.5 border border-[#E6E0D4] dark:border-[#2E2A25]">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-[#6B6560] dark:text-[#B5AEA5]">
                <BookOpen className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171]" />
                <span>
                  {exercise.passageType ?? 'Lesetext'}
                  {exercise.passageTitle ? ` · ${exercise.passageTitle}` : ''}
                </span>
              </div>
              <p className="max-w-prose font-editorial text-[16px] leading-[1.75] text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
                {exercise.passage}
              </p>
            </div>
          )}

          {/* Listening AudioPlayer (Transcript strictly locked until all questions checked or submitted) */}
          {exercise.skill === 'hoeren' && exercise.transcript && (
            <AudioPlayer
              audioUrl={exercise.audioUrl}
              audioStatus={exercise.audioStatus}
              transcript={exercise.transcript}
              level={exercise.level}
              soundEnabled={soundEnabled}
              isSubmitted={allChecked}
            />
          )}

          {/* Current Question */}
          {currentQuestion && (
            <QuestionRenderer
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onChangeAnswer={(val) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: val,
                }))
              }
              isChecked={Boolean(checkedMap[currentQuestion.id])}
              checkedChecklist={selfChecks[currentQuestion.id] ?? []}
              onToggleChecklist={(idx, next) =>
                handleToggleChecklist(currentQuestion.id, idx, next)
              }
              showQuestionContext={!exercise.passage}
              soundEnabled={soundEnabled}
            />
          )}

          {/* Consistent Navigation & Submission Bar */}
          {currentQuestion && (
            <ExerciseNavigation
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              isCurrentAnswered={isQuestionAnswered(
                currentQuestion,
                answers[currentQuestion.id],
              )}
              isCurrentChecked={Boolean(checkedMap[currentQuestion.id])}
              isCurrentObjective={isObjectiveQuestionType(currentQuestion.type)}
              allChecked={allChecked}
              onPrevious={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
              onCheckCurrent={handleCheckCurrent}
              onFinishExercise={handleFinishExercise}
            />
          )}
        </section>
      )}
    </div>
  );
}
