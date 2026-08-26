import React, { useState, useEffect } from 'react';
import { Calendar, Languages, Heart, Mail, Phone, Quote, Briefcase, Sparkles, MapPin, Zap, Users, Target, Camera, Code2, Layers, Film, FileText, Download } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { getSectionData, subscribeCmsChanges } from '../utils/adminStorage';

export default function About({ lang }) {
  const [aboutData, setAboutData] = useState(() => getSectionData('about'));

  useEffect(() => {
    const unsub = subscribeCmsChanges(() => {
      setAboutData(getSectionData('about'));
    });
    return () => unsub();
  }, []);

  const experiences = aboutData.experiences || [
    {
      period: '2026 — NOW',
      title: 'BINUS @MALANG',
      subtitle: 'Higher Education Student',
      description: 'Computer Science & Technology student specializing in Software & Multimedia.',
      color: 'bg-[#A3E635] text-[#0A0A0A]',
      badge: 'STUDENT',
    },
    {
      period: '2025 — NOW',
      title: 'NADA UPACARA BALI',
      subtitle: 'Freelance Media Production',
      description: 'Freelance videographer & editor for Reels post production & event documentation.',
      color: 'bg-[#3B6EF5] text-white',
      badge: 'POST-PROD',
    },
    {
      period: '2023 — 2026',
      title: 'SMAN 9 DENPASAR & JURNALISTIK ASA 9',
      subtitle: 'Student Council & Media Coordinator',
      description: 'Koordinator TIK OSIS & Koordinator Bidang Editing Jurnalistik ASA 9.',
      color: 'bg-[#FFC93C] text-[#0A0A0A]',
      badge: 'JOURNALISM',
    },
    {
      period: '2024 — 2025',
      title: 'FREELANCE CREATIVE & DEV',
      subtitle: 'Self-Employed',
      description: 'Specialized in event photography, commercial video editing, & web development.',
      color: 'bg-[#FF5C8A] text-white',
      badge: 'DEV & PHOTO',
    },
  ];

  const toolBadges = [
    { name: 'Sony A6700', bg: 'bg-[#FFC93C] text-[#0A0A0A]', icon: Camera },
    { name: 'DaVinci Resolve', bg: 'bg-[#FF5C8A] text-white', icon: Film },
    { name: 'Adobe Premiere', bg: 'bg-[#A78BFA] text-white', icon: Layers },
    { name: 'React.js', bg: 'bg-[#4CE0D2] text-[#0A0A0A]', icon: Code2 },
    { name: 'Tailwind CSS', bg: 'bg-[#A3E635] text-[#0A0A0A]', icon: Sparkles },
  ];

  return (
    <section id="about" className="relative py-8 sm:py-12 border-b-[2.5px] border-[#0A0A0A] bg-[#FAFAF7] bg-[linear-gradient(to_right,#0a0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a0a_1px,transparent_1px)] bg-[size:24px_24px] overflow-hidden select-none">
      
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-5 sm:space-y-6">
        
        {/* 1. Section Header */}
        <div className="flex items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-md font-mono text-[10px] sm:text-[11px] font-extrabold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT ME • BIOGRAPHY</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A]">
              MEET AGUS NANDA<span className="text-[#FF5C8A]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono font-bold text-[#0A0A0A]/80 max-w-xs text-right hidden sm:block pr-6 sm:pr-8 lg:pr-10">
            {lang === 'ID'
              ? 'Memadukan cerita visual & pengembangan web modern.'
              : 'Blending visual stories with modern web app development.'}
          </p>
        </div>

        {/* 2. Main Grid: Polaroid ID Pass (Left) & Complete Bento Hub (Right) - Desktop has -46px Offset, Mobile centered cleanly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transform-none lg:-translate-x-[46px]">
          
          {/* LEFT COLUMN: Polaroid ID Pass Card + 3 Mini Stat Badge Counters */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-3.5 sm:space-y-4">
            
            <div className="w-full max-w-sm bg-white border-[2.5px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-4 flex flex-col justify-between -rotate-1 hover:rotate-0 transition-transform duration-300 group relative">
              
              {/* Tape Sticker Accent */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 bg-[#FFC93C]/90 border-[1.5px] border-[#0A0A0A] font-mono text-[8px] sm:text-[9px] font-extrabold -rotate-2 shadow-sm z-20 pointer-events-none">
                STICKER • OFFICIAL ID
              </div>

              {/* Lanyard Hole Bar Header */}
              <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-2 shrink-0 pt-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-extrabold text-[#0A0A0A]">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#0A0A0A] inline-block" />
                  <span>ID PASS • VERIFIED CREATIVE</span>
                </div>
                <span className="px-1.5 py-0.5 bg-[#A3E635] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-[8px] sm:text-[9px] font-extrabold rounded">
                  BALI CREW
                </span>
              </div>

              {/* Photo Frame (Real Pas Foto Nanda ImageKit) */}
              <div className="relative aspect-[4/4.5] rounded-xl border-[2px] border-[#0A0A0A] overflow-hidden bg-[#0A0A0A] my-3 shadow-[3px_3px_0px_#0A0A0A]">
                <img
                  src={aboutData.photoUrl || 'https://ik.imagekit.io/nandaporto/portfolio/PAS_FOTO_NANDA_j-lIyw5YJ.png'}
                  alt="Agus Nanda Official Photo"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#FF5C8A] text-white border border-[#0A0A0A] font-mono text-[9px] sm:text-[10px] font-extrabold rounded">
                  {aboutData.roleBadge || 'CREATIVE FREELANCE'}
                </div>

                {/* Stamp Sticker Effect */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#4CE0D2] text-[#0A0A0A] border-[1.5px] border-[#0A0A0A] font-mono text-[8px] sm:text-[9px] font-extrabold rounded -rotate-6 shadow-sm">
                  {aboutData.approvedStamp || 'APPROVED 2026 ✔'}
                </div>

                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-[#0A0A0A]/90 text-white font-mono text-[8px] sm:text-[9px] font-bold rounded">
                  <MapPin className="w-2.5 h-2.5 text-[#FFC93C]" />
                  <span>{aboutData.location || 'DENPASAR, BALI'}</span>
                </div>
              </div>

              {/* ID Details Footer */}
              <div className="space-y-2 shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#0A0A0A] leading-none">{aboutData.name || 'AGUS NANDA'}</h3>
                    <p className="text-[9px] sm:text-[10px] font-mono font-bold text-[#0A0A0A]/60">{aboutData.fullName || 'PUTU AGUS NANDA PRATAMA'}</p>
                  </div>
                  <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#FFC93C] border border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-lg flex items-center justify-center font-heading font-extrabold text-xs sm:text-sm">
                    N
                  </div>
                </div>

                {/* Bottom ID Badge Footer Info */}
                <div className="pt-2 border-t border-[#0A0A0A]/15 grid grid-cols-2 gap-2 text-[9px] sm:text-[10px] font-mono font-bold">
                  <div className="p-1.5 bg-[#FAFAF7] border border-[#0A0A0A] rounded">
                    <span className="block text-[#0A0A0A]/50 text-[8px] sm:text-[9px]">ROLE</span>
                    <span className="text-[#0A0A0A] truncate block">{aboutData.roleFooter || 'CREATIVE & DEV'}</span>
                  </div>
                  <div className="p-1.5 bg-[#FAFAF7] border border-[#0A0A0A] rounded">
                    <span className="block text-[#0A0A0A]/50 text-[8px] sm:text-[9px]">AVAILABILITY</span>
                    <span className="text-[#3B6EF5] truncate block">{aboutData.availabilityStatus || 'READY FOR WORK'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 3 Mini Stat Counters Under ID Card */}
            <div className="w-full max-w-sm grid grid-cols-3 gap-2 shrink-0">
              <div className="bg-[#A3E635] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl p-2 text-center">
                <Zap className="w-3.5 h-3.5 mx-auto mb-0.5" />
                <span className="font-heading font-extrabold text-xs block leading-none">{aboutData.stat1Val || '15+'}</span>
                <span className="font-mono text-[8px] font-bold block mt-0.5">{aboutData.stat1Lbl || 'PROJECTS'}</span>
              </div>

              <div className="bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl p-2 text-center">
                <Users className="w-3.5 h-3.5 mx-auto mb-0.5" />
                <span className="font-heading font-extrabold text-xs block leading-none">{aboutData.stat2Val || '5+'}</span>
                <span className="font-mono text-[8px] font-bold block mt-0.5">{aboutData.stat2Lbl || 'HAPPY CLIENTS'}</span>
              </div>

              <div className="bg-[#FF5C8A] text-white border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl p-2 text-center">
                <Target className="w-3.5 h-3.5 mx-auto mb-0.5" />
                <span className="font-heading font-extrabold text-xs block leading-none">{aboutData.stat3Val || '100%'}</span>
                <span className="font-mono text-[8px] font-bold block mt-0.5">{aboutData.stat3Lbl || 'SATISFIED'}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Bento Details + Experience Bento Row */}
          <div className="lg:col-span-7 flex flex-col justify-start space-y-3.5 sm:space-y-4 h-auto">
            
            {/* Quick Data Chips */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
              <div className="bg-[#FFC93C] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl p-2 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 text-[#0A0A0A]">
                  <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-extrabold uppercase">DOB</span>
                </div>
                <p className="font-heading font-extrabold text-xs sm:text-sm text-[#0A0A0A] truncate">{aboutData.dob || '24 / 07 / 2008'}</p>
              </div>

              <div className="bg-[#4CE0D2] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl p-2 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 text-[#0A0A0A]">
                  <Languages className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-extrabold uppercase">NATIVE</span>
                </div>
                <p className="font-heading font-extrabold text-xs sm:text-sm text-[#0A0A0A] truncate">{aboutData.nativeLang || 'Indonesia'}</p>
              </div>

              <div className="bg-[#FF5C8A] text-white border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl p-2 sm:p-3">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                  <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-extrabold uppercase">HOBBIES</span>
                </div>
                <p className="font-heading font-extrabold text-xs sm:text-sm truncate">{aboutData.hobbies || 'Photo • Video'}</p>
              </div>
            </div>

            {/* Bio Window Card */}
            <div className="bg-white border-[2px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A] rounded-xl overflow-hidden h-auto shrink-0">
              <div className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-[#3B6EF5] text-white border-b-[2px] border-[#0A0A0A] flex items-center justify-between font-mono font-extrabold text-[11px] sm:text-xs">
                <span>{aboutData.bioTitle || 'AGUS_NANDA_BIOGRAPHY.TXT'}</span>
                <span className="px-2 py-0.5 bg-white text-[#0A0A0A] text-[9px] sm:text-[10px] rounded font-bold">{aboutData.expBadge || '2+ YRS EXP'}</span>
              </div>

              <div className="p-3.5 sm:p-5 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#0A0A0A] leading-relaxed font-medium">
                <p>{aboutData.bioPara1}</p>
                {aboutData.bioPara2 && <p className="font-mono text-[11px] sm:text-xs text-[#0A0A0A]/85">{aboutData.bioPara2}</p>}

                {/* Key Tools Pill Row */}
                <div className="pt-2 border-t border-[#0A0A0A]/10">
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#0A0A0A]/60 block mb-1.5 sm:mb-2 uppercase">FAVORITE CREATIVE TOOLS:</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {toolBadges.map((tool, tIdx) => {
                      const IconComp = tool.icon;
                      return (
                        <span
                          key={tIdx}
                          className={`px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[10px] font-extrabold border border-[#0A0A0A] rounded-md flex items-center gap-1 sm:gap-1.5 shadow-sm ${tool.bg}`}
                        >
                          <IconComp className="w-3 h-3" />
                          <span>{tool.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="bg-[#FFC93C] border-[2px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A] rounded-xl p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3 shrink-0">
              <Quote className="w-5 sm:w-7 h-5 sm:h-7 shrink-0 text-[#0A0A0A]" />
              <div>
                <p className="font-heading font-extrabold text-xs sm:text-sm text-[#0A0A0A] italic leading-snug">
                  {aboutData.quoteText || '"I believe I am hardworking and always set goals to move forward."'}
                </p>
                <p className="text-[9px] sm:text-[10px] font-mono font-extrabold mt-1 text-[#0A0A0A]/80 uppercase">{aboutData.quoteAuthor || '— AGUS NANDA'}</p>
              </div>
            </div>

            {/* Direct Contact & CV Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
              <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#0A0A0A] uppercase tracking-wider mr-1">CONTACT:</span>

              {aboutData.cvUrl && (
                <a
                  href={aboutData.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download Official Curriculum Vitae / Resume PDF Agus Nanda"
                  className="px-2.5 sm:px-3.5 py-1.5 bg-[#A3E635] text-[#0A0A0A] font-mono text-[10px] sm:text-[11px] font-extrabold rounded-lg border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5"
                  title="Download Official CV / Resume (PDF)"
                >
                  <FileText className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  <span>DOWNLOAD CV (PDF)</span>
                  <Download className="w-3 h-3 stroke-[3]" />
                </a>
              )}

              <a
                href={`https://wa.me/62${aboutData.whatsapp?.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat WhatsApp Agus Nanda"
                className="px-2.5 sm:px-3.5 py-1.5 bg-[#4CE0D2] text-[#0A0A0A] font-mono text-[10px] sm:text-[11px] font-extrabold rounded-lg border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span>{aboutData.whatsapp || '081330890140'}</span>
              </a>

              <a
                href={`mailto:${aboutData.email}`}
                aria-label="Kirim Email ke Putu Agus Nanda Pratama"
                className="px-2.5 sm:px-3.5 py-1.5 bg-[#FF5C8A] text-white font-mono text-[10px] sm:text-[11px] font-extrabold rounded-lg border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5"
              >
                <Mail className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span className="truncate max-w-[140px] sm:max-w-none">{aboutData.email || 'putuagusnandapratama@gmail.com'}</span>
              </a>

              <a
                href={`https://instagram.com/${aboutData.instagram?.replace(/^@/, '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Kunjungi Instagram Agus Nanda"
                className="px-2.5 sm:px-3.5 py-1.5 bg-[#3B6EF5] text-white font-mono text-[10px] sm:text-[11px] font-extrabold rounded-lg border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span>@{aboutData.instagram?.replace(/^@/, '') || '_agus_nanda_'}</span>
              </a>
            </div>

            {/* Experience Bento Cards */}
            <div className="pt-2 space-y-2 shrink-0">
              <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#0A0A0A] uppercase tracking-wider block">
                ORGANIZATIONAL & FREELANCE EXPERIENCE:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 items-stretch">
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="bg-white border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl p-2.5 flex flex-col justify-between h-full hover:-translate-y-0.5 transition-transform"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`px-1.5 sm:px-2 py-0.5 font-mono text-[8.5px] sm:text-[9px] font-extrabold border border-[#0A0A0A] rounded ${exp.color || 'bg-[#FFC93C] text-[#0A0A0A]'}`}>
                          {exp.period}
                        </span>
                        <span className="px-1.5 py-0.5 bg-[#FAFAF7] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-[8px] font-extrabold rounded">
                          {exp.badge}
                        </span>
                      </div>

                      <h4 className="font-heading font-extrabold text-[11px] sm:text-xs text-[#0A0A0A] leading-tight mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-[9px] font-mono font-extrabold text-[#3B6EF5] mb-1">{exp.subtitle}</p>

                      <p className="text-[9px] sm:text-[9.5px] font-medium text-[#0A0A0A]/85 leading-snug">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
