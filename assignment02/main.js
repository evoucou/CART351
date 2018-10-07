

var images = [];

// Note to myself: we first draw parts that are the farthest away
// Order is: arms, head, legs, torso, eyes...
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
var charX = 45;
var charY = 85;

function resourceLoaded() {

// checking if all images have been laoded, if so we trigger 'draw' function
numResourcesLoaded += 1;
if(numResourcesLoaded === totalResources) {
  setInterval(redraw(charX, charY), 1000 / fps);
}
console.log(numResourcesLoaded);
}

// character X, where the central element is the torso.
// Basically, charX = torsoX.

function redraw(x,y) {

this.x = charX;
this.y = charY;

var context = document.getElementById("myCanvas").getContext("2d");

  context.width = context.width; // clears the canvas

context.drawImage(images["leftarm"], this.x + 40, this.y - 42);
context.drawImage(images["leftleg"], this.x, this.y);
context.drawImage(images["torso"], this.x, this.y - 50);
context.drawImage(images["rightarm"], this.x - 15, y - 42);
context.drawImage(images["rightleg"], this.x - 15, this.y - 42);
context.drawImage(images["head"], this.x - 10, this.y - 125);
}
