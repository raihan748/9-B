// Modul Chat Realtime menggunakan Firebase Realtime Database (Non-Module)
// BUG FIX: Rename variable 'database' -> 'chatDatabase' agar tidak conflict dengan app.js
let chatDatabase = null;
let chatRef = null;
let chatListenerAttached = false; // BUG FIX: flag untuk mencegah duplikasi listener
let currentUsername = localStorage.getItem('chat_username') || '';
let currentUserAvatar = localStorage.getItem('chat_avatar') || '🦖';

const emojis = ['🦖', '👾', '🦊', '🐱', '🐼', '🐨', '🐸', '🦁', '🐯', '🐙', '🥑', '🍕', '⚽', '🎸', '🚀'];

window.initChat = function(onUserReady) {
  // Pastikan Firebase dimuat
  if (typeof firebase === 'undefined') {
    console.error("Firebase SDK belum dimuat di index.html");
    return;
  }

  // Inisialisasi Firebase App jika belum diinisialisasi
  if (!firebase.apps.length) {
    firebase.initializeApp(window.firebaseConfig);
  }
  
  chatDatabase = firebase.database();
  chatRef = chatDatabase.ref('9b_chat');

  // BUG FIX: Matikan listener lama sebelum re-init (mencegah duplikasi saat edit username)
  if (chatListenerAttached) {
    chatRef.off();
    chatListenerAttached = false;
  }

  // Periksa apakah user sudah set username
  if (!currentUsername) {
    showUsernameModal(onUserReady);
  } else {
    setupChatListeners();
    if (onUserReady) onUserReady(currentUsername, currentUserAvatar);
  }
};

function showUsernameModal(callback) {
  // Hapus modal lama jika ada (untuk re-init yang bersih)
  const existingModal = document.getElementById('chatUsernameModal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'chatUsernameModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Masuk Ruang Obrolan 9B</h3>
      <p>Masukkan nama panggilan lo sebelum mulai ngobrol bareng anak-anak 9B secara real-time.</p>
      <div class="form-group">
        <label for="usernameInput">Nama Panggilan</label>
        <input type="text" id="usernameInput" class="form-input" placeholder="Contoh: Rehan, Bagas, Clara..." maxlength="15">
      </div>
      <div class="form-group">
        <label>Pilih Avatar Emoji</label>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;" id="avatarSelector">
          ${emojis.map(e => `<button class="brut-btn" style="padding: 8px; font-size: 1.2rem; min-width: 42px; box-shadow: 2px 2px 0px #000;" data-avatar="${e}">${e}</button>`).join('')}
        </div>
      </div>
      <button id="saveUsernameBtn" class="brut-btn btn-purple" style="width: 100%; margin-top: 10px;">MASUK CHAT</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';

  let selectedAvatar = emojis[Math.floor(Math.random() * emojis.length)];
  const avatarButtons = modal.querySelectorAll('#avatarSelector button');
  
  // Highlight default avatar
  avatarButtons.forEach(btn => {
    if (btn.dataset.avatar === selectedAvatar) {
      btn.style.background = 'var(--yellow-light)';
    }
    btn.onclick = (e) => {
      e.preventDefault();
      selectedAvatar = btn.dataset.avatar;
      avatarButtons.forEach(b => b.style.background = 'var(--bg-card)');
      btn.style.background = 'var(--yellow-light)';
    };
  });

  const saveBtn = modal.querySelector('#saveUsernameBtn');
  const input = modal.querySelector('#usernameInput');

  // BUG FIX: Dukung Enter key pada input username
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveBtn.click();
  });

  saveBtn.onclick = () => {
    const val = input.value.trim();
    if (!val) {
      alert("Nama panggilan ga boleh kosong!");
      return;
    }
    
    currentUsername = val;
    currentUserAvatar = selectedAvatar;
    localStorage.setItem('chat_username', currentUsername);
    localStorage.setItem('chat_avatar', currentUserAvatar);
    
    modal.remove();
    setupChatListeners();
    if (callback) callback(currentUsername, currentUserAvatar);

    // Kirim pesan sistem bahwa user bergabung
    sendSystemMessage(`${currentUserAvatar} ${currentUsername} bergabung dalam obrolan.`);
  };
}

