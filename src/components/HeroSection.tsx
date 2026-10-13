'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import {
  Calendar,
  ArrowUpRight,
  Play,
  X,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';

interface HeroSectionProps {
  currentLocale: Locale;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].hero;
  const isId = currentLocale === 'id';
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#F9E1D4]">
      {/* 1. TOP SECTION: WARM BLUSH PEACH CANVAS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          
          {/* Left Column: Big Editorial Typography & Actions (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left pb-8 lg:pb-12">
            {/* Signature 3-Line Headline matching reference */}
            <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-heading font-black text-[#111827] tracking-tight leading-[1.08]">
              <span className="block">{isId ? 'Kami rawat' : 'We take'}</span>
              <span className="inline-flex items-center align-middle gap-3 my-1">
                {/* Oval Pill with Puppy Cutout */}
                <span className="relative inline-flex items-center justify-center w-20 h-12 sm:w-28 sm:h-16 lg:w-32 lg:h-18 rounded-full bg-[#111827] overflow-hidden shrink-0 shadow-md transition-transform hover:scale-105">
                  <img
                    src="/hero/puppy-badge-dark.png"
                    alt="Puppy AlfaCare"
                    className="w-full h-full object-cover object-[center_35%] scale-110"
                    loading="eager"
                  />
                </span>
                <span>{isId ? 'kasih' : 'care'}</span>
              </span>
              <span className="block">{isId ? 'anabul Anda' : 'your pets'}</span>
            </h1>

            {/* Subheadline: Short, elegant 2 lines */}
            <p className="text-sm sm:text-base text-slate-700/90 leading-relaxed max-w-md font-normal">
              {isId
                ? 'Layanan dokter spesialis berizin (SIPDH), ruang bedah steril ISO, dan laboratorium instan 20 menit di Senopati, Jakarta Selatan.'
                : 'Before you bring home your pet, be sure you’re ready to take care of it properly with our 24/7 accredited veterinary hospital.'}
            </p>

            {/* Dual CTAs matching reference */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-2">
              <a
                href="#booking"
                className="inline-flex items-center justify-center bg-[#111827] hover:bg-black active:scale-[0.98] text-white font-heading font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-md shadow-brand-950/20 transition-all whitespace-nowrap shrink-0"
              >
                <span>{isId ? 'Jadwalkan Janji' : 'Book Appointment'}</span>
              </a>

              <a
                href="#estimator"
                className="inline-flex items-center gap-1.5 text-[#111827] hover:text-emerald-700 font-heading font-bold text-sm sm:text-base transition group"
              >
                <span>{isId ? 'Konsultasi Cepat' : 'Schedule a Call'}</span>
                <ArrowUpRight className="w-4 h-4 text-[#111827] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Floating 24h Card & Peeking Pets (6 Cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-end">
            {/* Floating 24h Box in Top Right - Kept cleanly within hero section bounds (z-20, top-0 sm:top-2) */}
            <div className="absolute top-0 sm:top-2 right-1 sm:right-4 lg:right-2 z-20 bg-[#111827] text-white rounded-3xl p-4 sm:p-5 shadow-2xl text-center flex flex-col items-center justify-center min-w-[110px] sm:min-w-[125px] border border-slate-800 transition-transform hover:-translate-y-1">
              <span className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white block">
                24h
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-300 mt-0.5 block whitespace-nowrap">
                {isId ? 'Dokter Jaga Standby' : 'Call Support'}
              </span>
            </div>

            {/* Peeking Giant Pets - Big expressive faces, perfectly aligned shelf ledge (-mb-[16.02%]), zero fur holes */}
            <div className="relative z-30 w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[680px] xl:max-w-[720px] -mb-[16.02%] pointer-events-none">
              <img
                src="/hero/pets-giant-perfect.png"
                alt="Happy Corgi and Orange Cat filling the hero section"
                className="w-full h-auto object-contain block drop-shadow-sm"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. LOWER SECTION: POWDERY BLUE SHELF BAND */}
      <div className="relative z-20 bg-[#D8E1EA] border-t border-[#ccd8e2] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left: Video Card Preview */}
            <div className="md:col-span-4 lg:col-span-3">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-full relative group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition text-left cursor-pointer border border-[#c5d3df]"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-200">
                  <img
                    src="/hero/vet-video-thumb.jpg"
                    alt="AlfaCare Facility Tour"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Button Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/10 transition-colors">
                    <div className="w-11 h-11 rounded-full bg-white/95 text-[#111827] shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-[#111827] group-hover:text-white transition-all">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Center: "How Can We Help" */}
            <div className="md:col-span-5 lg:col-span-6 text-center md:text-left px-2">
              <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase block mb-1">
                {isId ? 'Bagaimana Kami Membantu' : 'How can we help'}
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-black text-[#111827] leading-snug">
                {isId
                  ? 'Kenyamanan Anda saat bekerja atau bepergian, anabul dirawat medis sepenuh hati.'
                  : 'While you are on vacation or at work can be stressful.'}
              </h3>
            </div>

            {/* Right: "See Stories" Social Proof Avatars */}
            <div className="md:col-span-3 lg:col-span-3 flex items-center justify-center md:justify-end gap-3">
              <a
                href="#cases"
                className="group flex items-center gap-3 p-1 rounded-full hover:bg-white/40 transition"
              >
                <div className="flex items-center -space-x-3.5">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-white overflow-hidden shadow-xs shrink-0">
                    <img
                      src="/hero/avatar-dog.jpg"
                      alt="Happy patient dog"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-white overflow-hidden shadow-xs bg-[#111827] shrink-0 flex items-center justify-center text-center p-1">
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight leading-tight">
                      {isId ? 'Lihat Kasus' : 'See Stories'}
                    </span>
                  </div>
                </div>
              </a>
            </div>

          </div>

          {/* Integrated Trust Badges Strip (SIPDH, ISO, Lab, ICU) */}
          <div className="mt-8 pt-6 border-t border-[#ccd8e2]/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-[#c8d6e2] shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.sipdh}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.sipdhDesc}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-[#c8d6e2] shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.sterile}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.sterileDesc}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-[#c8d6e2] shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.lab}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.labDesc}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-[#c8d6e2] shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {t.trustBadges.icu}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                    {t.trustBadges.icuDesc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tour Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#111827] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h4 className="font-heading font-bold text-sm text-white">
                {isId ? 'Tur Virtual Fasilitas AlfaCare' : 'AlfaCare Virtual Facility Tour'}
              </h4>
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
                  {isId ? 'Ruang Bedah Steril ISO & Laboratorium Darah 20 Menit' : 'ISO Sterile Theaters & 20-Min Blood Lab'}
                </h5>
                <p className="text-xs text-slate-300">
                  {isId
                    ? 'Didukung peralatan modern, ruang rawat inap isolasi berfilter udara, dan tim dokter bedah berizin SIPDH.'
                    : 'Equipped with modern veterinary telemetry, negative pressure isolation wards, and licensed surgeons.'}
                </p>
                <a
                  href="#services"
                  onClick={() => setVideoModalOpen(false)}
                  className="inline-block bg-white text-[#111827] text-xs font-bold px-4 py-2 rounded-full hover:bg-emerald-50 transition"
                >
                  {isId ? 'Lihat Semua Layanan' : 'Explore All Services'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
