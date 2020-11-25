const gameField = document.querySelector('.game-field');

let squareSize = 40; //don't forget to change the .square styles

let numberOfSquares = Math.floor(gameField.offsetWidth / squareSize) * Math.floor(gameField.offsetHeight / squareSize);

for (let i = 0; i < numberOfSquares; i++) {
	gameField.insertAdjacentHTML('afterBegin', `<div class='square invisible'></div>`);
}

let squaresArr = document.querySelectorAll('.square');


function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
