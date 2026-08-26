import { supabase } from '../lib/supabaseClient';
import { db, doc, setDoc, addDoc, collection, getDocs } from '../lib/firebaseClient';

const STORAGE_PREFIX = 'nanda_admin_cms_v1_';

const defaultHeroFootage = [
  {
    id: 1,
    filename: 'FKW5_FESTIVAL.JPG',
    tag: 'EVENT',
    headerBg: 'bg-[#FFC93C] text-[#0A0A0A]',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    gridClass: 'col-span-6 md:col-span-4 aspect-[16/10]',
  },
  {
    id: 2,
    filename: 'STAGE_PROD.MOV',
    tag: 'VIDEOGRAPHY',
    headerBg: 'bg-[#4CE0D2] text-[#0A0A0A]',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    gridClass: 'col-span-6 md:col-span-4 aspect-[16/10]',
  },
  {
    id: 3,
    filename: 'PORTRAIT_01.RAW',
    tag: 'PHOTO',
    headerBg: 'bg-[#A78BFA] text-white',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    gridClass: 'col-span-12 md:col-span-4 md:row-span-2 h-full min-h-[260px] aspect-[3/4] md:aspect-auto',
  },
  {
    id: 4,
    filename: 'DEV_WORKSPACE.PNG',
    tag: 'FULLSTACK',
    headerBg: 'bg-[#FFC93C] text-[#0A0A0A]',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    gridClass: 'col-span-12 md:col-span-8 aspect-[16/9]',
  },
  {
    id: 5,
    filename: 'REELS_RECAP.MP4',
    tag: 'EDITING',
    headerBg: 'bg-[#4CE0D2] text-[#0A0A0A]',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
    gridClass: 'col-span-12 md:col-span-4 aspect-[16/10]',
  },
  {
    id: 6,
    filename: 'LIVE_CONCERT.MOV',
    tag: 'CONCERT',
    headerBg: 'bg-[#3B6EF5] text-white',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80',
    gridClass: 'col-span-12 md:col-span-4 aspect-[16/10]',
  },
  {
    id: 7,
    filename: 'SWEET17_USS.JPG',
    tag: 'EVENT PHOTO',
    headerBg: 'bg-[#A3E635] text-[#0A0A0A]',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80',
    gridClass: 'col-span-12 md:col-span-4 aspect-[16/10]',
  },
];

