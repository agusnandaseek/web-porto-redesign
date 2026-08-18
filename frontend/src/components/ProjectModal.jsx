import React from 'react';
import { X, ExternalLink, Camera, Tag, Calendar, Layers, Film, Play, Maximize } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const isVertical = project.aspectRatio === '9:16' || project.aspectRatio === '9/16';
  const isSquare = project.aspectRatio === '1:1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FAFAF7] border-[3px] border-[#0A0A0A] shadow-[10px_10px_0px_#0A0A0A] rounded-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#FFC93C] border-b-[2.5px] border-[#0A0A0A] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 bg-[#0A0A0A] text-white font-mono text-xs font-extrabold rounded">
              {project.category}
            </span>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#0A0A0A] leading-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-lg hover:bg-[#FF5C8A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Media Container (Tightly shrink-wrapped around media with NO black bars on left/right) */}
          <div className="w-full flex items-center justify-center">
            <div className="relative inline-flex max-w-full border-[2.5px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] rounded-xl overflow-hidden bg-white">
              
              {project.mediaUrl ? (
                // HTML5 Video Player
                <video
                  src={project.mediaUrl}
                  poster={project.image}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className={`max-h-[58vh] max-w-full w-auto h-auto object-contain block ${
                    isVertical
                      ? 'aspect-[9/16]'
                      : isSquare
                      ? 'aspect-square'
                      : 'aspect-video'
                  }`}
                />
              ) : (
                // Image Showcase
                <img
                  src={project.image}
                  alt={project.title}
                  className={`max-h-[58vh] max-w-full w-auto h-auto object-contain block ${
                    isVertical
                      ? 'aspect-[9/16]'
                      : isSquare
                      ? 'aspect-square'
                      : 'object-contain'
                  }`}
                />
              )}

              {/* Camera Badge */}
              {project.camera && (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#3B6EF5] text-white border border-[#0A0A0A] font-mono text-[11px] font-extrabold rounded-md shadow-md flex items-center gap-1 pointer-events-none z-10">
                  <Camera className="w-3 h-3" />
                  <span>{project.camera}</span>
                </div>
              )}

              {/* Aspect Ratio Badge */}
              {project.aspectRatio && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#FFC93C] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-[11px] font-extrabold rounded-md shadow-md pointer-events-none z-10">
                  RATIO: {project.aspectRatio}
                </div>
              )}
            </div>
          </div>

          {/* Project Specs Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl">
              <span className="text-[10px] font-mono font-extrabold text-[#0A0A0A]/60 block mb-0.5 uppercase">CLIENT / EVENT</span>
              <p className="font-heading font-extrabold text-sm text-[#0A0A0A]">{project.client || 'Nanda Creative'}</p>
            </div>
            <div className="p-3 bg-white border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl">
              <span className="text-[10px] font-mono font-extrabold text-[#0A0A0A]/60 block mb-0.5 uppercase">ROLE</span>
              <p className="font-heading font-extrabold text-sm text-[#0A0A0A]">{project.role || 'Lead Visual Specialist'}</p>
            </div>
            <div className="p-3 bg-white border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl">
              <span className="text-[10px] font-mono font-extrabold text-[#0A0A0A]/60 block mb-0.5 uppercase">YEAR</span>
              <p className="font-heading font-extrabold text-sm text-[#0A0A0A]">{project.year || '2024 - 2025'}</p>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="bg-white border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] p-4 sm:p-5 rounded-xl space-y-1.5">
            <h4 className="font-heading font-extrabold text-base text-[#0A0A0A]">PROJECT OVERVIEW</h4>
            <p className="text-xs sm:text-sm text-[#0A0A0A]/85 leading-relaxed font-medium">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Tools Used Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-extrabold text-[#0A0A0A]/70 uppercase">TOOLS USED:</span>
            {project.tools?.map((tool, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-[#4CE0D2]/40 text-[#0A0A0A] border border-[#0A0A0A] font-mono text-xs font-extrabold rounded-md shadow-sm">
                {tool}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-white border-t-[2.5px] border-[#0A0A0A] flex justify-between items-center shrink-0">
          <span className="text-xs font-mono font-bold text-[#0A0A0A]/60">
            NANDA CREATIVE • SPEC SHEET
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] text-xs font-mono font-extrabold rounded-lg hover:bg-[#f0b722] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
          >
            Close Spec Window
          </button>
        </div>

      </div>
    </div>
  );
}
