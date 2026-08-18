import React, { useState, useEffect } from 'react';
import { Camera, Video, Film, Code, ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { getSectionData, subscribeCmsChanges } from '../utils/adminStorage';

export default function Portfolio({ lang }) {
  const [activeCategory, setActiveCategory] = useState('PHOTOGRAPHY');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [portfolioHeader, setPortfolioHeader] = useState(() => getSectionData('portfolioHeader'));
  const [projectsList, setProjectsList] = useState(() => getSectionData('portfolio') || []);

  useEffect(() => {
    const unsub = subscribeCmsChanges(() => {
      setPortfolioHeader(getSectionData('portfolioHeader'));
      setProjectsList(getSectionData('portfolio') || []);
    });
    return () => unsub();
  }, []);

  const PROJECTS_PER_PAGE = 2;

  const categories = [
    { id: 'PHOTOGRAPHY', label: 'PHOTOGRAPHY', icon: Camera, color: 'bg-[#3B6EF5] text-white' },
    { id: 'VIDEOGRAPHY', label: 'VIDEOGRAPHY', icon: Video, color: 'bg-[#FF5C8A] text-white' },
    { id: 'EDITOR', label: 'EDITOR', icon: Film, color: 'bg-[#FFC93C] text-[#0A0A0A]' },
    { id: 'FULLSTACK DEV', label: 'FULLSTACK DEV', icon: Code, color: 'bg-[#4CE0D2] text-[#0A0A0A]' },
  ];

  const filteredProjects = projectsList.filter((p) => p.category === activeCategory);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const displayedProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section id="portfolio" className="relative min-h-auto max-h-none lg:min-h-[calc(100vh-5rem)] lg:max-h-[1080px] py-6 sm:py-8 lg:py-6 border-b-[2.5px] border-[#0A0A0A] bg-[#FAFAF7] overflow-hidden flex flex-col justify-between select-none">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-between gap-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#3B6EF5] text-white border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-md font-mono text-[10px] sm:text-[11px] font-extrabold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{portfolioHeader?.badge || 'SELECTED WORKS'}</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A]">
              {portfolioHeader?.title || 'FEATURED PORTFOLIO'}<span className="text-[#3B6EF5]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono font-bold text-[#0A0A0A]/75 max-w-xs text-right hidden sm:block pr-6 sm:pr-8">
            {portfolioHeader?.subtitle ||
              (lang === 'ID'
                ? 'Koleksi karya Fotografi, Videografi, Post-Production, dan Fullstack Dev.'
                : 'Curated works across Photography, Videography, Post-Production, and Fullstack Dev.')}
          </p>
        </div>

        {/* Category Filter Tabs + Next/Prev Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-2.5 border-b-[2px] border-[#0A0A0A]/15 shrink-0">
          {/* Horizontal Scrollable Categories */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 py-1 w-full md:w-auto shrink-0 touch-pan-x">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-heading font-extrabold rounded-xl border-[2px] sm:border-[2.5px] border-[#0A0A0A] flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? `${cat.color} shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[3.5px_3.5px_0px_#0A0A0A] -translate-y-0.5`
                      : 'bg-white text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* NEXT / PREV PAGINATION NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between md:justify-end gap-2.5 shrink-0 w-full md:w-auto">
            <span className="whitespace-nowrap px-3.5 py-2 bg-[#3B6EF5] text-white border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl font-mono text-xs font-extrabold flex items-center justify-center shrink-0 min-w-[95px] text-center">
              PAGE {currentPage} / {totalPages}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`p-2 bg-white text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl flex items-center justify-center transition-all ${
                  currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer hover:bg-gray-100'
                }`}
                title="Previous Projects"
              >
                <ChevronLeft className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[3]" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-2 bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl flex items-center justify-center transition-all ${
                  currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer hover:bg-[#f0b722]'
                }`}
                title="Next Projects"
              >
                <ChevronRight className="w-4.5 sm:w-5 h-4.5 sm:h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="p-2 sm:p-2.5 px-3 sm:px-3.5 bg-[#FFC93C]/20 border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 sm:px-2.5 py-0.5 bg-[#0A0A0A] text-white font-mono text-[10px] sm:text-[11px] font-extrabold rounded">
              {activeCategory}
            </span>
            <span className="text-[11px] sm:text-sm font-bold text-[#0A0A0A]/85 font-mono">
              TOTAL {filteredProjects.length} PROJECT(S) • SHOWING PAGE {currentPage} OF {totalPages}
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-mono font-bold text-[#0A0A0A]/60">
            {portfolioHeader?.promptBanner || 'GUNAKAN TOMBOL PANAH [ ◄ ► ] ATAU KLIK KARTU UNTUK FULLSCREEN'}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1 items-stretch my-auto">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] sm:shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-[9px_9px_0px_#0A0A0A] transition-all duration-200 h-full"
            >
              <div className="flex flex-col justify-between flex-1 space-y-2.5 sm:space-y-3">
                {/* Image Showcase Container */}
                <div className="relative aspect-[16/10] min-h-[190px] sm:min-h-[260px] max-h-[340px] overflow-hidden rounded-xl border-[2px] sm:border-[2.5px] border-[#0A0A0A] bg-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#FFC93C] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-[10px] sm:text-xs font-extrabold rounded-md shadow-sm">
                      {project.category}
                    </span>
                    {project.camera && (
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#3B6EF5] text-white border border-[#0A0A0A] font-mono text-[10px] sm:text-xs font-extrabold rounded-md shadow-sm">
                        {project.camera}
                      </span>
                    )}
                  </div>

                  {/* Ratio Badge */}
                  {project.aspectRatio && (
                    <div className="absolute top-2.5 right-2.5 px-1.5 sm:px-2 py-0.5 bg-[#0A0A0A]/85 text-white font-mono text-[9px] sm:text-[10px] font-extrabold rounded border border-[#0A0A0A]">
                      {project.aspectRatio}
                    </div>
                  )}

                  {/* Hover Overlay Prompt */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#FFC93C] text-[#0A0A0A] border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A] font-mono text-xs font-extrabold rounded-xl flex items-center gap-1.5 sm:gap-2">
                      <span>Lihat Detail Project</span>
                      <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                    </span>
                  </div>
                </div>

                {/* Info Text */}
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-xl text-[#0A0A0A] group-hover:text-[#3B6EF5] transition-colors leading-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#0A0A0A]/85 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Footer Specs & Action Button */}
              <div className="pt-2.5 sm:pt-3 border-t-[2px] border-[#0A0A0A]/15 flex items-center justify-between shrink-0 mt-2.5 sm:mt-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(Array.isArray(project.tools) ? project.tools : (project.tools || '').split(',')).slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] sm:text-xs font-mono font-extrabold px-2 sm:px-2.5 py-0.5 bg-[#FAFAF7] border border-[#0A0A0A] rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                <button className="p-1.5 sm:p-2 bg-[#3B6EF5] text-white border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl group-hover:bg-[#FF5C8A] transition-colors">
                  <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
