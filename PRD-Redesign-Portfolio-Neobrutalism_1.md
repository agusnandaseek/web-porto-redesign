# PRD — Redesign Portfolio "Nanda Creative" ke Gaya Neobrutalism

## 1. Ringkasan Proyek
Redesign total portofolio pribadi (saat ini bergaya dark cinematic/glassmorphism) menjadi
gaya **Neobrutalism**: border hitam tebal, hard shadow offset, warna blok cerah, tipografi
besar & bold, layout jujur/kotak-kotak tanpa gradient halus. Konten & struktur informasi
dari web lama TETAP DIPERTAHANKAN, hanya sistem visualnya yang diubah total.

Owner: Agus Nanda — Creative Freelance (Fotografi, Videografi, Fullstack Developer)

---

## 2. Sistem Visual (Design Tokens)

### 2.1 Karakteristik Neobrutalism yang harus diterapkan
- Border solid **2–3px hitam pekat** (#0A0A0A) di hampir semua elemen: card, button, image, badge, input.
- **Hard drop-shadow** offset (bukan blur lembut), contoh: `box-shadow: 6px 6px 0px #0A0A0A;` — muncul di card, button, foto.
- Efek hover/klik: elemen bergeser sedikit (translate 2-4px) dan shadow mengecil, memberi kesan "ditekan".
- Warna **blok solid, saturasi tinggi**, tanpa gradient (kecuali di ilustrasi/hero image).
- Sudut **rounded kecil (8–16px)**, bukan tajam 0px dan bukan terlalu bulat.
- Tipografi **sans-serif tebal untuk heading** (mis. Space Grotesk / General Sans / Archivo Black), badan teks tetap readable (Inter/Satoshi).
- Highlight teks penting pakai **block background warna** (seperti kata "designers" di referensi Deco) bukan warna teks biasa.
- Ikon dalam kotak warna solid dengan border hitam (bukan ikon polos melayang).
- Elemen dekoratif: garis putus-putus, panah tangan-gambar, bintang/sparkle kecil, stiker/badge miring (rotate -3° sampai 5°).

### 2.2 Palet Warna
- Background utama: putih / off-white (#FFFFFF atau #FAFAF7)
- Ink/teks & border: hitam pekat (#0A0A0A)
- Warna aksen (pilih 2-3 dominan, karena kamu creative + dev, sarankan):
  - Primer: Blue elektrik (#3B6EF5) — untuk CTA & highlight utama
  - Sekunder 1: Yellow/Orange terang (#FFC93C) — badge, ikon
  - Sekunder 2: Pink/Magenta (#FF5C8A) — aksen kategori portfolio
  - Sekunder 3: Mint/Cyan (#4CE0D2) — opsional untuk kategori "Dev"
- Setiap section boleh punya 1 warna aksen dominan berbeda supaya terasa modular, khas neobrutalism (lihat referensi: tiap FAQ/card punya warna beda-beda).

### 2.3 Tipografi
- Heading (H1-H3): font tebal, ukuran besar (H1 desktop 56–72px), line-height rapat.
- Body: 16–18px, regular/medium.
- Gunakan angka/label kecil huruf kapital + letter-spacing untuk eyebrow text (mis. "CATEGORY: PHOTOGRAPHY").

### 2.4 Spacing & Grid
- Container max-width ~1200px, padding besar antar section (96–120px vertical di desktop).
- Grid kartu 2-3 kolom untuk portfolio/tools, gap konsisten dengan border+shadow tetap terlihat penuh (jangan overlap).

---

## 3. Tech Stack yang Disarankan
- Next.js (App Router) + TypeScript
- Tailwind CSS (custom shadow & border utility di config)
- Framer Motion (untuk micro-interaction hover/press, transisi antar tab kategori)
- Tetap pakai Supabase kalau form contact perlu simpan data
- Deploy: Vercel

---

## 4. Struktur Halaman & Section (mengacu konten web lama)

1. **Navbar**
   - Logo/nama, menu (About, Portfolio, Software, Kolaborasi), toggle EN/ID, tombol CTA "Let's Collaborate" bergaya button neobrutalism (border + shadow).

2. **Hero Section**
   - Headline besar 2 baris dengan 1 kata di-highlight block warna (pola persis referensi Deco: "Here **designers** make awesome landing pages").
   - Sub-headline singkat: siapa kamu + spesialisasi (Photo, Video, Fullstack Dev).
   - 2 tombol CTA: "Lihat Portfolio" & "Hubungi Saya".
   - Kolase foto/ilustrasi di kanan dengan border tebal + rotate sedikit + shadow besar (gantikan mood board panorama yang sekarang).
   - 2 floating badge kecil ala referensi ("Fast Turnaround", "2+ Years Experience") dengan ikon kotak warna.

3. **About Me**
   - Foto ID-card style (border tebal, sedikit rotate) — bisa pertahankan elemen "polaroid/ID card" dari desain lama tapi versi neobrutalism (border hitam tebal, bukan glow).
   - Data singkat: nama, tanggal lahir, bahasa, hobi — ditampilkan sebagai badge/chip kecil berwarna, bukan tabel gelap.
   - Deskripsi singkat 2-3 kalimat.
   - Quote pendek dalam box highlight warna.
   - Timeline Experience: card horizontal scroll (Student Council, Nada Upacara Bali, Freelance) masing-masing card border+shadow, warna beda per card.

4. **Portfolio / Kategori Karya**
   - Tab filter: Photography / Videography / Editor / Fullstack Dev — tab aktif pakai background warna solid + border, bukan underline tipis.
   - Card portfolio besar: gambar dengan border tebal, badge kategori di pojok (kotak warna solid), judul project, tombol "Lihat Detail" bergaya button neobrutalism.
   - Navigasi prev/next sebagai tombol kotak dengan shadow.

5. **Behind the Scenes**
   - Grid 3 foto proses kerja, masing-masing card border tebal + shadow + label tim di bawah (chip warna).

6. **Software & Tools**
   - Card per tools (DaVinci, Premiere, After Effects, Lightroom, dll): ikon kotak warna solid, nama tools, progress bar proficiency bergaya chunky (bukan gradient tipis, tapi bar solid dengan border).

7. **Weekly/Behind Update atau "Fun Fact" strip (opsional baru)**
   - Terinspirasi section "Our weekly challenges" di referensi Deco — bisa diisi versi kamu: "Recent Shoot" atau "Latest Project Update" dalam card besar dengan mockup device/foto.

8. **FAQ atau "Cara Kerja Sama dengan Saya"**
   - Terinspirasi FAQ accordion di referensi: 3 pertanyaan umum client (Bagaimana proses kerja, Berapa lama pengerjaan, Platform apa saja yang dikuasai). Accordion dengan border tebal, expand item dapat background warna aksen.

9. **Contact / Let's Collaborate**
   - Form: Full Name, Email, Idea/Collaboration — input dengan border tebal (bukan dark input tipis), tombol submit besar block warna + shadow + efek "press" saat diklik.

10. **Footer**
    - Logo, menu ringkas, social links sebagai ikon kotak kecil, newsletter/email input bergaya sama, copyright.

---

## 5. Komponen UI Reusable yang Perlu Dibuat
- `Button` (variant: primary/blue, secondary/outline, dengan shadow-press animation)
- `Card` (variant: default, colored-accent, dengan border+shadow konsisten)
- `Badge/Chip` (kotak warna solid, teks putih/hitam sesuai kontras)
- `SectionHeading` (eyebrow text + heading besar + optional highlight word)
- `Tabs` (untuk filter kategori portfolio)
- `Accordion` (untuk FAQ)
- `TimelineCard` (untuk experience)
- `ProgressBarChunky` (untuk software proficiency)
- `Input/Textarea` neobrutalism style

---

## 6. Interaksi & Animasi
- Hover card/button: translate (-2px, -2px) + shadow membesar, atau sebaliknya saat active (press-down effect).
- Scroll-reveal fade+slide-up ringan per section (jangan berlebihan, neobrutalism biasanya statis & tegas, animasi secukupnya saja).
- Tab kategori portfolio: transisi konten pakai fade/slide simple.
- Sticky navbar dengan border-bottom tebal saat scroll.

---

## 7. Responsive Requirements
- Mobile: stack semua grid jadi 1 kolom, ukuran border tetap 2px (jangan terlalu tebal di layar kecil), font heading diperkecil proporsional.
- Pastikan shadow offset tetap terlihat proporsional di mobile (kurangi jarak offset, mis. 4px bukan 6-8px).
- Tab kategori portfolio di mobile jadi horizontal scroll chip.

---

## 8. Assets yang Perlu Disiapkan Sebelum Development
- Foto/portrait kamu (untuk About) dengan background yang bisa di-crop rapi ke frame border tebal.
- Kumpulan foto/video thumbnail per kategori portfolio (Photography, Videography, Editor, Fullstack Dev) — minimal 3-4 per kategori.
- Logo/monogram sederhana untuk navbar & footer.
- Ikon software (bisa pakai icon set simple-icons, styled ulang jadi kotak warna solid).

---

## 9. PROMPT SIAP KIRIM KE AI CODING AGENT

```
Saya ingin redesign total website portofolio pribadi saya (Next.js + TypeScript + Tailwind)
dari gaya dark-cinematic menjadi gaya NEOBRUTALISM.

DESIGN SYSTEM:
- Border solid 2-3px warna hitam (#0A0A0A) di semua card, button, image, input, badge.
- Hard drop-shadow offset (bukan blur), contoh: box-shadow: 6px 6px 0px #0A0A0A, mengecil
  saat elemen di-hover/press (translate 2-4px + shadow shrink).
- Warna solid saturasi tinggi, TANPA gradient di UI: background putih (#FFFFFF/#FAFAF7),
  aksen biru elektrik (#3B6EF5), kuning (#FFC93C), pink (#FF5C8A), mint (#4CE0D2).
- Border-radius kecil 8-16px.
- Heading pakai font tebal besar (Archivo Black/Space Grotesk), body pakai Inter.
- Highlight kata penting di headline dengan background block warna, bukan warna teks.
- Setiap section boleh punya 1 warna aksen dominan berbeda agar terasa modular.

STRUKTUR HALAMAN (urutan section):
1. Navbar sticky dengan logo, menu, toggle bahasa EN/ID, CTA button
2. Hero: headline 2 baris + 1 kata highlight block warna, sub-headline, 2 CTA button,
   kolase foto dengan border tebal + rotate, 2 floating badge info singkat
3. About Me: foto ID-card style border tebal, data singkat sebagai chip warna, deskripsi,
   quote dalam box highlight, timeline experience (horizontal scroll card)
4. Portfolio: tab filter (Photography/Videography/Editor/Fullstack Dev) dengan style
   tab aktif solid-color, card portfolio besar dengan badge kategori & tombol detail
5. Behind The Scenes: grid 3 foto proses kerja dengan card border+shadow
6. Software & Tools: card per tools dengan ikon kotak warna solid + progress bar chunky
7. FAQ / Cara Kerja Sama: accordion border tebal, expand item dapat background warna
8. Contact/Let's Collaborate: form (Nama, Email, Idea) dengan input border tebal,
   submit button block warna dengan press animation
9. Footer: logo, menu, social icon kotak, email input, copyright

KOMPONEN REUSABLE yang perlu dibuat: Button (primary/secondary + press animation),
Card (default & colored-accent), Badge/Chip, SectionHeading (eyebrow + heading +
highlight word), Tabs, Accordion, TimelineCard, ProgressBarChunky, Input/Textarea style
neobrutalism.

INTERAKSI: hover/press translate+shadow effect di semua elemen interaktif, scroll-reveal
fade+slide-up ringan per section, sticky navbar dengan border-bottom saat scroll.

RESPONSIVE: mobile stack 1 kolom, shadow offset dikurangi jadi 4px, tab kategori jadi
horizontal scroll chip di mobile.

Tolong buat dulu design token (warna, spacing, shadow, radius) di Tailwind config,
lalu bangun komponen reusable-nya, baru susun tiap section sesuai urutan di atas.
Konten teks & data masih pakai konten placeholder dari struktur saya yang lama
(saya akan kirim menyusul), fokus dulu ke sistem visual & layout section.
```

---

## 10. Catatan Tambahan
- Kirim juga screenshot referensi Deco ini ke AI agent supaya visual match lebih presisi.
- Jika agent kesulitan meniru hard-shadow di Tailwind, minta tambahkan custom `boxShadow`
  di `tailwind.config` seperti: `'brutal': '6px 6px 0px #0A0A0A', 'brutal-sm': '3px 3px 0px #0A0A0A'`.
- Untuk konten aktual (data experience, portfolio, tools) tinggal migrasi dari web lama —
  strukturnya sudah bagus, tidak perlu diubah, cuma dibungkus ulang dengan visual baru.
