import React from 'react';
import { Info } from 'lucide-react';

interface ExamInstructionsProps {
  moduleTitleDe: string;
  instructionsDe: string;
  sectionTitleDe: string;
  sectionInstructionsDe: string;
  isSprachbausteine?: boolean;
}

export function ExamInstructions({
  moduleTitleDe,
  instructionsDe,
  sectionTitleDe,
  sectionInstructionsDe,
  isSprachbausteine,
}: ExamInstructionsProps) {
  return (
    <div className="bg-[#F7F4EC] dark:bg-[#1A1816] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-2">
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171] shrink-0 mt-1" />
        <div className="space-y-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
            {moduleTitleDe} · {sectionTitleDe}
            {isSprachbausteine ? ' (Sprachbausteine)' : ''}
          </p>
          <p className="text-[13px] text-[#57524C] dark:text-[#D6CFC5]">{instructionsDe}</p>
          <p className="text-[13px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
            Aufgabenanweisung: {sectionInstructionsDe}
          </p>
        </div>
      </div>
    </div>
  );
}
