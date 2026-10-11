# AlfaCare Animal Clinic Jakarta 🐾

> Modern, full-stack veterinary hospital web application & emergency booking engine built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL)**.

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_15-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

---

## 🌟 Overview

**AlfaCare Animal Clinic** is a production-grade veterinary clinical platform engineered to bridge medical precision with high-conversion client communication. Designed specifically for the veterinary ecosystem in South Jakarta, it features transparent pricing estimation, multi-step triage reservations, live database persistence, and automated WhatsApp triage routing.

---

## ✨ Core Features

### 1. 🧮 Interactive Service & Pricing Estimator
- Dynamic weight-tiered and species-specific pricing algorithm (Cat, Dog, Exotic).
- Real-time Jakarta veterinary benchmark rates covering general consultation, vaccinations (F3/F4/DHPPiL), sterilization, dental scaling, ICU/inpatient wards, and on-site lab diagnostics.
- Out-of-hours emergency surcharge calculation with cost-breakdown accordion and clear medical disclaimer.
- Direct bridge action to auto-fill estimate data into the booking funnel.

### 2. 📋 4-Step Clinical Booking Funnel
- **Step 1 — Pet Patient Profile:** Name, species, breed, age, and weight classification.
- **Step 2 — Medical Service & Urgency:** Service catalog selector with clinical urgency rating (Routine, Urgent, Emergency).
- **Step 3 — Schedule & Doctor Preference:** Dynamic date picker, time slots, and vet selection.
- **Step 4 — Owner Contact & PDP Consent:** WhatsApp number, email, symptoms notes, and data privacy consent.
- Automated client-side validation and responsive progress tracking.

### 3. 🗄️ Relational PostgreSQL Database (Supabase)
- Fully relational database schema: `owners`, `pets`, `bookings`, and `case_studies`.
- Custom PostgreSQL ENUM types for medical species, weight categories, and triage urgency levels.
- Strict **Row-Level Security (RLS)** policies protecting client records while permitting authenticated frontend lead capture.
- High-performance indexing for rapid lookups and zero latency.

### 4. 🔬 Verified Clinical Case Studies (Social Proof)
- Filterable medical recovery gallery (`Emergency`, `Dermatology`, `Dental`, `Inpatient`).
- Interactive modal with Before & After clinical recovery photo comparison, attending veterinarian notes, and verified owner testimonials.
- Synchronized dynamically with Supabase with instant local fallback.

### 5. 🚨 24/7 Emergency Triage & WhatsApp Dispatcher
- Mobile-optimized sticky emergency bar with 1-tap IGD call & reservation.
- Step-by-step first-aid triage guidance for critical pet conditions (trauma, heatstroke, poisoning, bloat).
- Formatted bilingual WhatsApp dispatcher with unique appointment ticket codes (`ALFA-YYYYMMDD-XXX`).

### 6. 🌐 Bilingual Medical Experience (ID / EN)
- Instant toggle between Bahasa Indonesia and English across all UI components, pricing catalogs, and triage guides.

---

## 🏗️ Tech Stack & Architecture

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Frontend Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with clinical brand tokens (Deep Navy, Emerald Trust, Urgent Coral)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & Storage:** [Supabase](https://supabase.com/) (PostgreSQL 15+, Row Level Security)
- **Email Dispatch:** [Resend](https://resend.com/) (HTML transactional booking vouchers)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```text
alfacare-animal-clinic/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── booking/dispatch/route.ts  # Booking lead ingestion API
│   │   │   └── cases/route.ts             # Dynamic case studies API
│   │   ├── globals.css                    # Design system tokens & typography
│   │   ├── icon.svg                       # Vector medical brand favicon
│   │   ├── layout.tsx                     # Metadata, SEO tags & Schema.org JSON-LD
│   │   └── page.tsx                       # Main landing experience
│   ├── components/
│   │   ├── Navbar.tsx                     # Sticky clinical header & emergency hotline
│   │   ├── HeroSection.tsx                # Hero banner & medical accreditations
│   │   ├── PricingEstimator.tsx           # Interactive tariff estimator
│   │   ├── MultiStepBooking.tsx           # 4-Step booking funnel
│   │   ├── BookingSuccessModal.tsx        # Ticket summary & WhatsApp launcher
│   │   ├── CaseStudiesSection.tsx         # Clinical recovery gallery
│   │   ├── CaseStudyDetailModal.tsx       # Before/After photo comparison modal
│   │   ├── EmergencyTriageGuide.tsx       # 24/7 first-aid triage protocols
│   │   ├── ClinicLocationSection.tsx      # Jakarta clinic facility & maps
│   │   ├── FloatingEmergencyBar.tsx       # Mobile 1-tap quick action bar
│   │   └── Footer.tsx                     # Operational hours & contact info
│   ├── data/
│   │   ├── mockData.ts                    # Medical services catalog & fallback data
│   │   └── translations.ts                # Bilingual dictionary (ID / EN)
│   ├── lib/
│   │   ├── supabaseClient.ts              # Browser Supabase client utility
│   │   ├── supabaseServer.ts              # Server-side Supabase client utility
│   │   └── emailNotifier.ts               # Transactional email service
│   └── types/
│       └── index.ts                       # TypeScript domain models
├── supabase/
│   ├── migrations/
│   │   └── 20261011_init_schema.sql       # PostgreSQL DDL & RLS policies
│   ├── seed.sql                           # Initial clinical case studies data
│   └── README-SETUP.md                    # Database migration guide
├── .env.example                           # Environment configuration template
└── tailwind.config.ts                     # Extended color palettes & typography
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm / yarn / pnpm

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/iqbal-alpha/alfacare-animal-clinic.git
cd alfacare-animal-clinic
npm install
```

### 2. Environment Variables Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_CLINIC_WHATSAPP=628123456789
NEXT_PUBLIC_CLINIC_PHONE=+622123456789
NEXT_PUBLIC_CLINIC_EMAIL=care@alfacare.co.id
```

### 3. Run Database Migrations (Supabase)
1. Open your Supabase project dashboard $\rightarrow$ **SQL Editor**.
2. Run the DDL script in `supabase/migrations/20261011_init_schema.sql`.
3. (Optional) Run `supabase/seed.sql` to populate sample clinical recovery case studies.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
