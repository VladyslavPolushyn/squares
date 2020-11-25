const gameField = document.querySelector('.game-field');

let squareSize = 40; //don't forget to change the .square styles

let numberOfSquares = Math.floor(gameField.offsetWidth / squareSize) * Math.floor(gameField.offsetHeight / squareSize);

for (let i = 0; i < numberOfSquares; i++) {
	gameField.insertAdjacentHTML('afterBegin', `<div class='square invisible'></div>`);
}

let squaresArr = document.querySelectorAll('.square');

startBtn.onclick = playGame;


function playGame() {
	let score = 0;
	points.innerHTML = score;
	startBtn.classList.toggle('hidden');
	pauseBtn.classList.toggle('hidden');
	newGameBtn.disabled = false;

	squaresArr[randomInteger(0, numberOfSquares-1)].classList.toggle('invisible');

	for (let square of squaresArr) {
		square.onclick = function () {
			score++;
			points.innerHTML = score;
			square.classList.toggle('invisible');
		}
	}

}


function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
