// Jantung Utama Aplikasi — Firebase Realtime Database

// State refs
let statusRef = null;
let sessionsRef = null;
let logsRef = null;
let capsuleRef = null;
let videosRef = null;
let mySessionKey = '';
let countdownInterval = null;
let targetCapsuleDate = null;

// Database Jadwal Piket Harian Kelas 9B
window.JADWAL_PIKET = {
  'Senin':  ['Ahmad Ubaidullah Sami','Adrian Rakha Prayoga','Andi Azman Awwadi','Muhammad Raffasya Afhariadi','Raihan Muhammad Ikhsan','Muhammad Arkananta Davian'],
  'Selasa': ['Muhammad Fathir Waliputra','Muhammad Fakhry Panji','Muhammad Farid Alvarez','Bayu Aditya Abdee Pratama Londro','Zaidan Makkuraga Fauzan','Dzaky Almair Zhafran'],
  'Rabu':   ['Muh. Faris Aryaguna Akhmad','S. Muh. Alfatih Farham','Faqih Murtaja Adzaki','Ahmad Fadlan Putra Hairul','Radhi Ahmad Khairan','Achmad Sakha Wiratama Nazir','Muhammad Khaizuran Al Fatih'],
  'Kamis':  ['Andi Raja Nabeel Dikri','Nabhan Radinka Raynar Fernajanan','M. Faiq Azka Ramadhan','Muhammad Faizi Basri','Hanif Wicaksono Farid Widodo','Muhammad Adrian Pradipta','Amar Shadiq Ry'],
  'Jumat':  ['Abyan Fathir Mallombasi','Almer Danish Ahmad Fawwaz Rajab','Andi Ahmad Kasya Alvaro Asrah Wijaya','Muh. Adnan','Muh. Rama Permana Indra','Muhammad Aufa Khairi Asri'],
  'Sabtu':  [],
  'Minggu': []
};

// DOM Elements
const bodyEl = document.body;
const tabButtons = document.querySelectorAll('.nav-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const loginAdminModal = document.getElementById('loginAdminModal');
const addTaskModal = document.getElementById('addTaskModal');
const setCapsuleDateModal = document.getElementById('setCapsuleDateModal');
const addVideoModal = document.getElementById('addVideoModal');

/* ==========================================================================
   APP INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => { initApp(); });

function initApp() {
  if (!window.db) {
    console.error("Firebase database belum siap!");
    return;
  }

  // Ambil referensi node-node Firebase
  statusRef  = window.db.ref('9b_class_status_v1');
  sessionsRef = window.db.ref('9b_class_admin_sessions_v1');
  logsRef    = window.db.ref('9b_class_activity_logs_v1');
  capsuleRef = window.db.ref('9b_class_time_capsule_v1');
  videosRef  = window.db.ref('9b_class_exam_videos_v1');

  setupGlobalStatusListener();
  initTabRouter();

  if (window.initChat) {
    window.initChat((username, avatar) => {
      document.getElementById('myChatName').innerText = username;
      document.getElementById('myChatAvatar').innerText = avatar;
    });
  }
  if (window.initTasks) window.initTasks();

  setupUIEventListeners();
  restoreAdminSession();
  updatePiketWidget();
}

/* ==========================================================================
   TAB ROUTER
   ========================================================================== */
function initTabRouter() {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(btn.dataset.tab);
    });
  });
}

function switchTab(tabId) {
  tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  tabContents.forEach(c => c.classList.toggle('active', c.id === `${tabId}Tab`));
  mobileMenu.style.display = 'none';

  if (tabId === 'chat') {
    const cm = document.getElementById('chatMessages');
    if (cm) setTimeout(() => { cm.scrollTop = cm.scrollHeight; }, 50);
  } else if (tabId === 'tasks') {
    if (window.renderTasksList) window.renderTasksList();
  }
}

