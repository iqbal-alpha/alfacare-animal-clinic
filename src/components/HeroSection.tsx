'use client';

import React from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import {
  ShieldCheck,
  Stethoscope,
  Sparkles,
  AlertCircle,
  PhoneCall,
  Calendar,
  Calculator,
  CheckCircle2,
  MapPin,
  Clock,
  HeartPulse,
} from 'lucide-react';

interface HeroSectionProps {
  currentLocale: Locale;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].hero;
  const isId = currentLocale === 'id';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-white to-slate-50 pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-slate-200/60">
      {/* Subtle Ambient Radial Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-r from-emerald-100/40 via-brand-100/30 to-teal-100/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Focused Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 bg-white/95 border border-brand-200/80 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold text-brand-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.badge}</span>
            </div>

            {/* Main Headline (Max 2 lines on desktop) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-brand-900 tracking-tight leading-[1.15]">
              <span className="block text-emerald-700 text-xl sm:text-2xl font-bold mb-1">
                {t.titleHighlight}
              </span>
              {t.titleMain}
            </h1>

            {/* Subtitle (Concise <= 20 words for rapid pet parent comprehension) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {isId
                ? 'Pusat medis hewan terakreditasi di Jakarta Selatan dengan bedah steril, laboratorium darah in-house, dan rawat inap intensif terpadu.'
                : 'Accredited veterinary medical center in South Jakarta equipped with sterile surgical theaters, in-house hematology lab, and intensive care.'}
            </p>

            {/* Dual Primary & Secondary CTAs (One line desktop, tactile hover) */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 justify-center lg:justify-start">
              <a
                href="#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all transform active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-emerald-200" />
                <span>{t.ctaBooking}</span>
              </a>

              <a
                href="#estimator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-brand-900 border-2 border-slate-200 hover:border-brand-300 font-heading font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                <Calculator className="w-4 h-4 text-brand-700" />
                <span>{t.ctaEstimator}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Clinical Authority (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Clinical Photography */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-white/80 shadow-2xl shadow-brand-950/15 aspect-[4/3] sm:aspect-[1/1] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1000&q=80"
                  alt="Veterinarian examining dog with stethoscope at AlfaCare Animal Clinic"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/20 to-transparent" />

                {/* Floating Hospital Location Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Senopati, Jakarta Selatan</p>
                      <p className="text-[11px] text-slate-500 font-medium">Buka Hari Ini: 08:00 - 22:00 WIB</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                    Buka
                  </span>
                </div>
              </div>

              {/* Floating Verified Rating Badge */}
              <div className="absolute -top-3.5 -right-3.5 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xs">
                  4.9
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">12.000+ Pasien</p>
                  <p className="text-[10px] text-slate-500 font-medium">Ulasan Positif Terverifikasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Accreditation & Trust Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">{t.trustBadges.sipdh}</span>
                <span className="text-[10px] text-slate-500">Perhimpunan Dokter Hewan Indonesia</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">{t.trustBadges.sterile}</span>
                <span className="text-[10px] text-slate-500">Standar Ruang Operasi Steril ISO</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">{t.trustBadges.lab}</span>
                <span className="text-[10px] text-slate-500">Hasil Darah & Kimia 20 Menit</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">{t.trustBadges.icu}</span>
                <span className="text-[10px] text-slate-500">Inkubator Pemulihan Pasien Kritis</span>
              </div>
            </div>
          </div>

          {/* Integrated Emergency Alert Bar */}
          <div className="mt-4 p-3.5 rounded-2xl bg-urgent-50 border border-urgent-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-urgent-600 text-white flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-urgent-950">{t.emergencyBanner.tag}</h4>
                <p className="text-[11px] text-urgent-800">{t.emergencyBanner.desc}</p>
              </div>
            </div>
            <a
              href="tel:+622155550199"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-urgent-600 hover:bg-urgent-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.emergencyBanner.callNow}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
