gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      // offset: -180,
      offset: 0,
    }
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
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
    // grabCursor: true,
    // effect: "creative",
    // creativeEffect: {
    //   prev: {
    //     shadow: true,
    //     translate: ["-20%", 0, -1],
    //   },
    //   next: {
    //     translate: ["100%", 0, 0],
    //   },
    // },
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
    speed: 600,
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
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: ".events-button-prev",
      nextEl: ".events-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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
  });

  const reviewsSlider = new Swiper(".reviews__slider", {
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: ".reviews-button-prev",
      nextEl: ".reviews-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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
  });

  const reviewsBodySlider = new Swiper(".reviews__slider--corp", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: ".reviews-button-prev",
      nextEl: ".reviews-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      601: {
        slidesPerView: 2,
        spaceBetween: 20,
      }
    },
  });

  const entertBodySlider = new Swiper(".entert__body--slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 600,
    loop: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: ".entert-button-prev",
      nextEl: ".entert-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });

  const bookingBodySlider = new Swiper(".booking__body--slider", {
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: ".booking-button-prev",
      nextEl: ".booking-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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
  });

  const studioSliderBig = new Swiper(".studio__slider--big", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 0,
    // loop: true,
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
  });

  const studioSliderMin = new Swiper(".studio__slider--min", {
    slidesPerGroup: 1,
    slidesPerView: 2,
    spaceBetween: 10,
    direction: "horizontal",
    // loop: true,
    speed: 600,
    watchSlidesProgress: true,
    grabCursor: false,
    mousewheel: false,
    allowTouchMove: false,
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
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: ".offers-button-prev",
      nextEl: ".offers-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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
  });

  const residenceSliderDesc = new Swiper(".residence__slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    navigation: {
      nextEl: ".residence-button-next",
      prevEl: ".residence-button-prev",
    },
    // effect: 'fade',
    // fadeEffect: {
    //   crossFade: false
    // },
    mousewheel: false,
    grabCursor: false,
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
          speed: 600,
          loop: true,
          grabCursor: false,
          mousewheel: false,
          watchSlidesProgress: true,
          breakpoints: {
            769: {
              spaceBetween: 20,
            },
          },
        });

        const templateSliderBig = new Swiper(slider2, {
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 600,
          loop: true,
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

  const galleryBlockSlider = new Swiper(".gallery__block--slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    grabCursor: false,
    mousewheel: false,
    allowTouchMove: false,
  });

  const galleryBodySlider = new Swiper(".gallery__body--slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    init: false,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".gallery-button-next",
    },
    pagination: {
      el: ".swiper-pagination--gallery",
      clickable: true,
      // type: "fraction",
    },
    breakpoints: {
      601: {
        spaceBetween: 20,
      }
    },
  });

  galleryBodySlider.on("slideChange afterInit init", function () {

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

  galleryBodySlider.init();

  galleryBlockSlider.controller.control = galleryBodySlider;
  galleryBodySlider.controller.control = galleryBlockSlider;



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
   * Добавляет класс для бургер кнопки для смены стиля
   */
  $(window).on('resize load', function () {
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
  function headerFunc() {
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
  }
  headerFunc();



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
      cookiesNotify.style.transform = 'translateX(0)';
    }
  }



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



  $(window).on('resize load', function () {
    if (window.innerWidth < '600' && window.innerWidth != '600') {
      const burgerClose = document.querySelector('.burger-close');
      burgerClose.classList.add('btn');
      burgerClose.classList.add('btn--black');
    }
  });



  /**
   * GSAP
   * 
   * Анимация главного блока
   */
  const hero = document.getElementById('hero');
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

      if (window.innerWidth > 834) {

        const smoothImgY = '-50%';

        const smoothImgTopBefore = '26rem';
        // const smoothImgTopAfter = '31rem';
        const smoothImgTopAfter = '30rem';

        const heroHeight = hero.offsetHeight;
        // const heroTop = 4.53;
        // const heroTop = 4.7;
        const heroTop = 4.7;

        const h1TitleFsBefore = '20rem';
        const h1TitleFsAfter = '14rem';

        const pTitleFontSizeBefore = '10rem';
        // const pTitleLeftPosBefore = '82.5rem';
        const pTitleLeftPosBefore = '79.5rem';
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
          heroHeight,
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

  const restaurant = document.getElementById('restaurant');
  if (restaurant) {
    $(window).on('resize load', function () {
      if (window.innerWidth > '834' && window.innerWidth != '834') {

        const smoothImgY = '-50%';

        const smoothImgTopBefore = '20.8rem';
        const smoothImgTopAfter = '30rem';

        const heroHeight = restaurant.offsetHeight;
        const heroTop = 4.7;

        const h1TitleFsBefore = '20rem';
        const h1TitleFsAfter = '14rem';
        const h1TitleGapBefore = '55.5rem';
        const h1TitleGapAfter = '37.5rem';

        const heroHeadGapBefore = '3rem';
        const heroHeadGapAfter = '8rem';

        const heroBtnBottomBefore = '-3rem';
        const heroBtnBottomAfter = '1.3rem';

        restaurantAnimate(smoothImgY,
          smoothImgTopBefore,
          smoothImgTopAfter,
          heroHeight,
          heroTop,
          h1TitleFsBefore,
          h1TitleFsAfter,
          h1TitleGapBefore,
          h1TitleGapAfter,
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

  function heroAnimate(smoothImgY, smoothImgTopBefore, smoothImgTopAfter, heroHeight, heroTop, h1TitleFsBefore, h1TitleFsAfter, pTitleFontSizeBefore, pTitleLeftPosBefore, pTitleTopPosBefore, pTitleColorBefore, pTitleFontSizeAfter, pTitleLeftPosAfter, pTitleTopPosAfter, pTitleColorAfter, heroHeadGapBefore, heroHeadGapAfter, heroBtnBottomBefore, heroBtnBottomAfter
  ) {
    const hero = document.getElementById('hero');
    const heroHead = hero.querySelector('.hero__head');

    const smoothImg = hero.querySelector('[data-animation="smooth-img"]');
    const heroTitle = hero.querySelector('[data-animation="hero-title"]');
    const heroBtn = hero.querySelector('[data-animation="hero-btn"]');

    const h1Title = heroTitle.querySelector('h1');
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
        invalidateOnRefresh: true,
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
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
      },
    });
  }

  function restaurantAnimate(smoothImgY, smoothImgTopBefore, smoothImgTopAfter, heroHeight, heroTop, h1TitleFsBefore, h1TitleFsAfter, h1TitleGapBefore, h1TitleGapAfter, heroHeadGapBefore, heroHeadGapAfter, heroBtnBottomBefore, heroBtnBottomAfter
  ) {
    const hero = document.getElementById('restaurant');
    const heroHead = restaurant.querySelector('.hero__head');

    const smoothImg = restaurant.querySelector('[data-animation="smooth-img"]');
    const heroTitle = restaurant.querySelector('[data-animation="hero-title"]');
    const heroBtn = restaurant.querySelector('[data-animation="hero-btn"]');

    const h1Title = heroTitle.querySelector('h1');
    const spanTitle = heroTitle.querySelector('span');

    gsap.from(hero, {
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: `top +=${heroHeight / heroTop} `,
        end: () => `+=${heroHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
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
        invalidateOnRefresh: true
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
        trigger: hero,
        start: `${-(heroHeight / heroTop) + ((heroHeight / heroTop) / 1.01)} +=${heroHeight / heroTop}`,
        end: () => `+=${heroHeight}`,
        scrub: true,
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
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
        invalidateOnRefresh: true
      },
    });
  }

  $(window).on('resize load', function () {
    if (window.innerWidth > '834') {

      const footer = document.getElementById('footer');
      if (footer) {
        gsap.from(footer, {
          // gsap.fromTo(footer, {
          //   "y": 0,
          // }, {
          //   "y": '-100%',
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: `top 90%`,
            end: `top top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
          onStart: function () {
            footer.classList.add('animatedClass');
          },
        });
      }

      // if (window.innerWidth <= '834') {
      //   const fitnessItems = document.querySelectorAll('.fitness__item');

      //   fitnessItems.forEach(fitnessItem => {
      //   const fitnessItemImg = fitnessItem.querySelector('.fitness__item-img');

      //   fitnessItemImg.setAttribute('data-animation', 'parallax-img');
      //   });
      // }

    } else if (window.innerWidth <= '834' && window.innerWidth > '600' && window.innerWidth != '600') {
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
      // const parallaxItem = document.querySelector('[data-animation="parallax-img"]');
      // if (parallaxItem) {
      //   const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
      //   parallaxImgContainers.forEach(parallaxImgContainer => {
      //     const image = parallaxImgContainer.querySelector('img');
      //     gsap.fromTo(image,
      //       { y: '-10%' },
      //       {
      //         y: '10%',
      //         scrollTrigger: {
      //           trigger: parallaxImgContainer,
      //           start: 'top 90%',
      //           end: 'bottom top',
      //           scrub: true,
      //         },
      //       }
      //     );
      //   });
      // }
    }
    // else if (window.innerWidth <= '600') {
    //   const parallaxItem = document.querySelector('[data-animation="parallax-img"]');
    //   if (parallaxItem) {
    //     const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
    //     parallaxImgContainers.forEach(parallaxImgContainer => {
    //       const image = parallaxImgContainer.querySelector('img');
    //       gsap.fromTo(image,
    //         { y: '-10%' },
    //         {
    //           y: '10%',
    //           scrollTrigger: {
    //             trigger: parallaxImgContainer,
    //             start: 'top 90%',
    //             end: 'bottom top',
    //             scrub: true,
    //           },
    //         }
    //       );
    //     });
    //   }
    // }

    /**
     * Разбиение текста по буквам
     */
    const titleChars = document.querySelectorAll('[data-splitting="chars"]');
    titleChars.forEach(titleChar => {
      const char = new SplitType(titleChar, { types: 'words, chars' });
    });
    /**
     * Разбиение текста по словам
     */
    const titleWords = document.querySelectorAll('[data-splitting="words"]');
    titleWords.forEach(titleWord => {
      const word1 = new SplitType(titleWord.querySelector('h1'), { types: 'words, words' });
      const word2 = new SplitType(titleWord.querySelector('h2'), { types: 'words, words' });
      const word3 = new SplitType(titleWord.querySelector('h3'), { types: 'words, words' });
      const word4 = new SplitType(titleWord.querySelector('h4'), { types: 'words, words' });
      const word5 = new SplitType(titleWord.querySelector('h5'), { types: 'words, words' });
    });
    /**
     * Разбиение текста по строкам
     */
    const titleLines = document.querySelectorAll('[data-splitting="lines"]');
    titleLines.forEach(titleLine => {
      const line = new SplitType(titleLine, { types: 'words, lines' });
    });

    const revealItems = document.querySelectorAll('[data-transform="reveal"]');
    revealItems.forEach(revealItem => {
      const revealItemTags = revealItem.querySelector("h1");
      const word = revealItemTags.querySelectorAll("div.word");
      const tl = gsap.timeline({
        paused: true
      });
      tl.from(word, {
        opacity: 0,
        y: "50",
        duration: .5,
        ease: "ease",
        stagger: {
          amount: .3
        }
      });
      scrollTriggerPlayer(revealItem, tl)
    });

    const revealRotateItems = document.querySelectorAll('[data-transform="revealRotate"]');
    revealRotateItems.forEach(revealRotateItem => {
      const word = revealRotateItem.querySelectorAll("div.word");
      const tl = gsap.timeline({
        paused: true
      });
      tl.from(word, {
        opacity: 0,
        y: "100",
        rotationZ: 15,
        duration: .5,
        ease: "ease",
        stagger: {
          amount: .4
        }
      });
      scrollTriggerPlayer(revealRotateItem, tl)
    });

    const fadeInItems = document.querySelectorAll('[data-transform="fadeIn"]');
    fadeInItems.forEach(fadeInItem => {
      const chars = fadeInItem.querySelectorAll("div.char");
      const tl = gsap.timeline({
        paused: true
      });
      tl.from(chars, {
        opacity: 0,
        duration: .3,
        ease: "power1.out",
        stagger: {
          amount: .3
        }
      });
      scrollTriggerPlayer(fadeInItem, tl)
    });

    const fadeItems = document.querySelectorAll('[data-transform="fade"]');
    fadeItems.forEach(fadeItem => {
      const tl = gsap.timeline({
        paused: true
      });
      if (fadeItem.getAttribute('data-rotation')) {
        tl.from(fadeItem, {
          opacity: 0,
          y: "100",
          rotationZ: 10,
          duration: .8,
          delay: .3,
          ease: "ease",
          stagger: {
            amount: .8
          }
        });
      } else {
        tl.from(fadeItem, {
          opacity: 0,
          y: "20",
          duration: .8,
          delay: .3,
          ease: "ease",
          stagger: {
            amount: .8
          }
        });
      }
      scrollTriggerPlayer(fadeItem, tl)
    });

    const scaleItems = document.querySelectorAll('[data-transform="scale"]');
    scaleItems.forEach(scaleItem => {
      const tl = gsap.timeline({
        paused: true
      });
      tl.from(scaleItem, {
        opacity: 0,
        scale: 0.8,
        duration: .5,
        ease: "ease",
        stagger: {
          amount: .8
        }
      });
      scrollTriggerPlayer(scaleItem, tl)
    });

    const parallaxItem = document.querySelector('[data-animation="parallax-img"]');
    if (parallaxItem) {
      const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
      parallaxImgContainers.forEach(parallaxImgContainer => {
        const image = parallaxImgContainer.querySelector('img');
        gsap.fromTo(image,
          {
            y: '-10%',
            scale: 0.9,
          },
          {
            y: '10%',
            scale: 0.9,
            scrollTrigger: {
              trigger: parallaxImgContainer,
              start: 'top 90%',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }

    const parallaxBlock = document.querySelector('[data-animation="parallax-block"]');
    if (parallaxBlock) {
      const parallaxImgBlocks = document.querySelectorAll('[data-animation="parallax-block"]');
      parallaxImgBlocks.forEach(parallaxImgBlock => {
        gsap.fromTo(parallaxImgBlock,
          { y: '-8%' },
          {
            y: '8%',
            scrollTrigger: {
              trigger: parallaxImgBlock,
              start: 'top 90%',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }

    // const creepingBlock = document.querySelector('[data-animation="creeping"]');
    // if (creepingBlock) {
    //   const wrapper = document.querySelector('.wrapper');
    //   creepingAnim(creepingBlock, wrapper)
    // }

    // function creepingAnim(creepingBlock, wrapper) {
    //   const trigger = document.querySelector(`.${creepingBlock.getAttribute('data-creeping-trigger')}`);
    //   wrapper.style.marginBottom = (creepingBlock.offsetHeight / 2.5) + 'px';
    //   console.log(wrapper.offsetHeight)
    //   console.log(creepingBlock.offsetHeight)
    //   gsap.to(creepingBlock, {
    //     bottom: 0,
    //     ease: 'none',
    //     scrollTrigger: {
    //       trigger: trigger,
    //       start: `+=${(wrapper.offsetHeight - creepingBlock.offsetHeight) - (window.innerHeight - creepingBlock.offsetHeight)*2.5} bottom`,
    //       end: () => `${wrapper.offsetHeight - (window.innerHeight - creepingBlock.offsetHeight)*2.5}`,
    //       scrub: true,
    //       pinSpacing: true,
    //       markers: true
    //     }
    //   });
    // }

    const parallaxImgBoxes = document.querySelectorAll('[data-animation="parallax-box"]');
    if (parallaxImgBoxes != 0) {
      parallaxImgBoxes.forEach(parallaxImgBox => {

        if (parallaxImgBox.classList.contains('leaf--2')) {
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
        } else {
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
        }

      });
    }

    // const layoutsUp = document.querySelectorAll('.layoutUp');
    // if (layoutsUp.length > 0) {
    //   layoutsUp.forEach(layoutUp => {

    //     const tl = gsap.timeline();
    //     const hall = document.querySelector('.hall');
    //     const main = document.querySelector('.main');

    //     // const layoutUpHeight = layoutUp.querySelector('.resta__block').offsetHeight;
    //     const layoutUpHeight = layoutUp.offsetHeight;

    //     tl.fromTo(layoutUp, { y: 0, }, { y: '-100%' })
    //     ScrollTrigger.create({
    //       animation: tl,
    //       trigger: layoutUp,
    //       start: `top bottom`,
    //       // end: () => main.offsetWidth / 2,
    //       // end: `bottom bottom`,
    //       end: () => `+=${layoutUpHeight}`,
    //       scrub: true,
    //       // pin: true,
    //       markers: true
    //     });
    //   });
    // }

    // const layoutsUp = document.querySelectorAll('.layoutUp');
    // if (layoutsUp.length > 0) {
    //   layoutsUp.forEach(layoutUp => {

    //     const tl = gsap.timeline();
    //     const hall = document.querySelector('.hall');
    //     const main = document.querySelector('.main');

    //     // const layoutUpHeight = layoutUp.querySelector('.resta__block').offsetHeight;
    //     const layoutUpHeight = layoutUp.offsetHeight;

    //     tl.from(layoutUp, { y: '150%' })
    //     ScrollTrigger.create({
    //       animation: tl,
    //       trigger: layoutUp,
    //       start: `-200% bottom`,
    //       // end: () => main.offsetWidth / 2,
    //       end: `-100% bottom`,
    //       // end: () => `+=${layoutUpHeight}`,
    //       scrub: true,
    //       // pin: true,
    //       markers: true
    //     });
    //   });
    // }

    const fadeUps = document.querySelectorAll('[data-transform="fadeUp"]');
    if (fadeUps.length > 0) {
      fadeUps.forEach(fadeUp => {
        const tl = gsap.timeline({
          paused: true
        });
        tl.from(fadeUp, {
          opacity: 0,
          y: "100",
          duration: .5,
          ease: "ease",
          stagger: {
            amount: .3
          },
          onComplete: function () {
            fadeUp.classList.add('sticky');
          },
        });
        scrollTriggerPlayer(fadeUp, tl)
      });
    }

    const templatePrimary = document.querySelector('.template--primary');
    if (templatePrimary) {
      const templateBg = templatePrimary.querySelector('.template__bg');
      const templateSuptitle = templatePrimary.querySelector('.template__suptitle');
      const templateTitle = templatePrimary.querySelector('.template__title');
      const templateBodyIcons = templatePrimary.querySelector('.template__body-icons');
      const templateBodyDown = templatePrimary.querySelector('.template__body-down');

      const tl = gsap.timeline({
        paused: true
      });

      if (templateBg) {
        tl.from(templateBg, {
          opacity: 0,
          duration: .5,
          ease: "ease",
          stagger: {
            amount: .3
          }
        });
        scrollTriggerPlayer(templateBg, tl)
      }

      if (templateSuptitle) {
        tl.from(templateSuptitle, {
          opacity: 0,
          y: '-50',
          duration: .5,
          ease: "ease",
          stagger: {
            amount: .3
          }
        });
        scrollTriggerPlayer(templateSuptitle, tl)
      }

      if (templateTitle) {
        tl.from(templateTitle, {
          opacity: 0,
          y: '-50',
          duration: .5,
          ease: "ease",
          stagger: {
            amount: .3
          }
        });
        scrollTriggerPlayer(templateTitle, tl)
      }

      if (templateBodyIcons) {
        tl.from(templateBodyIcons, {
          opacity: 0,
          y: '-50',
          duration: .5,
          ease: "ease",
          stagger: {
            amount: .3
          }
        });
        scrollTriggerPlayer(templateBodyIcons, tl)
      }

      if (templateBodyDown) {
        tl.fromTo(templateBodyDown, {
          opacity: 0,
          y: '-50',
        }, {
          opacity: 1,
          y: '0',
          duration: .3,
          ease: "ease",
          stagger: {
            amount: .3
          }
        });
        scrollTriggerPlayer(templateBodyDown, tl)
      }
    }

    const foreachItem = document.querySelector('.foreach-items');
    if (foreachItem) {
      const items = foreachItem.querySelectorAll('.foreach-items>a.offers__item')
      items.forEach(item => {
        const tl = gsap.timeline({
          paused: true
        });
        tl.fromTo(item, {
          opacity: 0,
          y: '-50',
        }, {
          opacity: 1,
          y: '0',
          duration: .3,
          ease: "power1.out",
          stagger: {
            amount: .3,
          }
        });
        scrollTriggerPlayer(item, tl)
      });
    }



    /**
     * 
     * @param {Элемент от которого начинается Анимация} triggerElement 
     * @param {*} timeline 
     * @param {*} onEnterStart 
     */
    function scrollTriggerPlayer(triggerElement, timeline, onEnterStart = "top 95%") {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(1);
          timeline.pause()
        }
      });
      ScrollTrigger.create({
        trigger: triggerElement,
        start: onEnterStart,
        onEnter: () => timeline.play()
      })
    }
    gsap.registerPlugin(ScrollTrigger);

  });

  window.addEventListener('resize scroll load', function () { ScrollTrigger.refresh() });



  // function menuItemAnim() {
  //   const asd = document.querySelectorAll('.menu__item');
  //   for (let i = 0; asd.length != asd[i]; i++) {
  //     const a = asd[i].querySelector('.menu__item-head');
  //     gsap.fromTo(a,
  //       {
  //         y: '-5rem',
  //         opacity: 0,
  //       },
  //       {
  //         y: '0',
  //         opacity: 1,
  //         duration: 1,
  //         delay: 0.1 * i,
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: '.burger-menu--opened',
  //           start: 'top 100%',
  //           end: 'bottom top',
  //         }
  //       }
  //     );
  //   }
  // }



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
   * Инициализация TransferElements
   */
  const transfer = document.querySelector('.transfer-elem-1');
  if (transfer) {
    $(window).on('resize load', function () {
      if (window.innerWidth <= '834') {
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

  // templateProducts.forEach(templateProduct => {
  //   gsap.fromTo(templateProduct, {
  //     y: '100',
  //     // scale: 1,
  //     opacity: 0,
  //   }, {
  //     y: '0',
  //     // scale: 0.8,
  //     opacity: 1,
  //     scrollTrigger: {
  //       trigger: templateProduct,
  //       start: `top bottom`,
  //       end: `50% 50%`,
  //       scrub: true,
  //       markers: true,
  //       invalidateOnRefresh: true,
  //     },
  //     onEnter: function () {
  //       templateProduct.classList.toggle('animatedClass');
  //     },
  //   });
  // });

  // var $grid = $('.rooms__items').isotope({
  //   itemSelector: '.rooms__item',
  //   layoutMode: 'fitRows',
  //   duration: '1',
  // });
  // var filterFns = {
  //   ium: function () {
  //     var name = $(this).data.value();
  //     console.log(name);
  //     return name.match(/ium$/);
  //   }
  // };
  // $('.filter__items').on('click', '.filter__item', function () {
  //   var filterValue = $(this).attr('data-filter');
  //   filterValue = filterFns[filterValue] || filterValue;
  //   $grid.isotope({ filter: filterValue });
  // });

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
      }
    }
  });


  /**
   * =================Скрипт для блока со скролом=====================
   */
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
            // if (distanceToTop > 199) {
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
          // var distanceToTop = $activeBlock.offset().top - $(window).scrollTop() - 199;
          var distanceToTop = $activeBlock.offset().top - $(window).scrollTop() - 69;
          var top = window.pageYOffset;

          const hallCover = $('.hall__cover');

          if (hallCover) {

            const dataIndexItem = $activeBlock.attr('data-index');

            setTimeout(() => {
              const hallCoverImgs = document.querySelectorAll(".hall__cover-img");
              hallCoverImgs.forEach(hallCoverImg => {
                if (dataIndexItem == hallCoverImg.getAttribute('data-index')) {
                  hallCoverImg.style.opacity = '1';
                } else {
                  hallCoverImg.style.opacity = '0';
                }
              });
              // console.log(hallCover.find('img').attr('data-index')); // Изменяем картинку
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

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').style.transform = 'translateX(100%)';
  setInterval(() => document.getElementById('plate-cookie').remove(), 5000);
}