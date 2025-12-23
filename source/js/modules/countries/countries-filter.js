import {loadData, getCountriesByRegion} from '../../utils/data-manager.js';
const listElement = document.querySelector('.countries__list');
const europeButton = document.querySelector('[data-filter="europe"]');
const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ч', 'Ш', 'Э', 'Ю', 'Я'];

let isFirstOpen = true;

const getCountriesByMultipleRegions = (regions) => {
  const combinedData = {};

  regions.forEach((region) => {
    const regionData = getCountriesByRegion(region);

    alphabet.forEach((letter) => {
      if (regionData[letter]) {
        if (!combinedData[letter]) {
          combinedData[letter] = {countriesTitles: []};
        }
        regionData[letter].countriesTitles.forEach((country) => {
          if (!combinedData[letter].countriesTitles.includes(country)) {
            combinedData[letter].countriesTitles.push(country);
          }
        });
        combinedData[letter].countriesTitles.sort();
      }
    });
  });

  return combinedData;
};

const renderCountries = (region) => {
  if (!listElement) {
    return;
  }

  let countriesData;

  if (Array.isArray(region)) {
    countriesData = getCountriesByMultipleRegions(region);
  } else if (region === 'all') {
    const allRegions = ['europe', 'asia', 'america', 'islands'];
    countriesData = getCountriesByMultipleRegions(allRegions);
  } else {
    countriesData = getCountriesByRegion(region);
  }

  listElement.innerHTML = '';

  alphabet.forEach((letter) => {
    const countriesList = countriesData[letter] ? countriesData[letter].countriesTitles : [];

    if (countriesList.length > 0) {
      const letterItem = document.createElement('li');
      letterItem.className = 'countries__item';
      letterItem.dataset.letter = letter;
      letterItem.textContent = letter;

      const sublist = document.createElement('ul');
      sublist.className = 'countries__sublist';

      countriesList.forEach((country) => {
        const countryItem = document.createElement('li');
        countryItem.className = 'countries__subitem';
        countryItem.textContent = country;
        sublist.appendChild(countryItem);
      });

      letterItem.appendChild(sublist);
      listElement.appendChild(letterItem);
    }
  });

  if (window.innerWidth <= 1023) {
    const activeLetterElement = document.querySelector('.countries__letter--active');
    if (activeLetterElement) {
      const activeLetter = activeLetterElement.dataset.letter;
      renderCountriesForTablet(activeLetter, region);
    } else {
      const firstLetterWithCountries = alphabet.find((letter) =>
        countriesData[letter] && countriesData[letter].countriesTitles.length > 0
      );
      if (firstLetterWithCountries) {
        renderCountriesForTablet(firstLetterWithCountries, region);
      }
    }
  }
};

const initFilterButtons = () => {
  const allButtons = document.querySelectorAll('[data-filter="all"]');
  const otherFilterButtons = document.querySelectorAll('[data-filter]:not([data-filter="all"])');

  allButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isListOpened = listElement.classList.contains('countries__list--opened');

      if (!isListOpened && button.dataset.filter === 'all') {
        const event = new CustomEvent('openCountriesList');
        document.dispatchEvent(event);
        return;
      }

      if (isListOpened && button.dataset.filter === 'all') {
        const regionToShow = isFirstOpen ? 'europe' : 'all';

        const allFilterButtons = document.querySelectorAll('[data-filter]');
        allFilterButtons.forEach((btn) => btn.classList.remove('countries__button--active'));

        if (isFirstOpen) {
          europeButton.classList.add('countries__button--active');
        } else {
          button.classList.add('countries__button--active');
        }

        renderCountries(regionToShow);
        isFirstOpen = false;
      }
    });
  });

  otherFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isListOpened = listElement.classList.contains('countries__list--opened');

      if (!isListOpened) {
        return;
      }

      const allFilterButtons = document.querySelectorAll('[data-filter]');
      allFilterButtons.forEach((btn) => btn.classList.remove('countries__button--active'));

      button.classList.add('countries__button--active');
      const region = button.dataset.filter;
      renderCountries(region);
      isFirstOpen = false;
    });
  });
};

const renderCountriesForTablet = (activeLetter, region = 'europe') => {
  let countriesData;

  if (Array.isArray(region)) {
    countriesData = getCountriesByMultipleRegions(region);
  } else if (region === 'all') {
    const allRegions = ['europe', 'asia', 'america', 'islands'];
    countriesData = getCountriesByMultipleRegions(allRegions);
  } else {
    countriesData = getCountriesByRegion(region);
  }

  const contentElement = document.querySelector('.countries__countries-content');

  const countriesList = countriesData[activeLetter] ? countriesData[activeLetter].countriesTitles : [];

  if (!contentElement) {
    return;
  }

  contentElement.innerHTML = '';

  const sublist = document.createElement('ul');
  sublist.className = 'countries__sublist';

  countriesList.forEach((country) => {
    const countryItem = document.createElement('li');
    countryItem.className = 'countries__subitem';
    countryItem.textContent = country;
    sublist.appendChild(countryItem);
  });

  contentElement.appendChild(sublist);
};

const initTabletLetters = () => {
  const letterElements = document.querySelectorAll('.countries__letter');

  letterElements.forEach((letterElement) => {
    letterElement.addEventListener('click', () => {
      letterElements.forEach((letter) => letter.classList.remove('countries__letter--active'));
      letterElement.classList.add('countries__letter--active');

      const activeLetter = letterElement.dataset.letter;

      const activeCheckboxes = document.querySelectorAll('.countries__checkbox:checked');
      let activeRegion;

      if (activeCheckboxes.length === 0 || activeCheckboxes.length === document.querySelectorAll('.countries__checkbox').length) {
        activeRegion = 'all';
      } else if (activeCheckboxes.length === 1) {
        activeRegion = activeCheckboxes[0].getAttribute('data-filter');
      } else {
        activeRegion = Array.from(activeCheckboxes).map((checkbox) =>
          checkbox.getAttribute('data-filter')
        );
      }

      renderCountriesForTablet(activeLetter, activeRegion);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadData(() => {
    renderCountries('europe');
    initFilterButtons();
  });
});

document.addEventListener('resetFirstOpen', () => {
  isFirstOpen = true;
});

export {renderCountries, renderCountriesForTablet, initTabletLetters};
