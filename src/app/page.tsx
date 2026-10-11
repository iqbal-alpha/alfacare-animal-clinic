'use client';

import React, { useState, useEffect } from 'react';
import { Locale, Species, WeightClass } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PricingEstimator } from '@/components/PricingEstimator';
import { MultiStepBooking } from '@/components/MultiStepBooking';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { EmergencyTriageGuide } from '@/components/EmergencyTriageGuide';
import { ClinicLocationSection } from '@/components/ClinicLocationSection';
import { FloatingEmergencyBar } from '@/components/FloatingEmergencyBar';
import { Footer } from '@/components/Footer';
import { CLINIC_SERVICES } from '@/data/mockData';
import { DICTIONARY } from '@/data/translations';
import { Sparkles, Stethoscope, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('id');
  const [prefilledBooking, setPrefilledBooking] = useState<{
    species?: Species;
    weightClass?: WeightClass;
    serviceCode?: string;
    serviceName?: string;
    estimatedCost?: number;
  } | null>(null);

  // Load saved locale from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('alfacare_locale') as Locale | null;
    if (saved && (saved === 'id' || saved === 'en')) {
      setCurrentLocale(saved);
    }
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem('alfacare_locale', locale);
  };

  const handleEstimateSelected = (params: {
    species: Species;
    weightClass: WeightClass;
    serviceCode: string;
    serviceName: string;
    estimatedCost: number;
  }) => {
    setPrefilledBooking(params);
  };

  const isId = currentLocale === 'id';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar currentLocale={currentLocale} onLocaleChange={handleLocaleChange} />

      {/* 2. High-Converting Hero Section */}
      <HeroSection currentLocale={currentLocale} />

      {/* 3. Core Clinical Services Showcase Bar */}
      <section id="services" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isId ? 'Standar Medis Terakreditasi' : 'Accredited Medical Standards'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-brand-900 tracking-tight">
              {isId ? 'Layanan Unggulan AlfaCare Animal Clinic' : 'Core Clinical Services at AlfaCare'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              {isId
                ? 'Didukung peralatan modern, ruang bedah steril standar rumah sakit manusia, dan dokter berpengalaman.'
                : 'Backed by modern technology, ISO human-grade sterile surgical theaters, and experienced veterinary surgeons.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: '🩺',
                titleId: 'Pemeriksaan Umum & Penyakit Dalam',
                titleEn: 'Internal Medicine & Wellness',
                descId: 'Pemeriksaan fisik menyeluruh, manajemen penyakit kronis ginjal/hati, dan penanganan demam/infeksi.',
                descEn: 'Thorough physical diagnosis, chronic disease management, and infectious fever therapeutics.',
              },
              {
                icon: '💉',
                titleId: 'Vaksinasi Lengkap & Imunisasi',
                titleEn: 'Comprehensive Vaccination',
                descId: 'Vaksin F3/F4 Kucing, DHPPiL Anjing, dan Rabies resmi dengan buku rekam medis digital.',
                descEn: 'F3/F4 Feline, DHPPiL Canine, and certified Rabies immunizations with digital logs.',
              },
              {
                icon: '✂️',
                titleId: 'Bedah Sterilisasi & Jaringan Lunak',
                titleEn: 'Spay/Neuter & Soft Tissue Surgery',
                descId: 'Kastrasi, ovariohisterektomi, pengangkatan tumor/batu kandung kemih dengan anestesi inhalasi.',
                descEn: 'Neuter, spay, cystotomy, and mass removals under monitored gas isoflurane anesthesia.',
              },
              {
                icon: '🦷',
                titleId: 'Dental Ultrasonic Scaling & Polishing',
                titleEn: 'Ultrasonic Dental Scaling',
                descId: 'Pembersihan karang gigi mendalam, pengobatan radang gusi, dan ekstraksi gigi goyang.',
                descEn: 'Deep subgingival plaque removal, gingivitis therapy, and diseased tooth extractions.',
              },
              {
                icon: '🏥',
                titleId: 'Rawat Inap Isolasi & ICU Oksigen',
                titleEn: 'Inpatient Ward & Oxygen ICU',
                descId: 'Ruang rawat steril dengan ruang isolasi berfilter terpisah khusus penyakit menular virus.',
                descEn: 'Negative-pressure isolation chambers for viral recovery and continuous oxygen incubators.',
              },
              {
                icon: '🔬',
                titleId: 'Laboratorium & USG Doppler On-Site',
                titleEn: 'On-Site Diagnostics & Ultrasound',
                descId: 'Hasil tes darah CBC 20 menit, profil kimia darah, rontgen digital, dan USG abdomen organ dalam.',
                descEn: 'Rapid 20-minute CBC hematology, chemistry panels, digital X-Ray, and color Doppler scans.',
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 hover:bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-emerald-50 border border-slate-200 text-2xl flex items-center justify-center mb-3 shadow-sm transition">
                  {srv.icon}
                </div>
                <h3 className="font-heading font-bold text-base text-brand-900 group-hover:text-emerald-700 transition">
                  {isId ? srv.titleId : srv.titleEn}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {isId ? srv.descId : srv.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Pricing Estimator */}
      <PricingEstimator
        currentLocale={currentLocale}
        onEstimateSelected={handleEstimateSelected}
      />

      {/* 5. Interactive Multi-Step Booking Funnel */}
      <MultiStepBooking
        currentLocale={currentLocale}
        prefilledData={prefilledBooking}
      />

      {/* 6. Medical Case Studies & Recovery Showcase */}
      <CaseStudiesSection currentLocale={currentLocale} />

      {/* 7. Emergency Triage Protocol Guide */}
      <EmergencyTriageGuide currentLocale={currentLocale} />

      {/* 8. Clinic Location, Facilities & Map */}
      <ClinicLocationSection currentLocale={currentLocale} />

      {/* 9. Persistent Mobile Bottom Emergency Bar */}
      <FloatingEmergencyBar currentLocale={currentLocale} />

      {/* 10. Footer */}
      <Footer currentLocale={currentLocale} />
    </div>
  );
}
