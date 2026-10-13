'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { PhoneCall, ShieldCheck, Globe, Menu, X, HeartPulse } from 'lucide-react';

interface NavbarProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLocale, onLocaleChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = DICTIONARY[currentLocale].nav;

  const toggleLocale = () => {
    onLocaleChange(currentLocale === 'id' ? 'en' : 'id');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#eed4c6] bg-[#F9E1D4]/95 backdrop-blur-md transition-all shadow-2xs">
      {/* Top Banner: Status Dokter Jaga & Lokasi */}
      <div className="bg-[#111827] text-slate-200 px-3.5 sm:px-6 lg:px-8 py-1.5 text-[11px] sm:text-xs font-medium border-b border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-300 font-semibold">{t.doctorOnDuty}</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-300 hidden sm:inline">Jl. Senopati Raya No. 88, Jaksel</span>
          </div>

          <div className="flex items-center">
            <a
              href="tel:+622155550199"
              className="flex items-center gap-1.5 text-urgent-400 hover:text-urgent-300 font-bold transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span className="sm:hidden">{currentLocale === 'id' ? 'IGD 24 Jam' : '24/7 ER'}</span>
              <span className="hidden sm:inline">
                {currentLocale === 'id' ? 'IGD 24 Jam: (021) 5555-0199' : '24/7 ER: (021) 5555-0199'}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-800 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-900/20 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-brand-900 tracking-tight">AlfaCare</span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                Clinic
              </span>
            </div>
            <span className="hidden xl:block text-[11px] font-medium text-slate-500 -mt-0.5 tracking-wide">
              Animal Medical Center Jakarta
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Visible on lg and above) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-[13px] xl:text-sm font-semibold text-slate-800 tracking-normal">
          <a href="#services" className="hover:text-black transition-colors whitespace-nowrap">
            {t.services}
          </a>
          <a href="#estimator" className="hover:text-black transition-colors whitespace-nowrap">
            {t.estimator}
          </a>
          <a href="#cases" className="hover:text-black transition-colors whitespace-nowrap">
            {t.cases}
          </a>
          <a href="#location" className="hover:text-black transition-colors whitespace-nowrap">
            {t.location}
          </a>
        </nav>

        {/* Right CTA Actions (Visible on lg and above) */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
          {/* Segmented Language Selector */}
          <div className="inline-flex items-center rounded-full bg-white/70 p-0.5 border border-[#eed4c6]">
            <button
              type="button"
              onClick={() => onLocaleChange('id')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                currentLocale === 'id'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-slate-700 hover:text-black'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                currentLocale === 'en'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-slate-700 hover:text-black'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Book Appointment CTA Button */}
          <a
            href="#booking"
            className="bg-[#111827] hover:bg-black text-white text-xs xl:text-sm font-semibold px-4.5 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{t.booking}</span>
          </a>

          {/* Emergency Hotline Button */}
          <a
            href="https://wa.me/6281188997700?text=Halo%20Dokter%20Darurat%20AlfaCare%20Jakarta,%20saya%20membutuhkan%20bantuan%20segera%20untuk%20hewan%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-urgent-600 hover:bg-urgent-700 text-white text-xs xl:text-sm font-bold px-3 py-2.5 xl:px-3.5 xl:py-2.5 rounded-xl shadow-md shadow-urgent-600/20 emergency-glow transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 xl:w-4 xl:h-4 animate-pulse" />
            <span>{currentLocale === 'id' ? 'Hotline Darurat' : '24/7 Hotline'}</span>
          </a>
        </div>

        {/* Mobile & Tablet Actions (< lg) */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
          {/* Segmented Language Selector */}
          <div className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => onLocaleChange('id')}
              className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                currentLocale === 'id'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange('en')}
              className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                currentLocale === 'en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
          </div>

          {/* Tablet-only quick hotline call button */}
          <a
            href="https://wa.me/6281188997700?text=Halo%20Dokter%20Darurat%20AlfaCare%20Jakarta,%20saya%20membutuhkan%20bantuan%20segera%20untuk%20hewan%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex md:inline-flex items-center gap-1.5 bg-urgent-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{currentLocale === 'id' ? 'Hotline' : '24/7 Hotline'}</span>
          </a>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-brand-900 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2.5 border-b border-slate-100 hover:text-brand-800 transition-colors"
          >
            {t.services}
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2.5 border-b border-slate-100 hover:text-brand-800 transition-colors"
          >
            {t.estimator}
          </a>
          <a
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2.5 border-b border-slate-100 hover:text-brand-800 transition-colors"
          >
            {t.cases}
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2.5 border-b border-slate-100 hover:text-brand-800 transition-colors"
          >
            {t.location}
          </a>
          <div className="pt-3 flex flex-col gap-2.5">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-brand-800 hover:bg-brand-900 text-white font-bold py-3 rounded-xl shadow-sm transition-all"
            >
              {t.booking}
            </a>
            <a
              href="tel:+622155550199"
              className="w-full text-center bg-urgent-600 hover:bg-urgent-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{currentLocale === 'id' ? 'Hubungi Dokter IGD (24 Jam)' : 'Call 24/7 Emergency Vet'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
