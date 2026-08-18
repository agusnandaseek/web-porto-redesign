import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Save,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  Sparkles,
  Layers,
  Camera,
  Video,
  Film,
  Code,
  CheckCircle2,
  LogOut,
  Mail,
  User,
  Phone,
  HelpCircle,
  Cpu,
  Lock,
} from 'lucide-react';
import { getSectionData, updateSectionData, resetCmsToDefault } from '../../utils/adminStorage';

export default function AdminDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('nanda_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('hero');
  const [toastMessage, setToastMessage] = useState(null);

  // Editable Form States
  const [heroData, setHeroData] = useState(() => getSectionData('hero'));
  const [aboutData, setAboutData] = useState(() => getSectionData('about'));
  const [portfolioData, setPortfolioData] = useState(() => getSectionData('portfolio'));
  const [btsData, setBtsData] = useState(() => getSectionData('bts'));
  const [softwareData, setSoftwareData] = useState(() => getSectionData('software'));
  const [faqData, setFaqData] = useState(() => getSectionData('faq'));
  const [messagesData, setMessagesData] = useState(() => getSectionData('messages') || []);

  // New Item Temporary States
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
    tools: 'Sony A6700, Lightroom',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'nanda2026' || passwordInput === 'admin') {
      localStorage.setItem('nanda_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      showToast('⚡ Access Granted! Welcome Admin.');
    } else {
      setAuthError('Password salah! Gagal masuk admin CMS.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nanda_admin_auth');
    setIsAuthenticated(false);
  };

  // Save Handlers
  const handleSaveHero = async () => {
    await updateSectionData('hero', heroData);
    showToast('✅ Hero Section berhasil diperbarui!');
  };

  const handleSaveAbout = async () => {
    await updateSectionData('about', aboutData);
    showToast('✅ About & Bio Section berhasil diperbarui!');
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.image) {
      showToast('⚠️ Judul dan URL Foto wajib diisi!');
      return;
    }
    const updated = [
      ...portfolioData,
      {
        id: 'p_' + Date.now(),
        ...newProject,
        tools: newProject.tools.split(',').map((t) => t.trim()),
      },
    ];
    setPortfolioData(updated);
    await updateSectionData('portfolio', updated);
    setNewProject({
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
      tools: 'Sony A6700, Lightroom',
    });
    showToast('🎉 Project baru berhasil ditambahkan!');
  };

  const handleDeleteProject = async (id) => {
    const updated = portfolioData.filter((p) => p.id !== id);
    setPortfolioData(updated);
    await updateSectionData('portfolio', updated);
    showToast('🗑️ Project berhasil dihapus.');
  };

  const handleResetAll = () => {
    if (window.confirm('Reset seluruh isi CMS ke standar awal?')) {
      resetCmsToDefault();
      setHeroData(getSectionData('hero'));
      setAboutData(getSectionData('about'));
      setPortfolioData(getSectionData('portfolio'));
      setBtsData(getSectionData('bts'));
      setSoftwareData(getSectionData('software'));
      setFaqData(getSectionData('faq'));
      showToast('🔄 CMS berhasil di-reset!');
    }
  };

  // Password Protection Gate Modal
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
        <div className="w-full max-w-md bg-white border-[3px] border-[#0A0A0A] shadow-[10px_10px_0px_#0A0A0A] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 border-b-[2.5px] border-[#0A0A0A] pb-3">
            <div className="p-2 bg-[#FFC93C] border border-[#0A0A0A] rounded-xl">
              <Lock className="w-6 h-6 text-[#0A0A0A]" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[#0A0A0A]">ADMIN CMS LOGIN</h3>
              <p className="font-mono text-xs font-bold text-[#0A0A0A]/60">NANDA CREATIVE SYSTEM</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1.5 uppercase">
                ADMIN ACCESS PASSWORD:
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan Password Admin (nanda2026)"
                className="w-full px-4 py-2.5 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl font-mono text-sm focus:outline-none focus:bg-white"
              />
              {authError && (
                <p className="text-xs font-mono font-extrabold text-[#FF5C8A] mt-1.5">{authError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] rounded-xl hover:bg-gray-300 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#3B6EF5] text-white font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl hover:bg-[#2d5cd6] cursor-pointer"
              >
                Unlock CMS Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-[#FAFAF7] border-[3px] border-[#0A0A0A] shadow-[12px_12px_0px_#0A0A0A] rounded-2xl overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0A] text-white border-[2px] border-white shadow-[4px_4px_0px_#0A0A0A] px-4 py-2 rounded-xl text-xs font-mono font-extrabold animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Dashboard Header Bar */}
        <div className="flex items-center justify-between p-4 bg-[#FFC93C] border-b-[2.5px] border-[#0A0A0A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 bg-[#0A0A0A] text-white font-mono text-xs font-extrabold rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4CE0D2]" />
              <span>ADMIN CMS v2.0</span>
            </div>
            <h3 className="font-heading font-extrabold text-xl text-[#0A0A0A] hidden sm:block">
              NANDA CREATIVE CONTENT MANAGER
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAll}
              className="px-3 py-1.5 bg-white text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-xl hover:bg-gray-100 cursor-pointer flex items-center gap-1"
              title="Reset CMS to Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-[#FF5C8A] text-white font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] rounded-xl hover:bg-[#e04b77] cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit CMS</span>
            </button>
          </div>
        </div>

        {/* Tabs Navigation Bar */}
        <div className="flex items-center gap-2 p-3 bg-white border-b-[2.5px] border-[#0A0A0A] overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'hero', label: 'HERO', icon: Sparkles },
            { id: 'about', label: 'ABOUT & BIO', icon: User },
            { id: 'portfolio', label: 'PORTFOLIO', icon: Camera },
            { id: 'bts', label: 'BTS GALLERY', icon: Film },
            { id: 'software', label: 'SOFTWARE & GEAR', icon: Cpu },
            { id: 'messages', label: `INBOX (${messagesData.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-mono font-extrabold rounded-xl border-[2px] border-[#0A0A0A] flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#3B6EF5] text-white shadow-[2.5px_2.5px_0px_#0A0A0A] -translate-y-0.5'
                    : 'bg-[#FAFAF7] text-[#0A0A0A] hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CMS Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: HERO SECTION MANAGER */}
          {activeTab === 'hero' && (
            <div className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3">
                <h4 className="font-heading font-extrabold text-lg text-[#0A0A0A]">EDIT HERO SECTION</h4>
                <button
                  onClick={handleSaveHero}
                  className="px-4 py-2 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Hero</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">TAGLINE / HEADLINE:</label>
                  <input
                    type="text"
                    value={heroData.tagline}
                    onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">AVAILABILITY BADGE:</label>
                  <input
                    type="text"
                    value={heroData.badge}
                    onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">SUBTITLE DESCRIPTION:</label>
                <textarea
                  rows={3}
                  value={heroData.description}
                  onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT & BIO MANAGER */}
          {activeTab === 'about' && (
            <div className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3">
                <h4 className="font-heading font-extrabold text-lg text-[#0A0A0A]">EDIT ABOUT & BIO</h4>
                <button
                  onClick={handleSaveAbout}
                  className="px-4 py-2 bg-[#A3E635] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rounded-xl hover:bg-[#92cf2f] cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Bio</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">NAMA LENGKAP:</label>
                  <input
                    type="text"
                    value={aboutData.fullName}
                    onChange={(e) => setAboutData({ ...aboutData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">WHATSAPP:</label>
                  <input
                    type="text"
                    value={aboutData.whatsapp}
                    onChange={(e) => setAboutData({ ...aboutData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">EMAIL:</label>
                  <input
                    type="text"
                    value={aboutData.email}
                    onChange={(e) => setAboutData({ ...aboutData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">BIOGRAPHY TEXT:</label>
                <textarea
                  rows={4}
                  value={aboutData.bio}
                  onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO MANAGER */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              
              {/* Form Tambah Project Baru */}
              <div className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-2xl p-5 space-y-4">
                <h4 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                  TAMBAH PROJECT PORTOFOLIO BARU
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">KATEGORI:</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                    >
                      <option value="PHOTOGRAPHY">PHOTOGRAPHY</option>
                      <option value="VIDEOGRAPHY">VIDEOGRAPHY</option>
                      <option value="EDITOR">EDITOR</option>
                      <option value="FULLSTACK DEV">FULLSTACK DEV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">JUDUL PROJECT:</label>
                    <input
                      type="text"
                      placeholder="Misal: KASANGA FEST 2025"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">ASPECT RATIO:</label>
                    <select
                      value={newProject.aspectRatio}
                      onChange={(e) => setNewProject({ ...newProject, aspectRatio: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                    >
                      <option value="16:9">16:9 (Widescreen)</option>
                      <option value="9:16">9:16 (Vertikal Reels/TikTok)</option>
                      <option value="1:1">1:1 (Persegi)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">URL FOTO / POSTER IMAGEKIT:</label>
                    <input
                      type="text"
                      placeholder="https://ik.imagekit.io/..."
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-extrabold text-[#0A0A0A] mb-1">URL VIDEO FOOTAGE (WEBM/MP4):</label>
                    <input
                      type="text"
                      placeholder="https://ik.imagekit.io/...webm (Optional)"
                      value={newProject.mediaUrl}
                      onChange={(e) => setNewProject({ ...newProject, mediaUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAFAF7] border-[2px] border-[#0A0A0A] rounded-xl font-mono text-xs font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddProject}
                  className="px-5 py-2.5 bg-[#FFC93C] text-[#0A0A0A] font-mono text-xs font-extrabold border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl hover:bg-[#f0b722] cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Tambah Project Ke Database</span>
                </button>
              </div>

              {/* List Project Terdaftar */}
              <div className="space-y-3">
                <h4 className="font-heading font-extrabold text-base text-[#0A0A0A]">
                  DAFTAR PROJECT TERPASANG ({portfolioData.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioData.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border-[2px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] rounded-xl p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-lg border border-[#0A0A0A] shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="px-2 py-0.5 bg-[#FFC93C] text-[#0A0A0A] font-mono text-[9px] font-extrabold rounded">
                            {item.category} ({item.aspectRatio || '16:9'})
                          </span>
                          <h5 className="font-heading font-extrabold text-sm text-[#0A0A0A] truncate mt-1">
                            {item.title}
                          </h5>
                          <p className="text-[10px] font-mono text-[#0A0A0A]/60 truncate">{item.client}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(item.id)}
                        className="p-2 bg-[#FF5C8A] text-white border border-[#0A0A0A] rounded-lg hover:bg-[#e04b77] cursor-pointer shrink-0"
                        title="Hapus Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: INBOX MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] rounded-2xl p-5 space-y-4">
              <h4 className="font-heading font-extrabold text-lg text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2">
                INBOX PESAN MASUK DARI VISITORS
              </h4>

              {messagesData.length === 0 ? (
                <div className="p-8 text-center bg-[#FAFAF7] border-2 border-dashed border-[#0A0A0A] rounded-xl font-mono text-xs font-bold text-[#0A0A0A]/60">
                  Belum ada pesan masuk dari formulir kontak.
                </div>
              ) : (
                <div className="space-y-3">
                  {messagesData.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-[#FAFAF7] border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-2 font-mono text-xs">
                        <span className="font-extrabold text-[#3B6EF5]">NAMA: {msg.fullName || msg.name}</span>
                        <span className="text-[#0A0A0A]/60">{new Date(msg.date).toLocaleString()}</span>
                      </div>
                      <p className="text-xs font-mono font-bold text-[#FF5C8A]">EMAIL: {msg.email}</p>
                      <p className="text-xs font-medium text-[#0A0A0A] bg-white p-3 rounded-lg border border-[#0A0A0A]">
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Dashboard Footer */}
        <div className="p-3.5 bg-white border-t-[2.5px] border-[#0A0A0A] flex justify-between items-center shrink-0 font-mono text-xs font-bold">
          <span>NANDA CREATIVE • CONTROL PANEL</span>
          <span>AUTOSYNC: ACTIVE</span>
        </div>

      </div>
    </div>
  );
}