/* ==========================================================================
   GLOBAL STATUS LISTENER (Firebase on('value'))
   ========================================================================== */
function setupGlobalStatusListener() {
  if (!statusRef) return;

  // Dengarkan seluruh node status sekaligus — Firebase .on('value') sangat andal
  statusRef.on('value', (snap) => {
    const status = snap.val() || {};

    // 1. Deadline Alert Mode
    const isDeadlineMode = !!status.deadline_mode;
    document.getElementById('switchDeadlineMode').checked = isDeadlineMode;
    if (isDeadlineMode) {
      bodyEl.classList.add('deadline-alert-active');
      document.getElementById('liveBroadcastBanner').style.background = 'var(--pink)';
    } else {
      bodyEl.classList.remove('deadline-alert-active');
      document.getElementById('liveBroadcastBanner').style.background = 'var(--yellow-light)';
    }

    // 2. Exam Prep Mode
    const isExamPrep = !!status.exam_prep_mode;
    document.getElementById('switchExamPrepMode').checked = isExamPrep;
    const examContainer = document.getElementById('examPrepCenter');
    if (isExamPrep) {
      examContainer.style.display = 'block';
      loadExamVideos();
    } else {
      examContainer.style.display = 'none';
    }

    // 3. Time Capsule Mode
    const isTimeCapsule = !!status.time_capsule_mode;
    document.getElementById('switchTimeCapsuleMode').checked = isTimeCapsule;
    targetCapsuleDate = status.time_capsule_unlock_date || '';
    if (isTimeCapsule) {
      initTimeCapsuleView(!!status.time_capsule_forced_open);
    } else {
      const lv = document.getElementById('capsuleLockedView');
      const uv = document.getElementById('capsuleUnlockedView');
      if (lv) lv.style.display = 'block';
      if (uv) uv.style.display = 'none';
    }

    // 4. Broadcast Text
    const bcastText = status.broadcast_text || 'Selamat datang di website resmi Kelas 9B.';
    document.getElementById('broadcastText').innerText = bcastText;
    document.getElementById('broadcastTextEditor').value = bcastText;
  });
}

/* ==========================================================================
   TIME CAPSULE LOGIC
   ========================================================================== */
function initTimeCapsuleView(forcedOpen) {
  const lockedView = document.getElementById('capsuleLockedView');
  const unlockedView = document.getElementById('capsuleUnlockedView');
  const targetText = document.getElementById('capsuleTargetDateText');

  clearInterval(countdownInterval);

  if (targetCapsuleDate) {
    const d = new Date(targetCapsuleDate);
    targetText.innerText = `Rencana dibuka pada: ${d.toLocaleDateString('id-ID', { day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit' })} WIB`;
  } else {
    targetText.innerText = 'Rencana dibuka pada: Waktu pembukaan belum ditentukan administrator';
  }

  if (forcedOpen) {
    lockedView.style.display = 'none';
    unlockedView.style.display = 'block';
    loadCapsuleMemories();
  } else {
    lockedView.style.display = 'block';
    unlockedView.style.display = 'none';
    if (targetCapsuleDate) {
      startCountdown(targetCapsuleDate, () => {
        lockedView.style.display = 'none';
        unlockedView.style.display = 'block';
        loadCapsuleMemories();
      });
    }
  }
}

function startCountdown(targetDateStr, onComplete) {
  const target = new Date(targetDateStr).getTime();
  const update = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      clearInterval(countdownInterval);
      ['cdDays','cdHours','cdMins','cdSecs'].forEach(id => document.getElementById(id).innerText = '00');
      onComplete(); return;
    }
    document.getElementById('cdDays').innerText  = String(Math.floor(diff/86400000)).padStart(2,'0');
    document.getElementById('cdHours').innerText = String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
    document.getElementById('cdMins').innerText  = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    document.getElementById('cdSecs').innerText  = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
  };
  update();
  countdownInterval = setInterval(update, 1000);
}

