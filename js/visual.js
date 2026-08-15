/* ==========================================================================
   CLASS 9B CYBER-PREMIUM VISUAL & AUDIO FX ENGINE — 10.000X EDITION
   Features:
   1. Interactive Shooting Stars & Responsive Constellation Particle Mesh
   2. Pure Web Audio API Synthesizer (Futuristic Micro-Sounds)
   3. 3D Perspective Tilt & Dynamic Specular Glare Reflection on Cards
   4. Live Digital Clock & Time-of-Day Islamic Greeting Engine
   5. Confetti Celebration Burst on Task Completion
   6. Custom Smooth Ambient Micro-interactions
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIZER (CYBER SOUND DESIGN)
     ========================================================================== */
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('cyber_sound_enabled') !== 'false'; // Default ON

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  window.playCyberSound = function (type) {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'click') {
        // Soft high-tech pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'tab') {
        // Smooth chord sweep
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.02);
          gain.gain.setValueAtTime(0.05, now + i * 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.02);
          osc.stop(now + 0.14);
        });
      } else if (type === 'hover') {
        // Subtle micro-tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.02);
      } else if (type === 'success') {
        // Victory chime
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);
          gain.gain.setValueAtTime(0.08, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.26);
        });
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  function setupSoundToggleUI() {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;
    const updateIcon = () => {
      btn.innerHTML = isSoundEnabled
        ? '<i class="fa-solid fa-volume-high" style="color:var(--mint);"></i>'
        : '<i class="fa-solid fa-volume-xmark" style="color:var(--pink);"></i>';
      btn.title = isSoundEnabled ? 'Suara Cyber: AKTIF' : 'Suara Cyber: MATI';
    };
    updateIcon();

    btn.onclick = () => {
      isSoundEnabled = !isSoundEnabled;
      localStorage.setItem('cyber_sound_enabled', isSoundEnabled ? 'true' : 'false');
      updateIcon();
      if (isSoundEnabled) window.playCyberSound('click');
    };
  }

  /* ==========================================================================
     2. SHOOTING STARS & PARTICLE CANVAS
     ========================================================================== */
  function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    window.addEventListener('resize', () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    });

    const COLORS = ['#38bdf8', '#a855f7', '#34d399', '#f59e0b', '#f43f5e'];
    const particles = [];
    const COUNT = Math.min(60, Math.floor((W * H) / 18000));

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.6 + 0.1
      });
    }

    // Shooting Stars (Meteors)
    const meteors = [];
    function spawnMeteor() {
      if (Math.random() < 0.015 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * W,
          y: Math.random() * (H * 0.4),
          len: Math.random() * 90 + 50,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          color: Math.random() > 0.5 ? '#38bdf8' : '#a855f7'
        });
      }
    }

    let mouse = { x: -1000, y: -1000, active: false };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener('mouseleave', () => { mouse.active = false; });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });
    window.addEventListener('touchend', () => { mouse.active = false; });

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Meteors
      spawnMeteor();
      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.alpha -= 0.012;

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.len;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.len;

        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, meteor.color);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = Math.max(0, meteor.alpha);
        ctx.stroke();

        if (meteor.alpha <= 0 || meteor.x > W || meteor.y > H) {
          meteors.splice(m, 1);
        }
      }

      // Constellation Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Cursor attraction beam
        if (mouse.active) {
          const dxM = p.x - mouse.x, dyM = p.y - mouse.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = (1 - distM / 140) * 0.3;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Particle bonds
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ==========================================================================
     3. 3D CARD PERSPECTIVE TILT & SPECULAR GLARE REFLECTION
     ========================================================================== */
  function init3DCardTilt() {
    if (window.innerWidth <= 960) return; // Desktop only for optimal frame rates

    const cards = document.querySelectorAll('.brut-card, .stat-item, .task-card, .mading-item, .hero-brutal');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==========================================================================
     4. LIVE DIGITAL CLOCK & DYNAMIC ISLAMIC GREETING
     ========================================================================== */
  function initLiveGreetingAndClock() {
    const greetingEl = document.getElementById('heroLiveGreeting');
    const clockEl = document.getElementById('heroLiveClock');
    if (!greetingEl && !clockEl) return;

    function update() {
      const now = new Date();
      const hours = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');

      let greeting = 'Selamat Belajar di Kelas 9B!';
      let icon = '✨';

      if (hours >= 4 && hours < 11) {
        greeting = 'Selamat Pagi, Semangat Berprestasi 9B!';
        icon = '🌅';
      } else if (hours >= 11 && hours < 15) {
        greeting = 'Selamat Siang, Jangan Lupa Istirahat & Sholat Dzuhur!';
        icon = '☀️';
      } else if (hours >= 15 && hours < 18) {
        greeting = 'Selamat Sore, Waktunya Mengulang Materi!';
        icon = '🌇';
      } else {
        greeting = 'Selamat Malam, Istirahat Cukup untuk Esok Hari!';
        icon = '🌙';
      }

      if (greetingEl) {
        greetingEl.innerHTML = `<span style="margin-right:6px;">${icon}</span> ${greeting}`;
      }
      if (clockEl) {
        clockEl.innerText = `${String(hours).padStart(2, '0')}:${mins}:${secs} WITA`;
      }
    }

    update();
    setInterval(update, 1000);
  }

  /* ==========================================================================
     5. CELEBRATION CONFETTI BURST (FOR TASK COMPLETION)
     ========================================================================== */
  window.triggerConfetti = function () {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettis = [];
    const colors = ['#38bdf8', '#a855f7', '#34d399', '#fbbf24', '#f43f5e'];

    for (let i = 0; i < 70; i++) {
      confettis.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14 - 3,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    if (window.playCyberSound) window.playCyberSound('success');

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      confettis.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.35; // gravity
        c.rot += c.vRot;
        c.alpha -= 0.015;

        if (c.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate((c.rot * Math.PI) / 180);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = c.alpha;
          ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    animate();
  };

  /* ==========================================================================
     6. TAB SWITCH SOUND & ANIMATIONS
     ========================================================================== */
  function observeTabSwitches() {
    const navBtns = document.querySelectorAll('.nav-tab-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.playCyberSound) window.playCyberSound('tab');
        setTimeout(() => {
          const activeTab = document.querySelector('.tab-content.active');
          if (!activeTab) return;
          const cards = activeTab.querySelectorAll('.anim-fade-up');
          cards.forEach(c => {
            c.classList.remove('visible');
            void c.offsetWidth;
            c.classList.add('visible');
          });
          init3DCardTilt();
        }, 50);
      });

      btn.addEventListener('mouseenter', () => {
        if (window.playCyberSound) window.playCyberSound('hover');
      });
    });

    // General button sounds
    document.querySelectorAll('.brut-btn, .admin-login-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.playCyberSound) window.playCyberSound('click');
      });
    });
  }

  /* ==========================================================================
     7. INTERSECTION OBSERVER ANIMATIONS
     ========================================================================== */
  function initScrollAnimations() {
    const targets = document.querySelectorAll(
      '.brut-card, .widget-header, .task-card, .piket-member, .capsule-message-card, .video-card'
    );

    targets.forEach((el, idx) => {
      el.classList.add('anim-fade-up');
      const delay = Math.min(idx % 5, 4);
      if (delay > 0) el.classList.add(`anim-delay-${delay}`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    targets.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     8. COUNTER ANIMATIONS
     ========================================================================== */
  function animateCounter(el, target) {
    const current = parseInt(el.innerText) || 0;
    if (current === target) return;
    const diff = target - current;
    const step = diff > 0 ? 1 : -1;
    const delay = Math.max(30, Math.abs(1000 / diff));
    let val = current;
    const interval = setInterval(() => {
      val += step;
      el.innerText = val;
      if (val === target) clearInterval(interval);
    }, delay);
  }

  function initCounterAnimations() {
    const counters = ['todoCount', 'progressCount', 'doneCount'];
    counters.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      let lastVal = parseInt(el.innerText) || 0;
      new MutationObserver(() => {
        const newVal = parseInt(el.innerText) || 0;
        if (newVal !== lastVal) {
          if (id === 'doneCount' && newVal > lastVal) {
            window.triggerConfetti();
          }
          lastVal = newVal;
          animateCounter(el, newVal);
        }
      }).observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

  /* ==========================================================================
     INIT ALL ENGINES
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupSoundToggleUI();
    initLiveGreetingAndClock();

    setTimeout(() => {
      initScrollAnimations();
      observeTabSwitches();
      initCounterAnimations();
      init3DCardTilt();
    }, 300);
  });

})();
