// localStorage.clear();
const gameField = document.querySelector('.game-field');
let popUp = document.getElementById('popUp');
let input = document.querySelector('.input');
let scoreNumber = document.getElementById('scoreNumber');
let saveButton = document.querySelector('.saveButton');
let resultField = document.getElementById('result-field');
let uniqueId = [];
let squareSize = 40; //don't forget to change the .square styles
let numberOfSquares = Math.floor(gameField.offsetWidth / squareSize) * Math.floor(gameField.offsetHeight / squareSize);

let records = JSON.parse(localStorage.getItem('records'));
if (!Array.isArray(records)) {
	records = [];
}
// display records list
renderScores();

// Fill in gameField
for (let i = 0; i < numberOfSquares; i++) {
	gameField.insertAdjacentHTML('afterBegin', `<div class='square invisible'></div>`);
}

// Array of squares
let squaresArr = document.querySelectorAll('.square');

startBtn.onclick = playGame;
pauseBtn.onclick = pause;
resumeBtn.onclick = resume;

let seconds;
let score;
let timer;

function playGame() {
	seconds = 7;
	score = 0;
	timer = setInterval(function() {
		tick();
	}, 1000);

	points.innerHTML = score;
	startBtn.classList.toggle('hidden');
	pauseBtn.classList.toggle('hidden');
	pauseBtn.disabled = false;
	newGameBtn.disabled = false;
	newGameBtn.onclick = newGame;

	squaresArr[randomInteger(0, numberOfSquares-1)].classList.toggle('invisible');

	for (let square of squaresArr) {

		square.onclick = function () {

			score++;
			points.innerHTML = score;

			hideSquares();
			
			for (let i = 0; i < randomInteger(1, 3); i++) {

				let currentSquare = squaresArr[randomInteger(0, numberOfSquares-1)];
				if (currentSquare.classList.contains('invisible')) {
					currentSquare.classList.toggle('invisible');
				}

			}

		}
	}
}

resultName();


function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function tick() {
	if (seconds < 60) {
		if (seconds < 10) {
			timeLeft.innerHTML = '00:0' + seconds;
		} else {
			timeLeft.innerHTML = '00:' + seconds;
		}
	}

	if (seconds > 0) {
		seconds--;
	} else {
		clearInterval(timer);
		hideSquares();
		pauseBtn.disabled = true;
		newGameBtn.disabled = true;
		popUpWindow();
    
	}
}

function pause() {
	pauseBtn.classList.toggle('hidden');
	resumeBtn.classList.toggle('hidden');
	clearInterval(timer);
	clickableSquare(false);
}

function resume() {
	
	timer = setInterval(function() {
		tick();
	}, 1000);

	clickableSquare(true);
	pauseBtn.classList.toggle('hidden');
	resumeBtn.classList.toggle('hidden');
}

function hideSquares() {
	for (let visibleSquare of squaresArr) {
		if (!visibleSquare.classList.contains('invisible')) {
			visibleSquare.classList.toggle('invisible');
		}
	}
}

function newGame() {
	clickableSquare(true);
	clearInterval(timer);
	timeLeft.innerHTML = '01:00';
	points.innerHTML = '';
	startBtn.classList.remove('hidden');
	pauseBtn.classList.add('hidden');
	resumeBtn.classList.add('hidden');
	hideSquares();
	newGameBtn.disabled = true;
}


function popUpWindow() {
	popUp.classList.remove('hidden');
	scoreNumber.textContent = points.innerHTML;
}

function closeWindow() {
	popUp.classList.add('hidden');

}

function resultName() {
	saveButton.addEventListener('click', () => {
		let recordName = input.value.trim();
		popUp.classList.add('hidden');
		pauseBtn.disabled = true;

		timeLeft.innerHTML = '01:00';
		pauseBtn.disabled = false;
		pauseBtn.classList.add('hidden');
		startBtn.classList.remove('hidden');

		if (recordName !== '') {
			const record = {
				name: recordName,
				score: points.innerHTML,
				time: new Date()
			};
			records.push(record);
			// sort by score
			records.sort((recordA, recordB) => {
				const scoreA = parseInt(recordA.score);
				const scoreB = parseInt(recordB.score);
				return scoreB - scoreA;
			})
			localStorage.setItem('records', JSON.stringify(records));

			renderScores();

			popUp.classList.add('hidden');
		}

		input.value = '';
	})
	return;

}

function clickableSquare(value) {
	if (value) {
		for (let square of squaresArr) {
			square.classList.remove('no-click');
		}
	} else {
		for (let square of squaresArr) {
			square.classList.add('no-click');
		}
	}
}

function createRecordLine(recordName, recordScore) {
	const line = document.createElement('p');
	const name = document.createElement('span');
	const score = document.createElement('span');

	name.classList.add('name-result');
	score.classList.add('score-result');

	name.textContent = recordName;
	score.textContent = ` ${recordScore} ${recordScore === '1' ? 'point' : 'points'}`;
	// if (recordScore === '1') {
	// 	score.textContent = ' ' + recordScore + ' point';
	// }
	// score.textContent = ' ' + recordScore + ' points';

	line.appendChild(name);
	line.appendChild(score);
	return line;
}

function renderScores() {
	resultField.innerHTML = '';
	records.forEach(element => {	
		resultField.appendChild(createRecordLine(element.name, element.score));
	});
}