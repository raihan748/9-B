// Modul Pengecekan Tugas (Task Tracker) terintegrasi dengan Gun.js (Realtime Peer-to-Peer Database)
let gunTasksInstance = null;
let tasksNodeRef = null;
let localTasksFallback = []; // Fallback local storage jika database gagal/offline

window.initTasks = function() {
  if (typeof Gun !== 'undefined') {
    if (!gunTasksInstance) {
      gunTasksInstance = Gun(window.gunPeers);
    }
    tasksNodeRef = gunTasksInstance.get('9b_class_tasks_v1');
    
    setupTasksRealtimeListener();
  } else {
    console.warn("Gun.js tidak terdeteksi, beralih ke penyimpanan lokal browser.");
    loadTasksFromLocalStorage();
    window.renderTasksList();
  }
};

function setupTasksRealtimeListener() {
  tasksNodeRef.map().on((task, taskId) => {
    if (!task) {
      // Jika tugas dihapus (put null), hapus dari list lokal
      localTasksFallback = localTasksFallback.filter(t => t.id !== taskId);
    } else {
      // Perbarui atau tambahkan tugas ke list lokal
      const index = localTasksFallback.findIndex(t => t.id === taskId);
      const updatedTask = { id: taskId, ...task };
      if (index > -1) {
        localTasksFallback[index] = updatedTask;
      } else {
        localTasksFallback.push(updatedTask);
      }
    }
    // Render ulang papan kanban
    window.renderTasksList();
    // Cadangkan ke penyimpanan lokal browser
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

  // Kosongkan kontainer kartu
  todoContainer.innerHTML = '';
  progressContainer.innerHTML = '';
  doneContainer.innerHTML = '';

  let countTodo = 0, countProgress = 0, countDone = 0;
  const isAdmin = localStorage.getItem('admin_logged') === 'true';

  // Urutkan tugas berdasarkan tanggal pembuatan (terbaru di atas)
  const sortedTasks = [...localTasksFallback].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  sortedTasks.forEach(task => {
    const card = createTaskCardElement(task, isAdmin);
    
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

  // Update jumlah tugas di header kolom
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

  // Tombol navigasi status tugas untuk admin
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
        <button class="task-action-btn btn-delete" onclick="deleteTask('${task.id}')">HAPUS</button>
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

// Tambah Tugas Baru
window.addNewTask = function(subject, desc, deadline, priority) {
  const newTask = {
    subject: subject.trim(),
    desc: desc.trim(),
    deadline: deadline,
    priority: priority || 'medium',
    status: 'todo',
    timestamp: Date.now()
  };

  if (tasksNodeRef) {
    // Tulis ke Gun.js
    tasksNodeRef.set(newTask);
  } else {
    // Tulis ke penyimpanan lokal browser jika database offline
    const localId = 'local_' + Date.now();
    newTask.id = localId;
    localTasksFallback.push(newTask);
    saveTasksToLocalStorage();
    window.renderTasksList();
  }

  if (window.logAdminActivity) {
    window.logAdminActivity(`Menambahkan tugas baru: "${newTask.subject}"`);
  }
};

// Ubah Status Pengerjaan Tugas
window.moveTask = function(taskId, newStatus) {
  if (tasksNodeRef && !taskId.startsWith('local_')) {
    tasksNodeRef.get(taskId).put({ status: newStatus });
  } else {
    const task = localTasksFallback.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      saveTasksToLocalStorage();
      window.renderTasksList();
    }
  }

  if (window.logAdminActivity) {
    const taskName = localTasksFallback.find(t => t.id === taskId)?.subject || 'tugas';
    window.logAdminActivity(`Mengubah status tugas "${taskName}" menjadi [${newStatus.toUpperCase()}]`);
  }
};

// Hapus Tugas
window.deleteTask = function(taskId) {
  if (!confirm("Apakah Anda yakin ingin menghapus tugas ini? Tugas tidak akan terlihat lagi oleh seluruh siswa.")) return;

  const taskToDelete = localTasksFallback.find(t => t.id === taskId);
  const taskSubject = taskToDelete ? taskToDelete.subject : 'Tugas';

  if (tasksNodeRef && !taskId.startsWith('local_')) {
    // Di Gun.js, menghapus item dilakukan dengan menyetel nilainya menjadi null
    tasksNodeRef.get(taskId).put(null);
  } else {
    localTasksFallback = localTasksFallback.filter(t => t.id !== taskId);
    saveTasksToLocalStorage();
    window.renderTasksList();
  }

  if (window.logAdminActivity) {
    window.logAdminActivity(`Menghapus tugas: "${taskSubject}"`);
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
  return diffDays <= 2; // Urgent jika sisa waktu 2 hari atau kurang
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
