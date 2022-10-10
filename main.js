var paused = false;
var fps;
var count = 100;


function drawer() {
  if (paused == false) {
    const canvas = document.getElementById('mainCanvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update();
      allObjects.forEach(element => {
        ctx.save();
        ctx.strokeStyle = element.color;
        ctx.translate(element.x, element.y);
        ctx.rotate(element.angle);
        ctx.strokeRect(element.width / -2, element.height / -2, element.width, element.height);
        ctx.restore();   
      });
    }
   
    window.requestAnimationFrame(drawer);
  }
  observ();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function observ() {
  var panel = document.getElementsByClassName("control-panel")[0];
  var Log = '';
  Log += "fps: " + countFPS() + "\n";
  var div = document.getElementsByClassName("log")[0];
  div.textContent = Log;

}

function update() {
  
  allObjects.forEach(element => {
  element.moveAngle = 0;
});
  pathFinder();
  newPos();
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}


function pause() {
  if (paused == false) {
    paused = true;
    document.getElementsByClassName("control-button")[0].textContent = "resume";
  }
  else {
    paused = false;
    document.getElementsByClassName("control-button")[0].textContent = "stop";
    drawer();
  }
}

function restart() {
  allObjects = new Array();
  for(let i =0;i<count;i++)createAntAt(canvas.width/2, canvas.height/2);
}


function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function changeCount(value){
  count = value;
}


function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


function mapChecker(x, y) {
  const canvas = document.getElementById('mainCanvas');
  if (x <= 0 || y <= 0 || x >= canvas.width || y >= canvas.height) return false;
  else return true;
}

window.countFPS = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}());


function newPos() {
  allObjects.forEach(element => {
    element.angle +=   element.moveAngle * Math.PI / 180;
    element.x += element.speed * Math.sin(element.angle);
    element.y -= element.speed * Math.cos(element.angle);
  
});
}

function pathFinder(){
  allObjects.forEach(element => {
    element.moveAngle = getRandomInt(3)-1;

    if(element.maxSpeed=!0)element.maxSpeed--;  
    if(mapChecker(element.x-element.width/2,element.y-element.height/2)==false||mapChecker(element.x+element.width/2,element.y+element.height/2)==false
     ||mapChecker(element.x-element.width/2,element.y+element.height/2)==false||mapChecker(element.x+element.width/2,element.y-element.height/2)==false){
      element.moveAngle += 180 + getRandomInt(20)-10; 
    }
 });

}