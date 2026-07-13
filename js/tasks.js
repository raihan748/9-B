// Modul Papan Tugas (Task Tracker) — menggunakan singleton window.gunDB dari config.js
let tasksNodeRef = null;
let localTasksFallback = [];

window.initTasks = function() {
  if (window.gunDB) {
    // Gunakan singleton gunDB — JANGAN buat instance Gun baru
    tasksNodeRef = window.gunDB.get('9b_class_tasks_global_v3');
    setupTasksRealtimeListener();
  } else {
    console.warn("Gun.js singleton belum siap, beralih ke localStorage.");
    loadTasksFromLocalStorage();
    window.renderTasksList();
  }
};

function setupTasksRealtimeListener() {
  tasksNodeRef.map().on((task, taskId) => {
    // Abaikan node metadata Gun.js dan tugas yang sudah ditandai hapus
    if (!task || taskId === '_' || task._deleted === true) {
      localTasksFallback = localTasksFallback.filter(t => t.id !== taskId);
      window.renderTasksList();
      return;
    }

    // Abaikan nilai primitif yang bukan objek tugas
    if (typeof task !== 'object') return;

    const index = localTasksFallback.findIndex(t => t.id === taskId);
    // Gabungkan dengan data yang sudah ada agar perubahan parsial (misal: hanya status) ikut terupdate
    if (index > -1) {
      localTasksFallback[index] = { ...localTasksFallback[index], ...task, id: taskId };
    } else {
      localTasksFallback.push({ ...task, id: taskId });
    }

    window.renderTasksList();
    saveTasksToLocalStorage();
  });
}

function loadTasksFromLocalStorage() {
  const saved = localStorage.getItem('9b_tasks_local');
  if (saved) {
    try {
      localTasksFallback = JSON.parse(saved);
    } catch (e) {
      localTasksFallback = [];
    }
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem('9b_tasks_local', JSON.stringify(localTasksFallback));
}

// Render Kanban Board
window.renderTasksList = function() {
  const todoContainer = document.getElementById('todoCards');
  const progressContainer = document.getElementById('progressCards');
  const doneContainer = document.getElementById('doneCards');

  if (!todoContainer || !progressContainer || !doneContainer) return;

  todoContainer.innerHTML = '';
  progressContainer.innerHTML = '';
  doneContainer.innerHTML = '';

  let countTodo = 0, countProgress = 0, countDone = 0;
  const isAdmin = localStorage.getItem('admin_logged') === 'true';

  const sortedTasks = [...localTasksFallback].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  sortedTasks.forEach(task => {
    const card = createTaskCardElement(task, isAdmin);
    
    // Status diambil secara global dari data tugas database
    if (task.status === 'todo') {
      todoContainer.appendChild(card);
      countTodo++;
    } else if (task.status === 'progress') {
      progressContainer.appendChild(card);
      countProgress++;
    } else if (task.status === 'done') {
      doneContainer.appendChild(card);
      countDone++;
    }
  });

  document.getElementById('todoCount').innerText = countTodo;
  document.getElementById('progressCount').innerText = countProgress;
  document.getElementById('doneCount').innerText = countDone;
};

function createTaskCardElement(task, isAdmin) {
  const div = document.createElement('div');
  div.className = 'task-card';
  div.id = `task-${task.id}`;

  const isUrgent = checkIsUrgent(task.deadline);
  const deadlineHTML = task.deadline 
    ? `<span class="task-deadline ${isUrgent ? 'urgent' : ''}">
        <i class="fa-regular fa-clock"></i> ${formatDeadlineDate(task.deadline)}
       </span>`
    : '<span></span>';

  // Kontrol pemindahan status tugas hanya boleh dilakukan oleh Admin (Global Tracker)
  let actionsHTML = '';
  if (isAdmin) {
    let moveButtons = '';
    if (task.status === 'todo') {
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'progress')">PROSES &rarr;</button>`;
    } else if (task.status === 'progress') {
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'todo')">&larr; BELUM DIMULAI</button>`;
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'done')">SELESAI &rarr;</button>`;
    } else if (task.status === 'done') {
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'progress')">&larr; PROSES</button>`;
    }

    actionsHTML = `
      <div class="task-actions">
        ${moveButtons}
        <button class="task-action-btn btn-delete" onclick="deleteTask('${task.id}')">HAPUS PERMANEN</button>
      </div>
    `;
  }

  div.innerHTML = `
    <div class="task-subject">${tasksEscapeHTML(task.subject)}</div>
    <div class="task-desc">${tasksEscapeHTML(task.desc)}</div>
    <div class="task-meta">
      ${deadlineHTML}
      <span class="tag-label" style="background: ${getPriorityColor(task.priority)}; margin: 0; box-shadow: 1px 1px 0px #000; font-size: 0.6rem;">${task.priority.toUpperCase()}</span>
    </div>
    ${actionsHTML}
  `;

  return div;
}

