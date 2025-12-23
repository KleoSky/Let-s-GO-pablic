import noUiSlider from 'nouislider';

const rangeSlider = document.querySelector('.choice__slider');
const rangeInputs = document.querySelectorAll('.choice__input');
const form = document.querySelector('.choice__form');

const validateInputs = () => {
  const fromValue = parseInt(rangeInputs[0].value, 10);
  const toValue = parseInt(rangeInputs[1].value, 10);

  if (fromValue > toValue) {
    rangeInputs[0].value = toValue;
  }
};

const initChioceSlider = () => {
  if (!rangeSlider) {
    return;
  }

  noUiSlider.create(rangeSlider, {
    start: [30, 100],
    connect: true,
    cssPrefix: 'choice__',
    range: {
      min: 0,
      max: 100,
    },
    step: 10,
    handleAttributes: [{'aria-label': 'Меньше'}, {'aria-label': 'Больше'}],
    animate: false,
  });

  rangeSlider.noUiSlider.on('slide', (values, handle) => {
    rangeInputs[handle].value = Math.round(values[handle]);
  });

  rangeInputs.forEach((input) => {
    input.addEventListener('blur', (evt) => {
      let value = parseInt(evt.target.value, 10) || 0;

      if (value < 0) {
        value = 0;
      }
      if (value > 100) {
        value = 100;
      }

      input.value = value;

      validateInputs();

      const fromValue = parseInt(rangeInputs[0].value, 10);
      const toValue = parseInt(rangeInputs[1].value, 10);
      rangeSlider.noUiSlider.set([fromValue, toValue]);
    });
  });

  form.addEventListener('reset', () => {
    rangeSlider.noUiSlider.set([30, 100]);
    rangeInputs[0].value = 30;
    rangeInputs[1].value = 100;
  });
};

export {initChioceSlider};
