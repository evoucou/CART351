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
var snowballs = [];
const MAX_SNOWFLAKES = 500;
var snowflakes = [];
var colors = ["#e6f2ff", "#ccddff", "#4d94ff", "#0047b3", "#66a3ff"];

//cont

function init() {

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

  // Snowflake array
  for (var i = 0; i < MAX_SNOWFLAKES; i++){
    var rx = getRandomInt(0,500);
    var ry = getRandomInt(0,500);
    var rad = getRandomRadius(0,1);
    snowflakes.push(new mySnowflake(rx, ry, colors[i%colors.length], rad, 5));
  }

  // Event listerner to detect if mouse is moving.
  canvas.addEventListener("mousemove",function(event) {
    for (let i = 0; i < MAX_SNOWFLAKES; i++){
      snowflakes[i].snowflakeSpeed = map(event.clientX,0,canvas.width,0.5,8);
    }
  });
}


// Mapping the mouse location. Determines where the mouse is, and how fast the snowflakes move.
function map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
// Determines the random location of each snowflake.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (-canvas.width/2 - canvas.width/2 + 1) + canvas.width/2);
}
// Determines the size of the snowflakes.
function getRandomRadius(min, max) {
  return Math.floor(Math.random() * (2) + 0.1);
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

  context.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0 ; i < MAX_SNOWFLAKES;i++){
    snowflakes[i].update();
    snowflakes[i].render();
  }

for (let i =0; i< MAX_SNOWBALLS;i++){
  //snowballs[i].render();
}
//cancelAnimationFrame()


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


// Snowflake function & parameters
function mySnowflake (x, y, c, r, snowflakeSpeed) {
  this.x = x;
  this.y = y;
  this.color = c;
  this.r = r;
  this.snowflakeSpeed = snowflakeSpeed;
  this.fillStyle = this.color;
  this.render = function(){
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x,this.y,this.r,0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }
  // Snowflake Update
  this.update = function(){
    this.x += this.snowflakeSpeed;
    this.y += this.snowflakeSpeed;
    this.z += this.snowflakeSpeed;
    // Make new snowflakes when they go off screen.
    if (this.x > canvas.width || this.y > canvas.height) {
      this.x = getRandomInt(0,500);
      this.y = getRandomInt(0,500);
    }
  }
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
