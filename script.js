// Hero slider + 터치 스와이프
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');
  const slider = document.querySelector('.hero-slider');

  let current = 0;
  let autoTimer = null;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goTo(idx);
      restartAuto();
    });
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      restartAuto();
    });

    nextBtn.addEventListener('click', () => {
      next();
      restartAuto();
    });
  }

  function startAuto() {
    autoTimer = setInterval(next, 6000);
  }

  function restartAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // 🔹 터치 스와이프 추가
  if (slider) {
    let touchStartX = 0;
    let touchEndX = 0;
    let touched = false;

    slider.addEventListener(
      'touchstart',
      (e) => {
        if (!e.touches || !e.touches.length) return;
        touchStartX = e.touches[0].clientX;
        touchEndX = touchStartX;
        touched = true;
      },
      { passive: true }
    );

    slider.addEventListener(
      'touchmove',
      (e) => {
        if (!touched || !e.touches || !e.touches.length) return;
        touchEndX = e.touches[0].clientX;
      },
      { passive: true }
    );

    slider.addEventListener('touchend', () => {
      if (!touched) return;
      const diff = touchEndX - touchStartX;
      const threshold = 40; // 스와이프 인식 최소 거리(px)

      if (Math.abs(diff) > threshold) {
        if (diff < 0) {
          // 왼쪽으로 스와이프 → 다음 슬라이드
          next();
        } else {
          // 오른쪽으로 스와이프 → 이전 슬라이드
          prev();
        }
        restartAuto();
      }

      touched = false;
    });
  }

  startAuto();
})();

// Gallery modal with arrows
(function () {
  const modal = document.getElementById('gallery-modal');
  if (!modal) return;

  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const closeEls = modal.querySelectorAll('[data-modal-close]');
  const prevBtn = modal.querySelector('[data-modal-prev]');
  const nextBtn = modal.querySelector('[data-modal-next]');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  let currentIndex = -1;

  function openAt(index) {
    if (!galleryItems.length) return;
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const src = item.getAttribute('data-image');
    const caption = item.getAttribute('data-caption') || '';
    modalImage.src = src;
    modalCaption.textContent = caption;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modalCaption.textContent = '';
    currentIndex = -1;
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      openAt(idx);
    });
  });

  closeEls.forEach((el) => {
    el.addEventListener('click', () => {
      closeModal();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex === -1) return;
      openAt(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex === -1) return;
      openAt(currentIndex + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      if (currentIndex !== -1) openAt(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      if (currentIndex !== -1) openAt(currentIndex + 1);
    }
  });
})();

// ✅ Travel Log Day 탭
(function () {
  const dayTabs = document.querySelectorAll('.day-tab');
  const dayCards = document.querySelectorAll('.day-card');

  if (!dayTabs.length || !dayCards.length) return;

  dayTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetDay = tab.dataset.day;

      // 탭 active 변경
      dayTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Day 카드 표시 변경
      dayCards.forEach((card) => {
        if (card.dataset.day === targetDay) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  });
})();