function loadCapsuleMemories() {
  if (!capsuleRef) return;
  const grid = document.getElementById('capsuleMessagesGrid');
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;">Memuat kenangan Kelas 9B...</div>';

  capsuleRef.once('value', (snap) => {
    const list = [];
    snap.forEach(child => { list.push({ id: child.key, ...child.val() }); });
    if (list.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);">Belum ada pesan di dalam kapsul waktu.</div>';
    } else {
      renderMemoriesGrid(list);
    }
  });
}

function renderMemoriesGrid(list) {
  const grid = document.getElementById('capsuleMessagesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'capsule-message-card';
    card.style.setProperty('--rotation', `${(Math.random()*4-2).toFixed(1)}deg`);
    card.innerHTML = `<div class="capsule-msg-sender">DARI: ${escapeHTML(item.sender)}</div><div class="capsule-msg-body">"${escapeHTML(item.message)}"</div>`;
    grid.appendChild(card);
  });
}

function submitToCapsule(sender, message) {
  if (!sender.trim() || !message.trim()) { alert("Nama dan isi pesan wajib diisi!"); return; }
  if (capsuleRef) {
    capsuleRef.push({ sender: sender.trim(), message: message.trim(), timestamp: Date.now() });
    alert("🔒 Pesan berhasil dikunci ke dalam Kapsul Waktu.");
    document.getElementById('capsuleSenderName').value = '';
    document.getElementById('capsuleMessageInput').value = '';
  } else {
    alert("Koneksi database terputus. Gagal menyimpan pesan.");
  }
}

/* ==========================================================================
   EXAM PREPARATION VIDEOS
   ========================================================================== */
function loadExamVideos() {
  if (!videosRef) return;
  const grid = document.getElementById('examVideoGrid');
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;">Memuat materi video...</div>';

  // Gunakan on('value') agar daftar video selalu terupdate realtime
  videosRef.on('value', (snap) => {
    const list = [];
    snap.forEach(child => { list.push({ id: child.key, ...child.val() }); });
    renderVideosGrid(list);
  });
}

function renderVideosGrid(list) {
  const grid = document.getElementById('examVideoGrid');
  if (!grid) return;
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);">Belum ada materi pembelajaran video.</div>';
    return;
  }
  const isHeadAdmin = localStorage.getItem('admin_level') === 'HEAD_ADMIN';
  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    const deleteBtn = isHeadAdmin
      ? `<button class="task-action-btn btn-delete" style="width:100%;border:none;border-top:2px solid var(--border-color);font-size:.75rem;padding:8px;" onclick="deleteExamVideo('${video.id}')">HAPUS VIDEO</button>`
      : '';
    const isYt = !video.type || video.type === 'youtube';
    if (isYt) {
      const ytId = extractYoutubeId(video.url);
      if (ytId) {
        card.innerHTML = `
          <div class="video-container"><iframe src="https://www.youtube.com/embed/${ytId}" allowfullscreen></iframe></div>
          <div class="video-info" style="padding:10px;display:flex;flex-direction:column;gap:8px;">
            <div class="video-title" style="font-weight:700;font-size:.9rem;">${escapeHTML(video.title)}</div>
            <a href="https://www.youtube.com/watch?v=${ytId}" target="_blank" class="brut-btn btn-yellow" style="box-shadow:2px 2px 0 #000;padding:6px 12px;font-size:.75rem;text-decoration:none;width:100%;text-align:center;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> TONTON DI YOUTUBE
            </a>
          </div>${deleteBtn}`;
      }
    } else {
      card.innerHTML = `
        <div class="video-container"><video src="${video.url}" controls style="width:100%;height:100%;object-fit:contain;background:#000;"></video></div>
        <div class="video-info" style="padding:10px;display:flex;flex-direction:column;gap:8px;">
          <div class="video-title" style="font-weight:700;font-size:.9rem;">${escapeHTML(video.title)}</div>
          <a href="${video.url}" download="${video.title}.mp4" target="_blank" class="brut-btn btn-cyan" style="box-shadow:2px 2px 0 #000;padding:6px 12px;font-size:.75rem;text-decoration:none;width:100%;text-align:center;">
            <i class="fa-solid fa-download"></i> UNDUH VIDEO (BELAJAR OFFLINE)
          </a>
        </div>${deleteBtn}`;
    }
    grid.appendChild(card);
  });
}

