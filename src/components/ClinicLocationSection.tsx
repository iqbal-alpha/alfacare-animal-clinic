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
    <section id="location" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 border border-brand-200 text-xs font-bold px-3 py-1.5 rounded-full">
              <MapPin className="w-4 h-4 text-brand-700" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-black text-brand-900 tracking-tight">
              {t.title}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500">{t.addressTitle}</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{t.addressValue}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-brand-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500">{t.hoursTitle}</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{t.hoursValue}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-urgent-100 text-urgent-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-urgent-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500">{t.phoneTitle}</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{t.phoneValue}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://maps.google.com/?q=Jl.+Senopati+Raya+No.+88,+Kebayoran+Baru,+Jakarta+Selatan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition"
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
                src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=80"
                alt="AlfaCare Animal Clinic Modern Medical Facility Entrance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <Car className="w-4 h-4" />
                  <span>Area Parkir Luas & Drop-off Hewan Ramah Pasien</span>
                </div>
                <p className="text-xs text-slate-200">
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
