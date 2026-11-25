import React, { useState } from 'react';
import { AlertTriangle, BarChart3, CheckCircle2, Moon, Sparkles, Sun, Trash2, Volume2 } from 'lucide-react';
import { auditFullQuestionBankAsync } from '../../services/contentValidationService';
import { CEFRLevel, UserSettings } from '../../types/learning';
import { ContentAuditReport } from '../../types/phase4';
import { BRAND_NAME, getNeutralProviderShortLabel } from '../../utils/brandLabels';
import { ModalSheet, TouchButton } from '../ui/TouchFlowPrimitives';

interface EinstellungenViewProps {
  settings: UserSettings;
  onUpdateSettings: (next: UserSettings) => void;
  onResetProgress: () => void;
  onOpenOnboarding?: () => void;
}

export function EinstellungenView({
  settings,
  onUpdateSettings,
  onResetProgress,
  onOpenOnboarding,
}: EinstellungenViewProps) {
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);
  const [auditReport, setAuditReport] = useState<ContentAuditReport | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);

  const handleRunAudit = async () => {
    setAuditLoading(true);
    try {
      const report = await auditFullQuestionBankAsync();
      setAuditReport(report);
    } finally {
      setAuditLoading(false);
    }
  };

  const handleConfirmReset = () => {
    onResetProgress();
    setConfirmResetOpen(false);
    setResetNotice(true);
    window.setTimeout(() => setResetNotice(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <section className="space-y-2">
        <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Einstellungen
        </h1>
        <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
          Passe Darstellung, Audiohinweise, Lernziele und deine lokal gespeicherten Daten an.
        </p>
      </section>

      {resetNotice && (
        <div
          role="status"
          className="rounded-2xl bg-[#ECFDF5] text-emerald-900 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900/40 px-5 py-3.5 text-[14px] font-medium"
        >
          Alle lokalen Lerndaten wurden erfolgreich zurückgesetzt.
        </div>
      )}

      {/* Language Preference (Bilingual Toggle) */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Bahasa Pengantar Antarmuka / Oberflächensprache
        </h2>
        <p className="text-[13.5px] text-[#57524C] dark:text-[#C8C1B8]">
          Pilih mode bahasa untuk label menu dan navigasi aplikasi. Sangat disarankan bagi pemula untuk mengaktifkan Bahasa Indonesia.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onUpdateSettings({ ...settings, uiLanguage: 'id' })}
            aria-pressed={settings.uiLanguage !== 'de'}
            className={`min-h-[56px] px-4 py-3 rounded-xl border flex items-center gap-3 text-left transition-colors cursor-pointer ${
              settings.uiLanguage !== 'de'
                ? 'border-[#B91C1C] bg-[#FDF2F2] text-[#B91C1C] dark:bg-[#2C1A19] dark:text-[#FCA5A5]'
                : 'border-[#E6E0D4] bg-[#FAF8F4] text-[#57524C] hover:bg-[#F3EFE6] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#C8C1B8]'
            }`}
          >
            <span className="text-2xl shrink-0">🇮🇩</span>
            <div>
              <p className="text-[15px] font-semibold">Bahasa Indonesia</p>
              <p className="text-[12px] opacity-80">Mode ramah pemula dengan istilah ganda (ID/DE)</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSettings({ ...settings, uiLanguage: 'de' })}
            aria-pressed={settings.uiLanguage === 'de'}
            className={`min-h-[56px] px-4 py-3 rounded-xl border flex items-center gap-3 text-left transition-colors cursor-pointer ${
              settings.uiLanguage === 'de'
                ? 'border-[#B91C1C] bg-[#FDF2F2] text-[#B91C1C] dark:bg-[#2C1A19] dark:text-[#FCA5A5]'
                : 'border-[#E6E0D4] bg-[#FAF8F4] text-[#57524C] hover:bg-[#F3EFE6] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#C8C1B8]'
            }`}
          >
            <span className="text-2xl shrink-0">🇩🇪</span>
            <div>
              <p className="text-[15px] font-semibold">Deutsch (Immersiv)</p>
              <p className="text-[12px] opacity-80">Seluruh menu disajikan dalam bahasa Jerman asli</p>
            </div>
          </button>
        </div>
      </section>

      {/* Onboarding & Placement Re-run */}
      {onOpenOnboarding && (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Panduan Awal & Tes Penempatan
            </h2>
          </div>
          <p className="text-[13.5px] text-[#57524C] dark:text-[#C8C1B8]">
            Ingin mengubah target belajar atau mengikuti kembali tes penempatan cepat untuk menentukan tingkat awal?
          </p>
          <button
            type="button"
            onClick={onOpenOnboarding}
            className="min-h-[44px] px-5 rounded-xl border border-[#B91C1C] text-[#B91C1C] hover:bg-[#FDF2F2] dark:border-[#EF4444] dark:text-[#FCA5A5] dark:hover:bg-[#2C1A19] text-[13.5px] font-bold transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Jalankan Ulang Panduan & Tes Penempatan</span>
          </button>
        </section>
      )}

      {/* Theme Preference */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Darstellung
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onUpdateSettings({ ...settings, theme: 'light' })}
            aria-pressed={settings.theme === 'light'}
            className={`min-h-[56px] px-4 py-3 rounded-xl border flex items-center gap-3 text-left transition-colors cursor-pointer ${
              settings.theme === 'light'
                ? 'border-[#B91C1C] bg-[#FDF2F2] text-[#B91C1C] dark:bg-[#2C1A19] dark:text-[#FCA5A5]'
                : 'border-[#E6E0D4] bg-[#FAF8F4] text-[#57524C] hover:bg-[#F3EFE6] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#C8C1B8]'
            }`}
          >
            <Sun className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-[15px] font-semibold">Helles Design</p>
              <p className="text-[12px] opacity-80">Warmes Elfenbein & Papierweiß</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSettings({ ...settings, theme: 'dark' })}
            aria-pressed={settings.theme === 'dark'}
            className={`min-h-[56px] px-4 py-3 rounded-xl border flex items-center gap-3 text-left transition-colors cursor-pointer ${
              settings.theme === 'dark'
                ? 'border-[#B91C1C] bg-[#FDF2F2] text-[#B91C1C] dark:border-[#DC2626] dark:bg-[#2C1A19] dark:text-[#FCA5A5]'
                : 'border-[#E6E0D4] bg-[#FAF8F4] text-[#57524C] hover:bg-[#F3EFE6] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#C8C1B8]'
            }`}
          >
            <Moon className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-[15px] font-semibold">Dunkles Design</p>
              <p className="text-[12px] opacity-80">Augenschonend am Abend</p>
            </div>
          </button>
        </div>
      </section>

      {/* Sound Preferences */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
        <div className="flex items-center gap-2.5">
          <Volume2 className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
          <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Audio & Aussprache
          </h2>
        </div>

        <div className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25]">
          <div className="py-3 flex items-center justify-between gap-4 min-h-[56px]">
            <div>
              <p className="text-[15px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                Sprachausgabe aktivieren
              </p>
              <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                Erlaubt das Abspielen von Hörtexten und Vokabeln über den Browser
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.soundEnabled}
              aria-label="Sprachausgabe aktivieren"
              onClick={() =>
                onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled })
              }
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                settings.soundEnabled ? 'bg-[#B91C1C] dark:bg-[#DC2626]' : 'bg-[#D8D0C3] dark:bg-[#3A352F]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between gap-4 min-h-[56px]">
            <div>
              <p className="text-[15px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                Hörübungen automatisch starten
              </p>
              <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                Startet die Audiowiedergabe beim Öffnen einer Höraufgabe
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.autoPlayAudio}
              aria-label="Hörübungen automatisch starten"
              onClick={() =>
                onUpdateSettings({ ...settings, autoPlayAudio: !settings.autoPlayAudio })
              }
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                settings.autoPlayAudio ? 'bg-[#B91C1C] dark:bg-[#DC2626]' : 'bg-[#D8D0C3] dark:bg-[#3A352F]'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  settings.autoPlayAudio ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Learning Preferences */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-5">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Lernpräferenzen
        </h2>

        <div className="space-y-2">
          <p className="text-[13px] font-medium text-[#57524C] dark:text-[#C8C1B8]">
            Aktuelles Lernniveau
          </p>
          <div className="flex flex-wrap gap-2">
            {(['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onUpdateSettings({ ...settings, preferredLevel: lvl })}
                aria-pressed={settings.preferredLevel === lvl}
                className={`min-h-[44px] px-4 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer border ${
                  settings.preferredLevel === lvl
                    ? 'bg-[#B91C1C] text-white border-[#B91C1C] dark:bg-[#DC2626]'
                    : 'bg-[#FAF8F4] text-[#1C1917] border-[#E6E0D4] hover:bg-[#F3EFE6] dark:bg-[#262320] dark:text-[#F5F2EB] dark:border-[#3A352F]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[13px] font-medium text-[#57524C] dark:text-[#C8C1B8]">
            Tägliches Lernziel
          </p>
          <div className="flex flex-wrap gap-2">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onUpdateSettings({ ...settings, dailyTargetMinutes: mins })}
                aria-pressed={settings.dailyTargetMinutes === mins}
                className={`min-h-[44px] px-4 rounded-xl text-[14px] font-semibold tabular-nums transition-colors cursor-pointer border ${
                  settings.dailyTargetMinutes === mins
                    ? 'bg-[#B91C1C] text-white border-[#B91C1C] dark:bg-[#DC2626]'
                    : 'bg-[#FAF8F4] text-[#1C1917] border-[#E6E0D4] hover:bg-[#F3EFE6] dark:bg-[#262320] dark:text-[#F5F2EB] dark:border-[#3A352F]'
                }`}
              >
                {mins} Min.
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Local Storage Privacy & Transparency */}
      <section className="bg-[#FAF2DF] dark:bg-[#252017] rounded-2xl p-6 space-y-2 border border-[#EADBC0] dark:border-[#3A3122]">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Penyimpanan Lokal Tanpa Akun
        </h2>
        <p className="text-[14px] leading-6 text-[#4B453F] dark:text-[#D1CBC2]">
          {BRAND_NAME} tidak memerlukan pendaftaran maupun akun cloud. Kemajuan belajar, jadwal
          kartu kosakata, analisis kesalahan, koleksi pribadi, dan simulasi ujian disimpan secara
          eksklusif di penyimpanan lokal peramban ini (localStorage) serta tidak disinkronkan
          antarperangkat.
        </p>
      </section>

      {/* Content Coverage & Question Bank Diagnostics */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
            <div>
              <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Inhaltsdiagnose & Fragenbank-Bericht
              </h2>
              <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                Prüft alle gespeicherten Aufgaben nach Niveau, Modul, Thema, Schwierigkeit und Audio-Status.
              </p>
            </div>
          </div>

          <TouchButton
            variant="secondary"
            size="sm"
            disabled={auditLoading}
            onClick={() => void handleRunAudit()}
          >
            {auditLoading ? 'Prüfung läuft...' : auditReport ? 'Bericht aktualisieren' : 'Fragenbank prüfen'}
          </TouchButton>
        </div>

        {auditReport?.questionBankAudit && (
          <div className="space-y-4 pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                <p className="text-[#6B6560] dark:text-[#A8A095]">Abgeschlossene Aufgaben</p>
                <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
                  {auditReport.questionBankAudit.totalCompletedObjectiveQuestions}
                </p>
              </div>
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                <p className="text-[#6B6560] dark:text-[#A8A095]">Hören (wartet auf Audio)</p>
                <p className="font-display text-xl font-bold text-[#B45309] dark:text-amber-400 tabular-nums mt-0.5">
                  {auditReport.questionBankAudit.totalAwaitingAudioQuestions}
                </p>
              </div>
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                <p className="text-[#6B6560] dark:text-[#A8A095]">Ungültige / Duplikate</p>
                <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
                  {auditReport.questionBankAudit.invalidQuestionsCount} /{' '}
                  {auditReport.questionBankAudit.duplicateIdsCount}
                </p>
              </div>
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                <p className="text-[#6B6560] dark:text-[#A8A095]">Abgedeckte Themen</p>
                <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
                  {auditReport.questionBankAudit.topicsCoveredCount}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25]">
              <table className="w-full text-left text-[12px] sm:text-[12.5px] border-collapse">
                <thead className="bg-[#F3EFE6] dark:bg-[#262320] text-[#57524C] dark:text-[#C8C1B8]">
                  <tr>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Level</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Lesen</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Hören (Audio)</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Hören (Ausst.)</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Grammatik</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Wortschatz</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Schreiben</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Sprechen</th>
                    <th className="px-2 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Gesamt (Audio)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] bg-white dark:bg-[#1F1D1A] tabular-nums">
                  {auditReport.questionBankAudit.rowsByLevel.map((row) => (
                    <tr key={row.level}>
                      <td className="px-2 py-2 font-bold text-[#1C1917] dark:text-[#F5F2EB]">{row.level}</td>
                      <td className="px-2 py-2">{row.lesen}</td>
                      <td className="px-2 py-2">{row.hoerenWithAudio}</td>
                      <td className="px-2 py-2 text-[#B45309] dark:text-amber-400">{row.hoerenAwaitingAudio}</td>
                      <td className="px-2 py-2">{row.grammatik}</td>
                      <td className="px-2 py-2">{row.wortschatz}</td>
                      <td className="px-2 py-2">{row.schreiben}</td>
                      <td className="px-2 py-2">{row.sprechen}</td>
                      <td className="px-2 py-2 font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                        {row.totalCompletedObjective}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-[12px] text-[#57524C] dark:text-[#C8C1B8] space-y-1">
              <p>
                <strong>Schwierigkeitsgrade:</strong> Leicht ({auditReport.questionBankAudit.countsByDifficulty.Leicht}) · Mittel ({auditReport.questionBankAudit.countsByDifficulty.Mittel}) · Anspruchsvoll ({auditReport.questionBankAudit.countsByDifficulty.Anspruchsvoll})
              </p>
              <p>
                <strong>Nahezu identische Fragen:</strong> {auditReport.questionBankAudit.nearDuplicateCount} ·{' '}
                <strong>Fehlende Audiodateien (Hörübungen & Prüfungen):</strong> {auditReport.missingAudioCount}
              </p>
              {auditReport.valid ? (
                <p className="inline-flex items-center gap-1.5 text-[#15803D] dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Alle Validierungsregeln bestanden (0 Fehler).
                </p>
              ) : (
                <p className="text-[#B91C1C] dark:text-red-400 font-medium">
                  {auditReport.errors.length} Validierungsfehler gefunden: {auditReport.errors.slice(0, 3).join(' | ')}
                </p>
              )}
            </div>

            {auditReport.audioCoverage && (
              <div className="pt-4 border-t border-[#EFEAE0] dark:border-[#2E2A25] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-[15px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    Cakupan Audio (Simulasi Ujian & Latihan Harian)
                  </h3>
                  <span className="text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
                    Abdeckung: {auditReport.audioCoverage.coveragePercentage}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
                  <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                    <p className="text-[#6B6560] dark:text-[#A8A095]">Eindeutige MP3-Ziele</p>
                    <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
                      {auditReport.audioCoverage.totalUniqueAudioFiles}
                    </p>
                    <p className="text-[11px] text-[#6B6560] dark:text-[#A8A095] tabular-nums mt-0.5">
                      Prüfung: {auditReport.audioCoverage.examScriptCount} · Übung: {auditReport.audioCoverage.practiceUnitCount}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                    <p className="text-[#6B6560] dark:text-[#A8A095]">Verifizierte MP3s</p>
                    <p className="font-display text-xl font-bold text-[#15803D] dark:text-emerald-400 tabular-nums mt-0.5">
                      {auditReport.audioCoverage.actualMp3AvailableCount}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                    <p className="text-[#6B6560] dark:text-[#A8A095]">Fehlend / Ausstehend</p>
                    <p className="font-display text-xl font-bold text-[#B45309] dark:text-amber-400 tabular-nums mt-0.5">
                      {auditReport.audioCoverage.missingMp3Count} /{' '}
                      {auditReport.audioCoverage.pendingAudioCount}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]">
                    <p className="text-[#6B6560] dark:text-[#A8A095]">Defekte / Duplikate</p>
                    <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
                      {auditReport.audioCoverage.brokenPathExerciseIds.length +
                        auditReport.audioCoverage.invalidScriptExerciseIds.length +
                        auditReport.audioCoverage.unlinkedPracticeIds.length}{' '}
                      / {auditReport.audioCoverage.duplicateAudioPaths.length}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25]">
                  <table className="w-full text-left text-[13px] border-collapse">
                    <thead className="bg-[#F3EFE6] dark:bg-[#262320] text-[#57524C] dark:text-[#C8C1B8]">
                      <tr>
                        <th className="px-3 py-2 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Bereich</th>
                        <th className="px-3 py-2 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Niveau</th>
                        <th className="px-3 py-2 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Tracks</th>
                        <th className="px-3 py-2 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Verifiziert</th>
                        <th className="px-3 py-2 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Fehlend</th>
                        <th className="px-3 py-2 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Ausstehend</th>
                        <th className="px-3 py-2 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F]">Abdeckung</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] bg-white dark:bg-[#1F1D1A] tabular-nums">
                      {auditReport.audioCoverage.byProviderAndLevel.map((row) => (
                        <tr key={`${row.provider}-${row.level}`}>
                          <td className="px-3 py-2 font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                            {getNeutralProviderShortLabel(row.provider)}
                          </td>
                          <td className="px-3 py-2 font-bold">{row.level}</td>
                          <td className="px-3 py-2">{row.total}</td>
                          <td className="px-3 py-2 text-[#15803D] dark:text-emerald-400">{row.available}</td>
                          <td className="px-3 py-2 text-[#B45309] dark:text-amber-400">{row.missing}</td>
                          <td className="px-3 py-2 text-[#6B6560] dark:text-[#A8A095]">{row.pending}</td>
                          <td className="px-3 py-2 font-semibold">{row.coveragePercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {auditReport.audioCoverage.actualMp3AvailableCount === 0 && (
                  <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                    Hinweis: Aktuell sind 0 lokale MP3-Dateien verifiziert. Führe lokal{' '}
                    <code className="font-mono">npm run audio:export</code>,{' '}
                    <code className="font-mono">npm run audio:generate</code> und{' '}
                    <code className="font-mono">npm run audio:verify</code> aus, um reale MP3-Dateien unter{' '}
                    <code className="font-mono">public/audio/exams/</code> und{' '}
                    <code className="font-mono">public/audio/practice/</code> zu erzeugen und freizuschalten.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Reset Local Data */}
      <section className="bg-[#FDF2F2] dark:bg-red-950/25 rounded-2xl border border-[#EED8D2] dark:border-red-900/40 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Lokale Lerndaten zurücksetzen
            </h2>
            <p className="text-[14px] text-[#4B453F] dark:text-[#D1CBC2]">
              Löscht deinen gespeicherten Fortschritt, Karteikarten-Status, Fehleranalyse,
              Sammlung, Schreib-/Sprechverlauf und Prüfungssimulationen aus dem lokalen
              Browserspeicher.
            </p>
          </div>
        </div>

        <TouchButton
          variant="destructive"
          size="sm"
          onClick={() => setConfirmResetOpen(true)}
        >
          <Trash2 className="w-4 h-4" />
          Lerndaten zurücksetzen
        </TouchButton>
      </section>

      <ModalSheet
        open={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        title="Lerndaten wirklich zurücksetzen?"
        subtitle="Dieser Vorgang kann nicht rückgängig gemacht werden."
      >
        <div className="space-y-5">
          <p className="text-[15px] leading-6 text-[#4B453F] dark:text-[#D1CBC2]">
            Alle bisher gespeicherten Übungsergebnisse, Karteikarten-Intervalle, Fehlereinträge,
            Lesezeichen, Schreib-/Sprech-Selbstkontrollen und Prüfungsversuche werden vollständig
            aus diesem Browser entfernt.
          </p>
          <div className="flex flex-wrap justify-end gap-3">
            <TouchButton
              variant="secondary"
              size="sm"
              onClick={() => setConfirmResetOpen(false)}
            >
              Abbrechen
            </TouchButton>
            <TouchButton variant="destructive" size="sm" onClick={handleConfirmReset}>
              Ja, alles zurücksetzen
            </TouchButton>
          </div>
        </div>
      </ModalSheet>
    </div>
  );
}
