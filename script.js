// whether or not the game is over
var gameOver = true;

// how many keys have been deactivated so far
var currentCount = 0;
// min and max times for a new key to be activated based on the current level
var intervalMin = 500;
var intervalMax = 800;
// number which to take away from interval min and max
var intervalMinLoss = 3;
var intervalMaxLoss = 5;
// current level
var level = 0;

// colors
var activatedColor = "#FF9999";
var deactivatedColor = "#EFF0F2";
var gameOverColor = "#FF6666";

// timer variables
var startTime;
var timer;

// stores all key codes for keys used in the game
var keyCodes = [65, 83, 68, 70, 74, 75, 76, 186];

// converts key code to its corresponding character
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

// whether or not each of the keys are activated
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

// (re)start game
function startGame() {
	// resets keys
	resetKeys();
	resetTimer();
	resetInterval();

	// hides play message
	hidePlayMessage();
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
		setTimeout(update, getRandomInt(intervalMin, intervalMax));
	}
}

// checks if the game is over i.e., all keys are activated
function checkGameOver() {
	// if any keys aren't activated, the game is still playing
	for (i=0; i < keyCodes.length; i++) {
		if (!activated[keyCodes[i]]) {
			return;
		}
	}

	// game is over if we reached here
	endGame();
}

function hidePlayMessage() {
	var message = document.getElementById("message");
	message.style.visibility = "Collapse";
}

function showReplayMessage() {
	// adds in replay message
	var message = document.getElementById("message");
	message.innerHTML = "Press space to play again";
	message.style.visibility = "Visible";
}

// generates a number between interval min and interval max
// spawn time to decide when to activate the next key
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetTimer() {
	startTime = Date.now();
	timer = setInterval(function() {
    	var elapsedTime = Date.now() - startTime;
    	document.getElementById("timer").innerHTML = elapsedTime;
	}, 42);
}

function resetInterval() {
	intervalMin = 500;
	intervalMax = 800;
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

	// stops the timer
	clearInterval(timer);

	// sets keys to GAME OVER
	setKeys();
	showReplayMessage();
}

// randomly activates a key
function activateRandomKey() {
	var unactivatedKeys = [];

	// grabs all available keys
	for (i=0; i < keyCodes.length; i++) {
		if (!activated[keyCodes[i]]) {
			unactivatedKeys.push(keyCodes[i]);
		}
	}

	// random index of all available keys
	var keyCode = unactivatedKeys[Math.floor(Math.random() * unactivatedKeys.length)];
	activateKey(keyCode);
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

// changes a key back to color grey
function deactivateKey(code) {
	// exclude invalid key presses
	if (code in keyCodeToChar) {
		// points only count when we're playing
		if (!gameOver) {
			// key is red, user pressed it correctly
			if (activated[code]) {
				// makes the gameplay slightly faster
				if (intervalMax > 200) {
					intervalMax = intervalMax - intervalMaxLoss;
					intervalMin = intervalMin - intervalMinLoss;
				}
			}
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