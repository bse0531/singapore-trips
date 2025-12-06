// Hero slider
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');

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
