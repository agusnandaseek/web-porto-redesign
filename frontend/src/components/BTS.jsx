import React, { useState, useEffect } from 'react';
import { Camera, Users, Sparkles, Film, ChevronLeft, ChevronRight, Clapperboard } from 'lucide-react';
import { getSectionData, subscribeCmsChanges } from '../utils/adminStorage';

export default function BTS({ lang }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [btsItems, setBtsItems] = useState(() => getSectionData('bts') || []);

  useEffect(() => {
    const unsub = subscribeCmsChanges(() => {
      setBtsItems(getSectionData('bts') || []);
    });
    return () => unsub();
  }, []);

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(btsItems.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = btsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section id="bts" className="relative min-h-auto max-h-none lg:min-h-[calc(100vh-5rem)] lg:max-h-[1080px] py-6 sm:py-8 lg:py-6 border-b-[2.5px] border-[#0A0A0A] bg-[#FAFAF7] overflow-hidden flex flex-col justify-between select-none">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-between gap-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-3 shrink-0 gap-2 sm:gap-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FF5C8A] text-white border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-md font-mono text-[10px] sm:text-[11px] font-extrabold mb-1">
              <Film className="w-3.5 h-3.5" />
              <span>PROSES & DIBALIK LAYAR</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A]">
              BEHIND THE SCENES<span className="text-[#FF5C8A]">.</span>
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm font-mono font-bold text-[#0A0A0A]/75 max-w-xs text-right hidden lg:block pr-4">
              {lang === 'ID'
                ? 'Dokumentasi proses pembuatan karya & kolaborasi tim di lapangan.'
                : 'Behind the scenes photos of real production processes & team setups.'}
            </p>

            {/* NEXT / PREV PAGINATION CONTROLS */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="whitespace-nowrap px-3 py-1.5 bg-[#FF5C8A] text-white border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-xl font-mono text-xs font-extrabold flex items-center justify-center shrink-0">
                PAGE {currentPage} / {totalPages}
              </span>

              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`p-1.5 sm:p-2 bg-white text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl flex items-center justify-center transition-all ${
                  currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer hover:bg-gray-100'
                }`}
                title="Previous BTS"
              >
                <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 stroke-[3]" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-1.5 sm:p-2 bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl flex items-center justify-center transition-all ${
                  currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer hover:bg-[#f0b722]'
                }`}
                title="Next BTS"
              >
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-2 sm:p-2.5 px-3 sm:px-3.5 bg-[#4CE0D2]/20 border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 sm:px-2.5 py-0.5 bg-[#0A0A0A] text-white font-mono text-[10px] sm:text-[11px] font-extrabold rounded">
              ARCHIVE
            </span>
            <span className="text-[11px] sm:text-sm font-bold text-[#0A0A0A]/85 font-mono">
              TOTAL {btsItems.length} BTS STORY(S) • PAGE {currentPage} OF {totalPages}
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-mono font-bold text-[#0A0A0A]/60">
            GUNAKAN TOMBOL PANAH [ ◄ ► ] UNTUK NAVIGASI GALLERY
          </span>
        </div>

        {/* BTS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 flex-1 items-stretch my-auto">
          {displayedItems.map((item, idx) => {
            const colors = ['bg-[#FFC93C] text-[#0A0A0A]', 'bg-[#FF5C8A] text-white', 'bg-[#4CE0D2] text-[#0A0A0A]', 'bg-[#3B6EF5] text-white', 'bg-[#A3E635] text-[#0A0A0A]', 'bg-[#A78BFA] text-white'];
            const badgeColor = item.color || colors[idx % colors.length];
            return (
              <div
                key={item.id || idx}
                className="bg-white border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[9px_9px_0px_#0A0A0A] transition-all duration-200 h-full"
              >
                <div className="flex flex-col justify-between flex-1 space-y-2.5 sm:space-y-3">
                  {/* Photo Frame Container */}
                  <div className="relative aspect-[16/10] min-h-[190px] sm:min-h-[240px] max-h-[300px] overflow-hidden rounded-xl border-[2px] sm:border-[2.5px] border-[#0A0A0A] bg-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Top Badge */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                      <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[10px] sm:text-xs font-extrabold border border-[#0A0A0A] sm:border-[1.5px] rounded-md shadow-sm flex items-center gap-1.5 ${badgeColor}`}>
                        <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        <span>{item.tag}</span>
                      </span>
                    </div>

                    {/* Bottom Location Tag */}
                    <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2 py-0.5 bg-[#0A0A0A]/85 text-white font-mono text-[9px] sm:text-[10px] font-bold rounded border border-[#0A0A0A]">
                      📍 {item.location}
                    </div>
                  </div>

                  {/* Info Text */}
                  <div>
                    <h3 className="font-heading font-extrabold text-base sm:text-xl text-[#0A0A0A] group-hover:text-[#FF5C8A] transition-colors leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#0A0A0A]/85 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Specs */}
                <div className="pt-2.5 sm:pt-3 border-t-[2px] border-[#0A0A0A]/15 flex items-center justify-between text-[11px] sm:text-xs font-mono font-extrabold text-[#0A0A0A]/70 shrink-0 mt-2.5 sm:mt-3">
                  <span className="flex items-center gap-1">
                    <Clapperboard className="w-3.5 h-3.5 text-[#3B6EF5]" />
                    <span>ON-FIELD CREW</span>
                  </span>
                  <span className="px-2 py-0.5 bg-[#A3E635] text-[#0A0A0A] border border-[#0A0A0A] rounded text-[9px] sm:text-[10px]">
                    PROD {item.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