const defaultSectionData = {
  hero: {
    greeting: "HEY, I'M AGUS NANDA 👋",
    headline1: 'CREATIVE',
    headline2: 'FREELANCER',
    roles: 'PHOTOGRAPHY • VIDEOGRAPHY • FULLSTACK DEV',
    description: 'Saya memadukan seni cerita visual melalui Fotografi & Videografi, serta membangun website modern dengan kode yang bersih dan responsif.',
    ctaPrimaryLabel: 'LIHAT PORTFOLIO',
    ctaPrimaryUrl: '#portfolio',
    ctaSecondaryLabel: 'HUBUNGI SAYA',
    ctaSecondaryUrl: '#contact',
    instagramUrl: 'https://instagram.com/_agus_nanda_',
    whatsappUrl: 'https://wa.me/6281330890140',
    emailUrl: 'mailto:putuagusnandapratama@gmail.com',
    githubUrl: 'https://github.com',
    heroFootage: defaultHeroFootage,
  },
  about: {
    photoUrl: 'https://ik.imagekit.io/nandaporto/portfolio/PAS_FOTO_NANDA_j-lIyw5YJ.png',
    location: 'DENPASAR, BALI',
    approvedStamp: 'APPROVED 2026 ✔',
    name: 'AGUS NANDA',
    fullName: 'PUTU AGUS NANDA PRATAMA',
    roleBadge: 'CREATIVE FREELANCE',
    roleFooter: 'CREATIVE & DEV',
    availabilityStatus: 'READY FOR WORK',
    stat1Val: '15+',
    stat1Lbl: 'PROJECTS',
    stat2Val: '5+',
    stat2Lbl: 'HAPPY CLIENTS',
    stat3Val: '100%',
    stat3Lbl: 'SATISFIED',
    dob: '24 / 07 / 2008',
    nativeLang: 'Indonesia',
    hobbies: 'Photo • Video',
    bioTitle: 'AGUS_NANDA_BIOGRAPHY.TXT',
    expBadge: '2+ YRS EXP',
    bioPara1: 'Halo! Saya Nanda, seorang Creative Freelancer berbasis di Bali & Malang. Memiliki pengalaman 2+ tahun dalam menangani Fotografi, Videografi, Post-Production Editing, dan Fullstack Dev.',
    bioPara2: 'Telah berkolaborasi dengan SMAN 9 Denpasar, Jurnalistik ASA 9, Nada Upacara Bali, dan saat ini menempuh studi di BINUS @MALANG.',
    quoteText: '"I believe I am hardworking and always set goals to move forward."',
    quoteAuthor: '— AGUS NANDA',
    whatsapp: '081330890140',
    email: 'putuagusnandapratama@gmail.com',
    instagram: '_agus_nanda_',
    cvUrl: 'https://ik.imagekit.io/nandaporto/portfolio/CV_AGUS_NANDA.pdf',
    experiences: [
      {
        id: 'exp1',
        period: '2026 — NOW',
        title: 'BINUS @MALANG',
        subtitle: 'Higher Education Student',
        description: 'Computer Science & Technology student specializing in Software & Multimedia.',
        badge: 'STUDENT',
        color: 'bg-[#A3E635] text-[#0A0A0A]',
      },
      {
        id: 'exp2',
        period: '2025 — NOW',
        title: 'NADA UPACARA BALI',
        subtitle: 'Freelance Media Production',
        description: 'Freelance videographer & editor for Reels post production & event documentation.',
        badge: 'POST-PROD',
        color: 'bg-[#3B6EF5] text-white',
      },
      {
        id: 'exp3',
        period: '2023 — 2026',
        title: 'SMAN 9 DENPASAR & JURNALISTIK ASA 9',
        subtitle: 'Student Council & Media Coordinator',
        description: 'Koordinator TIK OSIS & Koordinator Bidang Editing Jurnalistik ASA 9.',
        badge: 'JOURNALISM',
        color: 'bg-[#FFC93C] text-[#0A0A0A]',
      },
      {
        id: 'exp4',
        period: '2024 — 2025',
        title: 'FREELANCE CREATIVE & DEV',
        subtitle: 'Self-Employed',
        description: 'Specialized in event photography, commercial video editing, & web development.',
        badge: 'DEV & PHOTO',
        color: 'bg-[#FF5C8A] text-white',
      },
    ],
  },
  portfolioHeader: {
    badge: 'SELECTED WORKS',
    title: 'FEATURED PORTFOLIO',
    subtitle: 'Koleksi karya Fotografi, Videografi, Post-Production, dan Fullstack Dev.',
    promptBanner: 'GUNAKAN TOMBOL PANAH [ ◄ ► ] ATAU KLIK KARTU UNTUK FULLSCREEN',
  },
  portfolio: [
    {
      id: 'p1',
      category: 'PHOTOGRAPHY',
      title: 'HSS EVENT — SWEET SEVENTEEN',
      camera: 'SONY A6700',
      client: 'Hellen Sweet 17th',
      role: 'Lead Event Photographer',
      year: '2024',
      aspectRatio: '16:9',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/HSS_ELLEN_EDIT-44_9jNDhUHjO.jpg',
      description: 'Dokumentasi eksklusif acara ulang tahun Sweet 17th dengan pencahayaan moody & color grading pastel cinematic.',
      fullDescription: 'Project foto event ulang tahun bergaya modern bertempat di Bali. Menggunakan kamera Sony A6700 untuk hasil bokeh lembut dan fokus tajam pada ekspresi momen terbaik.',
      tools: ['Sony A6700', 'Lightroom Classic', 'Photoshop'],
    },
    {
      id: 'p2',
      category: 'VIDEOGRAPHY',
      title: 'MOMENT ANGKATAN SMAN 1 MENGWI',
      camera: 'SONY A6700',
      client: 'SMAN 1 MENGWI',
      role: 'Videographer & Editor',
      year: '2025',
      aspectRatio: '9:16',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/vlcsnap-2026-07-05-18h39m49s406_pmLNCY7Jc.webp',
      mediaUrl: 'https://ik.imagekit.io/nandaporto/portfolio/SMANGI_9rM1I3ZtN.webm',
      description: 'Cuplikan video acara momen kebersamaan angkatan SMAN 1 Mengwi dengan pacing cinematic dinamis.',
      fullDescription: 'Highlight video dokumentasi momen pelepasan dan kebersamaan angkatan siswa SMAN 1 Mengwi.',
      tools: ['Sony A6700', 'DaVinci Resolve', 'Premiere Pro'],
    },
    {
      id: 'p3',
      category: 'VIDEOGRAPHY',
      title: 'KASANGA FEST 2025 HIGHLIGHT',
      camera: 'SONY A6700',
      client: 'KASANGA FEST 2025',
      role: 'Lead Cinematographer',
      year: '2025',
      aspectRatio: '9:16',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/vlcsnap-2026-07-05-18h37m21s684_OrBX_mnNY.webp',
      mediaUrl: 'https://ik.imagekit.io/nandaporto/portfolio/Sequence%2001.webm',
      description: 'Highlight event pawai Ogoh-ogoh & parade seni budaya Kasanga Fest 2025 Bali.',
      fullDescription: 'Video liputan vertikal dan horizontal acara tahunan Kasanga Fest 2025 di Denpasar.',
      tools: ['DaVinci Resolve 18', 'Sony S-Log3', 'Premiere Pro'],
    },
    {
      id: 'p4',
      category: 'EDITOR',
      title: 'FKW 5 BUMPER MOTION',
      camera: 'AFTER EFFECTS',
      client: 'FKW 5',
      role: 'Lead Motion Editor',
      year: '2025',
      aspectRatio: '16:9',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/vlcsnap-2026-07-05-18h40m44s334_X-tcMdRvU.webp',
      mediaUrl: 'https://ik.imagekit.io/nandaporto/portfolio/LOOP%20FKW.webm',
      description: 'Looping bumper festival Karma Wairagya dengan animasi motion graphics & audio sync.',
      fullDescription: 'Desain animasi looping bumper visual panggung pameran festival budaya Bali FKW 5.',
      tools: ['After Effects', 'Plugins Custom', 'Premiere Pro'],
    },
    {
      id: 'p5',
      category: 'EDITOR',
      title: 'PIONEERS REVEAL GUEST STAR',
      camera: 'AFTER EFFECTS',
      client: 'PIONEERS SMAN 9',
      role: 'Video Content Editor',
      year: '2025',
      aspectRatio: '1:1',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/vlcsnap-2026-07-05-18h36m16s278_7TAYgAqZ4.webp',
      mediaUrl: 'https://ik.imagekit.io/nandaporto/portfolio/GUEST%20STAR%201_3.webm',
      description: 'Video konten reveal guest star acara pelepasan SMAN 9 Denpasar dengan motion typography.',
      fullDescription: 'Video promo reel 1:1 reveal guest star pelepasan SMAN 9 Denpasar.',
      tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
    },
    {
      id: 'p6',
      category: 'FULLSTACK DEV',
      title: 'NANDA CREATIVE PORTFOLIO',
      camera: 'REACT + VITE',
      client: 'Agus Nanda (Self)',
      role: 'Fullstack Developer',
      year: '2026',
      aspectRatio: '16:9',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/brave_screenshot_nandacreative.my.id_u1BRyGjY5.png',
      description: 'Platform website portofolio interaktif bergaya Neobrutalism berenergi tinggi dibuat dengan React & Vite.',
      fullDescription: 'Pengembangan penuh frontend & backend CMS portofolio Nanda Creative.',
      tools: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    },
  ],
  bts: [
    {
      id: 'gp2',
      title: 'YEARBOOK CREATIVE TEAM',
      tag: 'YEARBOOK TEAM',
      color: 'bg-[#FFC93C] text-[#0A0A0A]',
      location: 'SMAN 9 DENPASAR',
      year: '2024',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/WhatsApp%20Image%202026-07-03%20at%2020.41.00.jpeg',
      description: 'Proses foto sesi outdoor dan konseptualisasi tata letak layout buku tahunan sekolah SMAN 9 Denpasar.',
    },
    {
      id: 'gp_1783082658816',
      title: 'FKW 5 PRODUCTION CREW',
      tag: 'FKW 5 TEAM',
      color: 'bg-[#FF5C8A] text-white',
      location: 'STAGE PANGGUNG',
      year: '2024',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/1000115578.jpg.jpeg',
      description: 'Dokumentasi tim panggung dan konsol media siaran langsung pada Festival Komunitas & Karya 5.',
    },
    {
      id: 'gp_1783082983443',
      title: 'FYF 2025 MEDIA DEPT',
      tag: 'FYF 2025',
      color: 'bg-[#4CE0D2] text-[#0A0A0A]',
      location: 'BALI CONVENTION',
      year: '2025',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/WhatsApp%20Image%202026-07-03%20at%2020.39.49.jpeg',
      description: 'Kolaborasi produksi video promosi dan live broadcast liputan festival remaja tahunan di Bali.',
    },
    {
      id: 'gp1',
      title: 'JURNALISTIK ASA 9 — CREATIVE TEAM',
      tag: 'JURNALISTIK ASA 9',
      color: 'bg-[#3B6EF5] text-white',
      location: 'SMAN 9 DENPASAR',
      year: '2024',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/WhatsApp%20Image%202026-07-03%20at%2020.38.57.jpeg',
      description: 'Tim koordinator editing dan publikasi media sekolah Jurnalistik ASA 9 SMAN 9 Denpasar.',
    },
    {
      id: 'gp_1783082658973',
      title: 'JURNALISTIK ASA 9 — BROADCAST',
      tag: 'JURNALISTIK ASA 9',
      color: 'bg-[#A3E635] text-[#0A0A0A]',
      location: 'STUDIO JURNALISTIK',
      year: '2024',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/1000115581.jpg.jpeg',
      description: 'Sesi rapat produksi konten video berita dan dokumentasi majalah digital sekolah.',
    },
    {
      id: 'gp_1783082983128',
      title: 'JURNALISTIK ASA 9 — FIELD SHOOT',
      tag: 'JURNALISTIK ASA 9',
      color: 'bg-[#A78BFA] text-white',
      location: 'FIELD LOCATION',
      year: '2025',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/WhatsApp%20Image%202026-07-03%20at%2020.41.38.jpeg',
      description: 'Dokumentasi wawancara dan pengambilan gambar foto jurnalistik di lapangan.',
    },
    {
      id: 'gp3',
      title: 'BELIVEN CLASS — CLASSROOM CREW',
      tag: 'BELIVEN CLASS',
      color: 'bg-[#FFC93C] text-[#0A0A0A]',
      location: 'SMAN 9 DENPASAR',
      year: '2025',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/WhatsApp%20Image%202026-07-03%20at%2020.43.35.jpeg',
      description: 'Koleksi kebersamaan dan pembuatan konten kekeluargaan Beliven Class.',
    },
    {
      id: 'gp_1783082983282',
      title: 'OSIS SMANSIA — ORGANIZATION',
      tag: 'OSIS SMANSIA',
      color: 'bg-[#FF5C8A] text-white',
      location: 'BALI CAMPUS',
      year: '2025',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/WhatsApp%20Image%202026-07-03%20at%2020.40.17.jpeg',
      description: 'Dokumentasi kegiatan organisasi Seksi Bidang TIK OSIS SMAN 9 Denpasar.',
    },
    {
      id: 'gp_1783082983610',
      title: 'JURNALISTIK ASA 9 — ARCHIVE',
      tag: 'JURNALISTIK ASA 9',
      color: 'bg-[#4CE0D2] text-[#0A0A0A]',
      location: 'DENPASAR, BALI',
      year: '2026',
      image: 'https://ik.imagekit.io/nandaporto/portfolio/IMG-20260510-WA0172.jpg.jpeg',
      description: 'Dokumentasi liputan khusus dan pameran fotografi karya siswa SMAN 9 Denpasar.',
    },
  ],
  software: [
    { id: 's1', name: 'DaVinci Resolve', level: 95, category: 'Video & Motion', icon: 'Film', description: 'Color grading, editing, and cinematic finishing.' },
    { id: 's2', name: 'Adobe Premiere Pro', level: 90, category: 'Video & Motion', icon: 'Layers', description: 'Advanced video sequence editing & creative cuts.' },
    { id: 's3', name: 'Adobe After Effects', level: 85, category: 'Video & Motion', icon: 'Sparkles', description: 'Motion graphics, visual effects, and dynamic intros.' },
    { id: 's4', name: 'VS Code / Cursor', level: 95, category: 'Development', icon: 'Code', description: 'Primary editor for TypeScript, React, and server systems.' },
  ],
  faq: [
    { id: 'f1', question: 'Layanan apa saja yang Agus Nanda tawarkan?', answer: 'Saya menawarkan jasa Fotografi Event & Commercial, Videografi & Post-Production Editing (Reels, After Effects), serta Pengembangan Web App Modern.' },
    { id: 'f2', question: 'Berapa lama estimasi waktu pengerjaan proyek video / website?', answer: 'Untuk video Reels / Commercial sekitar 2-4 hari kerja. Untuk website portofolio atau aplikasi e-commerce 1-2 minggu tergantung kompleksitas.' },
  ],
  messages: [],
};

