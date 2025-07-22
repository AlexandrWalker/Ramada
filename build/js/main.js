gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      offset: -100,
    }
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });
  gsap.ticker.lagSmoothing(0);



  const offerBodySlider = new Swiper(".offer__body--slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".offer-button-next",
      prevEl: ".offer-button-prev",
    },
  });

  const offerContentSlider = new Swiper(".offer__content--slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    autoHeight: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    grabCursor: false,
    mousewheel: false,
    allowTouchMove: false,
  });

  offerBodySlider.controller.control = offerContentSlider;
  offerContentSlider.controller.control = offerBodySlider;

  const diversityHeadSlider = new Swiper(".diversity__head--slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    autoHeight: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    grabCursor: false,
    mousewheel: false,
    allowTouchMove: false,
  });

  const diversityBodySlider = new Swiper(".diversity__body--slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 1000,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".diversity-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  diversityHeadSlider.controller.control = diversityBodySlider;
  diversityBodySlider.controller.control = diversityHeadSlider;



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
  function burgerNav() {
    const header = document.getElementById('header');
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerClose = document.querySelector('.burger-close');
    const overlay = document.querySelector('.burger-overlay');
    const elements = document.querySelectorAll('.burger-menu__list a');

    /**
     * Переключает видимость меню.
     */
    const toggleMenu = () => {
      const isOpened = burgerBtn.classList.toggle('burger-btn--opened');
      burgerMenu.classList.toggle('burger-menu--opened', isOpened);
      lenis.stop();
      header.classList.toggle('show');

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
    burgerBtn.addEventListener('click', toggleMenu);

    // Закрытие меню по клику на кнопку закрытия или на overlay
    [burgerClose, overlay].forEach((element) => element.addEventListener('click', closeMenu));

    // Закрытие меню при клике вне области меню и бургера
    document.addEventListener('click', (event) => {
      if (!burgerMenu.contains(event.target) && !burgerBtn.contains(event.target)) {
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
  }
  burgerNav();



  /**
   * Управляет аккардионом
   */
  function accordionFunc() {
    if (document.querySelector('.accordion-parent')) {
      document.querySelectorAll('.accordion-parent').forEach((accordionContainer) => {

        var accordionHead = accordionContainer.querySelectorAll('.accordion'),
          accordionActiveClass = 'accordion-active',
          accordionActive = accordionContainer.getElementsByClassName(accordionActiveClass);

        Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
          accordionItem.addEventListener('click', function (e) {
            e.stopPropagation();

            if (accordionActive.length > 0 && accordionActive[0] !== this) {
              accordionActive[0].classList.remove(accordionActiveClass);
            }
            this.classList.toggle(accordionActiveClass);

            if (this.classList.contains(accordionActiveClass)) {
              accordionContainer.classList.add('activated');
            } else {
              accordionContainer.classList.remove('activated');
            }
            // ScrollTrigger.refresh();

            window.addEventListener('keydown', (e) => {
              if (e.key === "Escape") {
                accordionItem.classList.remove(accordionActiveClass)
                accordionContainer.classList.remove('activated');
              }
            });

            document.addEventListener('click', (e) => {
              const withinBoundaries = e.composedPath().includes(accordionItem);

              if (!withinBoundaries) {
                accordionItem.classList.remove(accordionActiveClass);
                accordionContainer.classList.remove('activated');
              }
            })
          });
        });
      });
    }
  }
  accordionFunc();



  /**
   * Кнопка куки
   */
  if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
    const cookiesNotify = document.getElementById('plate-cookie');

    if (cookiesNotify) {
      cookiesNotify.style.display = 'block';
    }
  }



  /**
   * Инициализация формы набора символов
   */
  const form = document.querySelector('.form');
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
   * Инициализация TransferElements
   */
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



  $(window).on('resize load', function () {
    if (window.innerWidth < '600' && window.innerWidth != '600') {
      const burgerClose = document.querySelector('.burger-close');
      burgerClose.classList.add('btn');
      burgerClose.classList.add('btn--black');
    }
  });



  /**
   * GSAP
   */
  const hero = document.querySelector('.hero')
  if (hero) {

    $(window).on('resize load', function () {
      // if (window.innerWidth > '834' && window.innerWidth != '834') {

      //   const smoothImgY = '-50%';

      //   const smoothImgTopBefore = '26rem';
      //   const smoothImgTopAfter = '26rem';

      //   const heroTop = 4.53;

      //   const h1TitleFsBefore = '20rem';
      //   const h1TitleFsAfter = '14rem';

      //   const pTitleFontSizeBefore = '10rem';
      //   const pTitleLeftPosBefore = '82.5rem';
      //   const pTitleTopPosBefore = '6.8rem';
      //   const pTitleColorBefore = '#1A1919';

      //   const pTitleFontSizeAfter = '6rem';
      //   const pTitleLeftPosAfter = '55.5rem';
      //   const pTitleTopPosAfter = '5.7rem';
      //   const pTitleColorAfter = '#ffffff';

      //   const heroHeadGapBefore = '3rem';
      //   const heroHeadGapAfter = '8rem';

      //   const heroBtnBottomBefore = '-3rem';
      //   const heroBtnBottomAfter = '1.3rem';

      //   heroAnimate(smoothImgY,
      //     smoothImgTopBefore,
      //     smoothImgTopAfter,
      //     heroTop,
      //     h1TitleFsBefore,
      //     h1TitleFsAfter,
      //     pTitleFontSizeBefore,
      //     pTitleLeftPosBefore,
      //     pTitleTopPosBefore,
      //     pTitleColorBefore,
      //     pTitleFontSizeAfter,
      //     pTitleLeftPosAfter,
      //     pTitleTopPosAfter,
      //     pTitleColorAfter,
      //     heroHeadGapBefore,
      //     heroHeadGapAfter,
      //     heroBtnBottomBefore,
      //     heroBtnBottomAfter
      //   );
      // } else if (window.innerWidth < '834' && window.innerWidth > '600') {

      //   const smoothImgY = '-30%';

      //   const smoothImgTopBefore = '11.8rem';
      //   const smoothImgTopAfter = '13.9rem';

      //   const heroTop = 3.2;

      //   const h1TitleFsBefore = '8rem';
      //   const h1TitleFsAfter = '5.6rem';

      //   const pTitleFontSizeBefore = '4rem';
      //   const pTitleLeftPosBefore = '39rem';
      //   const pTitleTopPosBefore = '2.7rem';
      //   const pTitleColorBefore = '#1A1919';

      //   const pTitleFontSizeAfter = '2.4rem';
      //   const pTitleLeftPosAfter = '24rem';
      //   const pTitleTopPosAfter = '2.2rem';
      //   const pTitleColorAfter = '#ffffff';

      //   const heroHeadGapBefore = '2rem';
      //   const heroHeadGapAfter = '6rem';

      //   const heroBtnBottomBefore = '-3.7rem';
      //   const heroBtnBottomAfter = '-1.2rem';

      //   heroAnimate(smoothImgY,
      //     smoothImgTopBefore,
      //     smoothImgTopAfter,
      //     heroTop,
      //     h1TitleFsBefore,
      //     h1TitleFsAfter,
      //     pTitleFontSizeBefore,
      //     pTitleLeftPosBefore,
      //     pTitleTopPosBefore,
      //     pTitleColorBefore,
      //     pTitleFontSizeAfter,
      //     pTitleLeftPosAfter,
      //     pTitleTopPosAfter,
      //     pTitleColorAfter,
      //     heroHeadGapBefore,
      //     heroHeadGapAfter,
      //     heroBtnBottomBefore,
      //     heroBtnBottomAfter
      //   );
      // } else if (window.innerWidth <= '600') {

      //   const smoothImgY = '-36%';

      //   const smoothImgTopBefore = '11.8rem';
      //   const smoothImgTopAfter = '13.9rem';

      //   const heroTop = 3.2;

      //   const h1TitleFsBefore = '6rem';
      //   const h1TitleFsAfter = '4.2rem';

      //   const pTitleFontSizeBefore = '10rem';
      //   const pTitleLeftPosBefore = '82.5rem';
      //   const pTitleTopPosBefore = '6.8rem';
      //   const pTitleColorBefore = '#1A1919';

      //   const pTitleFontSizeAfter = '6rem';
      //   const pTitleLeftPosAfter = '55.5rem';
      //   const pTitleTopPosAfter = '5.7rem';
      //   const pTitleColorAfter = '#ffffff';

      //   const heroHeadGapBefore = '3rem';
      //   const heroHeadGapAfter = '8rem';

      //   const heroBtnBottomBefore = '-3rem';
      //   const heroBtnBottomAfter = '1.3rem';

      //   heroAnimate(smoothImgY,
      //     smoothImgTopBefore,
      //     smoothImgTopAfter,
      //     heroTop,
      //     h1TitleFsBefore,
      //     h1TitleFsAfter,
      //     pTitleFontSizeBefore,
      //     pTitleLeftPosBefore,
      //     pTitleTopPosBefore,
      //     pTitleColorBefore,
      //     pTitleFontSizeAfter,
      //     pTitleLeftPosAfter,
      //     pTitleTopPosAfter,
      //     pTitleColorAfter,
      //     heroHeadGapBefore,
      //     heroHeadGapAfter,
      //     heroBtnBottomBefore,
      //     heroBtnBottomAfter
      //   );
      // }

      if (window.innerWidth > '834' && window.innerWidth != '834') {

        const smoothImgY = '-50%';

        const smoothImgTopBefore = '26rem';
        const smoothImgTopAfter = '29rem';

        const heroTop = 4.53;

        const h1TitleFsBefore = '20rem';
        const h1TitleFsAfter = '14rem';

        const pTitleFontSizeBefore = '10rem';
        const pTitleLeftPosBefore = '82.5rem';
        const pTitleTopPosBefore = '6.8rem';
        const pTitleColorBefore = '#1A1919';

        const pTitleFontSizeAfter = '6rem';
        const pTitleLeftPosAfter = '55.5rem';
        const pTitleTopPosAfter = '5.7rem';
        const pTitleColorAfter = '#ffffff';

        const heroHeadGapBefore = '3rem';
        const heroHeadGapAfter = '8rem';

        const heroBtnBottomBefore = '-3rem';
        const heroBtnBottomAfter = '1.3rem';

        heroAnimate(smoothImgY,
          smoothImgTopBefore,
          smoothImgTopAfter,
          heroTop,
          h1TitleFsBefore,
          h1TitleFsAfter,
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
        return;
      }
    });
  }

  function heroAnimate(smoothImgY, smoothImgTopBefore, smoothImgTopAfter, heroTop, h1TitleFsBefore, h1TitleFsAfter, pTitleFontSizeBefore, pTitleLeftPosBefore, pTitleTopPosBefore, pTitleColorBefore, pTitleFontSizeAfter, pTitleLeftPosAfter, pTitleTopPosAfter, pTitleColorAfter, heroHeadGapBefore, heroHeadGapAfter, heroBtnBottomBefore, heroBtnBottomAfter
  ) {
    const heroHead = hero.querySelector('.hero__head')
    const heroHeight = hero.offsetHeight

    const smoothImg = hero.querySelector('[data-animation="smooth-img"]')
    const heroTitle = hero.querySelector('[data-animation="hero-title"]')
    const heroBtn = hero.querySelector('[data-animation="hero-btn"]')

    const h1Title = heroTitle.querySelector('h1')
    const pTitle = heroTitle.querySelector('p')
    const spanTitle = heroTitle.querySelector('span')

    gsap.fromTo(smoothImg, {
      "--top": smoothImgTopBefore,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
      },
      onComplete: function () {
        hero.classList.add('animatedClass');
      },
    }, {
      "--top": smoothImgTopAfter,
      y: smoothImgY,
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
      }
    });

    gsap.fromTo(h1Title, {
      "--fontsize": h1TitleFsBefore,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--fontsize": h1TitleFsAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(pTitle, {
      "--fontsize": pTitleFontSizeBefore,
      "--left-pos": pTitleLeftPosBefore,
      "--top-pos": pTitleTopPosBefore,
      "--color": pTitleColorBefore,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--fontsize": pTitleFontSizeAfter,
      "--left-pos": pTitleLeftPosAfter,
      "--top-pos": pTitleTopPosAfter,
      "--color": pTitleColorAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(spanTitle, {
      "--color": "#C40D3C",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--color": "#ffffff",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(heroHead, {
      "--gap": heroHeadGapBefore,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--gap": heroHeadGapAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(heroBtn, {
      "--btn-bottom": heroBtnBottomBefore,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--btn-bottom": heroBtnBottomAfter,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').remove();
}