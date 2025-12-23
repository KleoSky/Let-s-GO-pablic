const openButton = document.querySelector('.profile__button');
const rates = document.querySelector('.profile__bussiness-rates');
const ratesContainer = document.querySelector('.profile__rates');
const container = document.querySelector('.profile');
const items = document.querySelectorAll('.profile__item');
const closeButton = document.querySelector('.profile__bussiness-rates-button');

const openRates = () => {
  rates.classList.remove('profile__bussiness-rates--closed');
  rates.classList.add('profile__bussiness-rates--opened');
  container.style.backgroundColor = '#edeff6';
  ratesContainer.style.backgroundColor = 'rgba(184, 196, 205, 0.4)';
  items.forEach((item) => {
    item.style.border = 'none';
  });
  document.documentElement.style.overflow = 'hidden';
  scrollToModal();

  document.addEventListener('keydown', handleEscape);
  document.addEventListener('click', handleOutsideClick);
};

const closeRates = () => {
  rates.classList.remove('profile__bussiness-rates--opened');
  rates.classList.add('profile__bussiness-rates--closed');
  container.style.backgroundColor = '';
  ratesContainer.style.backgroundColor = '';
  items.forEach((item) => {
    item.style.border = '';
  });
  document.documentElement.style.overflow = '';
  document.removeEventListener('keydown', handleEscape);
};

const initRates = () => {
  if (!openButton && !closeButton) {
    return;
  }
  openButton.addEventListener('click', openRates);
  closeButton.addEventListener('click', closeRates);
};

function scrollToModal() {
  if (!rates) {
    return;
  }

  rates.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}

function handleEscape(e) {
  if (e.key === 'Escape') {
    closeRates();
  }
}

function handleOutsideClick(e) {
  if (rates.classList.contains('profile__bussiness-rates--opened') && !e.target.closest('.profile__bussiness-rates') && !e.target.closest('.profile__button')) {
    closeRates();
  }
}

export {initRates};