window.deleteExamVideo = function (videoId) {
  if (!confirm("Hapus video materi ini?")) return;
  if (videosRef) {
    videosRef.child(videoId).remove();
    if (window.logAdminActivity) window.logAdminActivity("Menghapus video pembelajaran");
  }
};

function extractYoutubeId(url) {
  const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return (m && m[2].length === 11) ? m[2] : null;
}

/* ==========================================================================
   ADMIN LOGIN & SESSIONS
   ========================================================================== */
function attemptAdminLogin(password) {
  const p = password.trim();
  let level = '', name = '';
  if (p === window.ADMIN_PASSWORDS.HEAD_ADMIN) { level='HEAD_ADMIN'; name='Rehan (Owner)'; }
  else if (p === window.ADMIN_PASSWORDS.WALI_KELAS) { level='WALI_KELAS'; name='Wali Kelas'; }
  else if (p === window.ADMIN_PASSWORDS.SEKRETARIS) { level='SEKRETARIS'; name='Sekretaris'; }
  else if (p === window.ADMIN_PASSWORDS.TEMAN) { level='REGULAR_ADMIN'; name='Admin Teman'; }
  else { alert("❌ Kata sandi yang Anda masukkan salah."); return; }

  localStorage.setItem('admin_logged','true');
  localStorage.setItem('admin_level', level);
  localStorage.setItem('admin_name', name);
  createAdminSession(level, name);
}

function createAdminSession(level, name) {
  if (sessionsRef) {
    const sessionKey = 'session_' + Date.now() + '_' + Math.floor(Math.random()*1000);
    mySessionKey = sessionKey;
    localStorage.setItem('admin_session_key', mySessionKey);

    sessionsRef.child(sessionKey).set({ name, level, timestamp: Date.now() }, (err) => {
      if (!err && window.logAdminActivity) window.logAdminActivity("Berhasil masuk ke panel administrator");
      applyAdminUI(level, name);
      loginAdminModal.style.display = 'none';
      document.getElementById('adminPasswordInput').value = '';
    });

    // Dengarkan jika sesi diputus paksa
    sessionsRef.child(mySessionKey).on('value', (snap) => {
      if (!snap.exists()) handleLogout(true);
    });
  } else {
    applyAdminUI(level, name);
    loginAdminModal.style.display = 'none';
  }
}

function restoreAdminSession() {
  const isLogged = localStorage.getItem('admin_logged') === 'true';
  const level = localStorage.getItem('admin_level');
  const name = localStorage.getItem('admin_name');
  const sessionKey = localStorage.getItem('admin_session_key');

  if (isLogged && level && name) {
    mySessionKey = sessionKey || '';
    applyAdminUI(level, name);
    if (sessionsRef && mySessionKey) {
      sessionsRef.child(mySessionKey).on('value', (snap) => {
        if (!snap.exists()) handleLogout(true);
      });
    }
  }
}

