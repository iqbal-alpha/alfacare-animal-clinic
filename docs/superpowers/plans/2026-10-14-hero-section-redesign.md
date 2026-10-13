# AlfaCare Hero Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Hero Section of AlfaCare Animal Clinic to match the playful yet premium visual architecture of the attached reference design ("Dogtober" layout: inline puppy cutout in headline, peeking dog & cat over a lower shelf, floating 24h card, video tour preview, and "See Stories" social proof) while strictly maintaining existing AlfaCare medical branding, color palette (Navy, Emerald, Urgent Coral, Slate), and bilingual content (ID/EN).

**Architecture:** A modern two-tone asymmetric hero component in Next.js 15 + Tailwind CSS. The top canvas houses the main headline with an inline pill cutout, concise medical subtext, primary pill CTA and secondary arrow link, paired with peeking pets and a floating 24h badge. The lower canvas transitions into a soft clinical shelf featuring a video tour preview card, "How can we help" clinical value proposition, and an overlapping pet avatar badge linking to verified clinical case studies (`#cases`), seamlessly integrating existing accreditation badges.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React icons.

**Spec:** User reference image and prompt ("saya ingin mengubah hero section dengan style seperti gambar yang saya attach. untuk coloring dan isinya menyesuaikan yang sudah ada saja").

## Global Constraints

- **Coloring:** Stick strictly to AlfaCare's existing design system: Deep Navy (`#0A192F` / `brand-900`, `brand-950`), Emerald Trust (`emerald-600`, `emerald-700`), Slate (`slate-50` to `slate-900`), and Urgent Coral (`urgent-600`).
- **Content:** Retain AlfaCare's accredited medical copywriting, dual language support (ID & EN), and key conversion triggers (`#booking`, `#estimator`, `#cases`, hotline darurat).
- **Responsiveness:** Maintain flawless layout fluidity from mobile (375px) to tablet (768px) and desktop (1280px+).

## Review Focus

1. Mobile viewport text scaling: Ensure the headline with inline pill badge breaks cleanly without overlapping on narrow screens (375px).
2. Peeking pets image alignment: Ensure the paws correctly align with the lower shelf divider across different screen widths.
3. Bilingual synchronization: Verify all new elements (video card, "How can we help", "See Stories") have full Indonesian and English dictionary translations in `src/data/translations.ts`.
4. Smooth anchor navigation: Ensure clicks on `[Jadwalkan Kunjungan]`, `[Cek Estimasi Tarif ↗]`, and `See Stories` smoothly scroll to `#booking`, `#estimator`, and `#cases`.
5. Production build purity: Ensure zero TypeScript/ESLint warnings or missing assets during `npm run build`.

---

### Task 1: Generate & Prepare High-Resolution Visual Assets for the Hero Section

**Files:**
- Create: `public/hero/puppy-badge.png`
- Create: `public/hero/peeking-pets.png`
- Create: `public/hero/vet-video-thumb.png`
- Create: `public/hero/avatar-cat.png`
- Create: `public/hero/avatar-dog.png`

**Interfaces:**
- Produces: Web-optimized PNG/WebP assets placed in `public/hero/` directory for direct consumption by `HeroSection.tsx`.

- [ ] **Step 1: Generate peeking dog & orange cat asset matching the reference composition**
- [ ] **Step 2: Generate puppy cutout badge for the inline headline**
- [ ] **Step 3: Generate medical clinic video tour thumbnail and pet avatar roundels**
- [ ] **Step 4: Verify asset presence in `public/hero/`**

---

### Task 2: Extend Dictionary in `src/data/translations.ts` for New Hero Elements

**Files:**
- Modify: `src/data/translations.ts`

**Interfaces:**
- Produces: Additional keys in `DICTIONARY[locale].hero`:
  - `hero.seeStories`: 'Lihat Kisah Sembuh' / 'See Stories'
  - `hero.howCanWeHelp`: 'Bagaimana Kami Membantu' / 'How can we help'
  - `hero.howCanWeHelpDesc`: 'Penanganan medis siaga & rawat inap nyaman saat Anda bekerja atau bepergian.' / 'While you are at work or on vacation, our 24/7 clinical care keeps your pets safe.'
  - `hero.videoTour`: 'Tur Fasilitas AlfaCare' / 'AlfaCare Facility Tour'
  - `hero.callSupport24h`: '24 Jam Siaga' / '24h Call Support'

- [ ] **Step 1: Add new hero keys to Indonesian dictionary (`src/data/translations.ts`)**
- [ ] **Step 2: Add matching hero keys to English dictionary (`src/data/translations.ts`)**
- [ ] **Step 3: Verify TypeScript compilation of dictionary types**

---

### Task 3: Implement Redesigned Hero Section Component

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Interfaces:**
- Consumes: `Locale` from `@/types`, `DICTIONARY` from `@/data/translations`.
- Produces: `export const HeroSection: React.FC<{ currentLocale: Locale }>`

- [ ] **Step 1: Build the upper hero layout with the signature typographic headline and inline pill cutout badge**
- [ ] **Step 2: Implement concise subheadline and dual CTA buttons (`Book A Meet` / `Schedule a Call ↗`)**
- [ ] **Step 3: Implement right-side peeking pets with paws resting on the lower shelf and floating dark 24h card**
- [ ] **Step 4: Implement lower shelf band with video preview card, "How can we help" text block, and overlapping "See Stories" avatar roundels**
- [ ] **Step 5: Integrate existing accreditation badges (SIPDH, ISO, Lab, ICU) and emergency alert bar seamlessly into the redesigned hero**
- [ ] **Step 6: Ensure mobile, tablet, and desktop responsive breakpoint fidelity**

---

### Task 4: Verification, Cross-Browser Testing & Build Validation

**Files:**
- Run: `npm.cmd run build`
- Validate: `http://localhost:3000` via browser subagent or puppeteer screenshot

- [ ] **Step 1: Execute `npm.cmd run build` and ensure exit code 0**
- [ ] **Step 2: Capture screenshot of the new hero on Desktop (1280px) and Mobile (375px)**
- [ ] **Step 3: Review visual fidelity against the reference image**
- [ ] **Step 4: Commit changes with descriptive commit message**
