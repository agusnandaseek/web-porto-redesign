import React, { useState } from 'react';
import { Camera, Code, Video, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ lang, setLang }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: lang === 'ID' ? 'Tentang' : 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Behind Scenes', href: '#bts' },
    { label: 'Software & Tools', href: '#software' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7] border-b-3 border-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" aria-label="Kembali ke Beranda Nanda Creative" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#FFC93C] neo-border neo-shadow-sm flex items-center justify-center font-extrabold text-xl rounded-lg group-hover:rotate-6 transition-transform">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-extrabold tracking-tight text-[#0A0A0A]">
              NANDA<span className="text-[#3B6EF5]">.</span>CREATIVE
            </span>
            <span className="text-xs font-semibold tracking-wider text-[#0A0A0A]/70 uppercase font-mono">
              Creative & Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading font-bold text-sm text-[#0A0A0A] hover:text-[#3B6EF5] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0A0A0A] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Lang Switcher & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
            aria-label="Ganti Bahasa / Switch Language"
            className="neo-badge bg-white hover:bg-[#FF5C8A] hover:text-white transition-colors cursor-pointer"
            title="Ganti Bahasa / Switch Language"
          >
            <Globe className="w-4 h-4" />
            <span>{lang}</span>
          </button>

          {/* Let's Collaborate CTA Button */}
          <a
            href="#contact"
            className="neo-btn bg-[#3B6EF5] text-white px-4 py-2 text-sm rounded-lg flex items-center gap-2 hover:bg-[#2b58d9]"
          >
            <span>{lang === 'ID' ? 'Kolaborasi' : "Let's Talk"}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden neo-border p-2 bg-[#FFC93C] rounded-lg text-[#0A0A0A]"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAFAF7] border-b-3 border-[#0A0A0A] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading font-extrabold text-lg text-[#0A0A0A] hover:text-[#3B6EF5]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t-2 border-[#0A0A0A]/20 flex items-center justify-between">
            <button
              onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
              className="neo-badge bg-[#FF5C8A] text-white"
            >
              <Globe className="w-4 h-4" />
              <span>Language: {lang}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="neo-btn bg-[#3B6EF5] text-white px-4 py-2 text-sm rounded-lg"
            >
              Kolaborasi
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
