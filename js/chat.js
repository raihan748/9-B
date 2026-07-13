// Modul Chat Realtime menggunakan Gun.js (Realtime Peer-to-Peer Database)
let gunInstance = null;
let chatNodeRef = null;
let chatListenerRef = null;
let currentUsername = localStorage.getItem('chat_username') || '';
let currentUserAvatar = localStorage.getItem('chat_avatar') || '🦖';

const emojis = ['🦖', '👾', '🦊', '🐱', '🐼', '🐨', '🐸', '🦁', '🐯', '🐙', '🥑', '🍕', '⚽', '🎸', '🚀'];

window.initChat = function(onUserReady) {
  if (typeof Gun === 'undefined') {
    console.error("SDK Gun.js belum dimuat di index.html");
    return;
  }

  // Inisialisasi Gun.js jika belum ada
  if (!gunInstance) {
    gunInstance = Gun(window.gunPeers);
  }
  
  chatNodeRef = gunInstance.get('9b_class_chat_v1');

  // Periksa apakah pengguna sudah mengatur nama panggilan
  if (!currentUsername) {
    showUsernameModal(onUserReady);
  } else {
    setupChatListeners();
    if (onUserReady) onUserReady(currentUsername, currentUserAvatar);
  }
};

function showUsernameModal(callback) {
  const existingModal = document.getElementById('chatUsernameModal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'chatUsernameModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Masuk Ruang Komunikasi Kelas 9B</h3>
      <p>Silakan masukkan nama panggilan Anda untuk mulai berkomunikasi secara real-time dengan teman-teman sekelas.</p>
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
      <button id="saveUsernameBtn" class="brut-btn btn-purple" style="width: 100%; margin-top: 10px;">MASUK RUANG DISKUSI</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';

  let selectedAvatar = emojis[Math.floor(Math.random() * emojis.length)];
  const avatarButtons = modal.querySelectorAll('#avatarSelector button');
  
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

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveBtn.click();
  });

  saveBtn.onclick = () => {
    const val = input.value.trim();
    if (!val) {
      alert("Nama panggilan tidak boleh kosong!");
      return;
    }
    
    currentUsername = val;
    currentUserAvatar = selectedAvatar;
    localStorage.setItem('chat_username', currentUsername);
    localStorage.setItem('chat_avatar', currentUserAvatar);
    
    modal.remove();
    setupChatListeners();
    if (callback) callback(currentUsername, currentUserAvatar);

    // Kirim pesan pengumuman bergabung
    sendSystemMessage(`${currentUserAvatar} ${currentUsername} telah bergabung ke dalam obrolan.`);
  };
}

function setupChatListeners() {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  chatMessages.innerHTML = '';

  // Listen data dari Gun.js secara real-time
  chatNodeRef.map().on((message, messageId) => {
    // Jika pesan dihapus (di-put null), hapus dari UI
    if (!message) {
      const msgElement = document.getElementById(`msg-${messageId}`);
      if (msgElement) msgElement.remove();
      return;
    }

    renderMessage(message, messageId);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

function renderMessage(message, messageId) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // Cek apakah pesan sudah ter-render sebelumnya untuk menghindari duplikasi
  let msgDiv = document.getElementById(`msg-${messageId}`);
  const isSelf = message.sender === currentUsername;
  const isSystem = message.type === 'system';
  
  if (!msgDiv) {
    msgDiv = document.createElement('div');
    msgDiv.id = `msg-${messageId}`;
    chatMessages.appendChild(msgDiv);
  }
  
  if (isSystem) {
    msgDiv.className = 'message system';
    msgDiv.innerHTML = `
      <div class="message-text">${message.text}</div>
    `;
  } else {
    msgDiv.className = `message ${isSelf ? 'sent' : 'received'}`;
    
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

    if (isHeadAdmin) {
      const delBtnEl = msgDiv.querySelector('.btn-delete');
      if (delBtnEl) {
        delBtnEl.onclick = () => deleteMessage(messageId);
      }
    }
  }
}

window.sendMessage = function(text) {
  if (!chatNodeRef) return;
  const cleanText = text.trim();
  if (!cleanText) return;

  if (!currentUsername) {
    alert("Silakan atur nama panggilan Anda terlebih dahulu.");
    return;
  }

  // Gun.js .set() otomatis generate ID acak dan memasukkannya ke node list
  chatNodeRef.set({
    sender: currentUsername,
    avatar: currentUserAvatar,
    text: cleanText,
    timestamp: Date.now(),
    type: 'user'
  });
};

function sendSystemMessage(text) {
  if (!chatNodeRef) return;
  chatNodeRef.set({
    text: text,
    timestamp: Date.now(),
    type: 'system'
  });
}

function deleteMessage(messageId) {
  if (!confirm("Hapus pesan ini dari database?")) return;
  // Di Gun.js, menghapus item dilakukan dengan menyetel nilainya menjadi null
  chatNodeRef.get(messageId).put(null);
  
  if (window.logAdminActivity) {
    window.logAdminActivity("Menghapus pesan komunikasi");
  }
}

window.clearChatHistory = function() {
  if (!confirm("⚠️ PERINGATAN: Apakah Anda yakin ingin menghapus seluruh riwayat komunikasi di database? Tindakan ini bersifat permanen!")) return;
  
  if (chatNodeRef) {
    // Lakukan iterasi dan hapus seluruh pesan satu per satu
    chatNodeRef.map().once((message, messageId) => {
      if (messageId) {
        chatNodeRef.get(messageId).put(null);
      }
    });
    
    sendSystemMessage("🔄 Riwayat obrolan telah dibersihkan oleh Administrator Utama.");
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