const listeners = new Set();

export function subscribeCmsChanges(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

/** Auto-fetch all CMS data from Firebase Firestore on initial load */
export async function hydrateDataFromFirestore() {
  if (!db) return false;
  try {
    const siteColRef = collection(db, 'site_settings');
    const snapshot = await getDocs(siteColRef);
    let hasUpdates = false;

    snapshot.forEach((docSnap) => {
      const docData = docSnap.data();
      if (docData && docData.data) {
        localStorage.setItem(STORAGE_PREFIX + docSnap.id, JSON.stringify(docData.data));
        hasUpdates = true;
      }
    });

    if (hasUpdates) {
      notifyListeners();
    }
    return hasUpdates;
  } catch (err) {
    console.warn('Firestore hydration note:', err);
    return false;
  }
}

/** Read Section Data */
export function getSectionData(sectionKey) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + sectionKey);
    if (!raw) return defaultSectionData[sectionKey] || null;
    const parsed = JSON.parse(raw);

    if (sectionKey === 'hero') {
      return { ...defaultSectionData.hero, ...parsed };
    }
    if (sectionKey === 'about') {
      return { ...defaultSectionData.about, ...parsed };
    }
    if (sectionKey === 'portfolioHeader') {
      return { ...defaultSectionData.portfolioHeader, ...parsed };
    }
    return parsed;
  } catch (err) {
    return defaultSectionData[sectionKey] || null;
  }
}

