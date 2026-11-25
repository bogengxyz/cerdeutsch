import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Info, Mic, Pause, Play, RotateCcw, Square } from 'lucide-react';
import { Question } from '../../types/exercise';
import { TouchButton, TouchCheckbox } from '../ui/TouchFlowPrimitives';

interface SpeakingTaskProps {
  question: Question;
  notesValue: string;
  onChangeNotes: (next: string) => void;
  isSubmitted: boolean;
  checkedChecklist: boolean[];
  onToggleChecklist: (index: number, next: boolean) => void;
}

export function SpeakingTask({
  question,
  notesValue,
  onChangeNotes,
  isSubmitted,
  checkedChecklist,
  onToggleChecklist,
}: SpeakingTaskProps) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setSeconds(0);
    setRunning(false);
    setIsRecording(false);
    setRecordingError(null);
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
      setRecordedUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    return () => {
      if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    };
  }, [recordedUrl]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    setRecordingError(null);
    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setRecordingError(
        'Mikrofonaufnahme wird in diesem Browser nicht unterstützt. Nutze einfach die Sprechzeit-Stoppuhr.',
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      if (!running) setRunning(true);
    } catch {
      setRecordingError(
        'Kein Mikrofonzugriff möglich. Du kannst die Aufgabe trotzdem frei sprechen und per Stoppuhr üben.',
      );
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setRunning(false);
  };

  return (
    <div className="space-y-5">
      {/* Timer & Optional Local Recording Controls */}
      <div className="bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
              Sprechzeit-Stoppuhr
              {question.preparationSeconds
                ? ` · Vorbereitung ca. ${question.preparationSeconds} Sek.`
                : ''}
              {question.speakingDurationSeconds
                ? ` · Sprechzeit ca. ${question.speakingDurationSeconds} Sek.`
                : ''}
            </p>
            <p className="font-mono text-2xl font-semibold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
              {formatTime(seconds)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TouchButton
              variant="primary"
              size="sm"
              onClick={() => setRunning((prev) => !prev)}
            >
              {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {running ? 'Pause' : 'Timer starten'}
            </TouchButton>
            <TouchButton
              variant="secondary"
              size="sm"
              onClick={() => {
                setRunning(false);
                setSeconds(0);
              }}
              aria-label="Timer zurücksetzen"
            >
              <RotateCcw className="w-4 h-4" />
            </TouchButton>
            {!isRecording ? (
              <TouchButton variant="secondary" size="sm" onClick={handleStartRecording}>
                <Mic className="w-4 h-4" />
                Lokal aufnehmen
              </TouchButton>
            ) : (
              <TouchButton variant="destructive" size="sm" onClick={handleStopRecording}>
                <Square className="w-4 h-4" />
                Aufnahme stoppen
              </TouchButton>
            )}
          </div>
        </div>

        <p className="text-[12px] text-[#57524C] dark:text-[#C8C1B8] flex items-start gap-2">
          <Info className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171] shrink-0 mt-0.5" />
          <span>
            Lokale Übung zum Selbsthören — es erfolgt keine automatische Aussprachebewertung.
          </span>
        </p>

        {recordingError && (
          <p className="text-[13px] text-[#B45309] dark:text-[#FBBF24]">{recordingError}</p>
        )}

        {recordedUrl && (
          <div className="pt-2 border-t border-[#E6E0D4] dark:border-[#2E2A25] space-y-1.5">
            <p className="text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
              Deine Aufnahme zum Anhören:
            </p>
            <audio controls src={recordedUrl} className="w-full" />
          </div>
        )}
      </div>

      {/* Optional keyword notes */}
      <div className="space-y-2">
        <label
          htmlFor={`speaking-notes-${question.id}`}
          className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8] block"
        >
          Stichpunkte für deine Antwort (optional)
        </label>
        <textarea
          id={`speaking-notes-${question.id}`}
          rows={3}
          value={notesValue}
          disabled={isSubmitted}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder="Notiere hier kurze Stichwörter auf Deutsch (keine ganzen Sätze nötig)..."
          className="w-full rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] px-4 py-3 text-[15px] leading-6 text-[#1C1917] placeholder:text-[#8A837A] focus:border-[#B91C1C] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/12 disabled:opacity-80 dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB] dark:focus:bg-[#1F1D1A]"
        />
      </div>

      {/* Post-submission reveal */}
      {isSubmitted && (
        <div className="space-y-5 pt-4 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
          <div className="rounded-2xl bg-[#ECFDF5] dark:bg-emerald-950/35 border border-[#A7F3D0] dark:border-emerald-900/60 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
              <p className="font-semibold">Sprechaufgabe abgeschlossen (Selbstkontrolle)</p>
              <p className="text-[13px] text-[#57524C] dark:text-[#D6CFC5]">
                Vergleiche deine mündliche Antwort mit dem Beispiel und prüfe die Kriterien.
              </p>
            </div>
          </div>

          {question.sampleAnswer && (
            <div className="rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 sm:p-5 space-y-2">
              <h3 className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                Beispielantwort zur Orientierung
              </h3>
              <p className="font-editorial text-[15px] leading-7 text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
                {question.sampleAnswer}
              </p>
            </div>
          )}

          {question.rubricCriteria && question.rubricCriteria.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                Bewertungsrubrik
              </h3>
              <div className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25]">
                {question.rubricCriteria.map((rubric) => (
                  <div key={rubric.criterion} className="px-4 py-3 space-y-0.5">
                    <p className="text-[14px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                      {rubric.criterion}
                    </p>
                    <p className="text-[13px] leading-5 text-[#57524C] dark:text-[#D6CFC5]">
                      {rubric.descriptionId}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.checklist && question.checklist.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                Checkliste zur Selbstbewertung
              </h3>
              <div className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] px-4 py-1">
                {question.checklist.map((item, idx) => (
                  <TouchCheckbox
                    key={item}
                    checked={Boolean(checkedChecklist[idx])}
                    onChange={(next) => onToggleChecklist(idx, next)}
                    label={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
