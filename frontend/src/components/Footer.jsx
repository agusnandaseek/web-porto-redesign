import React from 'react';
import { ArrowUp, Mail, Phone, Heart } from 'lucide-react';
import { InstagramIcon, GithubIcon } from './Icons';

export default function Footer({ lang }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAFAF7] border-t-3 border-[#0A0A0A] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start pb-8 sm:pb-12 border-b-3 border-[#0A0A0A]/15">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-[#FFC93C] neo-border neo-shadow-sm flex items-center justify-center font-extrabold text-lg sm:text-xl rounded-lg">
                N
              </div>
              <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
                NANDA<span className="text-[#3B6EF5]">.</span>CREATIVE
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#0A0A0A]/75 max-w-sm leading-relaxed">
              {lang === 'ID'
                ? 'Portofolio Resmi Agus Nanda — Creative Freelancer & Fullstack Developer berbasis di Bali, Indonesia.'
                : 'Official Portfolio of Agus Nanda — Creative Freelancer & Fullstack Developer based in Bali, Indonesia.'}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              <span className="neo-badge bg-[#3B6EF5] text-white text-[11px] sm:text-xs">PHOTOGRAPHY</span>
              <span className="neo-badge bg-[#FF5C8A] text-white text-[11px] sm:text-xs">VIDEOGRAPHY</span>
              <span className="neo-badge bg-[#4CE0D2] text-[#0A0A0A] text-[11px] sm:text-xs">FULLSTACK DEV</span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#0A0A0A]">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-semibold">
              <li>
                <a href="#about" className="hover:text-[#3B6EF5] transition-colors">
                  {lang === 'ID' ? 'Tentang Agus Nanda' : 'About Agus Nanda'}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#3B6EF5] transition-colors">
                  {lang === 'ID' ? 'Kategori Portfolio' : 'Selected Portfolio'}
                </a>
              </li>
              <li>
                <a href="#bts" className="hover:text-[#3B6EF5] transition-colors">
                  Behind The Scenes
                </a>
              </li>
              <li>
                <a href="#software" className="hover:text-[#3B6EF5] transition-colors">
                  Software & Tools
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#3B6EF5] transition-colors">
                  FAQ & Work Process
                </a>
              </li>
            </ul>
          </div>

          {/* Social Box Buttons */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <h4 className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#0A0A0A]">
              CONNECT & FOLLOW
            </h4>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href="https://instagram.com/_agus_nanda_"
                target="_blank"
                rel="noreferrer"
                className="neo-btn bg-[#FF5C8A] text-white p-2.5 sm:p-3 rounded-xl hover:rotate-6"
                title="Instagram"
              >
                <InstagramIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="https://wa.me/6281330890140"
                target="_blank"
                rel="noreferrer"
                className="neo-btn bg-[#4CE0D2] text-[#0A0A0A] p-2.5 sm:p-3 rounded-xl hover:-rotate-6"
                title="WhatsApp"
              >
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5]" />
              </a>
              <a
                href="mailto:putuagusnandapratama@gmail.com"
                className="neo-btn bg-[#FFC93C] text-[#0A0A0A] p-2.5 sm:p-3 rounded-xl hover:rotate-6"
                title="Email"
              >
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5]" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="neo-btn bg-[#0A0A0A] text-white p-2.5 sm:p-3 rounded-xl hover:-rotate-6"
                title="GitHub"
              >
                <GithubIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>

            <p className="text-[11px] sm:text-xs font-mono font-bold text-[#0A0A0A]/60 pt-1">
              LOCATION: DENPASAR, BALI, INDONESIA
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[11px] sm:text-xs font-mono font-bold text-[#0A0A0A]/70 text-center sm:text-left">
            © {new Date().getFullYear()} NANDA CREATIVE. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            className="neo-btn bg-[#FFC93C] text-[#0A0A0A] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs rounded-xl flex items-center gap-2"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
