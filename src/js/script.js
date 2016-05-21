"use strict";

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = 
			window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
		        timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
	    };
	}
}());

var elFeatures = document.querySelector('body > section'),
	qToggDisp = document.querySelectorAll('body > section menu li input'),
	toggLen = qToggDisp.length;

function animScrollTo(currScroll, trgtScroll) {
	var delt =
			trgtScroll - currScroll > 50
				? 30
				: trgtScroll - currScroll > 10
					? 5
					: 1;
	delt =
		currScroll < trgtScroll
			? delt
			: delt * -10;

	if(currScroll !== trgtScroll) {
		currScroll = currScroll + delt;
		window.scrollTo(0, currScroll);

		requestAnimationFrame(function() {
			animScrollTo(currScroll, trgtScroll);
		});	
	}
}
function showTheFeatures() {
	for(var x=0;x<toggLen;++x) {
		qToggDisp[x].className = 'vhidden';
	}
	this.className = 'vhidden checked';

	elFeatures.className = this.getAttribute('id');

	var currScroll =
			document.documentElement.scrollTop
				? document.documentElement.scrollTop
				: document.body.scrollTop
					? document.body.scrollTop
					: 0;
	animScrollTo(currScroll, elFeatures.offsetTop);
}
for(var x=0;x<toggLen;++x) {
	if(window.addEventListener) {
		qToggDisp[x].addEventListener('change', showTheFeatures);
	} else {
		(function(elem) {
			elem.attachEvent('onchange', function() {
				elem.blur();
				showTheFeatures.call(elem);
			});
		})(qToggDisp[x]);
	}
}

/* <details> shim */
var elAboutCTA = document.querySelector('summary'),
	elAbout = elAboutCTA.parentNode;
function toggleDetails() {
	if(~elAbout.className.indexOf('closed')) {
		elAbout.className = '';
		elAbout.setAttribute('open','open');
	} else {
		elAbout.className = 'closed';
		elAbout.removeAttribute('open');
	}
}
if(elAbout.open === undefined) {
	if(window.addEventListener) {
		elAboutCTA.addEventListener('mousedown', toggleDetails);
	} else {
		elAboutCTA.attachEvent('onmousedown', toggleDetails);
	}
	elAbout.id = 'not-native';
} else {
	elAbout.className = '';
}