import React, { useState } from 'react';
import { Sliders, CheckCircle, RotateCcw, LogOut, Eye, Sparkles, ShieldCheck } from 'lucide-react';
import {
  getDraftLayout,
  resetDraftToPublished,
  publishDraftLayout,
} from '../utils/layoutTools';

export default function EditorToolbar({ onRefresh }) {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePublish = () => {
    const ok = publishDraftLayout();
    if (ok) {
      showToast('🚀 Layout Draft berhasil dipublish ke versi publik!');
      if (onRefresh) onRefresh();
    } else {
      showToast('❌ Gagal mempublish layout. Cek konsol validasi.');
    }
  };

  const handleReset = () => {
    const ok = resetDraftToPublished();
    if (ok) {
      showToast('🔄 Layout Draft telah di-reset sesuai versi published saat ini.');
      if (onRefresh) onRefresh();
    }
  };

  const handleExit = () => {
    window.location.href = window.location.pathname; // strip ?mode=edit
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-[#0A0A0A] text-white border-[2px] border-white shadow-[4px_4px_0px_#0A0A0A] px-4 py-2 rounded-xl text-xs font-mono font-extrabold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Floating Toolbar Controls */}
      <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-3 flex flex-wrap items-center gap-3">
        
        {/* Status Badge */}
        <div className="px-3 py-1.5 bg-[#FFC93C] text-[#0A0A0A] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-extrabold flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-[#0A0A0A]" />
          <span>MODE EDIT (DRAFT)</span>
        </div>

        {/* Security Badge */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-[#FAFAF7] border border-[#0A0A0A] rounded-lg font-mono text-[10px] font-bold text-[#0A0A0A]/70">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3B6EF5]" />
          <span>GATED SECURITY</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Reset Draft */}
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-gray-100 text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-xl font-mono text-xs font-extrabold hover:bg-gray-200 transition-all cursor-pointer flex items-center gap-1.5"
            title="Reset Draft ke Posisi Published"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Draft</span>
          </button>

          {/* Publish */}
          <button
            onClick={handlePublish}
            className="px-4 py-1.5 bg-[#4CE0D2] text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl font-mono text-xs font-extrabold hover:bg-[#3bc4b7] hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4 text-[#0A0A0A]" />
            <span>Publish Perubahan</span>
          </button>

          {/* Exit Edit Mode */}
          <button
            onClick={handleExit}
            className="px-3 py-1.5 bg-[#FF5C8A] text-white border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-xl font-mono text-xs font-extrabold hover:bg-[#e04b77] transition-all cursor-pointer flex items-center gap-1.5"
            title="Keluar dari Mode Edit"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Editor</span>
          </button>
        </div>

      </div>
    </div>
  );
}
