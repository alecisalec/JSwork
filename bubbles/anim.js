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
//var minRadius =6;
var velocityVar = 4;
// create an event listener
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  //console.log(mouse.x, mouse.y);
})
window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})



// how to create an object
function Circle(radius){
  //this.radius = Math.floor(Math.random()* 4 +1);
  this.radius = radius;
  this.minRadius = radius;
  this.x = Math.random()*(window.innerWidth - this.radius * 2) + this.radius;
  this.y = Math.random()*(window.innerHeight - this.radius * 2)+ this.radius;
  this.dx = (Math.random() -.5) *velocityVar;
  this.dy = (Math.random() -.5) *velocityVar;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  //this.minSize= sizeArray[Math.floor(Math.random()*sizeArray.length)];


  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  this.update = function(){
    this.x+=this.dx;
    this.y+=this.dy;
    if(this.x >innerWidth - this.radius || this.x < this.radius ){
      this.dx = -this.dx
    }
    if(this.y>innerHeight - this.radius || this.y < this.radius ){
      this.dy = -this.dy
    }
    // interactions
    if(mouse.x - this.x <40 && mouse.x - this.x >-40 &&
      mouse.y - this.y <40 && mouse.y - this.y >-40){
        if(this.radius < maxRadius){
          this.radius +=2;
        }
      }
      else if (this.radius > this.minRadius){
        this.radius -= .8;
      }
    this.draw();
  }
}
// create circle objects

var circleArray = [];

function init(){
  circleArray = [];
  for (var i=0; i<600; i++){
    radius = Math.floor(Math.random()* 4 +1);
    var circle = circleArray.push(new Circle(radius));
  }
}


//console.log(circleArray);s
// create the animation loop
function animate(){
  //this line is what creates the infinite loop
  requestAnimationFrame(animate);
  // clears canvas ever time the loop is called, without it canvas blurs
  c.clearRect(0,0, window.innerWidth, window.innerHeight);
  // loop calls each object in the circleArray array
  for (var i=0; i<circleArray.length; i++){
    circleArray[i].update(); // calls the update method for each obeject
  }
}
// make sure you init when page is loaded
init();
// call the animation loop
animate();
