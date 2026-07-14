/* ==========================================================================
   JADWAL PELAJARAN — Kelas 9B SMPIT Al-Fityan
   Otomatis highlight hari ini, color-coded per kategori mapel
   ========================================================================== */

(function () {
  'use strict';

  /* ---- DATA JADWAL ---- */
  // starred: true = 3 JP (120 mnt), false = 2 JP (80 mnt)
  const JADWAL = {
    0: { // Senin
      label: 'Senin',
      emoji: '🟡',
      mapel: [
        { nama: 'Al-Ma\'tsurat / Upacara', icon: 'fa-solid fa-star-and-crescent', kategori: 'islam', starred: false },
        { nama: 'Al-Qur\'an',             icon: 'fa-solid fa-book-quran',         kategori: 'islam', starred: false },
        { nama: 'Bahasa Indonesia',        icon: 'fa-solid fa-feather',            kategori: 'akademik', starred: false },
        { nama: 'Bahasa Inggris',          icon: 'fa-solid fa-earth-americas',     kategori: 'akademik', starred: false },
        { nama: 'Bahasa Arab',             icon: 'fa-solid fa-star-and-crescent',  kategori: 'islam', starred: false },
        { nama: 'Ekstrakurikuler',         icon: 'fa-solid fa-volleyball',         kategori: 'fisik', starred: false },
      ]
    },
    1: { // Selasa
      label: 'Selasa',
      emoji: '🟢',
      mapel: [
        { nama: 'Literasi / Senam',        icon: 'fa-solid fa-person-running',     kategori: 'fisik', starred: false },
        { nama: 'Al-Qur\'an',             icon: 'fa-solid fa-book-quran',         kategori: 'islam', starred: false },
        { nama: 'Bahasa Arab',             icon: 'fa-solid fa-star-and-crescent',  kategori: 'islam', starred: false },
        { nama: 'Matematika',              icon: 'fa-solid fa-calculator',         kategori: 'akademik', starred: false },
        { nama: 'Bahasa Indonesia',        icon: 'fa-solid fa-feather',            kategori: 'akademik', starred: false },
        { nama: 'Informatika / KKA',       icon: 'fa-solid fa-laptop-code',        kategori: 'akademik', starred: false },
      ]
    },
    2: { // Rabu
      label: 'Rabu',
      emoji: '🔵',
      mapel: [
        { nama: 'Al-Ma\'tsurat',           icon: 'fa-solid fa-star-and-crescent',  kategori: 'islam', starred: false },
        { nama: 'Mentoring',               icon: 'fa-solid fa-users',              kategori: 'karakter', starred: false },
        { nama: 'Bahasa Inggris',          icon: 'fa-solid fa-earth-americas',     kategori: 'akademik', starred: false },
        { nama: 'Ilmu Pengetahuan Sosial', icon: 'fa-solid fa-earth-asia',         kategori: 'akademik', starred: true },
        { nama: 'Matematika',              icon: 'fa-solid fa-calculator',         kategori: 'akademik', starred: true },
      ]
    },
    3: { // Kamis
      label: 'Kamis',
      emoji: '🟠',
      mapel: [
        { nama: 'Al-Ma\'tsurat',           icon: 'fa-solid fa-star-and-crescent',  kategori: 'islam', starred: false },
        { nama: 'Al-Qur\'an',             icon: 'fa-solid fa-book-quran',         kategori: 'islam', starred: false },
        { nama: 'Ilmu Pengetahuan Alam',   icon: 'fa-solid fa-flask',              kategori: 'akademik', starred: false },
        { nama: 'Pend. Jasmani, Olahraga dan Kesehatan', icon: 'fa-solid fa-dumbbell', kategori: 'fisik', starred: false },
        { nama: 'Pendidikan Pancasila',    icon: 'fa-solid fa-scale-balanced',     kategori: 'karakter', starred: false },
        { nama: 'Seni Rupa',              icon: 'fa-solid fa-palette',            kategori: 'seni', starred: false },
      ]
    },
    4: { // Jumat
      label: 'Jumat',
      emoji: '🟣',
      mapel: [
        { nama: 'Tilawah Al-Kahfi',        icon: 'fa-solid fa-book-quran',         kategori: 'islam', starred: false },
        { nama: 'Bimbingan Konseling',     icon: 'fa-solid fa-comments',           kategori: 'karakter', starred: false },
        { nama: 'Al-Qur\'an',             icon: 'fa-solid fa-book-quran',         kategori: 'islam', starred: false },
        { nama: 'Ilmu Pengetahuan Alam',   icon: 'fa-solid fa-flask',              kategori: 'akademik', starred: true },
        { nama: 'Pend. Agama Islam dan Budi Pekerti', icon: 'fa-solid fa-star-and-crescent', kategori: 'islam', starred: true },
      ]
    }
  };

  /* ---- KATEGORI → WARNA ---- */
  const KATEGORI_STYLE = {
    islam:    { bg: 'rgba(78,204,163,0.12)', accent: 'var(--mint)',        label: 'Islami' },
    akademik: { bg: 'rgba(96,165,250,0.10)', accent: 'var(--cyan)',        label: 'Akademik' },
    fisik:    { bg: 'rgba(244,162,97,0.12)', accent: 'var(--yellow)',      label: 'Fisik' },
    karakter: { bg: 'rgba(167,139,250,0.12)',accent: 'var(--purple)',      label: 'Karakter' },
    seni:     { bg: 'rgba(248,113,113,0.12)',accent: 'var(--pink)',        label: 'Seni' },
  };

  const NAMA_HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const NAMA_HARI_FULL = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  /* ---- UTILS ---- */
  function getTodayIndex() {
    const d = new Date().getDay(); // 0=Sun, 1=Mon ... 6=Sat
    // Map ke index jadwal (Senin=0 ... Jumat=4)
    const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    return map[d] !== undefined ? map[d] : null;
  }

  function jp(starred) {
    return starred
      ? { jp: 3, mnt: 120, label: '3 JP · 120 Mnt' }
      : { jp: 2, mnt: 80,  label: '2 JP · 80 Mnt'  };
  }

  /* ---- RENDER SCHEDULE GRID ---- */
  function renderDay(dayIndex) {
    const grid = document.getElementById('jadwalGrid');
    if (!grid) return;

    const dayData = JADWAL[dayIndex];
    if (!dayData) return;

    grid.innerHTML = '';

    dayData.mapel.forEach((m, i) => {
      const style = KATEGORI_STYLE[m.kategori] || KATEGORI_STYLE.akademik;
      const durasi = jp(m.starred);

      const card = document.createElement('div');
      card.className = 'brut-card jadwal-subject-card anim-fade-up';
      card.style.cssText = `
        padding: 14px 18px;
        display: flex;
        align-items: center;
        gap: 16px;
        background: ${style.bg};
        border-left: 4px solid ${style.accent};
        transition-delay: ${i * 0.06}s;
      `;

      card.innerHTML = `
        <!-- Nomor urut -->
        <div style="
          min-width: 36px; height: 36px;
          background: ${style.accent};
          color: #000;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.85rem;
          border: 2px solid rgba(0,0,0,0.5);
          flex-shrink: 0;
        ">${i + 1}</div>

        <!-- Ikon -->
        <div style="font-size:1.3rem; color:${style.accent}; min-width:22px; text-align:center;">
          <i class="${m.icon}"></i>
        </div>

        <!-- Nama Mapel -->
        <div style="flex:1; min-width:0;">
          <div style="
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 0.95rem;
            color: var(--text-light);
            display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          ">
            ${m.nama}
            ${m.starred ? `<span style="
              background: var(--yellow-light);
              color: #000;
              font-size: 0.65rem;
              font-family: 'Archivo Black', sans-serif;
              padding: 2px 7px;
              border: 1.5px solid #000;
            ">★ 3 JP</span>` : ''}
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
            <span style="color:${style.accent}; font-weight:600;">${style.label}</span>
            &nbsp;·&nbsp; ${durasi.label}
          </div>
        </div>

        <!-- Durasi Visual Badge -->
        <div style="
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.75rem;
          padding: 6px 10px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.08);
          text-align: center;
          color: var(--text-muted);
          flex-shrink: 0;
          min-width: 62px;
        ">
          <div style="font-size:1rem; font-weight:900; color:${style.accent};">${durasi.mnt}</div>
          <div style="font-size:0.65rem;">menit</div>
        </div>
      `;

      grid.appendChild(card);

      // Trigger fade-in animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => card.classList.add('visible'));
      });
    });

    // Total duration info
    const total = dayData.mapel.reduce((acc, m) => acc + jp(m.starred).mnt, 0);
    const totalJP = dayData.mapel.reduce((acc, m) => acc + jp(m.starred).jp, 0);

    const totalCard = document.createElement('div');
    totalCard.style.cssText = `
      margin-top: 4px;
      padding: 12px 18px;
      background: rgba(255,255,255,0.03);
      border: 1.5px solid rgba(255,255,255,0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-muted);
    `;
    totalCard.innerHTML = `
      <span><i class="fa-regular fa-clock" style="margin-right:6px;color:var(--purple);"></i>Total hari ini</span>
      <span style="font-family:'Archivo Black',sans-serif;color:var(--text-light);">${totalJP} JP &nbsp;=&nbsp; ${total} Menit</span>
    `;
    grid.appendChild(totalCard);
  }

  /* ---- UPDATE DAY BUTTONS ---- */
  function setActiveDay(dayIndex) {
    document.querySelectorAll('.jadwal-day-btn').forEach(btn => {
      const isActive = parseInt(btn.dataset.day) === dayIndex;
      btn.style.background    = isActive ? 'var(--purple)'    : 'var(--bg-card)';
      btn.style.color         = isActive ? '#000'             : 'var(--text-light)';
      btn.style.boxShadow     = isActive
        ? '3px 3px 0px #000, 0 0 16px rgba(167,139,250,0.4)'
        : '5px 5px 0px #0A0A0A';
      btn.style.fontWeight    = isActive ? '900'              : '700';
      btn.style.transform     = isActive ? 'translate(-2px,-2px)' : '';
    });
    renderDay(dayIndex);
  }

  /* ---- TODAY BANNER ---- */
  function renderTodayBanner() {
    const banner = document.getElementById('jadwalTodayBanner');
    if (!banner) return;

    const todayIdx = getTodayIndex();
    const hariIni  = NAMA_HARI_FULL[new Date().getDay()];

    if (todayIdx === null) {
      banner.innerHTML = `
        <i class="fa-solid fa-moon" style="font-size:1.5rem;color:var(--purple);"></i>
        <div>
          <div style="font-family:'Archivo Black',sans-serif;font-size:0.9rem;">Hari Libur Sekolah</div>
          <div style="font-size:0.8rem;color:var(--text-muted);">Hari ini ${hariIni} — tidak ada jadwal pelajaran</div>
        </div>
      `;
    } else {
      const dayData = JADWAL[todayIdx];
      banner.innerHTML = `
        <i class="fa-solid fa-calendar-check" style="font-size:1.5rem;color:var(--purple);flex-shrink:0;"></i>
        <div style="flex:1;">
          <div style="font-family:'Archivo Black',sans-serif;font-size:0.9rem;">
            Jadwal Hari Ini — <span style="color:var(--purple);">${dayData.label}</span>
          </div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px;">
            ${dayData.mapel.length} mata pelajaran &nbsp;·&nbsp;
            Total ${dayData.mapel.reduce((a,m)=>a+jp(m.starred).mnt,0)} menit
          </div>
        </div>
        <span style="
          background:var(--purple);color:#000;
          font-family:'Archivo Black',sans-serif;font-size:0.75rem;
          padding:6px 12px;border:2px solid #000;
          animation:pulse-green 2.5s infinite;
        ">HARI INI</span>
      `;
    }
  }

  /* ---- INIT ---- */
  function init() {
    const jadwalTab = document.getElementById('jadwalTab');
    if (!jadwalTab) return;

    const todayIdx = getTodayIndex();
    const defaultDay = todayIdx !== null ? todayIdx : 0;

    // Day button click
    document.querySelectorAll('.jadwal-day-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setActiveDay(parseInt(btn.dataset.day));
      });
    });

    // Highlight hari ini di tombol dengan badge
    if (todayIdx !== null) {
      const todayBtn = document.querySelector(`.jadwal-day-btn[data-day="${todayIdx}"]`);
      if (todayBtn) {
        todayBtn.innerHTML += ' <span style="font-size:0.6rem;background:#ef4444;color:#fff;padding:1px 5px;border-radius:3px;vertical-align:middle;">HARI INI</span>';
      }
    }

    renderTodayBanner();
    setActiveDay(defaultDay);
  }

  // Init ketika jadwal tab dibuka (listen ke tab click)
  document.addEventListener('DOMContentLoaded', () => {
    // Cek kalau sudah di jadwal tab
    const jadwalSection = document.getElementById('jadwalTab');
    if (!jadwalSection) return;

    // Init langsung kalau jadwal tab aktif
    if (jadwalSection.classList.contains('active')) init();

    // Listen tab switch
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.tab === 'jadwal') {
          setTimeout(init, 50);
        }
      });
    });
  });

})();