function applyAdminUI(level, name) {
  adminLoginBtn.innerHTML = `<i class="fa-solid fa-user-gear"></i> ${name.toUpperCase()}`;
  adminLoginBtn.classList.add('logged-in');
  const dashboard = document.getElementById('adminDashboardPanel');
  dashboard.style.display = 'block';
  const labelLevel = document.getElementById('adminPanelLevel');
  labelLevel.innerText = level;
  labelLevel.style.background = level === 'HEAD_ADMIN' ? 'var(--purple)' : 'var(--pink)';
  labelLevel.style.color = '#000';
  document.getElementById('openAddTaskModalBtn').style.display = 'inline-flex';

  if (level === 'HEAD_ADMIN') {
    document.getElementById('ctrlExamPrep').style.display = 'flex';
    document.getElementById('ctrlTimeCapsule').style.display = 'flex';
    document.getElementById('headAdminManagementBox').style.display = 'block';
    document.getElementById('clearChatBtn').style.display = 'block';
    setupHeadAdminDashboard();
  } else {
    document.getElementById('ctrlExamPrep').style.display = 'none';
    document.getElementById('ctrlTimeCapsule').style.display = 'none';
    document.getElementById('headAdminManagementBox').style.display = 'none';
    document.getElementById('clearChatBtn').style.display = 'none';
  }
  if (window.renderTasksList) window.renderTasksList();
}

function handleLogout(forced = false) {
  if (sessionsRef && mySessionKey) {
    sessionsRef.child(mySessionKey).off();
    if (!forced) {
      sessionsRef.child(mySessionKey).remove();
      if (window.logAdminActivity) window.logAdminActivity("Berhasil keluar dari panel administrator");
    }
  }
  ['admin_logged','admin_level','admin_name','admin_session_key'].forEach(k => localStorage.removeItem(k));
  mySessionKey = '';
  adminLoginBtn.innerHTML = '<i class="fa-solid fa-lock"></i> LOGIN ADMIN';
  adminLoginBtn.classList.remove('logged-in');
  document.getElementById('adminDashboardPanel').style.display = 'none';
  document.getElementById('openAddTaskModalBtn').style.display = 'none';
  document.getElementById('clearChatBtn').style.display = 'none';
  if (window.renderTasksList) window.renderTasksList();
  if (forced) { alert("⚠️ Sesi akses administrator Anda telah diputus secara paksa oleh Administrator Utama."); switchTab('lobby'); }
}

window.logAdminActivity = function (actionText) {
  if (!logsRef) { console.log(`[Log]: ${actionText}`); return; }
  const adminName = localStorage.getItem('admin_name') || 'Admin';
  logsRef.push({ admin: adminName, action: actionText, timestamp: Date.now() });
};

/* ==========================================================================
   HEAD ADMIN DASHBOARD
   ========================================================================== */
function setupHeadAdminDashboard() {
  if (!window.db) return;

  // 1. Activity Logs (ambil 30 terbaru, urutkan berdasarkan timestamp)
  logsRef.orderByChild('timestamp').limitToLast(30).on('value', (snap) => {
    const logs = [];
    snap.forEach(child => { logs.push({ id: child.key, ...child.val() }); });
    logs.sort((a,b) => b.timestamp - a.timestamp);

    const logBox = document.getElementById('activityLogBox');
    logBox.innerHTML = '';
    if (logs.length === 0) { logBox.innerHTML = '<div class="log-entry">Belum ada catatan aktivitas admin.</div>'; return; }
    logs.forEach(item => {
      const time = new Date(item.timestamp).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      if (item.action.includes('HAPUS') || item.action.includes('darurat') || item.action.includes('kapsul')) entry.classList.add('important');
      entry.innerHTML = `[${time}] <strong>${item.admin}</strong>: ${item.action}`;
      logBox.appendChild(entry);
    });
  });

  // 2. Active Sessions
  sessionsRef.on('value', (snap) => {
    const admins = [];
    snap.forEach(child => { admins.push({ id: child.key, ...child.val() }); });

    const list = document.getElementById('activeAdminsList');
    list.innerHTML = '';
    let count = 0;
    admins.forEach(item => {
      if (item.id === mySessionKey) return;
      count++;
      const div = document.createElement('div');
      div.className = 'admin-session-item';
      div.innerHTML = `<span>👤 ${item.name} (${item.level})</span><button class="task-action-btn btn-delete" style="padding:4px 8px;font-size:.7rem;" onclick="terminateAdminSession('${item.id}','${item.name}')">TERMINASI</button>`;
      list.appendChild(div);
    });
    if (count === 0) list.innerHTML = '<div class="admin-session-item">Tidak ada admin reguler yang sedang online.</div>';
  });
}

