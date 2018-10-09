

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
  canvas.addEventListener("click", function(){draw(x,y,canvas,context,leftHitAnim);});
}

async function draw(x,y,canvas,context,leftHitAnim) {
  var timer =10000;
  var i=0;
  while(i<6)
   {
    if(i==0) {
      context.drawImage(leftHitAnim[i],x,y);
    } else {
          hiddeImage();
          showImage(leftHitAnim[i],context,x,y);
    }
    await sleep(100);
    i++;

  }
  //clearTimeout(timer);
}
function showImage(leftHitAnim,context,x,y) {
  context.drawImage(leftHitAnim,x,y);

}


function hiddeImage() {
  var image;
  document.getElementById("").style.visibilty="hidden";
  //image.style.visibilty="hidden";
}

function loadAnim(name) {
  var anim =[];
  for(var i=0;i<6;i++){
    anim[i]=new Image();
    anim[i].src= "sources/"+name+"/frame"+i+".gif";
  }
return anim;
}

 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




//context.drawImage(character,x,y)
//context.drawImage(leftHit,x,y)
//context.drawImage(rightHit,x,y)
