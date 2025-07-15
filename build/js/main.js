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
   * Кнопка куки
   */
  if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
    const cookiesNotify = document.getElementById('plate-cookie');

    if (cookiesNotify) {
      cookiesNotify.style.display = 'block';
    }
  }


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

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').remove();
}
