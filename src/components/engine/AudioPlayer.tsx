import React, { useEffect, useRef, useState } from 'react';
import {
  FileText,
  Headphones,
  Info,
  Lock,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { resolveAudioStatusForPath } from '../../data/audioManifest';
import { CEFRLevel } from '../../types/exercise';
import { ManifestAudioStatus } from '../../types/listeningAudio';
import { sanitizeExamBrandingText } from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface AudioPlayerProps {
  audioUrl?: string;
  audioStatus?: ManifestAudioStatus;
  transcript?: string;
  level: CEFRLevel;
  soundEnabled: boolean;
  isSubmitted: boolean;
  titleDe?: string;
  playLimit?: number;
  expectedDurationLabel?: string;
  allowTranscriptToggle?: boolean;
}

export function AudioPlayer({
  audioUrl,
  audioStatus = 'missing',
  transcript,
  level,
  soundEnabled,
  isSubmitted,
  titleDe = 'Hörtext-Wiedergabe',
  playLimit,
  expectedDurationLabel,
  allowTranscriptToggle = true,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(level === 'A1' ? 0.9 : 1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioLoadError, setAudioLoadError] = useState(false);

  const effectiveStatus = resolveAudioStatusForPath(audioUrl, audioStatus);
  const hasRealAudio =
    effectiveStatus === 'available' && Boolean(audioUrl?.trim()) && !audioLoadError;

  useEffect(() => {
    setIsPlaying(false);
    setPlayCount(0);
    setCurrentTime(0);
    setDuration(0);
    setShowTranscript(false);
    setAudioLoadError(false);
  }, [audioUrl, transcript]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const formatTime = (sec: number) => {
    if (!Number.isFinite(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleToggleRealAudio = () => {
    const el = audioRef.current;
    if (!el || !soundEnabled) return;
    if (el.paused) {
      if (el.currentTime === 0) {
        setPlayCount((c) => c + 1);
      }
      void el.play().catch(() => {
        setIsPlaying(false);
        setAudioLoadError(true);
      });
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleReplayRealAudio = () => {
    const el = audioRef.current;
    if (!el || !soundEnabled) return;
    el.currentTime = 0;
    setPlayCount((c) => c + 1);
    void el.play().catch(() => {
      setIsPlaying(false);
      setAudioLoadError(true);
    });
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#F7F4EC] dark:bg-[#1A1816] rounded-2xl p-4 sm:p-5 space-y-4 border border-[#E6E0D4] dark:border-[#2E2A25]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#FDF2F2] dark:bg-[#2C1A19] border border-[#E9B8B8] dark:border-[#5C2926] text-[#B91C1C] dark:text-[#F87171] flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] truncate">
              {sanitizeExamBrandingText(titleDe)}
            </p>
            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
              {hasRealAudio
                ? `Lokale MP3-Datei bereit · ${playCount}× abgespielt${playLimit ? ` (Hinweis: max. ${playLimit}×)` : ''}`
                : effectiveStatus === 'pending'
                  ? `Audio ausstehend${expectedDurationLabel ? ` · ca. ${expectedDurationLabel}` : ''}`
                  : `Audio nicht verfügbar${expectedDurationLabel ? ` · ca. ${expectedDurationLabel}` : ''}`}
            </p>
          </div>
        </div>

        {hasRealAudio && (
          <div
            role="group"
            aria-label="Wiedergabegeschwindigkeit"
            className="flex items-center gap-1 bg-white dark:bg-[#262320] p-1 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F]"
          >
            {[0.85, 1.0, 1.15].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setPlaybackRate(rate)}
                aria-pressed={Math.abs(playbackRate - rate) < 0.05}
                className={`min-h-[36px] px-2.5 rounded-lg text-[12px] font-semibold tabular-nums cursor-pointer transition-colors ${
                  Math.abs(playbackRate - rate) < 0.05
                    ? 'bg-[#B91C1C] text-white dark:bg-[#DC2626]'
                    : 'text-[#6B6560] hover:text-[#1C1917] dark:text-[#B5AEA5] dark:hover:text-[#F5F2EB]'
                }`}
              >
                {rate}×
              </button>
            ))}
          </div>
        )}
      </div>

      {hasRealAudio ? (
        <div className="space-y-3">
          <audio
            ref={audioRef}
            preload="metadata"
            src={audioUrl}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              setIsPlaying(false);
              setAudioLoadError(true);
            }}
          />
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <TouchButton
              variant="primary"
              size="sm"
              disabled={!soundEnabled}
              onClick={handleToggleRealAudio}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Abspielen'}
            </TouchButton>
            <TouchButton
              variant="secondary"
              size="sm"
              disabled={!soundEnabled}
              onClick={handleReplayRealAudio}
            >
              <RotateCcw className="w-4 h-4" />
              Erneut abspielen
            </TouchButton>
            <span className="text-[13px] font-mono text-[#57524C] dark:text-[#C8C1B8] tabular-nums ml-auto">
              {formatTime(currentTime)} /{' '}
              {duration > 0 ? formatTime(duration) : expectedDurationLabel ?? '00:00'}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={(e) => {
              const next = Number(e.target.value);
              setCurrentTime(next);
              if (audioRef.current) audioRef.current.currentTime = next;
            }}
            aria-label="Audioposition"
            className="w-full min-h-[28px] accent-[#B91C1C] cursor-pointer"
          />
        </div>
      ) : (
        <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] px-4 py-3 flex items-start gap-2.5 text-[13px] leading-5 text-[#1C1917] dark:text-[#F5F2EB]">
          <Info className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              {effectiveStatus === 'pending' ? 'Audio ausstehend' : 'Audio nicht verfügbar'}
            </p>
            <p className="text-[#57524C] dark:text-[#D6CFC5]">
              Untuk tugas mendengarkan ini belum tersedia berkas audio MP3 lokal yang terverifikasi.
              Aplikasi tidak menggantinya dengan suara sintetis peramban.
            </p>
          </div>
        </div>
      )}

      {hasRealAudio && !soundEnabled && (
        <p className="text-[13px] text-[#B45309] dark:text-[#FBBF24]">
          Die Audiowiedergabe ist in den Einstellungen deaktiviert.
        </p>
      )}

      {/* Transcript strictly locked until submission */}
      <div className="pt-3 border-t border-[#E6E0D4] dark:border-[#2E2A25]">
        {!isSubmitted || !allowTranscriptToggle ? (
          <div className="flex items-center gap-2 text-[13px] text-[#6B6560] dark:text-[#B5AEA5]">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              Das Transkript bleibt während der Bearbeitung gesperrt und erscheint erst nach Abgabe der Antworten.
            </span>
          </div>
        ) : (
          <div className="space-y-2.5">
            <TouchButton
              variant="ghost"
              size="sm"
              onClick={() => setShowTranscript((prev) => !prev)}
            >
              <FileText className="w-4 h-4" />
              {showTranscript ? 'Transkript ausblenden' : 'Transkript zum Mitlesen anzeigen'}
            </TouchButton>
            {showTranscript && transcript && (
              <div className="rounded-xl bg-white dark:bg-[#1F1D1A] p-4 border border-[#E6E0D4] dark:border-[#2E2A25]">
                <p className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5] mb-1.5">
                  Transkript
                </p>
                <p className="font-editorial text-[15px] leading-7 text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
                  {transcript}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
