var snakeX;
var snakeY;
var score = 0;
var xx = 0;
var yy = 0;
var cw = 10;
var direction = "right";
var snake;
var snakeSize;
var w = 500;
var h = 500;
var food = {
	xx: 0,
	yy: 0
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function checkSupported() {
	if (canvas.getContext) {
		window.alert("Start Game ?");
		// Canvas is supported
	} else {
		// Canvas is not supported
		window.alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
	}
}


function create() {
	var length = 5;
	snake = [];
	for (var i = length - 1; i >= 0; i--) {
		snake.push({
			x: i,
			y: 0
		});
	}

}

function cookfood() {
	food.xx = Math.round(Math.random() * (500 - 10) / 10);
	food.yy = Math.round(Math.random() * (500 - 10) / 10);

}

function draw() {
	ctx.fillStyle = "yellow";
	ctx.fillRect(0, 0, 500, 500);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, 500, 500);

	snakeX = snake[0].x;
	snakeY = snake[0].y;
	if (direction == "right")
		snakeX++;
	else if (direction == "left")
		snakeX--;
	else if (direction == "up")
		snakeY--;
	else if (direction == "down")
		snakeY++;
	if (snakeX > 50) snakeX = 0;
	if (snakeX < 0) snakeX = 50;
	if (snakeY > 50) snakeY = 0;
	if (snakeY < 0) snakeY = 50;

	if (checkCollision(snakeX, snakeY, snake)) {
		button.removeAttribute('disabled', true);
		ctx.clearRect(0, 0, w, h);
		gameloop = clearInterval(gameloop);
		window.alert("Game Over!\nYour score is: "+score);
		gameStart();
	}

	if (snakeX == food.xx && snakeY == food.yy) {
		var tail = {
			x: snakeX,
			y: snakeY
		};
		cookfood();
		score++;
	} else {
		var tail = snake.pop();
		tail.x = snakeX;
		tail.y = snakeY;
	}
	snake.unshift(tail);
	paint(food.xx, food.yy, 0);
	for (var i = 0; i < snake.length; i++) {
		var c = snake[i];

		paint(c.x, c.y, 1);
	}
	var text = "Score: " + score;
	ctx.fillText(text, 10, 10);

}

function paint(x, y, flag) {
	if (flag == 0)
		ctx.fillStyle = "red";
	else
		ctx.fillStyle = "green";
	ctx.fillRect(x * cw, y * cw, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x * cw, y * cw, cw, cw);
}



function checkCollision(snakeX, snakeY, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].x == snakeX && array[i].y == snakeY)
			return true;
	}
	return false;
}


document.onkeydown = function (event) {
	var key = event.which;
	if (key == "37" && direction != "right") direction = "left";
	else
	if (key == "38" && direction != "down") direction = "up";
	else
	if (key == "39" && direction != "left") direction = "right";
	else
	if (key == "40" && direction != "up") direction = "down";
}

function gameStart() {
	score = 0;
	direction = "right";
	document.getElementById('button').onclick = function () {
		create();
		cookfood();
		button.setAttribute('disabled', true);
		if (typeof gameloop != "undefined")
			clearInterval(gameloop);
		gameloop = setInterval(draw, 60);
	};
}
gameStart();
