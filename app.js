const squares = document.querySelectorAll('.square');
const reset = document.querySelector('.reset');
const colors = [
  'red',
  'red',
  'blue',
  'blue',
  'green',
  'green',
  'yellow',
  'yellow',
  'pink',
  'pink',
  'orange',
  'orange',
  'purple',
  'purple',
  'brown',
  'brown',
];
let gameFlag = true;
let lastElement = '';

reset.addEventListener('click', resetAllColors);
squares.forEach((square) => {
  // adding random color to each sqaure
  const randomNumber = Math.floor(Math.random() * colors.length);
  const color = colors[randomNumber];
  colors.splice(colors.indexOf(color), 1);
  square.setAttribute('data-color', color);
  // event listener
  square.addEventListener('click', memoryGame);
});

function memoryGame() {
  console.log(gameFlag);
  if (this.classList.contains('done')) return;
  if (gameFlag) {
    showColor(this);
    gameFlag = !gameFlag;
    lastElement = this.dataset.color;
  } else {
    if (lastElement === this.dataset.color) {
      showColor(this);
      gameFlag = !gameFlag;
      lastElement = this.dataset.color;
    } else {
      showColor(this);
      let target = this;
      let reset = window.setTimeout(function () {
        target.style.background = 'hsl(0, 0%, 92%)';
        target.classList.remove('done');
      }, 1000);
    }
  }
}

function showColor(target) {
  console.log(target);
  const color = target.dataset.color;
  target.style.background = `${color}`;
  target.classList.add('done');
}

function resetAllColors() {
  squares.forEach((square) => {
    square.style.background = 'hsl(0, 0%, 92%)';
    square.classList.remove('done');
    square.style.hover;
    gameFlag = true;
  });
}
