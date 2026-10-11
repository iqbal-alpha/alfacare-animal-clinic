'use client';

import React from 'react';
import { Locale } from '@/types';
import { PhoneCall, Calendar } from 'lucide-react';

interface FloatingEmergencyBarProps {
  currentLocale: Locale;
}

export const FloatingEmergencyBar: React.FC<FloatingEmergencyBarProps> = ({ currentLocale }) => {
  const isId = currentLocale === 'id';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl flex items-center gap-2">
      {/* 1-Tap Emergency Call */}
      <a
        href="tel:+622155550199"
        className="flex-1 bg-urgent-600 active:bg-urgent-700 text-white font-bold text-xs py-3 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
      >
        <PhoneCall className="w-4 h-4 animate-pulse" />
        <span>{isId ? 'IGD Darurat 24 Jam' : '24/7 ER Hotline'}</span>
      </a>

      {/* 1-Tap Booking Scroll */}
      <a
        href="#booking"
        className="flex-1 bg-brand-800 active:bg-brand-900 text-white font-bold text-xs py-3 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
      >
        <Calendar className="w-4 h-4 text-emerald-400" />
        <span>{isId ? 'Reservasi Jadwal' : 'Book Appointment'}</span>
      </a>
    </div>
  );
};
