window.onload = init;
  //var fps = 10;
//setInterval(init, 1000 / fps);
var canvas;
var context;
var charX;
var charY;
var rigthHitAnim = [];
var leftHitAnim = [];
var charAnimating;
const MAX_SNOWBALLS = 10;
let snowballs = [];
//cont

function init() {

  //var character = new Image();
  //character.src = "sources/character.gif";
  var name = "righthit";
  rigthHitAnim = loadFrames(name);
  name = "lefthit";
  leftHitAnim = loadFrames(name);

  charX = 0;
  charY = 0;

  var charAnimating = false;

  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  requestAnimationFrame(requestAnimate);

  for (let i =0; i< MAX_SNOWBALLS;i++){
  // have different parameters for each ellipse object
  let objW = 40;
  let offsetX = 10;
  snowballs.push(new mySnowball((i*(objW+offsetX))+60,300,objW/2,"#8ED6FF",(i%5)+1,(i%6)+2,i));
  }
//ext.drawImage(character,100,100);
}

function loadFrames(name) {
  var anim =[];
  for(var i=1;i<7;i++){
    anim[i]=new Image();
    anim[i].src= "sources/"+name+"/frame"+i+".gif";
  }
return anim;
}

var timer = 0;
var timeIncrement;

// add in animation
function requestAnimate(){

for (let i =0; i< MAX_SNOWBALLS;i++){
  snowballs[i].render();
}
//cancelAnimationFrame()
timer++;

console.log(timer);



  //context.drawImage(leftHitAnim[i],charX,charY);
  //context.clearRect(0,0,canvas.width,canvas.height);
  //context.drawImage(leftHitAnim[2],charX,charY);
  //context.clearRect(0,0,canvas.width,canvas.height);
  //context.drawImage(leftHitAnim[3],charX,charY);



  // function draw(leftHitAnim) {
  //
  // for(i=1;i<7;i++){
  //     if(i==0) {
  //       //Display initial image
  //       context.drawImage(leftHitAnim[i]);
  //     } else {
  //           showImage(leftHitAnim[i]);
  //     }
  //     await sleep(50);
  //       context.clearRect(0,0,canvas.width,canvas.height)
  //   }
  // }
  //
  // function showImage(leftHitAnim) {
  //   context.clearRect(0,0,canvas.width,canvas.height)
  //   context.drawImage(leftHitAnim);
  // }
  //console.log("running");
  requestAnimationFrame(requestAnimate);
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
