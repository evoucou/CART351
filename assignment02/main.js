

window.onload = init;
  //var fps = 10;
//setInterval(init, 1000 / fps);
function init() {
  var character = new Image();
  var rigthHitAnim = [];
  var leftHitAnim = [];
  character.src = "sources/character.gif";
  var name = "righthit";
  rigthHitAnim = loadAnim(name);
  name = "lefthit";
  leftHitAnim = loadAnim(name);
  var x = 100;
  var y = 100;
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  canvas.addEventListener("click", function(){ draw(x,y,context,leftHitAnim);});
}

function draw(x,y,context,leftHitAnim) {
  for(var i=0;i<6;i++){
      context.drawImage(leftHitAnim[i],x,y);
  }
}
function loadAnim(name) {
  var anim =[];
  for(var i=0;i<6;i++){
    anim[i]=new Image();
    anim[i].src= "sources/"+name+"/frame"+i+".gif";
  }
return anim;
}
//context.drawImage(character,x,y)
//context.drawImage(leftHit,x,y)
//context.drawImage(rightHit,x,y)
