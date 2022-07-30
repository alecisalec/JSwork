//Rainfall
//Alec Graham
//9.8.18
//Description:  falling rain






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
/////////////////////////////////////
// Utility Functions/////////////////
////////////////////////////////////
function randomIntFromRange(min, max){
  return Math.floor(Math.random() * (max - min +1) + min);
}
function randomColors(colors){
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}



//////////////////////////////////////////////////////////////////////////////
// objects

/////////////////////////////////////
// Create Star//////////////////////
////////////////////////////////////
function Rain(x, y, radius, color){
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.color = color;
  this.velocity = {
    x:randomIntFromRange(-5,5),
    y:randomIntFromRange(-2,2)
  }
  this.friction = .87;
  this.gravity = 1;
}
Rain.prototype.draw = function(){
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
  c.fillStyle = this.color;
  c.shadowColor = "#E3EAEF";
  c.shadowBlur = 20;
  c.fill();
  c.closePath();
  c.restore();
}
Rain.prototype.update = function(){
  if(this.y +(this.radius/2) + this.velocity.y > innerHeight- 100){
    this.shatter();
    this.velocity.y = -this.velocity.y * this.friction;
  }else{
    this.velocity.y += this.gravity;
  }
  this.y += this.velocity.y;
  this.draw();
}
Rain.prototype.shatter = function(){
  this.radius -= this.radius;
  for (var i = 0; i < 8; i++) {
    explosionArray.push(new RainExplosion(this.x, this.y, 2, "#E3EAEF"));
    //console.log(explosionArray);
  }
  //console.log('shatter');
}
/////////////////////////////////////
// create the explosions////////////
////////////////////////////////////
function RainExplosion(x, y, radius, color){
  Rain.call(this, x, y, radius, color);
  this.velocity = {
    x: randomIntFromRange(-10,10),
    y:randomIntFromRange(-15,15)
  }
  this.friction = .87;
  this.gravity = 1;
  this.ttl = 50;
  this.opacity=1;
}
RainExplosion.prototype.draw = function(){
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
  c.fillStyle = `rgba(227,234,239,${this.opacity})`;
  c.shadowColor = "#E3EAEF";
  c.shadowBlur = 20;
  c.fill();
  c.closePath();
  c.restore();
}
RainExplosion.prototype.update = function(){
  this.draw();
  if(this.y + this.radius + this.velocity.y > innerHeight - 100){
    this.velocity.y = -this.velocity.y * this.friction;
  }else{
    this.velocity.y += this.gravity;
  }
  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.opacity -= 1 / this.ttl;
}
/////////////////////////////////////
// create background Stars//////////////
////////////////////////////////////
function BgStars(x, y, radius, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  BgStars.prototype.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}
/////////////////////////////////////
// create mountains/////////////////
////////////////////////////////////
function Mountains(mountainAmount, height, color){
  for (var i = 0; i < mountainAmount; i++) {
    const mountainWidth = canvas.width / mountainAmount;
    c.beginPath();
    c.moveTo(i * mountainWidth, canvas.height);
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
    c.lineTo(i * mountainWidth + mountainWidth /2, canvas.height - height);
    c.lineTo(i * mountainWidth - 325, canvas.height);
    c.fillStyle = color;
    c.fill();
    c.closePath();
    }
  }
/////////////////////////////////////
// create moving clouds//////////////
////////////////////////////////////

/////////////////////////////////////
// create ground//////////////
////////////////////////////////////
function Ground(height, color){
  //"#384551"
  const groundWidth = canvas.width + 500;
  this.groundHeight = height;
  this.color = color;
  c.beginPath();
  //c.moveTo(groundWidth, height);
  c.fillStyle = this.color;
  c.fillRect(0, canvas.height - this.groundHeight, groundWidth, this.groundHeight);
  c.fill();
  c.closePath();

  }
//////////////////////////////////////////////////////////////////////////////
// implementation sectoins
// create background sky
const backgroundGradient = c.createLinearGradient(0,0,0,canvas.height);
backgroundGradient.addColorStop(0, '#171e25');
backgroundGradient.addColorStop(1, '#3f586b');



// create star and explosion arrays
let rainArray = [];
let explosionArray =[];
let backgroundStarsArray = [];
let ticker = 0;
let ranSpawnRate = 75;
function init(){
  rainArray = [];
  explosionArray = [];
  backgroundStarsArray = [];
  for (var i=0; i<1; i++){
    x = randomIntFromRange(0, canvas.width);
    y =-100;
    color = "#E3EAEF";
    radius = randomIntFromRange(4, 5);
    var star = rainArray.push(new Rain(x, y, radius, color));
  }
  for (var i = 0; i < 150; i++) {
    x = randomIntFromRange(0, 2000);
    y =randomIntFromRange(0, canvas.height);
    color = "white";
    radius = randomIntFromRange(2, 4);
    var bgStars = backgroundStarsArray.push(new BgStars(x, y, radius, color));
  }
}


// Animation
function animate(){
  requestAnimationFrame(animate);//this line is what creates the infinite loop
  // create the background sky
  c.fillStyle = backgroundGradient;
  c.fillRect(0,0, window.innerWidth, window.innerHeight);

  // background of canvas
  // backgroundStars
  backgroundStarsArray.forEach(bgStar =>{
    bgStar.draw();

  })

  // mid canvas
  // mountains
  //Mountains(1, canvas.height - 50, "#384551");
  //Mountains(2, canvas.height - 100, "#2b3843");
  //Mountains(4, canvas.height - 300, "#26333e");
  Ground(100, "black");

  // foreground
  // creates stars
  rainArray.forEach((star, index) =>{
    star.update();
    if(star.radius < 3){
      rainArray.splice(index,1);
    }
  })
  // creates the explosions
  explosionArray.forEach((explosion, index) =>{
    explosion.update();
    if(explosion.ttl == 0){
      explosionArray.splice(index, 8);
    }
  })

  ticker++;
  if (ticker % ranSpawnRate == 0){
    const x = randomIntFromRange(0, canvas.width);
    const radius = randomIntFromRange(4, 5);
    rainArray.push(new Rain(x, -100, radius, "white"));
    ranSpawnRate = randomIntFromRange(50, 53);
  }
}
// make sure you init when page is loaded
// this will load the objects when page is first loaded
init();
// call the animation loop
animate();
