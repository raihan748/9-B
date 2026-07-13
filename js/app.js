import { ADMIN_PASSWORDS, firebaseConfig } from './config.js';
import { initChat, sendMessage, clearChatHistory } from './chat.js';
import { initTasks, addNewTask, renderTasksList } from './tasks.js';

// State Management
let database = null;
let statusRef = null;
let sessionsRef = null;
let logsRef = null;
let mySessionKey = '';

// Kapsul Waktu & Video Ujian
let capsuleRef = null;
let videosRef = null;
let countdownInterval = null;
let targetCapsuleDate = null;

// DOM Elements
const bodyEl = document.body;
const tabButtons = document.querySelectorAll('.nav-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Audio BGM
const bgmAudio = document.getElementById('bgmAudio');
const bgmPlayBtn = document.getElementById('bgmPlayBtn');

// Modals
const loginAdminModal = document.getElementById('loginAdminModal');
const addTaskModal = document.getElementById('addTaskModal');
const setCapsuleDateModal = document.getElementById('setCapsuleDateModal');
const addVideoModal = document.getElementById('addVideoModal');

/* ==========================================================================
   APP INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Inisialisasi Firebase jika ada
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    database = firebase.database();
    statusRef = database.ref('9b_status');
    sessionsRef = database.ref('9b_admin_sessions');
    logsRef = database.ref('9b_activity_logs');
    capsuleRef = database.ref('9b_time_capsule');
    videosRef = database.ref('9b_exam_videos');

    setupGlobalStatusListener();
  }

  // Inisiasi Tab UI Router
  initTabRouter();

  // Load Modul Chat & Tasks
  initChat((username, avatar) => {
    document.getElementById('myChatName').innerText = username;
    document.getElementById('myChatAvatar').innerText = avatar;
  });
  initTasks();

  // Event Listeners untuk UI & Tombol
  setupUIEventListeners();
  
  // Kembalikan sesi admin jika sebelumnya sudah login (cek localStorage)
  restoreAdminSession();

  // Setup Lo-fi BGM Player
  initBgmPlayer();
}

/* ==========================================================================
   TAB ROUTER (SPA LOGIC)
   ========================================================================== */
function initTabRouter() {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.dataset.tab;
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Update tombol aktif
  tabButtons.forEach(b => {
    if (b.dataset.tab === tabId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Update konten tab aktif
  tabContents.forEach(content => {
    if (content.id === `${tabId}Tab`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  // Tutup mobile menu jika terbuka
  mobileMenu.style.display = 'none';

  // Trigger khusus saat pindah tab
  if (tabId === 'chat') {
    // Auto scroll chat ke bawah
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 50);
    }
  } else if (tabId === 'tasks') {
    renderTasksList();
  }
}

/* ==========================================================================
   GLOBAL REALTIME STATUS LISTENER (FIREBASE SYNC)
   ========================================================================== */
function setupGlobalStatusListener() {
  if (!statusRef) return;

  statusRef.on('value', (snapshot) => {
    const status = snapshot.val() || {};

    // 1. Deadline Alert Mode
    const isDeadlineMode = status.deadline_mode || false;
    document.getElementById('switchDeadlineMode').checked = isDeadlineMode;
    if (isDeadlineMode) {
      bodyEl.classList.add('deadline-alert-active');
      document.getElementById('liveBroadcastBanner').style.background = 'var(--pink)';
    } else {
      bodyEl.classList.remove('deadline-alert-active');
      document.getElementById('liveBroadcastBanner').style.background = 'var(--yellow-light)';
    }

    // 2. Exam Preparation Mode
    const isExamPrep = status.exam_prep_mode || false;
    document.getElementById('switchExamPrepMode').checked = isExamPrep;
    const examPrepContainer = document.getElementById('examPrepCenter');
    if (isExamPrep) {
      examPrepContainer.style.display = 'block';
      loadExamVideos();
    } else {
      examPrepContainer.style.display = 'none';
    }

    // 3. Time Capsule Mode
    const isTimeCapsule = status.time_capsule_mode || false;
    document.getElementById('switchTimeCapsuleMode').checked = isTimeCapsule;
    targetCapsuleDate = status.time_capsule_unlock_date || '';
    
    // Sembunyikan/tampilkan tab capsule berdasarkan status aktif
    const capsuleTabBtns = document.querySelectorAll('[data-tab="capsule"]');
    capsuleTabBtns.forEach(btn => {
      btn.style.display = isTimeCapsule ? 'block' : 'none';
    });
    
    if (isTimeCapsule) {
      initTimeCapsuleView(status.time_capsule_forced_open || false);
    }

    // 4. Live Broadcast Text
    const bcastText = status.broadcast_text || 'Selamat datang di website resmi kelas 9B!';
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
    const targetDateObj = new Date(targetCapsuleDate);
    targetText.innerText = `Rencana dibuka pada: ${targetDateObj.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })} WIB`;
  } else {
    targetText.innerText = 'Rencana dibuka pada: Waktu belum ditentukan admin';
  }

  // Mulai hitung mundur jika tidak dipaksa buka
  if (forcedOpen) {
    lockedView.style.display = 'none';
    unlockedView.style.display = 'block';
    loadCapsuleMemories();
  } else {
    lockedView.style.display = 'block';
    unlockedView.style.display = 'none';
    
    if (targetCapsuleDate) {
      startCountdown(targetCapsuleDate, () => {
        // Callback saat hitung mundur habis
        lockedView.style.display = 'none';
        unlockedView.style.display = 'block';
        loadCapsuleMemories();
      });
    }
  }
}

function startCountdown(targetDateStr, onComplete) {
  const target = new Date(targetDateStr).getTime();
  
  const updateCountdown = () => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('cdDays').innerText = '00';
      document.getElementById('cdHours').innerText = '00';
      document.getElementById('cdMins').innerText = '00';
      document.getElementById('cdSecs').innerText = '00';
      onComplete();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cdDays').innerText = String(days).padStart(2, '0');
    document.getElementById('cdHours').innerText = String(hours).padStart(2, '0');
    document.getElementById('cdMins').innerText = String(mins).padStart(2, '0');
    document.getElementById('cdSecs').innerText = String(secs).padStart(2, '0');
  };

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function loadCapsuleMemories() {
  if (!capsuleRef) return;
  
  const grid = document.getElementById('capsuleMessagesGrid');
  grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center;">Memuat kenangan kelas 9B...</div>';

  capsuleRef.once('value', (snapshot) => {
    grid.innerHTML = '';
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach(key => {
        const item = data[key];
        const card = document.createElement('div');
        card.className = 'capsule-message-card';
        // Berikan rotasi asimetris acak untuk gaya brutalist
        const rotation = (Math.random() * 4 - 2).toFixed(1);
        card.style.setProperty('--rotation', `${rotation}deg`);

        card.innerHTML = `
          <div class="capsule-msg-sender">DARI: ${escapeHTML(item.sender)}</div>
          <div class="capsule-msg-body">"${escapeHTML(item.message)}"</div>
        `;
        grid.appendChild(card);
      });
    } else {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Belum ada pesan yang disumbangkan di kapsul waktu kelas.</div>';
    }
  });
}

function submitToCapsule(sender, message) {
  const cleanSender = sender.trim();
  const cleanMsg = message.trim();

  if (!cleanSender || !cleanMsg) {
    alert("Nama dan pesan wajib diisi!");
    return;
  }

  if (capsuleRef) {
    capsuleRef.push({
      sender: cleanSender,
      message: cleanMsg,
      timestamp: Date.now()
    }).then(() => {
      alert("🔒 Pesan lo berhasil dikunci ke dalam Kapsul Waktu! Ga ada yang bisa baca sampai waktunya dibuka.");
      document.getElementById('capsuleSenderName').value = '';
      document.getElementById('capsuleMessageInput').value = '';
    });
  } else {
    alert("Koneksi database terputus. Gagal menyimpan pesan.");
  }
}

/* ==========================================================================
   EXAM PREPARATION VIDEOS LOAD
   ========================================================================== */
function loadExamVideos() {
  if (!videosRef) return;
  const grid = document.getElementById('examVideoGrid');
  grid.innerHTML = '<div style="grid-column:1/-1; text-align:center;">Memuat materi video...</div>';

  videosRef.on('value', (snapshot) => {
    grid.innerHTML = '';
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach(key => {
        const video = data[key];
        const ytId = extractYoutubeId(video.url);
        if (!ytId) return;

        const card = document.createElement('div');
        card.className = 'video-card';
        
        // Tampilkan tombol delete jika login sebagai Head Admin
        const isHeadAdmin = localStorage.getItem('admin_level') === 'HEAD_ADMIN';
        const deleteBtn = isHeadAdmin 
          ? `<button class="task-action-btn btn-delete" style="width:100%; border:none; border-top:2px solid var(--border-color); font-size:0.75rem; padding:8px;" onclick="deleteExamVideo('${key}')">HAPUS VIDEO</button>`
          : '';

        card.innerHTML = `
          <div class="video-container">
            <iframe src="https://www.youtube.com/embed/${ytId}" allowfullscreen></iframe>
          </div>
          <div class="video-info">
            <div class="video-title">${escapeHTML(video.title)}</div>
          </div>
          ${deleteBtn}
        `;
        grid.appendChild(card);
      });
    } else {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Belum ada video materi belajar yang ditambahkan.</div>';
    }
  });
}

window.deleteExamVideo = function(videoId) {
  if (!confirm("Hapus video materi ini dari daftar belajar siswa?")) return;
  if (videosRef) {
    videosRef.child(videoId).remove();
    logAdminActivity("Menghapus video pembelajaran");
  }
};

function extractYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

/* ==========================================================================
   ADMIN LOGIN & SESSIONS LOGIC
   ========================================================================== */
function attemptAdminLogin(password) {
  const cleanPass = password.trim();
  let adminLevel = '';
  let adminName = '';

  if (cleanPass === ADMIN_PASSWORDS.HEAD_ADMIN) {
    adminLevel = 'HEAD_ADMIN';
    adminName = 'Rehan (Owner)';
  } else if (cleanPass === ADMIN_PASSWORDS.WALI_KELAS) {
    adminLevel = 'WALI_KELAS';
    adminName = 'Wali Kelas';
  } else if (cleanPass === ADMIN_PASSWORDS.SEKRETARIS) {
    adminLevel = 'SEKRETARIS';
    adminName = 'Sekretaris';
  } else if (cleanPass === ADMIN_PASSWORDS.TEMAN) {
    adminLevel = 'REGULAR_ADMIN';
    adminName = 'Admin Teman';
  } else {
    alert("❌ Password Salah, Bro!");
    return;
  }

  // Set Local Storage
  localStorage.setItem('admin_logged', 'true');
  localStorage.setItem('admin_level', adminLevel);
  localStorage.setItem('admin_name', adminName);

  // Buat sesi di database Firebase
  createAdminSession(adminLevel, adminName);
}

function createAdminSession(level, name) {
  if (sessionsRef) {
    const newSession = sessionsRef.push();
    mySessionKey = newSession.key;
    localStorage.setItem('admin_session_key', mySessionKey);

    newSession.set({
      name: name,
      level: level,
      timestamp: Date.now()
    }).then(() => {
      // Catat log aktivitas login
      logAdminActivity("Berhasil login ke panel admin");
      applyAdminUI(level, name);
      loginAdminModal.style.display = 'none';
      document.getElementById('adminPasswordInput').value = '';
    });
    
    // Dengarkan jika Head Admin memutuskan sesi kita secara paksa (force logout)
    sessionsRef.child(mySessionKey).on('value', (snapshot) => {
      if (!snapshot.exists()) {
        // Jika node dihapus dari database, paksa logout lokal!
        handleLogout(true);
      }
    });
  } else {
    // offline fallback
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
    
    // Dengarkan kembali status sesi di database
    if (sessionsRef && mySessionKey) {
      sessionsRef.child(mySessionKey).on('value', (snapshot) => {
        if (!snapshot.exists()) {
          handleLogout(true);
        }
      });
    }
  }
}

function applyAdminUI(level, name) {
  // Update tombol navbar
  adminLoginBtn.innerHTML = `<i class="fa-solid fa-user-gear"></i> ${name.toUpperCase()}`;
  adminLoginBtn.classList.add('logged-in');

  // Tampilkan panel kontrol
  const dashboard = document.getElementById('adminDashboardPanel');
  dashboard.style.display = 'block';

  const labelLevel = document.getElementById('adminPanelLevel');
  labelLevel.innerText = level;
  if (level === 'HEAD_ADMIN') {
    labelLevel.style.background = 'var(--purple)';
    labelLevel.style.color = '#000';
  } else {
    labelLevel.style.background = 'var(--pink)';
    labelLevel.style.color = '#000';
  }

  // Tampilkan tombol penambah tugas
  document.getElementById('openAddTaskModalBtn').style.display = 'inline-flex';

  // Hak Akses Khusus Head Admin (Rehan)
  if (level === 'HEAD_ADMIN') {
    document.getElementById('ctrlExamPrep').style.display = 'flex';
    document.getElementById('ctrlTimeCapsule').style.display = 'flex';
    document.getElementById('headAdminManagementBox').style.display = 'block';
    document.getElementById('clearChatBtn').style.display = 'block';
    
    // Load log aktivitas & manajemen sesi admin
    setupHeadAdminDashboard();
  } else {
    // Sembunyikan hak akses eksklusif Head Admin
    document.getElementById('ctrlExamPrep').style.display = 'none';
    document.getElementById('ctrlTimeCapsule').style.display = 'none';
    document.getElementById('headAdminManagementBox').style.display = 'none';
    document.getElementById('clearChatBtn').style.display = 'none';
  }

  // Render ulang list tugas agar tombol-tombol pindah status admin muncul
  renderTasksList();
}

function handleLogout(forced = false) {
  if (sessionsRef && mySessionKey) {
    sessionsRef.child(mySessionKey).off('value'); // matikan listener
    if (!forced) {
      // Jika logout manual, hapus sesi di database
      sessionsRef.child(mySessionKey).remove();
      logAdminActivity("Berhasil logout dari panel admin");
    }
  }

  // Bersihkan data lokal
  localStorage.removeItem('admin_logged');
  localStorage.removeItem('admin_level');
  localStorage.removeItem('admin_name');
  localStorage.removeItem('admin_session_key');
  mySessionKey = '';

  // Reset UI
  adminLoginBtn.innerHTML = `<i class="fa-solid fa-lock"></i> ADMIN LOGIN`;
  adminLoginBtn.classList.remove('logged-in');
  document.getElementById('adminDashboardPanel').style.display = 'none';
  document.getElementById('openAddTaskModalBtn').style.display = 'none';
  document.getElementById('clearChatBtn').style.display = 'none';

  renderTasksList();

  if (forced) {
    alert("⚠️ Sesi Admin lo telah diputus secara paksa oleh Head Admin!");
    switchTab('lobby');
  }
}

// Catat histori aktivitas admin reguler ke database Firebase
export function logAdminActivity(actionText) {
  if (!logsRef) return;
  const adminName = localStorage.getItem('admin_name') || 'Admin';
  logsRef.push({
    admin: adminName,
    action: actionText,
    timestamp: Date.now()
  });
}

/* ==========================================================================
   HEAD ADMIN EXCLUSIVE FUNCTIONS
   ========================================================================== */
function setupHeadAdminDashboard() {
  if (!database) return;

  // 1. Listen Histori Log Aktivitas Admin (Batas 30 log terakhir)
  logsRef.limitToLast(30).on('value', (snapshot) => {
    const logBox = document.getElementById('activityLogBox');
    logBox.innerHTML = '';
    const data = snapshot.val();
    if (data) {
      // Urutkan terbalik agar log terbaru ada di atas
      const keys = Object.keys(data).reverse();
      keys.forEach(key => {
        const log = data[key];
        const time = new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        
        let isCritical = log.action.includes('HAPUS') || log.action.includes('darurat') || log.action.includes('kapsul');
        if (isCritical) entry.classList.add('important');

        entry.innerHTML = `[${time}] <strong>${log.admin}</strong>: ${log.action}`;
        logBox.appendChild(entry);
      });
    } else {
      logBox.innerHTML = '<div class="log-entry">Belum ada catatan aktivitas admin.</div>';
    }
  });

  // 2. Listen Sesi Admin Reguler yang Sedang Aktif
  sessionsRef.on('value', (snapshot) => {
    const list = document.getElementById('activeAdminsList');
    list.innerHTML = '';
    const data = snapshot.val();
    let countActive = 0;

    if (data) {
      Object.keys(data).forEach(key => {
        const session = data[key];
        // Jangan tampilkan sesi Head Admin sendiri untuk diterminasi
        if (key === mySessionKey) return;

        countActive++;
        const item = document.createElement('div');
        item.className = 'admin-session-item';
        item.innerHTML = `
          <span>👤 ${session.name} (${session.level})</span>
          <button class="task-action-btn btn-delete" style="padding:4px 8px; font-size:0.7rem; font-weight:700;" onclick="terminateAdminSession('${key}', '${session.name}')">TERMINASI</button>
        `;
        list.appendChild(item);
      });
    }

    if (countActive === 0) {
      list.innerHTML = '<div class="admin-session-item">Tidak ada admin reguler yang sedang online.</div>';
    }
  });
}

// Terminasi Sesi Admin Reguler (Hanya Head Admin)
window.terminateAdminSession = function(sessionKey, name) {
  if (!confirm(`Apakah lo yakin mau mengeluarkan paksa admin "${name}" dari sesi aktif mereka?`)) return;
  if (sessionsRef) {
    sessionsRef.child(sessionKey).remove(); // hapus sesi di Firebase
    logAdminActivity(`Memutus sesi admin reguler: "${name}"`);
  }
};

/* ==========================================================================
   UI EVENT LISTENERS & WIDGET CONTROL
   ========================================================================== */
function setupUIEventListeners() {
  // Mobile menu toggle
  mobileMenuBtn.onclick = () => {
    const isVisible = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isVisible ? 'none' : 'flex';
  };

  // Navigasi logo klik kembali ke home
  document.getElementById('navLogoHome').onclick = (e) => {
    e.preventDefault();
    switchTab('lobby');
  };

  // Event handler tombol login di navbar
  adminLoginBtn.onclick = () => {
    const isLogged = localStorage.getItem('admin_logged') === 'true';
    if (isLogged) {
      // Jika sudah login, klik tombol navbar akan membawa ke tab admin dashboard (scroll ke bawah)
      document.getElementById('adminDashboardPanel').scrollIntoView({ behavior: 'smooth' });
    } else {
      loginAdminModal.style.display = 'flex';
    }
  };

  // Close Login Modal
  document.getElementById('closeLoginModalBtn').onclick = () => {
    loginAdminModal.style.display = 'none';
  };
  
  // Submit Login
  document.getElementById('submitLoginBtn').onclick = () => {
    const val = document.getElementById('adminPasswordInput').value;
    attemptAdminLogin(val);
  };
  
  // Submit Login via Enter key
  document.getElementById('adminPasswordInput').onkeydown = (e) => {
    if (e.key === 'Enter') {
      attemptAdminLogin(e.target.value);
    }
  };

  // Logout Admin
  document.getElementById('adminLogoutBtn').onclick = () => {
    if (confirm("Keluar dari panel admin?")) {
      handleLogout();
    }
  };

  // Event handler modal tambah tugas
  document.getElementById('openAddTaskModalBtn').onclick = () => {
    addTaskModal.style.display = 'flex';
  };

  document.getElementById('closeAddTaskModalBtn').onclick = () => {
    addTaskModal.style.display = 'none';
  };

  document.getElementById('submitAddTaskBtn').onclick = () => {
    const subject = document.getElementById('taskSubjectInput').value;
    const desc = document.getElementById('taskDescInput').value;
    const deadline = document.getElementById('taskDeadlineInput').value;
    const priority = document.getElementById('taskPrioritySelect').value;

    if (!subject.trim() || !desc.trim()) {
      alert("Mata Pelajaran dan Detail Tugas wajib diisi!");
      return;
    }

    addNewTask(subject, desc, deadline, priority);
    addTaskModal.style.display = 'none';

    // Reset input
    document.getElementById('taskSubjectInput').value = '';
    document.getElementById('taskDescInput').value = '';
    document.getElementById('taskDeadlineInput').value = '';
  };

  // Kapsul Waktu submit message
  document.getElementById('submitToCapsuleBtn').onclick = () => {
    const sender = document.getElementById('capsuleSenderName').value;
    const message = document.getElementById('capsuleMessageInput').value;
    submitToCapsule(sender, message);
  };

  // EDIT USERNAME & AVATAR CHAT
  document.getElementById('editUsernameBtn').onclick = () => {
    localStorage.removeItem('chat_username');
    initChat((username, avatar) => {
      document.getElementById('myChatName').innerText = username;
      document.getElementById('myChatAvatar').innerText = avatar;
    });
  };

  // TOMBOL SEND CHAT
  document.getElementById('sendChatBtn').onclick = () => {
    const input = document.getElementById('chatInputField');
    sendMessage(input.value);
    input.value = '';
  };

  document.getElementById('chatInputField').onkeydown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e.target.value);
      e.target.value = '';
    }
  };

  // CLEAR CHAT HISTORY (Head Admin Only)
  document.getElementById('clearChatBtn').onclick = () => {
    clearChatHistory();
  };

  /* ==========================================================================
     ADMIN PANEL SWITCH CONTROLS (FIREBASE EVENT WRITE)
     ========================================================================== */
  
  // 1. Switch Deadline Mode (Admin & Head Admin)
  document.getElementById('switchDeadlineMode').onchange = (e) => {
    if (statusRef) {
      statusRef.update({ deadline_mode: e.target.checked });
      logAdminActivity(`Mengubah Deadline Alert Mode ke: [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
    }
  };

  // 2. Switch Exam Prep Mode (Head Admin Only)
  document.getElementById('switchExamPrepMode').onchange = (e) => {
    if (statusRef) {
      statusRef.update({ exam_prep_mode: e.target.checked });
      logAdminActivity(`Mengubah Exam Prep Mode ke: [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
      
      // Jika diaktifkan, tawarkan untuk memuat video baru
      if (e.target.checked && confirm("Exam Prep Mode aktif. Mau nambahin video materi baru sekarang?")) {
        addVideoModal.style.display = 'flex';
      }
    }
  };

  // 3. Switch Time Capsule (Head Admin Only)
  document.getElementById('switchTimeCapsuleMode').onchange = (e) => {
    if (statusRef) {
      statusRef.update({ time_capsule_mode: e.target.checked });
      logAdminActivity(`Mengubah visibilitas Time Capsule Mode ke: [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
      
      // Jika diaktifkan, tawarkan untuk set waktu pembukaan
      if (e.target.checked) {
        setCapsuleDateModal.style.display = 'flex';
      }
    }
  };

  // 4. Set Waktu Kapsul Submit
  document.getElementById('submitCapsuleDateBtn').onclick = () => {
    const inputVal = document.getElementById('capsuleTargetDateInput').value;
    if (!inputVal) {
      alert("Harap pilih tanggal & waktu pembukaan!");
      return;
    }
    
    if (statusRef) {
      statusRef.update({
        time_capsule_unlock_date: inputVal,
        time_capsule_forced_open: false // reset bypass status
      }).then(() => {
        setCapsuleDateModal.style.display = 'none';
        logAdminActivity(`Mengatur waktu pembukaan Kapsul Waktu pada: ${inputVal}`);
        alert("Waktu pembukaan kapsul waktu sukses di-set!");
      });
    }
  };

  document.getElementById('closeCapsuleDateModalBtn').onclick = () => {
    setCapsuleDateModal.style.display = 'none';
  };

  // 5. Add Video Ujian Submit
  document.getElementById('submitAddVideoBtn').onclick = () => {
    const title = document.getElementById('videoTitleInput').value.trim();
    const url = document.getElementById('videoUrlInput').value.trim();

    if (!title || !url) {
      alert("Judul dan Link URL wajib diisi!");
      return;
    }

    if (videosRef) {
      videosRef.push({ title, url }).then(() => {
        addVideoModal.style.display = 'none';
        document.getElementById('videoTitleInput').value = '';
        document.getElementById('videoUrlInput').value = '';
        logAdminActivity(`Menambahkan video materi: "${title}"`);
        alert("Video berhasil ditambahkan!");
      });
    }
  };

  document.getElementById('closeVideoModalBtn').onclick = () => {
    addVideoModal.style.display = 'none';
  };

  // 6. Save Live Broadcast Text (Head Admin & Wali Kelas)
  document.getElementById('saveBroadcastBtn').onclick = () => {
    const text = document.getElementById('broadcastTextEditor').value.trim();
    if (!text) {
      alert("Teks pengumuman tidak boleh kosong!");
      return;
    }
    if (statusRef) {
      statusRef.update({ broadcast_text: text }).then(() => {
        logAdminActivity(`Mengubah pengumuman Live Broadcast menjadi: "${text}"`);
        alert("Live Broadcast diperbarui!");
      });
    }
  };
}

/* ==========================================================================
   BGM LO-FI PLAYER WIDGET
   ========================================================================== */
function initBgmPlayer() {
  if (!bgmPlayBtn || !bgmAudio) return;

  bgmPlayBtn.onclick = () => {
    if (bgmAudio.paused) {
      // Mainkan Audio
      bgmAudio.play().then(() => {
        bgmPlayBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        bgmPlayBtn.style.background = 'var(--mint)';
      }).catch(err => {
        console.error("Gagal memutar audio: ", err);
        alert("Gagal memutar musik lo-fi, harap cek koneksi internet lo.");
      });
    } else {
      // Pause Audio
      bgmAudio.pause();
      bgmPlayBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
      bgmPlayBtn.style.background = 'var(--purple)';
    }
  };
}
