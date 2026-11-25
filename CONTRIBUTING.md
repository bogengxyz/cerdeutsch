# Panduan Kontribusi Cerdeutsch

Terima kasih telah tertarik berkontribusi pada proyek **Cerdeutsch** — platform belajar bahasa Jerman *open source* dan gratis untuk semua orang!

## Prinsip Proyek
1. **100% Gratis & Bebas API Berbayar:** Aplikasi berjalan sepenuhnya di browser (*client-side*) tanpa memerlukan API key, login, atau langganan.
2. **Privasi Terjaga:** Progres belajar tersimpan di `localStorage` perangkat pengguna.
3. **Kualitas Konten Terverifikasi:** Setiap kosakata dan file audio harus lolos validasi sebelum digabungkan.

## Menjalankan Proyek Secara Lokal

Prasyarat: **Node.js** (disarankan v20+)

```bash
# 1. Clone repositori dan instal dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev
```

## Menambah atau Memperbarui Audio Kosakata

Proyek ini menyediakan pipeline generator audio di `scripts/audio/`:

```bash
# Generate audio untuk level tertentu (contoh: A1, A2, B1, B2, atau all)
npx tsx scripts/audio/generate-vocab-audio.ts --level=A1

# Verifikasi file MP3 dan daftarkan path secara otomatis ke data TypeScript
npx tsx scripts/audio/verify-vocab-audio.ts --level=A1 --apply
```

> **Catatan:** Jangan mendaftarkan `audioPath` secara manual jika file MP3 fisiknya belum tersedia di `public/audio/vocab/`.

## Syarat Sebelum Mengirim Pull Request (PR)

Pastikan seluruh pemeriksaan di bawah ini lolos tanpa error:

```bash
# Cek tipe TypeScript
npm run lint

# Jalankan unit test validasi konten, spaced repetition, daily mission, & audio helpers
npx tsx --test src/services/contentValidationService.test.ts src/services/spacedRepetitionService.test.ts src/services/dailyMissionService.test.ts scripts/audio/vocabAudioHelpers.test.ts

# Pastikan build produksi sukses
npm run build
```
