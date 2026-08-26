import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LayoutRenderer from './components/LayoutRenderer';

const AdminPage = lazy(() => import('./pages/AdminPage'));
const EditorToolbar = lazy(() => import('./components/EditorToolbar'));

import {
  getPublishedLayout,
  getDraftLayout,
  isEditModeAllowed,
  subscribeLayoutChanges,
} from './utils/layoutTools';
import { subscribeCmsChanges, hydrateDataFromFirestore } from './utils/adminStorage';

export default function App() {
  const [lang, setLang] = useState('ID');
  const [editable, setEditable] = useState(() => isEditModeAllowed());
  const [layoutData, setLayoutData] = useState([]);
  
  // Dedicated Admin Page Route Check
  const [isAdminPage, setIsAdminPage] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    return path === '/admin' || path === '/admin/' || params.get('page') === 'admin' || params.get('mode') === 'admin';
  });

  // Fetch layout based on mode (Published vs Draft)
  const fetchLayout = useCallback(() => {
    const isEdit = isEditModeAllowed();
    setEditable(isEdit);

    if (isEdit) {
      setLayoutData(getDraftLayout());
    } else {
      setLayoutData(getPublishedLayout());
    }
  }, []);

  useEffect(() => {
    fetchLayout();
    hydrateDataFromFirestore();
    const unsubLayout = subscribeLayoutChanges(fetchLayout);
    const unsubCms = subscribeCmsChanges(fetchLayout);

    return () => {
      unsubLayout();
      unsubCms();
    };
  }, [fetchLayout]);

  // Render standalone Admin Page when navigating to /admin
  if (isAdminPage) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center font-mono font-bold text-sm">
          <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#0A0A0A] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#FFC93C] animate-ping" />
            <span>MEMUAT CMS ADMIN...</span>
          </div>
        </div>
      }>
        <AdminPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] selection:bg-[#FFC93C] selection:text-[#0A0A0A]">
      <Navbar lang={lang} setLang={setLang} onOpenAdmin={() => setIsAdminPage(true)} />
      
      <main className="w-full relative">
        <LayoutRenderer layout={layoutData} editable={editable} lang={lang} />
      </main>

      <Footer lang={lang} />

      {/* Floating Layout Editor Controls when in EDIT mode */}
      {editable && (
        <Suspense fallback={null}>
          <EditorToolbar onRefresh={fetchLayout} />
        </Suspense>
      )}
    </div>
  );
}
