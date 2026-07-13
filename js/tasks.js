// Modul Pengecekan Tugas (Task Tracker) terintegrasi dengan Firebase Realtime Database (Non-Module)
let databaseTasks = null;
let tasksRef = null;
let localTasksFallback = []; // Fallback local storage jika Firebase gagal/offline

window.initTasks = function() {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    }
    databaseTasks = firebase.database();
    tasksRef = databaseTasks.ref('9b_tasks');
    
    setupTasksRealtimeListener();
  } else {
    console.warn("Firebase tidak terdeteksi, beralih ke penyimpanan Lokal (LocalStorage).");
    loadTasksFromLocalStorage();
    window.renderTasksList();
  }
};

function setupTasksRealtimeListener() {
  tasksRef.on('value', (snapshot) => {
    const data = snapshot.val();
    const tasksList = [];
    if (data) {
      Object.keys(data).forEach(key => {
        tasksList.push({
          id: key,
          ...data[key]
        });
      });
    }
    // Update local copy & render
    localTasksFallback = tasksList;
    window.renderTasksList();
  }, (error) => {
    console.error("Gagal mendengarkan database Firebase, memuat dari lokal:", error);
    loadTasksFromLocalStorage();
    window.renderTasksList();
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

  // Kosongkan kontainer
  todoContainer.innerHTML = '';
  progressContainer.innerHTML = '';
  doneContainer.innerHTML = '';

  let countTodo = 0, countProgress = 0, countDone = 0;
  const isAdmin = localStorage.getItem('admin_logged') === 'true';

  localTasksFallback.forEach(task => {
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

  // Update counters di header kolom
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

  // Opsi aksi admin untuk memindahkan status tugas
  let actionsHTML = '';
  if (isAdmin) {
    let moveButtons = '';
    if (task.status === 'todo') {
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'progress')">KERJAKAN &rarr;</button>`;
    } else if (task.status === 'progress') {
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'todo')">&larr; TO DO</button>`;
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'done')">SELESAI &rarr;</button>`;
    } else if (task.status === 'done') {
      moveButtons += `<button class="task-action-btn" onclick="moveTask('${task.id}', 'progress')">&larr; PROGRESS</button>`;
    }

    actionsHTML = `
      <div class="task-actions">
        ${moveButtons}
        <button class="task-action-btn btn-delete" onclick="deleteTask('${task.id}')">HAPUS</button>
      </div>
    `;
  }

  div.innerHTML = `
    <div class="task-subject">${escapeHTML(task.subject)}</div>
    <div class="task-desc">${escapeHTML(task.desc)}</div>
    <div class="task-meta">
      ${deadlineHTML}
      <span class="tag-label" style="background: ${getPriorityColor(task.priority)}; margin: 0; box-shadow: 1px 1px 0px #000; font-size: 0.6rem;">${task.priority}</span>
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

  if (tasksRef) {
    // Tulis ke Firebase Realtime Database
    tasksRef.push(newTask);
  } else {
    // Tulis ke LocalStorage
    newTask.id = 'local_' + Date.now();
    localTasksFallback.push(newTask);
    saveTasksToLocalStorage();
    window.renderTasksList();
  }

  // Log ke aktivitas admin
  if (window.logAdminActivity) {
    window.logAdminActivity(`Menambahkan tugas ${newTask.subject}`);
  }
};

// Pindahkan Status Tugas
window.moveTask = function(taskId, newStatus) {
  if (tasksRef && !taskId.startsWith('local_')) {
    tasksRef.child(taskId).update({ status: newStatus });
  } else {
    const task = localTasksFallback.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      saveTasksToLocalStorage();
      window.renderTasksList();
    }
  }

  // Log ke aktivitas admin
  if (window.logAdminActivity) {
    const taskName = localTasksFallback.find(t => t.id === taskId)?.subject || 'tugas';
    window.logAdminActivity(`Memindahkan tugas "${taskName}" ke status [${newStatus.toUpperCase()}]`);
  }
};

// Hapus Tugas
window.deleteTask = function(taskId) {
  if (!confirm("Hapus tugas ini? Semua siswa ga bakal bisa liat tugas ini lagi.")) return;

  const taskToDelete = localTasksFallback.find(t => t.id === taskId);
  const taskSubject = taskToDelete ? taskToDelete.subject : 'Tugas';

  if (tasksRef && !taskId.startsWith('local_')) {
    tasksRef.child(taskId).remove();
  } else {
    localTasksFallback = localTasksFallback.filter(t => t.id !== taskId);
    saveTasksToLocalStorage();
    window.renderTasksList();
  }

  // Log ke aktivitas admin
  if (window.logAdminActivity) {
    window.logAdminActivity(`Menghapus tugas "${taskSubject}"`);
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
  const deadline = new Date(deadlineStr);
  const diffTime = deadline - new Date();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 2 && diffDays >= 0; // Urgent jika deadline dalam waktu 2 hari atau kurang
}

function formatDeadlineDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
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