function setupChatListeners() {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // Bersihkan chat UI sebelum render dari database
  chatMessages.innerHTML = '';

  // BUG FIX: Simpan reference query agar bisa di-off dengan benar
  const chatQuery = chatRef.limitToLast(100);
  chatQuery.on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageId = snapshot.key;
    renderMessage(message, messageId);
    
    // Auto scroll ke bawah
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // Listen jika ada pesan yang dihapus
  chatRef.on('child_removed', (snapshot) => {
    const messageId = snapshot.key;
    const msgElement = document.getElementById(`msg-${messageId}`);
    if (msgElement) {
      msgElement.remove();
    }
  });

  chatListenerAttached = true;
}

function renderMessage(message, messageId) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // BUG FIX: Cegah duplikasi render pesan yang sama
  if (document.getElementById(`msg-${messageId}`)) return;

  const isSelf = message.sender === currentUsername;
  const isSystem = message.type === 'system';
  
  const msgDiv = document.createElement('div');
  msgDiv.id = `msg-${messageId}`;
  
  if (isSystem) {
    msgDiv.className = 'message system';
    msgDiv.innerHTML = `
      <div class="message-text">${message.text}</div>
    `;
  } else {
    msgDiv.className = `message ${isSelf ? 'sent' : 'received'}`;
    
    // Tampilkan tombol delete jika login sebagai Head Admin
    const isHeadAdmin = localStorage.getItem('admin_level') === 'HEAD_ADMIN';
    const deleteBtn = isHeadAdmin 
      ? `<button class="task-action-btn btn-delete" style="padding: 2px 6px; font-size: 0.6rem; border-width: 1px; box-shadow: none;" data-msg-id="${messageId}">HAPUS</button>` 
      : '';

    msgDiv.innerHTML = `
      <div class="message-meta">
        <span class="message-avatar">${message.avatar || '🦕'}</span>
        <span class="message-sender">${chatEscapeHTML(message.sender)}</span>
        <span class="message-time">${formatTime(message.timestamp)}</span>
        ${deleteBtn}
      </div>
      <div class="message-text">${chatEscapeHTML(message.text)}</div>
    `;

    // Pasang event handler untuk tombol hapus jika ada
    if (isHeadAdmin) {
      const delBtnEl = msgDiv.querySelector('.btn-delete');
      if (delBtnEl) {
        delBtnEl.onclick = () => deleteMessage(messageId);
      }
    }
  }
  
  chatMessages.appendChild(msgDiv);
}

window.sendMessage = function(text) {
  if (!chatRef) return;
  const cleanText = text.trim();
  if (!cleanText) return;

  // BUG FIX: Cek username sebelum kirim pesan
  if (!currentUsername) {
    alert("Atur dulu nama panggilan lo sebelum kirim pesan!");
    return;
  }

  chatRef.push({
    sender: currentUsername,
    avatar: currentUserAvatar,
    text: cleanText,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    type: 'user'
  });
};

function sendSystemMessage(text) {
  if (!chatRef) return;
  chatRef.push({
    text: text,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    type: 'system'
  });
}

function deleteMessage(messageId) {
  if (!confirm("Hapus pesan ini dari database?")) return;
  chatDatabase.ref(`9b_chat/${messageId}`).remove();
  
  // Log ke aktivitas admin
  if (window.logAdminActivity) {
    window.logAdminActivity("Menghapus pesan obrolan");
  }
}

window.clearChatHistory = function() {
  if (!confirm("⚠️ PERINGATAN: Apakah lo yakin mau mengosongkan semua riwayat chat di database? Tindakan ini permanen!")) return;
  if (chatDatabase) {
    chatDatabase.ref('9b_chat').remove().then(() => {
      sendSystemMessage("🔄 Riwayat obrolan dikosongkan oleh Head Admin.");
    });
  }
};

// Helpers
function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// BUG FIX: Rename escapeHTML di chat.js agar tidak ada redeclaration conflict di global scope
function chatEscapeHTML(str) {
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
