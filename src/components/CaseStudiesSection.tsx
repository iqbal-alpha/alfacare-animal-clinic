'use client';

import React, { useState, useMemo } from 'react';
import { Locale, CaseStudyItem } from '@/types';
import { CASE_STUDIES } from '@/data/mockData';
import { DICTIONARY } from '@/data/translations';
import { CaseStudyDetailModal } from './CaseStudyDetailModal';
import { Sparkles, Star, ChevronRight, Award, Check } from 'lucide-react';

interface CaseStudiesSectionProps {
  currentLocale: Locale;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ currentLocale }) => {
  const t = DICTIONARY[currentLocale].cases;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null);

  // Filter items
  const filteredCases = useMemo(() => {
    if (activeFilter === 'all') return CASE_STUDIES;
    if (activeFilter === 'cats') return CASE_STUDIES.filter((c) => c.species === 'CAT');
    if (activeFilter === 'dogs') return CASE_STUDIES.filter((c) => c.species === 'DOG');
    return CASE_STUDIES.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  const handleConsultSimilar = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cases" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-brand-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'emergency', label: t.filterEmergency },
            { id: 'dermatology', label: t.filterDermatology },
            { id: 'dental', label: t.filterDental },
            { id: 'inpatient', label: t.filterInpatient },
            { id: 'cats', label: t.filterCats },
            { id: 'dogs', label: t.filterDogs },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`text-xs font-bold px-4 py-2.5 rounded-full transition whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-brand-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCases.map((item) => {
            const title = item.title[currentLocale];
            const recovery = item.recoveryDuration[currentLocale];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.afterImageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Recovery Pill */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-800 shadow-sm flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span>{recovery}</span>
                  </div>

                  {/* Species Tag */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-bold block drop-shadow-sm">{item.petName}</span>
                    <span className="text-[11px] text-slate-200 font-medium">{item.breed}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h3 className="font-heading font-bold text-sm text-brand-900 group-hover:text-emerald-700 transition line-clamp-2 leading-snug">
                      {title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px] font-medium">{item.veterinarianName.split(',')[0]}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                      <span>Detail</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyDetailModal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        caseStudy={selectedCase}
        currentLocale={currentLocale}
        onConsultSimilar={handleConsultSimilar}
      />
    </section>
  );
};
