let currentPlayer = 'circle'

const selectBtn = (event) => {
  if (!event.target.classList.contains('field-btn__circle') && !event.target.classList.contains('field-btn__cross')) {
    if (currentPlayer === 'circle') {
      event.target.classList.add('field-btn__circle');
    } else {
      event.target.classList.add('field-btn__cross');
    }
  event.target.disabled === true;
  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
  }
  //změna obrázku hráče nad polem
  const playerIcon = document.getElementById('icon-player');
    playerIcon.src = currentPlayer === 'circle' ? 'images/circle.svg' : 'images/cross.svg';
};

const buttons = document.querySelectorAll('.field-btn');
buttons.forEach((button) => {
  button.addEventListener('click', selectBtn);
});
