import {Swiper as SwiperDir} from 'swiper/swiper';
import {Autoplay} from 'swiper/modules';

const initMobile = () => {
  const card = document.querySelector('.directions__item-active');
  if (!card) {
    return;
  }

  if (window.innerWidth <= 767) {
    card.classList.remove('directions__item-active');
  }
};

const initSwiperDirections = () => {
  const swiperEl = document.querySelector('.diretions__countries-list');
  if (!swiperEl) {
    return;
  }

  let swiper = null;

  const initOrDestroySwiper = () => {
    if (window.innerWidth <= 767) {
      if (swiper && swiper.initialized) {
        swiper.destroy(true, true);
        swiperEl.classList.add('no-swiper');
      }
    } else {
      const container = document.querySelector('.swiper');
      const wrapper = container.querySelector('.swiper-wrapper');
      const slides = wrapper ? wrapper.querySelectorAll('.swiper-slide:not(.swiper-slide-cloned)') : null || [];

      const slidesPerView = container.dataset.slidesPerView || 3;
      const minSlidesForLoop = slidesPerView * 2;

      if (slides.length > 0 && slides.length < minSlidesForLoop) {
        const neededClones = minSlidesForLoop - slides.length;

        for (let i = 0; i < neededClones; i++) {
          const clone = slides[i % slides.length].cloneNode(true);
          clone.classList.add('swiper-slide-cloned');
          wrapper.appendChild(clone);
        }
      }
      if (!swiper || !swiper.initialized) {
        swiperEl.classList.remove('no-swiper');
        swiper = new SwiperDir(swiperEl, {
          direction: 'vertical',
          loop: true,
          slidesPerView: 3,
          initialSlide: 1,
          centeredSlides: true,
          spaceBetween: 10,
          allowTouchMove: true,
          modules: [Autoplay],
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          on: {
            transitionEnd() {
              this.slides.forEach((slide) => {
                slide.style.transition = 'transform 0.8s ease';
              });
            },
          },
        });
      }
    }
  };

  initOrDestroySwiper();

  window.addEventListener('resize', () => {
    initOrDestroySwiper();
  });
};

export {initMobile, initSwiperDirections};
