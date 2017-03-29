var keyCodes = {
	65 : "a",
	83 : "s",
	68 : "d",
	70 : "f",
	71 : "g",
	72 : "h",
	74 : "j",
	75 : "k",
	76 : "l",
	186 : ";"
};

function activateKey(code) {
	if (code in keyCodes) {
		var key = document.getElementById(keyCodes[code]);
		key.style.background = "#FF9999";
	}
}

function deactivateKey(code) {
	if (code in keyCodes) {
		var key = document.getElementById(keyCodes[code]);
		key.style.background = "#EFF0F2";
	}
}

// key unpressed
window.onkeyup = function(e) {
	deactivateKey(e.keyCode);
}

// key pressed
window.onkeydown = function(e) {
	activateKey(e.keyCode);
}