window.terminateAdminSession = function (sessionKey, name) {
  if (!confirm(`Putuskan sesi administrator "${name}"?`)) return;
  if (sessionsRef) {
    sessionsRef.child(sessionKey).remove();
    window.logAdminActivity(`Memutus sesi administrator reguler: "${name}"`);
  }
};

/* ==========================================================================
   UI EVENT LISTENERS
   ========================================================================== */
function setupUIEventListeners() {
  mobileMenuBtn.onclick = () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  };
  document.getElementById('navLogoHome').onclick = (e) => { e.preventDefault(); switchTab('lobby'); };

  // Modal Piket Jobdesk
  const piketBtn = document.getElementById('viewPiketJobdeskBtn');
  const piketClose = document.getElementById('closePiketJobdeskBtn');
  const piketModal = document.getElementById('piketJobdeskModal');
  if (piketBtn && piketClose && piketModal) {
    piketBtn.onclick = () => piketModal.style.display = 'flex';
    piketClose.onclick = () => piketModal.style.display = 'none';
  }

  adminLoginBtn.onclick = () => {
    if (localStorage.getItem('admin_logged') === 'true') {
      document.getElementById('adminDashboardPanel').scrollIntoView({ behavior:'smooth' });
    } else { loginAdminModal.style.display = 'flex'; }
  };
  document.getElementById('closeLoginModalBtn').onclick = () => loginAdminModal.style.display = 'none';
  document.getElementById('submitLoginBtn').onclick = () => attemptAdminLogin(document.getElementById('adminPasswordInput').value);
  document.getElementById('adminPasswordInput').onkeydown = (e) => { if (e.key==='Enter') attemptAdminLogin(e.target.value); };
  document.getElementById('adminLogoutBtn').onclick = () => { if (confirm("Keluar dari panel administrator?")) handleLogout(); };
  document.getElementById('openAddTaskModalBtn').onclick = () => addTaskModal.style.display = 'flex';
  document.getElementById('closeAddTaskModalBtn').onclick = () => addTaskModal.style.display = 'none';

  document.getElementById('submitAddTaskBtn').onclick = () => {
    const subject = document.getElementById('taskSubjectInput').value;
    const desc = document.getElementById('taskDescInput').value;
    const deadline = document.getElementById('taskDeadlineInput').value;
    const priority = document.getElementById('taskPrioritySelect').value;
    if (!subject.trim() || !desc.trim()) { alert("Kolom Mata Pelajaran dan Keterangan Tugas wajib diisi!"); return; }
    if (window.addNewTask) window.addNewTask(subject, desc, deadline, priority);
    addTaskModal.style.display = 'none';
    document.getElementById('taskSubjectInput').value = '';
    document.getElementById('taskDescInput').value = '';
    document.getElementById('taskDeadlineInput').value = '';
  };

  document.getElementById('submitToCapsuleBtn').onclick = () => {
    submitToCapsule(document.getElementById('capsuleSenderName').value, document.getElementById('capsuleMessageInput').value);
  };

  document.getElementById('editUsernameBtn').onclick = () => {
    localStorage.removeItem('chat_username');
    localStorage.removeItem('chat_avatar');
    if (window.initChat) window.initChat((u,a) => {
      document.getElementById('myChatName').innerText = u;
      document.getElementById('myChatAvatar').innerText = a;
    });
  };

  const sendBtn = document.getElementById('sendChatBtn');
  const chatInput = document.getElementById('chatInput');
  if (sendBtn && chatInput) {
    sendBtn.onclick = () => { if (window.sendMessage) window.sendMessage(chatInput.value); chatInput.value = ''; };
    chatInput.onkeydown = (e) => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendBtn.click(); } };
  }

  document.getElementById('clearChatBtn').onclick = () => { if (window.clearChatHistory) window.clearChatHistory(); };

  // Switch Deadline Mode — Firebase update
  document.getElementById('switchDeadlineMode').onchange = (e) => {
    if (statusRef) {
      statusRef.update({ deadline_mode: e.target.checked });
      window.logAdminActivity(`Deadline Alert Mode → [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
    }
  };

  // Switch Exam Prep Mode
  document.getElementById('switchExamPrepMode').onchange = (e) => {
    if (statusRef) {
      statusRef.update({ exam_prep_mode: e.target.checked });
      window.logAdminActivity(`Exam Prep Mode → [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
      if (e.target.checked && confirm("Exam Prep Mode diaktifkan. Tambahkan video pembelajaran sekarang?")) addVideoModal.style.display = 'flex';
    }
  };

  // Switch Time Capsule Mode
  document.getElementById('switchTimeCapsuleMode').onchange = (e) => {
    if (statusRef) {
      statusRef.update({ time_capsule_mode: e.target.checked });
      window.logAdminActivity(`Kapsul Waktu → [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
      if (e.target.checked) setCapsuleDateModal.style.display = 'flex';
    }
  };

  document.getElementById('submitCapsuleDateBtn').onclick = () => {
    const inputVal = document.getElementById('capsuleTargetDateInput').value;
    if (!inputVal) { alert("Harap tentukan tanggal dan waktu pembukaan!"); return; }
    if (statusRef) {
      statusRef.update({ time_capsule_unlock_date: inputVal, time_capsule_forced_open: false });
      setCapsuleDateModal.style.display = 'none';
      window.logAdminActivity(`Waktu pembukaan Kapsul Waktu: ${inputVal}`);
      alert("Waktu pembukaan Kapsul Waktu berhasil disimpan!");
    }
  };
  document.getElementById('closeCapsuleDateModalBtn').onclick = () => setCapsuleDateModal.style.display = 'none';

  // Opsi sumber video
  const srcYt = document.getElementById('srcYtRadio');
  const srcUp = document.getElementById('srcUploadRadio');
  const ytBox = document.getElementById('ytInputBox');
  const upBox = document.getElementById('localVideoInputBox');
  if (srcYt && srcUp) {
    srcYt.onchange = () => { ytBox.style.display='block'; upBox.style.display='none'; };
    srcUp.onchange = () => { ytBox.style.display='none'; upBox.style.display='block'; };
  }

  // Submit Video Ujian
  document.getElementById('submitAddVideoBtn').onclick = () => {
    const title = document.getElementById('videoTitleInput').value.trim();
    if (!title) { alert("Harap masukkan judul video."); return; }
    const source = document.querySelector('input[name="videoSource"]:checked').value;
    if (source === 'youtube') {
      const url = document.getElementById('videoUrlInput').value.trim();
      if (!url) { alert("Alamat tautan YouTube wajib diisi!"); return; }
      if (videosRef) {
        videosRef.push({ title, url, type: 'youtube', timestamp: Date.now() });
        addVideoModal.style.display = 'none';
        resetVideoForm();
        alert("Video berhasil ditambahkan!");
      }
    } else {
      const fileInput = document.getElementById('videoFileInput');
      if (fileInput.files.length === 0) { alert("Harap pilih file video!"); return; }
      uploadVideoToPixeldrain(fileInput.files[0], title);
    }
  };
  document.getElementById('closeVideoModalBtn').onclick = () => { addVideoModal.style.display='none'; resetVideoForm(); };

  // Save Broadcast Text
  document.getElementById('saveBroadcastBtn').onclick = () => {
    const text = document.getElementById('broadcastTextEditor').value.trim();
    if (!text) { alert("Teks pengumuman tidak boleh kosong!"); return; }
    if (statusRef) {
      statusRef.update({ broadcast_text: text });
      window.logAdminActivity(`Siaran Langsung diubah: "${text}"`);
      alert("Siaran Langsung berhasil diperbarui!");
    }
  };
}

/* ==========================================================================
   HELPERS & UTILITIES
   ========================================================================== */
function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[t]||t));
}

function uploadVideoToPixeldrain(file, title) {
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  fd.append('file', file);
  fd.append('anonymous', 'true');

  const progressBox = document.getElementById('uploadProgressBox');
  const progressBar = document.getElementById('uploadProgressBar');
  const percentText = document.getElementById('uploadPercent');
  const submitBtn = document.getElementById('submitAddVideoBtn');
  const closeBtn = document.getElementById('closeVideoModalBtn');

  progressBox.style.display = 'block';
  submitBtn.disabled = true;
  closeBtn.disabled = true;

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const pct = Math.round((e.loaded/e.total)*100);
      progressBar.style.width = pct + '%';
      percentText.innerText = pct + '%';
    }
  };
  xhr.onload = () => {
    if (xhr.status === 201 || xhr.status === 200) {
      try {
        const res = JSON.parse(xhr.responseText);
        if (res.success && res.id) {
          const fileUrl = `https://pixeldrain.com/api/file/${res.id}`;
          if (videosRef) videosRef.push({ title, url: fileUrl, type: 'upload', fileId: res.id, timestamp: Date.now() });
          if (window.logAdminActivity) window.logAdminActivity(`Video "${title}" berhasil diunggah ke cloud.`);
          alert("Video berhasil diunggah!");
          addVideoModal.style.display = 'none';
          resetVideoForm();
        } else { alert("Gagal mengunggah: " + (res.message || "Kesalahan server.")); }
      } catch (e) { alert("Respon server tidak dapat diproses."); }
    } else { alert("Kesalahan server (Kode: " + xhr.status + ")."); }
    progressBox.style.display = 'none'; submitBtn.disabled=false; closeBtn.disabled=false;
  };
  xhr.onerror = () => { alert("Gagal unggah karena gangguan jaringan."); progressBox.style.display='none'; submitBtn.disabled=false; closeBtn.disabled=false; };
  xhr.open('POST','https://pixeldrain.com/api/file');
  xhr.send(fd);
}

