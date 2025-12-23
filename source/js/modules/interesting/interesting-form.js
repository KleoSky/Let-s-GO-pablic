const emailInput = document.querySelector('#email');
const form = document.querySelector('.interesting__form');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const initEmailValidation = () => {
  if (!form) {
    return;
  }

  form.setAttribute('novalidate', '');

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      emailInput.classList.add('interesting__input--filled');
    } else {
      emailInput.classList.remove('interesting__input--filled');
    }
  });

  form.addEventListener('submit', (e) => {
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
      e.preventDefault();
      showPlaceholderError();
    } else if (!emailRegex.test(emailValue)) {
      e.preventDefault();
      showCustomError();
    }
  });
};

const showPlaceholderError = () => {
  if (!emailInput.dataset.originalPlaceholder) {
    emailInput.dataset.originalPlaceholder = emailInput.placeholder;
  }

  emailInput.placeholder = 'Введите e-mail';

  const style = document.createElement('style');
  style.id = 'temp-error-style';
  style.textContent = `
    #email::placeholder {
      color: #ff0000 !important;
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    emailInput.placeholder = emailInput.dataset.originalPlaceholder;
    const tempStyle = document.getElementById('temp-error-style');
    if (tempStyle) {
      tempStyle.remove();
    }
  }, 3000);
};

const showCustomError = () => {
  const errorStyle = document.createElement('style');
  errorStyle.id = 'temp-error-text';
  errorStyle.textContent = `
    #email.interesting__input--filled {
      color: #ff0000 !important;
    }
  `;
  document.head.appendChild(errorStyle);

  const modal = document.createElement('div');
  modal.innerHTML = `
    <div class="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
      <div class="modal-content" style="background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; color: #1d2e5b;">
        <p style="margin: 0 0 15px 0;">Пожалуйста, введите корректный email с доменом</p>
        <p style="margin: 0 0 15px 0; font-size: 14px;">Например: example@mail.ru</p>
        <p style="margin: 0 0 15px 0; font-size: 14px;">Email должен содержать точку после @ и домен верхнего уровня</p>
        <button id="close-error-modal" style="color: #1d2e5b; background: #a8d2f4; border-radius: 10px; border-color: transparent; padding: 10px 20px; cursor: pointer;">Понятно</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeButton = document.getElementById('close-error-modal');
  const overlay = modal.querySelector('.modal-overlay');

  const closeModal = () => {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal);
    }
    document.removeEventListener('keydown', handleEscape);
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  closeButton.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', handleEscape);

  emailInput.addEventListener('input', function resetFailed() {
    const tempStyle = document.getElementById('temp-error-text');
    if (tempStyle) {
      tempStyle.remove();
    }
    closeModal();
    emailInput.removeEventListener('input', resetFailed);
  }, {once: true});
};

export {initEmailValidation};
