import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Phone, Mail, X } from 'lucide-react';
import { InstagramIcon, GithubIcon } from './Icons';
import { getSectionData, subscribeCmsChanges } from '../utils/adminStorage';

export default function Hero({ lang }) {
  const [heroData, setHeroData] = useState(() => getSectionData('hero'));

  useEffect(() => {
    const unsub = subscribeCmsChanges(() => {
      setHeroData(getSectionData('hero'));
    });
    return () => unsub();
  }, []);

  const galleryItems = heroData.heroFootage || [
    {
      id: 1,
      filename: 'FKW5_FESTIVAL.JPG',
      tag: 'EVENT',
      headerBg: 'bg-[#FFC93C] text-[#0A0A0A]',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      gridClass: 'col-span-6 md:col-span-4 aspect-[16/10]',
    },
    {
      id: 2,
      filename: 'STAGE_PROD.MOV',
      tag: 'VIDEOGRAPHY',
      headerBg: 'bg-[#4CE0D2] text-[#0A0A0A]',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
      gridClass: 'col-span-6 md:col-span-4 aspect-[16/10]',
    },
    {
      id: 3,
      filename: 'PORTRAIT_01.RAW',
      tag: 'PHOTO',
      headerBg: 'bg-[#A78BFA] text-white',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      gridClass: 'col-span-12 md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-auto',
    },
    {
      id: 4,
      filename: 'DEV_WORKSPACE.PNG',
      tag: 'FULLSTACK',
      headerBg: 'bg-[#FFC93C] text-[#0A0A0A]',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      gridClass: 'col-span-12 md:col-span-8 aspect-[16/9]',
    },
    {
      id: 5,
      filename: 'REELS_RECAP.MP4',
      tag: 'EDITING',
      headerBg: 'bg-[#4CE0D2] text-[#0A0A0A]',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
      gridClass: 'col-span-12 md:col-span-4 aspect-[16/10]',
    },
    {
      id: 6,
      filename: 'LIVE_CONCERT.MOV',
      tag: 'CONCERT',
      headerBg: 'bg-[#3B6EF5] text-white',
      img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80',
      gridClass: 'col-span-12 md:col-span-4 aspect-[16/10]',
    },
    {
      id: 7,
      filename: 'SWEET17_USS.JPG',
      tag: 'EVENT PHOTO',
      headerBg: 'bg-[#A3E635] text-[#0A0A0A]',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80',
      gridClass: 'col-span-12 md:col-span-4 aspect-[16/10]',
    },
  ];

  return (
    <section className="relative w-full border-b-[2.5px] border-[#0A0A0A] bg-[#FAFAF7] overflow-hidden select-none">
      
      {/* SPLIT SCREEN CONTAINER: LEFT GRID PAPER (col-5) & RIGHT PINK GALLERY SECTION (col-7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
        
        {/* LEFT COLUMN: Grid Paper Background (Centered on mobile, left-aligned on desktop) */}
        <div className="col-span-1 lg:col-span-5 px-5 py-10 sm:p-10 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative bg-[linear-gradient(to_right,#0a0a0a0d_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a0d_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:28px_28px] overflow-hidden min-h-[calc(100vh-5rem)]">
          
          <div className="space-y-6 sm:space-y-7 my-auto w-full max-w-sm sm:max-w-xl scale-100 lg:scale-[1.10] origin-center lg:origin-left transition-transform flex flex-col items-center lg:items-start">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A78BFA] text-white border-[2.5px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl font-mono text-xs sm:text-sm font-extrabold -rotate-1 hover:rotate-0 transition-transform">
              <span>{heroData.greeting || "HEY, I'M AGUS NANDA 👋"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.05] text-[#0A0A0A] text-center lg:text-left w-full">
              {heroData.headline1 || 'CREATIVE'} <br />
              <span className="inline-block mt-2.5 px-4 py-1 sm:px-5 sm:py-1.5 bg-[#FFC93C] text-[#0A0A0A] border-[2.5px] sm:border-[3px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] rounded-2xl -rotate-1">
                {heroData.headline2 || 'FREELANCER'}
              </span>
            </h1>

            {/* Sub-headline / Roles */}
            <p className="font-mono text-xs sm:text-sm lg:text-base font-extrabold text-[#0A0A0A] tracking-wider uppercase text-center lg:text-left">
              {heroData.roles || 'PHOTOGRAPHY • VIDEOGRAPHY • FULLSTACK DEV'}
            </p>

            {/* Paragraph Description */}
            <p className="text-xs sm:text-sm lg:text-base font-medium text-[#0A0A0A]/90 leading-relaxed font-mono text-center lg:text-left max-w-md lg:max-w-none px-1 sm:px-0">
              {heroData.description ||
                (lang === 'ID'
                  ? 'Saya memadukan seni cerita visual melalui Fotografi & Videografi, serta membangun website modern dengan kode yang bersih dan responsif.'
                  : 'I blend visual storytelling through Photography & Videography, and build scalable web applications with clean, efficient code.')}
            </p>

            {/* CTA Buttons - Side by Side on Mobile & Desktop */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5 pt-1.5 w-full max-w-sm sm:max-w-md">
              <a
                href={heroData.ctaPrimaryUrl || '#portfolio'}
                className="px-3 sm:px-5 py-3.5 bg-[#A3E635] text-[#0A0A0A] font-heading font-extrabold text-xs sm:text-sm rounded-xl border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#0A0A0A] transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <span>{heroData.ctaPrimaryLabel || (lang === 'ID' ? 'LIHAT PORTFOLIO' : 'VIEW MY WORK')}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3] shrink-0" />
              </a>

              <a
                href={heroData.ctaSecondaryUrl || '#contact'}
                className="px-3 sm:px-5 py-3.5 bg-white text-[#0A0A0A] font-heading font-extrabold text-xs sm:text-sm rounded-xl border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#0A0A0A] transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <span>{heroData.ctaSecondaryLabel || (lang === 'ID' ? 'HUBUNGI SAYA' : 'CONTACT ME')}</span>
                <ArrowDown className="w-4 h-4 stroke-[3] shrink-0" />
              </a>
            </div>

            {/* Divider Line */}
            <div className="w-full max-w-sm sm:max-w-md h-[2.5px] bg-[#0A0A0A]/15 my-1.5 mx-auto lg:mx-0" />

            {/* Connect With Me Social Row */}
            <div className="space-y-3 flex flex-col items-center lg:items-start w-full">
              <span className="font-mono text-[11px] sm:text-xs font-extrabold text-[#0A0A0A] uppercase tracking-wider block text-center lg:text-left">
                CONNECT WITH ME
              </span>

              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-3.5">
                <a
                  href={heroData.instagramUrl || 'https://instagram.com/_agus_nanda_'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Kunjungi Profil Instagram Agus Nanda"
                  className="p-3 sm:p-3.5 bg-white text-[#0A0A0A] border-[2.5px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#FF5C8A] hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center"
                  title="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>

                <a
                  href={heroData.whatsappUrl || 'https://wa.me/6281330890140'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Hubungi Agus Nanda via WhatsApp"
                  className="p-3 sm:p-3.5 bg-white text-[#0A0A0A] border-[2.5px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#4CE0D2] hover:-translate-y-0.5 transition-all flex items-center justify-center"
                  title="WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </a>

                <a
                  href={heroData.emailUrl || 'mailto:putuagusnandapratama@gmail.com'}
                  aria-label="Kirim Email ke Putu Agus Nanda Pratama"
                  className="p-3 sm:p-3.5 bg-white text-[#0A0A0A] border-[2.5px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#FFC93C] hover:-translate-y-0.5 transition-all flex items-center justify-center"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>

                <a
                  href={heroData.githubUrl || 'https://github.com'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Kunjungi Profil GitHub Agus Nanda"
                  className="p-3 sm:p-3.5 bg-white text-[#0A0A0A] border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl hover:bg-[#0A0A0A] hover:text-white hover:-translate-y-0.5 transition-all flex items-center justify-center"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Pink Section (`#FF5C8A`) with Dynamic Project Gallery Grid (HIDDEN ON MOBILE, VISIBLE ON DESKTOP) */}
        <div className="hidden lg:flex lg:col-span-7 bg-[#FF5C8A] border-t-[2.5px] lg:border-t-0 lg:border-l-[2.5px] border-[#0A0A0A] p-6 lg:p-8 items-center justify-center relative min-h-[580px]">
          
          {/* Gallery Grid with fixed geometry to eliminate CLS */}
          <div className="w-full grid grid-cols-12 gap-4">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`${item.gridClass || 'col-span-6 md:col-span-4 aspect-[16/10]'} bg-[#FFC93C] border-[2.5px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-[10px] overflow-hidden flex flex-col hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0px_#0A0A0A] transition-all duration-200 group min-h-[120px]`}
              >
                {/* Neobrutalist Window Title Header */}
                <div className={`px-3 py-1.5 border-b-[2.5px] border-[#0A0A0A] ${item.headerBg || 'bg-[#FFC93C] text-[#0A0A0A]'} flex items-center justify-between shrink-0 h-[30px]`}>
                  <span className="font-mono font-extrabold text-[11px] truncate mr-2">{item.filename}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-2 h-2 rounded-full border border-[#0A0A0A] bg-white inline-block" />
                    <X className="w-3 h-3 stroke-[3] shrink-0" />
                  </div>
                </div>

                {/* Media Image Showcase with aspect ratio locking */}
                <div className="relative flex-1 bg-[#1A1A1A] overflow-hidden w-full h-full min-h-[90px]">
                  <img
                    src={item.img}
                    alt={item.filename}
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={idx < 2 ? 'high' : 'auto'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#0A0A0A] text-white border-[1.5px] border-[#0A0A0A] font-mono text-[9px] font-extrabold rounded">
                    {item.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
