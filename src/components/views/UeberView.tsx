import React from 'react';
import { Award, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';
import { CEFR_LEVELS } from '../../data/curriculum';
import { NavPage } from '../../types/learning';
import { BRAND_DESCRIPTION, BRAND_NAME, BRAND_TAGLINE } from '../../utils/brandLabels';
import { GermanFlagMark, TouchButton } from '../ui/TouchFlowPrimitives';

interface UeberViewProps {
  onNavigate: (page: NavPage) => void;
}

export function UeberView({ onNavigate }: UeberViewProps) {
  return (
    <div className="space-y-8 max-w-3xl">
      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <GermanFlagMark className="w-7 h-5" />
          <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Tentang {BRAND_NAME}
          </h1>
        </div>
        <p className="text-[16px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
          {BRAND_NAME} adalah {BRAND_DESCRIPTION.toLowerCase()} {BRAND_TAGLINE} Platform ini
          membantu pembelajar menguasai bahasa Jerman dari tingkat A1, A2, B1, hingga B2 melalui
          latihan terstruktur untuk seluruh keterampilan bahasa dan simulasi ujian mandiri.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-2.5">
          <div className="flex items-center gap-2 text-[#B91C1C] dark:text-[#EF4444]">
            <GraduationCap className="w-5 h-5" />
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Cakupan Belajar A1–B2
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-[#57524C] dark:text-[#C8C1B8]">
            Materi tersusun sistematis sesuai kerangka CEFR untuk Latihan Membaca, Latihan
            Mendengarkan, Latihan Berbicara, Latihan Menulis, Tata Bahasa, dan Kosakata.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-2.5">
          <div className="flex items-center gap-2 text-[#15803D] dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Tanpa Akun & Penyimpanan Lokal
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-[#57524C] dark:text-[#C8C1B8]">
            Tidak perlu registrasi atau biaya berlangganan. Seluruh progres belajar, kartu kosakata,
            dan riwayat latihan Anda tersimpan aman secara lokal di peramban Anda.
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Tingkat Pembelajaran yang Tersedia (A1–B2)
        </h2>
        <ul className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25]">
          {CEFR_LEVELS.map((lvl) => (
            <li key={lvl.level} className="py-3 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[15px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                  {lvl.title}
                </p>
                <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">{lvl.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3">
        <div className="flex items-center gap-2 text-[#B91C1C] dark:text-[#EF4444]">
          <Award className="w-5 h-5" />
          <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Catatan Independensi & Simulasi Ujian
          </h2>
        </div>
        <p className="text-[14px] leading-6 text-[#57524C] dark:text-[#C8C1B8]">
          {BRAND_NAME} adalah platform belajar bahasa Jerman yang independen. {BRAND_NAME} bukan
          penyelenggara, mitra, afiliasi, maupun situs resmi lembaga sertifikasi atau penyelenggara
          ujian bahasa Jerman mana pun, dan simulasi di platform ini tidak menerbitkan sertifikat
          resmi.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <TouchButton variant="primary" size="sm" onClick={() => onNavigate('lernen')}>
            Mulai Belajar
          </TouchButton>
          <TouchButton variant="secondary" size="sm" onClick={() => onNavigate('pruefung')}>
            Lihat Simulasi Ujian
          </TouchButton>
        </div>
      </section>
    </div>
  );
}
