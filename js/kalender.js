/* ==========================================================================
   KALENDER EVENT KELAS — Firebase Realtime Database
   Admin bisa tambah/hapus event. Siswa lihat event mendatang.
   ========================================================================== */

(function () {
  'use strict';

  const EVENT_COLORS = {
    purple: { bg: 'rgba(167,139,250,0.15)', accent: '#A78BFA', label: 'Akademik' },
    cyan:   { bg: 'rgba(96,165,250,0.15)',  accent: '#60A5FA', label: 'Kelas' },
    mint:   { bg: 'rgba(78,204,163,0.15)',  accent: '#4ECCA3', label: 'Kegiatan' },
    yellow: { bg: 'rgba(233,196,106,0.15)', accent: '#E9C46A', label: 'Ujian' },
    pink:   { bg: 'rgba(248,113,113,0.15)', accent: '#F87171', label: 'Penting' },
  };

  const EVENT_ICONS = {
    purple: 'fa-solid fa-book-open',
    cyan:   'fa-solid fa-users',
    mint:   'fa-solid fa-star',
    yellow: 'fa-solid fa-pen-to-square',
    pink:   'fa-solid fa-bell',
  };

  /* ---- FORMAT TANGGAL ---- */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function isToday(dateStr) {
    if (!dateStr) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  }

  function isPast(dateStr) {
    if (!dateStr) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateStr < today;
  }

  function daysUntil(dateStr) {
    const today = new Date(); today.setHours(0,0,0,0);
    const target = new Date(dateStr + 'T00:00:00');
    const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hari ini';
    if (diff === 1) return 'Besok';
    if (diff < 0) return `${Math.abs(diff)} hari lalu`;
    return `${diff} hari lagi`;
  }

  /* ---- RENDER EVENT LIST ---- */
  function renderEvents(events) {
    const container = document.getElementById('eventListWidget');
    if (!container) return;

    if (!events || events.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted);font-size:0.82rem;padding:12px 0;text-align:center;">
        <i class="fa-regular fa-calendar" style="font-size:1.5rem;margin-bottom:8px;display:block;"></i>
        Belum ada event terjadwal
      </div>`;
      return;
    }

    // Sort by date ascending, filter out events > 30 days ago
    const today = new Date().toISOString().split('T')[0];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    const cutoffStr = cutoff.toISOString().split('T')[0];

    const filtered = events
      .filter(e => e.date >= cutoffStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6); // max 6 di widget

    if (filtered.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted);font-size:0.82rem;padding:8px 0;text-align:center;">Tidak ada event mendatang.</div>`;
      return;
    }

    container.innerHTML = filtered.map(ev => {
      const c = EVENT_COLORS[ev.color] || EVENT_COLORS.cyan;
      const icon = EVENT_ICONS[ev.color] || 'fa-solid fa-calendar';
      const past = isPast(ev.date) && !isToday(ev.date);

      return `
      <div class="event-item" style="
        display:flex;align-items:flex-start;gap:10px;
        padding:10px 12px;
        background:${c.bg};
        border-left:3px solid ${c.accent};
        margin-bottom:8px;
        opacity:${past ? '0.5' : '1'};
        border-radius:0;
        position:relative;
      ">
        <div style="font-size:1rem;color:${c.accent};margin-top:2px;flex-shrink:0;">
          <i class="${icon}"></i>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;font-size:0.85rem;color:var(--text-light);display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            ${ev.title}
            ${isToday(ev.date) ? '<span style="background:#ef4444;color:#fff;font-size:0.6rem;font-family:\'Archivo Black\',sans-serif;padding:1px 5px;">HARI INI</span>' : ''}
          </div>
          <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">
            ${formatDate(ev.date)}
            &nbsp;·&nbsp;
            <span style="color:${c.accent};font-weight:600;">${daysUntil(ev.date)}</span>
          </div>
          ${ev.description ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:3px;">${ev.description}</div>` : ''}
        </div>
        ${window.isAdminLoggedIn ? `<button onclick="KalenderModule.deleteEvent('${ev.id}')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.8rem;flex-shrink:0;" title="Hapus"><i class="fa-solid fa-trash"></i></button>` : ''}
      </div>
      `;
    }).join('');
  }

  /* ---- RENDER FULL CALENDAR (in Kalender Tab) ---- */
  function renderCalendarTab(events) {
    const container = document.getElementById('calendarFullList');
    if (!container) return;

    if (!events || events.length === 0) {
      container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted);">
        <i class="fa-regular fa-calendar-xmark" style="font-size:3rem;margin-bottom:12px;display:block;"></i>
        Belum ada event yang ditambahkan
      </div>`;
      return;
    }

    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
    const grouped = {};
    sorted.forEach(ev => {
      const month = ev.date.substring(0, 7);
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(ev);
    });

    container.innerHTML = Object.entries(grouped).map(([month, evs]) => {
      const [yr, mo] = month.split('-');
      const monthName = new Date(yr, parseInt(mo) - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      return `
      <div style="margin-bottom:24px;">
        <div style="font-family:'Archivo Black',sans-serif;font-size:0.85rem;color:var(--text-muted);
          border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:8px;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em;">
          ${monthName}
        </div>
        ${evs.map(ev => {
          const c = EVENT_COLORS[ev.color] || EVENT_COLORS.cyan;
          const icon = EVENT_ICONS[ev.color] || 'fa-solid fa-calendar';
          const past = isPast(ev.date) && !isToday(ev.date);
          return `
          <div class="brut-card" style="
            padding:14px 18px;margin-bottom:10px;
            background:${c.bg};border-left:4px solid ${c.accent};
            opacity:${past ? '0.55' : '1'};
            display:flex;align-items:center;gap:14px;
          ">
            <div style="
              min-width:50px;text-align:center;
              border-right:1px solid rgba(255,255,255,0.08);
              padding-right:14px;
            ">
              <div style="font-family:'Archivo Black',sans-serif;font-size:1.4rem;color:${c.accent};">${ev.date.split('-')[2]}</div>
              <div style="font-size:0.65rem;color:var(--text-muted);">${new Date(ev.date+'T00:00:00').toLocaleDateString('id-ID',{month:'short'})}</div>
            </div>
            <div style="flex:1;">
              <div style="font-weight:700;font-size:0.95rem;color:var(--text-light);display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <i class="${icon}" style="color:${c.accent};"></i>
                ${ev.title}
                ${isToday(ev.date) ? '<span style="background:#ef4444;color:#fff;font-size:0.6rem;font-family:\'Archivo Black\',sans-serif;padding:1px 6px;animation:pulse-green 2s infinite;">HARI INI</span>' : ''}
              </div>
              ${ev.description ? `<div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">${ev.description}</div>` : ''}
              <div style="font-size:0.72rem;color:${c.accent};margin-top:4px;font-weight:600;">${daysUntil(ev.date)}</div>
            </div>
            ${window.isAdminLoggedIn ? `<button onclick="KalenderModule.deleteEvent('${ev.id}')" class="brut-btn btn-pink" style="font-size:0.75rem;padding:6px 10px;box-shadow:2px 2px 0 #000;"><i class="fa-solid fa-trash"></i></button>` : ''}
          </div>`;
        }).join('')}
      </div>`;
    }).join('');
  }

  /* ---- HELPER ESCAPE HTML ---- */
  function escapeHTML(str) {
    if (window.escapeHTML) return window.escapeHTML(str);
    return str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
  }

  /* ---- FIREBASE LISTENER ---- */
  let eventsData = [];

  function listenEvents() {
    if (!window.db) { setTimeout(listenEvents, 500); return; }
    const ref = window.db.ref('class_events');
    ref.on('value', snap => {
      eventsData = [];
      if (snap.exists()) {
        snap.forEach(child => {
          eventsData.push({ id: child.key, ...child.val() });
        });
      }
      const publicEvents = eventsData.filter(e => e.approved !== false);
      const pendingEvents = eventsData.filter(e => e.approved === false);

      renderEvents(publicEvents);
      renderCalendarTab(publicEvents);
      renderPendingEvents(pendingEvents);
    });
  }

  /* ---- RENDER PENDING EVENTS (ADMIN ONLY) ---- */
  function renderPendingEvents(pendingEvents) {
    const container = document.getElementById('pendingEventList');
    if (!container) return;
    if (pendingEvents.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted); font-size:0.8rem; text-align:center; padding: 10px 0;">Tidak ada usulan event pending.</div>`;
      return;
    }
    container.innerHTML = pendingEvents.map(ev => {
      const d = new Date(ev.date + 'T00:00:00');
      const formattedDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      return `
        <div class="admin-session-item" style="border: 2px solid var(--border-color); padding: 12px; background: rgba(255,255,255,0.02); display: flex; flex-direction: column; gap: 8px; border-radius: 4px; box-shadow: 2px 2px 0px #000; margin-bottom: 8px;">
          <div>
            <strong style="font-size: 0.85rem; color: var(--text-light);">${escapeHTML(ev.title)}</strong>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
              <i class="fa-solid fa-calendar"></i> ${formattedDate} &nbsp;·&nbsp; <i class="fa-solid fa-tag"></i> ${ev.color || 'cyan'}
            </div>
            ${ev.description ? `<p style="font-size: 0.78rem; color: var(--text-muted); margin: 6px 0 0 0; line-height: 1.3;">${escapeHTML(ev.description)}</p>` : ''}
          </div>
          <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px;">
            <button onclick="KalenderModule.rejectEvent('${ev.id}')" class="brut-btn btn-pink" style="padding: 4px 10px; font-size: 0.72rem; font-weight: 700; box-shadow: 1.5px 1.5px 0 #000;">TOLAK</button>
            <button onclick="KalenderModule.approveEvent('${ev.id}')" class="brut-btn btn-mint" style="padding: 4px 10px; font-size: 0.72rem; font-weight: 700; box-shadow: 1.5px 1.5px 0 #000;">SETUJUI</button>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ---- ADD EVENT ---- */
  function addEvent() {
    const title = document.getElementById('eventTitle')?.value?.trim();
    const date  = document.getElementById('eventDate')?.value;
    const desc  = document.getElementById('eventDesc')?.value?.trim();
    const color = document.getElementById('eventColor')?.value || 'cyan';

    if (!title || !date) {
      alert('Judul dan tanggal event wajib diisi!'); return;
    }

    if (!window.db) { alert('Database belum siap.'); return; }

    const isAdmin = localStorage.getItem('admin_logged') === 'true';

    window.db.ref('class_events').push({
      title, date, description: desc || '', color,
      approved: isAdmin,
      createdAt: Date.now()
    }).then(() => {
      document.getElementById('eventTitle').value = '';
      document.getElementById('eventDate').value  = '';
      document.getElementById('eventDesc').value  = '';
      // Close form
      const form = document.getElementById('addEventForm');
      if (form) form.style.display = 'none';

      if (!isAdmin) {
        alert('Usulan kegiatan berhasil dikirim! Kegiatan akan tampil di kalender setelah disetujui oleh Wali Kelas atau Admin.');
      } else {
        alert('Event berhasil ditambahkan!');
      }
    }).catch(err => alert('Gagal tambah event: ' + err.message));
  }

  /* ---- APPROVE EVENT ---- */
  function approveEvent(id) {
    if (!window.db) return;
    window.db.ref(`class_events/${id}`).update({ approved: true })
      .then(() => {
        if (window.logAdminActivity) window.logAdminActivity("Menyetujui usulan event kelas");
        alert("Usulan event berhasil disetujui!");
      })
      .catch(err => alert("Gagal menyetujui event: " + err.message));
  }

  /* ---- REJECT EVENT ---- */
  function rejectEvent(id) {
    if (!window.db) return;
    if (!confirm("Tolak/Hapus usulan event ini?")) return;
    window.db.ref(`class_events/${id}`).remove()
      .then(() => {
        if (window.logAdminActivity) window.logAdminActivity("Menolak usulan event kelas");
        alert("Usulan event berhasil ditolak!");
      })
      .catch(err => alert("Gagal menolak event: " + err.message));
  }

  /* ---- DELETE EVENT ---- */
  function deleteEvent(id) {
    if (!confirm('Hapus event ini?')) return;
    window.db.ref(`class_events/${id}`).remove()
      .then(() => {
        if (window.logAdminActivity) window.logAdminActivity("Menghapus event kelas");
      })
      .catch(err => alert("Gagal menghapus event: " + err.message));
  }

  /* ---- INIT ---- */
  function init() {
    listenEvents();

    // Add event button
    const addBtn = document.getElementById('addEventBtn');
    if (addBtn) addBtn.addEventListener('click', addEvent);

    // Toggle form
    const toggleBtn = document.getElementById('toggleAddEventForm');
    const form = document.getElementById('addEventForm');
    if (toggleBtn && form) {
      toggleBtn.addEventListener('click', () => {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => setTimeout(init, 600));

  window.KalenderModule = { addEvent, deleteEvent };

})();
