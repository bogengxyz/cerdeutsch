import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface ExerciseNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  isCurrentAnswered: boolean;
  isCurrentChecked: boolean;
  isCurrentObjective: boolean;
  allChecked: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCheckCurrent: () => void;
  onFinishExercise: () => void;
}

export function ExerciseNavigation({
  currentIndex,
  totalQuestions,
  isCurrentAnswered,
  isCurrentChecked,
  isCurrentObjective,
  allChecked,
  onPrevious,
  onNext,
  onCheckCurrent,
  onFinishExercise,
}: ExerciseNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="pt-5 border-t border-[#EFEAE0] dark:border-[#2E2A25] flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <TouchButton
          variant="secondary"
          size="sm"
          disabled={isFirst}
          onClick={onPrevious}
        >
          <ArrowLeft className="w-4 h-4" />
          Vorherige
        </TouchButton>

        {!isLast && (
          <TouchButton variant="secondary" size="sm" onClick={onNext}>
            Nächste
            <ArrowRight className="w-4 h-4" />
          </TouchButton>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 ml-auto">
        {!isCurrentChecked && (
          <TouchButton
            variant="primary"
            size="md"
            disabled={!isCurrentAnswered}
            onClick={onCheckCurrent}
          >
            {isCurrentObjective ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Antwort überprüfen
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Antwort abgeben
              </>
            )}
          </TouchButton>
        )}

        {isCurrentChecked && !isLast && (
          <TouchButton variant="primary" size="md" onClick={onNext}>
            Nächste Aufgabe
            <ArrowRight className="w-4 h-4" />
          </TouchButton>
        )}

        {(isLast && isCurrentChecked) || allChecked ? (
          <TouchButton variant="primary" size="md" onClick={onFinishExercise}>
            <CheckCircle2 className="w-4 h-4" />
            Ergebnis abschließen
          </TouchButton>
        ) : null}
      </div>
    </div>
  );
}
