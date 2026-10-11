'use client';

import React from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { HeartPulse, Phone, Mail, MapPin, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  currentLocale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].footer;
  const isId = currentLocale === 'id';

  return (
    <footer className="bg-[#071220] text-slate-300 pt-16 pb-28 md:pb-16 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/90">
          {/* Col 1: Brand & Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40">
                <HeartPulse className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-2xl text-white tracking-tight">AlfaCare</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                  Clinic
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              {t.about}
            </p>

            <div className="pt-2 text-slate-200 text-xs sm:text-sm space-y-2.5">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan 12190</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">(021) 5555-0199</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-200">WhatsApp: 0811-8899-7700</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">care@alfacare.co.id</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 font-semibold">Buka Setiap Hari: 08:00 - 22:00 WIB (IGD 24 Jam)</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm tracking-wide">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#services" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">›</span>
                  <span>{isId ? 'Katalog Layanan Medis' : 'Medical Services Catalog'}</span>
                </a>
              </li>
              <li>
                <a href="#estimator" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">›</span>
                  <span>{isId ? 'Kalkulator Estimasi Biaya' : 'Fee Estimator Calculator'}</span>
                </a>
              </li>
              <li>
                <a href="#booking" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">›</span>
                  <span>{isId ? 'Reservasi Jadwal Dokter' : 'Doctor Appointment Booking'}</span>
                </a>
              </li>
              <li>
                <a href="#cases" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">›</span>
                  <span>{isId ? 'Studi Kasus & Pemulihan' : 'Clinical Recovery Case Studies'}</span>
                </a>
              </li>
              <li>
                <a href="#location" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">›</span>
                  <span>{isId ? 'Peta Lokasi & Akses Fasilitas' : 'Clinic Location & Directions'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Services Chips (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm tracking-wide">
              {t.medicalServices}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                Bedah & Ortopedi
              </span>
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                Rawat Inap Isolasi
              </span>
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                Steril Kucing & Anjing
              </span>
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                Dental Scaling Inhalasi
              </span>
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                USG Doppler Abdomen
              </span>
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                Rontgen Digital 2 Posisi
              </span>
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                Lab Darah CBC 20 Menit
              </span>
              <span className="p-2.5 rounded-xl bg-[#0D1D35] text-slate-200 border border-slate-700/80 font-medium">
                ICU Inkubator O2
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Accreditation & PDP Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p className="font-medium text-slate-300">{t.copyright}</p>
          <p className="flex items-center gap-2 text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.pdpNotice}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
