import React from 'react';
import { Rnd } from 'react-rnd';
import { Move, Maximize2, Layers, CheckCircle2 } from 'lucide-react';
import Hero from './Hero';
import About from './About';
import Portfolio from './Portfolio';
import BTS from './BTS';
import SoftwareTools from './SoftwareTools';
import FAQ from './FAQ';
import Contact from './Contact';
import { updateElementPosition, updateElementSize } from '../utils/layoutTools';

export default function LayoutRenderer({ layout, editable, lang }) {
  const renderSectionComponent = (type, content) => {
    switch (type) {
      case 'hero':
        return <Hero lang={lang} />;
      case 'about_bento':
        return <About lang={lang} />;
      case 'portfolio_grid':
        return <Portfolio lang={lang} />;
      case 'bts_gallery':
        return <BTS lang={lang} />;
      case 'software_tools':
        return <SoftwareTools lang={lang} />;
      case 'faq_accordion':
        return <FAQ lang={lang} />;
      case 'contact_form':
        return <Contact lang={lang} />;
      default:
        return (
          <div className="p-8 text-center bg-[#FFC93C]/20 border-2 border-[#0A0A0A] rounded-xl font-mono text-xs">
            Unknown Section Component: {type}
          </div>
        );
    }
  };

  // 1. NORMAL MODE (editable = false): Plain clean render
  if (!editable) {
    return (
      <div className="w-full flex flex-col">
        {layout.map((item) => (
          <div key={item.id} id={item.id} className="w-full relative">
            {renderSectionComponent(item.type, item.content)}
          </div>
        ))}
      </div>
    );
  }

  // 2. EDIT MODE (editable = true): Draggable Window File Manager Style with react-rnd
  return (
    <div className="w-full min-h-screen relative bg-[#0A0A0A]/5 p-4 space-y-6">
      {layout.map((item) => (
        <div key={item.id} className="relative mb-6">
          <Rnd
            size={{ width: '100%', height: 'auto' }}
            position={{ x: item.x || 0, y: 0 }}
            onDragStop={(e, d) => {
              updateElementPosition(item.id, d.x, d.y);
            }}
            bounds="parent"
            enableResizing={{ bottom: true }}
            dragHandleClassName={`drag-handle-${item.id}`}
            className="z-10"
          >
            <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl overflow-hidden transition-shadow">
              
              {/* Draggable Title Bar / File Manager Window Header */}
              <div className={`drag-handle-${item.id} bg-[#FFC93C] text-[#0A0A0A] border-b-[2.5px] border-[#0A0A0A] px-4 py-2 flex items-center justify-between font-mono text-xs font-extrabold cursor-move select-none`}>
                <div className="flex items-center gap-2">
                  <Move className="w-4 h-4 text-[#0A0A0A]" />
                  <span>WINDOW: {item.id.toUpperCase()} ({item.type})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-white border border-[#0A0A0A] rounded text-[10px]">
                    X: {item.x}px | Y: {item.y}px
                  </span>
                  <span className="px-2 py-0.5 bg-[#4CE0D2] border border-[#0A0A0A] rounded text-[10px]">
                    DRAGGABLE WINDOW
                  </span>
                </div>
              </div>

              {/* Render Section Component Content */}
              <div className="relative">
                {renderSectionComponent(item.type, item.content)}
              </div>

            </div>
          </Rnd>
        </div>
      ))}
    </div>
  );
}
