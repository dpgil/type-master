// point variables
var correctCount = 0;
var totalPoints = 0;
var pointGain = 100;
var pointLoss = 1000;

// whether or not the game is over
var gameOver = true;

// interval setter
var interval;
// how often a new key gets activated
var intervalMins = [300, 200, 150, 100, 75, 50, 25];
var intervalMaxs = [500, 400, 300, 200, 150, 100, 50];
var intervalIndex = 0;

var levelThresh = 30;


// colors
var activatedColor = "#FF9999";
var deactivatedColor = "#EFF0F2";
var gameOverColor = "#FF6666";

var keyCodes = [65, 83, 68, 70, 74, 75, 76, 186];

var keyCodeToChar = {
	65 : "a",
	83 : "s",
	68 : "d",
	70 : "f",
	74 : "j",
	75 : "k",
	76 : "l",
	186 : ";"
};

var activated = {
	65 : false,
	83 : false,
	68 : false,
	70 : false,
	74 : false,
	75 : false,
	76 : false,
	186 : false
};

function startGame() {
	// resets keys
	resetKeys();
	resetPoints();

	// reset spawn rate
	intervalIndex = 0;

	// hides play message
	var message = document.getElementById("message");
	message.style.visibility = "Collapse";
	gameOver = false;

	// kicks off gameplay
	update();
}

// to be called every interval seconds
// activates random keys, the driver behind the gameplay
function update() {
	// set a random key to red
	activateRandomKey();

	// continues to spawn new random keys until the game is over
	if (!gameOver) {
		var min = intervalMins[intervalIndex];
		var max = intervalMaxs[intervalIndex];
		setTimeout(update, getRandomInt(min,max));
	}
}

// checks if the game is over i.e., all keys are activated
function checkGameOver() {
	var over = true;

	// if any keys aren't activated, the game is still playing
	for (i=0; i < keyCodes.length; i++) {
		if (!activated[keyCodes[i]]) {
			return;
		}
	}

	// game is over if we reached here
	endGame();
}

// generates a number between interval min and interval max
// spawn time to decide when to activate the next key
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// sets points and count back to zero
function resetPoints() {
	correctCount = 0;
	totalPoints = 0;
	updatePointTotal();
}

// sets keys back to home keys
function resetKeys() {
	var a = document.getElementById("a");
	a.innerHTML = "a";
	//a.style.background = gameOverColor;
	var s = document.getElementById("s");
	s.innerHTML = "s";
	//s.style.background = gameOverColor;
	var d = document.getElementById("d");
	d.innerHTML = "d";
	//d.style.background = gameOverColor;
	var f = document.getElementById("f");
	f.innerHTML = "f";
	//f.style.background = gameOverColor;
	var j = document.getElementById("j");
	j.innerHTML = "j";
	//j.style.background = gameOverColor;
	var k = document.getElementById("k");
	k.innerHTML = "k";
	//k.style.background = gameOverColor;
	var l = document.getElementById("l");
	l.innerHTML = "l";
	//l.style.background = gameOverColor;
	var x = document.getElementById(";");
	x.innerHTML = ";";

	// deactivate every key in terms of the game
	for (i=0; i < keyCodes.length; i++) {
		deactivateKey(keyCodes[i]);
	}
}

// sets keys to GAME OVER
function setKeys() {
	// display G A M E O V E R in the home keys
	var a = document.getElementById("a");
	a.innerHTML = "G";
	//a.style.background = gameOverColor;
	var s = document.getElementById("s");
	s.innerHTML = "A";
	//s.style.background = gameOverColor;
	var d = document.getElementById("d");
	d.innerHTML = "M";
	//d.style.background = gameOverColor;
	var f = document.getElementById("f");
	f.innerHTML = "E";
	//f.style.background = gameOverColor;
	var j = document.getElementById("j");
	j.innerHTML = "O";
	//j.style.background = gameOverColor;
	var k = document.getElementById("k");
	k.innerHTML = "V";
	//k.style.background = gameOverColor;
	var l = document.getElementById("l");
	l.innerHTML = "E";
	//l.style.background = gameOverColor;
	var x = document.getElementById(";");
	x.innerHTML = "R";
}

// ends the game
function endGame() {
	gameOver = true;

	// sets keys to GAME OVER
	setKeys();

	// adds in replay message
	var message = document.getElementById("message");
	message.innerHTML = "Press space to play again";
	message.style.visibility = "Visible";
}

// makes the speed of key activation faster
function updateLevelThresh() {
	// only makes it faster after 30 correct key presses
	if (correctCount < levelThresh) {
		return;
	}

	// moves to the next speed so long as we're at the end of the array
	if (intervalIndex < intervalMins.length - 1) {
		intervalIndex++;
	}

	// resets the counter
	correctCount = 0;
}

// randomly activates a key
function activateRandomKey() {
	var unactivatedKeys = [];
	//var keyCode = keyCodes[Math.floor(Math.random() * keyCodes.length)];
	for (i=0; i < keyCodes.length; i++) {
		if (!activated[keyCodes[i]]) {
			unactivatedKeys.push(keyCodes[i]);
		}
	}

	// random index of all available keys
	var keyCode = unactivatedKeys[Math.floor(Math.random() * unactivatedKeys.length)];
	if (!activated[keyCode]) {
		activateKey(keyCode);
	}
}

// changes a key to specified color
function changeColor(key, color) {
	key.style.background = color;
}

// changes a key to color red
function activateKey(code) {
	if (code in keyCodeToChar) {
		// makes the key red and updates its status
		var key = document.getElementById(keyCodeToChar[code]);
		changeColor(key, activatedColor);
		activated[code] = true;

		// checks if we have activated every one
		checkGameOver();
	}
}

// updates the point total display to reflect the current points
function updatePointTotal() {
	var totalDisplay = document.getElementById("total-points");
	totalDisplay.innerHTML = totalPoints;
}

// changes a key back to color grey
function deactivateKey(code) {
	// exclude invalid key presses
	if (code in keyCodeToChar) {
		// points only count when we're playing
		if (!gameOver) {
			// key is red, user pressed it correctly
			if (activated[code]) {
				totalPoints = totalPoints + pointGain;
				correctCount++;

				// if we got a certain amount correct, makes it faster
				updateLevelThresh();
			} else {
				totalPoints = totalPoints - pointLoss;
			}
			updatePointTotal();
		}

		// so we can deactivate keys internally
		var key = document.getElementById(keyCodeToChar[code]);
		changeColor(key, deactivatedColor);
		activated[code] = false;
	}
}

// key pressed
window.onkeydown = function(e) {
	if (gameOver) {
		// since space is used to start again
		if (e.keyCode === 32) {
			startGame();
		}
	} else {
		// we're playing the game. press the key
		deactivateKey(e.keyCode);
	}
}