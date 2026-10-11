-- ==============================================================================
-- ALFACARE ANIMAL CLINIC JAKARTA - DATABASE SCHEMA
-- Migration: 20261011_init_schema.sql
-- Engine: PostgreSQL 15+ (Supabase)
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Custom Enum Types
DO $$ BEGIN
  CREATE TYPE species_type AS ENUM ('CAT', 'DOG', 'RABBIT', 'BIRD_EXOTIC');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE weight_class_type AS ENUM (
    'FELINE_STANDARD',
    'CANINE_TOY_MINI',
    'CANINE_MEDIUM',
    'CANINE_LARGE',
    'CANINE_EXTRA_LARGE'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE urgency_type AS ENUM ('ROUTINE', 'URGENT', 'EMERGENCY');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status_type AS ENUM (
    'PENDING_WHATSAPP',
    'CONFIRMED_BY_ADMIN',
    'IN_TREATMENT',
    'COMPLETED',
    'CANCELLED'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 3. Table: Owners (Kontak Pemilik Pasien)
CREATE TABLE IF NOT EXISTS public.owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  whatsapp_number VARCHAR(30) NOT NULL,
  email VARCHAR(150) NOT NULL,
  preferred_locale VARCHAR(10) DEFAULT 'id',
  data_consent_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: Pets (Profil Pasien Hewan Peliharaan)
CREATE TABLE IF NOT EXISTS public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.owners(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  species species_type NOT NULL,
  breed VARCHAR(100),
  age_years VARCHAR(50),
  weight_class weight_class_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table: Bookings (Reservasi Jadwal & Kunjungan)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code VARCHAR(40) UNIQUE NOT NULL,
  pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.owners(id) ON DELETE CASCADE,
  service_category VARCHAR(150) NOT NULL,
  service_code VARCHAR(50),
  urgency_level urgency_type NOT NULL DEFAULT 'ROUTINE',
  appointment_date DATE NOT NULL,
  time_slot VARCHAR(100) NOT NULL,
  preferred_doctor VARCHAR(150),
  symptoms_notes TEXT,
  estimated_cost_idr NUMERIC(14,2),
  status booking_status_type DEFAULT 'PENDING_WHATSAPP',
  source_channel VARCHAR(50) DEFAULT 'WEB_FUNNEL',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table: Case Studies (Studi Kasus & Portofolio Medis Klinis)
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(150) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL, -- emergency, dermatology, dental, inpatient
  species species_type NOT NULL,
  pet_name VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  age VARCHAR(50),
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  veterinarian_name VARCHAR(150) NOT NULL,
  veterinarian_title VARCHAR(150),
  recovery_duration_id VARCHAR(100) NOT NULL,
  recovery_duration_en VARCHAR(100) NOT NULL,
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  clinical_summary_id TEXT NOT NULL,
  clinical_summary_en TEXT NOT NULL,
  owner_name VARCHAR(150) NOT NULL,
  review_quote_id TEXT NOT NULL,
  review_quote_en TEXT NOT NULL,
  rating SMALLINT DEFAULT 5,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. High-Performance Indexes
CREATE INDEX IF NOT EXISTS idx_owners_whatsapp ON public.owners(whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_owners_email ON public.owners(email);
CREATE INDEX IF NOT EXISTS idx_pets_owner_id ON public.pets(owner_id);
CREATE INDEX IF NOT EXISTS idx_bookings_code ON public.bookings(booking_code);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON public.case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON public.case_studies(is_published);

-- 8. Row Level Security (RLS) Configuration
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- 8.A Policies: Anon User / Public Front-end Access
-- Public lead funnel is allowed to insert new bookings, owners, and pets
CREATE POLICY "Public anon can insert owners" ON public.owners
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public anon can insert pets" ON public.pets
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Public anon can insert bookings" ON public.bookings
  FOR INSERT TO anon WITH CHECK (true);

-- Public can read published case studies for social proof
CREATE POLICY "Public can view published case studies" ON public.case_studies
  FOR SELECT TO anon USING (is_published = TRUE);

-- 8.B Policies: Service Role Full Access (Backend API Routes & Admin)
CREATE POLICY "Service role full access on owners" ON public.owners
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on pets" ON public.pets
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on bookings" ON public.bookings
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on case_studies" ON public.case_studies
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 9. Storage Bucket Initialization for Case Studies (Public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'case-studies',
  'case-studies',
  true,
  5242880, -- 5 MB max per file
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view images in 'case-studies' bucket
CREATE POLICY "Public can view case study images" ON storage.objects
  FOR SELECT TO anon USING (bucket_id = 'case-studies');

CREATE POLICY "Service role can upload case study images" ON storage.objects
  FOR ALL TO service_role USING (bucket_id = 'case-studies') WITH CHECK (bucket_id = 'case-studies');
