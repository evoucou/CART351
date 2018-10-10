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
var snowball;
const MAX_SNOWFLAKES = 500;
var snowflakes = [];
var colors = ["#f5f9fc", "#ccddff", "#4d94ff", "#0047b3", "#66a3ff"];
var couleur = "#000000";
var radius = 40;
var hitbox=[];
var counterImg;
var leftSide = false;
var rightSide = false;
var snowball;
var mouseClick = false;
var character;
var collide = false;
var animtest;
//cont


function init() {

  var name = "righthit";
  rigthHitAnim = loadFrames(name);
  name = "lefthit";
  leftHitAnim = loadFrames(name);

  //animtest = new Image();
  //animtest.src='sources/.gif'

character = new Image();
character.src='sources/character.gif';


  var charAnimating = false;

  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  charX = 700;
  charY = 100;

  collide=false;

//0=right. 1=left;
  hitbox[0]=(charX+character.width)-70;
  hitbox[1]=charX+70;

  requestAnimationFrame(requestAnimate);

  // for (let i =0; i< MAX_SNOWBALLS;i++){
  // // have different parameters for each ellipse object
  // let objW = 40;
  // let offsetX = 10;
  // snowballs.push(new mySnowball((i*(objW+offsetX))+60,300,objW/2,"#8ED6FF",(i%5)+1,(i%6)+2,i));
  // }

  // Snowflake array
  for (var i = 0; i < MAX_SNOWFLAKES; i++){
    var rx = getRandomInt(0,500);
    var ry = getRandomInt(0,500);
    var rad = getRandomRadius(0,1);
    snowflakes.push(new mySnowflake(rx, ry, colors[i%colors.length], rad, 5));
  }
      //holdLeft = new playAnim(leftHitAnim,counterImg);

  // Event listerner to detect if mouse is moving.
  canvas.addEventListener("mousemove",function(event) {
    for (let i = 0; i < MAX_SNOWFLAKES; i++){
      snowflakes[i].snowflakeSpeed = map(event.clientX,0,canvas.width,0.5,8);
    }
  });

  canvas.addEventListener("mousedown",function(event) {
    snowball = new mySnowball(event.pageX,event.pageY,20,"#FFFFFF");
    mouseClick = true;
    snowball.isLeft();
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


  this.checkCollision = function() {
this.collide= false;

    console.log(snowball.x);
            if(hitbox[1]<=snowball.x)  {
                    this.collide = true;
                    if (hitbox[0]<=snowball.x){
                      this.collide = false;
                    }
                }
                //console.log("hitboxgauche:"+hitbox[1]);
                //console.log("hitboxdroite:"+hitbox[0]);
                //console.log("snowball"+snowball.x);
        }




// add in animation
function requestAnimate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.drawImage(character,charX,charY);
  //console.log("chracter"+charX);

  if(mouseClick==true){

        checkCollision();
        console.log(collide);

    //snowball.render();
    //snowball.checkLeft();
            if (collide==false){
              snowball.render();
              snowball.update();
          }
            else {
              //hitLeft();
          }
}




//   } if (rightSide == true){
//     snowball.moveLeft();
//   }



    //var hold;

// if(counterImg<6)
//     {
//      if(leftClick)
//         {
//             hold = new playAnim(leftHitAnim,counterImg);
//             hold.render();
//            counterImg =  hold.update();
//         }
//      else {
//             hold = new playAnim(rigthHitAnim,counterImg);
//             hold.render();
//            counterImg =  hold.update();
//      }


  for (let i = 0 ; i < MAX_SNOWFLAKES;i++){
    snowflakes[i].update();
    snowflakes[i].render();
  }


//for (let i =0; i< MAX_SNOWBALLS;i++){
  //snowballs[i].render();
// }
// fdunction createSnowball() {
//             var snowball = new mySnowball(event.pageX,event.pageY,radius,couleur,10);
//             counterImg = 0;
//             requestAnimate(snowball);
// }

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

// this.checkLeft= function() {
//     if(snowball.x>hitbox[0])
//         {
//             leftClick = false;
//             snowball.xSpeed -= snowball.xSpeed;
//         }
//     if(snowball.x<hitbox[1])
//         {
//             leftClick = true;
//         }
//
// }


function mySnowball(x,y,r,c){
  //member variables
  this.x = x;
  this.y = y;
  this.radius = r;
  this.color = c;
      //console.log("snowball"+x);

  // new for updating
  this.xSpeed = 10;
  this.leftClick;
  //this.isPressed = false;

  this.render = function() {
            context.fillStyle = this.color;// change the color we are using
            context.beginPath();
            context.arc(this.x,this.y,this.radius,0, Math.PI * 2, true);
            context.fill(); // set the fill
            context.closePath(); //close a path ...
          }


// this.moveRight = function() {
// this.x+=this.xSpeed;
// }
//
// this.moveLeft = function() {
// this.x-=this.xSpeed;
// }

  //this.x += this.xSpeed;
this.update = function(){

  this.x += this.xSpeed;
}


      this.isLeft = function() {
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


// function playAnim(anims,i)
// {
//     this.anim = anims;
//     this.i = i;
//     this.render = function ()
//     {
//         context.drawImage(this.anim[this.i],canvas.width/2,canvas.height/2);
//
//     }
//     this.update = function()
//     {
//         this.i++;
//         this.x = this.x+this.xSpeed;
//         //return this.i;
//     }
// }
