var keyCodes = [65, 83, 68, 70, 74, 75, 76, 186];

// point variables
var totalPoints = 0;
var pointGain = 100;
var pointLoss = 1000;

// whether or not the game is over
var gameOver = false;

// interval setter
var interval;
// how often a new key gets activated
// TODO: add random activation within a range
//var intervalMin = 300;
//var intervalMax = 700;
var intervalLength = 500;

// colors
var activatedColor = "#FF9999";
var deactivatedColor = "#EFF0F2";
var gameOverColor = "#FF6666";

var keyCodeToChar = {
	65 : "a",
	83 : "s",
	68 : "d",
	70 : "f",
	//71 : "g",
	//72 : "h",
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
	//71 : "g",
	//72 : "h",
	74 : false,
	75 : false,
	76 : false,
	186 : false
};

function start() {
	// calls update every half second
	interval = setInterval(update, 500);
}

function update() {
	randomKey();
}

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

function endGame() {
	gameOver = true;

	// clears interval calling of update method
	clearInterval(interval);

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
	//x.style.background = gameOverColor;
}

// randomly activates a key
function randomKey() {
	var keyCode = keyCodes[Math.floor(Math.random() * keyCodes.length)];
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
		var key = document.getElementById(keyCodeToChar[code]);
		changeColor(key, activatedColor);
		activated[code] = true;
		checkGameOver();
	}
}

function updatePointTotal() {
	var totalDisplay = document.getElementById("total-points");
	totalDisplay.innerHTML = totalPoints;
}

// changes a key back to color grey
function deactivateKey(code) {
	// exclude invalid key presses
	if (code in keyCodeToChar) {
		// key is red, user pressed it correctly
		if (activated[code]) {
			totalPoints = totalPoints + pointGain;
		} else {
			totalPoints = totalPoints - pointLoss;
		}
		updatePointTotal();

		var key = document.getElementById(keyCodeToChar[code]);
		changeColor(key, deactivatedColor);
		activated[code] = false;
	}
}

// key unpressed
window.onkeyup = function(e) {
	//deactivateKey(e.keyCode);
}

// key pressed
window.onkeydown = function(e) {
	if (!gameOver) {
		//activateKey(e.keyCode);
		deactivateKey(e.keyCode);
	}
}

// starts the timer
start();