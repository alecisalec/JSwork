var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');
var mouse = {
  x: undefined,
  y: undefined
}
var colorArray = [
  "#030BA6",
  "#0445D1",
  "#108EE8",
  "#04B2D1",
  "#05F5DA"
];

var maxRadius = 40;
var velocityVar = 4;
var gravity = 1;
var friction = .87;
var lateralFriction = .9;
// Event listener
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})
window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //init();
})
//Utility Functions
function randomIntFromRange(min, max){
  return Math.floor(Math.random() * (max - min +1) + min);
}
function randomColors(colors){
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}
// how to create an object
function Ball(radius){
  this.radius = radius;
  this.minRadius = radius;
  this.x = randomIntFromRange(50 , 700);
  this.y = randomIntFromRange(0, 200);
  this.dx = randomIntFromRange(-2, 2);
  this.dy = 2;
  this.color = randomColors();
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  this.update = function(){
    if(this.y + this.radius + this.dy > innerHeight){
      this.dy = -this.dy * friction;
    }else{
      this.dy += gravity;
      console.log(this.y);
    }
    if(this.y > innerHeight - this.radius){
      this.dx *= lateralFriction;
    }
    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }
}
// create circle objects
var ballArray = [];

function init(){
  ballArray = [];
  for (var i=0; i<5; i++){
    radius = randomIntFromRange(20, 30);
    var ball = ballArray.push(new Ball(radius));
  }
}


// create the animation loop
function animate(){
  requestAnimationFrame(animate);//this line is what creates the infinite loop
  c.clearRect(0,0, window.innerWidth, window.innerHeight);// clears canvas ever time the loop is called, without it canvas blurs
  // loop calls each object in the circleArray array
  for (var i=0; i<ballArray.length; i++){
    ballArray[i].update(); // calls the update method for each obeject
  }
}
// make sure you init when page is loaded
// this will load the objects when page is first loaded
init();
// call the animation loop
animate();
