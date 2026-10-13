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
import {
  Sparkles,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  Syringe,
  Scissors,
  Microscope,
  HeartPulse,
} from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] selection:bg-emerald-500 selection:text-white pb-20 md:pb-0">
      {/* 1. Header & Navigation */}
      <Navbar currentLocale={currentLocale} onLocaleChange={handleLocaleChange} />

      {/* 2. High-Converting Hero Section */}
      <HeroSection currentLocale={currentLocale} />

      {/* 3. Core Clinical Services Showcase */}
      <section id="services" className="py-12 sm:py-16 lg:py-24 bg-[#FDFBF7] border-b border-[#E8EEF3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 bg-[#D8E1EA]/80 border border-[#CCD8E2] text-[#1E3A5F] text-xs font-bold px-3 py-1.5 rounded-full mb-3 shadow-2xs">
              <Stethoscope className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span>{isId ? 'Standar Medis Terakreditasi' : 'Accredited Medical Standards'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-[#111827] tracking-tight">
              {isId ? 'Layanan Klinis Unggulan AlfaCare' : 'Core Clinical Services at AlfaCare'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
              {isId
                ? 'Didukung peralatan modern, ruang bedah steril standar rumah sakit manusia, dan tim dokter berizin resmi.'
                : 'Backed by modern medical equipment, ISO human-grade sterile surgical theaters, and licensed veterinary surgeons.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Stethoscope,
                titleId: 'Pemeriksaan Umum & Penyakit Dalam',
                titleEn: 'Internal Medicine & Wellness',
                descId: 'Pemeriksaan fisik menyeluruh, manajemen penyakit kronis ginjal/hati, dan penanganan demam/infeksi.',
                descEn: 'Thorough physical diagnosis, chronic disease management, and infectious fever therapeutics.',
                featured: false,
              },
              {
                icon: Syringe,
                titleId: 'Vaksinasi Lengkap & Imunisasi',
                titleEn: 'Comprehensive Vaccination',
                descId: 'Vaksin F3/F4 Kucing, DHPPiL Anjing, dan Rabies resmi dengan sertifikat rekam medis digital.',
                descEn: 'F3/F4 Feline, DHPPiL Canine, and certified Rabies immunizations with digital logs.',
                featured: false,
              },
              {
                icon: Scissors,
                titleId: 'Bedah Sterilisasi & Jaringan Lunak',
                titleEn: 'Spay/Neuter & Soft Tissue Surgery',
                descId: 'Kastrasi, ovariohisterektomi, pengangkatan tumor/batu kandung kemih dengan anestesi inhalasi isoflurane aman.',
                descEn: 'Neuter, spay, cystotomy, and mass removals under monitored gas isoflurane anesthesia.',
                featured: true,
                badgeId: 'Ruang Bedah ISO',
                badgeEn: 'ISO Sterile Theater',
              },
              {
                icon: Sparkles,
                titleId: 'Dental Ultrasonic Scaling & Polishing',
                titleEn: 'Ultrasonic Dental Scaling',
                descId: 'Pembersihan karang gigi subgingival mendalam, pengobatan radang gusi (gingivitis), dan ekstraksi gigi berlubang.',
                descEn: 'Deep subgingival plaque removal, gingivitis therapy, and diseased tooth extractions.',
                featured: false,
              },
              {
                icon: HeartPulse,
                titleId: 'Rawat Inap Isolasi & ICU Oksigen 24 Jam',
                titleEn: 'Inpatient Ward & 24/7 Oxygen ICU',
                descId: 'Ruang rawat steril dengan ruang isolasi berfilter terpisah khusus penyakit virus dan inkubator oksigen kontinyu.',
                descEn: 'Negative-pressure isolation chambers for viral recovery and continuous oxygen incubators.',
                featured: true,
                badgeId: 'Siaga 24 Jam',
                badgeEn: '24/7 Standby',
              },
              {
                icon: Microscope,
                titleId: 'Laboratorium & USG Doppler On-Site',
                titleEn: 'On-Site Diagnostics & Ultrasound',
                descId: 'Hasil tes darah CBC lengkap 20 menit, tes biokimia darah, rontgen digital, dan USG abdomen organ dalam.',
                descEn: 'Rapid 20-minute CBC hematology, chemistry panels, digital X-Ray, and color Doppler scans.',
                featured: false,
              },
            ].map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between group ${
                    srv.featured
                      ? 'bg-gradient-to-b from-white to-[#FDF4EE] border-[#F0D5C7] shadow-xs hover:shadow-lg hover:border-[#E8BFA8]'
                      : 'bg-white hover:bg-[#FDFBF7] border-[#E2EAF1] shadow-xs hover:shadow-md hover:border-[#CCD8E2]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#D8E1EA]/50 border border-[#CCD8E2] text-[#111827] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      {srv.featured && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F9E1D4] text-[#8C3A15] px-2.5 py-1 rounded-full border border-[#EED4C6]">
                          {isId ? srv.badgeId : srv.badgeEn}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#111827] group-hover:text-emerald-700 transition">
                      {isId ? srv.titleId : srv.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {isId ? srv.descId : srv.descEn}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#EEF2F6] flex items-center justify-between">
                    <a
                      href="#booking"
                      className="text-xs font-bold text-[#111827] hover:text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>{isId ? 'Konsultasi Layanan' : 'Consult Service'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
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
