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
    <footer className="bg-[#FDF6F1] text-slate-700 pt-16 pb-28 md:pb-16 border-t border-[#EED4C6] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EED4C6]">
          {/* Col 1: Brand & Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/icon.svg"
                alt="AlfaCare Animal Clinic Logo"
                className="w-8 h-8"
              />
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-2xl text-[#111827] tracking-tight">AlfaCare</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Clinic
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              {t.about}
            </p>

            <div className="pt-2 text-slate-700 text-xs sm:text-sm space-y-2.5">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan 12190</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-bold text-[#111827]">(021) 5555-0199</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-700">WhatsApp: 0811-8899-7700</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-slate-600">care@alfacare.co.id</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-emerald-800 font-bold">Buka Setiap Hari: 08:00 - 22:00 WIB (IGD 24 Jam)</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-[#111827] text-sm tracking-wide">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#services" className="text-slate-600 hover:text-black transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-600 font-bold">›</span>
                  <span>{isId ? 'Katalog Layanan Medis' : 'Medical Services Catalog'}</span>
                </a>
              </li>
              <li>
                <a href="#estimator" className="text-slate-600 hover:text-black transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-600 font-bold">›</span>
                  <span>{isId ? 'Kalkulator Estimasi Biaya' : 'Fee Estimator Calculator'}</span>
                </a>
              </li>
              <li>
                <a href="#booking" className="text-slate-600 hover:text-black transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-600 font-bold">›</span>
                  <span>{isId ? 'Reservasi Jadwal Dokter' : 'Doctor Appointment Booking'}</span>
                </a>
              </li>
              <li>
                <a href="#cases" className="text-slate-600 hover:text-black transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-600 font-bold">›</span>
                  <span>{isId ? 'Studi Kasus & Pemulihan' : 'Clinical Recovery Case Studies'}</span>
                </a>
              </li>
              <li>
                <a href="#location" className="text-slate-600 hover:text-black transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-600 font-bold">›</span>
                  <span>{isId ? 'Peta Lokasi & Akses Fasilitas' : 'Clinic Location & Directions'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Services Chips (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-[#111827] text-sm tracking-wide">
              {t.medicalServices}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                Bedah & Ortopedi
              </span>
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                Rawat Inap Isolasi
              </span>
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                Steril Kucing & Anjing
              </span>
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                Dental Scaling Inhalasi
              </span>
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                USG Doppler Abdomen
              </span>
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                Rontgen Digital 2 Posisi
              </span>
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                Lab Darah CBC 20 Menit
              </span>
              <span className="p-2.5 rounded-xl bg-white text-slate-800 border border-[#E2EAF1] font-semibold shadow-2xs hover:border-[#CCD8E2]">
                ICU Inkubator O2
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Accreditation & PDP Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p className="font-medium text-slate-600">{t.copyright}</p>
          <p className="flex items-center gap-2 text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.pdpNotice}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
