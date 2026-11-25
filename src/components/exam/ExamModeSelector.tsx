import React from 'react';
import { BookOpen, Clock, Layers, Sparkles } from 'lucide-react';
import { ExamMode, ExamModuleConfig, ExamModuleKey } from '../../types/exam';
import { getNeutralModuleLabel } from '../../utils/brandLabels';

interface ExamModeSelectorProps {
  selectedMode: ExamMode;
  onSelectMode: (mode: ExamMode) => void;
  modules: ExamModuleConfig[];
  selectedModuleKey: ExamModuleKey;
  onSelectModuleKey: (key: ExamModuleKey) => void;
}

const MODE_CARDS: {
  mode: ExamMode;
  titleDe: string;
  descDe: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    mode: 'full',
    titleDe: 'Simulasi Penuh',
    descDe: 'Keempat bagian latihan dengan batas waktu simulasi (tanpa jeda).',
    icon: Layers,
  },
  {
    mode: 'module',
    titleDe: 'Satu Modul',
    descDe: 'Simulasi terfokus pada satu keterampilan dengan pengatur waktu.',
    icon: Clock,
  },
  {
    mode: 'practice',
    titleDe: 'Latihan Bebas',
    descDe: 'Berlatih tanpa batas waktu, dapat dijeda kapan saja.',
    icon: Sparkles,
  },
];

export function ExamModeSelector({
  selectedMode,
  onSelectMode,
  modules,
  selectedModuleKey,
  onSelectModuleKey,
}: ExamModeSelectorProps) {
  return (
    <div className="space-y-4">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
        role="radiogroup"
        aria-label="Pilih mode simulasi"
      >
        {MODE_CARDS.map((card) => {
          const isActive = selectedMode === card.mode;
          const Icon = card.icon;
          return (
            <button
              key={card.mode}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onSelectMode(card.mode)}
              className={`min-h-[88px] text-left rounded-2xl p-4 transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20 ${
                isActive
                  ? 'bg-[#FDF2F2] dark:bg-[#2C1A19] ring-2 ring-[#B91C1C] dark:ring-[#DC2626] text-[#1C1917] dark:text-[#F5F2EB]'
                  : 'bg-[#F7F4EC] hover:bg-[#EFEAE0] dark:bg-[#1A1816] dark:hover:bg-[#262320] border border-[#E6E0D4] dark:border-[#2E2A25] text-[#1C1917] dark:text-[#F5F2EB]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? 'text-[#B91C1C] dark:text-[#F87171]'
                      : 'text-[#6B6560] dark:text-[#B5AEA5]'
                  }`}
                />
                <span className="font-display text-[15px] font-bold">{card.titleDe}</span>
              </div>
              <p className="text-[13px] leading-5 text-[#57524C] dark:text-[#B5AEA5] mt-1.5">
                {card.descDe}
              </p>
            </button>
          );
        })}
      </div>

      {selectedMode !== 'full' && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
              {selectedMode === 'module'
                ? 'Pilih keterampilan yang ingin disimulasikan:'
                : 'Pilih keterampilan yang ingin dilatih tanpa batas waktu:'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {modules.map((mod) => {
              const active = selectedModuleKey === mod.moduleKey;
              return (
                <button
                  key={mod.moduleKey}
                  type="button"
                  onClick={() => onSelectModuleKey(mod.moduleKey)}
                  className={`min-h-[48px] px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20 ${
                    active
                      ? 'bg-[#1C1917] text-white dark:bg-[#B91C1C]'
                      : 'bg-white hover:bg-[#F3EFE6] text-[#1C1917] border border-[#E6E0D4] dark:bg-[#1F1D1A] dark:border-[#2E2A25] dark:text-[#F5F2EB] dark:hover:bg-[#262320]'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-[14px] font-semibold">
                    <BookOpen className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    <span className="truncate">{getNeutralModuleLabel(mod.moduleKey)}</span>
                  </span>
                  <span
                    className={`block text-[12px] tabular-nums mt-0.5 ${
                      active ? 'text-[#E6E0D4] dark:text-red-100' : 'text-[#6B6560] dark:text-[#B5AEA5]'
                    }`}
                  >
                    {selectedMode === 'module'
                      ? `${mod.durationMinutes} mnt · ${mod.officialPoints} poin`
                      : `Tanpa timer · ${mod.officialPoints} poin`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
