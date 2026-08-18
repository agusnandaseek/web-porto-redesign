import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle, FileText } from 'lucide-react';

export default function FAQ({ lang }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: lang === 'ID' ? 'Bagaimana proses kerja dan alur kolaborasi?' : 'How does the project collaboration process work?',
      a: lang === 'ID'
        ? 'Proses dimulai dari Diskusi Ide & Briefing -> Penawaran & Scope -> Eksekusi (Shoot / Coding) -> Revisi -> Penyerahan Final File / Live Website Deployment.'
        : 'Process starts from Briefing & Ideation -> Timeline Agreement -> Execution (Shooting / Dev) -> Review & Revision -> Final Delivery / Live Deployment.',
      color: 'bg-[#FFC93C] text-[#0A0A0A]',
    },
    {
      q: lang === 'ID' ? 'Berapa lama estimasi pengerjaan project?' : 'What is the estimated turnaround time?',
      a: lang === 'ID'
        ? 'Foto event: 2-4 hari kerja. Video recap / Reels: 3-5 hari kerja. Fullstack Web App: 1-3 minggu tergantung skala fitur.'
        : 'Event Photography: 2-4 business days. Video Recap / Reels: 3-5 business days. Web App: 1-3 weeks depending on feature complexity.',
      color: 'bg-[#3B6EF5] text-white',
    },
    {
      q: lang === 'ID' ? 'Apakah bisa melayani panggilan luar kota Bali?' : 'Are you available for projects outside Bali?',
      a: lang === 'ID'
        ? 'Sangat bisa! Untuk project Fotografi/Videografi luar pulau Bali dapat didiskusikan akomodasi & transportasi. Untuk project Web Dev 100% remote.'
        : 'Yes! On-site photo/video shoots outside Bali are welcome with travel arrangements. Web Development is 100% remote-friendly.',
      color: 'bg-[#FF5C8A] text-white',
    },
    {
      q: lang === 'ID' ? 'Platform dan format file apa saja yang diserahkan?' : 'What file formats and deliverables are included?',
      a: lang === 'ID'
        ? 'Foto: High-Res JPEG sRGB. Video: 4K / 1080p MP4 H.264 / ProRes Color Graded. Web: Source code GitHub & Live Vercel/Supabase Deployment.'
        : 'Photo: High-Res Color Graded JPEG. Video: 4K 60fps MP4 Reels/16:9. Web: Clean Source Code + Vercel Deployment.',
      color: 'bg-[#4CE0D2] text-[#0A0A0A]',
    },
  ];

  return (
    <section id="faq" className="relative min-h-auto max-h-none lg:min-h-[calc(100vh-5rem)] lg:max-h-[1080px] py-6 sm:py-8 lg:py-6 border-b-[2.5px] border-[#0A0A0A] bg-[#FAFAF7] overflow-hidden flex flex-col justify-between select-none">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-between gap-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-md font-mono text-[10px] sm:text-[11px] font-extrabold mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>CARA KERJA SAMA & FAQ</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A]">
              FREQUENTLY ASKED QUESTIONS<span className="text-[#FFC93C]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono font-bold text-[#0A0A0A]/75 max-w-xs text-right hidden sm:block pr-6 sm:pr-8">
            {lang === 'ID'
              ? 'Jawaban cepat untuk pertanyaan seputar estimasi pengerjaan & mekanisme kerja.'
              : 'Quick answers regarding project turnaround, file formats, and collaboration.'}
          </p>
        </div>

        {/* Info Banner */}
        <div className="p-2 sm:p-2.5 px-3 sm:px-3.5 bg-[#FFC93C]/20 border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 sm:px-2.5 py-0.5 bg-[#0A0A0A] text-white font-mono text-[10px] sm:text-[11px] font-extrabold rounded">
              FAQ GUIDE
            </span>
            <span className="text-[11px] sm:text-sm font-bold text-[#0A0A0A]/85 font-mono">
              TOTAL {faqs.length} CORE QUESTIONS & ANSWERS
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-mono font-bold text-[#0A0A0A]/60">
            KLIK PERTANYAAN UNTUK BUKA/TUTUP JAWABAN
          </span>
        </div>

        {/* Accordions Container (Scaled to fit 1 screen) */}
        <div className="space-y-2.5 sm:space-y-3.5 flex-1 my-auto flex flex-col justify-center">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[5px_5px_0px_#0A0A0A] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full p-3.5 sm:p-4.5 text-left flex items-center justify-between gap-3 sm:gap-4 font-heading font-extrabold text-sm sm:text-lg transition-colors cursor-pointer ${
                    isOpen ? faq.color : 'bg-white hover:bg-gray-50 text-[#0A0A0A]'
                  }`}
                >
                  <span className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 border border-[#0A0A0A] bg-white text-[#0A0A0A] rounded font-bold shadow-sm">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <div className="p-1 bg-white text-[#0A0A0A] border-[1.5px] border-[#0A0A0A] shadow-[1.5px_1.5px_0px_#0A0A0A] sm:shadow-[2px_2px_0px_#0A0A0A] rounded-lg shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                    ) : (
                      <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-3.5 sm:p-5 bg-white border-t-[2px] border-[#0A0A0A]">
                    <p className="text-xs sm:text-sm text-[#0A0A0A]/90 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
