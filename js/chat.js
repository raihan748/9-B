// Modul Chat Realtime menggunakan Firebase Realtime Database
import { firebaseConfig } from './config.js';

let database = null;
let chatRef = null;
let currentUsername = localStorage.getItem('chat_username') || '';
let currentUserAvatar = localStorage.getItem('chat_avatar') || '🦖';

const emojis = ['🦖', '👾', '🦊', '🐱', '🐼', '🐨', '🐸', '🦁', '🐯', '🐙', '🥑', '🍕', '⚽', '🎸', '🚀'];

export function initChat(onUserReady) {
  // Pastikan Firebase dimuat
  if (typeof firebase === 'undefined') {
    console.error("Firebase SDK belum dimuat di index.html");
    return;
  }

  // Inisialisasi Firebase App jika belum diinisialisasi
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  database = firebase.database();
  chatRef = database.ref('9b_chat');

  // Periksa apakah user sudah set username
  if (!currentUsername) {
    showUsernameModal(onUserReady);
  } else {
    setupChatListeners();
    if (onUserReady) onUserReady(currentUsername, currentUserAvatar);
  }
}

function showUsernameModal(callback) {
  // Buat modal overlay secara dinamis jika belum ada
  let modal = document.getElementById('chatUsernameModal');
  if (!modal) {
    modal = document.createElement('div');
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
  }

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

  const saveBtn = modal.getElementById('saveUsernameBtn');
  const input = modal.querySelector('#usernameInput');

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

  // Listen data chat realtime (batas 100 pesan terakhir)
  chatRef.limitToLast(100).off('child_added'); // hapus listener lama jika ada
  chatRef.limitToLast(100).on('child_added', (snapshot) => {
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
}

function renderMessage(message, messageId) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

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
        <span class="message-sender">${message.sender}</span>
        <span class="message-time">${formatTime(message.timestamp)}</span>
        ${deleteBtn}
      </div>
      <div class="message-text">${escapeHTML(message.text)}</div>
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

export function sendMessage(text) {
  if (!chatRef) return;
  const cleanText = text.trim();
  if (!cleanText) return;

  chatRef.push({
    sender: currentUsername,
    avatar: currentUserAvatar,
    text: cleanText,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    type: 'user'
  });
}

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
  database.ref(`9b_chat/${messageId}`).remove();
  
  // Log ke aktivitas admin
  import('./app.js').then(module => {
    module.logAdminActivity("Menghapus pesan obrolan");
  });
}

export function clearChatHistory() {
  if (!confirm("⚠️ PERINGATAN: Apakah lo yakin mau mengosongkan semua riwayat chat di database? Tindakan ini permanen!")) return;
  if (database) {
    database.ref('9b_chat').remove();
    sendSystemMessage("🔄 Riwayat obrolan dikosongkan oleh Head Admin.");
  }
}

// Helpers
function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
