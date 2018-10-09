

window.onload = init;
  //var fps = 10;
//setInterval(init, 1000 / fps);
function init() {
  var character = new Image();
  var rightHit = new Image();
  var leftHit = new Image();
  character.src = "sources/character.gif";
  rightHit.src="sources/leftside.gif";
  leftHit.src="sources/rightside.gif";
  var x = 100;
  var y = 100;
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  canvas.addEventListener("click", function(){ draw(x,y,context,rightHit,leftHit );});
}

function draw(x,y,context,rightHit,leftHit ) {
  console.log('canvas mousedown');
  context.drawImage(leftHit,x,y);
}

//context.drawImage(character,x,y)
//context.drawImage(leftHit,x,y)
//context.drawImage(rightHit,x,y)