// Tambah Tugas Baru secara Global (Admin Only)
window.addNewTask = function(subject, desc, deadline, priority) {
  const newTask = {
    subject: subject.trim(),
    desc: desc.trim(),
    deadline: deadline,
    priority: priority || 'medium',
    status: 'todo', // Status default global
    timestamp: Date.now()
  };

  if (tasksNodeRef) {
    tasksNodeRef.set(newTask);
  } else {
    const localId = 'local_' + Date.now();
    newTask.id = localId;
    localTasksFallback.push(newTask);
    saveTasksToLocalStorage();
    window.renderTasksList();
  }

  if (window.logAdminActivity) {
    window.logAdminActivity(`Menambahkan tugas baru secara global: "${newTask.subject}"`);
  }
};

// Ubah Status Tugas secara Global (Admin Only)
// KRITIS: Gunakan .get(taskId).get('status').put() bukan .get(taskId).put({status})
// agar Gun.js P2P mengirim notifikasi perubahan ke SEMUA peer yang mendengarkan
window.moveTask = function(taskId, newStatus) {
  const taskName = localTasksFallback.find(t => t.id === taskId)?.subject || 'tugas';

  if (tasksNodeRef && !taskId.startsWith('local_')) {
    // Tulis langsung ke sub-key 'status' — ini cara benar di Gun.js
    tasksNodeRef.get(taskId).get('status').put(newStatus);
  } else {
    // Fallback: update lokal saja
    const task = localTasksFallback.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      saveTasksToLocalStorage();
      window.renderTasksList();
    }
  }

  if (window.logAdminActivity) {
    window.logAdminActivity(`Mengubah status tugas global "${taskName}" menjadi [${newStatus.toUpperCase()}]`);
  }
};

// Hapus Tugas secara Global (Admin Only)
// Gun.js tidak bisa benar-benar menghapus node, jadi kita tandai sebagai _deleted=true
window.deleteTask = function(taskId) {
  if (!confirm("Apakah Anda yakin ingin menghapus tugas ini secara permanen dari database global? Tugas akan hilang dari layar seluruh siswa.")) return;

  const taskToDelete = localTasksFallback.find(t => t.id === taskId);
  const taskSubject = taskToDelete ? taskToDelete.subject : 'Tugas';

  if (tasksNodeRef && !taskId.startsWith('local_')) {
    // Tandai sebagai dihapus — lebih andal dari put(null) di Gun.js P2P
    tasksNodeRef.get(taskId).get('_deleted').put(true);
  }

  // Hapus dari list lokal langsung tanpa menunggu callback
  localTasksFallback = localTasksFallback.filter(t => t.id !== taskId);
  saveTasksToLocalStorage();
  window.renderTasksList();

  if (window.logAdminActivity) {
    window.logAdminActivity(`Menghapus tugas secara permanen: "${taskSubject}"`);
  }
};

// Helpers
function getPriorityColor(priority) {
  switch (priority) {
    case 'high': return 'var(--pink)';
    case 'medium': return 'var(--yellow-light)';
    case 'low': return 'var(--mint)';
    default: return 'var(--text-muted)';
  }
}

function checkIsUrgent(deadlineStr) {
  if (!deadlineStr) return false;
  const parts = deadlineStr.split('-');
  if (parts.length !== 3) return false;
  const deadline = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 2;
}

function formatDeadlineDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function tasksEscapeHTML(str) {
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
