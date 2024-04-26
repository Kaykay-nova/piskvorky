import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const buttons = document.querySelectorAll('.field-btn');

const apiPlayer = async () => {
  const symbol = [...buttons].map((button) => {
    if (button.classList.contains('field-btn__circle')) {
      return 'o';
    } else if (button.classList.contains('field-btn__cross')) {
      return 'x';
    } else {
      return '_';
    }
  });

  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: symbol,
        player: 'x',
      }),
    },
  );

  const data = await response.json();
  const { x, y } = data.position;
  const field = buttons[x + y * 10];
  field.click();
};

const selectBtn = (event) => {
  
  if (
    !event.target.classList.contains('field-btn__circle') &&
    !event.target.classList.contains('field-btn__cross')
  ) {
    if (currentPlayer === 'circle') {
      event.target.classList.add('field-btn__circle');
      apiPlayer();
    } else {
      event.target.classList.add('field-btn__cross');
    }
    event.target.disabled = true;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

    // kontrola výhry po každém tahu
    const symbol = [...buttons].map((button) => {
      if (button.classList.contains('field-btn__circle')) {
        return 'o';
      } else if (button.classList.contains('field-btn__cross')) {
        return 'x';
      } else {
        return '_';
      }
    });

    const winner = findWinner(symbol);
    if (winner === 'o' || winner === 'x') {
      setTimeout(() => {
        alert(`Vyhrál hráč se symbolem ${winner}!`);
        location.reload();
      }, 150);
    } else if (winner === 'tie') {
      setTimeout(() => {
        alert('Hra skončila remízou!');
        location.reload();
      }, 150);
    }
  }

  const playerIcon = document.getElementById('icon-player');
  playerIcon.src =
    currentPlayer === 'circle' ? 'images/circle.svg' : 'images/cross.svg';
};

buttons.forEach((button) => {
  button.addEventListener('click', selectBtn);
});

//Restart hry

const restartBtn = document.querySelector('.icon-restart');

const confirmRestart = (event) => {
  const confirmation = confirm('Opravdu chceš začít hrát znovu?');

  if (confirmation) {
    window.location.href = 'hra.html';
  } else {
    event.preventDefault();
  }
};

restartBtn.addEventListener('click', confirmRestart);
