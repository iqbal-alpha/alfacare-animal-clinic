'use client';

import React, { useState, useEffect } from 'react';
import { Locale, Species, WeightClass, UrgencyLevel, AppointmentBooking } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { CLINIC_SERVICES } from '@/data/mockData';
import { BookingSuccessModal } from './BookingSuccessModal';
import {
  Calendar,
  Clock,
  User,
  Heart,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  Cat,
  Dog,
  Rabbit,
  PawPrint,
} from 'lucide-react';

interface MultiStepBookingProps {
  currentLocale: Locale;
  prefilledData: {
    species?: Species;
    weightClass?: WeightClass;
    serviceCode?: string;
    serviceName?: string;
    estimatedCost?: number;
  } | null;
}

export const MultiStepBooking: React.FC<MultiStepBookingProps> = ({ currentLocale, prefilledData }) => {
  const t = DICTIONARY[currentLocale].booking;

  const [step, setStep] = useState<number>(1);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<AppointmentBooking | null>(null);

  // Form Field State
  const [petName, setPetName] = useState<string>('');
  const [petSpecies, setPetSpecies] = useState<Species>('CAT');
  const [petBreed, setPetBreed] = useState<string>('');
  const [petAge, setPetAge] = useState<string>('2 Tahun');
  const [petWeight, setPetWeight] = useState<WeightClass>('FELINE_STANDARD');

  const [serviceCode, setServiceCode] = useState<string>('VAC-FEL-F3');
  const [serviceName, setServiceName] = useState<string>('Vaksin Kucing F3 (Tricat)');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('ROUTINE');

  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Pagi (09:00 - 12:00 WIB)');
  const [preferredDoctor, setPreferredDoctor] = useState<string>('Dokter Jaga Pertama yang Tersedia');

  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerWhatsApp, setOwnerWhatsApp] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [symptomsNotes, setSymptomsNotes] = useState<string>('');
  const [dataConsent, setDataConsent] = useState<boolean>(true);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize tomorrow's date by default
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setAppointmentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sync Prefilled Data from Pricing Estimator
  useEffect(() => {
    if (prefilledData) {
      if (prefilledData.species) setPetSpecies(prefilledData.species);
      if (prefilledData.weightClass) setPetWeight(prefilledData.weightClass);
      if (prefilledData.serviceCode) setServiceCode(prefilledData.serviceCode);
      if (prefilledData.serviceName) setServiceName(prefilledData.serviceName);
      // Advance to Step 3 if prefilled
      setStep(3);
    }
  }, [prefilledData]);

  // Validation functions
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!petName || petName.trim().length < 2) {
        newErrors.petName = t.errors.petName;
      }
      if (!petAge || petAge.trim().length < 1) {
        newErrors.petAge = t.errors.age;
      }
    } else if (currentStep === 2) {
      if (!serviceCode) {
        newErrors.service = 'Pilih salah satu layanan medis.';
      }
    } else if (currentStep === 3) {
      if (!appointmentDate) {
        newErrors.date = t.errors.date;
      }
      if (!timeSlot) {
        newErrors.timeSlot = t.errors.timeSlot;
      }
    } else if (currentStep === 4) {
      if (!ownerName || ownerName.trim().length < 3) {
        newErrors.ownerName = t.errors.ownerName;
      }
      const phoneDigits = ownerWhatsApp.replace(/\D/g, '');
      if (!ownerWhatsApp || phoneDigits.length < 10) {
        newErrors.whatsapp = t.errors.whatsapp;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!ownerEmail || !emailRegex.test(ownerEmail)) {
        newErrors.email = t.errors.email;
      }
      if (!dataConsent) {
        newErrors.consent = t.errors.consent;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    // Generate unique booking code: ALFA-YYYYMMDD-RANDOM
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(100 + Math.random() * 900);
    const bookingCode = `ALFA-${dateStr}-${randomCode}`;

    const booking: AppointmentBooking = {
      bookingCode,
      pet: {
        name: petName,
        species: petSpecies,
        breed: petBreed || undefined,
        ageYears: petAge,
        weightClass: petWeight,
      },
      owner: {
        fullName: ownerName,
        phoneWhatsApp: ownerWhatsApp,
        email: ownerEmail,
        preferredLocale: currentLocale,
        dataConsentApproved: dataConsent,
      },
      serviceCategory: serviceName,
      serviceCode,
      urgencyLevel,
      appointmentDate,
      timeSlot,
      preferredDoctor,
      symptomsNotes,
      estimatedCostIdr: prefilledData?.estimatedCost,
      status: 'PENDING_WHATSAPP',
      createdAt: new Date().toISOString(),
    };

    // Save in state & open success modal
    setCompletedBooking(booking);
    setSuccessModalOpen(true);
  };

  return (
    <section id="booking" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 border border-brand-200 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Calendar className="w-4 h-4 text-brand-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-brand-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: t.step1 },
              { num: 2, label: t.step2 },
              { num: 3, label: t.step3 },
              { num: 4, label: t.step4 },
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (s.num < step) setStep(s.num);
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-heading font-bold text-xs sm:text-sm border-2 transition-all ${
                    step === s.num
                      ? 'bg-brand-900 text-white border-brand-900 shadow-md ring-4 ring-brand-100'
                      : s.num < step
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white text-slate-400 border-slate-300'
                  }`}
                >
                  {s.num < step ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </button>
                <span
                  className={`text-[11px] font-bold mt-1.5 hidden sm:inline ${
                    step === s.num ? 'text-brand-900' : s.num < step ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-brand-950/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Profil Pasien Hewan */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-heading font-bold text-lg text-brand-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <span>{t.step1}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pet Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.petNameLabel}
                    </label>
                    <input
                      type="text"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder={t.petNamePlaceholder}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                    {errors.petName && (
                      <p className="text-xs text-urgent-600 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.petName}
                      </p>
                    )}
                  </div>

                  {/* Species Selection */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      {t.speciesLabel}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'CAT' as Species, label: 'Kucing (Cat)', icon: Cat },
                        { id: 'DOG' as Species, label: 'Anjing (Dog)', icon: Dog },
                        { id: 'RABBIT' as Species, label: 'Kelinci (Rabbit)', icon: Rabbit },
                        { id: 'BIRD_EXOTIC' as Species, label: 'Eksotik (Exotic)', icon: PawPrint },
                      ].map((s) => {
                        const IconComp = s.icon;
                        const isSelected = petSpecies === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setPetSpecies(s.id);
                              if (s.id === 'CAT') setPetWeight('FELINE_STANDARD');
                              if (s.id === 'DOG') setPetWeight('CANINE_MEDIUM');
                            }}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer active:scale-[0.98] ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-50 text-brand-900 shadow-sm font-bold'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <IconComp className="w-4 h-4" />
                            </div>
                            <span className="truncate">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Breed */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.breedLabel}
                    </label>
                    <input
                      type="text"
                      value={petBreed}
                      onChange={(e) => setPetBreed(e.target.value)}
                      placeholder={t.breedPlaceholder}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.ageLabel}
                    </label>
                    <input
                      type="text"
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      placeholder={t.agePlaceholder}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                    {errors.petAge && (
                      <p className="text-xs text-urgent-600 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.petAge}
                      </p>
                    )}
                  </div>
                </div>

                {/* Weight Category Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.weightCategoryLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'FELINE_STANDARD' as WeightClass, label: 'Kucing / Small (< 5 kg)' },
                      { id: 'CANINE_MEDIUM' as WeightClass, label: 'Anjing Sedang (5 - 15 kg)' },
                      { id: 'CANINE_LARGE' as WeightClass, label: 'Anjing Besar (15 - 30 kg)' },
                      { id: 'CANINE_EXTRA_LARGE' as WeightClass, label: 'Ekstra Besar (> 30 kg)' },
                    ].map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setPetWeight(w.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition text-center ${
                          petWeight === w.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Layanan Medis & Urgensi */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-heading font-bold text-lg text-brand-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>{t.step2}</span>
                </h3>

                {/* Urgency Pill Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.urgencyLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'ROUTINE' as UrgencyLevel, label: t.urgencyRoutine, color: 'emerald' },
                      { id: 'URGENT' as UrgencyLevel, label: t.urgencyUrgent, color: 'amber' },
                      { id: 'EMERGENCY' as UrgencyLevel, label: t.urgencyEmergency, color: 'urgent' },
                    ].map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setUrgencyLevel(u.id)}
                        className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                          urgencyLevel === u.id
                            ? u.id === 'EMERGENCY'
                              ? 'border-urgent-600 bg-urgent-50 text-urgent-800 ring-2 ring-urgent-200'
                              : 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{u.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Selection Grid */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    {t.serviceLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {CLINIC_SERVICES.filter((s) => s.category !== 'ADDON').map((service) => {
                      const isSelected = serviceCode === service.code;
                      const title = currentLocale === 'id' ? service.nameId : service.nameEn;

                      return (
                        <div
                          key={service.code}
                          onClick={() => {
                            setServiceCode(service.code);
                            setServiceName(title);
                          }}
                          className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/70 text-brand-900 font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-xs">{title}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Jadwal Kunjungan & Preferensi Dokter */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-heading font-bold text-lg text-brand-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>{t.step3}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Appointment Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white transition"
                    />
                    {errors.date && (
                      <p className="text-xs text-urgent-600 font-semibold mt-1">{errors.date}</p>
                    )}
                  </div>

                  {/* Doctor Preference */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.doctorLabel}
                    </label>
                    <select
                      value={preferredDoctor}
                      onChange={(e) => setPreferredDoctor(e.target.value)}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white transition"
                    >
                      <option value="Dokter Jaga Pertama yang Tersedia">
                        {t.anyDoctor} (Tercepat)
                      </option>
                      <option value="Drh. Albert Wijaya, Sp.MP (Bedah & Ortopedi)">
                        Drh. Albert Wijaya, Sp.MP (Bedah/Ortopedi)
                      </option>
                      <option value="Drh. Sarah Amalia, M.Si (Dermatologi & Rawat Inap)">
                        Drh. Sarah Amalia, M.Si (Dermatologi/Inpatient)
                      </option>
                      <option value="Drh. Reno Pratama (Dental & Umum)">
                        Drh. Reno Pratama (Dental & Umum)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.timeSlotLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Pagi (09:00 - 12:00 WIB)',
                      'Siang (13:00 - 16:00 WIB)',
                      'Sore/Malam (16:30 - 20:30 WIB)',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition text-center ${
                          timeSlot === slot
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Kontak Pemilik & Submit */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-heading font-bold text-lg text-brand-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <User className="w-5 h-5 text-emerald-600" />
                  <span>{t.step4}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Owner Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.ownerNameLabel}
                    </label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder={t.ownerNamePlaceholder}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                    {errors.ownerName && (
                      <p className="text-xs text-urgent-600 font-semibold mt-1">{errors.ownerName}</p>
                    )}
                  </div>

                  {/* Owner WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {t.whatsappLabel}
                    </label>
                    <input
                      type="tel"
                      value={ownerWhatsApp}
                      onChange={(e) => setOwnerWhatsApp(e.target.value)}
                      placeholder={t.whatsappPlaceholder}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    />
                    {errors.whatsapp && (
                      <p className="text-xs text-urgent-600 font-semibold mt-1">{errors.whatsapp}</p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                  {errors.email && (
                    <p className="text-xs text-urgent-600 font-semibold mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Symptoms / Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.notesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={symptomsNotes}
                    onChange={(e) => setSymptomsNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>

                {/* PDP Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dataConsent}
                      onChange={(e) => setDataConsent(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      {t.consentText}
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-urgent-600 font-semibold mt-1">{errors.consent}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.btnBack}</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition"
                >
                  <span>{t.btnNext}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.btnSubmit}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <BookingSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        bookingData={completedBooking}
        currentLocale={currentLocale}
      />
    </section>
  );
};
