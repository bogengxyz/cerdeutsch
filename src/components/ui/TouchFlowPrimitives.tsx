import React, { useEffect } from 'react';
import {
  BookOpen,
  Check,
  Headphones,
  Mic,
  PenLine,
  X,
} from 'lucide-react';
import { CEFRLevel, SkillType } from '../../types/learning';

export function GermanFlagMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-col overflow-hidden rounded-[3px] w-5 h-3.5 shrink-0 ring-1 ring-black/15 dark:ring-white/20 ${className}`}
    >
      <span className="flex-1 bg-[#1C1917]" />
      <span className="flex-1 bg-[#B91C1C]" />
      <span className="flex-1 bg-[#D4A017]" />
    </span>
  );
}

export function CerdeutschBrandMark({ className = 'w-9 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 34"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M5 18C15 6 28 3 41 7C49 9.5 55 8 59 5C53 12 45 14 36 12C25 9.5 14 13 5 18Z"
        fill="#1C1917"
        className="dark:fill-[#F5F2EB]"
      />
      <path
        d="M4 24C15 12 29 9 43 13C50 15 56 13.5 60 10C54 17.5 45 19.5 35 17.5C24 15.2 13 18.5 4 24Z"
        fill="#B91C1C"
        className="dark:fill-[#DC2626]"
      />
      <path
        d="M6 29.5C17 18.5 30 15.5 43 19C49.5 20.8 55 19.5 58.5 16.5C52.5 23 44 24.8 34.5 22.8C24 20.6 14 23.8 6 29.5Z"
        fill="#D4A017"
      />
    </svg>
  );
}

export const DeutschMeisterRibbonMark = CerdeutschBrandMark;

export function getEditorialLevelColor(level: CEFRLevel): string {
  switch (level) {
    case 'A1':
      return '#B91C1C';
    case 'A2':
      return '#1C1917';
    case 'B1':
      return '#B45309';
    case 'B2':
      return '#7F1D1D';
  }
}

interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export function TouchButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}: TouchButtonProps) {
  const variantClasses: Record<NonNullable<TouchButtonProps['variant']>, string> = {
    primary:
      'bg-[#B91C1C] text-white hover:bg-[#991B1B] active:scale-[0.98] dark:bg-[#DC2626] dark:hover:bg-[#B91C1C] focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20',
    secondary:
      'bg-[#F3EFE6] text-[#1C1917] border border-[#E4DDD0] hover:bg-[#EAE3D5] active:scale-[0.98] dark:bg-[#262320] dark:text-[#F5F2EB] dark:border-[#3A352F] dark:hover:bg-[#312D28] focus-visible:ring-4 focus-visible:ring-[#B91C1C]/15',
    ghost:
      'bg-transparent text-[#57524C] hover:bg-[#F3EFE6]/80 hover:text-[#1C1917] active:bg-[#EAE3D5] dark:text-[#C8C1B8] dark:hover:bg-[#262320] dark:hover:text-[#F5F2EB] focus-visible:ring-4 focus-visible:ring-[#B91C1C]/15',
    destructive:
      'bg-[#991B1B] text-white hover:bg-[#7F1D1D] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-[#991B1B]/25',
  };

  const sizeClasses: Record<NonNullable<TouchButtonProps['size']>, string> = {
    sm: 'min-h-[44px] px-4 py-2 text-sm font-medium rounded-xl',
    md: 'min-h-[48px] px-5 py-2.5 text-[15px] font-semibold rounded-xl',
    lg: 'min-h-[54px] px-7 py-3 text-base font-semibold rounded-full',
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TouchCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-center gap-3 min-h-[44px] py-1.5 select-none ${
        disabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative flex items-center justify-center w-[22px] h-[22px] rounded-[6px] shrink-0 transition-all duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/15 ${
          checked
            ? 'bg-[#B91C1C] border-2 border-[#B91C1C] text-white dark:bg-[#DC2626] dark:border-[#DC2626]'
            : 'bg-white border-2 border-[#D2C9BA] dark:bg-[#1F1D1A] dark:border-[#4A443D]'
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </button>
      <span className="text-[15px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">{label}</span>
    </label>
  );
}

export function TouchRadio({
  selected,
  onSelect,
  label,
  name,
  disabled = false,
  status,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  name: string;
  disabled?: boolean;
  status?: 'correct' | 'incorrect' | 'neutral';
}) {
  const ringBorder =
    status === 'correct'
      ? 'border-[#15803D] bg-[#ECFDF5] dark:border-emerald-600 dark:bg-emerald-950/35'
      : status === 'incorrect'
        ? 'border-[#B91C1C] bg-[#FDF2F2] dark:border-red-600 dark:bg-red-950/35'
        : selected
          ? 'border-[#B91C1C] bg-[#FDF2F2] dark:border-[#DC2626] dark:bg-[#2C1A19]'
          : 'border-[#E6E0D4] bg-[#FAF8F4] hover:bg-[#F3EFE6] dark:border-[#2E2A25] dark:bg-[#1A1816] dark:hover:bg-[#25221E]';

  return (
    <button
      type="button"
      role="radio"
      name={name}
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={`w-full flex items-center gap-3.5 min-h-[52px] px-4 py-3 rounded-xl border text-left transition-all duration-150 cursor-pointer disabled:cursor-default focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/15 ${ringBorder}`}
    >
      <span
        aria-hidden="true"
        className={`flex items-center justify-center w-[22px] h-[22px] rounded-full border-2 shrink-0 transition-colors ${
          status === 'correct'
            ? 'border-[#15803D] dark:border-emerald-400'
            : status === 'incorrect'
              ? 'border-[#B91C1C] dark:border-red-400'
              : selected
                ? 'border-[#B91C1C] dark:border-[#EF4444]'
                : 'border-[#CFC7B9] dark:border-[#524B43]'
        }`}
      >
        {(selected || status === 'correct') && (
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              status === 'correct'
                ? 'bg-[#15803D] dark:bg-emerald-400'
                : status === 'incorrect'
                  ? 'bg-[#B91C1C] dark:bg-red-400'
                  : 'bg-[#B91C1C] dark:bg-[#EF4444]'
            }`}
          />
        )}
      </span>
      <span className="text-[15px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">{label}</span>
    </button>
  );
}

export function SkillIcon({
  skill,
  className = 'w-5 h-5',
}: {
  skill: SkillType;
  className?: string;
}) {
  switch (skill) {
    case 'lesen':
      return <BookOpen className={className} />;
    case 'hoeren':
      return <Headphones className={className} />;
    case 'sprechen':
      return <Mic className={className} />;
    case 'schreiben':
      return <PenLine className={className} />;
  }
}

export function ModalSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1C1917]/50 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-sheet-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full sm:max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#1F1D1A] rounded-t-3xl sm:rounded-2xl shadow-[0_16px_48px_rgba(28,25,23,0.18)] border border-[#E6E0D4] dark:border-[#2E2A25] overflow-hidden">
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <span className="w-10 h-1.5 rounded-full bg-[#D8D0C3] dark:bg-[#3D3731]" aria-hidden="true" />
        </div>
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-[#EAE4D9] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#1A1816]">
          <div className="min-w-0">
            <h2
              id="modal-sheet-title"
              className="font-display text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] truncate"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fenster schließen"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#6B6560] hover:bg-[#EFEAE0] hover:text-[#1C1917] dark:text-[#B5AEA5] dark:hover:bg-[#2A2622] dark:hover:text-[#F5F2EB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 sm:px-6 py-5 pb-safe">{children}</div>
      </div>
    </div>
  );
}
