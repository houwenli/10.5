var GET;
var stage;
var fps = 24;
var library;
window.onload = function(){
	startLoad();
	console.log(library);
	createScene();
	//setTimeout(startLoad, 600);
}

var Utils = {
	setCookie : function (name, value) {
		window.localStorage.setItem(name, value);
	},
	getCookie : function (name) {
		return window.localStorage.getItem(name);
	},
	bindEvent : function (el, eventName, eventHandler) {
		if (el.addEventListener) {
			el.addEventListener(eventName, eventHandler, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + eventName, eventHandler);
		}
	},
	getObjectLeft : function (element) {
		var result = element.offsetLeft;
		if (element.offsetParent)
			result += Utils.getObjectLeft(element.offsetParent);
		return result;
	},
	getObjectTop : function (element) {
		var result = element.offsetTop;
		if (element.offsetParent)
			result += Utils.getObjectTop(element.offsetParent);
		return result;
	},
	parseGet : function () {
		var get = {};
		var s = new String(window.location);
		var p = s.indexOf("?");
		var tmp,
		params;
		if (p != -1) {
			s = s.substr(p + 1, s.length);
			params = s.split("&");
			for (var i = 0; i < params.length; i++) {
				tmp = params[i].split("=");
				get[tmp[0]] = tmp[1];
			}
		}
		return get;
	},
	preventEvent : function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		e.returnValue = false;
		return false;
	},
	globalPixelScale : 1,
	getMouseCoord : function (event, object) {
		var e = event || window.event;
		if (e.touches)
			e = e.touches[0];
		if (!e)
			return {
				x : 0,
				y : 0
			};
		var x = 0;
		var y = 0;
		var mouseX = 0;
		var mouseY = 0;
		if (object) {
			x = Utils.getObjectLeft(object);
			y = Utils.getObjectTop(object);
		}
		if (e.pageX || e.pageY) {
			mouseX = e.pageX;
			mouseY = e.pageY;
		} else if (e.clientX || e.clientY) {
			mouseX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
			mouseY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
		}
		var retX = (mouseX - x);
		var retY = (mouseY - y);
		return {
			x : retX,
			y : retY
		};
	},
}
function startLoad(){
	var assets = [
		{
			"name" : "1-1",
			"src" : "1-1.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-1.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-10",
			"src" : "1-10.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-10.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-11",
			"src" : "1-11.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-11.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-12",
			"src" : "1-12.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-12.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-13",
			"src" : "1-13.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-13.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-2",
			"src" : "1-2.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-2.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-3",
			"src" : "1-3.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-3.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-4",
			"src" : "1-4.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-4.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-5",
			"src" : "1-5.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-5.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-6",
			"src" : "1-6.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-6.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-7",
			"src" : "1-7.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-7.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-8",
			"src" : "1-8.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-8.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "1-9",
			"src" : "1-9.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/1-9.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "10",
			"src" : "10.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/10.png*/,
			"width" : 33,
			"height" : 32
		}, {
			"name" : "100",
			"src" : "100.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/100.png*/,
			"width" : 33,
			"height" : 32
		}, {
			"name" : "2-1",
			"src" : "2-1.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-1.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-10",
			"src" : "2-10.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-10.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-11",
			"src" : "2-11.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-11.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-12",
			"src" : "2-12.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-12.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-13",
			"src" : "2-13.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-13.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-2",
			"src" : "2-2.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-2.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-3",
			"src" : "2-3.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-3.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-4",
			"src" : "2-4.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-4.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-5",
			"src" : "2-5.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-5.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-6",
			"src" : "2-6.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-6.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-7",
			"src" : "2-7.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-7.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-8",
			"src" : "2-8.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-8.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "2-9",
			"src" : "2-9.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/2-9.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "25",
			"src" : "25.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/25.png*/,
			"width" : 33,
			"height" : 32
		}, {
			"name" : "3-1",
			"src" : "3-1.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-1.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-10",
			"src" : "3-10.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-10.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-11",
			"src" : "3-11.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-11.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-12",
			"src" : "3-12.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-12.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-13",
			"src" : "3-13.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-13.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-2",
			"src" : "3-2.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-2.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-3",
			"src" : "3-3.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-3.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-4",
			"src" : "3-4.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-4.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-5",
			"src" : "3-5.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-5.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-6",
			"src" : "3-6.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-6.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-7",
			"src" : "3-7.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-7.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-8",
			"src" : "3-8.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-8.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "3-9",
			"src" : "3-9.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/3-9.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-1",
			"src" : "4-1.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-1.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-10",
			"src" : "4-10.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-10.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-11",
			"src" : "4-11.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-11.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-12",
			"src" : "4-12.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-12.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-13",
			"src" : "4-13.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-13.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-2",
			"src" : "4-2.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-2.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-3",
			"src" : "4-3.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-3.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-4",
			"src" : "4-4.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-4.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-5",
			"src" : "4-5.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-5.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-6",
			"src" : "4-6.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-6.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-7",
			"src" : "4-7.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-7.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-8",
			"src" : "4-8.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-8.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "4-9",
			"src" : "4-9.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/4-9.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "5",
			"src" : "5.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/5.png*/,
			"width" : 33,
			"height" : 32
		}, {
			"name" : "50",
			"src" : "50.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/50.png*/,
			"width" : 33,
			"height" : 32
		}, {
			"name" : "about",
			"src" : "about.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/about.png*/,
			"width" : 107,
			"height" : 29
		}, {
			"name" : "aboutscreen",
			"src" : "aboutscreen.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/aboutscreen.png*/,
			"width" : 480,
			"height" : 320
		}, {
			"name" : "back",
			"src" : "back.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/back.png*/,
			"width" : 75,
			"height" : 103
		}, {
			"name" : "bik",
			"src" : "bik.jpg"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/bik.jpg*/,
			"width" : 480,
			"height" : 285
		}, {
			"name" : "bust",
			"src" : "bust.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/bust.png*/,
			"width" : 135,
			"height" : 26
		}, {
			"name" : "description",
			"src" : "description.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/description.png*/,
			"width" : 480,
			"height" : 320
		}, {
			"name" : "gamebackground",
			"src" : "gamebackground.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/gamebackground.png*/,
			"width" : 480,
			"height" : 320
		}, {
			"name" : "hit",
			"src" : "hit.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/hit.png*/,
			"width" : 66,
			"height" : 29
		}, {
			"name" : "lose",
			"src" : "lose.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/lose.png*/,
			"width" : 141,
			"height" : 21
		}, {
			"name" : "menubackground",
			"src" : "menubackground.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/menubackground.png*/,
			"width" : 480,
			"height" : 320
		}, {
			"name" : "more",
			"src" : "more.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/more.png*/,
			"width" : 107,
			"height" : 29
		}, {
			"name" : "num",
			"src" : "num.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/num.png*/,
			"width" : 13,
			"height" : 16,
			"frames" : 10
		}, {
			"name" : "playagain",
			"src" : "playagain.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/playagain.png*/,
			"width" : 62,
			"height" : 61
		}, {
			"name" : "play_again",
			"src" : "play_again.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/play_again.png*/,
			"width" : 62,
			"height" : 61
		}, {
			"name" : "sound",
			"src" : "sound.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/sound.png*/,
			"width" : 29,
			"height" : 27,
			"frames" : 2
		}, {
			"name" : "sound_off",
			"src" : "sound_off.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/sound_off.png*/,
			"width" : 12,
			"height" : 19
		}, {
			"name" : "sound_on",
			"src" : "sound_on.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/sound_on.png*/,
			"width" : 29,
			"height" : 27
		}, {
			"name" : "splash",
			"src" : "splash.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/splash.png*/,
			"width" : 480,
			"height" : 320
		}, {
			"name" : "stand",
			"src" : "stand.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/stand.png*/,
			"width" : 66,
			"height" : 29
		}, {
			"name" : "start",
			"src" : "start.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/start.png*/,
			"width" : 107,
			"height" : 29
		}, {
			"name" : "tie",
			"src" : "tie.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/tie.png*/,
			"width" : 156,
			"height" : 22
		}, {
			"name" : "win",
			"src" : "win.png"/*tpa=http://115.28.59.83/games/game/Tblackjack/blackjack_files/win.png*/,
			"width" : 137,
			"height" : 26
		}
	];
	library = new AssetsLibrary('images', Utils.globalScale, assets);
}
function Vector(x, y) {
	if (typeof(x) == 'undefined')
		x = 0;
	this.x = x;
	if (typeof(y) == 'undefined')
		y = 0;
	this.y = y;
	this.clone = function () {
		return new Vector(this.x, this.y);
	}
	this.add = function (p) {
		this.x += p.x;
		this.y += p.y;
		return this;
	}
	this.subtract = function (p) {
		this.x -= p.x;
		this.y -= p.y;
		return this;
	}
	this.mult = function (n) {
		this.x *= n;
		this.y *= n;
		return this;
	}
	this.invert = function () {
		this.mult(-1);
		return this;
	}
	this.rotate = function (angle, offset) {
		if (typeof(offset) == 'undefined')
			offset = new Vector(0, 0);
		var r = this.clone();
		r.subtract(offset);
		r.x = this.x * Math.cos(angle) + this.y * Math.sin(angle);
		r.y = this.x * -Math.sin(angle) + this.y * Math.cos(angle);
		r.add(offset);
		this.x = r.x;
		this.y = r.y;
		return this;
	}
	this.normalize = function (angle, offset) {
		if (typeof(offset) == 'undefined')
			offset = new Vector(0, 0);
		this.subtract(offset);
		this.rotate(-angle);
		return this;
	}
	this.getLength = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	this.distanceTo = function (p) {
		p2 = this.clone();
		p2.subtract(p);
		return p2.getLength();
	}
}
var Rectangle = function (x, y, w, h, angle) {
	this.center = new Vector(x, y);
	this.width = w;
	this.height = h;
	this.angle = angle;
	this.vertices = [];
	this.AABB = [];
	this.clone = function () {
		return new Rectangle(this.center.x, this.center.y, this.width, this.height, this.angle);
	}
	this.refreshVertices = function () {
		var w = this.width / 2;
		var h = this.height / 2;
		this.vertices = [];
		this.vertices.push(new Vector(-w, h));
		this.vertices.push(new Vector(w, h));
		this.vertices.push(new Vector(w, -h));
		this.vertices.push(new Vector(-w, -h));
		this.AABB = [this.center.clone(), this.center.clone()];
		for (var i = 0; i < 4; i++) {
			this.vertices[i].rotate(-this.angle, this.center);
			if (this.vertices[i].x < this.AABB[0].x)
				this.AABB[0].x = this.vertices[i].x;
			if (this.vertices[i].x > this.AABB[1].x)
				this.AABB[1].x = this.vertices[i].x;
			if (this.vertices[i].y < this.AABB[0].y)
				this.AABB[0].y = this.vertices[i].y;
			if (this.vertices[i].y > this.AABB[1].y)
				this.AABB[1].y = this.vertices[i].y;
		}
	}
	this.move = function (x, y) {
		this.center.add(new Vector(x, y));
		this.refreshVertices();
	}
	this.rotate = function (angle) {
		this.angle += angle;
		this.refreshVertices();
	}
	this.hitTestPoint = function (point) {
		var p = point.clone();
		p.normalize(-this.angle, this.center);
		return ((Math.abs(p.x) <= (this.width / 2)) && (Math.abs(p.y) <= (this.height / 2)));
	}
	this.hitTestRectangle = function (rect) {
		var r1 = this.clone();
		var r2 = rect.clone();
		var len,
		len1,
		len2;
		r1.move(-this.center.x, -this.center.y);
		r2.move(-this.center.x, -this.center.y);
		r2.center.rotate(this.angle);
		r1.rotate(-this.angle);
		r2.rotate(-this.angle);
		len = Math.max(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x) - Math.min(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x);
		len1 = r1.AABB[1].x - r1.AABB[0].x;
		len2 = r2.AABB[1].x - r2.AABB[0].x;
		if (len > len1 + len2)
			return false;
		len = Math.max(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y) - Math.min(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y);
		len1 = r1.AABB[1].y - r1.AABB[0].y;
		len2 = r2.AABB[1].y - r2.AABB[0].y;
		if (len > len1 + len2)
			return false;
		r1.move(-r2.center.x, -r2.center.y);
		r2.move(-r2.center.x, -r2.center.y);
		r1.center.rotate(r2.angle);
		r1.refreshVertices();
		r1.rotate(-r2.angle);
		r2.rotate(-r2.angle);
		len = Math.max(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x) - Math.min(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x);
		len1 = r1.AABB[1].x - r1.AABB[0].x;
		len2 = r2.AABB[1].x - r2.AABB[0].x;
		if (len > len1 + len2)
			return false;
		len = Math.max(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y) - Math.min(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y);
		len1 = r1.AABB[1].y - r1.AABB[0].y;
		len2 = r2.AABB[1].y - r2.AABB[0].y;
		if (len > len1 + len2)
			return false;
		return true;
	}
	this.refreshVertices();
}
var Asset = function (name, src, w, h, f, l) {
	this.name = name + '';
	this.src = src + '';
	this.width = w;
	this.height = h;
	this.frames = f;
	this.layers = l;
	this.bitmap = null;
	this.object = null;
	this.ready = (this.width && this.height);
	this.detectSize = function () {
		if (!this.bitmap)
			return false;
		try {
			if (isNaN(this.width)) {
				this.width = this.bitmap.width ? parseInt(this.bitmap.width) : 0;
			}
			if (isNaN(this.height)) {
				this.height = this.bitmap.height ? parseInt(this.bitmap.height) : 0;
			}
		} catch (e) {
			if (CRENDER_DEBUG)
				console.log(e);
		}
		return (!isNaN(this.width) && !isNaN(this.height));
	}
	this.normalize = function (scale) {
		if (this.ready)
			return;
		if (!this.detectSize())
			return;
		if (isNaN(this.frames) || this.frames < 1)
			this.frames = 1;
		if (isNaN(this.layers) || this.layers < 1)
			this.layers = 1;
		this.width = Math.ceil((this.width / this.layers) / scale);
		this.height = Math.ceil((this.height / this.frames) / scale);
		this.ready = true;
	}
}
/*所有的资源库*/ 
var AssetsLibrary = function (path, scale, assets) {
	var self = this;
	this.path = 'images';
	this.scale = 1;
	this.items = {};
	this.bitmaps = {};
	this.loaded = false;
	this.onload = null;
	this.onloadprogress = null;
	this.spriteClass = Sprite;
	this.init = function (path, scale) {
		if (typeof path != 'undefined') {
			this.path = path + '';
		}
		if (typeof scale != 'undefined') {
			this.scale = parseFloat(scale);
			if (isNaN(this.scale))
				this.scale = 1;
		}
	}
	this.addAssets = function (data) {
		if (typeof data == 'undefined')
			return;
		if (typeof data != 'object')
			return;
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			item.noscale = (typeof item.noscale == 'undefined') ? false : item.noscale;
			if (!item.noscale)
				item.src = '%SCALE%/' + item.src;
			this.addAsset(item.src, item.name, item.width, item.height, item.frames, item.layers);
		}
	}
	this.addAsset = function (src, name, w, h, f, l) {
		function src2name(src) {
			var name = src.split('/');
			name = name.pop();
			name = name.split('.');
			name = name.shift() + '';
			return name;
		}
		src = src.replace('%SCALE%', '%PATH%/' + this.scale);
		src = src.replace('%PATH%', this.path);
		if (typeof name == 'undefined')
			name = src2name(src);
		var asset = new Asset(name, src, w, h, f, l);
		this.items[name] = asset;
		return asset;
	}
	this.getAsset = function (name, checkLoad) {
		var asset = null;
		if ((typeof this.items[name] != 'undefined') && (this.items[name].bitmap)) {
			checkLoad = (typeof checkLoad == 'undefined') ? true : checkLoad;
			asset = (!checkLoad || this.items[name].ready) ? this.items[name] : null;
		}
		if (!asset) {
			throw new Error('Trying to get undefined asset "' + name + '"');
		}
		return asset;
	}
	this.getSprite = function (name, params) {
		var mc = null;
		try {
			var asset = this.getAsset(name, true);
			mc = new this.spriteClass(asset.bitmap, asset.width, asset.height, asset.frames, asset.layers);
		} catch (e) {
			mc = new this.spriteClass(null, 1, 1, 1, 1);
		}
		if (typeof params == 'object') {
			for (var prop in params)
				mc[prop] = params[prop];
		}
		return mc;
	}
	this.getBitmap = function (name) {
		try {
			var asset = this.getAsset(name, true);
			return asset.bitmap;
		} catch (e) {
			return null;
		}
	}
	this.init(path, scale);
	this.addAssets(assets);
}
function createScene() {
	block_popup = false;
	createStage();
	createArea();
	stage.start();
}
/*创建舞台*/ 
function createStage() {
	if (stage) {
		stage.destroy();
		stage.stop();
	}
	stage = new Stage('screen', 480, 320, false);
	stage.delay = 1000 / fps;
	stage.ceilSizes = true;
	stage.showFPS = false;
}
/*舞台对象*/ 
function Stage(cnsId, w, h) {
	var self = this;
	this.canvas = document.getElementById(cnsId);
	this.canvas.renderController = this;
	this.canvas.ctx = this.canvas.getContext('2d');
	this.screenWidth = w;
	this.screenHeight = h;
	this.viewport = {
		x : 0,
		y : 0
	};
	this.objects = [];
	this.objectsCounter = 0;
	this.buffer = document.createElement('canvas');
	this.buffer.width = w * Utils.globalScale;
	this.buffer.height = h * Utils.globalScale;
	this.buffer.ctx = this.buffer.getContext('2d');
	this.delay = 40;
	this.fillColor = false;
	this.started = false;
	this.fps = 0;
	this.lastFPS = 0;
	this.showFPS = false;
	this.pixelClickEvent = false;
	this.pixelMouseUpEvent = false;
	this.pixelMouseDownEvent = false;
	this.pixelMouseMoveEvent = false;
	this.ceilSizes = false;
	this.tmMain
	this.tmFPS
	this.partialUpdate = false;
	this.clearLock = false;
	this.destroy = function () {
		clearTimeout(this.tmMain);
		clearTimeout(this.tmFPS);
		this.stop();
		this.clear();
		this.clearScreen(this.canvas);
	}
	this.clearScreen = function (canvas) {
		canvas.ctx.clearRect(0, 0, this.screenWidth * Utils.globalScale * Utils.globalPixelScale, this.screenHeight * Utils.globalScale * Utils.globalPixelScale);
	}
	this.findMaxZIndex = function () {
		var max = -1;
		var ix = false;
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i].zIndex > max) {
				max = this.objects[i].zIndex;
				ix = i;
			}
		}
		return {
			index : ix,
			zIndex : max
		};
	};
	this.findMinZIndex = function () {
		var min = -1;
		var ix = false;
		for (var i = 0; i < this.objects.length; i++) {
			if (i == 0) {
				min = this.objects[i].zIndex;
				ix = 0;
			}
			if (this.objects[i].zIndex < min) {
				min = this.objects[i].zIndex;
				ix = i;
			}
		}
		return {
			index : ix,
			zIndex : min
		};
	};
	this.addChild = function (item) {
		var f = this.findMaxZIndex();
		var z = item.zIndex;
		if (f.index !== false)
			item.zIndex = f.zIndex + 1;
		else
			item.zIndex = 0;
		this.objectsCounter++;
		item.uid = this.objectsCounter;
		item.stage = this;
		this.objects.push(item);
		if (z != 0) {
			this.setZIndex(item, ~~z);
		}
		item.dispatchEvent("add", {
			target : item
		});
		return item;
	};
	this.removeChild = function (item) {
		if (item) {
			this.clearObjectTweens(item);
			item.dispatchEvent("remove", {
				target : item
			});
			item.stage = null;
			this.objects = Utils.removeFromArray(this.objects, item);
		}
	};
	this.setZIndex = function (item, index) {
		var bSort = true;
		var i,
		tmp;
		item.zIndex = index;
		while (bSort) {
			bSort = false;
			for (i = 0; i < this.objects.length - 1; i++) {
				if (this.objects[i].zIndex > this.objects[i + 1].zIndex) {
					tmp = this.objects[i];
					this.objects[i] = this.objects[i + 1];
					this.objects[i + 1] = tmp;
					bSort = true;
				}
			}
		}
	}
	this.hitTestPointObject = function (obj, x, y, pixelCheck, includeDragged, debug) {
		var cX,
		cY,
		cW,
		cH,
		mX,
		mY,
		r,
		present,
		imageData;
		cW = obj.width * Math.abs(obj.scaleX);
		cH = obj.height * Math.abs(obj.scaleY);
		cX = obj.x - cW / 2;
		cY = obj.y - cH / 2;
		mX = x;
		mY = y;
		if (!obj.ignoreViewport) {
			mX += this.viewport.x;
			mY += this.viewport.y;
		}
		present = false;
		if (obj.rotation == 0) {
			if (cX <= mX && cY <= mY && cX + cW >= mX && cY + cH >= mY)
				present = true;
		} else {
			r = obj.getDrawRectangle();
			if (r.hitTestPoint(new Vector(mX, mY)))
				present = true;
		}
		if (present && pixelCheck) {
			this.buffer.width = this.screenWidth * Utils.globalScale * Utils.globalPixelScale;
			this.buffer.height = this.screenHeight * Utils.globalScale * Utils.globalPixelScale;
			this.clearScreen(this.buffer);
			this.renderObject(this.buffer, obj);
			var pX = Math.floor(x * Utils.globalScale * Utils.globalPixelScale);
			var pY = Math.floor(y * Utils.globalScale * Utils.globalPixelScale);
			imageData = this.buffer.ctx.getImageData(pX, pY, 1, 1);
			if (imageData.data[3] == 0)
				present = false;
		}
		if (!present && includeDragged && obj.dragged)
			present = true;
		return present;
	}
	this.getObjectsStackByCoord = function (x, y, pixelCheck, includeDragged, debug) {
		var obj;
		var tmp = [];
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i].visible || this.objects[i].eventsWhenInvisible) {
				obj = this.objects[i];
				if (this.hitTestPointObject(obj, x, y, pixelCheck, includeDragged, debug)) {
					tmp.push(obj);
				}
			}
		}
		return tmp;
	};
	this.getMaxZIndexInStack = function (stack) {
		var max = -1;
		var ix = 0;
		for (var i = 0; i < stack.length; i++) {
			if (stack[i].zIndex > max) {
				max = stack[i].zIndex;
				ix = i;
			}
		}
		return ix;
	};
	this.sortStack = function (stack, revert) {
		var bSort = true;
		var ok;
		var i,
		tmp;
		while (bSort) {
			bSort = false;
			for (i = 0; i < stack.length - 1; i++) {
				ok = false;
				if (stack[i].zIndex < stack[i + 1].zIndex && !revert)
					ok = true;
				if (stack[i].zIndex > stack[i + 1].zIndex && revert)
					ok = true;
				if (ok) {
					tmp = stack[i];
					stack[i] = stack[i + 1];
					stack[i + 1] = tmp;
					bSort = true;
				}
			}
		}
		return stack;
	}
	this.finalizeMouseCoords = function (obj, m) {
		if (!obj)
			return m;
		var eX = this.prepareMouseCoord(m.x);
		var eY = this.prepareMouseCoord(m.y);
		if (!obj.ignoreViewport) {
			eX += this.viewport.x;
			eY += this.viewport.y;
		}
		eX = eX - obj.x;
		eY = eY - obj.y;
		return {
			x : eX,
			y : eY
		};
	}
	this.prepareMouseCoord = function (val) {
		return val / Utils.globalScale / Utils.globalPixelScale;
	}
	this.checkClick = function (event) {
		var m = Utils.getMouseCoord(event, this.canvas);
		var stack = this.getObjectsStackByCoord(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y), this.pixelClickEvent, false, true);
		var ret,
		f;
		if (stack.length > 0) {
			stack = this.sortStack(stack);
			for (var i = 0; i < stack.length; i++) {
				f = this.finalizeMouseCoords(stack[i], m);
				ret = stack[i].dispatchEvent("click", {
						target : stack[i],
						x : f.x,
						y : f.y
					});
				if (ret === false)
					return;
			}
		}
	};
	this.checkContextMenu = function (event) {
		var m = Utils.getMouseCoord(event, this.canvas);
		var stack = this.getObjectsStackByCoord(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y), this.pixelClickEvent);
		var ret,
		f;
		if (stack.length > 0) {
			stack = this.sortStack(stack);
			for (var i = 0; i < stack.length; i++) {
				f = this.finalizeMouseCoords(stack[i], m);
				ret = stack[i].dispatchEvent("contextmenu", {
						target : stack[i],
						x : f.x,
						y : f.y
					});
				if (ret === false)
					return;
			}
		}
	};
	this.checkMouseMove = function (event) {
		var m = Utils.getMouseCoord(event, this.canvas);
		for (i = 0; i < this.objects.length; i++) {
			if (this.objects[i].dragged) {
				var eX = m.x / Utils.globalScale / Utils.globalPixelScale;
				var eY = m.y / Utils.globalScale / Utils.globalPixelScale;
				if (!this.objects[i].ignoreViewport) {
					eX += this.viewport.x;
					eY += this.viewport.y;
				}
				this.objects[i].x = eX - this.objects[i].dragX;
				this.objects[i].y = eY - this.objects[i].dragY;
			}
		}
		var stack = this.getObjectsStackByCoord(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y), this.pixelMouseMoveEvent);
		var i,
		n,
		ret,
		bOk,
		f;
		var overStack = [];
		if (stack.length > 0) {
			stack = this.sortStack(stack);
			for (i = 0; i < stack.length; i++) {
				overStack.push(stack[i]);
				f = this.finalizeMouseCoords(stack[i], m);
				if (!stack[i].mouseOn)
					ret = stack[i].dispatchEvent("mouseover", {
							target : stack[i],
							x : f.x,
							y : f.y
						});
				stack[i].mouseOn = true;
				if (ret === false)
					break;
			}
			for (i = 0; i < stack.length; i++) {
				f = this.finalizeMouseCoords(stack[i], m);
				ret = stack[i].dispatchEvent("mousemove", {
						target : stack[i],
						x : f.x,
						y : f.y
					});
				if (ret === false)
					break;
			}
		}
		for (i = 0; i < this.objects.length; i++) {
			if (this.objects[i].mouseOn) {
				bOk = false;
				for (n = 0; n < overStack.length; n++) {
					if (overStack[n] == this.objects[i])
						bOk = true;
				}
				if (!bOk) {
					this.objects[i].mouseOn = false;
					f = this.finalizeMouseCoords(stack[i], m);
					ret = this.objects[i].dispatchEvent("mouseout", {
							target : this.objects[i],
							x : f.x,
							y : f.y
						});
					if (ret === false)
						break;
				}
			}
		}
	};
	this.checkMouseDown = function (event) {
		var m = Utils.getMouseCoord(event, this.canvas);
		var stack = this.getObjectsStackByCoord(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y), this.pixelMouseDownEvent);
		var ret,
		f;
		if (stack.length > 0) {
			stack = this.sortStack(stack);
			for (var i = 0; i < stack.length; i++) {
				f = this.finalizeMouseCoords(stack[i], m);
				ret = stack[i].dispatchEvent("mousedown", {
						target : stack[i],
						x : f.x,
						y : f.y
					});
				if (ret === false)
					return;
			}
		}
	};
	this.checkMouseUp = function (event) {
		var m = Utils.getMouseCoord(event, this.canvas);
		var stack = this.getObjectsStackByCoord(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y), this.pixelMouseUpEvent, true);
		var ret,
		f;
		if (stack.length > 0) {
			stack = this.sortStack(stack);
			for (var i = 0; i < stack.length; i++) {
				f = this.finalizeMouseCoords(stack[i], m);
				ret = stack[i].dispatchEvent("mouseup", {
						target : stack[i],
						x : f.x,
						y : f.y
					});
				if (ret === false)
					return;
			}
		}
	};
	this.clear = function () {
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].dispatchEvent("remove", {
				target : this.objects[i]
			});
		}
		this.objects = [];
		this.tweens = [];
		this.timers = [];
		this.eventsListeners = [];
		this.objectsCounter = 0;
	};
	this.hitTest = function (obj1, obj2) {
		if (obj1.rotation == 0 && obj2.rotation == 0) {
			var cX1 = obj1.getX() - obj1.getWidth() / 2;
			var cY1 = obj1.getY() - obj1.getHeight() / 2;
			var cX2 = obj2.getX() - obj2.getWidth() / 2;
			var cY2 = obj2.getY() - obj2.getHeight() / 2;
			var top = Math.max(cY1, cY2);
			var left = Math.max(cX1, cX2);
			var right = Math.min(cX1 + obj1.getWidth(), cX2 + obj2.getWidth());
			var bottom = Math.min(cY1 + obj1.getHeight(), cY2 + obj2.getHeight());
			var width = right - left;
			var height = bottom - top;
			if (width > 0 && height > 0)
				return true;
			else
				return false;
		} else {
			var r1 = obj1.getDrawRectangle(),
			r2 = obj2.getDrawRectangle();
			return r1.hitTestRectangle(r2);
		}
	};
	this.drawRectangle = function (x, y, width, height, color, fill, opacity, ignoreViewport) {
		var cns = this.canvas;
		if (typeof opacity != 'undefined')
			cns.ctx.globalAlpha = opacity;
		else
			cns.ctx.globalAlpha = 1;
		cns.ctx.fillStyle = color;
		cns.ctx.strokeStyle = color;
		if (!ignoreViewport) {
			x -= this.viewport.x;
			y -= this.viewport.y;
		}
		x = x * Utils.globalScale * Utils.globalPixelScale;
		y = y * Utils.globalScale * Utils.globalPixelScale;
		width = width * Utils.globalScale * Utils.globalPixelScale;
		height = height * Utils.globalScale * Utils.globalPixelScale;
		if (fill)
			cns.ctx.fillRect(x - width / 2, y - height / 2, width, height);
		else
			cns.ctx.strokeRect(x - width / 2, y - height / 2, width, height);
	};
	this.drawCircle = function (x, y, radius, width, color, opacity, ignoreViewport) {
		this.drawArc(x, y, radius, 0, Math.PI * 2, false, width, color, opacity, ignoreViewport);
	};
	this.drawArc = function (x, y, radius, startAngle, endAngle, anticlockwise, width, color, opacity, ignoreViewport) {
		var cns = this.canvas;
		var oldLW = cns.ctx.lineWidth;
		if (typeof color == "undefined")
			color = "#000"
				cns.ctx.strokeStyle = color;
		if (typeof width == "undefined")
			width = 1;
		cns.ctx.lineWidth = width * Utils.globalScale * Utils.globalPixelScale;
		if (typeof opacity == "undefined")
			opacity = 1;
		cns.ctx.globalAlpha = opacity;
		if (!ignoreViewport) {
			x -= this.viewport.x;
			y -= this.viewport.y;
		}
		x = x * Utils.globalScale * Utils.globalPixelScale;
		y = y * Utils.globalScale * Utils.globalPixelScale;
		radius = radius * Utils.globalScale * Utils.globalPixelScale;
		cns.ctx.beginPath();
		cns.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
		cns.ctx.stroke();
		cns.ctx.lineWidth = oldLW;
	};
	this.drawPolygon = function (points, width, color, opacity, ignoreViewport) {
		if ((typeof points != "object") || !(points instanceof Array) || points.length < 2)
			return;
		for (var i = 0; i < points.length - 1; i++) {
			this.drawLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, width, color, opacity, ignoreViewport);
		}
		this.drawLine(points[i].x, points[i].y, points[0].x, points[0].y, width, color, opacity, ignoreViewport);
	}
	this.drawLine = function (x1, y1, x2, y2, width, color, opacity, ignoreViewport) {
		var cns = this.canvas;
		var oldLW = cns.ctx.lineWidth;
		if (color)
			cns.ctx.strokeStyle = color;
		else
			cns.ctx.strokeStyle = '#000';
		if (width)
			cns.ctx.lineWidth = width * Utils.globalScale * Utils.globalPixelScale;
		else
			cns.ctx.lineWidth = 1 * Utils.globalScale * Utils.globalPixelScale;
		if (opacity)
			cns.ctx.globalAlpha = opacity;
		else
			cns.ctx.globalAlpha = 1;
		if (!ignoreViewport) {
			x1 -= this.viewport.x;
			y1 -= this.viewport.y;
			x2 -= this.viewport.x;
			y2 -= this.viewport.y;
		}
		x1 = x1 * Utils.globalScale * Utils.globalPixelScale;
		y1 = y1 * Utils.globalScale * Utils.globalPixelScale;
		x2 = x2 * Utils.globalScale * Utils.globalPixelScale;
		y2 = y2 * Utils.globalScale * Utils.globalPixelScale;
		cns.ctx.beginPath();
		cns.ctx.moveTo(x1, y1);
		cns.ctx.lineTo(x2, y2);
		cns.ctx.closePath();
		cns.ctx.stroke();
		cns.ctx.lineWidth = oldLW;
	};
	this.start = function () {
		if (this.started)
			return;
		this.started = true;
		clearFPS();
		render();
	}
	this.forceRender = function () {
		if (this.started)
			render();
	}
	this.stop = function () {
		this.started = false;
	}
	function clearFPS() {
		self.lastFPS = self.fps;
		self.fps = 0;
		if (self.started)
			self.tmFPS = setTimeout(clearFPS, 1000);
	}
	this.setTextStyle = function (font, size, style, color, borderColor, canvas) {
		var cns = (canvas ? canvas : this.canvas);
		cns.ctx.fillStyle = color;
		cns.ctx.strokeStyle = borderColor;
		var s = "";
		if (style)
			s += style + " ";
		if (size)
			s += Math.floor(size * Utils.globalScale * Utils.globalPixelScale) + "px ";
		if (font)
			s += font;
		cns.ctx.font = s;
	}
	this.drawText = function (text, x, y, opacity, ignoreViewport, alignCenter, canvas) {
		var cns = (canvas ? canvas : this.canvas);
		if (typeof opacity == "undefined")
			cns.ctx.globalAlpha = 1;
		else
			cns.ctx.globalAlpha = opacity;
		if (!ignoreViewport) {
			x -= this.viewport.x;
			y -= this.viewport.y;
		}
		x = x * Utils.globalScale * Utils.globalPixelScale;
		y = y * Utils.globalScale * Utils.globalPixelScale;
		if (alignCenter)
			x = x - this.getTextWidth(text) / 2;
		cns.ctx.fillText(text, x, y);
	}
	this.strokeText = function (text, x, y, opacity, ignoreViewport, alignCenter, canvas) {
		var cns = (canvas ? canvas : this.canvas);
		if (typeof opacity == "undefined")
			cns.ctx.globalAlpha = 1;
		else
			cns.ctx.globalAlpha = opacity;
		if (!ignoreViewport) {
			x -= this.viewport.x;
			y -= this.viewport.y;
		}
		x = x * Utils.globalScale * Utils.globalPixelScale;
		y = y * Utils.globalScale * Utils.globalPixelScale;
		if (alignCenter)
			x = x - this.getTextWidth(text) / 2;
		cns.ctx.strokeText(text, x, y);
	}
	this.getTextWidth = function (str, canvas) {
		var cns = (canvas ? canvas : this.canvas);
		return cns.ctx.measureText(str).width;
	}
	this.allowDebugDrawing = false;
	this.allowStaticDebugDrawing = false;
	this.renderObject = function (cns, obj) {
		var
		r = obj.getDrawRectangle(),
		ow = obj.width * Utils.globalScale,
		oh = obj.height * Utils.globalScale,
		ox = r.center.x * Utils.globalPixelScale * Utils.globalScale - Math.floor(ow / 2),
		oy = r.center.y * Utils.globalPixelScale * Utils.globalScale - Math.floor(oh / 2),
		or = obj.rotation,
		scX = obj.scaleX * Utils.globalPixelScale,
		scY = obj.scaleY * Utils.globalPixelScale,
		canvasMod = Boolean(or != 0 || scX != 1 || scY != 1);
		if (!obj.ignoreViewport) {
			ox -= this.viewport.x * Utils.globalPixelScale * Utils.globalScale;
			oy -= this.viewport.y * Utils.globalPixelScale * Utils.globalScale;
		}
		if (canvasMod) {
			cns.ctx.save();
			cns.ctx.translate(ox + Math.floor(ow / 2), oy + Math.floor(oh / 2));
			cns.ctx.rotate(or);
			cns.ctx.scale(scX, scY);
			ox = -Math.floor(ow / 2);
			oy = -Math.floor(oh / 2);
		}
		cns.ctx.globalAlpha = obj.opacity;
		if (this.ceilSizes) {
			ow = Math.ceil(ow);
			oh = Math.ceil(oh);
		}
		if (obj.fillColor) {
			cns.ctx.fillStyle = obj.fillColor;
			cns.ctx.strokeStyle = obj.fillColor;
			cns.ctx.fillRect(ox, oy, ow, oh);
		}
		if (obj.bitmap) {
			var iw = obj.bitmap.width,
			ih = obj.bitmap.height;
			var fx = obj.currentLayer * ow + obj.offset.left * Utils.globalScale,
			fy = obj.currentFrame * oh + obj.offset.top * Utils.globalScale;
			if (fx < iw && fy < ih) {
				var fw = ow,
				fh = oh,
				masked = false;
				if (fx + fw > iw)
					fw = iw - fx;
				if (fy + fh > ih)
					fh = ih - fy;
				if (obj.mask) {
					this.buffer.ctx.save();
					this.buffer.ctx.clearRect(0, 0, fw, fh);
					this.buffer.ctx.drawImage(obj.bitmap, fx, fy, fw, fh, 0, 0, fw, fh);
					this.buffer.ctx.globalCompositeOperation = "destination-in";
					this.buffer.ctx.drawImage(obj.mask, 0, 0);
					fx = 0;
					fy = 0;
					masked = true;
				}
				try {
					cns.ctx.drawImage((masked ? this.buffer : obj.bitmap), ~~fx, ~~fy, ~~fw, ~~fh, ~~ox, ~~oy, ~~ow, ~~oh);
				} catch (e) {}
				if (masked)
					this.buffer.ctx.restore();
			}
		}
		if (canvasMod)
			cns.ctx.restore();
		if (this.allowDebugDrawing && obj.allowDebugDrawing) {
			if (this.allowStaticDebugDrawing || !obj.static) {
				obj.debugDraw();
			}
		}
		obj.dispatchEvent("render", {
			target : obj,
			canvas : cns
		});
	}
	this.clearObjectAABB = function (cns, obj) {
		var w = obj.history.AABB[1].x - obj.history.AABB[0].x;
		var h = obj.history.AABB[1].y - obj.history.AABB[0].y;
		if (!this.fillColor)
			cns.ctx.clearRect((obj.history.AABB[0].x - this.viewport.x) * Utils.globalPixelScale, (obj.history.AABB[0].y - this.viewport.y) * Utils.globalPixelScale, w * Utils.globalPixelScale, h * Utils.globalPixelScale);
		else {
			cns.ctx.fillStyle = this.fillColor;
			cns.ctx.fillRect((obj.history.AABB[0].x - this.viewport.x) * Utils.globalPixelScale, (obj.history.AABB[0].y - this.viewport.y) * Utils.globalPixelScale, w * Utils.globalPixelScale, h * Utils.globalPixelScale);
		}
	};
	this.addPartialDraw = function (partialDraw, obj) {
		partialDraw.push(obj);
		obj.history.drawed = true;
		obj.history.changed = true;
		for (var i = 0; i < this.objects.length; i++) {
			if (!this.objects[i].history.changed && this.objects[i].visible && !this.objects[i]['static']) {
				var top = Math.max(obj.history.AABB[0].y, this.objects[i].history.AABB[0].y);
				var left = Math.max(obj.history.AABB[0].x, this.objects[i].history.AABB[0].x);
				var right = Math.min(obj.history.AABB[1].x, this.objects[i].history.AABB[1].x);
				var bottom = Math.min(obj.history.AABB[1].y, this.objects[i].history.AABB[1].y);
				var width = right - left;
				var height = bottom - top;
				if (width > 0 && height > 0)
					this.addPartialDraw(partialDraw, this.objects[i]);
			}
		}
		return partialDraw;
	};
	this.drawScenePartial = function (cns) {
		var partialDraw = [];
		var rect,
		obj;
		if (!cns.ctx)
			cns.ctx = cns.getContext("2d");
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].nextFrame();
		}
		for (i = 0; i < this.objects.length; i++) {
			obj = this.objects[i];
			if (obj.visible && !obj['static']) {
				if (obj.destroy || obj.drawAlways || !obj.history.drawed || obj.currentFrame != obj.history.frame || obj.getX() != obj.history.x || obj.getY() != obj.history.y || obj.rotation != obj.history.rotation) {
					partialDraw = this.addPartialDraw(partialDraw, obj);
				}
			}
		}
		partialDraw = this.sortStack(partialDraw, true);
		var w,
		h;
		for (i = 0; i < partialDraw.length; i++) {
			this.clearObjectAABB(cns, partialDraw[i]);
		}
		for (i = 0; i < partialDraw.length; i++) {
			obj = partialDraw[i];
			if (obj.destroy) {
				this.removeChild(obj);
			} else {
				this.renderObject(cns, obj);
				obj.updateHistory();
			}
		}
	}
	this.drawScene = function (cns, drawStatic) {
		var obj,
		ok;
		if (!cns.ctx)
			cns.ctx = cns.getContext("2d");
		if (!this.fillColor) {
			if (!this.clearLock)
				this.clearScreen(cns);
		} else {
			cns.ctx.fillStyle = this.fillColor;
			cns.ctx.fillRect(0, 0, this.screenWidth * Utils.globalScale * Utils.globalPixelScale, this.screenHeight * Utils.globalScale * Utils.globalPixelScale);
		}
		for (var i = 0; i < this.objects.length; i++) {
			obj = this.objects[i];
			ok = false;
			if (!drawStatic && !obj['static'])
				ok = true;
			if (drawStatic && obj['static'])
				ok = true;
			if (ok) {
				if (obj.destroy) {
					this.removeChild(obj);
					i--;
				} else {
					obj.nextFrame();
					if (obj.visible)
						this.renderObject(cns, obj);
				}
			}
		}
	};
	this.tweens = [];
	this.createTween = function (obj, prop, start, end, duration, ease) {
		var t = new Tween(obj, prop, start, end, duration, ease);
		self.tweens.push(t);
		return t;
	}
	this.removeTween = function (t) {
		var id = null;
		if (isNaN(t)) {
			for (var i = 0; i < self.tweens.length; i++) {
				if (self.tweens[i] === t) {
					id = i;
					break;
				}
			}
		} else
			id = t;
		self.tweens[id].pause();
		self.tweens.splice(id, 1);
		return id;
	}
	this.clearObjectTweens = function (obj) {
		for (var i = 0; i < self.tweens.length; i++) {
			if (self.tweens[i].obj === obj) {
				i = self.removeTween(i);
			}
		}
	}
	this.updateTweens = function () {
		for (var i = 0; i < self.tweens.length; i++) {
			if (self.tweens[i].tick()) {
				i = self.removeTween(i);
			}
		}
	}
	this.timers = [];
	this.setTimeout = function (callback, timeout) {
		var t = new StageTimer(callback, timeout);
		this.timers.push(t);
		return t;
	};
	this.clearTimeout = function (t) {
		this.timers = Utils.removeFromArray(this.timers, t);
	};
	this.setInterval = function (callback, timeout) {
		var t = new StageTimer(callback, timeout, true);
		this.timers.push(t);
		return t;
	};
	this.clearInterval = function (t) {
		this.clearTimeout(t);
	};
	this.updateTimers = function () {
		for (var i = 0; i < this.timers.length; i++) {
			if (this.timers[i].update()) {
				this.clearTimeout(this.timers[i]);
				i--;
			}
		}
	};
	function render() {
		clearTimeout(self.tmMain);
		var tm_start = new Date().getTime();
		self.updateTweens();
		self.updateTimers();
		self.dispatchEvent("pretick");
		if (self.partialUpdate)
			self.drawScenePartial(self.canvas);
		else
			self.drawScene(self.canvas, false);
		if (self.showFPS) {
			self.setTextStyle("sans-serif", 10, "bold", "#fff", "#000");
			self.drawText("FPS: " + self.lastFPS, 2, 10, 1, true);
		}
		self.dispatchEvent("posttick");
		var d = new Date().getTime() - tm_start;
		d = self.delay - d - 1;
		if (d < 1)
			d = 1;
		self.fps++;
		if (self.started)
			self.tmMain = setTimeout(render, d);
	};
	this.box2dSync = function (world) {
		var p;
		for (b = world.m_bodyList; b; b = b.m_next) {
			if (b.sprite) {
				b.sprite.rotation = b.GetRotation();
				p = b.GetPosition();
				b.sprite.x = p.x;
				b.sprite.y = p.y;
				b.sprite.dispatchEvent("box2dsync", {
					target : b.sprite
				});
			}
		}
	}
	this.processTouchEvent = function (touches, controller) {
		for (var i = 0; i < touches.length; i++) {
			var e = {
				clientX : touches[i].clientX,
				clientY : touches[i].clientY
			};
			self[controller](e);
		}
	}
	var ffOS = (navigator.userAgent.toLowerCase().indexOf("firefox") != -1 && navigator.userAgent.toLowerCase().indexOf("mobile") != -1);
	ffOS = false;
	if (("ontouchstart" in this.canvas) && !ffOS) {
		this.canvas.ontouchstart = function (event) {
			this.renderController.processTouchEvent(event.touches, "checkMouseDown");
			this.renderController.processTouchEvent(event.touches, "checkClick");
		};
		this.canvas.ontouchmove = function (event) {
			this.renderController.processTouchEvent(event.touches, "checkMouseMove");
		};
		this.canvas.ontouchend = function (event) {
			this.renderController.processTouchEvent(event.changedTouches, "checkMouseUp");
		};
	} else {
		this.canvas.onclick = function (event) {
			this.renderController.checkClick(event);
		};
		this.canvas.onmousemove = function (event) {
			this.renderController.checkMouseMove(event);
		};
		this.canvas.onmousedown = function (event) {
			if (event.button == 0)
				this.renderController.checkMouseDown(event);
		};
		this.canvas.onmouseup = function (event) {
			if (event.button == 0)
				this.renderController.checkMouseUp(event);
		};
		this.canvas.oncontextmenu = function (event) {
			this.renderController.checkContextMenu(event);
		};
	}
	this.onpretick = null;
	this.onposttick = null;
	this.eventsListeners = [];
	this.addEventListener = function (type, callback) {
		EventsManager.addEvent(this, type, callback);
	}
	this.removeEventListener = function (type, callback) {
		EventsManager.removeEvent(this, type, callback);
	}
	this.dispatchEvent = function (type, params) {
		return EventsManager.dispatchEvent(this, type, params);
	}
}
/*事件处理函数*/ 
var EventsManager = {
	addEvent : function (obj, type, callback) {
		if (!obj.eventsListeners)
			return;
		for (var i = 0; i < obj.eventsListeners.length; i++) {
			if (obj.eventsListeners[i].type === type && obj.eventsListeners[i].callback === callback)
				return;
		}
		obj.eventsListeners.push({
			type : type,
			callback : callback
		});
	},
	removeEvent : function (obj, type, callback) {
		if (!obj.eventsListeners)
			return;
		for (var i = 0; i < obj.eventsListeners.length; i++) {
			if (obj.eventsListeners[i].type === type && obj.eventsListeners[i].callback === callback) {
				obj.eventsListeners = Utils.removeFromArray(obj.eventsListeners, obj.eventsListeners[i]);
				return;
			}
		}
	},
	dispatchEvent : function (obj, type, params) {
		if (!obj.eventsListeners)
			return;
		var ret;
		if (typeof obj["on" + type] == "function") {
			ret = obj["on" + type](params);
			if (ret === false)
				return false;
		}
		for (var i = 0; i < obj.eventsListeners.length; i++) {
			if (obj.eventsListeners[i].type === type) {
				ret = obj.eventsListeners[i].callback(params);
				if (ret === false)
					return false;
			}
		}
	}
}
var ANCHOR_ALIGN_LEFT = -1;
var ANCHOR_ALIGN_CENTER = 0;
var ANCHOR_ALIGN_RIGHT = 1;
var ANCHOR_VALIGN_TOP = -1;
var ANCHOR_VALIGN_MIDDLE = 0;
var ANCHOR_VALIGN_BOTTOM = 1;
function Sprite(img, w, h, f, l) {
	this.uid = 0;
	this.stage = null;
	this.x = 0;
	this.y = 0;
	this.width = w;
	this.height = h;
	this.offset = {
		left : 0,
		top : 0
	};
	this.anchor = {
		x : 0,
		y : 0
	}
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotation = 0;
	this.zIndex = 0;
	this.visible = true;
	this.opacity = 1;
	this['static'] = false;
	this.ignoreViewport = false;
	this.animated = true;
	this.currentFrame = 0;
	this.totalFrames = Math.max(1, ~~f);
	if (this.totalFrames <= 1)
		this.animated = false;
	this.currentLayer = 0;
	this.totalLayers = Math.max(1, ~~l);
	this.bitmap = img;
	this.mask = null;
	this.fillColor = false;
	this.destroy = false;
	this.animStep = 0;
	this.animDelay = 1;
	this.drawAlways = false;
	this.dragged = false;
	this.dragX = 0;
	this.dragY = 0;
	this.getX = function () {
		return Math.round(this.x * Utils.globalScale);
	};
	this.getY = function () {
		return Math.round(this.y * Utils.globalScale);
	};
	this.getWidth = function () {
		return this.width * this.scaleX * Utils.globalScale;
	};
	this.getHeight = function () {
		return this.height * this.scaleY * Utils.globalScale;
	};
	this.startDrag = function (x, y) {
		this.dragged = true;
		this.dragX = x;
		this.dragY = y;
	}
	this.stopDrag = function () {
		this.dragged = false;
		this.dragX = 0;
		this.dragY = 0;
	}
	this.play = function () {
		this.animated = true;
	};
	this.stop = function () {
		this.animated = false;
	};
	this.gotoAndStop = function (frame) {
		this.currentFrame = frame;
		this.stop();
	};
	this.gotoAndPlay = function (frame) {
		this.currentFrame = frame;
		this.play();
	};
	this.removeTweens = function () {
		if (!this.stage)
			return;
		this.stage.clearObjectTweens(this);
	};
	this.addTween = function (prop, end, duration, ease, onfinish, onchange) {
		if (!this.stage)
			return;
		var val = this[prop];
		if (isNaN(val))
			return;
		var t = stage.createTween(this, prop, val, end, duration, ease);
		t.onchange = onchange;
		t.onfinish = onfinish;
		return t;
	};
	this.moveTo = function (x, y, duration, ease, onfinish, onchange) {
		duration = ~~duration;
		if (duration <= 0) {
			this.setPosition(x, y);
		} else {
			var t1 = this.addTween('x', x, duration, ease, onfinish, onchange);
			if (t1)
				t1.play();
			var t2 = this.addTween('y', y, duration, ease, (t1 ? null : onfinish), (t1 ? null : onchange));
			if (t2)
				t2.play();
		}
		return this;
	}
	this.moveBy = function (x, y, duration, ease, onfinish, onchange) {
		return this.moveTo(this.x + x, this.y + y, duration, ease, onfinish, onchange);
	}
	this.fadeTo = function (opacity, duration, ease, onfinish, onchange) {
		duration = ~~duration;
		if (duration <= 0) {
			this.opacity = opacity;
		} else {
			var t = this.addTween('opacity', opacity, duration, ease, onfinish, onchange);
			if (t)
				t.play();
		}
		return this;
	}
	this.fadeBy = function (opacity, duration, ease, onfinish, onchange) {
		var val = Math.max(0, Math.min(1, this.opacity + opacity));
		return this.fadeTo(val, duration, ease, onfinish, onchange);
	}
	this.rotateTo = function (rotation, duration, ease, onfinish, onchange) {
		duration = ~~duration;
		if (duration <= 0) {
			this.rotation = rotation;
		} else {
			var t = this.addTween('rotation', rotation, duration, ease, onfinish, onchange);
			if (t)
				t.play();
		}
		return this;
	}
	this.rotateBy = function (rotation, duration, ease, onfinish, onchange) {
		return this.rotateTo(this.rotation + rotation, duration, ease, onfinish, onchange);
	}
	this.scaleTo = function (scale, duration, ease, onfinish, onchange) {
		duration = ~~duration;
		if (duration <= 0) {
			this.scaleX = this.scaleY = scale;
		} else {
			var t1 = this.addTween('scaleX', scale, duration, ease, onfinish, onchange);
			if (t1)
				t1.play();
			var t2 = this.addTween('scaleY', scale, duration, ease, (t1 ? null : onfinish), (t1 ? null : onchange));
			if (t2)
				t2.play();
		}
		return this;
	}
	this.nextFrame = function () {
		this.dispatchEvent("enterframe", {
			target : this
		});
		if (!this.history.created)
			this.updateHistory();
		if (!this.animated)
			return;
		this.animStep++;
		if (this.animStep >= this.animDelay) {
			this.currentFrame++;
			this.animStep = 0;
		}
		if (this.currentFrame >= this.totalFrames)
			this.currentFrame = 0;
	};
	this.updateHistory = function () {
		this.history.x = this.getX();
		this.history.y = this.getY();
		this.history.rotation = this.rotation;
		this.history.frame = this.currentFrame;
		var rect = new Rectangle(this.history.x, this.history.y, this.getWidth(), this.getHeight(), this.rotation);
		rect.AABB[0].x -= 1;
		rect.AABB[0].y -= 1;
		rect.AABB[1].x += 1;
		rect.AABB[1].y += 1;
		this.history.AABB = rect.AABB;
		this.history.created = true;
		this.history.changed = false;
	};
	this.history = {
		created : false,
		drawed : false,
		changed : false,
		x : 0,
		y : 0,
		rotation : 0,
		frame : 0,
		AABB : []
	};
	this.eventsWhenInvisible = false;
	this.onmouseover = null;
	this.onmouseout = null;
	this.onmousedown = null;
	this.onmouseup = null;
	this.onclick = null;
	this.oncontextmenu = null;
	this.onmousemove = null;
	this.onenterframe = null;
	this.onrender = null;
	this.onadd = null;
	this.onremove = null;
	this.onbox2dsync = null;
	this.mouseOn = false;
	this.getPosition = function () {
		return {
			x : this.x + 0,
			y : this.y + 0
		}
	}
	this.setPosition = function (x, y) {
		if ((typeof y == 'undefined') && (typeof x['x'] != 'undefined') && (typeof x['y'] != 'undefined')) {
			return this.setPosition(x.x, x.y);
		}
		this.x = parseFloat(x);
		this.y = parseFloat(y);
	}
	this.getAnchor = function () {
		return new Vector(this.anchor.x, this.anchor.y);
	}
	this.setAnchor = function (x, y) {
		if ((typeof y == 'undefined') && (typeof x['x'] != 'undefined') && (typeof x['y'] != 'undefined')) {
			return this.setAnchor(x.x, x.y);
		}
		this.anchor.x = parseFloat(x);
		this.anchor.y = parseFloat(y);
	}
	this.alignAnchor = function (h, v) {
		h = parseInt(h);
		if (isNaN(h))
			h = ANCHOR_ALIGN_CENTER;
		if (h < 0)
			h = ANCHOR_ALIGN_LEFT;
		if (h > 0)
			h = ANCHOR_ALIGN_RIGHT;
		v = parseInt(v);
		if (isNaN(v))
			v = ANCHOR_VALIGN_MIDDLE;
		if (v < 0)
			v = ANCHOR_VALIGN_TOP;
		if (v > 0)
			v = ANCHOR_VALIGN_BOTTOM;
		var anchor = new Vector(this.width * h / 2, this.height * v / 2).add(this.getPosition());
		this.setAnchor(anchor.x, anchor.y);
		return this.getAnchor();
	}
	this.getAbsoluteAnchor = function () {
		return new Vector(this.x, this.y);
	}
	this.getRelativeCenter = function () {
		var a = this.getAnchor();
		var c = new Vector(-this.anchor.x * this.scaleX, -this.anchor.y * this.scaleY);
		c.rotate(-this.rotation);
		return c;
	}
	this.getAbsoluteCenter = function () {
		return this.getRelativeCenter().add(this.getPosition());
	}
	this.getCenter = function () {
		return this.getAbsoluteCenter();
	}
	this.getDrawRectangle = function () {
		var c = this.getCenter(),
		r = new Rectangle(0, 0, this.width * this.scaleX, this.height * this.scaleY, this.rotation);
		r.move(c.x, c.y);
		return r;
	}
	this.getAABBRectangle = function () {
		var r = this.getDrawRectangle(),
		w = r.AABB[1].x - r.AABB[0].x,
		h = r.AABB[1].y - r.AABB[0].y;
		return new Rectangle(r.AABB[0].x + (w / 2), r.AABB[0].y + (h / 2), w, h, 0);
	}
	this.localToGlobal = function (x, y) {
		var p = ((typeof x == 'object') && (typeof x['x'] != 'undefined') && (typeof x['y'] != 'undefined')) ? new Vector(x.x + 0, x.y + 0) : new Vector(x, y);
		p.rotate(this.rotation).add(this.getPosition());
		return p;
	}
	this.globalToLocal = function (x, y) {
		var p = ((typeof x == 'object') && (typeof x['x'] != 'undefined') && (typeof x['y'] != 'undefined')) ? new Vector(x.x + 0, x.y + 0) : new Vector(x, y);
		p.subtract(this.getPosition()).rotate(-this.rotation);
		return p;
	}
	this.allowDebugDrawing = true;
	this.debugDraw = function () {
		if (!this.visible)
			return;
		if (!this.allowDebugDrawing)
			return;
		var a = this.getPosition(),
		c = this.getCenter(),
		r = this.getDrawRectangle(),
		aabb = this.getAABBRectangle();
		stage.drawCircle(a.x, a.y, 1, 1, 'rgba(255,0,0,0.9)');
		stage.drawCircle(c.x, c.y, 1, 1, 'rgba(0,255,0,0.9)');
		stage.drawLine(a.x, a.y, c.x, c.y, 1, 'rgba(255,255,255,0.5)');
		stage.drawPolygon(r.vertices, 0.5, 'rgba(255,0,255,0.5)', 1);
		stage.drawLine(aabb.vertices[0].x, aabb.vertices[0].y, aabb.vertices[2].x, aabb.vertices[2].y, 0.1, 'rgba(255,255,255,0.5)');
		stage.drawLine(aabb.vertices[2].x, aabb.vertices[0].y, aabb.vertices[0].x, aabb.vertices[2].y, 0.1, 'rgba(255,255,255,0.5)');
		stage.drawPolygon(aabb.vertices, 0.5, 'rgba(255,255,255,0.5)');
	}
	this.setZIndex = function (z) {
		this.zIndex = ~~z;
		if (!this.stage)
			return;
		this.stage.setZIndex(this, ~~z);
	}
	this.eventsListeners = [];
	this.addEventListener = function (type, callback) {
		EventsManager.addEvent(this, type, callback);
	}
	this.removeEventListener = function (type, callback) {
		EventsManager.removeEvent(this, type, callback);
	}
	this.dispatchEvent = function (type, params) {
		return EventsManager.dispatchEvent(this, type, params);
	}
	this.hitTestPoint = function (x, y, checkPixel, checkDragged, debug) {
		if (!this.stage)
			return false;
		return this.stage.hitTestPointObject(this, x, y, checkPixel, checkDragged, debug);
	}
}

function createArea() {
	var spr = library.getSprite("gamebackground");
	spr.x = 240;
	spr.y = 160;
	spr.onclick = function () {
		if (clickonback) {
			if (funds < 5) {
				console.log('cliclonback = ' + clickonback);
				sprresult.destroy = true;
				var spr = library.getSprite("playagain");
				spr.x = 240;
				spr.y = 170;
				stage.addChild(spr);
				spr.onclick = function () {
					putButSound();
					console.log('current = ' + current + ' funds = ' + funds);
					funds = 1000;
					clickonback = false;
					gameState = STATE_GAME;
					createScene();
					return false;
				}
			} else {
				clickonback = false;
				gameState = STATE_GAME;
				createScene();
			}
			return;
		} else
			return false;
	}
	stage.addChild(spr);
}