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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      {/* Top Banner: Status Dokter Jaga & Lokasi */}
      <div className="bg-brand-900 text-slate-200 px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-300 font-semibold">{t.doctorOnDuty}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 hidden sm:inline">Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+622155550199"
              className="flex items-center gap-1.5 text-urgent-400 hover:text-urgent-300 font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>IGD 24 Jam: (021) 5555-0199</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-800 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-900/20 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-brand-900 tracking-tight">AlfaCare</span>
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                Clinic
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 -mt-1 tracking-wide">
              Animal Medical Center Jakarta
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <a href="#services" className="hover:text-brand-700 transition-colors">
            {t.services}
          </a>
          <a href="#estimator" className="hover:text-brand-700 transition-colors">
            {t.estimator}
          </a>
          <a href="#cases" className="hover:text-brand-700 transition-colors">
            {t.cases}
          </a>
          <a href="#location" className="hover:text-brand-700 transition-colors">
            {t.location}
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border border-slate-200 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-brand-600" />
            <span>{currentLocale === 'id' ? 'ID (🇮🇩)' : 'EN (🇬🇧)'}</span>
          </button>

          {/* Book Appointment CTA Button */}
          <a
            href="#booking"
            className="bg-brand-800 hover:bg-brand-900 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <span>{t.booking}</span>
          </a>

          {/* Emergency Hotline Button */}
          <a
            href="https://wa.me/6281188997700?text=Halo%20Dokter%20Darurat%20AlfaCare%20Jakarta,%20saya%20membutuhkan%20bantuan%20segera%20untuk%20hewan%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-urgent-600 hover:bg-urgent-700 text-white text-sm font-bold px-3.5 py-2.5 rounded-xl shadow-md shadow-urgent-600/20 emergency-glow transition-all flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>Hotline Darurat</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLocale}
            className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1.5 rounded-lg border border-slate-200"
          >
            {currentLocale === 'id' ? 'ID' : 'EN'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-brand-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
          >
            {t.services}
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
          >
            {t.estimator}
          </a>
          <a
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
          >
            {t.cases}
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
          >
            {t.location}
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-brand-800 text-white font-bold py-3 rounded-xl"
            >
              {t.booking}
            </a>
            <a
              href="tel:+622155550199"
              className="w-full text-center bg-urgent-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi Dokter IGD (24 Jam)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
