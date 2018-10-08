

var rightLeg = null;
var leftLeg = null;
var rightArm = null;
var leftArm = null;
var head = null;
var torso = null;

var animate;

var fps = 30;

function init(){
   torso = document.getElementById('torsoImg');
   torso.style.position= 'relative';
   torso.style.left = '0px';
}

function moveRight(){
   torso.style.left = parseInt(torso.style.left) + 10 + 'px';
   animate = setTimeout(moveRight,1000 / fps); // call moveRight in 20msec
}

function stop(){
   clearTimeout(animate);
   torso.style.left = '0px';
}

window.onload = init;
