/* ==========================================================================
   CLASS 9B CLEAN & FAST INTERACTION ENGINE (NO AI SLOP)
   Lightweight, performant, and focused on genuine utility:
   1. Live WITA Digital Clock & Simple Greeting
   2. Clean Scroll Fade-in Animations
   3. Tab Switch Observer
   4. Smooth Kanban Task Counters
   ========================================================================== */

(function () {
  'use strict';

  /* ---- 1. LIVE WITA DIGITAL CLOCK & CLEAN GREETING ---- */
  function initLiveClock() {
    const clockEl = document.getElementById('heroLiveClock');
    const greetingEl = document.getElementById('heroLiveGreeting');
    if (!clockEl && !greetingEl) return;

    function update() {
      const now = new Date();
      const hours = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');

      let greeting = 'Selamat Datang di Kelas 9B';
      if (hours >= 4 && hours < 11) {
        greeting = 'Selamat Pagi, Semangat Belajar 9B!';
      } else if (hours >= 11 && hours < 15) {
        greeting = 'Selamat Siang, Istirahat & Sholat Dzuhur';
      } else if (hours >= 15 && hours < 18) {
        greeting = 'Selamat Sore, Jangan Lupa Belajar';
      } else {
        greeting = 'Selamat Malam, Istirahat Cukup untuk Esok';
      }

      if (greetingEl) {
        greetingEl.textContent = greeting;
      }
      if (clockEl) {
        clockEl.textContent = `${String(hours).padStart(2, '0')}:${mins}:${secs} WITA`;
      }
    }

    update();
    setInterval(update, 1000);
  }

  /* ---- 2. CLEAN SCROLL FADE-IN (INTERSECTION OBSERVER) ---- */
  function initScrollAnimations() {
    const targets = document.querySelectorAll(
      '.brut-card, .widget-header, .task-card, .piket-member, .capsule-message-card, .video-card'
    );

    targets.forEach((el, idx) => {
      el.classList.add('anim-fade-up');
      const delay = Math.min(idx % 4, 3);
      if (delay > 0) el.classList.add(`anim-delay-${delay}`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    targets.forEach(el => observer.observe(el));
  }

  /* ---- 3. TAB SWITCH OBSERVER ---- */
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

  /* ---- 4. SMOOTH KANBAN COUNTERS ---- */
  function animateCounter(el, target) {
    const current = parseInt(el.innerText) || 0;
    if (current === target) return;
    const diff = target - current;
    const step = diff > 0 ? 1 : -1;
    const delay = Math.max(30, Math.abs(600 / diff));
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
          lastVal = newVal;
          animateCounter(el, newVal);
        }
      }).observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

  /* ---- INIT ON DOM READY ---- */
  document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    setTimeout(() => {
      initScrollAnimations();
      observeTabSwitches();
      initCounterAnimations();
    }, 150);
  });

})();
