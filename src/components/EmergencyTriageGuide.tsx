'use client';

import React from 'react';
import { Locale } from '@/types';
import { AlertCircle, Activity, Heart, ShieldAlert, PhoneCall } from 'lucide-react';

interface EmergencyTriageGuideProps {
  currentLocale: Locale;
}

export const EmergencyTriageGuide: React.FC<EmergencyTriageGuideProps> = ({ currentLocale }) => {
  const isId = currentLocale === 'id';

  const triageTips = isId
    ? [
        {
          title: 'Trauma & Pendarahan Aktif',
          desc: 'Tekan lembut area luka dengan kain bersih steril. Jangan pasang tourniquet ketat. Jaga pasien tetap hangat saat perjalanan ke klinik.',
          badge: 'Gawat Darurat',
        },
        {
          title: 'Sesak Napas / Tersedak',
          desc: 'Periksa mulut dari benda asing hanya jika aman tanpa risiko digigit. Pastikan leher lurus dan hindari tekanan pada dada.',
          badge: 'Prioritas Merah',
        },
        {
          title: 'Dugaan Keracunan',
          desc: 'Jangan paksa memuntahkan tanpa instruksi dokter. Bawa sampel atau foto kemasan racun/zat yang tertelan untuk identifikasi antidot cepat.',
          badge: 'Penanganan Instan',
        },
        {
          title: 'Kejang / Tidak Sadar',
          desc: 'Jauhkan dari benda tajam, redupkan lampu, dan jangan masukkan tangan ke dalam mulut hewan. Catat durasi kejang dengan stopwatch.',
          badge: 'Observasi Kritis',
        },
      ]
    : [
        {
          title: 'Trauma & Active Hemorrhage',
          desc: 'Apply direct gentle pressure with a clean sterile cloth. Keep the patient warm and minimize movement during transport.',
          badge: 'Critical Trauma',
        },
        {
          title: 'Respiratory Distress / Choking',
          desc: 'Gently inspect airway for foreign objects only if safe. Keep the neck elongated and avoid pressure on the chest wall.',
          badge: 'Priority Red',
        },
        {
          title: 'Poisoning / Toxin Ingestion',
          desc: 'Do not induce vomiting unless advised by the vet. Bring the container or a photo of the ingested substance to the clinic.',
          badge: 'Immediate Triage',
        },
        {
          title: 'Seizures / Collapse',
          desc: 'Clear the area of hazards, dim lights, and do not place fingers inside the mouth. Time the duration of the seizure episode.',
          badge: 'Critical Observation',
        },
      ];

  return (
    <section className="py-14 bg-gradient-to-b from-slate-900 to-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-urgent-500/20 text-urgent-300 border border-urgent-500/30 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              <ShieldAlert className="w-4 h-4 text-urgent-400" />
              <span>{isId ? 'Panduan Pertolongan Pertama Medis' : 'Veterinary First-Aid Protocol'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white">
              {isId ? 'Triase Darurat Sebelum Tiba di AlfaCare' : 'Emergency Triage Protocol En Route'}
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              {isId
                ? 'Langkah pertolongan pertama yang tepat dapat menyelamatkan nyawa peliharaan Anda sebelum tiba di ruang IGD kami.'
                : 'Proper initial first aid en route dramatically increases clinical survival rates before reaching our emergency unit.'}
            </p>
          </div>

          <a
            href="tel:+622155550199"
            className="inline-flex items-center gap-2 bg-urgent-600 hover:bg-urgent-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-urgent-600/30 emergency-glow transition shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isId ? 'Panggil Dokter Darurat Sekarang' : 'Call Emergency Hotline'}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {triageTips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 hover:border-slate-600 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-urgent-950/80 text-urgent-300 border border-urgent-800 px-2 py-0.5 rounded">
                  {tip.badge}
                </span>
                <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
              </div>
              <h3 className="font-heading font-bold text-base text-white">{tip.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
