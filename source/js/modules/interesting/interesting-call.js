const initPhoneConfirmation = () => {
  const phoneLink = document.querySelector('.interesting__feedback--call');

  if (!phoneLink) {
    return;
  }

  phoneLink.addEventListener('click', (e) => {
    e.preventDefault();

    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
        <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
          <p style="color: #1d2e5b">Вы действительно хотите позвонить?</p>
          <button id="confirm-call" style="color: #1d2e5b; background: #a8d2f4; border-radius: 10px; border-color: transparent; padding: 10px">Да, позвонить</button>
          <button id="cancel-call" style="color: #1d2e5b; background: #a8d2f4; border-radius: 10px; border-color: transparent; padding: 10px">Отмена</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const confirmCall = document.getElementById('confirm-call');
    const cancelCall = document.getElementById('cancel-call');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModal = () => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      document.removeEventListener('keydown', handleEscape);
    };

    const handleEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    };

    confirmCall.addEventListener('click', () => {
      window.location.href = phoneLink.href;
      closeModal();
    });

    cancelCall.addEventListener('click', closeModal);

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', handleEscape);
  });
};

export {initPhoneConfirmation};
