window.onload = init;
//var fps = 10;
//setInterval(init, 1000 / fps);
function init() {
  var character = new Image();
  var rigthHitAnim = [];
  var leftHitAnim = [];
  character.src = "sources/character.gif";
  var name = "lefthit";
  var leftHit = loadAnim(name);
  var name = "righthit";
  var rightHit = loadAnim(name);
  //var side;
  var x = 0;
  var y = 0;
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  //this.square.render();

  //canvas.addEventListener("mousedown", function(){testCollide(leftHit,x,y,canvas,context);});
  //canvas.addEventListener("keypress", function(){draw(rightHit,x,y,canvas,context);});
}

const MAX_SNOWBALLS = 30;
let snowballs = [];

for (let i =0; i< MAX_SNOWBALLS;i++){
// have different parameters for each ellipse object
let objW = 40;
let offsetX =10;
snowballs.push(new mySnowball((i*(objW+offsetX))+canvas.width/2,canvas.height/2,objW/2,"#8ED6FF",(i%5)+1,(i%6)+2,i));
}

//start animation
requestAnimationFrame(runAni);

// add in animation
function runAni(){

for (let i =0; i< MAX_SNOWBALLS;i++){
  snowball[i].render();
}

  // recursive call ...
  requestAnimationFrame(runAni);
}

function collide(a, b) {
  return !(
    ((a.y + a.height) < (b.y)) ||
    (a.y > (b.y + b.height)) ||
    ((a.x + a.width) < b.x) ||
    (a.x > (b.x + b.width))
  );
}

function mySnowball(x,y,r,c,xSpeed,tempId){
  //member variables
  this.ballX = x;
  this.ballY = y;
  this.radius = r;
  this.ballColor = c;

  // new for updating
  this.xSpeed = xSpeed;
  this.ballId = tempId;

  this.render=function() {
    canvasContext.fillStyle = this.ballColor;// change the color we are using
    canvasContext.beginPath();
    canvasContext.arc(this.ballX,this.ballY,this.radius,0, Math.PI * 2, true);
    canvasContext.fill(); // set the fill
    canvasContext.closePath(); //close a path ...
  }

}


async function draw(leftHit,x,y,canvas,context,) {

  //var timer =10000;
  var i=0;
  while(i<7)
  {
    if(i==0) {
      //Display initial image
      context.drawImage(leftHit[i],x,y);
    } else {
      //hiddeImage();
      showImage(leftHit[i],context,canvas,x,y);
    }
    await sleep(50);
    i++;

  }
  //clearTimeout(timer);
}
function showImage(leftHit,context,canvas,x,y) {
  context.clearRect(0,0,canvas.width,canvas.height)
  context.drawImage(leftHit,x,y);
}

function loadAnim(name) {
  var anim =[];
  for(var i=0;i<7;i++){
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
