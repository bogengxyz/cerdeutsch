import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Download,
  Mic,
  Square,
  Trash2,
} from 'lucide-react';
import { resolveAudioStatusForPath } from '../../data/audioManifest';
import { ExamAnswerValue, ExamQuestion } from '../../types/exam';
import { CEFRLevel } from '../../types/exercise';
import { isWritingExamQuestionType } from '../../services/examService';
import { AudioPlayer } from '../engine/AudioPlayer';
import { TouchButton, TouchCheckbox, TouchRadio } from '../ui/TouchFlowPrimitives';

interface ExamQuestionRendererProps {
  question: ExamQuestion;
  questionNumber: number;
  answer: ExamAnswerValue | undefined;
  disabled: boolean;
  onChange: (nextValue: ExamAnswerValue) => void;
  level?: CEFRLevel;
  soundEnabled?: boolean;
}

export function ExamQuestionRenderer({
  question,
  questionNumber,
  answer,
  disabled,
  onChange,
  level = 'B1',
  soundEnabled = true,
}: ExamQuestionRendererProps) {
  const [confirmClearWriting, setConfirmClearWriting] = useState(false);

  // Speaking local MediaRecorder state (optional browser-only recording, never sent anywhere)
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordError, setRecordError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setConfirmClearWriting(false);
  }, [question.id]);

  useEffect(() => {
    return () => {
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
      }
      if (recorderRef.current && recorderRef.current.state === 'recording') {
        recorderRef.current.stop();
      }
    };
  }, [recordedUrl]);

  const startRecording = async () => {
    setRecordError(null);
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setRecordError('Aufnahme in diesem Browser nicht verfügbar.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunksRef.current.push(ev.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      };
      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setRecordError('Mikrofonzugriff wurde verweigert oder kein Mikrofon gefunden.');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const renderPassage = () => {
    if (!question.passageDe) return null;
    return (
      <div className="bg-[#F7F4EC] dark:bg-[#1A1816] rounded-2xl p-5 sm:p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-2.5">
        {(question.passageTypeDe || question.passageTitleDe) && (
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
            {question.passageTypeDe && <span>{question.passageTypeDe}</span>}
            {question.passageTypeDe && question.passageTitleDe && <span aria-hidden="true">·</span>}
            {question.passageTitleDe && <span>{question.passageTitleDe}</span>}
          </div>
        )}
        <p className="max-w-prose font-editorial text-[16px] leading-[1.75] text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
          {question.passageDe}
        </p>
      </div>
    );
  };

  const renderAudioSection = () => {
    if (!question.audio) return null;
    const { audio } = question;
    const resolvedStatus = resolveAudioStatusForPath(audio.url, audio.status);
    return (
      <AudioPlayer
        audioUrl={audio.url}
        audioStatus={resolvedStatus}
        transcript={audio.transcriptDe}
        level={level}
        soundEnabled={soundEnabled}
        isSubmitted={false}
        allowTranscriptToggle={false}
        titleDe={audio.titleDe}
        playLimit={audio.playLimit}
        expectedDurationLabel={audio.durationLabel}
      />
    );
  };

  const renderInputBody = () => {
    // 1. Single-choice & true-false
    if (question.type === 'single-choice' || question.type === 'true-false') {
      const current = typeof answer === 'string' ? answer : '';
      return (
        <div className="space-y-2.5" role="radiogroup" aria-label={`Aufgabe ${questionNumber}`}>
          {(question.options ?? []).map((opt) => (
            <TouchRadio
              key={opt}
              name={`exam-q-${question.id}`}
              label={opt}
              selected={current === opt}
              disabled={disabled}
              onSelect={() => onChange(opt)}
            />
          ))}
        </div>
      );
    }

    // 2. Multiple-select
    if (question.type === 'multiple-select') {
      const selectedArr = Array.isArray(answer) ? answer : [];
      const toggleOption = (opt: string) => {
        if (disabled) return;
        const exists = selectedArr.includes(opt);
        onChange(exists ? selectedArr.filter((item) => item !== opt) : [...selectedArr, opt]);
      };
      return (
        <div className="space-y-2 rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#1A1816] p-4">
          {(question.options ?? []).map((opt) => (
            <TouchCheckbox
              key={opt}
              label={opt}
              checked={selectedArr.includes(opt)}
              disabled={disabled}
              onChange={() => toggleOption(opt)}
            />
          ))}
        </div>
      );
    }

    // 3. Matching & text-matching
    if (question.type === 'matching' || question.type === 'text-matching') {
      const pairs = question.matchingPairs ?? [];
      const choices =
        question.matchingRightChoices ?? Array.from(new Set(pairs.map((p) => p.right)));
      const mapAnswer =
        answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};

      return (
        <div className="space-y-3">
          {pairs.map((pair) => (
            <div
              key={pair.left}
              className="rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#F7F4EC] dark:bg-[#1A1816] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <p className="text-[14px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                {pair.left}
              </p>
              <select
                value={mapAnswer[pair.left] ?? ''}
                disabled={disabled}
                onChange={(e) =>
                  onChange({
                    ...mapAnswer,
                    [pair.left]: e.target.value,
                  })
                }
                aria-label={pair.left}
                className="min-h-[44px] sm:min-w-[230px] rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] bg-white dark:bg-[#262320] px-3 text-[14px] text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/15"
              >
                <option value="">Bitte auswählen …</option>
                {choices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      );
    }

    // 4. Sentence ordering
    if (question.type === 'sentence-ordering') {
      const baseItems = question.orderingItems ?? [];
      const currentOrder =
        Array.isArray(answer) && answer.length === baseItems.length ? answer : baseItems;

      const moveItem = (index: number, delta: -1 | 1) => {
        if (disabled) return;
        const target = index + delta;
        if (target < 0 || target >= currentOrder.length) return;
        const next = [...currentOrder];
        const temp = next[index];
        next[index] = next[target];
        next[target] = temp;
        onChange(next);
      };

      return (
        <div className="space-y-2.5">
          {!Array.isArray(answer) && !disabled && (
            <TouchButton
              variant="secondary"
              size="sm"
              onClick={() => onChange([...baseItems])}
            >
              Reihenfolge bestätigen / bearbeiten
            </TouchButton>
          )}
          <ol className="space-y-2">
            {currentOrder.map((step, idx) => (
              <li
                key={step}
                className="rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#F7F4EC] dark:bg-[#1A1816] px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="font-display text-sm font-bold text-[#B91C1C] dark:text-[#F87171] tabular-nums shrink-0 mt-0.5">
                    {idx + 1}.
                  </span>
                  <span className="text-[14px] text-[#1C1917] dark:text-[#F5F2EB]">{step}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={disabled || idx === 0}
                    onClick={() => moveItem(idx, -1)}
                    aria-label="Nach oben verschieben"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-white dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] flex items-center justify-center text-[#1C1917] dark:text-[#F5F2EB] disabled:opacity-35 cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={disabled || idx === currentOrder.length - 1}
                    onClick={() => moveItem(idx, 1)}
                    aria-label="Nach unten verschieben"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-white dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] flex items-center justify-center text-[#1C1917] dark:text-[#F5F2EB] disabled:opacity-35 cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    }

    // 5. Dropdown, form-completion, or multi-field fill-blank
    if (
      question.type === 'dropdown' ||
      question.type === 'form-completion' ||
      (question.type === 'fill-blank' && question.blankFields && question.blankFields.length > 0)
    ) {
      const fields = question.blankFields ?? [];
      const mapAnswer =
        answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};

      return (
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <label
                htmlFor={`field-${question.id}-${field.id}`}
                className="block text-[14px] font-medium text-[#1C1917] dark:text-[#F5F2EB]"
              >
                {field.labelDe}
              </label>
              {field.options && field.options.length > 0 ? (
                <select
                  id={`field-${question.id}-${field.id}`}
                  value={mapAnswer[field.id] ?? ''}
                  disabled={disabled}
                  onChange={(e) =>
                    onChange({
                      ...mapAnswer,
                      [field.id]: e.target.value,
                    })
                  }
                  className="w-full min-h-[48px] rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] bg-[#FAF8F4] dark:bg-[#262320] px-3.5 text-[15px] text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/15"
                >
                  <option value="">Bitte wählen …</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`field-${question.id}-${field.id}`}
                  type="text"
                  value={mapAnswer[field.id] ?? ''}
                  disabled={disabled}
                  placeholder={field.placeholderDe ?? 'Antwort eingeben …'}
                  onChange={(e) =>
                    onChange({
                      ...mapAnswer,
                      [field.id]: e.target.value,
                    })
                  }
                  className="w-full min-h-[48px] rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] bg-[#FAF8F4] dark:bg-[#262320] px-3.5 text-[15px] text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/15"
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    // 6. Single-text fill-blank / short-text
    if (question.type === 'fill-blank' || question.type === 'short-text') {
      const val = typeof answer === 'string' ? answer : '';
      return (
        <div>
          <label htmlFor={`short-${question.id}`} className="sr-only">
            Antwort
          </label>
          <input
            id={`short-${question.id}`}
            type="text"
            value={val}
            disabled={disabled}
            placeholder="Antwort auf Deutsch eingeben …"
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] bg-[#FAF8F4] dark:bg-[#262320] px-4 text-[15px] text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/15"
          />
        </div>
      );
    }

    // 7. Writing tasks (email-writing, letter-writing, forum-post, long-text)
    if (isWritingExamQuestionType(question.type)) {
      const textVal = typeof answer === 'string' ? answer : '';
      const words = textVal.trim() ? textVal.trim().split(/\s+/).length : 0;

      return (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
            <span className="text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
              Wortanzahl: <strong className="text-[#B91C1C] dark:text-[#F87171]">{words}</strong>
              {question.wordCountRange
                ? ` (Ziel: ${question.wordCountRange.min}–${question.wordCountRange.max} Wörter)`
                : ''}
            </span>
            {!disabled && textVal.trim().length > 0 && (
              <div>
                {confirmClearWriting ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#B91C1C] dark:text-red-400 font-medium">
                      Text wirklich löschen?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onChange('');
                        setConfirmClearWriting(false);
                      }}
                      className="min-h-[36px] px-2.5 rounded-lg bg-[#991B1B] text-white text-[12px] font-semibold cursor-pointer"
                    >
                      Ja, löschen
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClearWriting(false)}
                      className="min-h-[36px] px-2.5 rounded-lg bg-[#F3EFE6] dark:bg-[#262320] text-[#1C1917] dark:text-[#F5F2EB] text-[12px] font-medium cursor-pointer"
                    >
                      Abbrechen
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClearWriting(true)}
                    className="min-h-[36px] px-2.5 rounded-lg text-[12px] font-medium text-[#6B6560] hover:text-[#B91C1C] dark:text-[#B5AEA5] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Text zurücksetzen
                  </button>
                )}
              </div>
            )}
          </div>

          <textarea
            rows={9}
            value={textVal}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Schreibe deinen Text hier auf Deutsch …"
            className="w-full rounded-2xl border border-[#E6E0D4] dark:border-[#3A352F] bg-[#FAF8F4] dark:bg-[#262320] p-4 text-[15px] leading-7 text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:bg-white dark:focus:bg-[#1F1D1A] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/15"
          />
          <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
            Hinweis: Freie Texte werden nicht automatisch per KI benotet. Nach der Abgabe erhältst du
            ein strukturiertes Bewertungsraster und eine Musterlösung zur Selbsteinschätzung.
          </p>
        </div>
      );
    }

    // 8. Speaking prompt
    const notesVal = typeof answer === 'string' ? answer : '';
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 text-[13px] text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
          {question.preparationSeconds && (
            <span>Vorbereitungszeit: ca. {question.preparationSeconds} Sek.</span>
          )}
          {question.speakingSeconds && (
            <span>Sprechzeit: ca. {Math.round(question.speakingSeconds / 60)} Min.</span>
          )}
        </div>

        {question.partnerPromptsDe && question.partnerPromptsDe.length > 0 && (
          <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 space-y-2">
            <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              Schriftliche Partnerimpulse / Prüferfragen:
            </p>
            <ul className="space-y-1.5 text-[14px] text-[#57524C] dark:text-[#D6CFC5]">
              {question.partnerPromptsDe.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Optional local browser microphone test */}
        <div className="rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#1A1816] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-[14px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Optionale Sprachaufnahme (nur lokal im Browser)
              </p>
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
                Keine automatische Aussprache- oder KI-Bewertung. Nach der Abgabe bewertest du dich
                selbst.
              </p>
            </div>
            {!disabled && (
              <TouchButton
                variant={isRecording ? 'destructive' : 'secondary'}
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4" />
                    Aufnahme stoppen
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Aufnahme starten
                  </>
                )}
              </TouchButton>
            )}
          </div>

          {recordError && (
            <p className="text-[12px] text-[#B45309] dark:text-amber-300">{recordError}</p>
          )}

          {recordedUrl && (
            <div className="space-y-2 pt-1">
              <audio controls src={recordedUrl} className="w-full" />
              <a
                href={recordedUrl}
                download={`sprechen-${question.id}.webm`}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#B91C1C] dark:text-[#F87171] hover:underline"
              >
                <Download className="w-4 h-4" />
                Eigene Aufnahme herunterladen
              </a>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={`speaking-notes-${question.id}`}
            className="block text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]"
          >
            Stichpunkte / Notizen für deine mündliche Antwort (optional):
          </label>
          <textarea
            id={`speaking-notes-${question.id}`}
            rows={4}
            value={notesVal}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Kurze Stichpunkte auf Deutsch notieren …"
            className="w-full rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] bg-[#FAF8F4] dark:bg-[#262320] p-3.5 text-[14px] text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/15"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#6B6560] dark:text-[#B5AEA5]">
        <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
          {question.partLabelDe}
        </span>
        <span className="tabular-nums">
          {question.points} {question.points === 1 ? 'Punkt' : 'Punkte'}
          {question.isEstimatedPracticePoints ? ' (Übungswert)' : ''}
        </span>
      </div>

      {renderPassage()}
      {renderAudioSection()}

      <div className="space-y-4">
        <h3 className="font-display text-[17px] sm:text-lg font-semibold leading-snug text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
          {question.promptDe}
        </h3>
        {renderInputBody()}
      </div>
    </div>
  );
}