function resetVideoForm() {
  document.getElementById('videoTitleInput').value = '';
  document.getElementById('videoUrlInput').value = '';
  document.getElementById('videoFileInput').value = '';
  document.getElementById('srcYtRadio').checked = true;
  document.getElementById('ytInputBox').style.display = 'block';
  document.getElementById('localVideoInputBox').style.display = 'none';
  document.getElementById('uploadProgressBox').style.display = 'none';
  document.getElementById('uploadProgressBar').style.width = '0%';
  document.getElementById('uploadPercent').innerText = '0%';
}

function updatePiketWidget() {
  const dayEl = document.getElementById('piketDayName');
  const memberEl = document.getElementById('piketMemberList');
  if (!dayEl || !memberEl) return;
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const today = days[new Date().getDay()];
  dayEl.innerText = today;
  memberEl.innerHTML = '';
  const members = window.JADWAL_PIKET[today] || [];
  if (members.length > 0) {
    members.forEach(m => {
      const d = document.createElement('div');
      d.className = 'piket-member';
      d.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--mint);margin-right:6px;"></i> ${m}`;
      memberEl.appendChild(d);
    });
  } else {
    memberEl.innerHTML = '<div class="piket-member" style="color:var(--text-muted);font-size:.85rem;padding:10px 0;text-align:center;"><i class="fa-solid fa-calendar-day" style="margin-right:6px;"></i> Hari Libur Piket</div>';
  }
}
