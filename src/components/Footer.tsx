'use client';

import React from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { HeartPulse, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentLocale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].footer;

  return (
    <footer className="bg-brand-950 text-slate-400 pt-16 pb-24 md:pb-16 border-t border-brand-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-brand-900">
          {/* Col 1: Brand & Bio (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-emerald-600 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">AlfaCare</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">
                Jakarta
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {t.about}
            </p>
            <div className="pt-2 text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>(021) 5555-0199 / WhatsApp: 0811-8899-7700</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span>care@alfacare.co.id</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition">
                  Katalog Layanan Medis
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition">
                  Kalkulator Estimasi Biaya
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition">
                  Reservasi Jadwal Dokter
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition">
                  Studi Kasus & Pemulihan
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition">
                  Peta Lokasi & Akses
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">
              {t.medicalServices}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">Bedah & Ortopedi</span>
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">Rawat Inap Isolasi</span>
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">Steril Feline & Canine</span>
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">Dental Scaling Inhalasi</span>
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">USG Doppler Abdomen</span>
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">Rontgen Digital 2 Posisi</span>
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">Laboratorium CBC 20 Menit</span>
              <span className="p-2 rounded-lg bg-brand-900/60 border border-brand-800">ICU Inkubator O2</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & PDP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>{t.copyright}</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.pdpNotice}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
