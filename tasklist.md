# TASK LIST: PENGEMBANGAN WEBSITE ALFACARE ANIMAL CLINIC JAKARTA

> **Status Proyek:** Tahap 3 Selesai — Database & Backend Integration (Supabase + Resend) Siap  
> **Pendekatan Alur:** *Local Frontend First* $\rightarrow$ *Supabase Database Integration* $\rightarrow$ *Push GitHub & Deploy Vercel*  
> **Arsitektur:** Next.js 15 (App Router) + TypeScript + Tailwind CSS  
> **Infrastruktur:** Local Dev $\rightarrow$ Supabase (PostgreSQL & Storage) $\rightarrow$ GitHub & Vercel  
> **Dokumen Referensi:** [PRD-AlfaCare-Animal-Clinic.md](file:///c:/Users/ASUS/Documents/Antigravity/coba3/PRD-AlfaCare-Animal-Clinic.md)

---

## 📋 DAFTAR TUGAS UTAMA (PHASED ROADMAP)

### TAHAP 1: SETUP PROYEK LOKAL & DESAIN SISTEM (LOCAL ENVIRONMENT)
- [x] **1.1 Inisialisasi Proyek Next.js 15 & Git Lokal**
  - [x] Inisialisasi aplikasi Next.js 15 App Router, React 19, TypeScript, dan Tailwind CSS di lokal
  - [x] Inisialisasi repository Git lokal dan file `.gitignore` lengkap
  - [x] Konfigurasi linter & TypeScript strict mode
- [x] **1.2 Setup Design System & Identitas Medis AlfaCare**
  - [x] Setup token warna medis premium di Tailwind (AlfaCare Navy, Emerald Trust Green, Urgent Red, Slate Light Gray)
  - [x] Integrasi font Google: *Outfit* (Heading terpercaya) & *Inter* / *Plus Jakarta Sans* (Body copy)
  - [x] Setup komponen dasar UI (Button, Card, Badge, Modal, Input, Slider)
- [x] **1.3 Arsitektur Dwibahasa Lokal (Bilingual ID & EN)**
  - [x] Setup dictionary translasi lokal (`messages/id.json` dan `messages/en.json`)
  - [x] Komponen `LanguageSwitcher` interaktif di Header dengan penyimpanan state lokal

---

### TAHAP 2: PEMBANGUNAN FRONTEND DUMMY INTERAKTIF LENGKAP DI LOKAL (MOCK-FIRST)
*(Semua fitur dapat dicoba dan berinteraksi secara penuh di browser lokal menggunakan mock data & local state)*

- [x] **2.1 Layout Shell, Header & Emergency Bar**
  - [x] `Header` sticky dengan logo AlfaCare, status klinik ("Dokter Jaga Standby"), Language Toggle (ID/EN), dan tombol Hotline Darurat
  - [x] `FloatingEmergencyBar` khusus mobile view (1-tap Call Darurat & 1-tap Booking)
  - [x] `Footer` profesional lengkap dengan info jam operasional Jakarta, rute, dan kontak

- [x] **2.2 High-Converting Hero Section**
  - [x] H1 berorientasi konversi & empati medis (Bilingual ID & EN)
  - [x] Trust Badges: *"SIPDH Terdaftar"*, *"Operasi Steril ISO"*, *"Lab Darah On-Site"*
  - [x] Dual Action CTA: `[Jadwalkan Kunjungan]` (smooth scroll ke booking) & `[Hitung Estimasi Biaya]` (scroll ke kalkulator)
  - [x] Emergency Triage Quick-Banner (Hotline 24/7 & Tombol Navigasi Cepat)

- [x] **2.3 Fitur: Interactive Service & Pricing Estimator (Kalkulator Biaya Interaktif)**
  - [x] Logika kalkulator dinamis 100% berjalan di browser (Client-side)
  - [x] Input bertingkat: Spesies (Kucing/Anjing/Eksotik), Kategori Bobot (Toy, Medium, Large, Giant)
  - [x] Katalog tarif benchmark Jakarta lengkap (Konsultasi, Vaksin F3/F4/DHPPiL, Steril, Dental, Rawat Inap/ICU per hari, USG, X-Ray, Lab CBC/Kimia Darah, Add-ons)
  - [x] Toggle darurat: Emergency Surcharge (+Rp 250.000 / $17 di luar jam kerja normal)
  - [x] Tampilan rincian biaya (*cost breakdown accordion*) + *Medical Disclaimer*
  - [x] **CTA Bridge:** Tombol `[Kunci Estimasi Ini & Jadwalkan Kunjungan]` yang otomatis mengisi data ke formulir booking

- [x] **2.4 Fitur: Interactive Multi-Step Booking Funnel (Formulir Reservasi Bertahap)**
  - [x] **Step 1 (Profil Pasien Hewan):** Nama pet, pilihan spesies, ras, usia, dan bobot (auto-fill dari kalkulator jika ada)
  - [x] **Step 2 (Layanan & Urgensi):** Kartu seleksi layanan medis komprehensif & pill urgensi (Rutin / Mendesak / Gawat)
  - [x] **Step 3 (Jadwal & Dokter):** Kalender tanggal dinamis (H+0 hingga H+30), radio slot jam kunjungan, dan preferensi dokter
  - [x] **Step 4 (Kontak Pemilik):** Input nama lengkap, nomor WhatsApp (+62), email, catatan gejala, dan checkbox persetujuan data (UU PDP)
  - [x] Validasi data inline per langkah (Zod validator)
  - [x] Progress bar interaktif & local storage persistence (data tidak hilang saat refresh)

- [x] **2.5 Fitur: Dynamic WhatsApp Dispatcher (Uji Coba Langsung)**
  - [x] Generator URL WhatsApp dengan pesan terformat rapi sesuai template PRD (Bahasa Indonesia & English)
  - [x] Modal Sukses Konfirmasi Booking dengan ringkasan tiket lokal
  - [x] Tombol `[Lanjutkan ke WhatsApp Admin]` yang langsung membuka aplikasi WhatsApp / WhatsApp Web dengan teks terformat

- [x] **2.6 Fitur: Filterable Case Studies & Medical Social Proof (Mock Data)**
  - [x] Galeri studi kasus pemulihan dengan tab filter kategori (`all`, `emergency`, `dermatology`, `dental`, `inpatient`, `cats`, `dogs`)
  - [x] Kartu studi kasus interaktif dengan badge diagnosa klinis
  - [x] Modal Pop-up detail kasus:
    - [x] Slider visual Before & After kondisi pemulihan pasien
    - [x] Catatan tindakan medis dokter hewan AlfaCare
    - [x] Ulasan terverifikasi dari pemilik hewan (*verified review quote*)
    - [x] Tombol aksi `[Konsultasikan Kasus Serupa]`

- [x] **2.7 Local Clinic Info & Emergency Triage Widget**
  - [x] Kartu panduan triase darurat (pertolongan pertama sebelum tiba di klinik)
  - [x] Informasi lokasi klinik di Jakarta Selatan (fasilitas parkir, rute, jam operasional)

- [x] **2.8 Review & Verifikasi Visual di Browser Lokal**
  - [x] Uji coba seluruh alur pengguna di localhost (Booking flow, Estimator, Filter Case Study, Language Switcher)
  - [x] Uji responsivitas tampilan di viewport Mobile (375px), Tablet (768px), dan Desktop (1280px+)

- [x] **2.9 Refinement & Visual Elevation (design-taste-frontend Anti-Slop Guidelines)**
  - [x] Eliminasi seluruh em-dashes (`—`) dan raw emojis sesuai kebijakan anti-slop, digantikan komponen Lucide icons (`Cat`, `Dog`, `Rabbit`, `PawPrint`, `Stethoscope`, `Syringe`, `Scissors`, `Check`, dll.)
  - [x] Restrukturisasi Hero: layout asimetris 7:5, subtext $\le 20$ kata, stack teks terfokus $\le 4$ elemen, serta Trust Bar akreditasi terpisah langsung di bawah hero
  - [x] Elevasi Kalkulator Tarif: tab spesies taktil, pemilih bobot responsif, kartu ringkasan Linear-grade dengan angka tabular dan kontras tinggi
  - [x] Konsistensi Page Theme Lock: command center triase darurat terpadu tanpa pembalikan tema yang mengganggu kontinuitas visual
  - [x] Verifikasi build produksi bersih: `npm run build` sukses 100% tanpa error TypeScript/ESLint

---

### TAHAP 3: SETUP DATABASE SUPABASE & INTEGRASI BACKEND
*(Infrastruktur database PostgreSQL, Serverless API Routes, dan Notifikasi Email)*

- [x] **3.1 Setup Project & Migrasi Database Supabase**
  - [x] Panduan lengkap pembuatan project baru di dashboard Supabase ([supabase/README-SETUP.md](file:///c:/Users/ASUS/Documents/Antigravity/coba3/supabase/README-SETUP.md))
  - [x] Skrip DDL skema database PostgreSQL lengkap ([supabase/migrations/20261011_init_schema.sql](file:///c:/Users/ASUS/Documents/Antigravity/coba3/supabase/migrations/20261011_init_schema.sql)) untuk tabel `owners`, `pets`, `bookings`, `case_studies`
  - [x] Konfigurasi Row Level Security (RLS) policies untuk anon insert dan admin read/write
  - [x] Konfigurasi storage bucket publik `case-studies` untuk foto Before & After
  - [x] Utilitas koneksi Supabase Browser & Server ([src/lib/supabaseClient.ts](file:///c:/Users/ASUS/Documents/Antigravity/coba3/src/lib/supabaseClient.ts) & [src/lib/supabaseServer.ts](file:///c:/Users/ASUS/Documents/Antigravity/coba3/src/lib/supabaseServer.ts))
- [x] **3.2 Integrasi Form Booking ke Database Supabase**
  - [x] Serverless Route Handler API: [src/app/api/booking/dispatch/route.ts](file:///c:/Users/ASUS/Documents/Antigravity/coba3/src/app/api/booking/dispatch/route.ts)
  - [x] Penyimpanan otomatis data transaksi ke tabel relasional `owners`, `pets`, dan `bookings`
  - [x] Integrasi frontend di [src/components/MultiStepBooking.tsx](file:///c:/Users/ASUS/Documents/Antigravity/coba3/src/components/MultiStepBooking.tsx) dengan status loading spinner, pencegahan double-submit, dan error banner interaktif
  - [x] Arsitektur *Graceful Fallback*: Otomatis beralih ke simulasi sukses jika kunci Supabase belum diisi di `.env.local`
- [x] **3.3 Integrasi Case Studies Dinamis dari Supabase**
  - [x] Script data benih klinis awal ([supabase/seed.sql](file:///c:/Users/ASUS/Documents/Antigravity/coba3/supabase/seed.sql))
  - [x] Serverless Route Handler API: [src/app/api/cases/route.ts](file:///c:/Users/ASUS/Documents/Antigravity/coba3/src/app/api/cases/route.ts)
  - [x] Komponen [src/components/CaseStudiesSection.tsx](file:///c:/Users/ASUS/Documents/Antigravity/coba3/src/components/CaseStudiesSection.tsx) otomatis sinkron dengan data Supabase dengan fallback data lokal instan
- [x] **3.4 Integrasi Email Notifikasi Otomatis**
  - [x] Setup Resend service ([src/lib/emailNotifier.ts](file:///c:/Users/ASUS/Documents/Antigravity/coba3/src/lib/emailNotifier.ts)) untuk pengiriman email tiket konfirmasi HTML profesional ke pemilik hewan & alert lead ke tim operasional klinik
  - [x] Simulasi otomatis pengiriman email di log konsol jika `RESEND_API_KEY` belum diisi

---

### TAHAP 4: VERSION CONTROL (GITHUB) & CLOUD DEPLOYMENT (VERCEL)
*(Tahap final peluncuran dan go-live)*

- [x] **4.1 Upload Repository ke GitHub**
  - [x] Repository GitHub resmi terhubung: [https://github.com/iqbal-alpha/alfacare-animal-clinic](https://github.com/iqbal-alpha/alfacare-animal-clinic)
  - [x] Push seluruh riwayat commit branch `main` berhasil
  - [x] Verifikasi kebersihan repo (memastikan file rahasia `.env.local` 100% terabaikan dan tidak bocor ke publik)
- [ ] **4.2 Hosting & Deployment ke Vercel**
  - [ ] Import repository GitHub ke Vercel dashboard
  - [ ] Input seluruh Environment Variables di Vercel Settings (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_CLINIC_WHATSAPP`)
  - [ ] Trigger otomatis build & deployment produksi
- [ ] **4.3 Live Production Smoke Testing & Final Handover**
  - [ ] Uji coba live URL Vercel di smartphone dan desktop
  - [ ] Uji coba pengiriman booking live (memverifikasi data masuk ke Supabase live dan redirect ke WhatsApp admin)
  - [ ] Audit Core Web Vitals live di Vercel Analytics (Target LCP $\le 1.2$s, skor $\ge 90$)
