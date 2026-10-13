'use client';

import React, { useState, useMemo } from 'react';
import { Locale, Species, WeightClass, ServiceItem } from '@/types';
import { CLINIC_SERVICES } from '@/data/mockData';
import { DICTIONARY } from '@/data/translations';
import {
  Calculator,
  Check,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  Plus,
  Clock,
  HelpCircle,
  Cat,
  Dog,
  Rabbit,
  PawPrint,
} from 'lucide-react';

interface PricingEstimatorProps {
  currentLocale: Locale;
  onEstimateSelected: (params: {
    species: Species;
    weightClass: WeightClass;
    serviceCode: string;
    serviceName: string;
    estimatedCost: number;
  }) => void;
}

export const PricingEstimator: React.FC<PricingEstimatorProps> = ({ currentLocale, onEstimateSelected }) => {
  const t = DICTIONARY[currentLocale].estimator;

  // State Management
  const [selectedSpecies, setSelectedSpecies] = useState<Species>('CAT');
  const [selectedWeight, setSelectedWeight] = useState<WeightClass>('FELINE_STANDARD');
  const [selectedServiceCode, setSelectedServiceCode] = useState<string>('VAC-FEL-F3');
  const [inpatientDays, setInpatientDays] = useState<number>(1);
  const [selectedAddonCodes, setSelectedAddonCodes] = useState<string[]>(['LAB-CBC']);
  const [emergencyActive, setEmergencyActive] = useState<boolean>(false);

  // Filter services by species compatibility
  const availableServices = useMemo(() => {
    return CLINIC_SERVICES.filter((service) => {
      if (service.category === 'ADDON') return false; // Handled separately
      if (service.requiresSpecies && service.requiresSpecies !== selectedSpecies) return false;
      return true;
    });
  }, [selectedSpecies]);

  // Available addons
  const availableAddons = useMemo(() => {
    return CLINIC_SERVICES.filter((s) => s.category === 'ADDON' || s.category === 'LAB');
  }, []);

  // Weight multipliers
  const weightMultiplier = useMemo(() => {
    if (selectedSpecies === 'CAT' || selectedSpecies === 'RABBIT' || selectedSpecies === 'BIRD_EXOTIC') {
      return 1.0;
    }
    switch (selectedWeight) {
      case 'CANINE_TOY_MINI':
        return 1.0;
      case 'CANINE_MEDIUM':
        return 1.25;
      case 'CANINE_LARGE':
        return 1.6;
      case 'CANINE_EXTRA_LARGE':
        return 2.0;
      default:
        return 1.0;
    }
  }, [selectedSpecies, selectedWeight]);

  // Selected Primary Service
  const primaryService = useMemo(() => {
    const found = CLINIC_SERVICES.find((s) => s.code === selectedServiceCode);
    return found || availableServices[0] || CLINIC_SERVICES[0];
  }, [selectedServiceCode, availableServices]);

  // Update weight default when species changes
  const handleSpeciesChange = (species: Species) => {
    setSelectedSpecies(species);
    if (species === 'CAT') {
      setSelectedWeight('FELINE_STANDARD');
      setSelectedServiceCode('VAC-FEL-F3');
    } else if (species === 'DOG') {
      setSelectedWeight('CANINE_MEDIUM');
      setSelectedServiceCode('VAC-CAN-5');
    } else {
      setSelectedWeight('FELINE_STANDARD');
      setSelectedServiceCode('CONS-GEN');
    }
  };

  const toggleAddon = (code: string) => {
    setSelectedAddonCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // Calculation logic
  const calculation = useMemo(() => {
    const isIdr = currentLocale === 'id';
    const basePrice = isIdr ? primaryService.basePriceIdr : primaryService.basePriceUsd;

    // Apply multiplier only if service applies weight multiplier
    let calculatedBase = basePrice;
    if (primaryService.appliesWeightMultiplier) {
      calculatedBase = basePrice * weightMultiplier;
    }

    // Inpatient multi-day factor
    if (primaryService.category === 'INPATIENT') {
      calculatedBase = calculatedBase * inpatientDays;
    }

    // Add-ons total
    let addonsTotal = 0;
    selectedAddonCodes.forEach((code) => {
      const addon = CLINIC_SERVICES.find((s) => s.code === code);
      if (addon) {
        addonsTotal += isIdr ? addon.basePriceIdr : addon.basePriceUsd;
      }
    });

    // Emergency surcharge
    const emergencySurcharge = emergencyActive ? (isIdr ? 250000 : 17) : 0;

    const total = calculatedBase + addonsTotal + emergencySurcharge;

    return {
      basePrice,
      calculatedBase,
      addonsTotal,
      emergencySurcharge,
      total,
      weightMultiplier,
    };
  }, [primaryService, weightMultiplier, inpatientDays, selectedAddonCodes, emergencyActive, currentLocale]);

  const formatCurrency = (val: number) => {
    if (currentLocale === 'id') {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const handleApplyToBooking = () => {
    const serviceName = currentLocale === 'id' ? primaryService.nameId : primaryService.nameEn;
    onEstimateSelected({
      species: selectedSpecies,
      weightClass: selectedWeight,
      serviceCode: primaryService.code,
      serviceName,
      estimatedCost: calculation.total,
    });

    // Smooth scroll to booking
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-16 lg:py-24 bg-[#F2F6FA] border-b border-[#CCD8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-[#CCD8E2] text-[#1E3A5F] text-xs font-bold px-3 py-1.5 rounded-full mb-3 shadow-2xs">
            <Calculator className="w-4 h-4 text-[#1E3A5F]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#111827] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Parameter Inputs (8 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#D5DFE8] shadow-sm">
            {/* Step 1: Species Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                {t.selectSpecies}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'CAT' as Species, label: 'Kucing (Cat)', icon: Cat },
                  { id: 'DOG' as Species, label: 'Anjing (Dog)', icon: Dog },
                  { id: 'RABBIT' as Species, label: 'Eksotik (Exotic)', icon: Rabbit },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedSpecies === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSpeciesChange(item.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all text-center active:scale-[0.98] cursor-pointer ${
                        isSelected
                          ? 'border-[#111827] bg-[#111827] text-white font-bold shadow-md'
                          : 'border-[#E2EAF1] bg-[#F8FAFC] text-slate-700 hover:border-[#CCD8E2]'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl mb-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-2xs'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Weight Category (Only shown if Dog, or info pill if Cat) */}
            {selectedSpecies === 'DOG' ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-900">
                    {t.selectWeight}
                  </label>
                  <span className="text-xs text-emerald-700 font-bold">
                    Multiplier: {weightMultiplier}x
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'CANINE_TOY_MINI' as WeightClass, label: 'Toy / Mini (< 5 kg)', mult: '1.0x' },
                    { id: 'CANINE_MEDIUM' as WeightClass, label: 'Sedang (5 - 15 kg)', mult: '1.25x' },
                    { id: 'CANINE_LARGE' as WeightClass, label: 'Besar (15 - 30 kg)', mult: '1.6x' },
                    { id: 'CANINE_EXTRA_LARGE' as WeightClass, label: 'Ekstra (> 30 kg)', mult: '2.0x' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWeight(w.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                        selectedWeight === w.id
                          ? 'border-[#111827] bg-[#111827] text-white shadow-sm'
                          : 'border-[#E2EAF1] bg-[#F8FAFC] text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold">{w.label}</div>
                      <div className={selectedWeight === w.id ? 'text-slate-300 text-[10px]' : 'text-slate-400 text-[10px]'}>
                        Faktor: {w.mult}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-normal">{t.weightNotice}</p>
              </div>
            ) : (
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#D5DFE8] text-xs text-slate-600 flex items-center gap-2">
                <span className="font-bold text-[#111827]">Bobot Pasien:</span>
                <span>Standar Spesies (Flat Rate Multiplier 1.0x)</span>
              </div>
            )}

            {/* Step 3: Primary Medical Service Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                {t.selectService}
              </label>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {availableServices.map((service) => {
                  const isSelected = selectedServiceCode === service.code;
                  const name = currentLocale === 'id' ? service.nameId : service.nameEn;
                  const desc = currentLocale === 'id' ? service.descriptionId : service.descriptionEn;
                  const basePriceFormatted = formatCurrency(
                    currentLocale === 'id' ? service.basePriceIdr : service.basePriceUsd
                  );

                  return (
                    <div
                      key={service.code}
                      onClick={() => setSelectedServiceCode(service.code)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#111827] bg-[#FDF6F1] shadow-xs'
                          : 'border-[#E2EAF1] bg-white hover:border-[#CCD8E2]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center shrink-0 border ${
                            isSelected ? 'bg-[#111827] border-[#111827] text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#111827]">{name}</p>
                          <p className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">{desc}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-[#111827] font-heading">
                          {basePriceFormatted}
                        </span>
                        {service.appliesWeightMultiplier && selectedSpecies === 'DOG' && (
                          <span className="block text-[10px] text-emerald-700 font-semibold">+bobot</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inpatient Days Slider (If service is Inpatient) */}
              {primaryService.category === 'INPATIENT' && (
                <div className="mt-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#CCD8E2]">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
                    <span>Estimasi Durasi Rawat Inap:</span>
                    <span className="text-[#111827] text-sm font-extrabold">{inpatientDays} Hari / Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={inpatientDays}
                    onChange={(e) => setInpatientDays(parseInt(e.target.value))}
                    className="w-full accent-[#111827] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Hari (Observasi)</span>
                    <span>3 Hari (Standar)</span>
                    <span>7 Hari (Kritis/Parvo)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Add-ons & Diagnostics */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                {t.selectAddons}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddonCodes.includes(addon.code);
                  const name = currentLocale === 'id' ? addon.nameId : addon.nameEn;
                  const price = formatCurrency(currentLocale === 'id' ? addon.basePriceIdr : addon.basePriceUsd);

                  return (
                    <div
                      key={addon.code}
                      onClick={() => toggleAddon(addon.code)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between gap-2 transition-all ${
                        isChecked
                          ? 'border-[#111827] bg-[#FDF6F1] font-semibold'
                          : 'border-[#E2EAF1] bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-[#111827] border-[#111827] text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-[11px] text-slate-800 line-clamp-1">{name}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11px] shrink-0">{price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Surcharge Toggle */}
            <div className="pt-2 border-t border-[#E2EAF1]">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FDF2F2] border border-[#F5C2C2] cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={emergencyActive}
                    onChange={(e) => setEmergencyActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#A83232] focus:ring-[#A83232] accent-[#A83232] cursor-pointer"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#8F2828] block">{t.emergencyToggle}</span>
                    <span className="text-[11px] text-[#A83232] font-normal">Kunjungan di luar jam 08:00 - 22:00 WIB</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#A83232]">
                  +{formatCurrency(currentLocale === 'id' ? 250000 : 17)}
                </span>
              </label>
            </div>
          </div>

          {/* Right Column: Live Calculation Summary Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#111827] text-white p-6 sm:p-7 rounded-3xl shadow-xl shadow-brand-950/20 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-heading font-bold text-lg text-white">{t.breakdownTitle}</h3>
                </div>
                <span className="text-xs font-medium text-slate-400">AlfaCare Benchmark</span>
              </div>

              {/* Breakdown Items List */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-start text-slate-300">
                  <div>
                    <span className="block font-medium">{t.baseFee}</span>
                    <span className="text-[11px] text-emerald-400">
                      {currentLocale === 'id' ? primaryService.nameId : primaryService.nameEn}
                    </span>
                  </div>
                  <span className="font-bold text-white font-heading">
                    {formatCurrency(calculation.basePrice)}
                  </span>
                </div>

                {primaryService.appliesWeightMultiplier && selectedSpecies === 'DOG' && (
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-medium">{t.weightMultiplierLabel}</span>
                    <span className="font-bold text-emerald-300">{weightMultiplier}x</span>
                  </div>
                )}

                {primaryService.category === 'INPATIENT' && (
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-medium">Durasi Rawat Inap</span>
                    <span className="font-bold text-emerald-300">{inpatientDays} Hari</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-medium">{t.addonsFee}</span>
                  <span className="font-bold text-white font-heading">
                    {formatCurrency(calculation.addonsTotal)}
                  </span>
                </div>

                {emergencyActive && (
                  <div className="flex justify-between items-center text-rose-300">
                    <span className="font-medium">{t.emergencyFee}</span>
                    <span className="font-bold text-rose-400 font-heading">
                      +{formatCurrency(calculation.emergencySurcharge)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Price Display */}
              <div className="bg-[#0B0F17] p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-semibold block mb-1">
                  {t.totalEstimate}
                </span>
                <div className="text-3xl sm:text-4xl font-heading font-black text-emerald-400 tracking-tight tabular-nums">
                  {formatCurrency(calculation.total)}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  *Perkiraan Biaya Transparan (Tanpa Biaya Terselubung)
                </span>
              </div>

              {/* Medical Notice Box */}
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-300 text-[11px] leading-relaxed flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{t.disclaimerTitle}</span>
                  <p>{t.disclaimerText}</p>
                </div>
              </div>

              {/* Action Button Bridge */}
              <button
                type="button"
                onClick={handleApplyToBooking}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-[#111827] font-heading font-black text-sm sm:text-base py-4 px-6 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.ctaLockEstimate}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
