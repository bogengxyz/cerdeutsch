import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { ExamProvider } from '../../types/exam';

interface ExamProviderSelectorProps {
  selectedProvider: ExamProvider;
  onSelectProvider: (provider: ExamProvider) => void;
}

export function ExamProviderSelector({
  selectedProvider,
  onSelectProvider,
}: ExamProviderSelectorProps) {
  const providers: {
    id: ExamProvider;
    badge: string;
    title: string;
    subtitle: string;
    highlights: string[];
  }[] = [
    {
      id: 'goethe',
      badge: 'Format Simulasi A',
      title: 'Paket Latihan A',
      subtitle: 'Struktur tergabung (A1–A2) & modul keterampilan terpisah (B1–B2)',
      highlights: [
        'Persiapan Ujian A1–A2: Total 100 poin (Tertulis 75 / Lisan 25)',
        'Persiapan Ujian B1–B2: Empat modul independen 100 poin (ambang latihan 60%)',
      ],
    },
    {
      id: 'telc',
      badge: 'Format Simulasi B',
      title: 'Paket Latihan B',
      subtitle: 'Latihan terpadu dengan tata bahasa dalam konteks & penilaian terpisah',
      highlights: [
        'Persiapan Ujian A1–A2: Simulasi ringkas 60 poin (15 poin per keterampilan)',
        'Persiapan Ujian B1–B2: 300 poin termasuk Sprachbausteine (135/225 tertulis & 45/75 lisan)',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {providers.map((item) => {
        const isActive = selectedProvider === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectProvider(item.id)}
            aria-pressed={isActive}
            className={`text-left rounded-2xl p-5 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20 ${
              isActive
                ? 'bg-white dark:bg-[#1F1D1A] ring-2 ring-[#B91C1C] dark:ring-[#DC2626] shadow-[0_4px_14px_rgba(185,28,28,0.08)] dark:shadow-none'
                : 'bg-[#F7F4EC] hover:bg-[#EFEAE0] dark:bg-[#1A1816] dark:hover:bg-[#262320] border border-[#E6E0D4] dark:border-[#2E2A25]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
                  {item.badge}
                </p>
                <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
                  {item.title}
                </h2>
                <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5] mt-1">
                  {item.subtitle}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-[#B91C1C] dark:bg-[#DC2626] text-white'
                    : 'bg-[#FDF2F2] border border-[#E9B8B8] dark:bg-[#2C1A19] dark:border-[#5C2926] text-[#B91C1C] dark:text-[#F87171]'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
            </div>

            <ul className="mt-4 space-y-1.5 text-[13px] text-[#57524C] dark:text-[#D6CFC5]">
              {item.highlights.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
