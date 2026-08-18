import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LayoutRenderer from './components/LayoutRenderer';
import EditorToolbar from './components/EditorToolbar';
import AdminPage from './pages/AdminPage';
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
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] selection:bg-[#FFC93C] selection:text-[#0A0A0A]">
      <Navbar lang={lang} setLang={setLang} onOpenAdmin={() => setIsAdminPage(true)} />
      
      <main className="w-full relative">
        <LayoutRenderer layout={layoutData} editable={editable} lang={lang} />
      </main>

      <Footer lang={lang} />

      {/* Floating Layout Editor Controls when in EDIT mode */}
      {editable && <EditorToolbar onRefresh={fetchLayout} />}
    </div>
  );
}
