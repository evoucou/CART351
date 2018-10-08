

window.onload = init;
  //var fps = 10;
//setInterval(init, 1000 / fps);
function init() {
  var character = new Image();
  character.src = "sources/character.gif";
  var x = 100;
  var y = 100;
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  canvas.addEventListener("click", function(){ draw(x,y,context); });
}

function draw(x,y,context) {
  var rightHit = new Image();
  var leftHit = new Image();
  rightHit.src="sources/leftside.gif";
  leftHit.src="sources/rightside.gif";
  console.log('canvas mousedown');
  context.drawImage(leftHit,x,y);
}

//context.drawImage(character,x,y)
//context.drawImage(leftHit,x,y)
//context.drawImage(rightHit,x,y)
