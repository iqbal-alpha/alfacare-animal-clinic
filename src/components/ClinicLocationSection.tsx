'use client';

import React from 'react';
import { Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, Car } from 'lucide-react';

interface ClinicLocationSectionProps {
  currentLocale: Locale;
}

export const ClinicLocationSection: React.FC<ClinicLocationSectionProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].location;

  return (
    <section id="location" className="py-16 lg:py-24 bg-[#F2F6FA] border-b border-[#CCD8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/80 text-[#1E3A5F] border border-[#CCD8E2] text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs">
              <MapPin className="w-4 h-4 text-[#1E3A5F]" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#111827] tracking-tight">
              {t.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-[#D5DFE8] shadow-xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500">{t.addressTitle}</h4>
                  <p className="text-sm font-bold text-[#111827] mt-0.5">{t.addressValue}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#D5DFE8] shadow-xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#D8E1EA]/60 text-[#1E3A5F] flex items-center justify-center shrink-0 border border-[#CCD8E2]">
                  <Clock className="w-5 h-5 text-[#1E3A5F]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500">{t.hoursTitle}</h4>
                  <p className="text-sm font-bold text-[#111827] mt-0.5">{t.hoursValue}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#D5DFE8] shadow-xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FDF2F2] text-[#A83232] flex items-center justify-center shrink-0 border border-[#F5C2C2]">
                  <Phone className="w-5 h-5 text-[#A83232]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500">{t.phoneTitle}</h4>
                  <p className="text-sm font-bold text-[#111827] mt-0.5">{t.phoneValue}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://maps.google.com/?q=Jl.+Senopati+Raya+No.+88,+Kebayoran+Baru,+Jakarta+Selatan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-black active:scale-[0.98] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md transition"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>{t.btnOpenMaps}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Map / Clinic Facade Presentation */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl aspect-[4/3] bg-slate-200">
              <img
                src="/hero/clinic-building.jpg"
                alt="AlfaCare Animal Clinic Modern Medical Facility Entrance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <Car className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Area Parkir Luas & Drop-off Hewan Ramah Pasien</span>
                </div>
                <p className="text-xs text-slate-100 font-medium leading-relaxed">
                  Dilengkapi ruang tunggu terpisah untuk anjing dan kucing demi meminimalkan stres pasien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
