var paused = false;
var fps;
var count = 100;
var allObjects = new Array();

const canvas = document.getElementById('mainCanvas');

canvas.width =window.innerWidth;
canvas.height =window.innerHeight;

for(let i =0;i<count;i++)createAntAt(canvas.width/2, canvas.height/2);



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
  for (let i = 0; i < count; i++)createAntAt(canvas.width / 2, canvas.height / 2);
}


function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function minDistanceBetween(a, b) {
  let distances = [];
  distances.push(distance({ x: a.x - a.width / 2, y: a.y - a.height / 2 }, { x: b.x - b.width / 2, y: b.y - b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y - a.height / 2 }, { x: b.x - b.width / 2, y: b.y - b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y + a.height / 2 }, { x: b.x - b.width / 2, y: b.y - b.height / 2 }));
  distances.push(distance({ x: a.x - a.width / 2, y: a.y + a.height / 2 }, { x: b.x - b.width / 2, y: b.y - b.height / 2 }));

  distances.push(distance({ x: a.x - a.width / 2, y: a.y - a.height / 2 }, { x: b.x + b.width / 2, y: b.y - b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y - a.height / 2 }, { x: b.x + b.width / 2, y: b.y - b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y + a.height / 2 }, { x: b.x + b.width / 2, y: b.y - b.height / 2 }));
  distances.push(distance({ x: a.x - a.width / 2, y: a.y + a.height / 2 }, { x: b.x + b.width / 2, y: b.y - b.height / 2 }));

  distances.push(distance({ x: a.x - a.width / 2, y: a.y - a.height / 2 }, { x: b.x - b.width / 2, y: b.y + b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y - a.height / 2 }, { x: b.x - b.width / 2, y: b.y + b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y + a.height / 2 }, { x: b.x - b.width / 2, y: b.y + b.height / 2 }));
  distances.push(distance({ x: a.x - a.width / 2, y: a.y + a.height / 2 }, { x: b.x - b.width / 2, y: b.y + b.height / 2 }));

  distances.push(distance({ x: a.x - a.width / 2, y: a.y - a.height / 2 }, { x: b.x + b.width / 2, y: b.y + b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y - a.height / 2 }, { x: b.x + b.width / 2, y: b.y + b.height / 2 }));
  distances.push(distance({ x: a.x + a.width / 2, y: a.y + a.height / 2 }, { x: b.x + b.width / 2, y: b.y + b.height / 2 }));
  distances.push(distance({ x: a.x - a.width / 2, y: a.y + a.height / 2 }, { x: b.x + b.width / 2, y: b.y + b.height / 2 }));
  let res = distances[0];
  distances.forEach(element => {
    if (res > element) res = element;
  });
  return res;
}

function changeCount(value) {
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
    element.angle += element.moveAngle * Math.PI / 180;
    if (element.speed < 0) element.speed = 0;
    element.x += element.speed * Math.sin(element.angle);
    element.y -= element.speed * Math.cos(element.angle);

  });
}

function pathFinder() {
  allObjects.forEach(element => {
    if (element.speed != 0)
      element.moveAngle = getRandomInt(3) - 1;

    if (mapChecker(element.x - element.width / 2, element.y - element.height / 2) == false || mapChecker(element.x + element.width / 2, element.y + element.height / 2) == false
      || mapChecker(element.x - element.width / 2, element.y + element.height / 2) == false || mapChecker(element.x + element.width / 2, element.y - element.height / 2) == false) {
      if (element.speed != 0) {
        element.moveAngle += 180 + getRandomInt(20) - 10;
      }
    }
    //   allObjects.forEach(alias => {
    //   if(element != alias && minDistanceBetween(element,alias) <= 10){
    //     element.moveAngle += 180;
    //   }
    // });
    element.speed -= 0.001;
  });

}

function createAntAt(x, y) {
    let ant = { type: "ant", x: x, y: y, angle: getRandomInt(180), moveAngle: 0,speed: getRandomInt(100)/50+3,width: getRandomInt(30)+1, height:getRandomInt(30)+1, color: 'rgb(0, 0, 0)',};
    allObjects.push(ant);
    return ant;
}




