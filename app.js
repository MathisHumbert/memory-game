const cards = document.querySelectorAll('.card');
const reset = document.querySelector('.reset');
const moveDOM = document.querySelector('.moves');
const endDOM = document.querySelector('.end');

let firstCard, secondCard;
let flagCard = false;
let flagBlock = false;
let move = 0;
let end = 0;

cards.forEach((card) => {
  card.addEventListener('click', memoryGame);
});

function memoryGame() {
  if (this === firstCard) return;
  if (flagBlock) return;
  const color = this.dataset.color;
  move++;
  if (!flagCard) {
    this.style.backgroundColor = `${color}`;
    firstCard = this;
    flagCard = !flagCard;
  } else {
    this.style.backgroundColor = `${color}`;
    secondCard = this;
    flagBlock = !flagBlock;
    if (firstCard.dataset.color === secondCard.dataset.color) {
      firstCard.removeEventListener('click', memoryGame);
      secondCard.removeEventListener('click', memoryGame);
      resetAll();
      end++;
      if (end === 8) {
        endDOM.style.display = 'block';
      }
    } else {
      setTimeout(() => {
        firstCard.style.backgroundColor = '#222';
        secondCard.style.backgroundColor = '#222';
        resetAll();
      }, 1000);
    }
  }
  moveDOM.innerHTML = `Number of moves: ${move}`;
}

function resetAll() {
  [flagBlock, flagCard] = [false, false][(firstCard, secondCard)] = [
    null,
    null,
  ];
}

reset.addEventListener('click', () => {
  cards.forEach((card) => {
    card.style.backgroundColor = '#222';
    card.addEventListener('click', memoryGame);
    resetAll();
    move = 0;
    end = 0;
    moveDOM.innerHTML = `Number of moves: ${move}`;
    endDOM.style.display = 'none';
    shuflle();
  });
});

function shuflle() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 16);
    card.style.order = random;
  });
}

shuflle();
