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

var keyCodes = [65, 83, 68, 70, 74, 75, 76, 186];

var totalPoints = 0;


function start() {
	// calls update every half second
	setInterval(update, 500);
}

function update() {
	randomKey();
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
		changeColor(key, "#FF9999");
		activated[code] = true;
	}
}

function updatePointTotal() {
	var totalDisplay = document.getElementById("total-points");
	totalDisplay.innerHTML = totalPoints;
}

// changes a key back to color grey
function deactivateKey(code) {
	if (code in keyCodeToChar) {
		// key is red, user pressed it correctly
		if (activated[code]) {
			totalPoints = totalPoints + 100;
			updatePointTotal();
		}

		var key = document.getElementById(keyCodeToChar[code]);
		changeColor(key, "#EFF0F2");
		activated[code] = false;
	}
}

// key unpressed
window.onkeyup = function(e) {
	//deactivateKey(e.keyCode);
}

// key pressed
window.onkeydown = function(e) {
	//activateKey(e.keyCode);
	deactivateKey(e.keyCode);
}

// starts the timer
start();