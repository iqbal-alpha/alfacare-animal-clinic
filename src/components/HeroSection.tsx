'use client';

import React from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { ShieldCheck, Stethoscope, Sparkles, AlertCircle, PhoneCall, Calendar, Calculator, CheckCircle2, MapPin } from 'lucide-react';

interface HeroSectionProps {
  currentLocale: Locale;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-100/40 via-brand-100/30 to-amber-100/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-brand-200/80 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold text-brand-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.badge}</span>
            </div>

            {/* Main Title with Semantic Hierarchy */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-heading font-black text-brand-900 tracking-tight leading-[1.15]">
              <span className="block text-emerald-700 text-2xl sm:text-3xl font-bold mb-1">
                {t.titleHighlight}
              </span>
              {t.titleMain}
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.subtitle}
            </p>

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-1 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 leading-snug">{t.trustBadges.sipdh}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 leading-snug">{t.trustBadges.sterile}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <Stethoscope className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 leading-snug">{t.trustBadges.lab}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 leading-snug">{t.trustBadges.icu}</span>
              </div>
            </div>

            {/* Dual CTA Conversion Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
              <a
                href="#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-brand-900/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>{t.ctaBooking}</span>
              </a>

              <a
                href="#estimator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-brand-900 border-2 border-brand-200 hover:border-brand-300 font-heading font-bold text-base px-6 py-3.5 rounded-2xl shadow-sm hover:shadow transition-all"
              >
                <Calculator className="w-5 h-5 text-brand-600" />
                <span>{t.ctaEstimator}</span>
              </a>
            </div>

            {/* Immediate Emergency Ribbon */}
            <div className="mt-6 p-4 rounded-2xl bg-urgent-50 border border-urgent-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-urgent-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-urgent-900">{t.emergencyBanner.tag}</h4>
                  <p className="text-xs text-urgent-800 leading-relaxed mt-0.5">{t.emergencyBanner.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <a
                  href="tel:+622155550199"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-urgent-600 hover:bg-urgent-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.emergencyBanner.callNow}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Trust & Hero Image Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-brand-900/15 aspect-[4/3] sm:aspect-[1/1] object-cover bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1000&q=80"
                  alt="Veterinarian examining dog with stethoscope at AlfaCare Animal Clinic"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                
                {/* Floating Hospital Location Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Senopati, Jakarta Selatan</p>
                      <p className="text-[11px] text-slate-500 font-medium">Buka Hari Ini: 08:00 - 22:00 WIB</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-1 rounded-md">
                    Buka
                  </span>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-sm">
                  ★ 4.9
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">12.000+ Kunjungan</p>
                  <p className="text-[11px] text-slate-500 font-medium">Ulasan Positif Terverifikasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
