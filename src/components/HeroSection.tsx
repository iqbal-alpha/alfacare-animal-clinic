'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import {
  ShieldCheck,
  Stethoscope,
  Sparkles,
  AlertCircle,
  PhoneCall,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  HeartPulse,
  Play,
  X,
} from 'lucide-react';

interface HeroSectionProps {
  currentLocale: Locale;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].hero;
  const isId = currentLocale === 'id';
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-slate-200/80">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-emerald-100/20 via-brand-100/15 to-emerald-50/25 blur-3xl pointer-events-none -z-0" />

      {/* TOP CANVAS: MAIN HERO HEADLINE & PEEKING PETS */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-end">
          
          {/* Left Column: Signature Typography & Direct CTAs (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left pb-6 lg:pb-8">
            {/* Accreditation Badge Pill */}
            <div className="inline-flex items-center gap-2 bg-white border border-brand-200/80 px-3.5 py-1.5 rounded-full shadow-xs text-xs font-bold text-brand-950">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{isId ? t.badgeShort : t.badge}</span>
            </div>

            {/* Signature Bold Headline with Inline Puppy Cutout Pill */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-heading font-black text-brand-950 tracking-tight leading-[1.14]">
              <span className="block">{t.heroBadgeBeforePill}</span>
              <span className="inline-flex items-center align-middle gap-2 sm:gap-3 my-1">
                <span className="relative inline-flex items-center justify-center w-14 h-9 sm:w-20 sm:h-12 lg:w-24 lg:h-13 rounded-full bg-brand-950 border-2 border-brand-900 shadow-md overflow-hidden shrink-0 group transition-transform hover:scale-105">
                  <img
                    src="/hero/puppy-badge.jpg"
                    alt="AlfaCare Puppy"
                    className="w-full h-full object-cover object-[center_40%] scale-110"
                    loading="eager"
                  />
                </span>
                <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-4">
                  {t.heroBadgePillWord}
                </span>
              </span>
              <span className="block mt-1">{t.heroBadgeAfterPill}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-normal">
              {t.subtitle}
            </p>

            {/* Dual CTAs: Primary Pill Button & Arrow Link */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 active:scale-[0.98] text-white font-heading font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-brand-950/15 transition-all whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.ctaBooking}</span>
              </a>

              <a
                href="#estimator"
                className="inline-flex items-center gap-1.5 text-brand-950 hover:text-emerald-700 font-heading font-bold text-sm sm:text-base transition group"
              >
                <span>{t.ctaEstimator}</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Peeking Pets & Floating 24h Card (Cols 8-12) */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-end mt-2 lg:mt-0">
            {/* Floating Dark 24h Card (Matching Reference top-right) */}
            <div className="absolute top-2 right-2 sm:right-6 lg:right-4 z-20 bg-brand-950 text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl border border-brand-800/80 text-center flex flex-col items-center justify-center min-w-[95px] sm:min-w-[115px] transition-transform hover:-translate-y-1">
              <span className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white flex items-center gap-1 justify-center">
                24h
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-300 mt-0.5 leading-tight">
                {t.callSupportSub}
              </span>
            </div>

            {/* Peeking Pets Image Container (Dog & Cat leaning with paws flush at the bottom) */}
            <div className="relative w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px]">
                <img
                  src="/hero/peeking-pets.jpg"
                  alt="AlfaCare Happy Dog and Cat"
                  className="w-full h-auto object-contain block align-bottom -mb-1 transform hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* LOWER SHELF / BAND (The soft two-tone shelf from reference) */}
      <div className="relative z-20 bg-[#EBF2F7] border-t border-slate-200/90 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Video Preview Card (Cat in vet exam room with play button) */}
            <div className="md:col-span-4 lg:col-span-3">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-full relative group overflow-hidden rounded-2xl bg-white border border-slate-300/80 shadow-sm hover:shadow-md transition text-left cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src="/hero/vet-video-thumb.jpg"
                    alt="AlfaCare Clinic Tour"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-brand-950/10 transition-colors" />
                  
                  {/* Play Button Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-brand-950 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-2 left-2 bg-brand-950/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                    {t.videoTourTag}
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 bg-white">
                  <p className="text-xs font-bold text-brand-950 group-hover:text-emerald-700 transition truncate">
                    {t.videoTourTitle}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {isId ? 'Lihat ruang steril & fasilitas IGD' : 'Watch our sterile operating & ICU rooms'}
                  </p>
                </div>
              </button>
            </div>

            {/* Center: "How Can We Help" Value Proposition */}
            <div className="md:col-span-5 lg:col-span-6 text-center md:text-left px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                {t.howCanWeHelpTag}
              </span>
              <h3 className="text-base sm:text-lg font-heading font-black text-brand-950 leading-snug">
                {t.howCanWeHelpTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {isId
                  ? 'Fasilitas sterilisasi bedah, kamar rawat isolasi berfilter udara, dan laboratorium on-site 24 jam.'
                  : 'Hospital-grade sterile surgery, HEPA filtered isolation recovery, and 24/7 on-site blood diagnostics.'}
              </p>
            </div>

            {/* Right: "See Stories" Social Proof Avatars */}
            <div className="md:col-span-3 lg:col-span-3 flex items-center justify-center md:justify-end gap-3">
              <a
                href="#cases"
                className="group flex items-center gap-3 p-1.5 rounded-full hover:bg-white/60 transition"
              >
                {/* Overlapping Pet Avatars */}
                <div className="flex items-center -space-x-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white overflow-hidden shadow-sm shrink-0">
                    <img
                      src="/hero/avatar-dog.jpg"
                      alt="Happy patient dog"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white overflow-hidden shadow-sm bg-brand-950 shrink-0">
                    <img
                      src="/hero/avatar-cat.jpg"
                      alt="Happy patient cat"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-1">
                      <span className="text-[9px] font-bold leading-tight uppercase tracking-tight">
                        {t.seeStoriesButton}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-brand-950 block group-hover:text-emerald-700 transition">
                    {t.seeStoriesCount}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {isId ? 'Studi Kasus Medis' : 'Clinical Stories'}
                  </span>
                </div>
              </a>
            </div>

          </div>

          {/* Integrated Trust Badges Strip (SIPDH, ISO, Lab, ICU) */}
          <div className="mt-6 pt-5 border-t border-slate-300/60">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.sipdh}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.sipdhDesc}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.sterile}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.sterileDesc}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.lab}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.labDesc}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/80 border border-slate-200 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.icu}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.icuDesc}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick 24/7 IGD Alert Bar */}
            <div className="mt-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-urgent-50/90 via-rose-50/50 to-urgent-50/80 border border-urgent-200/80 flex items-center justify-between gap-2.5 text-left">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-urgent-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-urgent-950 truncate">
                    {t.emergencyBanner.tag}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-urgent-800 truncate hidden sm:block">
                    {t.emergencyBanner.desc}
                  </p>
                  <p className="text-[10px] text-urgent-800 sm:hidden">
                    {isId ? 'Dokter IGD standby 24 jam' : '24/7 ER vet on standby'}
                  </p>
                </div>
              </div>
              <a
                href="tel:+622155550199"
                className="inline-flex items-center justify-center gap-1 bg-urgent-600 hover:bg-urgent-700 active:scale-[0.98] text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-xs transition shrink-0 whitespace-nowrap"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{isId ? 'Hubungi IGD' : 'Call 24/7 ER'}</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Video Tour Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-brand-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h4 className="font-heading font-bold text-sm">
                  {t.videoTourTitle}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex flex-col items-center justify-center p-6 text-center text-white">
              <img
                src="/hero/vet-video-thumb.jpg"
                alt="Clinic Tour"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 space-y-3 max-w-md">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <h5 className="font-heading font-bold text-lg">
                  {isId ? 'Tur Virtual Ruang Perawatan AlfaCare' : 'AlfaCare Virtual Clinical Tour'}
                </h5>
                <p className="text-xs text-slate-300">
                  {isId
                    ? 'Fasilitas ruang bedah steril ISO, laboratorium darah on-site 20 menit, dan kamar rawat inap isolasi bertekanan negatif.'
                    : 'ISO sterile operating theaters, rapid 20-minute on-site diagnostic lab, and viral isolation wards.'}
                </p>
                <a
                  href="#services"
                  onClick={() => setVideoModalOpen(false)}
                  className="inline-block bg-white text-brand-950 text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-50 transition"
                >
                  {isId ? 'Jelajahi Fasilitas Lengkap' : 'Explore Facilities'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
