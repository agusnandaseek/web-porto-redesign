import React, { useState } from 'react';
import {
  ShieldCheck,
  Save,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Camera,
  Film,
  LogOut,
  Mail,
  User,
  Cpu,
  Lock,
  ArrowLeft,
  Info,
  CheckCircle2,
  Image as ImageIcon,
  Edit2,
  Globe,
  Link2,
  Video,
  Code,
  SlidersHorizontal,
  KeyRound,
  Flame,
} from 'lucide-react';
import { getSectionData, updateSectionData, resetCmsToDefault } from '../utils/adminStorage';
import { auth, signInWithEmailAndPassword, fbSignOut, onAuthStateChanged } from '../lib/firebaseClient';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const [activeTab, setActiveTab] = useState('hero');
  const [portfolioSubTab, setPortfolioSubTab] = useState('PHOTOGRAPHY');
  const [toastMessage, setToastMessage] = useState(null);

  // Monitor sesi autentikasi resmi dari server Firebase
  React.useEffect(() => {
    if (!auth) {
      setIsCheckingSession(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setIsCheckingSession(false);
    });

    return () => unsubscribe();
  }, []);

  // Editable Form States
  const [heroData, setHeroData] = useState(() => getSectionData('hero'));
  const [aboutData, setAboutData] = useState(() => getSectionData('about'));
  const [portfolioHeaderData, setPortfolioHeaderData] = useState(() => getSectionData('portfolioHeader'));
  const [portfolioData, setPortfolioData] = useState(() => getSectionData('portfolio') || []);
  const [btsData, setBtsData] = useState(() => getSectionData('bts') || []);
  const [softwareData, setSoftwareData] = useState(() => getSectionData('software') || []);
  const [messagesData, setMessagesData] = useState(() => getSectionData('messages') || []);

  const slotLabels = [
    { slot: 1, name: 'KOTAK 1: Top Left Landscape Card', dim: '1920x1080px (16:10)' },
    { slot: 2, name: 'KOTAK 2: Top Middle Landscape Card', dim: '1920x1080px (16:10)' },
    { slot: 3, name: 'KOTAK 3: Right Vertical Portrait Card', dim: '1080x1440px (3:4 / 9:16 Vertikal)' },
    { slot: 4, name: 'KOTAK 4: Middle Wide Banner Card', dim: '1920x1080px (16:9 Wide)' },
    { slot: 5, name: 'KOTAK 5: Bottom Left Landscape Card', dim: '1920x1080px (16:10)' },
    { slot: 6, name: 'KOTAK 6: Bottom Middle Landscape Card', dim: '1920x1080px (16:10)' },
    { slot: 7, name: 'KOTAK 7: Bottom Right Landscape Card', dim: '1920x1080px (16:10)' },
  ];

  // Temporary Form States
  const [newProject, setNewProject] = useState({
    category: 'PHOTOGRAPHY',
    title: '',
    camera: 'SONY A6700',
    client: '',
    role: '',
    year: '2025',
    aspectRatio: '16:9',
    image: '',
    mediaUrl: '',
    description: '',
    fullDescription: '',
    tools: 'Sony A6700, Lightroom',
  });

  const [newBts, setNewBts] = useState({
    title: '',
    tag: 'TEAM PHOTO',
    location: 'DENPASAR',
    year: '2025',
    image: '',
    description: '',
  });

  const [newSoftware, setNewSoftware] = useState({
    name: '',
    level: 90,
    category: 'Video & Motion',
    icon: 'Film',
    description: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoadingAuth(true);

    const emailClean = usernameInput.trim();
    const passClean = passwordInput.trim();

    if (!emailClean) {
      setAuthError('Silakan masukkan Email Admin Firebase!');
      setIsLoadingAuth(false);
      return;
    }

    if (!passClean) {
      setAuthError('Silakan masukkan Password!');
      setIsLoadingAuth(false);
      return;
    }

    if (!auth) {
      setAuthError('Firebase Auth belum diinisialisasi. Periksa koneksi internet atau konfigurasi Firebase.');
      setIsLoadingAuth(false);
      return;
    }

    try {
      // Autentikasi aman terenkripsi melalui Firebase Authentication Server
      const userCredential = await signInWithEmailAndPassword(auth, emailClean, passClean);
      if (userCredential && userCredential.user) {
        setCurrentUser(userCredential.user);
        setIsAuthenticated(true);
        setAuthError('');
        showToast(`⚡ Access Granted! Selamat Datang, ${userCredential.user.email}.`);
      }
    } catch (fbErr) {
      let errorMsg = 'Email atau Password salah! Periksa kembali akun di Firebase Console.';
      if (fbErr.code === 'auth/invalid-email') {
        errorMsg = 'Format email tidak valid (harus berupa email valid, contoh: admin@nandacreative.com).';
      } else if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/invalid-credential') {
        errorMsg = 'Email atau Password salah! Pastikan akun sudah didaftarkan di Firebase Authentication.';
      } else if (fbErr.code === 'auth/too-many-requests') {
        errorMsg = 'Terlalu banyak percobaan login gagal. Silakan tunggu beberapa saat.';
      } else if (fbErr.code === 'auth/network-request-failed') {
        errorMsg = 'Koneksi jaringan gagal. Pastikan perangkat terhubung ke internet.';
      }
      setAuthError(errorMsg);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (auth) {
        await fbSignOut(auth);
      }
    } catch (e) {}
    setCurrentUser(null);
    setIsAuthenticated(false);
    showToast('👋 Berhasil Sign Out.');
  };

  const handleGoToWeb = () => {
    window.location.href = '/';
  };

  // 1. HERO SAVE & ITEM EDIT HANDLERS
  const handleSaveHero = async () => {
    await updateSectionData('hero', heroData);
    showToast('✅ Seluruh elemen Hero Section berhasil disimpan!');
  };

  const handleHeroFootageItemChange = (index, field, value) => {
    const currentList = [...(heroData.heroFootage || [])];
    if (currentList[index]) {
      currentList[index] = { ...currentList[index], [field]: value };
      setHeroData({ ...heroData, heroFootage: currentList });
    }
  };

  // 2. ABOUT SAVE & EXPERIENCE HANDLERS
  const handleSaveAbout = async () => {
    await updateSectionData('about', aboutData);
    showToast('✅ Seluruh elemen About Section berhasil disimpan!');
  };

  const handleExperienceChange = (index, field, value) => {
    const currentExp = [...(aboutData.experiences || [])];
    if (currentExp[index]) {
      currentExp[index] = { ...currentExp[index], [field]: value };
      setAboutData({ ...aboutData, experiences: currentExp });
    }
  };

  // 3. PORTFOLIO SAVE & ITEM EDIT HANDLERS
  const handleSaveAllPortfolio = async () => {
    const normalizedPortfolio = portfolioData.map((p) => {
      let toolsArr = p.tools;
      if (typeof toolsArr === 'string') {
        toolsArr = toolsArr.split(',').map((t) => t.trim()).filter(Boolean);
      } else if (!Array.isArray(toolsArr)) {
        toolsArr = [];
      }
      return { ...p, tools: toolsArr };
    });
    await updateSectionData('portfolioHeader', portfolioHeaderData);
    await updateSectionData('portfolio', normalizedPortfolio);
    setPortfolioData(normalizedPortfolio);
    showToast('✅ Seluruh Project Portofolio & Project Overview berhasil disimpan!');
  };

  const handleProjectItemChange = (actualIndex, field, value) => {
    const currentList = [...portfolioData];
    if (currentList[actualIndex]) {
      currentList[actualIndex] = { ...currentList[actualIndex], [field]: value };
      setPortfolioData(currentList);
    }
  };

  const handleAddProjectForCategory = async (targetCategory) => {
    if (!newProject.title || !newProject.image) {
      showToast('⚠️ Judul dan URL Foto wajib diisi!');
      return;
    }
    const toolsArr = typeof newProject.tools === 'string'
      ? newProject.tools.split(',').map((t) => t.trim()).filter(Boolean)
      : (newProject.tools || []);

    const updated = [
      ...portfolioData,
      {
        id: 'p_' + Date.now(),
        ...newProject,
        category: targetCategory,
        tools: toolsArr,
      },
    ];
    setPortfolioData(updated);
    await updateSectionData('portfolio', updated);
    setNewProject({
      category: targetCategory,
      title: '',
      camera: 'SONY A6700',
      client: '',
      role: '',
      year: '2025',
      aspectRatio: '16:9',
      image: '',
      mediaUrl: '',
      description: '',
      fullDescription: '',
      tools: 'Sony A6700, Lightroom',
    });
    showToast(`🎉 Project baru kategori ${targetCategory} berhasil ditambahkan!`);
  };

  const handleDeleteProject = async (id) => {
    const updated = portfolioData.filter((p) => p.id !== id);
    setPortfolioData(updated);
    await updateSectionData('portfolio', updated);
    showToast('🗑️ Project berhasil dihapus.');
  };

  // 4. BTS HANDLERS
  const handleSaveBts = async () => {
    await updateSectionData('bts', btsData);
    showToast('✅ Seluruh Galeri BTS berhasil disimpan!');
  };

  const handleBtsItemChange = (index, field, value) => {
    const currentList = [...btsData];
    if (currentList[index]) {
      currentList[index] = { ...currentList[index], [field]: value };
      setBtsData(currentList);
    }
  };

  const handleAddBts = async () => {
    if (!newBts.title || !newBts.image) {
      showToast('⚠️ Judul dan URL Foto BTS wajib diisi!');
      return;
    }
    const updated = [...btsData, { id: 'bts_' + Date.now(), ...newBts }];
    setBtsData(updated);
    await updateSectionData('bts', updated);
    setNewBts({ title: '', tag: 'TEAM PHOTO', location: 'DENPASAR', year: '2025', image: '', description: '' });
    showToast('🎉 Foto BTS baru berhasil ditambahkan!');
  };

  const handleDeleteBts = async (id) => {
    const updated = btsData.filter((b) => b.id !== id);
    setBtsData(updated);
    await updateSectionData('bts', updated);
    showToast('🗑️ Foto BTS berhasil dihapus.');
  };

  // 5. SOFTWARE HANDLERS
  const handleSaveSoftware = async () => {
    await updateSectionData('software', softwareData);
    showToast('✅ Data Software & Tools berhasil disimpan!');
  };

  const handleSoftwareItemChange = (index, field, value) => {
    const currentList = [...softwareData];
    if (currentList[index]) {
      currentList[index] = { ...currentList[index], [field]: value };
      setSoftwareData(currentList);
    }
  };

  const handleAddSoftware = async () => {
    if (!newSoftware.name) {
      showToast('⚠️ Nama Software wajib diisi!');
      return;
    }
    const updated = [...softwareData, { id: 'sw_' + Date.now(), ...newSoftware }];
    setSoftwareData(updated);
    await updateSectionData('software', updated);
    setNewSoftware({ name: '', level: 90, category: 'Video & Motion', icon: 'Film', description: '' });
    showToast('🎉 Software baru berhasil ditambahkan!');
  };

  const handleDeleteSoftware = async (id) => {
    const updated = softwareData.filter((s) => s.id !== id);
    setSoftwareData(updated);
    await updateSectionData('software', updated);
    showToast('🗑️ Software berhasil dihapus.');
  };

  const handleResetAll = () => {
    if (window.confirm('Reset seluruh isi CMS ke standar awal?')) {
      resetCmsToDefault();
      setHeroData(getSectionData('hero'));
      setAboutData(getSectionData('about'));
      setPortfolioHeaderData(getSectionData('portfolioHeader'));
      setPortfolioData(getSectionData('portfolio') || []);
      setBtsData(getSectionData('bts') || []);
      setSoftwareData(getSectionData('software') || []);
      showToast('🔄 CMS berhasil di-reset!');
    }
  };

  // LOADING SESSION CHECK
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] flex items-center justify-center p-4">
        <div className="p-6 bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl flex items-center gap-3 font-mono text-sm font-extrabold animate-pulse">
          <ShieldCheck className="w-6 h-6 text-[#3B6EF5] animate-spin" />
          <span>MEMVERIFIKASI SESI KEAMANAN FIREBASE...</span>
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] bg-[linear-gradient(to_right,#0a0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a0a_1px,transparent_1px)] bg-[size:24px_24px] flex flex-col justify-between p-4 sm:p-8 select-none">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handleGoToWeb}
            className="px-4 py-2 bg-white text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl font-mono text-xs font-extrabold hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Kembali Ke Website Utama</span>
          </button>
          <span className="font-mono text-xs font-extrabold text-[#0A0A0A]/60">NANDA CREATIVE • ADMIN PORTAL</span>
        </div>

        <div className="w-full max-w-md mx-auto bg-white border-[3px] border-[#0A0A0A] shadow-[12px_12px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b-[2.5px] border-[#0A0A0A] pb-4">
            <div className="p-3 bg-[#FFC93C] border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-xl">
              <Lock className="w-7 h-7 text-[#0A0A0A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-2xl text-[#0A0A0A] leading-tight">ADMIN PORTAL</h1>
                <span className="px-2 py-0.5 bg-[#FF5C8A] text-white font-mono text-[9px] font-extrabold rounded border border-[#0A0A0A] flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current" />
                  <span>FIREBASE AUTH</span>
                </span>
              </div>
              <p className="font-mono text-xs font-extrabold text-[#3B6EF5]">SECURE BACKEND AUTHENTICATION</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1.5 uppercase flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#3B6EF5]" />
                <span>EMAIL ADMIN FIREBASE:</span>
              </label>
              <input
                type="email"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Masukkan Email Admin"
                className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl font-mono text-xs font-bold focus:outline-none focus:bg-white"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1.5 uppercase flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#FF5C8A]" />
                <span>PASSWORD:</span>
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan Password Firebase Auth Anda"
                className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl font-mono text-xs font-bold focus:outline-none focus:bg-white"
              />
            </div>

            {authError && (
              <div className="p-3 bg-[#FF5C8A]/15 border-[2px] border-[#FF5C8A] rounded-xl">
                <p className="text-xs font-mono font-extrabold text-[#FF5C8A] leading-tight">
                  ⚠️ {authError}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoadingAuth}
              className={`w-full py-3 bg-[#3B6EF5] text-white font-mono text-sm font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-xl hover:bg-[#2c5ad6] cursor-pointer flex items-center justify-center gap-2 transition-all ${
                isLoadingAuth ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px]'
              }`}
            >
              {isLoadingAuth ? (
                <span>Memverifikasi Akun...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#4CE0D2]" />
                  <span>Sign In To Admin Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center font-mono text-xs font-bold text-[#0A0A0A]/50">
          © 2026 PUTU AGUS NANDA PRATAMA • ALL RIGHTS RESERVED
        </div>
      </div>
    );
  }

  // FULL DASHBOARD SYSTEM WITH COMPLETE DETAILS ACROSS ALL TABS
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0A0A0A] flex flex-col select-none">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0A] text-white border-[2px] border-white shadow-[6px_6px_0px_#0A0A0A] px-5 py-2.5 rounded-xl text-xs font-mono font-extrabold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Navbar Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FFC93C] border-b-[3px] border-[#0A0A0A] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleGoToWeb}
            className="p-2 bg-white text-[#0A0A0A] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl hover:bg-gray-100 cursor-pointer flex items-center gap-1.5 font-mono text-xs font-extrabold"
            title="Kembali ke Tampilan Utama"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Website Live</span>
          </button>

          <div className="h-6 w-[2px] bg-[#0A0A0A]/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#0A0A0A] text-white font-mono text-xs font-extrabold rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4CE0D2]" />
              <span>ADMIN PAGE CMS</span>
            </span>
            <h1 className="font-heading font-extrabold text-xl text-[#0A0A0A] hidden md:block">
              BACKEND CONTROL PANEL
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetAll}
            className="px-3.5 py-2 bg-white text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl hover:bg-gray-100 cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#FF5C8A] text-white font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl hover:bg-[#e04b77] cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-4 space-y-3 sticky top-24">
          <div className="border-b-[2px] border-[#0A0A0A] pb-2">
            <span className="text-[10px] font-mono font-extrabold text-[#0A0A0A]/60 block uppercase">MANAGEMENT TABS</span>
            <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A]">SECTION CMS</h3>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'hero', label: '1. Hero Full Manager', icon: Sparkles },
              { id: 'about', label: '2. About & Bio Full Manager', icon: User },
              { id: 'portfolio', label: '3. Portfolio Projects (Sub-Sections)', icon: Camera },
              { id: 'bts', label: `4. BTS Gallery Manager (${btsData.length})`, icon: Film },
              { id: 'software', label: '5. Software & Gear Manager', icon: Cpu },
              { id: 'messages', label: `6. Inbox (${messagesData.length})`, icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-3 font-mono text-xs font-extrabold rounded-xl border-[2px] border-[#0A0A0A] flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3B6EF5] text-white shadow-[4px_4px_0px_#0A0A0A] -translate-y-0.5'
                      : 'bg-[#FAFAF7] text-[#0A0A0A] hover:bg-gray-100 shadow-[2px_2px_0px_#0A0A0A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* RIGHT WORKSPACE WORKAREA */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: HERO FULL SECTION MANAGER */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-5">
                <div>
                  <span className="px-2.5 py-0.5 bg-[#FFC93C] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-[10px] font-extrabold rounded">SECTION 1</span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#0A0A0A]">EDIT SELURUH ISI HERO SECTION</h2>
                </div>
                <button
                  onClick={handleSaveHero}
                  className="px-6 py-3 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4.5 h-4.5" />
                  <span>Simpan Perubahan Hero</span>
                </button>
              </div>

              {/* CARD 1: GREETING & HEADLINE */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  1. HEADLINE & GREETING MANAGER
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">GREETING PILL TAG (ATAS):</label>
                    <input
                      type="text"
                      value={heroData.greeting}
                      onChange={(e) => setHeroData({ ...heroData, greeting: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">ROLES SUB-HEADLINE:</label>
                    <input
                      type="text"
                      value={heroData.roles}
                      onChange={(e) => setHeroData({ ...heroData, roles: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">HEADLINE BARIS 1:</label>
                    <input
                      type="text"
                      value={heroData.headline1}
                      onChange={(e) => setHeroData({ ...heroData, headline1: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">HEADLINE BARIS 2 (BADGE KUNING):</label>
                    <input
                      type="text"
                      value={heroData.headline2}
                      onChange={(e) => setHeroData({ ...heroData, headline2: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: DESKRIPSI & CTA */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  2. DESKRIPSI & TOMBOL ACTION (CTA BUTTONS)
                </h3>
                <div>
                  <label className="block font-mono text-xs font-extrabold text-[#0A0A0A] mb-1 uppercase">TEKS DESKRIPSI PARAGRAF HERO:</label>
                  <textarea
                    rows={3}
                    value={heroData.description}
                    onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TOMBOL UTAMA - LABEL:</label>
                    <input
                      type="text"
                      value={heroData.ctaPrimaryLabel}
                      onChange={(e) => setHeroData({ ...heroData, ctaPrimaryLabel: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TOMBOL UTAMA - TARGET URL:</label>
                    <input
                      type="text"
                      value={heroData.ctaPrimaryUrl}
                      onChange={(e) => setHeroData({ ...heroData, ctaPrimaryUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TOMBOL KEDUA - LABEL:</label>
                    <input
                      type="text"
                      value={heroData.ctaSecondaryLabel}
                      onChange={(e) => setHeroData({ ...heroData, ctaSecondaryLabel: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TOMBOL KEDUA - TARGET URL:</label>
                    <input
                      type="text"
                      value={heroData.ctaSecondaryUrl}
                      onChange={(e) => setHeroData({ ...heroData, ctaSecondaryUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: SOCIAL MEDIA LINKS */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  3. CONNECT WITH ME — SOCIAL MEDIA LINKS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">INSTAGRAM LINK URL:</label>
                    <input
                      type="text"
                      value={heroData.instagramUrl}
                      onChange={(e) => setHeroData({ ...heroData, instagramUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">WHATSAPP LINK URL:</label>
                    <input
                      type="text"
                      value={heroData.whatsappUrl}
                      onChange={(e) => setHeroData({ ...heroData, whatsappUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">EMAIL ADDRESS:</label>
                    <input
                      type="text"
                      value={heroData.emailUrl}
                      onChange={(e) => setHeroData({ ...heroData, emailUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">GITHUB LINK URL:</label>
                    <input
                      type="text"
                      value={heroData.githubUrl}
                      onChange={(e) => setHeroData({ ...heroData, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 4: PANDUAN SPESIFIKASI FOOTAGE */}
              <div className="bg-[#FFC93C]/20 border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#0A0A0A]">
                  <Info className="w-5 h-5 stroke-[2.5] text-[#3B6EF5]" />
                  <h3 className="font-heading font-extrabold text-lg">PANDUAN SPESIFIKASI & DIMENSI FOOTAGE HERO</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs text-[#0A0A0A]">
                  <div className="p-3 bg-white border border-[#0A0A0A] rounded-xl space-y-1">
                    <span className="font-extrabold text-[#3B6EF5] block">📐 LANDSCAPE CARDS (1, 2, 4, 5, 6, 7)</span>
                    <p>• Dimensi: <strong>1920 x 1080 px</strong> / <strong>1280 x 720 px</strong></p>
                    <p>• Aspect Ratio: <strong>16:9</strong> / <strong>16:10</strong></p>
                  </div>
                  <div className="p-3 bg-white border border-[#0A0A0A] rounded-xl space-y-1">
                    <span className="font-extrabold text-[#FF5C8A] block">📱 PORTRAIT CARD (KOTAK 3)</span>
                    <p>• Dimensi: <strong>1080 x 1440 px</strong> / <strong>1080 x 1920 px</strong></p>
                    <p>• Aspect Ratio: <strong>3:4</strong> / <strong>9:16</strong></p>
                  </div>
                  <div className="p-3 bg-white border border-[#0A0A0A] rounded-xl space-y-1">
                    <span className="font-extrabold text-[#A3E635] block">⚡ FORMAT & UKURAN FILE</span>
                    <p>• Format: <strong>.jpg</strong>, <strong>.png</strong>, <strong>.webp</strong>, video <strong>.webm</strong> / <strong>.mp4</strong></p>
                    <p>• Max Size: <strong>&lt; 15 MB</strong> Video & <strong>&lt; 2 MB</strong> Foto</p>
                  </div>
                </div>
              </div>

              {/* CARD 5: 7 KOTAK FOOTAGE HERO */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="font-heading font-extrabold text-2xl text-[#0A0A0A] border-b-[2.5px] border-[#0A0A0A] pb-3">
                  EDIT 7 KOTAK FOOTAGE HERO (RIGHT PINK SECTION)
                </h3>
                <div className="space-y-4">
                  {(heroData.heroFootage || []).slice(0, 7).map((item, idx) => {
                    const slotInfo = slotLabels[idx] || { name: `KOTAK ${idx + 1}`, dim: 'Standard' };
                    return (
                      <div
                        key={item.id || idx}
                        className="bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-2xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-2">
                          <span className="px-2.5 py-1 bg-[#FFC93C] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-xs font-extrabold rounded-lg">
                            SLOT #{idx + 1} — {slotInfo.name}
                          </span>
                          <span className="px-2 py-0.5 bg-white text-[#3B6EF5] border border-[#0A0A0A] font-mono text-[10px] font-extrabold rounded">
                            REKOMENDASI: {slotInfo.dim}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="md:col-span-3 aspect-[16/10] bg-[#0A0A0A] rounded-xl border-[2px] border-[#0A0A0A] overflow-hidden relative">
                            <img src={item.img} alt={item.filename} className="w-full h-full object-cover" />
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#0A0A0A] text-white font-mono text-[8px] font-extrabold rounded">
                              {item.tag}
                            </span>
                          </div>
                          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                            <div>
                              <label className="block font-extrabold text-[#0A0A0A] mb-1">NAMA FILE EMBED:</label>
                              <input
                                type="text"
                                value={item.filename}
                                onChange={(e) => handleHeroFootageItemChange(idx, 'filename', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                              />
                            </div>
                            <div>
                              <label className="block font-extrabold text-[#0A0A0A] mb-1">TAG BADGE:</label>
                              <input
                                type="text"
                                value={item.tag}
                                onChange={(e) => handleHeroFootageItemChange(idx, 'tag', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block font-extrabold text-[#0A0A0A] mb-1">URL FOTO / FOOTAGE (IMAGEKIT):</label>
                              <input
                                type="text"
                                value={item.img}
                                onChange={(e) => handleHeroFootageItemChange(idx, 'img', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT & BIO FULL MANAGER */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-5">
                <div>
                  <span className="px-2.5 py-0.5 bg-[#3B6EF5] text-white border border-[#0A0A0A] font-mono text-[10px] font-extrabold rounded">SECTION 2</span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#0A0A0A]">EDIT SELURUH ISI ABOUT SECTION</h2>
                </div>
                <button
                  onClick={handleSaveAbout}
                  className="px-6 py-3 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4.5 h-4.5" />
                  <span>Simpan Perubahan About</span>
                </button>
              </div>

              {/* CARD 1: ID PASS POLAROID & STAT COUNTERS */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  1. ID PASS POLAROID & STAT BADGES (LEFT COLUMN)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">PAS FOTO POLAROID URL (IMAGEKIT):</label>
                    <input
                      type="text"
                      value={aboutData.photoUrl}
                      onChange={(e) => setAboutData({ ...aboutData, photoUrl: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">LOKASI DOMISILI (PIN):</label>
                    <input
                      type="text"
                      value={aboutData.location}
                      onChange={(e) => setAboutData({ ...aboutData, location: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">APPROVED STICKER TEXT:</label>
                    <input
                      type="text"
                      value={aboutData.approvedStamp}
                      onChange={(e) => setAboutData({ ...aboutData, approvedStamp: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">NAMA SINGKAT (UTAMA):</label>
                    <input
                      type="text"
                      value={aboutData.name}
                      onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">NAMA LENGKAP (SUBTITLE):</label>
                    <input
                      type="text"
                      value={aboutData.fullName}
                      onChange={(e) => setAboutData({ ...aboutData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">ROLE BADGE (PINK ATAS FOTO):</label>
                    <input
                      type="text"
                      value={aboutData.roleBadge}
                      onChange={(e) => setAboutData({ ...aboutData, roleBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">AVAILABILITY STATUS:</label>
                    <input
                      type="text"
                      value={aboutData.availabilityStatus}
                      onChange={(e) => setAboutData({ ...aboutData, availabilityStatus: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#0A0A0A]/15 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 bg-[#A3E635]/20 border border-[#0A0A0A] rounded-xl space-y-1">
                    <span className="font-extrabold block text-[#0A0A0A]">STAT 1 (PROJECTS)</span>
                    <input
                      type="text"
                      value={aboutData.stat1Val}
                      onChange={(e) => setAboutData({ ...aboutData, stat1Val: e.target.value })}
                      className="w-full px-2 py-1 bg-white border border-[#0A0A0A] rounded font-bold"
                    />
                  </div>
                  <div className="p-3 bg-[#FFC93C]/20 border border-[#0A0A0A] rounded-xl space-y-1">
                    <span className="font-extrabold block text-[#0A0A0A]">STAT 2 (CLIENTS)</span>
                    <input
                      type="text"
                      value={aboutData.stat2Val}
                      onChange={(e) => setAboutData({ ...aboutData, stat2Val: e.target.value })}
                      className="w-full px-2 py-1 bg-white border border-[#0A0A0A] rounded font-bold"
                    />
                  </div>
                  <div className="p-3 bg-[#FF5C8A]/20 border border-[#0A0A0A] rounded-xl space-y-1">
                    <span className="font-extrabold block text-[#0A0A0A]">STAT 3 (SATISFACTION)</span>
                    <input
                      type="text"
                      value={aboutData.stat3Val}
                      onChange={(e) => setAboutData({ ...aboutData, stat3Val: e.target.value })}
                      className="w-full px-2 py-1 bg-white border border-[#0A0A0A] rounded font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: DATA CHIPS & BIOGRAPHY */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  2. DATA CHIPS & BIOGRAPHY CARD (RIGHT COLUMN)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TANGGAL LAHIR (DOB):</label>
                    <input
                      type="text"
                      value={aboutData.dob}
                      onChange={(e) => setAboutData({ ...aboutData, dob: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">NATIVE LANGUAGE:</label>
                    <input
                      type="text"
                      value={aboutData.nativeLang}
                      onChange={(e) => setAboutData({ ...aboutData, nativeLang: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">HOBBIES:</label>
                    <input
                      type="text"
                      value={aboutData.hobbies}
                      onChange={(e) => setAboutData({ ...aboutData, hobbies: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TEKS BIOGRAFI PARAGRAF 1:</label>
                    <textarea
                      rows={3}
                      value={aboutData.bioPara1}
                      onChange={(e) => setAboutData({ ...aboutData, bioPara1: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TEKS BIOGRAFI PARAGRAF 2:</label>
                    <textarea
                      rows={2}
                      value={aboutData.bioPara2}
                      onChange={(e) => setAboutData({ ...aboutData, bioPara2: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: QUOTE & CONTACTS */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  3. QUOTE & DIRECT CONTACT INFO
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">QUOTE TEKS:</label>
                    <input
                      type="text"
                      value={aboutData.quoteText}
                      onChange={(e) => setAboutData({ ...aboutData, quoteText: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">QUOTE PENULIS AUTHOR:</label>
                    <input
                      type="text"
                      value={aboutData.quoteAuthor}
                      onChange={(e) => setAboutData({ ...aboutData, quoteAuthor: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">WHATSAPP NOMOR:</label>
                    <input
                      type="text"
                      value={aboutData.whatsapp}
                      onChange={(e) => setAboutData({ ...aboutData, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">EMAIL ADDRESS:</label>
                    <input
                      type="text"
                      value={aboutData.email}
                      onChange={(e) => setAboutData({ ...aboutData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">📄 URL / LINK DOWNLOAD CV (PDF / GOOGLE DRIVE / IMAGEKIT):</label>
                    <input
                      type="text"
                      value={aboutData.cvUrl || ''}
                      onChange={(e) => setAboutData({ ...aboutData, cvUrl: e.target.value })}
                      placeholder="https://ik.imagekit.io/.../CV_AGUS_NANDA.pdf atau link Google Drive"
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 4: 4 EXPERIENCE CARDS */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="font-heading font-extrabold text-2xl text-[#0A0A0A] border-b-[2.5px] border-[#0A0A0A] pb-3">
                  4. EDIT 4 KARTU PENGALAMAN (EXPERIENCE BENTO CARDS)
                </h3>
                <div className="space-y-4">
                  {(aboutData.experiences || []).slice(0, 4).map((exp, idx) => (
                    <div
                      key={exp.id || idx}
                      className="bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-2 font-mono text-xs">
                        <span className="px-2.5 py-1 bg-[#FFC93C] text-[#0A0A0A] border border-[#0A0A0A] font-extrabold rounded-lg">
                          EXPERIENCE CARD #{idx + 1}
                        </span>
                        <span className="font-extrabold text-[#3B6EF5]">{exp.title}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                        <div>
                          <label className="block font-extrabold text-[#0A0A0A] mb-1">PERIODE TAHUN:</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(idx, 'period', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-extrabold text-[#0A0A0A] mb-1">JUDUL ORGANISASI:</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => handleExperienceChange(idx, 'title', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-extrabold text-[#0A0A0A] mb-1">SUBTITLE ROLE:</label>
                          <input
                            type="text"
                            value={exp.subtitle}
                            onChange={(e) => handleExperienceChange(idx, 'subtitle', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block font-extrabold text-[#0A0A0A] mb-1">DESKRIPSI TUGAS:</label>
                          <textarea
                            rows={2}
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO PROJECTS WITH DEDICATED CATEGORY SUB-SECTIONS */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-5">
                <div>
                  <span className="px-2.5 py-0.5 bg-[#FF5C8A] text-white border border-[#0A0A0A] font-mono text-[10px] font-extrabold rounded">SECTION 3</span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#0A0A0A]">PORTFOLIO SUB-SECTIONS CMS</h2>
                </div>
                <button
                  onClick={handleSaveAllPortfolio}
                  className="px-6 py-3 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4.5 h-4.5" />
                  <span>Simpan Semua Category</span>
                </button>
              </div>

              {/* DEDICATED SUB-SECTION CATEGORY SWITCHER BAR */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-4 flex flex-wrap gap-2.5">
                {[
                  { id: 'HEADER', label: '⚙️ Header & Settings', color: 'bg-[#FFC93C] text-[#0A0A0A]', icon: SlidersHorizontal },
                  { id: 'PHOTOGRAPHY', label: '📸 1. Photography Section', color: 'bg-[#3B6EF5] text-white', icon: Camera },
                  { id: 'VIDEOGRAPHY', label: '🎬 2. Videography Section', color: 'bg-[#FF5C8A] text-white', icon: Video },
                  { id: 'EDITOR', label: '✂️ 3. Editor (Post-Prod) Section', color: 'bg-[#FFC93C] text-[#0A0A0A]', icon: Film },
                  { id: 'FULLSTACK DEV', label: '💻 4. Fullstack Dev Section', color: 'bg-[#4CE0D2] text-[#0A0A0A]', icon: Code },
                ].map((sub) => {
                  const isActive = portfolioSubTab === sub.id;
                  const Icon = sub.icon;
                  const count = sub.id === 'HEADER' ? null : portfolioData.filter((p) => p.category === sub.id).length;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setPortfolioSubTab(sub.id)}
                      className={`px-4 py-2.5 font-mono text-xs font-extrabold rounded-xl border-[2px] border-[#0A0A0A] flex items-center gap-2 transition-all cursor-pointer ${
                        isActive
                          ? `${sub.color} shadow-[4px_4px_0px_#0A0A0A] -translate-y-0.5`
                          : 'bg-[#FAFAF7] text-[#0A0A0A] hover:bg-gray-100 shadow-[2px_2px_0px_#0A0A0A]'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                      <span>{sub.label}</span>
                      {count !== null && (
                        <span className="ml-1 px-2 py-0.5 bg-[#0A0A0A] text-white rounded-full text-[10px]">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* SUB-SECTION 0: HEADER & SETTINGS */}
              {portfolioSubTab === 'HEADER' && (
                <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                    PORTFOLIO HEADER & PROMPT BANNER
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">SECTION PILL BADGE:</label>
                      <input
                        type="text"
                        value={portfolioHeaderData.badge}
                        onChange={(e) => setPortfolioHeaderData({ ...portfolioHeaderData, badge: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">SECTION TITLE UTAMA:</label>
                      <input
                        type="text"
                        value={portfolioHeaderData.title}
                        onChange={(e) => setPortfolioHeaderData({ ...portfolioHeaderData, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">SUBTITLE DESKRIPSI HEADER:</label>
                      <input
                        type="text"
                        value={portfolioHeaderData.subtitle}
                        onChange={(e) => setPortfolioHeaderData({ ...portfolioHeaderData, subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-SECTIONS 1-4: CATEGORY PROJECT MANAGERS */}
              {portfolioSubTab !== 'HEADER' && (
                <div className="space-y-6">
                  {/* Form Tambah Project */}
                  <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-3">
                      <div>
                        <span className="px-2.5 py-1 bg-[#0A0A0A] text-white font-mono text-xs font-extrabold rounded-lg">
                          CATEGORY: {portfolioSubTab}
                        </span>
                        <h3 className="font-heading font-extrabold text-xl text-[#0A0A0A] mt-1">
                          TAMBAH PROJECT BARU UNTUK {portfolioSubTab}
                        </h3>
                      </div>
                    </div>

                    {/* Row 1: Title, Camera, Ratio */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">JUDUL PROJECT *:</label>
                        <input
                          type="text"
                          placeholder="Misal: HSS SWEET SEVENTEEN"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">CAMERA / SPECS BADGE:</label>
                        <input
                          type="text"
                          placeholder="Misal: SONY A6700 / AFTER EFFECTS"
                          value={newProject.camera}
                          onChange={(e) => setNewProject({ ...newProject, camera: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">ASPECT RATIO MEDIA:</label>
                        <select
                          value={newProject.aspectRatio}
                          onChange={(e) => setNewProject({ ...newProject, aspectRatio: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        >
                          <option value="16:9">16:9 (Widescreen)</option>
                          <option value="9:16">9:16 (Vertikal Reels/TikTok)</option>
                          <option value="1:1">1:1 (Persegi)</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 2: Client, Role, Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">CLIENT / EVENT:</label>
                        <input
                          type="text"
                          placeholder="Misal: Hellen Sweet 17th / SMAN 1 Mengwi"
                          value={newProject.client || ''}
                          onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">ROLE SPESIFIK:</label>
                        <input
                          type="text"
                          placeholder="Misal: Lead Event Photographer / Motion Editor"
                          value={newProject.role || ''}
                          onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TAHUN PELAKSANAAN:</label>
                        <input
                          type="text"
                          placeholder="Misal: 2024 - 2025"
                          value={newProject.year || ''}
                          onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    {/* Row 3: Image & Video URLs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">URL FOTO / POSTER IMAGEKIT *:</label>
                        <input
                          type="text"
                          placeholder="https://ik.imagekit.io/..."
                          value={newProject.image}
                          onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">URL VIDEO FOOTAGE (.WEBM / .MP4):</label>
                        <input
                          type="text"
                          placeholder="https://ik.imagekit.io/...webm (Opsional)"
                          value={newProject.mediaUrl}
                          onChange={(e) => setNewProject({ ...newProject, mediaUrl: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    {/* Row 4: Tools & Short Description */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TOOLS USED (PISAH DENGAN KOMA):</label>
                        <input
                          type="text"
                          placeholder="Sony A6700, Lightroom Classic, Photoshop"
                          value={newProject.tools}
                          onChange={(e) => setNewProject({ ...newProject, tools: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">DESKRIPSI SINGKAT KARTU (CARD PREVIEW):</label>
                        <input
                          type="text"
                          placeholder="Ringkasan 1-2 kalimat untuk preview di depan..."
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    {/* Row 5: PROJECT OVERVIEW (FULL DESCRIPTION DI MODAL) */}
                    <div className="font-mono text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block font-extrabold text-[#0A0A0A] uppercase">
                          📖 PROJECT OVERVIEW (DETAIL LENGKAP PADA POPUP SPEC MODAL):
                        </label>
                        <span className="text-[10px] text-[#3B6EF5] font-extrabold">Tampil pada popup modal saat kartu diklik</span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Jelaskan detail lengkap project, konsep visual, proses produksi, atau arsitektur teknologi..."
                        value={newProject.fullDescription}
                        onChange={(e) => setNewProject({ ...newProject, fullDescription: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={() => handleAddProjectForCategory(portfolioSubTab)}
                      className="px-6 py-3 bg-[#FFC93C] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-xl hover:bg-[#f0b722] cursor-pointer flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Tambah Project Ke Kategori {portfolioSubTab}</span>
                    </button>
                  </div>

                  {/* List Project */}
                  <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-4">
                      <h3 className="font-heading font-extrabold text-2xl text-[#0A0A0A]">
                        DAFTAR PROJECT KATEGORI {portfolioSubTab} ({portfolioData.filter((p) => p.category === portfolioSubTab).length})
                      </h3>
                      <button
                        onClick={handleSaveAllPortfolio}
                        className="px-5 py-2.5 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan {portfolioSubTab}</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {portfolioData.filter((p) => p.category === portfolioSubTab).map((item) => {
                        const actualIndex = portfolioData.findIndex((orig) => orig.id === item.id);
                        return (
                          <div
                            key={item.id}
                            className="bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] rounded-2xl p-5 space-y-4"
                          >
                            <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-[#3B6EF5] text-white border border-[#0A0A0A] font-mono text-xs font-extrabold rounded-lg">
                                  {item.category} — {item.title || 'Untitled Project'}
                                </span>
                                {item.client && (
                                  <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#FFC93C] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-[10px] font-extrabold rounded">
                                    {item.client}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteProject(item.id)}
                                className="px-3 py-1.5 bg-[#FF5C8A] text-white border border-[#0A0A0A] rounded-lg hover:bg-[#e04b77] cursor-pointer font-mono text-xs font-extrabold flex items-center gap-1.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Hapus</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start font-mono text-xs">
                              {/* Left Column: Image Preview */}
                              <div className="md:col-span-3 aspect-[16/10] bg-[#0A0A0A] rounded-xl border-[2px] border-[#0A0A0A] overflow-hidden relative shadow-sm">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-[#FFC93C] text-[#0A0A0A] font-mono text-[9px] font-extrabold rounded">
                                  {item.aspectRatio || '16:9'}
                                </span>
                              </div>

                              {/* Right Column: Editable Fields */}
                              <div className="md:col-span-9 space-y-3">
                                {/* Row 1: Title, Camera, Ratio */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">JUDUL PROJECT:</label>
                                    <input
                                      type="text"
                                      value={item.title || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'title', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">SPECS / CAMERA:</label>
                                    <input
                                      type="text"
                                      value={item.camera || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'camera', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">ASPECT RATIO:</label>
                                    <select
                                      value={item.aspectRatio || '16:9'}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'aspectRatio', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    >
                                      <option value="16:9">16:9 (Widescreen)</option>
                                      <option value="9:16">9:16 (Vertikal Reels)</option>
                                      <option value="1:1">1:1 (Persegi)</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Row 2: Client, Role, Year */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">CLIENT / EVENT:</label>
                                    <input
                                      type="text"
                                      placeholder="Misal: Hellen Sweet 17th"
                                      value={item.client || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'client', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">ROLE SPESIFIK:</label>
                                    <input
                                      type="text"
                                      placeholder="Misal: Lead Event Photographer"
                                      value={item.role || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'role', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TAHUN:</label>
                                    <input
                                      type="text"
                                      placeholder="Misal: 2024 - 2025"
                                      value={item.year || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'year', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                </div>

                                {/* Row 3: Image & Video URLs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">URL FOTO / POSTER IMAGEKIT:</label>
                                    <input
                                      type="text"
                                      value={item.image || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'image', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">URL VIDEO FOOTAGE (.WEBM / .MP4):</label>
                                    <input
                                      type="text"
                                      placeholder="Opsional (untuk video)"
                                      value={item.mediaUrl || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'mediaUrl', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                </div>

                                {/* Row 4: Tools & Short Description */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TOOLS USED (PISAH DENGAN KOMA):</label>
                                    <input
                                      type="text"
                                      placeholder="Sony A6700, Lightroom, Photoshop"
                                      value={Array.isArray(item.tools) ? item.tools.join(', ') : item.tools || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'tools', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">DESKRIPSI SINGKAT (CARD PREVIEW):</label>
                                    <input
                                      type="text"
                                      placeholder="Deskripsi singkat yang tampil di kartu depan..."
                                      value={item.description || ''}
                                      onChange={(e) => handleProjectItemChange(actualIndex, 'description', e.target.value)}
                                      className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                                    />
                                  </div>
                                </div>

                                {/* Row 5: PROJECT OVERVIEW (FULL DESCRIPTION DI MODAL) */}
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <label className="block font-extrabold text-[#0A0A0A] uppercase">
                                      📖 PROJECT OVERVIEW (DETAIL MODAL SPEC SHEET):
                                    </label>
                                    <span className="text-[10px] text-[#3B6EF5] font-extrabold">Tampil pada popup spesifikasi saat project diklik</span>
                                  </div>
                                  <textarea
                                    rows={3}
                                    placeholder="Tuliskan overview lengkap mengenai project ini..."
                                    value={item.fullDescription !== undefined ? item.fullDescription : item.description || ''}
                                    onChange={(e) => handleProjectItemChange(actualIndex, 'fullDescription', e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold leading-relaxed"
                                  />
                                </div>

                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BTS GALLERY MANAGER (WITH FULL 9 CARDS EDITABLE DETAILS) */}
          {activeTab === 'bts' && (
            <div className="space-y-6">
              
              {/* Header Floating Action */}
              <div className="flex items-center justify-between bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-5">
                <div>
                  <span className="px-2.5 py-0.5 bg-[#4CE0D2] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-[10px] font-extrabold rounded">SECTION 4</span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#0A0A0A]">
                    EDIT SELURUH ISI BTS GALLERY ({btsData.length} KARTU)
                  </h2>
                </div>
                <button
                  onClick={handleSaveBts}
                  className="px-6 py-3 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4.5 h-4.5" />
                  <span>Simpan Perubahan BTS</span>
                </button>
              </div>

              {/* CARD 1: Form Tambah Foto Behind The Scenes Baru */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="border-b-[2.5px] border-[#0A0A0A] pb-3">
                  <h3 className="font-heading font-extrabold text-xl text-[#0A0A0A]">
                    1. TAMBAH FOTO BEHIND THE SCENES BARU
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">JUDUL DOKUMENTASI:</label>
                    <input
                      type="text"
                      placeholder="Misal: FKW 5 PRODUCTION CREW"
                      value={newBts.title}
                      onChange={(e) => setNewBts({ ...newBts, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TAG TIM / EVENT:</label>
                    <input
                      type="text"
                      placeholder="Misal: FKW 5 TEAM"
                      value={newBts.tag}
                      onChange={(e) => setNewBts({ ...newBts, tag: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">LOKASI EVENT:</label>
                    <input
                      type="text"
                      placeholder="Misal: STAGE PANGGUNG"
                      value={newBts.location}
                      onChange={(e) => setNewBts({ ...newBts, location: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">URL FOTO IMAGEKIT:</label>
                    <input
                      type="text"
                      placeholder="https://ik.imagekit.io/..."
                      value={newBts.image}
                      onChange={(e) => setNewBts({ ...newBts, image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TAHUN:</label>
                    <input
                      type="text"
                      value={newBts.year}
                      onChange={(e) => setNewBts({ ...newBts, year: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">DESKRIPSI CERITA / LIPUTAN:</label>
                    <textarea
                      rows={2}
                      placeholder="Tuliskan cerita singkat dibalik foto..."
                      value={newBts.description}
                      onChange={(e) => setNewBts({ ...newBts, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddBts}
                  className="px-6 py-3 bg-[#4CE0D2] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-xl hover:bg-[#3bc2b5] cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Tambah Foto BTS Ke Database</span>
                </button>
              </div>

              {/* CARD 2: Edit & Hapus SELURUH 9 Kartu BTS Terdaftar */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b-[2.5px] border-[#0A0A0A] pb-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-[#0A0A0A]">
                      2. EDIT SELURUH {btsData.length} KARTU BTS TERDAFTAR
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#0A0A0A]/60">
                      Ubah judul, foto URL ImageKit, lokasi, tag, dan deskripsi cerita untuk seluruh kartu galeri BTS.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveBts}
                    className="px-5 py-2.5 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Semua BTS</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {btsData.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] rounded-2xl p-5 space-y-4"
                    >
                      {/* Card Header Bar */}
                      <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-[#4CE0D2] text-[#0A0A0A] border border-[#0A0A0A] font-mono text-xs font-extrabold rounded-lg">
                            BTS CARD #{idx + 1}
                          </span>
                          <h4 className="font-heading font-extrabold text-lg text-[#0A0A0A]">
                            {item.title}
                          </h4>
                        </div>

                        <button
                          onClick={() => handleDeleteBts(item.id)}
                          className="px-3 py-1.5 bg-[#FF5C8A] text-white border border-[#0A0A0A] rounded-lg hover:bg-[#e04b77] cursor-pointer font-mono text-xs font-extrabold flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>

                      {/* Card Inner Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start font-mono text-xs">
                        {/* Thumbnail Preview */}
                        <div className="md:col-span-3 aspect-[16/10] bg-[#0A0A0A] rounded-xl border-[2px] border-[#0A0A0A] overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#0A0A0A] text-white font-mono text-[9px] font-extrabold rounded">
                            {item.tag}
                          </span>
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-[#FFC93C] text-[#0A0A0A] font-mono text-[9px] font-extrabold rounded">
                            {item.year}
                          </span>
                        </div>

                        {/* Inline Form Fields */}
                        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">JUDUL DOKUMENTASI:</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleBtsItemChange(idx, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TAG TIM / EVENT:</label>
                            <input
                              type="text"
                              value={item.tag}
                              onChange={(e) => handleBtsItemChange(idx, 'tag', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">LOKASI:</label>
                            <input
                              type="text"
                              value={item.location}
                              onChange={(e) => handleBtsItemChange(idx, 'location', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">URL FOTO IMAGEKIT:</label>
                            <input
                              type="text"
                              value={item.image}
                              onChange={(e) => handleBtsItemChange(idx, 'image', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">TAHUN:</label>
                            <input
                              type="text"
                              value={item.year}
                              onChange={(e) => handleBtsItemChange(idx, 'year', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block font-extrabold text-[#0A0A0A] mb-1 uppercase">DESKRIPSI CERITA / LIPUTAN:</label>
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={(e) => handleBtsItemChange(idx, 'description', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-[#0A0A0A] rounded-lg font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: SOFTWARE & GEAR MANAGER */}
          {activeTab === 'software' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rounded-2xl p-5">
                <div>
                  <span className="px-2.5 py-0.5 bg-[#A78BFA] text-white border border-[#0A0A0A] font-mono text-[10px] font-extrabold rounded">SECTION 5</span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#0A0A0A]">SOFTWARE & GEAR MANAGER</h2>
                </div>
                <button
                  onClick={handleSaveSoftware}
                  className="px-6 py-3 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4.5 h-4.5" />
                  <span>Simpan Perubahan Software</span>
                </button>
              </div>

              {/* Form Tambah Software Baru */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="font-heading font-extrabold text-xl text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  TAMBAH SOFTWARE / TOOL BARU
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1">NAMA SOFTWARE:</label>
                    <input
                      type="text"
                      placeholder="Misal: DaVinci Resolve 18"
                      value={newSoftware.name}
                      onChange={(e) => setNewSoftware({ ...newSoftware, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border border-[#0A0A0A] rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1">PROFICIENCY LEVEL (%):</label>
                    <input
                      type="number"
                      value={newSoftware.level}
                      onChange={(e) => setNewSoftware({ ...newSoftware, level: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border border-[#0A0A0A] rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold text-[#0A0A0A] mb-1">KATEGORI:</label>
                    <input
                      type="text"
                      placeholder="Video & Motion"
                      value={newSoftware.category}
                      onChange={(e) => setNewSoftware({ ...newSoftware, category: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border border-[#0A0A0A] rounded-lg font-bold"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddSoftware}
                  className="px-5 py-2.5 bg-[#A78BFA] text-white font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl hover:bg-[#9676f5] cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Tambah Software</span>
                </button>
              </div>

              {/* Edit Daftar Software Terdaftar */}
              <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="font-heading font-extrabold text-2xl text-[#0A0A0A] border-b-[2.5px] border-[#0A0A0A] pb-3">
                  DAFTAR SOFTWARE & GEAR TERDAFTAR ({softwareData.length})
                </h3>
                <div className="space-y-4">
                  {softwareData.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-2 font-mono text-xs">
                        <span className="font-extrabold text-[#3B6EF5]">{item.name} ({item.level}%)</span>
                        <button
                          onClick={() => handleDeleteSoftware(item.id)}
                          className="px-2.5 py-1 bg-[#FF5C8A] text-white border border-[#0A0A0A] rounded font-mono text-[10px] font-extrabold cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                        <div>
                          <label className="block font-bold">NAMA SOFTWARE:</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleSoftwareItemChange(idx, 'name', e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#0A0A0A] rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-bold">SKILL LEVEL (%):</label>
                          <input
                            type="number"
                            value={item.level}
                            onChange={(e) => handleSoftwareItemChange(idx, 'level', Number(e.target.value))}
                            className="w-full px-2 py-1.5 bg-white border border-[#0A0A0A] rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-bold">KATEGORI:</label>
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => handleSoftwareItemChange(idx, 'category', e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-[#0A0A0A] rounded font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INBOX MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-heading font-extrabold text-2xl text-[#0A0A0A] border-b-[2.5px] border-[#0A0A0A] pb-3">
                INBOX PESAN DARI VISITORS ({messagesData.length})
              </h3>
              {messagesData.length === 0 ? (
                <div className="p-12 text-center bg-[#FAFAF7] border-2 border-dashed border-[#0A0A0A] rounded-xl font-mono text-sm font-bold text-[#0A0A0A]/60">
                  Belum ada pesan masuk dari pengunjung.
                </div>
              ) : (
                <div className="space-y-4">
                  {messagesData.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-[#FAFAF7] border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-2 font-mono text-xs">
                        <span className="font-extrabold text-[#3B6EF5] text-sm">SENDER: {msg.fullName || msg.name}</span>
                        <span className="text-[#0A0A0A]/60">{new Date(msg.date).toLocaleString()}</span>
                      </div>
                      <p className="text-xs font-mono font-extrabold text-[#FF5C8A]">EMAIL: {msg.email}</p>
                      <p className="text-sm font-medium text-[#0A0A0A] bg-white p-4 rounded-xl border-[2px] border-[#0A0A0A]">
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
