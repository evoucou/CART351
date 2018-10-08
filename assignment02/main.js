window.onload = init;

var character = new Image();
var rightHit = new Image();
var leftHit = new Image();

character.src = "sources/character.gif";
rightHit.src="sources/leftside.gif";
leftHit.src="sources/rightside.gif";

var fps = 10;

function init() {
  setInterval(draw, 1000 / fps);
}

function draw() {

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

canvas.addEventListener('mousedown', (event) => {
   console.log('canvas mousedown');


});

var x = 100;
var y = 100;

context.drawImage(character,x,y)
//context.drawImage(leftHit,x,y)
//context.drawImage(rightHit,x,y)

}

window.onload = init;
