# PANDUAN INTEGRASI SUPABASE - ALFACARE ANIMAL CLINIC JAKARTA

Dokumen ini memandu langkah demi langkah untuk menyambungkan aplikasi AlfaCare ke database PostgreSQL di Supabase dan menjalankan migrasi skema tabel.

---

## 1. Buat Project Baru di Supabase
1. Kunjungi [https://supabase.com](https://supabase.com) dan login ke akun Supabase Anda.
2. Klik tombol **"New Project"**.
3. Isi data project:
   - **Name**: `alfacare-animal-clinic`
   - **Database Password**: *(Buat password aman & simpan di tempat aman)*
   - **Region**: Pilih **Singapore (`ap-southeast-1`)** *(paling dekat dan latensi terendah untuk pengguna di Jakarta/Indonesia)*
   - **Pricing Plan**: **Free**
4. Klik **"Create new project"** dan tunggu 1-2 menit hingga status database menjadi *Active*.

---

## 2. Salin Kredensial API ke File `.env.local`
1. Di dashboard Supabase, masuk ke menu:  
   **Project Settings** (ikon gerigi di sidebar kiri bawah) $\rightarrow$ **API**.
2. Salin nilai-nilai berikut:
   - **Project URL** $\rightarrow$ masukkan ke `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys (`anon` / `public`)** $\rightarrow$ masukkan ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Project API keys (`service_role` / `secret`)** $\rightarrow$ masukkan ke `SUPABASE_SERVICE_ROLE_KEY`
3. Buka file `.env.local` di root proyek Anda, lalu tempel:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 3. Jalankan Migrasi Skema Database (DDL)
1. Di dashboard Supabase, buka menu **SQL Editor** (ikon terminal `>_` di sidebar kiri).
2. Klik tombol **"New query"**.
3. Buka file lokal di project Anda:  
   `supabase/migrations/20261011_init_schema.sql`
4. Salin seluruh isi file tersebut dan tempel ke SQL Editor Supabase.
5. Klik tombol **"Run"** (atau tekan `Ctrl + Enter`).
6. Pastikan muncul pesan sukses:  
   `Success. No rows returned.`

> **Yang dibuat oleh skema ini:**
> - Enum Types: `species_type`, `weight_class_type`, `urgency_type`, `booking_status_type`
> - Tabel: `owners`, `pets`, `bookings`, `case_studies`
> - Indexes berkecepatan tinggi untuk pencarian WhatsApp, email, dan booking code
> - Aturan Row Level Security (RLS) aman: Anonim publik diizinkan mengirim booking baru dan membaca studi kasus terbitan, data riwayat dilindungi

---

## 4. Eksekusi Data Awal (Seed Data Studi Kasus)
1. Tetap di menu **SQL Editor** Supabase.
2. Buat tab query baru (**"New query"**).
3. Buka file lokal di project Anda:  
   `supabase/seed.sql`
4. Salin seluruh isi file tersebut dan tempel ke SQL Editor Supabase.
5. Klik tombol **"Run"**.
6. Pastikan muncul pesan sukses:  
   `Success. 4 rows inserted.`

---

## 5. Verifikasi Data di Supabase Dashboard
1. Buka menu **Table Editor** (ikon tabel di sidebar kiri).
2. Periksa tabel `case_studies`: Anda akan melihat 4 baris data studi kasus klinis (Milo, Bruno, Luna, Cleo).
3. Jalankan aplikasi web lokal Anda (`npm run dev`), isi formulir booking di localhost:3000, lalu submit.
4. Kembali ke Supabase Table Editor:
   - Tabel `owners`: Data pemilik hewan otomatis bertambah.
   - Tabel `pets`: Data anabul otomatis bertambah dan terhubung ke owner.
   - Tabel `bookings`: Tiket reservasi dengan kode unik `ALFA-...` tersimpan rapi!

---

## Catatan: Mode Offline & Graceful Fallback
Aplikasi AlfaCare telah dilengkapi arsitektur **Graceful Fallback**:
- Jika kunci API Supabase belum diisi di `.env.local`, aplikasi **TIDAK AKAN ERROR**.
- Web tetap berjalan 100% normal dengan mode simulasi cerdas di lokal sehingga Anda tetap dapat mendemokan seluruh alur kepada tim atau klien tanpa hambatan.
