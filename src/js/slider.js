function initCustomSlider(containerSelector) {
  const swiper = new Swiper('#' + containerSelector, {
    slidesPerView: 1,
    loop: false,
    speed: 0,
    initialSlide: 0,
    allowTouchMove: false,
    touchEvents: {
      prevent: true
    },
  });

  const $controls = document.querySelectorAll('#' + containerSelector + ' .offer-button');
  const slidingAT = 800;
  let slidingBlocked = false;

  $controls.forEach($el => {
    $el.addEventListener('click', () => controlClickHandler(swiper, $el.classList.contains('offer-button-next')))
  });

  function controlClickHandler(swiper, isRight) {
    if (slidingBlocked) return;
    slidingBlocked = true;

    const currentIndex = swiper.activeIndex;

    // Slide index depending on direction
    let index;
    if (isRight) {
      // Right control -> next slide
      index = currentIndex + 1;
      if (index >= swiper.slides.length) index = 0;
    } else {
      // Left control -> previous slide
      index = currentIndex - 1;
      if (index < 0) index = swiper.slides.length - 1;
    }

    animateTo(index, isRight);
  }

  // Extracted animation logic so we can call it from swipe handlers too
  function animateTo(index, isRight) {
    const $newActive = swiper.slides[index];
    const $curActive = swiper.slides[swiper.activeIndex];

    if (!$newActive || !$curActive) {
      slidingBlocked = false;
      return;
    }

    $curActive.classList.remove('s--active', 's--active-prev');

    const newImg = $newActive.querySelector('img');
    const curImg = $curActive.querySelector('img');

    // Prepare new image zoom start
    if (newImg) {
      newImg.style.transition = 'none';
      newImg.style.transform = 'scale(1.3)';
      // force layout
      newImg.getBoundingClientRect();
    }

    $newActive.classList.add('s--active');
    if (!isRight) $newActive.classList.add('s--active-prev'); // slide flowing correctly if moving left

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (newImg) {
          newImg.style.transition = 'transform 0.8s ease';
          newImg.style.transform = 'scale(1)';
        }
      });
    });

    if (curImg) {
      curImg.style.transition = 'transform 0.2s ease';
      curImg.style.transform = 'scale(1)';
    }

    const $oldPrev = document.querySelector('.offer__body-slide.s--prev');
    if ($oldPrev) $oldPrev.classList.remove('s--prev');

    let prevIndex = index - 1;
    if (prevIndex < 0) prevIndex = swiper.slides.length - 1;
    swiper.slides[prevIndex].classList.add('s--prev');

    // Inform Swiper of the new active index but keep JS-driven transition (duration 0)
    swiper.slideTo(index, 0);

    setTimeout(() => {
      slidingBlocked = false;
    }, slidingAT);
  }

  // --- Swipe detection (touch + pointer). We do a lightweight implementation and trigger animateTo() ---
  let startX = null;
  const threshold = 50; // minimum px to count as swipe (tweakable)
  const sliderEl = document.getElementById(containerSelector);

  // Touch events for mobile
  sliderEl.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) startX = e.touches[0].clientX;
  }, { passive: true });

  sliderEl.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : null;
    if (endX === null) { startX = null; return; }
    handleSwipe(startX, endX);
    startX = null;
  });

  // Pointer events for desktop dragging (mouse/touch stylus)
  sliderEl.addEventListener('pointerdown', (e) => {
    // only left mouse button
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX = e.clientX;
  });

  sliderEl.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    handleSwipe(startX, e.clientX);
    startX = null;
  });

  function handleSwipe(sx, ex) {
    const dx = ex - sx;
    if (Math.abs(dx) < threshold) return; // not enough movement

    if (dx < 0) {
      // swipe left -> go next
      controlClickHandler(true);
    } else {
      // swipe right -> go prev
      controlClickHandler(false);
    }
  }

  // Optional: keyboard arrows
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') controlClickHandler(true);
    if (e.key === 'ArrowLeft') controlClickHandler(false);
  });
}

// Используем для нескольких слайдеров
initCustomSlider('offerSlider');