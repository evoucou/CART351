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
var fps = 10;

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

  //context.width = context.width; // clears the canvas

var torsoWidth = images["torso"].width;
var torsoHeight = images["torso"].height;

var armWidth = images["rightarm"].width;
var armHeight = images["rightarm"].height;

var legWidth = images["rightleg"].width;
var legHeight = images["rightleg"].height;

var headWidth = images["head"].width;
var headHeight = images["head"].height;

//The center of the canvas is the torso.
var x = canvas.width/2;
var y = canvas.height/2;

  // Note to myself: we first draw parts that are the farthest away
  // Order is: arms, head, legs, torso, eyes...
context.drawImage(images["leftarm"], x - armWidth/2, y + 30);
context.drawImage(images["rightarm"], x + (torsoWidth - armWidth/2), y + 30);
context.drawImage(images["head"], x - (headWidth/8 + 4), y - (torsoHeight + 15));
context.drawImage(images["leftleg"], x - (torsoWidth/2 - legWidth/2 + 5), y + legHeight/2);
context.drawImage(images["rightleg"], x + (torsoWidth - legWidth + 23), y + legHeight/2);
context.drawImage(images["torso"], x, y);

////anim/////
var angle = 0;

// add an event listener
canvas.addEventListener('mousedown', (event) => {
  setInterval(rotateArm, 1000 / fps);
   //console.log('clicked')
});
        function incrementAngle() {
               angle++;
               if(angle > 30) {
                   angle = 0;
               }
           }

           function convertToRadians(degree) {
                       return degree*(Math.PI/180);
                       console.log("degree: " + degree);
                   }

function rotateArm() {

  // clear the drawing surface
  context.clearRect(0,0,1280,720);
  // you can also stroke a rect, the operations need to happen in order
  incrementAngle();
  //context.rotate(convertToRadians(angle));
  context.translate(+10,+10);
  context.save();
  context.restore();
  console.log(angle);

}


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
}
