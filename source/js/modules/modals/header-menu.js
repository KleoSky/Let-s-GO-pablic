const burger = document.querySelector('.header__button');
const menu = document.querySelector('.header__menu');
const logoLink = document.querySelector('.header__logo-link-mobile');

const burgerIcon = `
      <svg width="25" height="11" aria-hidden="true">
        <use xlink:href="img/sprite.svg#icon-burger"></use>
      </svg>`;

const closeIcon = `
      <svg width="18" height="18" aria-hidden="true">
        <use xlink:href="img/sprite.svg#icon-close"></use>
      </svg>`;

const closeMenu = () => {
  menu.classList.remove('header__menu--opened');
  menu.classList.add('header__menu--closed');
  burger.innerHTML = burgerIcon;
  burger.style.color = '';
  logoLink.style.color = '';
  document.documentElement.style.overflow = '';
  document.documentElement.style.scrollbarGutter = '';
  document.documentElement.style.position = '';
  document.documentElement.style.width = '';
  document.documentElement.style.height = '';

  document.removeEventListener('click', handleOutsideClick);
};

const openMenu = () => {
  menu.classList.remove('header__menu--closed');
  menu.classList.add('header__menu--opened');
  burger.innerHTML = closeIcon;
  burger.style.color = '#cccccc';
  logoLink.style.color = '#192144';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.scrollbarGutter = 'stable';
  document.documentElement.style.position = 'fixed';
  document.documentElement.style.width = '100%';
  document.documentElement.style.height = '100%';

  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 10);
};

const toggleMenu = () => {
  if (menu.classList.contains('header__menu--opened')) {
    closeMenu();
  } else {
    openMenu();
  }
};

const handleOutsideClick = (e) => {
  if (menu.classList.contains('header__menu--opened') &&
      !e.target.closest('.header__menu') &&
      !e.target.closest('.header__button')) {
    closeMenu();
  }
};

const initMenu = () => {
  burger.addEventListener('click', toggleMenu);
};

export {initMenu};
