
// Call initi when window loads
window.onload = init;

var canvas;
var context;

var charX;
var charY;

var rigthHitAnim = [];
var leftHitAnim = [];

const MAX_SNOWFLAKES = 500;
var snowflakes = [];
var colors = ["#f5f9fc", "#ccddff", "#4d94ff", "#0047b3", "#66a3ff"];

var hitbox=[];

var leftSide = false;
var rightSide = false;
var mouseClick = false;
var collide = false;

var snowball;
var character;


function init() {

  // We were not successful with the animation, but here is the code to load them.
  var name = "righthit";
  rigthHitAnim = loadFrames(name);
  name = "lefthit";
  leftHitAnim = loadFrames(name);

  character = new Image();
  character.src='sources/character.gif';

  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

// Position of our character
  charX = 700;
  charY = 100;

  hitbox[0]=(charX+character.width)-70;
  hitbox[1]=charX+70;

  requestAnimationFrame(requestAnimate);

  // Snowflake array
  for (var i = 0; i < MAX_SNOWFLAKES; i++){
    var rx = getRandomInt(0,500);
    var ry = getRandomInt(0,500);
    var rad = getRandomRadius(0,1);
    snowflakes.push(new mySnowflake(rx, ry, colors[i%colors.length], rad, 5));
  }

// Snowflakes follow your mouse
  canvas.addEventListener("mousemove",function(event) {
    for (let i = 0; i < MAX_SNOWFLAKES; i++){
      snowflakes[i].snowflakeSpeed = map(event.clientX,0,canvas.width,0.5,8);
    }
  });

// Generate snowball when you click
  canvas.addEventListener("mousedown",function(event) {
    snowball = new mySnowball(event.pageX,event.pageY,20,"#FFFFFF");
    mouseClick = true;
    snowball.testLeft();
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

// Loading animations for each side
function loadFrames(name) {
  var anim =[];
  for(var i=1;i<7;i++){
    anim[i]=new Image();
    anim[i].src= "sources/"+name+"/frame"+i+".gif";
  }
  return anim;
}

// Checks collision with hitbox (character) and snowball.
this.checkCollision = function() {
  this.collide= false;

  console.log(snowball.x);
  if(hitbox[1]<=snowball.x)  {
    this.collide = true;
    if (hitbox[0]<=snowball.x){
      this.collide = false;
    }
  }
}

// Add in animation
function requestAnimate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.drawImage(character,charX,charY);

  if(mouseClick==true){
    checkCollision();

// Stop displaying when they have collided
    if (collide==false){
      snowball.render();
      snowball.update();
    }
  }


  for (let i = 0 ; i < MAX_SNOWFLAKES;i++){
    snowflakes[i].update();
    snowflakes[i].render();
  }

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


// Snowball function and paremeters
function mySnowball(x,y,r,c){
  //member variables
  this.x = x;
  this.y = y;
  this.radius = r;
  this.color = c;

  // new for updating
  this.xSpeed = 10;
  this.leftClick;

  this.render = function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x,this.y,this.radius,0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }


  this.update = function(){
    this.x += this.xSpeed;
  }


// See if it has to go left or right (influences xSpeed)
  this.testLeft = function() {
    if(this.x>hitbox[0])
    {
      console.log("right");
      this.leftClick= false;
      this.xSpeed = -(this.xSpeed);
    }
    if(this.x<hitbox[1])
    {
      console.log("left");
      this.leftClick= true;
      this.xSpeed = this.xSpeed
    }
  }

}
