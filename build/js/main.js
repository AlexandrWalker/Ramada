gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      offset: -60,
    }
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });
  gsap.ticker.lagSmoothing(0);



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
  // $(window).on('resize load', function () {
  //   if (window.innerWidth > '1440' && window.innerWidth != '1440') {
  //     const paddingTop = '170px';
  //     heroAnimation()
  //   }
  // });


  // function heroAnimation() {

    const hero = document.querySelector('.hero')
    const smoothImg = document.querySelector('[data-animation="smooth-img"]')

    const heroHeight = hero.offsetWidth;

    gsap.fromTo(smoothImg, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "clamp(top 170px)",
        end: () => `+=${1.5 * heroHeight}`,
        pin: true,
        scrub: true,
      },
      // onStart: function () {
      onComplete: function () {
        hero.classList.add('animatedClass');
      },
    }, {
      y: '-50%',
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "clamp(top 170px)",
        end: () => `+=${1.5 * heroHeight}`,
        pin: true,
        scrub: true,
      }
    });

    // const heroTitle = document.querySelector('[data-animation="hero-title"]');
    // const heroText = document.querySelector('[data-animation="hero-text"]');
    // if (heroTitle) {
    //   gsap.fromTo(heroTitle,
    //     { y: '15%' },
    //     {
    //       y: '-35%',
    //       scrollTrigger: {
    //         trigger: hero,
    //         start: 'top 90%',
    //         end: 'bottom top',
    //         scrub: true,
    //       },
    //     }
    //   );
    // }


    const title = document.querySelector('[data-animation="hero-title"]');
    const h1Title = title.querySelector('h1');
    const pSubtitle = title.querySelector('p');
    const spanSubtitle = title.querySelector('span');
    const heroHead = document.querySelector('.hero__head');
    const heroBtn = document.querySelector('.hero__btn');

    gsap.fromTo(h1Title, {
      "--h1-fontsize": "20rem",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--h1-fontsize": "14rem",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(pSubtitle, {
      "--p-fontsize": "10rem",
      "--p-left-pos": "82.5rem",
      "--p-top-pos": "6.8rem",
      "--p-color": "#1A1919",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--p-fontsize": "6rem",
      "--p-left-pos": "55.5rem",
      "--p-top-pos": "5.7rem",
      "--p-color": "#ffffff",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(spanSubtitle, {
      "--span-color": "#C40D3C",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--span-color": "#ffffff",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(heroHead, {
      "--heroHead-gap": "3rem",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--heroHead-gap": "8rem",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });

    gsap.fromTo(heroBtn, {
      "--hero-btn-bottom": "-3rem",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    }, {
      "--hero-btn-bottom": "1.3rem",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        pin: true,
        // start: "top top",
        start: "clamp(top 170px)",
        // end: () => "+=" + h1Title.clientHeight,
        end: () => `+=${1.5 * heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  // }

  // function createST() {
  //   gsap.to(smoothImg, { // animate all .smooth-img
  //     // scale: 1.176,
  //     scale: 1.2,
  //     ease: "none", // no easing for scroll 
  //     scrollTrigger: {
  //       trigger: hero,
  //       start: "clamp(top 80%)", // clamp() animaton so that it only starts when user starts scrolling
  //       end: "bottom 20%",
  //       scrub: true,
  //       markers: true
  //     }
  //   });
  // }

  // // Page load animation
  // gsap.to(smoothImg, {
  //   // scale: 0.8,
  //   scale: 0.8,
  //   onComplete: () => createST() // on complete call function
  // });

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').remove();
}