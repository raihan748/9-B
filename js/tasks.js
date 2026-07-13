// Modul Papan Tugas — Firebase Realtime Database
let tasksRef = null;
let localTasksFallback = [];

window.initTasks = function () {
  if (!window.db) {
    console.warn("Firebase belum siap di initTasks.");
    return;
  }

  tasksRef = window.db.ref('9b_class_tasks_global_v3');
  setupTasksRealtimeListener();
};

function setupTasksRealtimeListener() {
  // Saat ada tugas baru ditambahkan
  tasksRef.on('child_added', (snap) => {
    const task = snap.val();
    if (!task) return;
    const existing = localTasksFallback.findIndex(t => t.id === snap.key);
    if (existing === -1) {
      localTasksFallback.push({ id: snap.key, ...task });
    }
    window.renderTasksList();
  });

  // Saat tugas diperbarui (status berubah, dll)
  tasksRef.on('child_changed', (snap) => {
    const task = snap.val();
    if (!task) return;
    const index = localTasksFallback.findIndex(t => t.id === snap.key);
    if (index > -1) {
      localTasksFallback[index] = { id: snap.key, ...task };
    } else {
      localTasksFallback.push({ id: snap.key, ...task });
    }
    window.renderTasksList();
  });

  // Saat tugas dihapus
  tasksRef.on('child_removed', (snap) => {
    localTasksFallback = localTasksFallback.filter(t => t.id !== snap.key);
    window.renderTasksList();
  });
}

// Render Kanban Board
window.renderTasksList = function () {
  const todoContainer = document.getElementById('todoCards');
  const progressContainer = document.getElementById('progressCards');
  const doneContainer = document.getElementById('doneCards');
  if (!todoContainer || !progressContainer || !doneContainer) return;

  todoContainer.innerHTML = '';
  progressContainer.innerHTML = '';
  doneContainer.innerHTML = '';

  let countTodo = 0, countProgress = 0, countDone = 0;
  const isAdmin = localStorage.getItem('admin_logged') === 'true';
  const sorted = [...localTasksFallback].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  sorted.forEach(task => {
    if (!task.subject) return;
    const card = createTaskCard(task, isAdmin);
    if (task.status === 'todo') { todoContainer.appendChild(card); countTodo++; }
    else if (task.status === 'progress') { progressContainer.appendChild(card); countProgress++; }
    else if (task.status === 'done') { doneContainer.appendChild(card); countDone++; }
  });

  document.getElementById('todoCount').innerText = countTodo;
  document.getElementById('progressCount').innerText = countProgress;
  document.getElementById('doneCount').innerText = countDone;
};

function createTaskCard(task, isAdmin) {
  const div = document.createElement('div');
  div.className = 'task-card';
  div.id = `task-${task.id}`;

  const isUrgent = checkIsUrgent(task.deadline);
  const deadlineHTML = task.deadline
    ? `<span class="task-deadline ${isUrgent ? 'urgent' : ''}"><i class="fa-regular fa-clock"></i> ${formatDeadline(task.deadline)}</span>`
    : '<span></span>';

  let actionsHTML = '';
  if (isAdmin) {
    let btns = '';
    if (task.status === 'todo') {
      btns = `<button class="task-action-btn" onclick="moveTask('${task.id}','progress')">PROSES &rarr;</button>`;
    } else if (task.status === 'progress') {
      btns = `<button class="task-action-btn" onclick="moveTask('${task.id}','todo')">&larr; BELUM</button>
              <button class="task-action-btn" onclick="moveTask('${task.id}','done')">SELESAI &rarr;</button>`;
    } else if (task.status === 'done') {
      btns = `<button class="task-action-btn" onclick="moveTask('${task.id}','progress')">&larr; PROSES</button>`;
    }
    actionsHTML = `<div class="task-actions">${btns}<button class="task-action-btn btn-delete" onclick="deleteTask('${task.id}')">HAPUS</button></div>`;
  }

  div.innerHTML = `
    <div class="task-subject">${esc(task.subject)}</div>
    <div class="task-desc">${esc(task.desc)}</div>
    <div class="task-meta">
      ${deadlineHTML}
      <span class="tag-label" style="background:${priorityColor(task.priority)};margin:0;box-shadow:1px 1px 0 #000;font-size:0.6rem;">${(task.priority||'medium').toUpperCase()}</span>
    </div>
    ${actionsHTML}
  `;
  return div;
}

// Tambah tugas baru (Admin Only)
window.addNewTask = function (subject, desc, deadline, priority) {
  if (!tasksRef) return;
  const newTask = {
    subject: subject.trim(),
    desc: desc.trim(),
    deadline: deadline || '',
    priority: priority || 'medium',
    status: 'todo',
    timestamp: Date.now()
  };
  tasksRef.push(newTask);
  if (window.logAdminActivity) window.logAdminActivity(`Menambahkan tugas: "${newTask.subject}"`);
};

// Pindahkan status tugas (Admin Only) — Firebase update() langsung ke node spesifik
window.moveTask = function (taskId, newStatus) {
  if (!tasksRef) return;
  const taskName = localTasksFallback.find(t => t.id === taskId)?.subject || 'tugas';
  tasksRef.child(taskId).update({ status: newStatus });
  if (window.logAdminActivity) window.logAdminActivity(`Status tugas "${taskName}" → [${newStatus.toUpperCase()}]`);
};

// Hapus tugas permanen (Admin Only)
window.deleteTask = function (taskId) {
  if (!confirm("Hapus tugas ini secara permanen dari semua perangkat?")) return;
  const taskName = localTasksFallback.find(t => t.id === taskId)?.subject || 'tugas';
  if (tasksRef) tasksRef.child(taskId).remove();
  if (window.logAdminActivity) window.logAdminActivity(`Menghapus tugas: "${taskName}"`);
};

// Helpers
function priorityColor(p) {
  if (p === 'high') return 'var(--pink)';
  if (p === 'low') return 'var(--mint)';
  return 'var(--yellow-light)';
}
function checkIsUrgent(d) {
  if (!d) return false;
  const parts = d.split('-');
  if (parts.length !== 3) return false;
  const dl = new Date(+parts[0], +parts[1]-1, +parts[2]);
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.ceil((dl - today) / 86400000) <= 2;
}
function formatDeadline(d) {
  if (!d) return '';
  const parts = d.split('-');
  if (parts.length !== 3) return d;
  const date = new Date(+parts[0], +parts[1]-1, +parts[2]);
  const m = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${date.getDate()} ${m[date.getMonth()]}`;
}
function esc(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[t]||t));
}
function tasksEscapeHTML(str) { return esc(str); }
