let currentPlayer = 'circle'

const selectBtn = (event) => {
  event.target.classList.add('field-btn__circle');
};

const buttons = document.querySelectorAll('.field-btn');
buttons.forEach((button) => {
  button.addEventListener('click', selectBtn);
});
