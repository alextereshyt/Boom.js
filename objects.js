
var allObjects = new Array();
const canvas = document.getElementById('mainCanvas');
canvas.width =window.innerWidth;
canvas.height =window.innerHeight;
for(let i =0;i<count;i++)createAntAt(canvas.width/2, canvas.height/2);
function createAntAt(x, y) {
    let ant = { type: "ant", x: x, y: y, angle: getRandomInt(180), moveAngle: 0,speed: getRandomInt(100)/50+0.1,width: getRandomInt(30)+1, height:getRandomInt(30)+1, color: 'rgb(0, 0, 0)',};
    allObjects.push(ant);
    return ant;
}






