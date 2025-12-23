import {renderCountries, initTabletLetters} from './countries-filter.js';

const openButton = document.querySelector('.countries__button--all');
const desktopList = document.querySelector('.countries__list');
const wrapper = document.querySelector('.countries__tablet-layout-wrapper');
const tabletLayout = document.querySelector('.countries__tablet-layout');
const closeButton = document.querySelector('.countries__close-button');
const buttonsFilter = document.querySelector('.countries__buttons-filter');
const buttonDesktop = document.querySelector('.countries__button--desktop');
const buttonTablet = document.querySelector('.countries__button--tablet');
const buttonsInit = document.querySelector('.countries__buttons-init');
const container = document.querySelector('.countries');
const checkboxes = document.querySelectorAll('.countries__checkbox');
const choice = document.querySelector('.choice');
const companions = document.querySelector('.companions');

const pointIcon = `
      <svg width="16" height="10" aria-hidden="true">
        <use xlink:href="img/sprite.svg#icon-point"></use>
      </svg>`;

const closeIcon = `
      <svg width="16" height="16" aria-hidden="true">
        <use xlink:href="img/sprite.svg#icon-close"></use>
      </svg>`;

const getActiveFilters = () => {
  const activeFilters = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      activeFilters.push(checkbox.getAttribute('data-filter'));
    }
  });
  return activeFilters;
};

const applyFilters = () => {
  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0 || activeFilters.length === checkboxes.length) {
    renderCountries('all');
    if (window.innerWidth <= 1023) {
      setTimeout(() => {
        initTabletLetters();
        const firstAvailableLetter = document.querySelector('.countries__letter');
        if (firstAvailableLetter) {
          firstAvailableLetter.click();
        }
      }, 50);
    }
  } else if (activeFilters.length === 1) {
    renderCountries(activeFilters[0]);
    if (window.innerWidth <= 1023) {
      setTimeout(() => {
        initTabletLetters();
        const firstAvailableLetter = document.querySelector('.countries__letter');
        if (firstAvailableLetter) {
          firstAvailableLetter.click();
        }
      }, 50);
    }
  } else {
    try {
      renderCountries(activeFilters);
    } catch (e) {
      renderCountries(activeFilters.join(','));
    }

    if (window.innerWidth <= 1023) {
      setTimeout(() => {
        initTabletLetters();
        const firstAvailableLetter = document.querySelector('.countries__letter');
        if (firstAvailableLetter) {
          firstAvailableLetter.click();
        }
      }, 50);
    }
  }
};

const setDefaultEurope = () => {
  const europeCheckbox = document.querySelector('.countries__button--europe');
  if (europeCheckbox && !europeCheckbox.checked) {
    europeCheckbox.checked = true;
  }
};

const openList = () => {
  desktopList.classList.remove('countries__list--closed');
  desktopList.classList.add('countries__list--opened');
  tabletLayout.classList.remove('countries__tablet-layout--closed');
  tabletLayout.classList.add('countries__tablet-layout--opened');
  buttonsFilter.classList.remove('countries__buttons-filter--closed');
  buttonsFilter.classList.add('countries__buttons-filter--opened');
  wrapper.classList.remove('countries__tablet-layout-wrapper--closed');
  wrapper.classList.add('countries__tablet-layout-wrapper--opened');

  if (window.innerWidth <= 1023) {
    choice.style.zIndex = '-1';
  }

  if (window.innerWidth >= 768) {
    wrapper.style.paddingBottom = '80px';
    container.style.borderRadius = 0;
  }
  if (window.innerWidth <= 767) {
    wrapper.style.paddingBottom = '28px';
    buttonTablet.style.paddingLeft = '10px';
    buttonTablet.style.alignItems = 'baseline';
    buttonTablet.innerHTML = closeIcon;
    buttonDesktop.style.alignItems = 'baseline';
    if (buttonDesktop) {
      const buttonDesktopSpan = buttonDesktop.querySelector('span');
      if (buttonDesktopSpan) {
        buttonDesktopSpan.style.minWidth = '217px';
      }
      const buttonDesktopIcon = buttonDesktop.querySelector('svg');
      if (buttonDesktopIcon) {
        buttonDesktopIcon.style.marginTop = '-16px';
      }
    }
    if (buttonTablet) {
      const iconElement = buttonTablet.querySelector('svg');
      if (iconElement) {
        iconElement.style.marginLeft = '-11px';
      }
    }
    buttonsInit.style.alignItems = 'baseline';
    container.style.borderRadius = 0;
    container.style.zIndex = '2';
    choice.style.zIndex = '-1';
    companions.style.marginTop = '-157px';
  }

  setDefaultEurope();
  applyFilters();
};

const closeList = () => {
  desktopList.classList.remove('countries__list--opened');
  desktopList.classList.add('countries__list--closed');
  tabletLayout.classList.remove('countries__tablet-layout--opened');
  tabletLayout.classList.add('countries__tablet-layout--closed');
  buttonsFilter.classList.add('countries__buttons-filter--closed');
  buttonsFilter.classList.remove('countries__buttons-filter--opened');
  wrapper.classList.add('countries__tablet-layout-wrapper--closed');
  wrapper.classList.remove('countries__tablet-layout-wrapper--opened');
  wrapper.style.paddingBottom = '';
  container.style.paddingBottom = '';
  container.style.borderRadius = '';
  buttonTablet.style.paddingLeft = '';
  buttonTablet.style.alignItems = '';
  if (buttonTablet) {
    const iconElement = buttonTablet.querySelector('svg');
    if (iconElement) {
      iconElement.outerHTML = pointIcon;
      iconElement.style.marginLeft = '';
    }
  }
  buttonDesktop.style.alignItems = '';
  if (buttonDesktop) {
    const buttonDesktopSpan = buttonDesktop.querySelector('span');
    if (buttonDesktopSpan) {
      buttonDesktopSpan.style.minWidth = '';
    }
    const buttonDesktopIcon = buttonDesktop.querySelector('svg');
    if (buttonDesktopIcon) {
      buttonDesktopIcon.style.marginTop = '';
    }
  }
  buttonsInit.style.alignItems = '';
  container.style.zIndex = '';
  choice.style.zIndex = '';
  companions.style.marginTop = '';

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  const letterElements = document.querySelectorAll('.countries__letter');
  const letterA = document.querySelector('.countries__letter[data-letter="А"]');

  letterElements.forEach((letter) => letter.classList.remove('countries__letter--active'));
  if (letterA) {
    letterA.classList.add('countries__letter--active');
  }

  const event = new CustomEvent('resetFirstOpen');
  document.dispatchEvent(event);
};

const toggleTabletList = () => {
  if (desktopList.classList.contains('countries__list--opened')) {
    closeList();
  } else {
    openList();
  }
};

const initList = () => {
  if (!openButton && !closeButton && !buttonTablet) {
    return;
  }
  openButton.addEventListener('click', openList);
  closeButton.addEventListener('click', closeList);

  if (!buttonTablet) {
    return;
  }

  buttonTablet.addEventListener('click', () => {
    if (window.innerWidth <= 767) {
      toggleTabletList();
    } else {
      openList();
    }
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', applyFilters);
  });

  document.addEventListener('openCountriesList', openList);
};

export {initList};