/** Update Section Data (Sync LocalStorage + Supabase + Firebase) */
export async function updateSectionData(sectionKey, newData) {
  try {
    localStorage.setItem(STORAGE_PREFIX + sectionKey, JSON.stringify(newData));
    notifyListeners();

    // Sync to Supabase
    if (supabase) {
      supabase.from('site_settings').upsert({
        key: sectionKey,
        value: JSON.stringify(newData),
        updated_at: new Date().toISOString(),
      }).then(() => {}).catch(() => {});
    }

    // Sync to Firebase Firestore
    if (db) {
      try {
        const siteDocRef = doc(db, 'site_settings', sectionKey);
        setDoc(siteDocRef, {
          data: newData,
          updated_at: new Date().toISOString(),
        }, { merge: true }).catch(() => {});
      } catch (fbErr) {
        // Safe fallback
      }
    }

    return true;
  } catch (err) {
    console.error(`Failed to save CMS section [${sectionKey}]:`, err);
    return false;
  }
}

/** Add incoming contact message */
export async function submitContactMessage(messageObj) {
  try {
    const messages = getSectionData('messages') || [];
    const newMessage = {
      id: 'msg_' + Date.now(),
      date: new Date().toISOString(),
      ...messageObj,
    };
    messages.unshift(newMessage);
    localStorage.setItem(STORAGE_PREFIX + 'messages', JSON.stringify(messages));
    notifyListeners();

    // Supabase
    if (supabase) {
      await supabase.from('contact_messages').insert({
        full_name: messageObj.fullName || messageObj.name,
        email: messageObj.email,
        message: messageObj.message,
      });
    }

    // Firebase Firestore
    if (db) {
      try {
        const messagesColRef = collection(db, 'contact_messages');
        await addDoc(messagesColRef, {
          full_name: messageObj.fullName || messageObj.name,
          email: messageObj.email,
          message: messageObj.message,
          created_at: new Date().toISOString(),
        });
      } catch (fbErr) {
        // Safe fallback
      }
    }

    return true;
  } catch (err) {
    console.error('Failed to submit message:', err);
    return false;
  }
}

/** Reset all CMS sections to defaults */
export function resetCmsToDefault() {
  Object.keys(defaultSectionData).forEach((key) => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(defaultSectionData[key]));
  });
  notifyListeners();
  return true;
}

