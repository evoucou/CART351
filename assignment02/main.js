
window.onload = function() {

var images = [];

loadImage("leftarm");
loadImage("leftleg");
loadImage("torso");
loadImage("rightarm");
loadImage("rightleg");
loadImage("head");

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() {
      resourceLoaded();
  }
  images[name].src = "sources/png/" + name + ".png";
}

var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;

// character X, where the central element is the torso.
// Basically, charX = torsoX.

function resourceLoaded() {

// checking if all images have been laoded, if so we trigger 'draw' function
numResourcesLoaded += 1;
if(numResourcesLoaded === totalResources) {
  setInterval(redraw, 1000 / fps);
}
}

function redraw() {

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var x = canvas.width/2;
var y = 100;

  //context.width = context.width; // clears the canvas

  // Note to myself: we first draw parts that are the farthest away
  // Order is: arms, head, legs, torso, eyes...
context.drawImage(images["leftarm"], x-30,y);
context.drawImage(images["rightarm"], x+30,y);
context.drawImage(images["head"], x, y);
context.drawImage(images["leftleg"], x, y + 50);
context.drawImage(images["rightleg"], x - 15, y - 42);
context.drawImage(images["torso"], x, y - 50);

drawEllipse(x, y, 19, 16); // Left Eye
drawEllipse(x, y, 19, 16); // Right Eye

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
}
