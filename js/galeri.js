/* ==========================================================================
   GALERI FOTO KELAS — Firebase Realtime Database
   Admin tambah foto via URL + caption. Tampil sebagai grid masonry.
   Klik foto = lightbox full-screen.
   ========================================================================== */

(function () {
  'use strict';

  /* ---- FIREBASE LISTENER ---- */
  let photosData = [];

  function listenPhotos() {
    if (!window.db) { setTimeout(listenPhotos, 500); return; }
    const ref = window.db.ref('class_gallery').orderByChild('timestamp');
    ref.on('value', snap => {
      photosData = [];
      if (snap.exists()) {
        snap.forEach(child => {
          photosData.push({ id: child.key, ...child.val() });
        });
        photosData.reverse(); // terbaru di atas
      }
      renderGallery(photosData);
    });
  }

  /* ---- RENDER GALLERY GRID ---- */
  function renderGallery(photos) {
    const grid = document.getElementById('galeriGrid');
    const emptyState = document.getElementById('galeriEmpty');
    if (!grid) return;

    if (!photos || photos.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }
    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = photos.map((p, idx) => `
      <div class="galeri-item brut-card" data-idx="${idx}" style="
        cursor:pointer;
        overflow:hidden;
        position:relative;
        aspect-ratio: ${idx % 5 === 0 ? '4/3' : idx % 3 === 0 ? '1/1' : '3/4'};
        background: var(--bg-card);
      " onclick="GaleriModule.openLightbox(${idx})">
        <img
          src="${p.url}"
          alt="${p.caption || 'Foto kelas 9B'}"
          loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);"
          onerror="this.parentElement.style.display='none'"
        />
        <!-- Hover Overlay -->
        <div class="galeri-overlay" style="
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%);
          opacity:0;transition:opacity 0.3s ease;
          display:flex;flex-direction:column;justify-content:flex-end;padding:12px;
        ">
          ${p.caption ? `<div style="font-size:0.8rem;font-weight:700;color:#fff;line-height:1.3;">${p.caption}</div>` : ''}
          <div style="font-size:0.7rem;color:rgba(255,255,255,0.6);margin-top:3px;">${p.uploadedBy || 'Admin'}</div>
        </div>
        ${window.isAdminLoggedIn ? `
        <button onclick="event.stopPropagation();GaleriModule.deletePhoto('${p.id}')" style="
          position:absolute;top:6px;right:6px;
          background:rgba(239,68,68,0.9);color:#fff;
          border:none;border-radius:2px;padding:4px 7px;
          font-size:0.7rem;cursor:pointer;
        "><i class="fa-solid fa-trash"></i></button>` : ''}
      </div>
    `).join('');

    // Hover effect on photos
    grid.querySelectorAll('.galeri-item').forEach(item => {
      const img = item.querySelector('img');
      const overlay = item.querySelector('.galeri-overlay');
      item.addEventListener('mouseenter', () => {
        if (img) img.style.transform = 'scale(1.06)';
        if (overlay) overlay.style.opacity = '1';
      });
      item.addEventListener('mouseleave', () => {
        if (img) img.style.transform = 'scale(1)';
        if (overlay) overlay.style.opacity = '0';
      });
    });
  }

  /* ---- LIGHTBOX ---- */
  function openLightbox(idx) {
    if (!photosData[idx]) return;
    const lb = document.getElementById('galeriLightbox');
    if (!lb) return;

    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    showLightboxPhoto(idx);
    lb._currentIdx = idx;
  }

  function showLightboxPhoto(idx) {
    const p = photosData[idx];
    if (!p) return;
    const lb = document.getElementById('galeriLightbox');
    const img = lb.querySelector('#lbImg');
    const caption = lb.querySelector('#lbCaption');
    const author = lb.querySelector('#lbAuthor');
    const counter = lb.querySelector('#lbCounter');

    if (img) { img.style.opacity = '0'; img.src = p.url; img.onload = () => img.style.opacity = '1'; }
    if (caption) caption.textContent = p.caption || '';
    if (author) author.textContent = p.uploadedBy ? `Oleh: ${p.uploadedBy}` : '';
    if (counter) counter.textContent = `${idx + 1} / ${photosData.length}`;
    lb._currentIdx = idx;
  }

  function closeLightbox() {
    const lb = document.getElementById('galeriLightbox');
    if (lb) lb.style.display = 'none';
    document.body.style.overflow = '';
  }

  function lbNext() {
    const lb = document.getElementById('galeriLightbox');
    if (!lb) return;
    const next = (lb._currentIdx + 1) % photosData.length;
    showLightboxPhoto(next);
  }

  function lbPrev() {
    const lb = document.getElementById('galeriLightbox');
    if (!lb) return;
    const prev = (lb._currentIdx - 1 + photosData.length) % photosData.length;
    showLightboxPhoto(prev);
  }

  /* ---- ADD PHOTO ---- */
  function addPhoto() {
    const url     = document.getElementById('photoUrl')?.value?.trim();
    const caption = document.getElementById('photoCaption')?.value?.trim();
    const author  = document.getElementById('photoAuthor')?.value?.trim() || 'Admin';

    if (!url) { alert('URL foto wajib diisi!'); return; }
    if (!url.startsWith('http')) { alert('Masukkan URL yang valid (diawali https://)'); return; }

    if (!window.db) { alert('Database belum siap.'); return; }

    window.db.ref('class_gallery').push({
      url, caption: caption || '', uploadedBy: author,
      timestamp: Date.now()
    }).then(() => {
      document.getElementById('photoUrl').value     = '';
      document.getElementById('photoCaption').value = '';
      document.getElementById('photoAuthor').value  = '';
      const form = document.getElementById('addPhotoForm');
      if (form) form.style.display = 'none';
    }).catch(err => alert('Gagal tambah foto: ' + err.message));
  }

  /* ---- DELETE PHOTO ---- */
  function deletePhoto(id) {
    if (!confirm('Hapus foto ini dari galeri?')) return;
    window.db.ref(`class_gallery/${id}`).remove();
  }

  /* ---- INIT ---- */
  function init() {
    listenPhotos();

    // Lightbox controls
    const lbClose = document.getElementById('lbClose');
    const lbBgClose = document.getElementById('galeriLightbox');
    const lbNextBtn = document.getElementById('lbNext');
    const lbPrevBtn = document.getElementById('lbPrev');

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbBgClose) lbBgClose.addEventListener('click', e => { if (e.target === lbBgClose) closeLightbox(); });
    if (lbNextBtn) lbNextBtn.addEventListener('click', lbNext);
    if (lbPrevBtn) lbPrevBtn.addEventListener('click', lbPrev);

    // Keyboard nav
    document.addEventListener('keydown', e => {
      const lb = document.getElementById('galeriLightbox');
      if (!lb || lb.style.display === 'none') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'ArrowLeft')  lbPrev();
    });

    // Add photo button
    const addBtn = document.getElementById('addPhotoBtn');
    if (addBtn) addBtn.addEventListener('click', addPhoto);

    // Toggle form
    const toggleBtn = document.getElementById('toggleAddPhotoForm');
    const form = document.getElementById('addPhotoForm');
    if (toggleBtn && form) {
      toggleBtn.addEventListener('click', () => {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      });
    }

    // Show/hide admin controls based on login state
    function updateAdminUI() {
      const adminBtns = document.querySelectorAll('.galeri-admin-only, .kalender-admin-only');
      adminBtns.forEach(el => {
        el.style.display = window.isAdminLoggedIn ? 'block' : 'none';
      });
    }
    updateAdminUI();

    // Re-run on admin login state change
    document.addEventListener('adminStateChanged', updateAdminUI);
  }

  document.addEventListener('DOMContentLoaded', () => setTimeout(init, 600));

  window.GaleriModule = { openLightbox, closeLightbox, lbNext, lbPrev, addPhoto, deletePhoto };

})();
