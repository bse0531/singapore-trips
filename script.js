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

  prevBtn.addEventListener('click', () => {
    prev();
    restartAuto();
  });

  nextBtn.addEventListener('click', () => {
    next();
    restartAuto();
  });

  function startAuto() {
    autoTimer = setInterval(next, 6000);
  }

  function restartAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  startAuto();
})();

// Gallery modal
(function () {
  const modal = document.getElementById('gallery-modal');
  if (!modal) return;

  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const closeEls = modal.querySelectorAll('[data-modal-close]');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-image');
      const caption = item.getAttribute('data-caption') || '';
      modalImage.src = src;
      modalCaption.textContent = caption;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeEls.forEach((el) => {
    el.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalImage.src = '';
      modalCaption.textContent = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalImage.src = '';
      modalCaption.textContent = '';
    }
  });
})();
