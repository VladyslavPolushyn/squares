const gameField = document.querySelector('.game-field');

let squareSize = 40; //don't forget to change the .square styles

let numberOfSquares = Math.floor(gameField.offsetWidth / squareSize) * Math.floor(gameField.offsetHeight / squareSize);

for (let i = 0; i < numberOfSquares; i++) {
	gameField.insertAdjacentHTML('afterBegin', `<div class='square invisible'></div>`);
}

let squaresArr = document.querySelectorAll('.square');

startBtn.onclick = playGame;

let timer;
let seconds = 60;

function playGame() {

	timer = setInterval(function() {
    tick();
  }, 1000);

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

			hideSquares();
			
			for (let i = 0; i < randomInteger(1, 3); i++) {

				squaresArr[randomInteger(0, numberOfSquares-1)].classList.toggle('invisible');

			}

		}
	}

}


function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function tick() {
	
	if (seconds < 60) {
		if (seconds < 10) {
			timeLeft.innerHTML = '00:0' + seconds;
		}else {
			timeLeft.innerHTML = '00:' + seconds;
		}
	}

	if (seconds > 0) {
		seconds--;
	} else {
		clearInterval(timer);
		hideSquares();
		
	}

}

function hideSquares() {
	for (let visibleSquare of squaresArr) {
		if (!visibleSquare.classList.contains('invisible')) {
			visibleSquare.classList.toggle('invisible');
		}
	}
}