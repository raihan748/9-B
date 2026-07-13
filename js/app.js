// Jantung Utama Logika Aplikasi terintegrasi dengan Gun.js (Non-Module Global Scope)

// State Management
let appDatabase = null;
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
  if (typeof Gun !== 'undefined') {
    // Inisialisasi Gun.js
    appDatabase = Gun(window.gunPeers);
    statusRef = appDatabase.get('9b_class_status_v1');
    sessionsRef = appDatabase.get('9b_class_admin_sessions_v1');
    logsRef = appDatabase.get('9b_class_activity_logs_v1');
    capsuleRef = appDatabase.get('9b_class_time_capsule_v1');
    videosRef = appDatabase.get('9b_class_exam_videos_v1');

    setupGlobalStatusListener();
  }

  // Inisiasi Tab UI Router
  initTabRouter();

  // Load Modul Chat & Tasks (Melalui object window global)
  if (window.initChat) {
    window.initChat((username, avatar) => {
      document.getElementById('myChatName').innerText = username;
      document.getElementById('myChatAvatar').innerText = avatar;
    });
  }

  if (window.initTasks) {
    window.initTasks();
  }

  // Event Listeners untuk UI & Tombol
  setupUIEventListeners();
  
  // Kembalikan sesi admin jika sebelumnya sudah login
  restoreAdminSession();
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
  tabButtons.forEach(b => {
    if (b.dataset.tab === tabId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  tabContents.forEach(content => {
    if (content.id === `${tabId}Tab`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  mobileMenu.style.display = 'none';

  if (tabId === 'chat') {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 50);
    }
  } else if (tabId === 'tasks') {
    if (window.renderTasksList) {
      window.renderTasksList();
    }
  }
}

/* ==========================================================================
   GLOBAL REALTIME STATUS LISTENER (GUN.JS SYNC)
   ========================================================================== */
function setupGlobalStatusListener() {
  if (!statusRef) return;

  statusRef.on((status) => {
    if (!status) return;

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
    
    // Tab capsule selalu aktif untuk pengisian pesan rahasia
    if (isTimeCapsule) {
      initTimeCapsuleView(status.time_capsule_forced_open || false);
    } else {
      const lockedView = document.getElementById('capsuleLockedView');
      const unlockedView = document.getElementById('capsuleUnlockedView');
      if (lockedView) lockedView.style.display = 'block';
      if (unlockedView) unlockedView.style.display = 'none';
    }

    // 4. Live Broadcast Text
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
    const targetDateObj = new Date(targetCapsuleDate);
    targetText.innerText = `Rencana dibuka pada: ${targetDateObj.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })} WIB`;
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
  grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center;">Memuat kenangan Kelas 9B...</div>';

  const memoriesList = [];
  capsuleRef.map().once((item, key) => {
    if (!item) return;
    
    // Cek apakah item sudah ada di array untuk menghindari duplikasi
    const index = memoriesList.findIndex(m => m.id === key);
    if (index > -1) {
      memoriesList[index] = { id: key, ...item };
    } else {
      memoriesList.push({ id: key, ...item });
    }
    
    renderMemoriesGrid(memoriesList);
  });

  // Handle jika database kosong
  setTimeout(() => {
    if (grid.innerHTML.includes('Memuat kenangan')) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Belum ada pesan yang disumbangkan di dalam kapsul waktu.</div>';
    }
  }, 2000);
}

function renderMemoriesGrid(list) {
  const grid = document.getElementById('capsuleMessagesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'capsule-message-card';
    const rotation = (Math.random() * 4 - 2).toFixed(1);
    card.style.setProperty('--rotation', `${rotation}deg`);

    card.innerHTML = `
      <div class="capsule-msg-sender">DARI: ${escapeHTML(item.sender)}</div>
      <div class="capsule-msg-body">"${escapeHTML(item.message)}"</div>
    `;
    grid.appendChild(card);
  });
}

function submitToCapsule(sender, message) {
  const cleanSender = sender.trim();
  const cleanMsg = message.trim();

  if (!cleanSender || !cleanMsg) {
    alert("Nama dan isi pesan wajib diisi!");
    return;
  }

  if (capsuleRef) {
    capsuleRef.set({
      sender: cleanSender,
      message: cleanMsg,
      timestamp: Date.now()
    });
    alert("🔒 Pesan Anda berhasil dikunci ke dalam Kapsul Waktu. Pesan tidak akan dapat dibaca oleh siapa pun sampai waktu pembukaan tiba.");
    document.getElementById('capsuleSenderName').value = '';
    document.getElementById('capsuleMessageInput').value = '';
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

  const videoList = [];
  
  videosRef.map().on((video, key) => {
    if (!video) {
      // Hapus video dari list jika di-put null
      const idx = videoList.findIndex(v => v.id === key);
      if (idx > -1) videoList.splice(idx, 1);
    } else {
      const idx = videoList.findIndex(v => v.id === key);
      if (idx > -1) {
        videoList[idx] = { id: key, ...video };
      } else {
        videoList.push({ id: key, ...video });
      }
    }
    
    renderVideosGrid(videoList);
  });

  // Handle jika kosong
  setTimeout(() => {
    if (grid.innerHTML.includes('Memuat materi')) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Belum ada materi pembelajaran video yang ditambahkan.</div>';
    }
  }, 2000);
}

function renderVideosGrid(list) {
  const grid = document.getElementById('examVideoGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Belum ada materi pembelajaran video yang ditambahkan.</div>';
    return;
  }

  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    const isHeadAdmin = localStorage.getItem('admin_level') === 'HEAD_ADMIN';
    const deleteBtn = isHeadAdmin 
      ? `<button class="task-action-btn btn-delete" style="width:100%; border:none; border-top:2px solid var(--border-color); font-size:0.75rem; padding:8px;" onclick="deleteExamVideo('${video.id}')">HAPUS VIDEO</button>`
      : '';

    // Cek apakah ini video upload (direct URL) atau YouTube
    const isYt = !video.type || video.type === 'youtube';

    if (isYt) {
      const ytId = extractYoutubeId(video.url);
      if (ytId) {
        card.innerHTML = `
          <div class="video-container">
            <iframe src="https://www.youtube.com/embed/${ytId}" allowfullscreen></iframe>
          </div>
          <div class="video-info" style="padding: 10px; display: flex; flex-direction: column; gap: 8px;">
            <div class="video-title" style="font-weight:700; font-size:0.9rem;">${escapeHTML(video.title)}</div>
            <a href="${video.url}" target="_blank" class="brut-btn btn-yellow" style="box-shadow: 2px 2px 0px #000; padding: 6px 12px; font-size: 0.75rem; text-decoration: none; width: 100%; text-align: center;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> TONTON DI YOUTUBE
            </a>
          </div>
          ${deleteBtn}
        `;
      }
    } else {
      // Direct MP4 file (misalnya diunggah ke Pixeldrain)
      card.innerHTML = `
        <div class="video-container">
          <video src="${video.url}" controls style="width:100%; height:100%; object-fit:contain; background:#000;"></video>
        </div>
        <div class="video-info" style="padding: 10px; display: flex; flex-direction: column; gap: 8px;">
          <div class="video-title" style="font-weight:700; font-size:0.9rem;">${escapeHTML(video.title)}</div>
          <a href="${video.url}" download="${video.title}.mp4" target="_blank" class="brut-btn btn-cyan" style="box-shadow: 2px 2px 0px #000; padding: 6px 12px; font-size: 0.75rem; text-decoration: none; width: 100%; text-align: center;">
            <i class="fa-solid fa-download"></i> UNDUH VIDEO (BELAJAR OFFLINE)
          </a>
        </div>
        ${deleteBtn}
      `;
    }
    grid.appendChild(card);
  });
}

window.deleteExamVideo = function(videoId) {
  if (!confirm("Hapus video materi ini dari daftar belajar siswa?")) return;
  if (videosRef) {
    videosRef.get(videoId).put(null);
    if (window.logAdminActivity) {
      window.logAdminActivity("Menghapus video pembelajaran");
    }
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

  if (cleanPass === window.ADMIN_PASSWORDS.HEAD_ADMIN) {
    adminLevel = 'HEAD_ADMIN';
    adminName = 'Rehan (Owner)';
  } else if (cleanPass === window.ADMIN_PASSWORDS.WALI_KELAS) {
    adminLevel = 'WALI_KELAS';
    adminName = 'Wali Kelas';
  } else if (cleanPass === window.ADMIN_PASSWORDS.SEKRETARIS) {
    adminLevel = 'SEKRETARIS';
    adminName = 'Sekretaris';
  } else if (cleanPass === window.ADMIN_PASSWORDS.TEMAN) {
    adminLevel = 'REGULAR_ADMIN';
    adminName = 'Admin Teman';
  } else {
    alert("❌ Kata sandi yang Anda masukkan salah.");
    return;
  }

  localStorage.setItem('admin_logged', 'true');
  localStorage.setItem('admin_level', adminLevel);
  localStorage.setItem('admin_name', adminName);

  createAdminSession(adminLevel, adminName);
}

function createAdminSession(level, name) {
  if (sessionsRef) {
    const sessionKey = 'session_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    mySessionKey = sessionKey;
    localStorage.setItem('admin_session_key', mySessionKey);

    sessionsRef.get(sessionKey).put({
      name: name,
      level: level,
      timestamp: Date.now()
    }, (err) => {
      if (err) {
        console.warn("Gagal sinkronisasi sesi ke database, menggunakan penyimpanan lokal.");
      }
      if (window.logAdminActivity) {
        window.logAdminActivity("Berhasil masuk ke panel administrator");
      }
      applyAdminUI(level, name);
      loginAdminModal.style.display = 'none';
      document.getElementById('adminPasswordInput').value = '';
    });
    
    // Dengarkan jika sesi diputus paksa
    sessionsRef.get(mySessionKey).on((session) => {
      if (session === null) {
        handleLogout(true);
      }
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
      sessionsRef.get(mySessionKey).on((session) => {
        if (session === null) {
          handleLogout(true);
        }
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
  if (level === 'HEAD_ADMIN') {
    labelLevel.style.background = 'var(--purple)';
    labelLevel.style.color = '#000';
  } else {
    labelLevel.style.background = 'var(--pink)';
    labelLevel.style.color = '#000';
  }

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

  if (window.renderTasksList) {
    window.renderTasksList();
  }
}

function handleLogout(forced = false) {
  if (sessionsRef && mySessionKey) {
    sessionsRef.get(mySessionKey).off();
    if (!forced) {
      sessionsRef.get(mySessionKey).put(null);
      if (window.logAdminActivity) {
        window.logAdminActivity("Berhasil keluar dari panel administrator");
      }
    }
  }

  localStorage.removeItem('admin_logged');
  localStorage.removeItem('admin_level');
  localStorage.removeItem('admin_name');
  localStorage.removeItem('admin_session_key');
  mySessionKey = '';

  adminLoginBtn.innerHTML = `<i class="fa-solid fa-lock"></i> LOGIN ADMIN`;
  adminLoginBtn.classList.remove('logged-in');
  document.getElementById('adminDashboardPanel').style.display = 'none';
  document.getElementById('openAddTaskModalBtn').style.display = 'none';
  document.getElementById('clearChatBtn').style.display = 'none';

  if (window.renderTasksList) {
    window.renderTasksList();
  }

  if (forced) {
    alert("⚠️ Sesi akses administrator Anda telah diputus secara paksa oleh Administrator Utama.");
    switchTab('lobby');
  }
}

window.logAdminActivity = function(actionText) {
  if (!logsRef) {
    console.log(`[Activity Log - Offline]: ${actionText}`);
    return;
  }
  const adminName = localStorage.getItem('admin_name') || 'Admin';
  logsRef.set({
    admin: adminName,
    action: actionText,
    timestamp: Date.now()
  });
};

/* ==========================================================================
   HEAD ADMIN EXCLUSIVE FUNCTIONS
   ========================================================================== */
function setupHeadAdminDashboard() {
  if (!appDatabase) return;

  // 1. Aktivitas Logs Listener
  const logsList = [];
  logsRef.map().on((log, key) => {
    if (!log) {
      const idx = logsList.findIndex(l => l.id === key);
      if (idx > -1) logsList.splice(idx, 1);
    } else {
      const idx = logsList.findIndex(l => l.id === key);
      if (idx > -1) {
        logsList[idx] = { id: key, ...log };
      } else {
        logsList.push({ id: key, ...log });
      }
    }

    // Urutkan berdasarkan waktu terbaru
    const sortedLogs = [...logsList].sort((a, b) => b.timestamp - a.timestamp).slice(0, 30);
    const logBox = document.getElementById('activityLogBox');
    logBox.innerHTML = '';
    
    sortedLogs.forEach(item => {
      const time = new Date(item.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      
      let isCritical = item.action.includes('HAPUS') || item.action.includes('darurat') || item.action.includes('kapsul');
      if (isCritical) entry.classList.add('important');

      entry.innerHTML = `[${time}] <strong>${item.admin}</strong>: ${item.action}`;
      logBox.appendChild(entry);
    });

    if (sortedLogs.length === 0) {
      logBox.innerHTML = '<div class="log-entry">Belum ada catatan aktivitas admin.</div>';
    }
  });

  // 2. Active Sessions Listener
  const activeAdmins = [];
  sessionsRef.map().on((session, key) => {
    if (!session) {
      const idx = activeAdmins.findIndex(a => a.id === key);
      if (idx > -1) activeAdmins.splice(idx, 1);
    } else {
      const idx = activeAdmins.findIndex(a => a.id === key);
      if (idx > -1) {
        activeAdmins[idx] = { id: key, ...session };
      } else {
        activeAdmins.push({ id: key, ...session });
      }
    }

    const list = document.getElementById('activeAdminsList');
    list.innerHTML = '';
    let countActive = 0;

    activeAdmins.forEach(item => {
      if (item.id === mySessionKey) return; // jangan terminasi diri sendiri

      countActive++;
      const div = document.createElement('div');
      div.className = 'admin-session-item';
      div.innerHTML = `
        <span>👤 ${item.name} (${item.level})</span>
        <button class="task-action-btn btn-delete" style="padding:4px 8px; font-size:0.7rem; font-weight:700;" onclick="terminateAdminSession('${item.id}', '${item.name}')">TERMINASI</button>
      `;
      list.appendChild(div);
    });

    if (countActive === 0) {
      list.innerHTML = '<div class="admin-session-item">Tidak ada admin reguler yang sedang online.</div>';
    }
  });
}

window.terminateAdminSession = function(sessionKey, name) {
  if (!confirm(`Apakah Anda yakin ingin memutuskan sesi akses administrator "${name}" secara paksa?`)) return;
  if (sessionsRef) {
    sessionsRef.get(sessionKey).put(null);
    window.logAdminActivity(`Memutus sesi administrator reguler: "${name}"`);
  }
};

/* ==========================================================================
   UI EVENT LISTENERS & WIDGET CONTROL
   ========================================================================== */
function setupUIEventListeners() {
  mobileMenuBtn.onclick = () => {
    const isVisible = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isVisible ? 'none' : 'flex';
  };

  document.getElementById('navLogoHome').onclick = (e) => {
    e.preventDefault();
    switchTab('lobby');
  };

  adminLoginBtn.onclick = () => {
    const isLogged = localStorage.getItem('admin_logged') === 'true';
    if (isLogged) {
      document.getElementById('adminDashboardPanel').scrollIntoView({ behavior: 'smooth' });
    } else {
      loginAdminModal.style.display = 'flex';
    }
  };

  document.getElementById('closeLoginModalBtn').onclick = () => {
    loginAdminModal.style.display = 'none';
  };
  
  document.getElementById('submitLoginBtn').onclick = () => {
    const val = document.getElementById('adminPasswordInput').value;
    attemptAdminLogin(val);
  };
  
  document.getElementById('adminPasswordInput').onkeydown = (e) => {
    if (e.key === 'Enter') {
      attemptAdminLogin(e.target.value);
    }
  };

  document.getElementById('adminLogoutBtn').onclick = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel administrator?")) {
      handleLogout();
    }
  };

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
      alert("Kolom Mata Pelajaran dan Keterangan Tugas wajib diisi!");
      return;
    }

    if (window.addNewTask) {
      window.addNewTask(subject, desc, deadline, priority);
    }
    addTaskModal.style.display = 'none';

    document.getElementById('taskSubjectInput').value = '';
    document.getElementById('taskDescInput').value = '';
    document.getElementById('taskDeadlineInput').value = '';
  };

  document.getElementById('submitToCapsuleBtn').onclick = () => {
    const sender = document.getElementById('capsuleSenderName').value;
    const message = document.getElementById('capsuleMessageInput').value;
    submitToCapsule(sender, message);
  };

  document.getElementById('editUsernameBtn').onclick = () => {
    localStorage.removeItem('chat_username');
    localStorage.removeItem('chat_avatar');
    if (window.initChat) {
      window.initChat((username, avatar) => {
        document.getElementById('myChatName').innerText = username;
        document.getElementById('myChatAvatar').innerText = avatar;
      });
    }
  };

  document.getElementById('sendChatBtn').onclick = () => {
    const input = document.getElementById('chatInputField');
    if (window.sendMessage) {
      window.sendMessage(input.value);
    }
    input.value = '';
  };

  document.getElementById('chatInputField').onkeydown = (e) => {
    if (e.key === 'Enter') {
      if (window.sendMessage) {
        window.sendMessage(e.target.value);
      }
      e.target.value = '';
    }
  };

  document.getElementById('clearChatBtn').onclick = () => {
    if (window.clearChatHistory) {
      window.clearChatHistory();
    }
  };

  // 1. Switch Deadline Mode
  document.getElementById('switchDeadlineMode').onchange = (e) => {
    if (statusRef) {
      statusRef.put({ deadline_mode: e.target.checked });
      window.logAdminActivity(`Mengubah status Deadline Alert Mode menjadi: [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
    }
  };

  // 2. Switch Exam Prep Mode
  document.getElementById('switchExamPrepMode').onchange = (e) => {
    if (statusRef) {
      statusRef.put({ exam_prep_mode: e.target.checked });
      window.logAdminActivity(`Mengubah status Exam Prep Mode menjadi: [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
      
      if (e.target.checked && confirm("Exam Prep Mode telah diaktifkan. Ingin menambahkan materi video pembelajaran baru sekarang?")) {
        addVideoModal.style.display = 'flex';
      }
    }
  };

  // 3. Switch Time Capsule Mode
  document.getElementById('switchTimeCapsuleMode').onchange = (e) => {
    if (statusRef) {
      statusRef.put({ time_capsule_mode: e.target.checked });
      window.logAdminActivity(`Mengubah status Kapsul Waktu menjadi: [${e.target.checked ? 'AKTIF' : 'NONAKTIF'}]`);
      
      if (e.target.checked) {
        setCapsuleDateModal.style.display = 'flex';
      }
    }
  };

  // 4. Set Waktu Kapsul Submit
  document.getElementById('submitCapsuleDateBtn').onclick = () => {
    const inputVal = document.getElementById('capsuleTargetDateInput').value;
    if (!inputVal) {
      alert("Harap tentukan tanggal dan waktu pembukaan!");
      return;
    }
    
    if (statusRef) {
      statusRef.put({
        time_capsule_unlock_date: inputVal,
        time_capsule_forced_open: false
      });
      setCapsuleDateModal.style.display = 'none';
      window.logAdminActivity(`Mengatur waktu pembukaan Kapsul Waktu pada tanggal: ${inputVal}`);
      alert("Pengaturan waktu pembukaan Kapsul Waktu berhasil disimpan!");
    }
  };

  document.getElementById('closeCapsuleDateModalBtn').onclick = () => {
    setCapsuleDateModal.style.display = 'none';
  };

  // 5. Opsi Sumber Video Toggle
  const srcYtRadio = document.getElementById('srcYtRadio');
  const srcUploadRadio = document.getElementById('srcUploadRadio');
  const ytInputBox = document.getElementById('ytInputBox');
  const localVideoInputBox = document.getElementById('localVideoInputBox');

  if (srcYtRadio && srcUploadRadio) {
    srcYtRadio.onchange = () => {
      ytInputBox.style.display = 'block';
      localVideoInputBox.style.display = 'none';
    };
    srcUploadRadio.onchange = () => {
      ytInputBox.style.display = 'none';
      localVideoInputBox.style.display = 'block';
    };
  }

  // Add Video Ujian Submit
  document.getElementById('submitAddVideoBtn').onclick = () => {
    const title = document.getElementById('videoTitleInput').value.trim();
    if (!title) {
      alert("Harap masukkan judul video terlebih dahulu.");
      return;
    }

    const sourceVal = document.querySelector('input[name="videoSource"]:checked').value;

    if (sourceVal === 'youtube') {
      const url = document.getElementById('videoUrlInput').value.trim();
      if (!url) {
        alert("Alamat tautan video YouTube wajib diisi!");
        return;
      }
      if (videosRef) {
        videosRef.set({ 
          title: title, 
          url: url,
          type: 'youtube',
          timestamp: Date.now()
        });
        addVideoModal.style.display = 'none';
        resetVideoForm();
        alert("Video pembelajaran berhasil ditambahkan!");
      }
    } else {
      // Unggah berkas lokal ke Pixeldrain
      const fileInput = document.getElementById('videoFileInput');
      if (fileInput.files.length === 0) {
        alert("Harap pilih file video dari komputer Anda!");
        return;
      }
      const file = fileInput.files[0];
      uploadVideoToPixeldrain(file, title);
    }
  };

  document.getElementById('closeVideoModalBtn').onclick = () => {
    addVideoModal.style.display = 'none';
    resetVideoForm();
  };

  // 6. Save Live Broadcast Text
  document.getElementById('saveBroadcastBtn').onclick = () => {
    const text = document.getElementById('broadcastTextEditor').value.trim();
    if (!text) {
      alert("Teks pengumuman siaran tidak boleh kosong!");
      return;
    }
    if (statusRef) {
      statusRef.put({ broadcast_text: text });
      window.logAdminActivity(`Mengubah teks Siaran Langsung menjadi: "${text}"`);
      alert("Siaran Langsung berhasil diperbarui!");
    }
  };
}

// Helpers
function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Fungsi AJAX untuk mengunggah video ke Pixeldrain
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
      const percent = Math.round((e.loaded / e.total) * 100);
      progressBar.style.width = percent + '%';
      percentText.innerText = percent + '%';
    }
  };

  xhr.onload = () => {
    if (xhr.status === 201 || xhr.status === 200) {
      try {
        const res = JSON.parse(xhr.responseText);
        if (res.success && res.id) {
          // Tautan file stream Pixeldrain publik
          const fileUrl = `https://pixeldrain.com/api/file/${res.id}`;
          
          if (videosRef) {
            videosRef.set({
              title: title,
              url: fileUrl,
              type: 'upload',
              fileId: res.id,
              timestamp: Date.now()
            });
          }
          
          if (window.logAdminActivity) {
            window.logAdminActivity(`Mengunggah video materi baru ke cloud: "${title}"`);
          }
          
          alert("Video materi berhasil diunggah secara online!");
          addVideoModal.style.display = 'none';
          resetVideoForm();
        } else {
          alert("Gagal mengunggah berkas: " + (res.message || "Kesalahan respon server."));
        }
      } catch (err) {
        alert("Respon server tidak dapat diproses.");
      }
    } else {
      alert("Terjadi kesalahan server saat mengunggah (Kode status: " + xhr.status + ").");
    }
    progressBox.style.display = 'none';
    submitBtn.disabled = false;
    closeBtn.disabled = false;
  };

  xhr.onerror = () => {
    alert("Gagal mengunggah berkas karena gangguan jaringan.");
    progressBox.style.display = 'none';
    submitBtn.disabled = false;
    closeBtn.disabled = false;
  };

  xhr.open('POST', 'https://pixeldrain.com/api/file');
  xhr.send(fd);
}

function resetVideoForm() {
  document.getElementById('videoTitleInput').value = '';
  document.getElementById('videoUrlInput').value = '';
  document.getElementById('videoFileInput').value = '';
  
  // Kembalikan ke pilihan default (YouTube)
  document.getElementById('srcYtRadio').checked = true;
  document.getElementById('ytInputBox').style.display = 'block';
  document.getElementById('localVideoInputBox').style.display = 'none';
  
  // Sembunyikan progress bar
  document.getElementById('uploadProgressBox').style.display = 'none';
  document.getElementById('uploadProgressBar').style.width = '0%';
  document.getElementById('uploadPercent').innerText = '0%';
}

