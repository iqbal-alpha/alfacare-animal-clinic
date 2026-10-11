'use client';

import React, { useState } from 'react';
import { CaseStudyItem, Locale } from '@/types';
import { DICTIONARY } from '@/data/translations';
import { X, CheckCircle2, Star, Calendar, Stethoscope, ArrowRight } from 'lucide-react';

interface CaseStudyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudyItem | null;
  currentLocale: Locale;
  onConsultSimilar: () => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  isOpen,
  onClose,
  caseStudy,
  currentLocale,
  onConsultSimilar,
}) => {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');
  if (!isOpen || !caseStudy) return null;

  const t = DICTIONARY[currentLocale].cases;
  const title = caseStudy.title[currentLocale];
  const summary = caseStudy.clinicalSummary[currentLocale];
  const review = caseStudy.ownerReviewQuote[currentLocale];
  const recovery = caseStudy.recoveryDuration[currentLocale];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Before/After Presentation */}
        <div className="relative aspect-video bg-slate-900">
          <img
            src={activeTab === 'after' ? caseStudy.afterImageUrl : caseStudy.beforeImageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

          {/* Toggle Before/After Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/20">
            <button
              onClick={() => setActiveTab('before')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                activeTab === 'before' ? 'bg-urgent-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Kondisi Awal (Before)
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                activeTab === 'after' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Sembuh Total (After)
            </button>
          </div>

          {/* Patient Quick Info at bottom of photo */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md">
              {recovery}
            </span>
            <h3 className="text-lg sm:text-xl font-heading font-black mt-1 line-clamp-1">{title}</h3>
            <p className="text-xs text-slate-300">
              Pasien: {caseStudy.petName} ({caseStudy.breed}, {caseStudy.age})
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Attending Vet */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-800 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-semibold">{t.vetInCharge}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{caseStudy.veterinarianName}</p>
              <p className="text-[10px] text-slate-500">{caseStudy.veterinarianTitle}</p>
            </div>
          </div>

          {/* Clinical Procedure Notes */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.clinicalSummaryTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-white p-3.5 rounded-xl border border-slate-200">
              {summary}
            </p>
          </div>

          {/* Verified Review Quote */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-emerald-800">Ulasan Terverifikasi</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
              {review}
            </p>
            <p className="text-[11px] font-bold text-slate-900 text-right">- {caseStudy.ownerName}</p>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onConsultSimilar();
              }}
              className="w-full bg-brand-800 hover:bg-brand-900 text-white font-heading font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{t.btnConsultSimilar}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
