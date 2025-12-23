const initFilterButtons = () => {
  if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
    return;
  }

  const buttons = document.querySelectorAll('.choice__button-filter');

  buttons.forEach((button) => {
    button.replaceWith(button.cloneNode(true));
  });

  const newButtons = document.querySelectorAll('.choice__button-filter');

  const toggleFilter = (button) => {
    const fieldset = button.closest('.choice__fieldset');
    const labels = fieldset.querySelector('.choice__labels');
    const wasOpened = labels.classList.contains('choice__labels--opened');

    const allClasses = Array.from(labels.classList);
    const stateClasses = ['choice_labels--opened', 'choice_labels--closed'];
    const otherClasses = allClasses.filter((className) =>
      !stateClasses.includes(className) &&
      className !== 'choice__labels'
    );

    labels.className = 'choice__labels';
    otherClasses.forEach((className) => labels.classList.add(className));

    if (wasOpened) {
      labels.classList.add('choice__labels--closed');
      labels.classList.remove('choice__labels--opened');
      button.setAttribute('aria-label', 'Показать варианты');
    } else {
      labels.classList.add('choice__labels--opened');
      labels.classList.remove('choice__labels--closed');
      button.setAttribute('aria-label', 'Скрыть варианты');
    }
  };

  newButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFilter(button);
    });
  });

  const fieldsets = document.querySelectorAll('.choice__fieldset');
  fieldsets.forEach((fieldset) => {
    const h3 = fieldset.querySelector('h3');
    const button = fieldset.querySelector('.choice__button-filter');

    if (h3 && button) {
      h3.style.cursor = 'pointer';
      h3.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFilter(button);
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', initFilterButtons);
window.addEventListener('resize', initFilterButtons);

export {initFilterButtons};
