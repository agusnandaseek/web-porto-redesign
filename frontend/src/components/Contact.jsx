import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, Sparkles, Phone } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { submitContactMessage } from '../utils/adminStorage';

export default function Contact({ lang }) {
  const [formData, setFormData] = useState({ name: '', email: '', idea: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.idea) return;
    
    await submitContactMessage({
      fullName: formData.name,
      email: formData.email,
      message: formData.idea,
    });

    setSubmittedData({ ...formData });
    setSubmitted(true);
    setFormData({ name: '', email: '', idea: '' });
  };

  const getWaLink = () => {
    if (!submittedData) return 'https://wa.me/6281330890140';
    const text = encodeURIComponent(
      `Halo Agus Nanda! Saya ${submittedData.name} (${submittedData.email}). Ingin mendiskusikan project:\n"${submittedData.idea}"`
    );
    return `https://wa.me/6281330890140?text=${text}`;
  };

  return (
    <section id="contact" className="py-10 sm:py-20 border-b-[2.5px] border-[#0A0A0A] bg-[#FAFAF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="neo-badge bg-[#3B6EF5] text-white mb-2 sm:mb-3 text-[11px] sm:text-xs">
            <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>CONTACT ME</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0A0A]">
            LET'S COLLABORATE<span className="text-[#3B6EF5]">.</span>
          </h2>
          <p className="text-xs sm:text-base font-medium text-[#0A0A0A]/75 mt-2 sm:mt-3 max-w-xl mx-auto">
            {lang === 'ID'
              ? 'Punya ide film, konsep visual, atau project website fullstack? Kirim pesan dan mari kita wujudkan bersama!'
              : 'Have a video concept, photo shoot idea, or fullstack website project? Send your message below!'}
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-4 sm:p-10 relative">
          
          {submitted ? (
            <div className="p-6 sm:p-8 text-center bg-[#4CE0D2]/25 border-[2px] border-[#0A0A0A] rounded-xl space-y-4">
              <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-[#0A0A0A] mx-auto animate-bounce" />
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0A0A0A]">
                {lang === 'ID' ? 'Pesan Berhasil Terkirim & Tersimpan!' : 'Message Sent & Saved!'}
              </h3>
              <p className="text-xs sm:text-base font-medium text-[#0A0A0A]/85 max-w-md mx-auto">
                {lang === 'ID'
                  ? 'Pesan Anda telah tersimpan di sistem. Anda juga dapat melanjutkan chat langsung via WhatsApp untuk respon instan.'
                  : 'Your message is saved. You can also proceed to WhatsApp for an instant response.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getWaLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3 bg-[#A3E635] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl font-heading font-extrabold text-xs sm:text-sm hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'ID' ? 'LANJUTKAN CHAT VIA WHATSAPP' : 'CONTINUE ON WHATSAPP'}</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-5 py-3 bg-white text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl font-heading font-extrabold text-xs sm:text-sm hover:bg-gray-100 transition-all cursor-pointer"
                >
                  {lang === 'ID' ? 'Kirim Pesan Lain' : 'Send Another Message'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              
              {/* Name Input */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                  <User className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#3B6EF5]" />
                  <span>{lang === 'ID' ? 'Nama Lengkap' : 'Full Name'}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ID' ? 'cth: Wayan Jay' : 'e.g. Wayan Jay'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs sm:text-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_#0A0A0A] transition-all text-[#0A0A0A]"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                  <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FF5C8A]" />
                  <span>{lang === 'ID' ? 'Alamat Email' : 'Email Address'}</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="cth: wayan@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs sm:text-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_#0A0A0A] transition-all text-[#0A0A0A]"
                />
              </div>

              {/* Idea/Message Textarea */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                  <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FFC93C]" />
                  <span>{lang === 'ID' ? 'Ide & Rencana Kolaborasi' : 'Idea & Project Details'}</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={lang === 'ID' ? 'Jelaskan konsep project, lokasi, atau kebutuhan websitemu di sini...' : 'Describe your vision, shoot location, or web requirements...'}
                  value={formData.idea}
                  onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs sm:text-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_#0A0A0A] transition-all text-[#0A0A0A] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#3B6EF5] text-white border-[2px] sm:border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_#0A0A0A] py-3 sm:py-4 text-xs sm:text-base font-heading font-extrabold rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#2b58d9] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <span>{lang === 'ID' ? 'KIRIM PESAN SEKARANG' : 'SEND MESSAGE NOW'}</span>
                <Send className="w-4 sm:w-5 h-4 sm:h-5 stroke-[3]" />
              </button>

            </form>
          )}

          {/* Quick Direct Badges */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-[2px] border-[#0A0A0A]/15 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#0A0A0A]/60 uppercase">OR REACH OUT VIA:</span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="https://wa.me/6281330890140"
                target="_blank"
                rel="noreferrer"
                className="px-3 sm:px-3.5 py-1.5 bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] font-mono text-[11px] sm:text-xs font-extrabold rounded-lg hover:-translate-y-0.5 transition-transform flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/_agus_nanda_"
                target="_blank"
                rel="noreferrer"
                className="px-3 sm:px-3.5 py-1.5 bg-[#FF5C8A] text-white border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] sm:shadow-[2.5px_2.5px_0px_#0A0A0A] font-mono text-[11px] sm:text-xs font-extrabold rounded-lg hover:-translate-y-0.5 transition-transform flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
