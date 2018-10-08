window.onload = function() {

var character = new Image();
var rightHit = new Image();
var leftHit = new Image();

character.src = "sources/character.gif";
rightHit.src="sources/leftside.png";
leftHit.src="sources/rightside.png";

var fps = 10;

function resourceLoaded() {
  setInterval(redraw, 1000 / fps);
}

function redraw() {

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;

context.drawImage(character,x,y)
context.drawImage(leftHit,x,y)
context.drawImage(rightHits,x,y)



/////////

// We want to make him blink, so it's easier to draw shapes
drawEllipse(x + 33, y - 85, 19, 15); // Left Eye
drawEllipse(x + 79, y - 85, 19, 15); // Right Eye

function drawEllipse(centerX, centerY, width, height) {

  context.beginPath();
  context.moveTo(centerX, centerY - height/2);

  context.bezierCurveTo(
    centerX + width/2, centerY - height/2,
    centerX + width/2, centerY + height/2,
    centerX, centerY + height/2);

  context.bezierCurveTo(
    centerX - width/2, centerY + height/2,
    centerX - width/2, centerY - height/2,
    centerX, centerY - height/2);

  context.fillStyle = "black";
  context.fill();
  context.closePath();
}

}
