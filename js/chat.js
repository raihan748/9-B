// Modul Chat Realtime — Firebase Realtime Database
let chatRef = null;
let currentUsername = localStorage.getItem('chat_username') || '';
let currentUserAvatar = localStorage.getItem('chat_avatar') || '🦖';
let chatListenerAttached = false;

const emojis = ['🦖', '👾', '🦊', '🐱', '🐼', '🐨', '🐸', '🦁', '🐯', '🐙', '🥑', '🍕', '⚽', '🎸', '🚀'];

window.initChat = function (onUserReady) {
  if (!window.db) {
    console.error("Firebase belum siap di initChat");
    return;
  }
  chatRef = window.db.ref('9b_class_chat_v1');

  if (!currentUsername) {
    showUsernameModal(onUserReady);
  } else {
    setupChatListeners();
    if (onUserReady) onUserReady(currentUsername, currentUserAvatar);
  }
};

function showUsernameModal(callback) {
  const existing = document.getElementById('chatUsernameModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'chatUsernameModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h2 style="font-family:'Space Grotesk',sans-serif;font-weight:900;margin-bottom:16px;">MASUK RUANG KOMUNIKASI</h2>
      <div class="form-group">
        <label for="usernameInput">Nama Panggilan</label>
        <input type="text" id="usernameInput" class="form-input" placeholder="Contoh: Rehan, Bagas, Clara..." maxlength="15">
      </div>
      <div class="form-group">
        <label>Pilih Avatar Emoji</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;" id="avatarSelector">
          ${emojis.map(e => `<button class="brut-btn" style="padding:8px;font-size:1.2rem;min-width:42px;box-shadow:2px 2px 0 #000;" data-avatar="${e}">${e}</button>`).join('')}
        </div>
      </div>
      <button id="saveUsernameBtn" class="brut-btn btn-purple" style="width:100%;margin-top:10px;">MASUK RUANG DISKUSI</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';

  let selectedAvatar = emojis[Math.floor(Math.random() * emojis.length)];
  const avatarButtons = modal.querySelectorAll('#avatarSelector button');
  avatarButtons.forEach(btn => {
    if (btn.dataset.avatar === selectedAvatar) btn.style.background = 'var(--yellow-light)';
    btn.onclick = (e) => {
      e.preventDefault();
      selectedAvatar = btn.dataset.avatar;
      avatarButtons.forEach(b => b.style.background = 'var(--bg-card)');
      btn.style.background = 'var(--yellow-light)';
    };
  });

  const saveBtn = modal.querySelector('#saveUsernameBtn');
  const input = modal.querySelector('#usernameInput');
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveBtn.click(); });

  saveBtn.onclick = () => {
    const val = input.value.trim();
    if (!val) { alert("Nama panggilan tidak boleh kosong!"); return; }
    currentUsername = val;
    currentUserAvatar = selectedAvatar;
    localStorage.setItem('chat_username', currentUsername);
    localStorage.setItem('chat_avatar', currentUserAvatar);
    modal.remove();
    setupChatListeners();
    if (callback) callback(currentUsername, currentUserAvatar);
    sendSystemMessage(`${currentUserAvatar} ${currentUsername} telah bergabung ke dalam obrolan.`);
  };
}

function setupChatListeners() {
  if (chatListenerAttached) return;
  chatListenerAttached = true;

  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  chatMessages.innerHTML = '';

  // Firebase: dengarkan semua pesan baru secara realtime
  chatRef.orderByChild('timestamp').on('child_added', (snap) => {
    const message = snap.val();
    if (!message) return;
    renderMessage(message, snap.key);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // Firebase: pesan yang dihapus
  chatRef.on('child_removed', (snap) => {
    const msgEl = document.getElementById(`msg-${snap.key}`);
    if (msgEl) msgEl.remove();
  });
}

function renderMessage(message, messageId) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  if (document.getElementById(`msg-${messageId}`)) return; // cegah duplikasi

  const msgDiv = document.createElement('div');
  msgDiv.id = `msg-${messageId}`;
  const isSelf = message.sender === currentUsername;
  const isSystem = message.type === 'system';

  if (isSystem) {
    msgDiv.className = 'message system';
    msgDiv.innerHTML = `<div class="message-text">${message.text}</div>`;
  } else {
    msgDiv.className = `message ${isSelf ? 'sent' : 'received'}`;
    const isHeadAdmin = localStorage.getItem('admin_level') === 'HEAD_ADMIN';
    const deleteBtn = isHeadAdmin
      ? `<button class="task-action-btn btn-delete" style="padding:2px 6px;font-size:0.6rem;border-width:1px;box-shadow:none;" onclick="deleteChatMessage('${messageId}')">HAPUS</button>`
      : '';
    msgDiv.innerHTML = `
      <div class="message-meta">
        <span class="message-avatar">${message.avatar || '🦕'}</span>
        <span class="message-sender">${chatEsc(message.sender)}</span>
        <span class="message-time">${formatTime(message.timestamp)}</span>
        ${deleteBtn}
      </div>
      <div class="message-text">${chatEsc(message.text)}</div>
    `;
  }
  chatMessages.appendChild(msgDiv);
}

window.sendMessage = function (text) {
  if (!chatRef) return;
  const cleanText = text.trim();
  if (!cleanText) return;
  if (!currentUsername) { alert("Silakan atur nama panggilan Anda terlebih dahulu."); return; }

  chatRef.push({
    sender: currentUsername,
    avatar: currentUserAvatar,
    text: cleanText,
    timestamp: Date.now(),
    type: 'user'
  });
};

function sendSystemMessage(text) {
  if (!chatRef) return;
  chatRef.push({ text, timestamp: Date.now(), type: 'system' });
}

window.deleteChatMessage = function (messageId) {
  if (!confirm("Hapus pesan ini?")) return;
  chatRef.child(messageId).remove();
  if (window.logAdminActivity) window.logAdminActivity("Menghapus pesan komunikasi");
};

window.clearChatHistory = function () {
  if (!confirm("⚠️ Hapus seluruh riwayat komunikasi secara permanen?")) return;
  if (chatRef) {
    chatRef.remove().then(() => {
      sendSystemMessage("🔄 Riwayat obrolan telah dibersihkan oleh Administrator Utama.");
      chatListenerAttached = false;
      setupChatListeners();
    });
  }
};

// Helpers
function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
function chatEsc(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[t]||t));
}
