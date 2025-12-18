/**
 * Preloader
 */
const preloader = document.querySelector('.preloader');

document.documentElement.classList.add('html-no-scroll');
document.body.classList.add('no-scroll');

window.addEventListener('load', () => {
  preloader.addEventListener(
    'transitionend',
    () => {
      document.documentElement.classList.remove('html-no-scroll');
      document.body.classList.remove('no-scroll');
      preloader.classList.add('preloader-none');
    },
    { once: true }
  );

  preloader.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {

  const checkEditMode = document.querySelector('.bx-panel-toggle-on') ?? null;

  /**
   * Подключение ScrollTrigger
   */
  gsap.registerPlugin(ScrollTrigger);

  // Отключаем реакцию ScrollTrigger на изменение высоты окна на мобильных
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Фиксированная высота видимой области (устойчивая на iOS Safari)
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      offset: 0,
    }
  });
  lenis.on('resize scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /**
   * ---------------------------
   * Global state
   * ---------------------------
   */
  let isSliding = false;    // transition ongoing flag
  let slideQueue = 0;       // queued slide actions count
  let lastNav = null;       // last navigation params {dir, speed}
  /**
   * Инициализация слайдеров
   */
  if (document.querySelector('.swiper')) {

    function initCustomSwiper(selector) {
      const swiper = new Swiper(selector, {
        slidesPerView: 1,
        loop: false,
        speed: 0,
        initialSlide: 0,
        allowTouchMove: false,

        init: false,

        pagination: {
          el: ".swiper-pagination--gallery",
          clickable: true,
        },
      });

      const container = document.querySelector(selector);
      const controls = container.querySelectorAll('.slider__control');
      const slidingAT = 800;
      let slidingBlocked = false;

      controls.forEach(el => {
        el.addEventListener('click', () =>
          handleControlClick(el.classList.contains('swiper-button-next'))
        );
      });

      function handleControlClick(isRight) {
        if (slidingBlocked) return;
        slidingBlocked = true;

        const currentIndex = swiper.activeIndex;
        let index = isRight ? currentIndex + 1 : currentIndex - 1;

        if (index >= swiper.slides.length) index = 0;
        if (index < 0) index = swiper.slides.length - 1;

        animateTo(index, isRight);
      }

      function animateTo(index, isRight) {
        const newActive = swiper.slides[index];
        const curActive = swiper.slides[swiper.activeIndex];

        if (!newActive || !curActive) {
          slidingBlocked = false;
          return;
        }

        curActive.classList.remove('s--active', 's--active-prev');

        const newImg = newActive.querySelector('img');
        const curImg = curActive.querySelector('img');

        if (newImg) {
          newImg.style.transition = 'none';
          newImg.style.transform = 'scale(1.3)';
          newImg.getBoundingClientRect(); // force layout
        }

        newActive.classList.add('s--active');
        if (!isRight) newActive.classList.add('s--active-prev');

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

        const oldPrev = container.querySelector('.swiper-slide.s--prev');
        if (oldPrev) oldPrev.classList.remove('s--prev');

        let prevIndex = index - 1;
        if (prevIndex < 0) prevIndex = swiper.slides.length - 1;
        swiper.slides[prevIndex].classList.add('s--prev');

        swiper.slideTo(index, 0);

        setTimeout(() => {
          slidingBlocked = false;
        }, slidingAT);
      }

      // Swipe detection
      let startX = null;
      const threshold = 50;

      container.addEventListener('touchstart', e => {
        if (e.touches && e.touches[0]) startX = e.touches[0].clientX;
      }, { passive: true });

      container.addEventListener('touchend', e => {
        if (startX === null) return;
        const endX = e.changedTouches?.[0]?.clientX ?? null;
        if (endX === null) return;
        handleSwipe(startX, endX);
        startX = null;
      });

      container.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        startX = e.clientX;
      });

      container.addEventListener('pointerup', e => {
        if (startX === null) return;
        handleSwipe(startX, e.clientX);
        startX = null;
      });

      function handleSwipe(sx, ex) {
        const dx = ex - sx;
        if (Math.abs(dx) < threshold) return;
        dx < 0 ? handleControlClick(true) : handleControlClick(false);
      }

      // Keyboard
      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') handleControlClick(true);
        if (e.key === 'ArrowLeft') handleControlClick(false);
      });

      const fraction = container.querySelector('.fraction');
      if (fraction) {
        fractionCustomSlider(swiper);
      } else {
        controlCustomSwiper(swiper);
      }
    }

    const swiperControl = new Swiper(".swiper__control", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      grabCursor: false,
      mousewheel: false,
      allowTouchMove: false,
      touchEvents: {
        prevent: true
      },
    });

    const diversityHeadSlider = new Swiper(".diversity__head--slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      grabCursor: false,
      mousewheel: false,
      allowTouchMove: false,
      touchEvents: {
        prevent: true
      },
    });

    const diversityBodySlider = new Swiper(".diversity__body--slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      centeredSlides: true,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: ".diversity-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      touchEvents: {
        prevent: true
      },
    });

    diversityHeadSlider.controller.control = diversityBodySlider;
    diversityBodySlider.controller.control = diversityHeadSlider;

    const eventsCalendarSlider = new Swiper(".events__calendar--slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: ".calendar-button-next",
      },
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        835: {
          slidesPerGroup: 1,
          slidesPerView: 2,
        },
      },
    });

    const eventsOtherSlider = new Swiper(".events__other--slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,

      centeredSlides: false,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      loop: false,
      simulateTouch: true,
      watchOverflow: true,

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },

      freeMode: {
        enabled: false,
        momentum: false,
        momentumBounce: false,
        sticky: true,
      },

      navigation: {
        prevEl: ".events-button-prev",
        nextEl: ".events-button-next",
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        601: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        835: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      on: {
        slideChangeTransitionStart: function () {
          isSliding = true;
        },
        slideChangeTransitionEnd: function () {
          const swiperName = document.querySelector('.events__other--slider');
          const swiper_wrapper = swiperName.querySelector('.swiper-wrapper');
          const style = window.getComputedStyle(swiper_wrapper);
          const matrix = style.transform || style.webkitTransform;
          const slideWidth = eventsOtherSlider.slides[0] ? eventsOtherSlider.slides[0].offsetWidth : 0;

          isSliding = false;
        },
        slideChangeTransitionStart: () => { isSliding = true; },
        slideChangeTransitionEnd: () => { isSliding = false; },
      }
    });

    const reviewsSlider = new Swiper(".reviews__slider", {
      slidesPerGroup: 1,
      slidesPerView: 'auto',
      spaceBetween: 10,
      grabCursor: true,
      speed: 600,

      centeredSlides: false,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      loop: false,
      simulateTouch: true,
      watchOverflow: true,

      freeMode: {
        enabled: false,
        momentum: false,
        momentumBounce: false,
        sticky: true,
      },

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },

      navigation: {
        prevEl: ".reviews-button-prev",
        nextEl: ".reviews-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        601: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        835: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      on: {
        slideChangeTransitionStart: function () {
          isSliding = true;
        },
        slideChangeTransitionEnd: function () {
          const swiperName = document.querySelector('.reviews__slider');
          const swiper_wrapper = swiperName.querySelector('.swiper-wrapper');
          const style = window.getComputedStyle(swiper_wrapper);
          const matrix = style.transform || style.webkitTransform;
          const slideWidth = reviewsSlider.slides[0] ? reviewsSlider.slides[0].offsetWidth : 0;

          isSliding = false;
        },
        slideChangeTransitionStart: () => { isSliding = true; },
        slideChangeTransitionEnd: () => { isSliding = false; },
      }
    });

    const reviewsBodySlider = new Swiper(".reviews__slider--corp", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,

      centeredSlides: false,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      loop: false,
      simulateTouch: true,
      watchOverflow: true,

      freeMode: {
        enabled: false,
        momentum: false,
        momentumBounce: false,
        sticky: true,
      },

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },

      navigation: {
        prevEl: ".reviews-button-prev",
        nextEl: ".reviews-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        601: {
          slidesPerView: 2,
          spaceBetween: 20,
        }
      },
      on: {
        slideChangeTransitionStart: function () {
          isSliding = true;
        },
        slideChangeTransitionEnd: function () {
          const swiperName = document.querySelector('.reviews__slider--corp');
          const swiper_wrapper = swiperName.querySelector('.swiper-wrapper');
          const style = window.getComputedStyle(swiper_wrapper);
          const matrix = style.transform || style.webkitTransform;
          const slideWidth = reviewsBodySlider.slides[0] ? reviewsBodySlider.slides[0].offsetWidth : 0;

          isSliding = false;
        },
        slideChangeTransitionStart: () => { isSliding = true; },
        slideChangeTransitionEnd: () => { isSliding = false; },
      }
    });

    const entertBodySlider = new Swiper(".entert__body--slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,

      centeredSlides: false,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      loop: false,
      simulateTouch: true,
      watchOverflow: true,

      freeMode: {
        enabled: false,
        momentum: false,
        momentumBounce: false,
        sticky: true,
      },

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },

      navigation: {
        prevEl: ".entert-button-prev",
        nextEl: ".entert-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      breakpoints: {
        601: {
          slidesPerView: 2,
          spaceBetween: 20,
          loopAdditionalSlides: 2,
        },
        835: {
          slidesPerView: 3,
          spaceBetween: 20,
          loopAdditionalSlides: 3,
        },
      },
      on: {
        slideChangeTransitionStart: function () {
          isSliding = true;
        },
        slideChangeTransitionEnd: function () {
          const swiperName = document.querySelector('.entert__body--slider');
          const swiper_wrapper = swiperName.querySelector('.swiper-wrapper');
          const style = window.getComputedStyle(swiper_wrapper);
          const matrix = style.transform || style.webkitTransform;
          const slideWidth = entertBodySlider.slides[0] ? entertBodySlider.slides[0].offsetWidth : 0;

          isSliding = false;
        },
        slideChangeTransitionStart: () => { isSliding = true; },
        slideChangeTransitionEnd: () => { isSliding = false; },
      }
    });

    const roomsItemSlider = new Swiper(".rooms__item--slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      loop: true,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      touchEvents: {
        prevent: true
      },
    });

    const bookingBodySlider = new Swiper(".booking__body--slider", {
      slidesPerGroup: 1,
      slidesPerView: 'auto',
      spaceBetween: 10,
      loop: true,
      speed: 600,

      centeredSlides: false,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      loop: false,
      simulateTouch: true,
      watchOverflow: true,

      freeMode: {
        enabled: false,
        momentum: false,
        momentumBounce: false,
        sticky: true,
      },

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },
      navigation: {
        prevEl: ".booking-button-prev",
        nextEl: ".booking-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        381: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        601: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      },
      on: {
        slideChangeTransitionStart: function () {
          isSliding = true;
        },
        slideChangeTransitionEnd: function () {
          const swiperName = document.querySelector('.booking__body--slider');
          const swiper_wrapper = swiperName.querySelector('.swiper-wrapper');
          const style = window.getComputedStyle(swiper_wrapper);
          const matrix = style.transform || style.webkitTransform;
          const slideWidth = bookingBodySlider.slides[0] ? bookingBodySlider.slides[0].offsetWidth : 0;

          isSliding = false;
        },
        slideChangeTransitionStart: () => { isSliding = true; },
        slideChangeTransitionEnd: () => { isSliding = false; },
      }
    });

    const studioSliderBig = new Swiper(".studio__slider--big", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 0,

      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: ".studio-button-prev",
        nextEl: ".studio-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      touchEvents: {
        prevent: true
      },
    });

    const studioSliderMin = new Swiper(".studio__slider--min", {
      slidesPerGroup: 1,
      slidesPerView: 2,
      spaceBetween: 10,
      direction: "horizontal",

      speed: 600,
      watchSlidesProgress: true,
      grabCursor: false,
      mousewheel: false,
      allowTouchMove: false,
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        601: {
          direction: "vertical",
          spaceBetween: 20,
        }
      },
    });

    studioSliderBig.controller.control = studioSliderMin;
    studioSliderMin.controller.control = studioSliderBig;

    const offersSlider = new Swiper(".offers__slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,

      centeredSlides: false,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      loop: false,
      simulateTouch: true,
      watchOverflow: true,

      freeMode: {
        enabled: false,
        momentum: false,
        momentumBounce: false,
        sticky: true,
      },

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true
      },

      navigation: {
        prevEl: ".offers-button-prev",
        nextEl: ".offers-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
      },
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        601: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        835: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      },
      on: {
        slideChangeTransitionStart: function () {
          isSliding = true;
        },
        slideChangeTransitionEnd: function () {
          const swiperName = document.querySelector('.offers__slider');
          const swiper_wrapper = swiperName.querySelector('.swiper-wrapper');
          const style = window.getComputedStyle(swiper_wrapper);
          const matrix = style.transform || style.webkitTransform;
          const slideWidth = offersSlider.slides[0] ? offersSlider.slides[0].offsetWidth : 0;

          isSliding = false;
        },
        slideChangeTransitionStart: () => { isSliding = true; },
        slideChangeTransitionEnd: () => { isSliding = false; },
      }
    });

    const residenceSliderDesc = new Swiper(".residence__slider", {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 60,
      loop: true,
      speed: 600,
      navigation: {
        nextEl: ".residence-button-next",
        prevEl: ".residence-button-prev",
      },
      mousewheel: false,
      grabCursor: false,
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        835: {
          spaceBetween: 20,
          autoHeight: false,
        }
      },
    });

    const templateProducts = document.querySelectorAll('.template-product');

    if (templateProducts.length != 0) {
      templateProducts.forEach(templateProduct => {

        const templateProductSliders = templateProduct.querySelectorAll('.template-product__content');

        if (templateProductSliders.length > 1) {
          templateProductSliders.forEach(templateProductSlider => {
            const templateProductSliderMini = templateProductSlider.querySelector('.template-product__slider--mini');
            const templateProductSliderBig = templateProductSlider.querySelector('.template-product__slider--big');
            const templateProductSliderPrev = templateProductSlider.querySelector('.template-product-button-prev');
            const templateProductSliderNext = templateProductSlider.querySelector('.template-product-button-next');
            templateSlider(templateProductSliderMini, templateProductSliderBig, templateProductSliderPrev, templateProductSliderNext);
          });
        } else {
          const templateProductSliderMini = templateProduct.querySelector('.template-product__slider--mini');
          const templateProductSliderBig = templateProduct.querySelector('.template-product__slider--big');
          const templateProductSliderPrev = templateProduct.querySelector('.template-product-button-prev');
          const templateProductSliderNext = templateProduct.querySelector('.template-product-button-next');
          templateSlider(templateProductSliderMini, templateProductSliderBig, templateProductSliderPrev, templateProductSliderNext);
        }

        function templateSlider(slider1, slider2, prev, next) {
          const templateSliderMini = new Swiper(slider1, {
            slidesPerView: 3,
            spaceBetween: 10,
            speed: 800,

            grabCursor: false,
            mousewheel: false,
            watchSlidesProgress: true,
            touchEvents: {
              prevent: true
            },
            breakpoints: {
              769: {
                spaceBetween: 20,
              },
            },
          });

          const templateSliderBig = new Swiper(slider2, {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,

            grabCursor: true,
            mousewheel: {
              forceToAxis: true,
            },
            thumbs: {
              swiper: templateSliderMini,
            },
            navigation: {
              prevEl: prev,
              nextEl: next,
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            touchEvents: {
              prevent: true
            },
          });
        }

      });
    }

    const templateProductSliderSeating = new Swiper('.template-product__slider--seating', {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      loop: true,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        prevEl: '.seating-button-prev',
        nextEl: '.seating-button-next',
      },
      pagination: {
        el: ".swiper-pagination--seating",
        type: "bullets",
        clickable: true,
      },
      touchEvents: {
        prevent: true
      },
      breakpoints: {
        601: {
          pagination: {
            el: ".swiper-pagination--seating",
            type: "fraction",
            clickable: true,
          },
        }
      },
      on: {
        slideChange: function () {

          const realIndex = this.realIndex;
          const seatingList = document.querySelector('.seating-list');
          const seatingListItems = seatingList.querySelectorAll('li');

          if (seatingListItems[realIndex]) {
            for (let i = 0; seatingListItems[i]; i++) {
              seatingListItems[i].classList.remove('seating-active')
            }
            seatingListItems[realIndex].classList.add('seating-active');
          }
        }
      }
    });

    function fractionCustomSlider(swiper) {
      swiper.on("slideChange afterInit init", function () {

        let currentSlide = this.realIndex + 1;

        document.querySelector('.fraction').innerHTML = `
      <span class="fraction-current">
      ${currentSlide < 10 ? currentSlide : currentSlide}
      </span> 
      / 
      <span class="fraction-total">
        ${this.slides.length}
      </span>`;
      });

      swiper.init();

      controlCustomSwiper(swiper);
    }

    const offerBodySider = document.querySelector('.offer__body--slider');
    if (offerBodySider) {
      initCustomSwiper('.offer__body--slider');
    }

    const galleryBodySlider = document.querySelector('.gallery__body--slider');
    if (galleryBodySlider) {
      initCustomSwiper('.gallery__body--slider');
    }

    function controlCustomSwiper(swiper) {
      swiper.init();
      swiper.controller.control = swiperControl;
      swiperControl.controller.control = swiper;
    }

    if (document.querySelector('.offers__slider')) {
      const swiperSlider = offersSlider;

      swiperSliderFunc(swiperSlider);
    }

    if (document.querySelector('.entert__body--slider')) {
      const swiperSlider = entertBodySlider;

      swiperSliderFunc(swiperSlider);
    }

    if (document.querySelector('.events__other--slider')) {
      const swiperSlider = eventsOtherSlider;

      swiperSliderFunc(swiperSlider);
    }

    if (document.querySelector('.reviews__slider')) {
      const swiperSlider = reviewsSlider;

      swiperSliderFunc(swiperSlider);
    }

    if (document.querySelector('.reviews__slider--corp')) {
      const swiperSlider = reviewsBodySlider;

      swiperSliderFunc(swiperSlider);
    }

    if (document.querySelector('.booking__body--slider')) {
      const swiperSlider = bookingBodySlider;

      swiperSliderFunc(swiperSlider);
    }

    function swiperSliderFunc(swiperSlider) {
      let isTouching = false;

      swiperSlider.el.addEventListener('touchstart', () => {
        isTouching = true;
        swiperSlider.params.freeMode.enabled = true;
      });

      swiperSlider.el.addEventListener('touchend', () => {
        isTouching = false;
        swiperSlider.params.freeMode.enabled = false;
      });

      swiperSlider.el.addEventListener('wheel', (e) => {
        if (e.ctrlKey || Math.abs(e.deltaX) > 0) {
          swiperSlider.params.freeMode.enabled = true;
          clearTimeout(swiperSlider._freeModeTimeout);
          swiperSlider._freeModeTimeout = setTimeout(() => {
            swiperSlider.params.freeMode.enabled = false;
          }, 400);
        }
      });

      function processQueue() {
        if (!lastNav) return;
        if (slideQueue <= 0) return;
        if (isSliding) return;

        slideQueue = Math.max(0, slideQueue - 1);
        const { dir, speed } = lastNav;

        if (dir === 'next') {
          swiperSlider.slideNext(speed);
        } else {
          swiperSlider.slidePrev(speed);
        }
      }

      (function tempoNav() {
        const nextBtn = document.querySelector('.swiper-button-next');
        const prevBtn = document.querySelector('.swiper-button-prev');
        let clickTimes = [];
        const WINDOW_MS = 800;

        function recordAndDecide() {
          const now = Date.now();
          clickTimes = clickTimes.filter(t => now - t < WINDOW_MS);
          clickTimes.push(now);
          const clicks = clickTimes.length;
          if (clicks >= 5) return { slides: Math.min(4, clicks - 1), speed: 180 };
          if (clicks >= 3) return { slides: 2, speed: 260 };
          if (clicks === 2) return { slides: 1, speed: 340 };
          return { slides: 1, speed: 200 };
        }

        function navHandler(dir) {
          const { slides, speed } = recordAndDecide();

          lastNav = { dir, speed };

          slideQueue += slides;

          processQueue();
        }
      })();
    }
  }

  /**
   * Расчёт ширины скроллбара старницы и добавление отступа в body при октрытии попапов
   */
  function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
  }

  /**
   * Управляет поведением меню-бургера.
   */
  (function burgerNav() {
    const header = document.getElementById('header');
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerClose = document.querySelector('.burger-close');
    const overlay = document.querySelector('.burger-overlay');
    const elements = document.querySelectorAll('.burger-menu__list a');
    const html = document.documentElement;

    /**
     * Переключает видимость меню.
     */
    const toggleMenu = () => {
      const isOpened = burgerBtn.classList.toggle('burger-btn--opened');
      burgerMenu.classList.toggle('burger-menu--opened', isOpened);
      lenis.stop();
      header.classList.toggle('show');
      // menuItemAnim();

      const width = getScrollbarWidth();
      document.body.style.paddingRight = width + 'px';
    };

    /**
     * Закрывает меню.
     */
    const closeMenu = () => {
      burgerBtn.classList.remove('burger-btn--opened');
      burgerMenu.classList.remove('burger-menu--opened');
      header.classList.remove('show');
      lenis.start();

      document.body.style.paddingRight = 0;
    };

    // Открытие/закрытие меню по клику на бургер
    burgerBtn.addEventListener('click', () => {
      toggleMenu();
      if (html.classList.contains('lenis-stopped')) {
        lenis.start();
      }
    });

    // Закрытие меню по клику на кнопку закрытия или на overlay
    [burgerClose, overlay].forEach((element) => element.addEventListener('click', closeMenu));

    // Закрытие меню при клике вне области меню и бургера
    document.addEventListener('click', (event) => {
      if (!burgerMenu.contains(event.target) && !burgerBtn.contains(event.target) && !header.contains(event.target)) {
        closeMenu();
      }
    });

    // Закрытие меню при нажатии на кнопку "Esc"
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    elements.forEach((element) => element.addEventListener('click', closeMenu));
  })();

  /**
   * Добавляет класс для бургер кнопки для смены стиля
   */
  $(window).on('resize', function () {
    if (window.innerWidth <= '834') {
      const burgerClose = document.querySelector('.burger-close');

      burgerClose.classList.add('btn');
      burgerClose.classList.add('btn--black');
      burgerClose.classList.add('btn--icon');
    }
  });

  /**
   * Управляет поведением меню-бургера.
   */
  (function headerFunc() {
    const header = document.getElementById('header');
    const firstSection = document.querySelector('section');
    let lastScrollTop = 1;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
      if (scrollPosition() > lastScrollTop && scrollPosition() > firstSection.offsetHeight) {
        header.classList.add('out');
      } else {
        header.classList.remove('out');
      }
      lastScrollTop = scrollPosition();
    })
  })();

  /**
   * Управляет аккордеоном
   */
  (function accordionFunc() {
    const accordionParents = document.querySelectorAll('.accordion-parent');
    if (!accordionParents.length) return;

    accordionParents.forEach(accordionContainer => {
      const accordionItems = accordionContainer.querySelectorAll('.accordion');
      const activeClass = 'accordion-active';

      // Закрытие при Escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          accordionItems.forEach(item => item.classList.remove(activeClass));
          accordionContainer.classList.remove('activated');
        }
      };

      // Закрытие при клике вне аккордеона
      const handleOutsideClick = (e) => {
        accordionItems.forEach(item => {
          if (!e.composedPath().includes(item)) {
            item.classList.remove(activeClass);
            accordionContainer.classList.remove('activated');
          }
        });
      };

      window.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleOutsideClick);

      accordionItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();

          // Закрываем другие открытые элементы
          accordionItems.forEach(i => {
            if (i !== item) i.classList.remove(activeClass);
          });

          // Переключаем текущий
          item.classList.toggle(activeClass);

          // Управляем классом контейнера
          if (item.classList.contains(activeClass)) {
            accordionContainer.classList.add('activated');
          } else {
            accordionContainer.classList.remove('activated');
          }
        });
      });
    });
  })();

  /**
   * Инициализация формы набора символов
   */
  const form = document.querySelector('form');
  if (form) {
    const inputElements = document.querySelectorAll('.form-input');
    const textareaElements = document.querySelectorAll('.form-textarea');
    const className = 'filled';

    inputElements.forEach(element => {
      element.addEventListener('input', function () {
        if (this.value.trim() !== '') {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      });
    });

    textareaElements.forEach(element => {
      element.addEventListener('input', function () {
        if (this.value.trim() !== '') {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      });
    });
  }

  /**
   * Смена класса для кнопки закрытия бургер меню
   */
  $(window).on('resize', function () {
    if (window.innerWidth < '600' && window.innerWidth != '600') {
      const burgerClose = document.querySelector('.burger-close');
      burgerClose.classList.add('btn');
      burgerClose.classList.add('btn--black');
    }
  });

  /**
   * Смена отзывов через фильтр
   */
  let filter = document.querySelector('.filter');
  if (filter) {
    const reviewsPage = document.querySelector('.reviews-page');
    if (reviewsPage) {
      let filter = reviewsPage.querySelector('.filter');
      const btns = $(filter).find('.filter__item');
      btns.on('click', function filterFunc() {
        btns.removeClass('filter__item--active')
        $(this).addClass('filter__item--active')
        const attr = $(this).data('reviews');
        $.get('./ajax/reviews-' + attr + '.html', function (data) {
          $('.reviews__items').html(data)
        })
      })
    } else {
      const btns = $('.filter__item');
      btns.on('click', function filterFunc() {
        btns.removeClass('filter__item--active')
        $(this).addClass('filter__item--active')
      })
    }
  }

  /**
   * Скрипт для тултипов блока Территория и инфраструктура 
   */
  (function infraFunc() {
    const infra = document.getElementById('infra');
    if (!infra) return;

    const tooltip = document.getElementById('infraTooltip');
    const img = tooltip.querySelector('img');
    const title = tooltip.querySelector('h6');
    const text = tooltip.querySelector('p');

    const isTouch = window.matchMedia('(hover: none)').matches;
    const GAP = 40;
    const PADDING = 30;

    const points = infra.querySelectorAll('.infra-point');
    let currentRequestId = 0;

    points.forEach(point => {
      const show = () => {
        const requestId = ++currentRequestId;

        tooltip.classList.remove('active');

        // очищаем предыдущее изображение
        img.src = '';
        title.textContent = point.dataset.title;
        text.textContent = point.dataset.text;

        const loader = new Image();
        loader.src = point.dataset.img;

        loader.onload = () => {
          // если уже наведена другая точка — выходим
          if (requestId !== currentRequestId) return;

          img.src = loader.src;

          // временно показываем tooltip для вычисления размеров
          tooltip.style.visibility = 'hidden';
          tooltip.style.display = 'block';

          requestAnimationFrame(() => {
            positionTooltip(point);
            tooltip.style.visibility = '';
            tooltip.classList.add('active');
          });
        };
      };

      const hide = () => {
        tooltip.classList.remove('active');
      };

      if (isTouch) {
        point.addEventListener('click', e => {
          e.stopPropagation();
          show();
        });
        document.addEventListener('click', hide);
      } else {
        point.addEventListener('mouseenter', show);
        point.addEventListener('mouseleave', hide);
      }
    });

    function positionTooltip(point) {
      const infraRect = infra.getBoundingClientRect();
      const pointRect = point.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      const x = pointRect.left - infraRect.left + pointRect.width / 2;
      const y = pointRect.top - infraRect.top + pointRect.height / 2;

      const spaceTop = y;
      const spaceBottom = infraRect.height - y;
      const spaceLeft = x;
      const spaceRight = infraRect.width - x;

      let vertical;
      if (spaceBottom >= tooltipRect.height + GAP) vertical = 'bottom';
      else if (spaceTop >= tooltipRect.height + GAP) vertical = 'top';
      else vertical = spaceBottom > spaceTop ? 'bottom' : 'top';

      const horizontal = spaceRight > spaceLeft ? 'right' : 'left';

      const top = vertical === 'top'
        ? y - tooltipRect.height - GAP
        : y + GAP;

      const left = horizontal === 'right'
        ? x
        : x - tooltipRect.width;

      tooltip.style.top =
        Math.max(PADDING, Math.min(top, infraRect.height - tooltipRect.height - PADDING)) + 'px';

      tooltip.style.left =
        Math.max(PADDING, Math.min(left, infraRect.width - tooltipRect.width - PADDING)) + 'px';

      tooltip.dataset.side = `${vertical}-${horizontal}`;
    }
  })();

  /**
   * Инициализация TransferElements
   */
  const transfer = document.querySelector('.transfer-elem-1');
  if (transfer) {
    $(window).on('resize load', function () {
      if (window.innerWidth <= 834) {
        if (document.querySelector('.transfer-pos-1')) {
          new TransferElements(
            {
              sourceElement: document.querySelector('.transfer-elem-1'),
              breakpoints: {
                834: {
                  targetElement: document.querySelector('.transfer-pos-1')
                }
              },
            }
          );
        }
      }
    });
  }
  if (document.querySelector('.menu')) {
    new TransferElements(
      {
        sourceElement: document.querySelector('.menu__head-social'),
        breakpoints: {
          600: {
            targetElement: document.querySelector('.menu')
          }
        },
      }
    );
  }
  if (document.querySelector('.concept')) {
    new TransferElements(
      {
        sourceElement: document.querySelector('.concept__img'),
        breakpoints: {
          600: {
            targetElement: document.querySelector('.concept__body')
          }
        },
      }
    );
  }

  /**
   *  Copyboard
   */
  const copyButton = document.querySelector(".contacts__item-copy");
  const copyText = document.querySelector(".contacts__item-text");
  if (copyButton && copyText) {
    copyButton.addEventListener("click", function () {
      navigator.clipboard.writeText(copyText.innerText).then(function () {
        console.log('Text copied to clipboard');
      }).catch(function (error) {
        console.error('Error:', error);
      });
    });
  }

  /**
   * Инициализация Fabcybox
   */
  Fancybox.bind('[data-fancybox]', {
    Html: {
      autoSize: false,
    },
    on: {
      'Carousel.ready': () => {
        lenis.stop();
      },
      destroy: () => {
        lenis.start();

        const tooltipPopup = document.getElementById('tooltipPopup')
        if (tooltipPopup) {
          const tooltipPopupBody = tooltipPopup.querySelector('.popup__body')
          tooltipPopupBody.innerHTML = '';
        }
      }
    }
  });

  /**
   * Скрипт для блока со скролом
   */
  (function () {
    const hall = document.querySelector('.hall');
    if (hall) {
      var len = $('.hall__item').length;
      $(window).on('resize load', function () {

        if (window.innerWidth < "834") {
          scroll = 0;
          inc = 0.06; // speed down
          inc2 = 0.06; // speed up
          scale = 1;
          var wH = document.documentElement.clientWidth

          $(window).on('scroll', function () {
            // Find the active element
            var $activeBlock = $('.active');
            var element = document.querySelector('.active');
            var h = element.clientHeight / 200;
            var distanceToTop = $activeBlock.offset().top - $(window).scrollTop();
            var top = window.pageYOffset;

            // Scroll direction checks
            if (scroll > top) {
              // Scrolling up
              if ($activeBlock.attr('data-index') != 1) {
                h = h * 200;
                if (distanceToTop > h) {
                  var $prevBlock = $activeBlock.prev();
                  $activeBlock.removeClass('active');
                  $prevBlock.addClass('active');
                  $($prevBlock).css('transform', 'scale(1)');
                  scale = 0.90; // set initial scale
                }
              }
            } else if (scroll < top) {
              // Scrolling down

              if (distanceToTop < 200 && $activeBlock.attr('data-index') != len) {
                var $nextBlock = $activeBlock.next();
                $activeBlock.removeClass('active');
                $nextBlock.addClass('active');
              }

              if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
                var $prevBlock = $activeBlock.prev();
                $($prevBlock).css('transform', 'scale(0.90)');
                scale = 0.90;
              }
            }

            // Scaling effect
            if (scroll > top) {
              // Scrolling up
              if (distanceToTop > 69) {
                var $activeBlock = $('.active');
                var prevCurrentBlock = $($activeBlock).prev();

                scale += inc2 / 0.006; // Increase scale on scroll up
                scale = Math.min(scale, 1); // Ensure max scale is 1

                $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

                // Adjust opacity of the over block
                var $overBlock = $(prevCurrentBlock).find('.over');
                var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
                $overBlock.css('opacity', newOpacity);
              }
            } else if (scroll < top) {
              // Scrolling down
              var $activeBlock = $('.active');
              var prevCurrentBlock = $($activeBlock).prev();

              scale -= inc * 0.06; // Decrease scale on scroll down
              if ($(prevCurrentBlock).attr('data-index') == 1) {
                $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.89, scale) + ')');
              }
              if ($(prevCurrentBlock).attr('data-index') == 2) {
                $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.92, scale) + ')');
              }

              // Adjust opacity of the over block
              var $overBlock = $(prevCurrentBlock).find('.over');
              var newOpacity = Math.min(0.6, (distanceToTop / h + 0.02)); // Calculate new opacity
              $overBlock.css('opacity', newOpacity);
            }

            if (distanceToTop < 0) {
              var $prevBlock = $activeBlock.prev();
              $($prevBlock).css('transform', 'scale(0.90)');
              scale = 0.90;
            }

            scroll = top; // Update scroll position
          });
        } else {
          scroll = 0;
          inc = 0.006; // speed down
          inc2 = 0.008; // speed up
          scale = 1;
          var wH = document.documentElement.clientWidth

          $(window).on('scroll', function () {
            // Find the active element
            var $activeBlock = $('.active');
            var element = hall.querySelector('.active');
            var h = element.clientHeight / 200;
            var distanceToTop = $activeBlock.offset().top - $(window).scrollTop() - 69;
            var top = window.pageYOffset;

            const hallCover = $('.hall__cover');

            if (hallCover) {

              const dataIndexItem = $activeBlock.attr('data-index');

              setTimeout(() => {
                const hallCoverImgs = document.querySelectorAll(".hall__cover-img");
                hallCoverImgs.forEach(hallCoverImg => {
                  if (dataIndexItem === hallCoverImg.getAttribute('data-index')) {
                    hallCoverImg.style.opacity = '1';
                  } else {
                    hallCoverImg.style.opacity = '0';
                  }
                });
              }, 200); // Задержка должна соответствовать длительности transition

            }

            // Scroll direction checks
            if (scroll > top) {
              // Scrolling up
              if ($activeBlock.attr('data-index') != 1) {
                h = h * 200;
                if (distanceToTop > h) {
                  var $prevBlock = $activeBlock.prev();
                  $activeBlock.removeClass('active');
                  $prevBlock.addClass('active');
                  $($prevBlock).css('transform', 'scale(1)');
                  scale = 0.92; // set initial scale
                }
              }
            } else if (scroll < top) {

              // Scrolling down
              if (distanceToTop < h && $activeBlock.attr('data-index') != len) {
                var $nextBlock = $activeBlock.next();
                $activeBlock.removeClass('active');
                $nextBlock.addClass('active');
                if (scale !== 1) {
                  scale = 1; // set to 1 when scrolling down
                }
              }

              if ($activeBlock.attr('data-index') == len && distanceToTop <= 0) {
                var $prevBlock = $activeBlock.prev();
                $($prevBlock).css('transform', 'scale(0.92)');
                scale = 0.92;
              }
            }

            // Scaling effect
            if (scroll > top) {
              // Scrolling up
              var $activeBlock = $('.active');
              var prevCurrentBlock = $($activeBlock).prev();

              scale += inc2; // Increase scale on scroll up
              scale = Math.min(scale, 1); // Ensure max scale is 1

              $(prevCurrentBlock).css('transform', 'scale(' + Math.max(1, scale) + ')');

              // Adjust opacity of the over block
              var $overBlock = $(prevCurrentBlock).find('.over');
              var newOpacity = Math.max(0, 1 - (distanceToTop / h)); // Calculate new opacity
              $overBlock.css('opacity', newOpacity);
            } else if (scroll < top) {
              // Scrolling down
              var $activeBlock = $('.active');
              var prevCurrentBlock = $($activeBlock).prev();

              scale -= inc; // Decrease scale on scroll down

              $(prevCurrentBlock).css('transform', 'scale(' + Math.max(0.90, scale) + ')');

              // Adjust opacity of the over block
              var $overBlock = $(prevCurrentBlock).find('.over');
              var newOpacity = Math.min(0.6, (distanceToTop / h)); // Calculate new opacity
              $overBlock.css('opacity', newOpacity);
            }

            if (distanceToTop < 0) {
              var $prevBlock = $activeBlock.prev();
              $($prevBlock).css('transform', 'scale(0.92)');
              scale = 0.92;
            }

            scroll = top; // Update scroll position
          });
        }
      });
    }
  })();

  /**
   * GSAP
   * 
   */
  const templatePrimary = document.querySelector('.template--primary');

  if (templatePrimary) {
    const elements = [
      { el: templatePrimary.querySelector('.template__bg'), anim: { opacity: 0, duration: 0.5 } },
      { el: templatePrimary.querySelector('.template__suptitle'), anim: { opacity: 0, y: -50, duration: 0.5 } },
      { el: templatePrimary.querySelector('.template__title'), anim: { opacity: 0, y: -50, duration: 0.5 } },
      { el: templatePrimary.querySelector('.template__body-icons'), anim: { opacity: 0, y: -50, duration: 0.5 } },
      { el: templatePrimary.querySelector('.template__body-down'), anim: { from: { opacity: 0, y: -50 }, to: { opacity: 1, y: 0, duration: 0.3 } } },
    ];

    const tl = gsap.timeline({ paused: true });

    elements.forEach(item => {
      if (!item.el) return;

      if (item.anim.from && item.anim.to) {
        tl.fromTo(item.el, item.anim.from, item.anim.to);
      } else {
        tl.from(item.el, { ...item.anim, stagger: { amount: 0.3 }, ease: "ease" });
      }

      scrollTriggerPlayer(item.el, tl);
    });

    ScrollTrigger.matchMedia({
      "(min-width: 835px)": function () {
        tl.from(templatePrimary, {
          ease: "none",
          scrollTrigger: {
            trigger: templatePrimary,
            start: "top 0%",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            scrub: true,
          },
        });
      }
    });
  }

  const foreachItem = document.querySelector('.foreach-items');

  if (foreachItem) {
    const items = foreachItem.querySelectorAll('.foreach-items > a.offers__item');

    if (items.length) {
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(items,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
          stagger: 0.1 // можно подстроить под желаемый интервал
        }
      );

      // Добавляем ScrollTrigger для всего блока, чтобы timeline запускался по скроллу
      scrollTriggerPlayer(foreachItem, tl);
    }
  }

  /**
   * Анимация первого блока гл. страницы
   */
  const hero = document.getElementById('hero');
  if (hero) {
    $(window).on('resize', function () {
      if (window.innerWidth > 834) {
        heroAnimateFunc();
      };
    });
    heroAnimateFunc();
  }

  function heroAnimate(smoothImgY, smoothImgTopBefore, smoothImgTopAfter, heroHeight, heroTop, h1TitleFsBefore, h1TitleFsAfter, h1TitleSvgBefore, h1TitleSvgAfter, pTitleFontSizeBefore, pTitleLeftPosBefore, pTitleTopPosBefore, pTitleColorBefore, pTitleFontSizeAfter, pTitleLeftPosAfter, pTitleTopPosAfter, pTitleColorAfter, heroHeadGapBefore, heroHeadGapAfter, heroBtnBottomBefore, heroBtnBottomAfter
  ) {
    const hero = document.getElementById('hero');
    const heroHead = hero.querySelector('.hero__head');

    const smoothImg = hero.querySelector('[data-animation="smooth-img"]');
    const heroTitle = hero.querySelector('[data-animation="hero-title"]');
    const heroBtn = hero.querySelector('[data-animation="hero-btn"]');

    const h1Title = heroTitle.querySelector('h1');
    const svgTitle = heroTitle.querySelector('svg');
    const pTitle = heroTitle.querySelector('p');
    const spanTitle = heroTitle.querySelector('span');

    gsap.from(hero, {
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop} `,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
      },
      onComplete: function () {
        hero.classList.add('animatedClass');
      },
    });

    gsap.fromTo(smoothImg, {
      "--top": smoothImgTopBefore,
      scale: 1,
    }, {
      "--top": smoothImgTopAfter,
      y: smoothImgY,
      scale: 1.263,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(h1Title, {
      "--fontsize": h1TitleFsBefore,
    }, {
      "--fontsize": h1TitleFsAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(svgTitle, {
      "--height": h1TitleSvgBefore,
    }, {
      "--height": h1TitleSvgAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(pTitle, {
      "--fontsize": pTitleFontSizeBefore,
      "--left-pos": pTitleLeftPosBefore,
      "--top-pos": pTitleTopPosBefore,
      "--color": pTitleColorBefore,
    }, {
      "--fontsize": pTitleFontSizeAfter,
      "--left-pos": pTitleLeftPosAfter,
      "--top-pos": pTitleTopPosAfter,
      "--color": pTitleColorAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(spanTitle, {
      "--color": "#C40D3C",
    }, {
      "--color": "#ffffff",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(heroHead, {
      "--gap": heroHeadGapBefore,
    }, {
      "--gap": heroHeadGapAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(heroBtn, {
      "--btn-bottom": heroBtnBottomBefore,
    }, {
      "--btn-bottom": heroBtnBottomAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,

      },
    });
  }

  function heroAnimateFunc() {
    if (!hero) return;

    // Удаляем старые ScrollTrigger'ы и твины для hero
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger && hero.contains(st.trigger)) st.kill();
    });
    gsap.killTweensOf(hero);
    gsap.killTweensOf(hero.querySelectorAll('*'));

    if (window.innerWidth > 834) {
      const smoothImgY = '-50%';
      const smoothImgTopBefore = '26rem';
      const smoothImgTopAfter = '30rem';
      const heroHeight = hero.offsetHeight;
      const heroTop = 4.7;
      const h1TitleFsBefore = '20rem';
      const h1TitleFsAfter = '14rem';
      const h1TitleSvgBefore = '14.3rem';
      const h1TitleSvgAfter = '9.3rem';
      const pTitleFontSizeBefore = '10rem';
      const pTitleLeftPosBefore = '82rem';
      const pTitleTopPosBefore = '6.7rem';
      const pTitleColorBefore = '#1A1919';
      const pTitleFontSizeAfter = '6rem';
      const pTitleLeftPosAfter = '55.5rem';
      const pTitleTopPosAfter = '5.7rem';
      const pTitleColorAfter = '#ffffff';
      const heroHeadGapBefore = '3rem';
      const heroHeadGapAfter = '8rem';
      const heroBtnBottomBefore = '-3rem';
      const heroBtnBottomAfter = '1.3rem';

      heroAnimate(
        smoothImgY,
        smoothImgTopBefore,
        smoothImgTopAfter,
        heroHeight,
        heroTop,
        h1TitleFsBefore,
        h1TitleFsAfter,
        h1TitleSvgBefore,
        h1TitleSvgAfter,
        pTitleFontSizeBefore,
        pTitleLeftPosBefore,
        pTitleTopPosBefore,
        pTitleColorBefore,
        pTitleFontSizeAfter,
        pTitleLeftPosAfter,
        pTitleTopPosAfter,
        pTitleColorAfter,
        heroHeadGapBefore,
        heroHeadGapAfter,
        heroBtnBottomBefore,
        heroBtnBottomAfter
      );
    } else {
      const headerHeight = document.querySelector('header').offsetHeight;
      const heroHeight = hero.offsetHeight;

      gsap.from(hero, {
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: `top +=${headerHeight}`,
          end: () => `+=${heroHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => hero.classList.add('animatedClass'),
      });
    }
  }

  /**
   * Анимация первого блока стр. Рестораны
   */
  const restaurant = document.getElementById('restaurant');
  if (restaurant) {
    $(window).on('resize', function () {
      restaurantAnimateFunc();
    });
    restaurantAnimateFunc();
  }

  function restaurantAnimate(smoothImgY, smoothImgTopBefore, smoothImgTopAfter, restaurantHeight, restaurantTop, h1TitleFsBefore, h1TitleFsAfter, h1TitleGapBefore, h1TitleGapAfter, restaurantHeadGapBefore, restaurantHeadGapAfter, restaurantBtnBottomBefore, restaurantBtnBottomAfter
  ) {
    const restaurant = document.getElementById('restaurant');
    const restaurantHead = restaurant.querySelector('.hero__head');

    const smoothImg = restaurant.querySelector('[data-animation="smooth-img"]');
    const restaurantTitle = restaurant.querySelector('[data-animation="hero-title"]');
    const restaurantBtn = restaurant.querySelector('[data-animation="hero-btn"]');

    const h1Title = restaurantTitle.querySelector('h1');
    const spanTitle = restaurantTitle.querySelector('span');

    gsap.from(restaurant, {
      ease: "none",
      scrollTrigger: {
        trigger: restaurant,
        start: `top +=${restaurantHeight / restaurantTop} `,
        end: () => `+=${restaurantHeight}`,
        pin: true,
        scrub: true,
      },
      onComplete: function () {
        restaurant.classList.add('animatedClass');
      },
    });

    gsap.fromTo(smoothImg, {
      "--top": smoothImgTopBefore,
      scale: 1,
    }, {
      "--top": smoothImgTopAfter,
      y: smoothImgY,
      scale: 1.263,
      ease: "none",
      scrollTrigger: {
        trigger: restaurant,
        start: `${-(restaurantHeight / restaurantTop) + ((restaurantHeight / restaurantTop) / 1.01)} +=${restaurantHeight / restaurantTop}`,
        end: () => `+=${restaurantHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(h1Title, {
      "--fontsize": h1TitleFsBefore,
      "--gap": h1TitleGapBefore,
    }, {
      "--fontsize": h1TitleFsAfter,
      "--gap": h1TitleGapAfter,
      ease: "none",
      scrollTrigger: {
        trigger: restaurant,
        start: `${-(restaurantHeight / restaurantTop) + ((restaurantHeight / restaurantTop) / 1.01)} +=${restaurantHeight / restaurantTop}`,
        end: () => `+=${restaurantHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(spanTitle, {
      "--color": "#C40D3C",
    }, {
      "--color": "#ffffff",
      ease: "none",
      scrollTrigger: {
        trigger: restaurant,
        start: `${-(restaurantHeight / restaurantTop) + ((restaurantHeight / restaurantTop) / 1.01)} +=${restaurantHeight / restaurantTop}`,
        end: () => `+=${restaurantHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(restaurantHead, {
      "--gap": restaurantHeadGapBefore,
    }, {
      "--gap": restaurantHeadGapAfter,
      ease: "none",
      scrollTrigger: {
        trigger: restaurant,
        start: `${-(restaurantHeight / restaurantTop) + ((restaurantHeight / restaurantTop) / 1.01)} +=${restaurantHeight / restaurantTop}`,
        end: () => `+=${restaurantHeight}`,
        scrub: true,

      },
    });

    gsap.fromTo(restaurantBtn, {
      "--btn-bottom": restaurantBtnBottomBefore,
    }, {
      "--btn-bottom": restaurantBtnBottomAfter,
      ease: "none",
      scrollTrigger: {
        trigger: restaurant,
        start: `${-(restaurantHeight / restaurantTop) + ((restaurantHeight / restaurantTop) / 1.01)} +=${restaurantHeight / restaurantTop}`,
        end: () => `+=${restaurantHeight}`,
        scrub: true,

      },
    });
  }

  function restaurantAnimateFunc() {
    if (!restaurant) return;

    // Удаляем старые ScrollTrigger'ы и твины для restaurant
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger && restaurant.contains(st.trigger)) st.kill();
    });
    gsap.killTweensOf(restaurant);
    gsap.killTweensOf(restaurant.querySelectorAll('*'));

    if (window.innerWidth > 834) {
      const smoothImgY = '-50%';
      const smoothImgTopBefore = '20.8rem';
      const smoothImgTopAfter = '30rem';
      const restaurantHeight = restaurant.offsetHeight;
      const restaurantTop = 4.7;
      const h1TitleFsBefore = '20rem';
      const h1TitleFsAfter = '14rem';
      const h1TitleGapBefore = '55.5rem';
      const h1TitleGapAfter = '37.5rem';
      const restaurantHeadGapBefore = '3rem';
      const restaurantHeadGapAfter = '8rem';
      const restaurantBtnBottomBefore = '-3rem';
      const restaurantBtnBottomAfter = '1.3rem';

      restaurantAnimate(
        smoothImgY,
        smoothImgTopBefore,
        smoothImgTopAfter,
        restaurantHeight,
        restaurantTop,
        h1TitleFsBefore,
        h1TitleFsAfter,
        h1TitleGapBefore,
        h1TitleGapAfter,
        restaurantHeadGapBefore,
        restaurantHeadGapAfter,
        restaurantBtnBottomBefore,
        restaurantBtnBottomAfter
      );
    } else {
      const headerHeight = document.querySelector('header').offsetHeight;
      const restaurantHeight = restaurant.offsetHeight;

      gsap.from(restaurant, {
        ease: "none",
        scrollTrigger: {
          trigger: restaurant,
          start: `top +=${headerHeight}`,
          end: () => `+=${restaurantHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => restaurant.classList.add('animatedClass'),
      });
    }
  }

  $(window).on('resize', function () {
    resizeObserverAnimation()
  });
  resizeObserverAnimation()

  function resizeObserverAnimation() {
    if (window.innerWidth > 834) {
      const footer = document.getElementById('footer');
      if (footer) {
        gsap.from(footer, {
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: `top 90%`,
            end: `top top`,
            scrub: true,
          },
          onStart: function () {
            footer.classList.add('animatedClass');
          },
        });
      }
    } else if (window.innerWidth <= 834 && window.innerWidth > 600) {
      const parallaxImgBoxes = document.querySelectorAll('[data-animation="parallax-box"]');
      if (parallaxImgBoxes != 0) {
        parallaxImgBoxes.forEach(parallaxImgBox => {
          if (parallaxImgBox.classList.contains('leaf--4')) {
            gsap.fromTo(parallaxImgBox,
              { y: '20%' },
              {
                y: '-35%',
                scrollTrigger: {
                  trigger: parallaxImgBox,
                  start: 'top 90%',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          } else if (parallaxImgBox.classList.contains('leaf--2')) {
            gsap.fromTo(parallaxImgBox,
              { y: '15%' },
              {
                y: '60%',
                scrollTrigger: {
                  trigger: parallaxImgBox,
                  start: 'top 90%',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }
        });
      }
    }
  }

  /**
   * Универсальное разбиение текста
   */
  const splittingMap = {
    'chars': el => new SplitType(el, { types: 'words, chars' }),
    'lines': el => new SplitType(el, { types: 'words, lines' }),
    'words': el => {
      const headings = el.querySelectorAll('h1, h2, h3, h4, h5');
      headings.forEach(heading => {
        if (heading) new SplitType(heading, { types: 'words, words' });
      });
    }
  };

  Object.keys(splittingMap).forEach(key => {
    const elements = document.querySelectorAll(`[data-splitting="${key}"]`);
    elements.forEach(el => {
      if (el) splittingMap[key](el);
    });
  });

  /**
   * Универсальная функция ScrollTrigger для timeline
   */
  function scrollTriggerPlayer(triggerElement, timeline, start = "top 95%") {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(1);
        timeline.pause();
      }
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: start,
      onEnter: () => timeline.play(),
      scrub: false
    });
  }

  /**
   * Создание timeline для элементов с опциональным stagger
   */
  function createTimeline(elements, animProps, stagger = 0.3, delay = 0) {
    if (!elements.length) return;
    const tl = gsap.timeline({ paused: true });
    tl.from(elements, { ...animProps, stagger, delay });
    scrollTriggerPlayer(elements[0].parentNode || elements[0], tl);
  }

  /**
   * Универсальная анимация для data-transform
   */
  const transformMap = [
    { selector: '[data-transform="reveal"]', target: "h1 div.word", anim: { opacity: 0, y: 50 }, stagger: 0.3, delay: 0.5 },
    { selector: '[data-transform="revealRotate"]', target: "div.word", anim: { opacity: 0, y: 100, rotationZ: 15 }, stagger: 0.4 },
    { selector: '[data-transform="fadeIn"]', target: "div.char", anim: { opacity: 0, duration: 0.3, ease: "power1.out" }, stagger: 0.025 },
    {
      selector: '[data-transform="fade"]', target: null, anim: el => el.getAttribute('data-rotation')
        ? { opacity: 0, y: 100, rotationZ: 10, duration: 0.8, delay: 0.3, ease: "ease" }
        : { opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: "ease" }, stagger: 0.8
    },
    { selector: '[data-transform="scale"]', target: null, anim: { opacity: 0, scale: 0.8, duration: 0.5, ease: "ease" }, stagger: 0.8 },
    { selector: '[data-transform="fadeUpRotate"]', target: null, anim: { y: "150%", opacity: 0, rotate: "20deg", transformOrigin: "0 50%", duration: 1, delay: 0.2, ease: "power4.out" }, stagger: 0.05 },
    { selector: '[data-transform="fadeUp"]', target: null, anim: { opacity: 0, y: 100, duration: 0.5, ease: "ease", }, stagger: 0.3 },
  ];

  /**
   * Запуск анимаций data-transform
   */
  transformMap.forEach(({ selector, target, anim, stagger = 0.3, delay = 0 }) => {
    document.querySelectorAll(selector).forEach(el => {
      const elements = target ? el.querySelectorAll(target) : [el];
      createTimeline(elements, typeof anim === "function" ? anim(el) : anim, stagger, delay);
    });
  });

  /**
   * Универсальный параллакс
   */
  const parallaxMap = [
    { selector: '[data-animation="parallax-img"]', img: true, from: { y: '-10%', scale: 0.9 }, to: { y: '10%', scale: 1 } },
    { selector: '[data-animation="parallax-block"]', img: false, from: { y: '-8%' }, to: { y: '8%' } },
    { selector: '[data-animation="parallax-box"]', img: false, from: el => el.classList.contains('leaf--2') ? { y: '15%' } : { y: '20%' }, to: el => el.classList.contains('leaf--2') ? { y: '60%' } : { y: '-35%' } }
  ];

  parallaxMap.forEach(({ selector, img, from, to }) => {
    document.querySelectorAll(selector).forEach(el => {
      const targetEl = img ? el.querySelector('img') : el;
      const fromProps = typeof from === "function" ? from(el) : from;
      const toProps = typeof to === "function" ? to(el) : to;
      gsap.fromTo(targetEl, fromProps, { ...toProps, scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom top', scrub: true } });
    });
  });


  // === iOS-safe ScrollTrigger refresh handler ===
  (function () {
    let resizeTimer;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    // Функция для стабильного пересчёта
    const safeRefresh = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;

        // Проверяем — реально ли изменился размер экрана
        const widthChanged = Math.abs(currentWidth - lastWidth) > 50;
        const heightChanged = Math.abs(currentHeight - lastHeight) > 150;

        if (widthChanged || heightChanged) {
          lastWidth = currentWidth;
          lastHeight = currentHeight;
          ScrollTrigger.refresh();
        }
      }, 250); // debounce 250ms — достаточно для всех платформ
    };

    // Реакция на изменение ориентации (особенно важно для iOS)
    window.addEventListener('orientationchange', () => {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });

    // Реакция на реальный resize, но фильтруем “мусорные” вызовы
    window.addEventListener('resize', safeRefresh);
  })();

  const calendarTargets = document.querySelectorAll('.target');
  if (calendarTargets.length > 0) {

    calendarTargets.forEach(calendarTarget => {
      const targetElement = calendarTarget.querySelector('span');
      const tooltip = calendarTarget.querySelector('.tooltip');
      const tooltipClose = calendarTarget.querySelector('.tooltip__close');

      targetElement.addEventListener('click', () => {
        if (window.innerWidth > 834) {
          calendarTarget.classList.add('show');
        } else {
          calendarTarget.setAttribute('data-fancybox', '');
          calendarTarget.setAttribute('href', '#tooltipPopup');
          tooltipInner(calendarTarget);
        }
      });

      tooltipClose.addEventListener('click', () => {
        calendarTarget.classList.remove('show');
      });
    });

    // Один глобальный обработчик для закрытия всех тултипов при клике вне
    document.addEventListener('click', (event) => {
      calendarTargets.forEach(calendarTarget => {
        const tooltip = calendarTarget.querySelector('.tooltip');
        if (!tooltip.contains(event.target) && !calendarTarget.contains(event.target)) {
          calendarTarget.classList.remove('show');
        }
      });
    });
  }

  function tooltipInner(calendarTarget) {
    const tooltipPopup = document.getElementById('tooltipPopup')
    const tooltipPopupBody = tooltipPopup.querySelector('.popup__body')
    const tooltipItems = calendarTarget.querySelector('.tooltip__items')

    tooltipPopupBody.appendChild(tooltipItems.cloneNode(true));
  }

  (function initAllSortToggles() {
    const sortBlocks = document.querySelectorAll('.sort');
    if (!sortBlocks.length) return; // если блоков нет, выходим

    sortBlocks.forEach(sortBlock => {
      const sortIcon = sortBlock.querySelector('.sort__icon');
      const sortSpan = sortBlock.querySelector('.sort__text span');

      if (!sortIcon || !sortSpan) return; // если внутри нет нужных элементов, пропускаем

      function toggleSortText() {
        sortSpan.textContent = sortSpan.textContent === 'новым' ? 'старым' : 'новым';
      }

      sortIcon.addEventListener('click', toggleSortText);
      sortSpan.addEventListener('click', toggleSortText);
    });
  })();

  /**
   * Кнопка куки
   */
  if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
    const cookiesNotify = document.getElementById('plate-cookie');

    if (cookiesNotify) {
      cookiesNotify.style.transform = 'translateX(0)';
    }
  }

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').style.transform = 'translateX(100%)';
  setInterval(() => document.getElementById('plate-cookie').remove(), 5000);
}