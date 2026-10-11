'use client';

import React from 'react';
import { AppointmentBooking, Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { CheckCircle2, MessageSquare, X, Calendar, User, HeartPulse, Sparkles, PhoneCall } from 'lucide-react';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: AppointmentBooking | null;
  currentLocale: Locale;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  currentLocale,
}) => {
  if (!isOpen || !bookingData) return null;

  const t = DICTIONARY[currentLocale].modal;
  const isId = currentLocale === 'id';

  // Construct Formatted WhatsApp Message according to PRD
  const buildWhatsAppUrl = () => {
    const adminPhone = '6281188997700'; // AlfaCare Jakarta WhatsApp Admin Number
    
    let message = '';
    if (isId) {
      message = `Halo Admin AlfaCare Animal Clinic Jakarta, saya ingin melakukan reservasi kunjungan:

[DETAIL PASIEN & HEWAN]
• Kode Tiket: ${bookingData.bookingCode}
• Nama Hewan: ${bookingData.pet.name}
• Spesies / Ras: ${bookingData.pet.species} (${bookingData.pet.breed || '-'})
• Kategori Berat: ${bookingData.pet.weightClass}
• Usia: ${bookingData.pet.ageYears}
• Gejala / Catatan: ${bookingData.symptomsNotes || 'Pemeriksaan rutin / checkup'}

[LAYANAN & JADWAL]
• Layanan: ${bookingData.serviceCategory}
• Tingkat Urgensi: ${bookingData.urgencyLevel}
• Rencana Tanggal: ${bookingData.appointmentDate}
• Sesi Waktu: ${bookingData.timeSlot}
• Dokter Preferensi: ${bookingData.preferredDoctor}
${bookingData.estimatedCostIdr ? `• Estimasi Biaya Web: Rp ${bookingData.estimatedCostIdr.toLocaleString('id-ID')}` : ''}

[KONTAK PEMILIK]
• Nama Pemilik: ${bookingData.owner.fullName}
• No. WhatsApp: ${bookingData.owner.phoneWhatsApp}
• Email: ${bookingData.owner.email}

Mohon konfirmasi ketersediaan slot ini. Terima kasih!`;
    } else {
      message = `Hello AlfaCare Animal Clinic Jakarta Admin, I would like to confirm an appointment booking:

[PATIENT & PET DETAILS]
• Booking Code: ${bookingData.bookingCode}
• Pet Name: ${bookingData.pet.name}
• Species / Breed: ${bookingData.pet.species} (${bookingData.pet.breed || '-'})
• Weight Class: ${bookingData.pet.weightClass}
• Age: ${bookingData.pet.ageYears}
• Symptoms / Notes: ${bookingData.symptomsNotes || 'Routine wellness visit'}

[SERVICE & SCHEDULE]
• Service: ${bookingData.serviceCategory}
• Urgency Level: ${bookingData.urgencyLevel}
• Scheduled Date: ${bookingData.appointmentDate}
• Time Slot: ${bookingData.timeSlot}
• Preferred Vet: ${bookingData.preferredDoctor}

[OWNER INFORMATION]
• Owner Name: ${bookingData.owner.fullName}
• WhatsApp: ${bookingData.owner.phoneWhatsApp}
• Email: ${bookingData.owner.email}

Please confirm the availability for this slot. Thank you!`;
    }

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-7 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/20 mb-3">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-heading font-black tracking-tight">
            {t.bookingSuccessTitle}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            {t.bookingSuccessSubtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Ticket Badge */}
          <div className="bg-brand-50 border border-brand-200/80 p-4 rounded-2xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block">
              {t.ticketCode}
            </span>
            <span className="text-xl sm:text-2xl font-mono font-black text-brand-900 tracking-wider">
              {bookingData.bookingCode}
            </span>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Pasien:</span>
              <span className="font-bold text-slate-800">
                {bookingData.pet.name} ({bookingData.pet.species})
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Layanan:</span>
              <span className="font-bold text-emerald-800 text-right">
                {bookingData.serviceCategory}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Tanggal & Waktu:</span>
              <span className="font-bold text-slate-800">
                {bookingData.appointmentDate} • {bookingData.timeSlot}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Pemilik:</span>
              <span className="font-bold text-slate-800">
                {bookingData.owner.fullName} ({bookingData.owner.phoneWhatsApp})
              </span>
            </div>
          </div>

          {/* WhatsApp Direct Action Prompt */}
          <div className="text-center space-y-3">
            <p className="text-xs text-slate-600 font-medium">
              {t.readyToSendWa}
            </p>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-heading font-black text-sm sm:text-base py-4 px-6 rounded-2xl shadow-lg shadow-[#25D366]/25 transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>{t.btnOpenWa}</span>
            </a>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold underline pt-1 block mx-auto"
            >
              {t.btnClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
