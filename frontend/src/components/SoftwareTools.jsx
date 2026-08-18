import React from 'react';
import { Cpu, Wrench, Sparkles, Sliders, Camera, Film, Code2, Layers, HardDrive } from 'lucide-react';

export default function SoftwareTools({ lang }) {
  const tools = [
    {
      name: 'DaVinci Resolve',
      category: 'VIDEO & MOTION',
      description: 'Color grading, editing, and cinematic finishing with Log profile workflow & S-Log3 LUTs.',
      proficiency: 95,
      iconColor: 'bg-[#FFC93C] text-[#0A0A0A]',
      barColor: 'bg-[#FFC93C]',
      icon: Film,
    },
    {
      name: 'Adobe Premiere Pro',
      category: 'VIDEO & MOTION',
      description: 'Advanced video sequence editing, multi-cam event cutting, sound design, & Reels intros.',
      proficiency: 98,
      iconColor: 'bg-[#3B6EF5] text-white',
      barColor: 'bg-[#3B6EF5]',
      icon: Layers,
    },
    {
      name: 'Adobe After Effects',
      category: 'VIDEO & MOTION',
      description: 'Motion graphics, visual effects, title keyframing, dynamic intros, & lower thirds.',
      proficiency: 85,
      iconColor: 'bg-[#FF5C8A] text-white',
      barColor: 'bg-[#FF5C8A]',
      icon: Sparkles,
    },
    {
      name: 'Adobe Lightroom',
      category: 'VISUAL & PHOTO',
      description: 'RAW photo post-processing, batch color grading, and professional tone calibration.',
      proficiency: 95,
      iconColor: 'bg-[#4CE0D2] text-[#0A0A0A]',
      barColor: 'bg-[#4CE0D2]',
      icon: Camera,
    },
    {
      name: 'Adobe Photoshop',
      category: 'VISUAL & PHOTO',
      description: 'Digital photo manipulation, thumbnail design, social media assets, & retouching.',
      proficiency: 90,
      iconColor: 'bg-[#A78BFA] text-white',
      barColor: 'bg-[#A78BFA]',
      icon: Wrench,
    },
    {
      name: 'VS Code & React / Next.js',
      category: 'FULLSTACK DEV',
      description: 'Modern Web App development, React.js, Tailwind CSS v4, Vite, Supabase & REST APIs.',
      proficiency: 92,
      iconColor: 'bg-[#0A0A0A] text-white',
      barColor: 'bg-[#A3E635]',
      icon: Code2,
    },
  ];

  const gearItems = [
    { label: 'Sony A6700 (4K 120fps)', color: 'bg-[#FFC93C] text-[#0A0A0A]' },
    { label: 'Sony 35mm f/1.4 Prime', color: 'bg-[#4CE0D2] text-[#0A0A0A]' },
    { label: '3-Axis Gimbal Stabilizer', color: 'bg-[#FF5C8A] text-white' },
    { label: 'MacBook M-Series Suite', color: 'bg-[#3B6EF5] text-white' },
    { label: 'Wireless Mic & Studio Monitor', color: 'bg-[#A3E635] text-[#0A0A0A]' },
  ];

  return (
    <section id="software" className="relative min-h-auto max-h-none lg:min-h-[calc(100vh-5rem)] lg:max-h-[1080px] py-6 sm:py-8 lg:py-6 border-b-[2.5px] border-[#0A0A0A] bg-[#FAFAF7] overflow-hidden flex flex-col justify-between select-none">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-between gap-4">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-3 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#4CE0D2] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-md font-mono text-[10px] sm:text-[11px] font-extrabold mb-1">
              <Wrench className="w-3.5 h-3.5" />
              <span>TOOLS & TECHNOLOGIES</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A]">
              SOFTWARE & WORKSPACE EQUIPMENT<span className="text-[#4CE0D2]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono font-bold text-[#0A0A0A]/75 max-w-xs text-right hidden sm:block pr-6 sm:pr-8">
            {lang === 'ID'
              ? 'Kombinasi perangkat lunak kreatif dan tools development modern.'
              : 'Creative software and modern development tools for high-quality production.'}
          </p>
        </div>

        {/* Hardware & Gear Bar */}
        <div className="p-2 sm:p-2.5 px-3 sm:px-3.5 bg-[#FFC93C]/20 border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] rounded-xl flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2 sm:px-2.5 py-0.5 bg-[#0A0A0A] text-white font-mono text-[9px] sm:text-[10px] font-extrabold rounded flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-[#FFC93C]" />
              <span>GEAR:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {gearItems.map((gear, gIdx) => (
                <span key={gIdx} className={`px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-extrabold border border-[#0A0A0A] rounded-md shadow-sm ${gear.color}`}>
                  {gear.label}
                </span>
              ))}
            </div>
          </div>
          <span className="hidden lg:inline text-[10px] font-mono font-bold text-[#0A0A0A]/60">
            PRO-GRADE PRODUCTION KIT 2026
          </span>
        </div>

        {/* Tools Grid (6 cards scaled vertically to fill 1 screen height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 flex-1 items-stretch my-auto">
          {tools.map((tool, idx) => {
            const IconComp = tool.icon;
            return (
              <div
                key={idx}
                className="bg-white border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[5px_5px_0px_#0A0A0A] rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[8px_8px_0px_#0A0A0A] transition-all duration-200 h-full"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  {/* Header Badge & Icon */}
                  <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-2">
                    <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#0A0A0A]/60 tracking-wider uppercase">
                      {tool.category}
                    </span>
                    <div className={`w-8 sm:w-9 h-8 sm:h-9 ${tool.iconColor} border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] flex items-center justify-center rounded-xl font-heading font-extrabold text-xs sm:text-sm`}>
                      <IconComp className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-base sm:text-xl text-[#0A0A0A] group-hover:text-[#4CE0D2] transition-colors leading-tight">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#0A0A0A]/85 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Chunky Progress Bar Neobrutalism Style */}
                <div className="pt-2.5 sm:pt-3 border-t-[2px] border-[#0A0A0A]/15 mt-2.5 sm:mt-3">
                  <div className="flex justify-between items-center mb-1 sm:mb-1.5 font-mono text-xs font-extrabold">
                    <span className="text-[#0A0A0A]/70 uppercase text-[9px] sm:text-[10px]">PROFICIENCY</span>
                    <span className="px-1.5 sm:px-2 py-0.5 bg-[#0A0A0A] text-white border border-[#0A0A0A] rounded font-mono text-[9px] sm:text-[10px] font-extrabold">
                      {tool.proficiency}%
                    </span>
                  </div>
                  
                  <div className="w-full h-3 sm:h-3.5 bg-[#FAFAF7] border-[1.5px] border-[#0A0A0A] rounded-lg overflow-hidden p-0.5 shadow-inner">
                    <div
                      className={`h-full ${tool.barColor} border border-[#0A0A0A] rounded-md transition-all duration-1000`}
                      style={{ width: `${tool.proficiency}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
