import React, { useMemo } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  Lightbulb,
  MessageSquareQuote,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { Question } from '../../types/exercise';
import {
  QuestionAnswerValue,
  evaluateObjectiveQuestion,
  isObjectiveQuestionType,
} from '../../services/scoringService';
import { sanitizeExamBrandingText } from '../../utils/brandLabels';
import { TouchRadio } from '../ui/TouchFlowPrimitives';
import { AudioPlayer } from './AudioPlayer';
import { SpeakingTask } from './SpeakingTask';
import { WritingEditor } from './WritingEditor';

interface QuestionRendererProps {
  question: Question;
  answer: QuestionAnswerValue | undefined;
  onChangeAnswer: (next: QuestionAnswerValue) => void;
  isChecked: boolean;
  checkedChecklist: boolean[];
  onToggleChecklist: (index: number, next: boolean) => void;
  showQuestionContext?: boolean;
  soundEnabled?: boolean;
}

function deterministicShuffle(items: string[], seed: string): string[] {
  const copy = [...items];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  for (let i = copy.length - 1; i > 0; i -= 1) {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    const j = hash % (i + 1);
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  if (copy.length > 1 && copy.every((val, idx) => val === items[idx])) {
    const first = copy.shift()!;
    copy.push(first);
  }
  return copy;
}

export function QuestionRenderer({
  question,
  answer,
  onChangeAnswer,
  isChecked,
  checkedChecklist,
  onToggleChecklist,
  showQuestionContext = false,
  soundEnabled = true,
}: QuestionRendererProps) {
  const isObjective = isObjectiveQuestionType(question.type);

  const matchingRightOptions = useMemo(() => {
    const pairs = question.matchingPairs ?? [];
    return deterministicShuffle(
      pairs.map((p) => p.right),
      question.id,
    );
  }, [question.id, question.matchingPairs]);

  const shuffledOrderingTokens = useMemo(() => {
    const tokens = question.orderingTokens ?? [];
    return deterministicShuffle(tokens, `${question.id}-order`);
  }, [question.id, question.orderingTokens]);

  const objectiveEvaluation = useMemo(() => {
    if (!isChecked || !isObjective) return null;
    return evaluateObjectiveQuestion(question, answer);
  }, [isChecked, isObjective, question, answer]);

  const stringAnswer = typeof answer === 'string' ? answer : '';
  const multiSelectAnswer = Array.isArray(answer) ? answer : [];
  const mapAnswer =
    typeof answer === 'object' && answer !== null && !Array.isArray(answer) ? answer : {};

  const selectedTokenIndices = useMemo(() => {
    if (question.type !== 'sentence-order' || !stringAnswer.trim()) return [] as number[];
    const parts = stringAnswer.trim().split(' ');
    const used: number[] = [];
    for (const part of parts) {
      const idx = shuffledOrderingTokens.findIndex(
        (tok, i) => tok === part && !used.includes(i),
      );
      if (idx >= 0) used.push(idx);
    }
    return used;
  }, [question.type, stringAnswer, shuffledOrderingTokens]);

  return (
    <div className="space-y-6">
      {/* Per-question passage or audio context when rendered inside randomized/mixed sessions */}
      {showQuestionContext && question.passage && (
        <div className="bg-[#F7F4EC] dark:bg-[#1A1816] rounded-2xl p-5 sm:p-6 space-y-2.5 border border-[#E6E0D4] dark:border-[#2E2A25]">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-[#6B6560] dark:text-[#B5AEA5]">
            <BookOpen className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171]" />
            <span>
              {question.passageType ?? 'Lesetext'}
              {question.passageTitle ? ` · ${question.passageTitle}` : ''}
            </span>
          </div>
          <p className="max-w-prose font-editorial text-[16px] leading-[1.75] text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
            {question.passage}
          </p>
        </div>
      )}

      {showQuestionContext && question.sourceSkill === 'hoeren' && (
        <AudioPlayer
          audioUrl={question.audioUrl}
          audioStatus={question.audioStatus}
          transcript={question.transcript}
          level={question.sourceLevel ?? 'A1'}
          soundEnabled={soundEnabled}
          isSubmitted={isChecked}
        />
      )}

      {/* Question prompt */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-medium text-[#6B6560] dark:text-[#B5AEA5]">
            {question.type === 'multiple-choice' && 'Multiple-Choice'}
            {question.type === 'multiple-select' && 'Mehrfachauswahl (mehrere Antworten)'}
            {question.type === 'true-false' && 'Richtig oder Falsch'}
            {question.type === 'fill-blank' && 'Lückentext'}
            {question.type === 'sentence-order' && 'Satzbau (Wörter ordnen)'}
            {question.type === 'short-answer' && 'Kurzantwort'}
            {question.type === 'matching' && 'Zuordnung'}
            {question.type === 'writing-task' && 'Schreibaufgabe'}
            {question.type === 'speaking-task' && 'Sprechaufgabe'}
            {question.sourceTopic ? ` · ${question.sourceTopic}` : ''}
          </span>
          <span className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
            {question.points} Punkte
          </span>
        </div>

        <h2 className="font-display text-[17px] sm:text-lg font-semibold leading-snug text-[#1C1917] dark:text-[#F5F2EB]">
          {question.question}
        </h2>

        {question.preparationGuidanceDe && (
          <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] px-3.5 py-2.5 flex items-start gap-2 text-[13px] leading-5 text-[#57524C] dark:text-[#D6CFC5]">
            <Compass className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Bearbeitungshinweis:</strong>{' '}
              {question.preparationGuidanceDe}
            </span>
          </div>
        )}

        {question.usefulExpressionsDe && question.usefulExpressionsDe.length > 0 && (
          <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 space-y-2">
            <p className="text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8] flex items-center gap-1.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#F87171]" />
              Nützliche Redemittel (Hilfe auf Deutsch)
            </p>
            <ul className="space-y-1 text-[13px] text-[#1C1917] dark:text-[#F5F2EB]">
              {question.usefulExpressionsDe.map((expr) => (
                <li key={expr.de} className="flex flex-wrap items-baseline gap-1.5">
                  <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                    • {expr.de}
                  </span>
                  {isChecked && expr.id && (
                    <span className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
                      — {expr.id}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Multiple-Choice / True-False */}
      {(question.type === 'multiple-choice' || question.type === 'true-false') &&
        question.options && (
          <div className="space-y-2.5" role="radiogroup" aria-label={question.question}>
            {question.options.map((opt) => {
              let status: 'correct' | 'incorrect' | 'neutral' = 'neutral';
              if (isChecked) {
                if (opt === question.correctAnswer) {
                  status = 'correct';
                } else if (opt === stringAnswer) {
                  status = 'incorrect';
                }
              }

              return (
                <TouchRadio
                  key={opt}
                  name={question.id}
                  label={opt}
                  selected={stringAnswer === opt}
                  disabled={isChecked}
                  status={status}
                  onSelect={() => onChangeAnswer(opt)}
                />
              );
            })}
          </div>
        )}

      {/* Multiple-Select (multiple correct answers) */}
      {question.type === 'multiple-select' && question.options && (
        <div className="space-y-2.5" role="group" aria-label={question.question}>
          <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5]">
            Wähle alle zutreffenden Antworten aus.
          </p>
          {question.options.map((opt) => {
            const isSelected = multiSelectAnswer.includes(opt);
            const isExpected = (question.correctAnswers ?? []).includes(opt);
            let cardClass =
              'border-[#E6E0D4] bg-[#FAF8F4] text-[#1C1917] hover:bg-[#F3EFE6] dark:border-[#2E2A25] dark:bg-[#1A1816] dark:text-[#F5F2EB] dark:hover:bg-[#262320]';
            if (isChecked) {
              if (isExpected) {
                cardClass =
                  'border-[#15803D] bg-[#ECFDF5] text-emerald-950 dark:border-emerald-600 dark:bg-emerald-950/35 dark:text-emerald-200';
              } else if (isSelected) {
                cardClass =
                  'border-[#B91C1C] bg-[#FDF2F2] text-red-950 dark:border-red-600 dark:bg-red-950/35 dark:text-red-200';
              }
            } else if (isSelected) {
              cardClass =
                'border-[#B91C1C] bg-[#FDF2F2] text-[#7F1D1D] dark:border-[#DC2626] dark:bg-[#2C1A19] dark:text-[#F5F2EB]';
            }

            return (
              <button
                key={opt}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                disabled={isChecked}
                onClick={() => {
                  const next = isSelected
                    ? multiSelectAnswer.filter((v) => v !== opt)
                    : [...multiSelectAnswer, opt];
                  onChangeAnswer(next);
                }}
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border text-left text-[15px] font-medium flex items-center gap-3 transition-colors cursor-pointer disabled:cursor-default ${cardClass}`}
              >
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#B91C1C] border-[#B91C1C] text-white dark:bg-[#DC2626] dark:border-[#DC2626]'
                      : 'border-[#D2C9BA] bg-white dark:border-[#4A443D] dark:bg-[#1F1D1A]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Sentence-Order builder */}
      {question.type === 'sentence-order' && shuffledOrderingTokens.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#F7F4EC] dark:bg-[#1A1816] p-4 min-h-[68px] space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5]">
                Dein Satz (klicke auf Bausteine zum Ordnen)
              </span>
              {!isChecked && selectedTokenIndices.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChangeAnswer('')}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6B6560] hover:text-[#1C1917] dark:text-[#B5AEA5] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Zurücksetzen
                </button>
              )}
            </div>
            {selectedTokenIndices.length === 0 ? (
              <p className="text-[14px] text-[#8A837A] dark:text-[#7C756D]">
                Wähle unten die Wörter in der richtigen Reihenfolge aus...
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedTokenIndices.map((tokIdx, pos) => (
                  <button
                    key={`${tokIdx}-${pos}`}
                    type="button"
                    disabled={isChecked}
                    onClick={() => {
                      const remaining = selectedTokenIndices.filter((_, p) => p !== pos);
                      onChangeAnswer(
                        remaining.map((i) => shuffledOrderingTokens[i]).join(' '),
                      );
                    }}
                    className="min-h-[40px] px-3.5 rounded-xl bg-[#FDF2F2] border border-[#B91C1C] text-[#991B1B] dark:bg-[#2C1A19] dark:border-[#DC2626] dark:text-[#F87171] text-[14px] font-semibold cursor-pointer disabled:cursor-default"
                  >
                    {shuffledOrderingTokens[tokIdx]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {shuffledOrderingTokens.map((tok, idx) => {
              const used = selectedTokenIndices.includes(idx);
              return (
                <button
                  key={`${tok}-${idx}`}
                  type="button"
                  disabled={isChecked || used}
                  onClick={() => {
                    const nextIndices = [...selectedTokenIndices, idx];
                    onChangeAnswer(
                      nextIndices.map((i) => shuffledOrderingTokens[i]).join(' '),
                    );
                  }}
                  className={`min-h-[44px] px-3.5 rounded-xl border text-[14px] font-medium transition-colors ${
                    used
                      ? 'border-dashed border-[#D8D0C3] bg-[#F3EFE6] text-[#9E968D] dark:border-[#2E2A25] dark:bg-[#1A1816] dark:text-[#57524C] cursor-default'
                      : 'border-[#E6E0D4] bg-white text-[#1C1917] hover:bg-[#F3EFE6] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB] cursor-pointer'
                  }`}
                >
                  {tok}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fill-blank / Short-answer */}
      {(question.type === 'fill-blank' || question.type === 'short-answer') && (
        <div className="space-y-2">
          <label
            htmlFor={`answer-input-${question.id}`}
            className="text-[13px] font-medium text-[#57524C] dark:text-[#C8C1B8] block"
          >
            Deine Antwort auf Deutsch
          </label>
          <input
            id={`answer-input-${question.id}`}
            type="text"
            value={stringAnswer}
            disabled={isChecked}
            onChange={(e) => onChangeAnswer(e.target.value)}
            placeholder="Antwort hier eingeben..."
            autoComplete="off"
            className="w-full min-h-[48px] px-4 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[15px] text-[#1C1917] placeholder:text-[#8A837A] focus:border-[#B91C1C] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/12 disabled:opacity-80 dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB] dark:focus:bg-[#1F1D1A]"
          />
        </div>
      )}

      {/* Matching */}
      {question.type === 'matching' && question.matchingPairs && (
        <div className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25]">
          {question.matchingPairs.map((pair, idx) => {
            const selected = mapAnswer[pair.left] ?? '';
            const breakdownItem = objectiveEvaluation?.matchingBreakdown?.[idx];
            return (
              <div
                key={pair.left}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <span className="text-[15px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                  {pair.left}
                </span>

                <div className="sm:w-72 shrink-0 space-y-1">
                  <select
                    aria-label={`Zuordnung für ${pair.left}`}
                    value={selected}
                    disabled={isChecked}
                    onChange={(e) =>
                      onChangeAnswer({
                        ...mapAnswer,
                        [pair.left]: e.target.value,
                      })
                    }
                    className={`w-full min-h-[44px] px-3.5 rounded-xl border text-[14px] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/12 ${
                      isChecked && breakdownItem
                        ? breakdownItem.isMatch
                          ? 'border-[#15803D] bg-[#ECFDF5] text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200'
                          : 'border-[#B91C1C] bg-[#FDF2F2] text-red-950 dark:bg-red-950/30 dark:text-red-200'
                        : 'border-[#E6E0D4] bg-white text-[#1C1917] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]'
                    }`}
                  >
                    <option value="">Bitte wählen...</option>
                    {matchingRightOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {isChecked && breakdownItem && !breakdownItem.isMatch && (
                    <p className="text-[12px] text-[#15803D] dark:text-emerald-400">
                      Richtig: {pair.right}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Writing Task */}
      {question.type === 'writing-task' && (
        <WritingEditor
          question={question}
          value={stringAnswer}
          onChange={(val) => onChangeAnswer(val)}
          isSubmitted={isChecked}
          checkedChecklist={checkedChecklist}
          onToggleChecklist={onToggleChecklist}
        />
      )}

      {/* Speaking Task */}
      {question.type === 'speaking-task' && (
        <SpeakingTask
          question={question}
          notesValue={stringAnswer}
          onChangeNotes={(val) => onChangeAnswer(val)}
          isSubmitted={isChecked}
          checkedChecklist={checkedChecklist}
          onToggleChecklist={onToggleChecklist}
        />
      )}

      {/* Post-submission Feedback & Indonesian Explanations (NEVER shown before checking/submitting) */}
      {isChecked && (
        <div className="space-y-4 pt-2">
          {objectiveEvaluation && (
            <div
              className={`rounded-2xl p-4 border flex items-start gap-3 ${
                objectiveEvaluation.isCorrect
                  ? 'bg-[#ECFDF5] border-[#A7F3D0] text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200'
                  : 'bg-[#FDF2F2] border-[#E9B8B8] text-red-950 dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-200'
              }`}
            >
              {objectiveEvaluation.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-[#B91C1C] dark:text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-[14px]">
                <p className="font-semibold">
                  {objectiveEvaluation.isCorrect
                    ? `Richtig! (${objectiveEvaluation.earnedPoints} / ${objectiveEvaluation.maxPoints} Punkte)`
                    : `Nicht ganz richtig (${objectiveEvaluation.earnedPoints} / ${objectiveEvaluation.maxPoints} Punkte)`}
                </p>
                {!objectiveEvaluation.isCorrect && (
                  <p className="text-[13px] opacity-95">
                    <strong>Richtige Antwort:</strong> {objectiveEvaluation.expectedAnswerLabel}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Indonesian & German Explanation Box */}
          <div className="rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] p-4 sm:p-5 space-y-3.5 border border-[#E6E0D4] dark:border-[#2E2A25]">
            {question.explanationDe && (
              <div className="space-y-1 pb-3 border-b border-[#E6E0D4] dark:border-[#2E2A25]">
                <p className="text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                  Kurze Erklärung (Deutsch)
                </p>
                <p className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
                  {sanitizeExamBrandingText(question.explanationDe)}
                </p>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#F87171] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 shrink-0" />
                Penjelasan (Bahasa Indonesia)
              </p>
              <p className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
                {sanitizeExamBrandingText(question.explanationId)}
              </p>
            </div>

            {question.commonMistakeId && (
              <div className="pt-3 border-t border-[#E6E0D4] dark:border-[#2E2A25] space-y-1">
                <p className="text-[12px] font-semibold text-[#B45309] dark:text-[#FBBF24] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Kesalahan Umum
                </p>
                <p className="text-[13px] leading-5 text-[#57524C] dark:text-[#D6CFC5]">
                  {sanitizeExamBrandingText(question.commonMistakeId)}
                </p>
              </div>
            )}

            {question.grammarNoteId && (
              <div className="pt-3 border-t border-[#E6E0D4] dark:border-[#2E2A25] space-y-1">
                <p className="text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                  Catatan Tata Bahasa
                </p>
                <p className="text-[13px] leading-5 text-[#57524C] dark:text-[#D6CFC5]">
                  {sanitizeExamBrandingText(question.grammarNoteId)}
                </p>
              </div>
            )}

            {question.keyVocabulary && question.keyVocabulary.length > 0 && (
              <div className="pt-3 border-t border-[#E6E0D4] dark:border-[#2E2A25] space-y-2">
                <p className="text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  Wichtige Vokabeln (Kosakata Penting)
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[13px]">
                  {question.keyVocabulary.map((vocab) => (
                    <li
                      key={vocab.de}
                      className="text-[#57524C] dark:text-[#D6CFC5] flex items-baseline gap-1.5"
                    >
                      <strong className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                        {vocab.de}
                      </strong>
                      <span className="text-[#8A837A]">—</span>
                      <span>{vocab.id}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
