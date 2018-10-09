

window.onload = init;
  //var fps = 10;
//setInterval(init, 1000 / fps);
function init() {

  //var rigthHitAnim = [];
  //var leftHitAnim = [];
  //var name;
  //name = "lefthit";
  //leftHitAnim = loadAnim(name);

  //console.log(leftHit);
  var name;
  var x = 0;
  var y = 0;
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  var character = new Image();
  character.src = "sources/character.gif";
  context.drawImage(character,x,y);

  canvas.addEventListener("mousedown", function(){loadAnim("righthit",x,y,canvas,context);});
  canvas.addEventListener("keydown", function(){loadAnim("lefthit",x,y,canvas,context);});
}



async function loadAnim(name,x,y,canvas,context) {
  //console.log("called");
  var anim =[];
  for(var i=1;i<7;i++){
    anim[i]=new Image();
    anim[i].src= "sources/"+name+"/frame"+i+".gif";

    if(i==1) {
      //Display initial image
      context.drawImage(anim[i],x,y);
    } else {
          //hiddeImage();
          context.clearRect(0,0,canvas.width,canvas.height)
          context.drawImage(anim[i],x,y);
          console.log(i);
    }
    await sleep(50);
    i++;
    //The animation disappears once fully loaded
    context.clearRect(0,0,canvas.width,canvas.height)
  }

  function showImage(anim,context,canvas,x,y) {
    //Clears previous frame every time
    context.clearRect(0,0,canvas.width,canvas.height)
    context.drawImage(anim,x,y);
  }

   function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



}





//context.drawImage(character,x,y)
//context.drawImage(leftHit,x,y)
//context.drawImage(rightHit,x,y)
