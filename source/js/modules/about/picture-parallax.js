const initParallax = () => {
  const pictures = document.querySelectorAll('.about__picture');
  const aboutBlock = document.querySelector('.about');

  pictures.forEach((picture) => {
    if (!picture) {
      return;
    }

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const aboutTop = aboutBlock.offsetTop;
      const aboutHeight = aboutBlock.offsetHeight;

      if (scrolled > aboutTop && scrolled < aboutTop + aboutHeight) {
        const moveY = -(scrolled - aboutTop) * 0.3;
        picture.style.transform = `translateY(${moveY}px)`;
      } else {
        picture.style.transform = 'translateY(0)';
        picture.style.animation = 'float 3s ease-in-out infinite';
      }
    });
  });
};

export {initParallax};
