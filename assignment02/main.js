window.onload = init;
  //var fps = 10;
//setInterval(init, 1000 / fps);
var canvas;
var context;
const MAX_SNOWBALLS = 2;
let snowballs = [];

function init() {


  var rigthHitAnim = [];
  var leftHitAnim = [];
  var character = new Image();
  character.src = "sources/character.gif";
  var name = "righthit";
  rigthHitAnim = loadAnim(name);
  name = "lefthit";
  leftHitAnim = loadAnim(name);

  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  requestAnimationFrame(runAnim);

  for (let i =0; i< MAX_SNOWBALLS;i++){
  // have different parameters for each ellipse object
  let objW = 40;
  let offsetX = 10;
  snowballs.push(new mySnowball((i*(objW+offsetX))+50,300,objW/2,"#8ED6FF",(i%5)+1,(i%6)+2,i));

  }

  var x = 0;
  var y = 0;
  context.drawImage(character,100,100);
  canvas.addEventListener("click", function(){draw(x,y,canvas,context,leftHitAnim);});
}

async function draw(x,y,canvas,context,leftHitAnim) {

for(i=1;i<7;i++){
    if(i==0) {
      //Display initial image
      context.drawImage(leftHitAnim[i],x,y);
    } else {
          showImage(leftHitAnim[i],context,canvas,x,y);
    }
    await sleep(50);
      context.clearRect(0,0,canvas.width,canvas.height)
  }
}

function showImage(leftHitAnim,context,canvas,x,y) {
  context.clearRect(0,0,canvas.width,canvas.height)
  context.drawImage(leftHitAnim,x,y);
}

function loadAnim(name) {
  var anim =[];
  for(var i=1;i<7;i++){
    anim[i]=new Image();
    anim[i].src= "sources/"+name+"/frame"+i+".gif";
  }
return anim;
}

 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




///snowball


// add in animation
function runAnim(){

for (let i =0; i< MAX_SNOWBALLS;i++){
  snowballs[i].render();
  console.log("running");
}
  requestAnimationFrame(runAnim);
}

//function collide(a, b) {
//  return !(
//    ((a.y + a.height) < (b.y)) ||
//    (a.y > (b.y + b.height)) ||
//    ((a.x + a.width) < b.x) ||
//    (a.x > (b.x + b.width))/
//  );
//}

function mySnowball(x,y,r,c,xSpeed,tempId){
  //member variables
  this.ballX = x;
  this.ballY = y;
  this.radius = r;
  this.ballColor = c;

  // new for updating
  this.xSpeed = xSpeed;
  this.ballId = tempId;

  this.render = function() {
    context.fillStyle = this.ballColor;// change the color we are using
    context.beginPath();
    context.arc(this.ballX,this.ballY,this.radius,0, Math.PI * 2, true);
    context.fill(); // set the fill
    context.closePath(); //close a path ...
  }

}
