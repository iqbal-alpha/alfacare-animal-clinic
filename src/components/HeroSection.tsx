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
  HeartPulse,
} from 'lucide-react';

interface HeroSectionProps {
  currentLocale: Locale;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].hero;
  const isId = currentLocale === 'id';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/80 pt-6 pb-10 sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-slate-200/60">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 sm:h-80 bg-gradient-to-r from-emerald-100/35 via-teal-100/25 to-brand-100/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Focused Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 border border-brand-200/80 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-xs text-[11px] sm:text-xs font-bold text-brand-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="sm:hidden">{t.badgeShort}</span>
              <span className="hidden sm:inline">{t.badge}</span>
            </div>

            {/* Main Headline (Max 2 lines on desktop, compact & punchy on mobile) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-brand-900 tracking-tight leading-[1.2]">
              <span className="block text-emerald-700 text-xs sm:text-base lg:text-lg font-bold tracking-wide uppercase mb-1">
                {t.titleHighlight}
              </span>
              <span>{t.titleMain}</span>
            </h1>

            {/* Subtitle (Concise <= 20 words for instant pet owner comprehension) */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {t.subtitle}
            </p>

            {/* Dual CTAs (Side-by-side on mobile, single line on desktop) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2 justify-center lg:justify-start">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-heading font-bold text-xs sm:text-sm lg:text-base px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md shadow-emerald-600/20 transition-all whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 shrink-0" />
                <span>{t.ctaBooking}</span>
              </a>

              <a
                href="#estimator"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-slate-50 active:scale-[0.98] text-brand-900 border border-slate-200 hover:border-brand-300 font-heading font-bold text-xs sm:text-sm lg:text-base px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-xs transition-all whitespace-nowrap"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-700 shrink-0" />
                <span>{t.ctaEstimator}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Clinical Authority (5 Cols) */}
          <div className="lg:col-span-5 relative mt-2 sm:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Clinical Photography */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white/80 shadow-xl sm:shadow-2xl shadow-brand-950/10 aspect-[16/10] sm:aspect-[4/3] lg:aspect-square bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1000&q=80"
                  alt="Veterinarian examining cat with care at AlfaCare Animal Clinic"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/15 to-transparent" />

                {/* Floating Verified Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-[11px] sm:text-xs">
                    4.9
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                      {isId ? '12.000+ Pasien' : '12,000+ Patients'}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block">
                      {isId ? 'Ulasan Terverifikasi' : 'Verified Reviews'}
                    </p>
                  </div>
                </div>

                {/* Floating Hospital Location Tag */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/70 shadow-lg text-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">Senopati, Jaksel</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                        {isId ? 'Buka 08:00 - 22:00 (IGD 24 Jam)' : 'Open 08:00 - 22:00 (24/7 ER)'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md shrink-0 ml-2">
                    {isId ? 'Buka' : 'Open'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Accreditation & Trust Strip */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate leading-tight">
                  {t.trustBadges.sipdh}
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                  {t.trustBadges.sipdhDesc}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate leading-tight">
                  {t.trustBadges.sterile}
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                  {t.trustBadges.sterileDesc}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate leading-tight">
                  {t.trustBadges.lab}
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                  {t.trustBadges.labDesc}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate leading-tight">
                  {t.trustBadges.icu}
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                  {t.trustBadges.icuDesc}
                </span>
              </div>
            </div>
          </div>

          {/* Integrated Emergency Alert Bar */}
          <div className="mt-3 sm:mt-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-urgent-50/90 via-rose-50/50 to-urgent-50/80 border border-urgent-200/80 flex items-center justify-between gap-2.5 text-left">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-urgent-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-urgent-950 truncate">{t.emergencyBanner.tag}</h4>
                <p className="text-[10px] sm:text-[11px] text-urgent-800 truncate hidden sm:block">{t.emergencyBanner.desc}</p>
                <p className="text-[10px] text-urgent-800 sm:hidden">
                  {isId ? 'Dokter IGD standby 24 jam' : '24/7 ER vet on standby'}
                </p>
              </div>
            </div>
            <a
              href="tel:+622155550199"
              className="inline-flex items-center justify-center gap-1 bg-urgent-600 hover:bg-urgent-700 active:scale-[0.98] text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-xs transition shrink-0 whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{isId ? 'Hubungi IGD' : 'Call 24/7 ER'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

