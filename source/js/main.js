import {mobileVhFix} from './utils/mobile-vh-fix.js';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {CustomSelect} from './modules/select/custom-select';
import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';
import {initMenu} from './modules/modals/header-menu.js';
import {initMobile, initSwiperDirections} from './modules/directions/slider.js';
import {initParallax} from './modules/about/picture-parallax.js';
import {initRates} from './modules/modals/profile-rates.js';
import {initEmailValidation} from './modules/interesting/interesting-form.js';
import {initPhoneConfirmation} from './modules/interesting/interesting-call.js';
import {loadData} from './utils/data-manager.js';
import {renderCountries, renderCountriesForTablet} from './modules/countries/countries-filter.js';
import {initList} from './modules/countries/countries-open-list.js';
import {initChioceSlider} from './modules/companions/choice-slider.js';
import {initFilterButtons} from './modules/companions/choice-labels.js';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  mobileVhFix();

  // Modules
  if (window.innerWidth <= 1023) {
    initMenu();
  }
  initMobile();
  if (window.innerWidth >= 767) {
    initSwiperDirections();
  }
  initParallax();
  initRates();
  initEmailValidation();
  initPhoneConfirmation();

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    uploadFile();
    uploadImageDrop();
    loadData();
    renderCountries();
    renderCountriesForTablet();
    initList();
    initChioceSlider();
    initFilterButtons();
    const select = new CustomSelect();
    select.init();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
