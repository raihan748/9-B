/* ==========================================================================
   PARTICLES + INTERSECTION OBSERVER ANIMATIONS
   Visual enhancement layer — murni efek, tidak menyentuh logika Firebase
   ========================================================================== */

(function () {
  'use strict';

  /* ---- 1. PARTICLE CANVAS ---- */
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

    const COLORS = ['#A78BFA', '#60A5FA', '#4ECCA3', '#F4A261', '#F87171'];
    const particles = [];
    const COUNT = Math.min(55, Math.floor((W * H) / 20000));

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
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

        // Draw lines to nearby particles
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

  /* ---- 2. INTERSECTION OBSERVER — FADE-UP ANIMATION ---- */
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

  /* ---- 3. TAB SWITCH — RE-TRIGGER ANIMATIONS ---- */
  function observeTabSwitches() {
    const navBtns = document.querySelectorAll('.nav-tab-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          const activeTab = document.querySelector('.tab-content.active');
          if (!activeTab) return;
          const cards = activeTab.querySelectorAll('.anim-fade-up');
          cards.forEach(c => {
            c.classList.remove('visible');
            void c.offsetWidth;
            c.classList.add('visible');
          });
        }, 50);
      });
    });
  }

  /* ---- 4. SMOOTH COUNTER ANIMATION FOR KANBAN COUNTS ---- */
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

  // Observe counter DOM changes
  function initCounterAnimations() {
    const counters = ['todoCount', 'progressCount', 'doneCount'];
    counters.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      let lastVal = parseInt(el.innerText) || 0;
      new MutationObserver(() => {
        const newVal = parseInt(el.innerText) || 0;
        if (newVal !== lastVal) {
          lastVal = newVal;
          animateCounter(el, newVal);
        }
      }).observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

  /* ---- 5. TYPING CURSOR ON BROADCAST TEXT ---- */
  function initBroadcastCursor() {
    const broadcastEl = document.getElementById('broadcastText');
    if (!broadcastEl) return;
    const cursor = document.createElement('span');
    cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:currentColor;margin-left:3px;animation:blink-cursor 1s step-end infinite;vertical-align:middle;';
    const style = document.createElement('style');
    style.textContent = '@keyframes blink-cursor{0%,100%{opacity:1}50%{opacity:0}}';
    document.head.appendChild(style);
    broadcastEl.parentNode.insertBefore(cursor, broadcastEl.nextSibling);
  }

  /* ---- 6. NAV SCROLL EFFECT ---- */
  function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.style.boxShadow = '0 8px 32px rgba(0,0,0,0.6)';
      } else {
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
      }
    }, { passive: true });
  }

  /* ---- INIT ALL ---- */
  document.addEventListener('DOMContentLoaded', () => {
    // Particles hanya di desktop (hemat performa mobile)
    if (window.innerWidth > 768) initParticles();

    setTimeout(() => {
      initScrollAnimations();
      observeTabSwitches();
      initCounterAnimations();
      initBroadcastCursor();
      initNavScroll();
    }, 300);
  });

})();
