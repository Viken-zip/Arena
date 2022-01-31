// canvas //
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 2;

// Caracthers //

// crt1 50 x 50 pixel size for nowrb
class crt1 {
    constructor(x, y, color, team){
        this.x = x,
        this.y = y,
        this.color = color,
        this.t = team,
        this.Charged = true,
        this.ChargeTime = 0,
        this.hp = 8,
        this.dmg = 2
    }
}

class crt2 {
    constructor(x, y, color, team){
        this.x = x,
        this.y = y,
        this.color = color,
        this.t = team,
        this.Charged = true,
        this.ChargeTime = 0,
        this.hp = 5,
        this.dmg = 3
    }
}

class crt3 {
    constructor(x, y, color, team){
        this.x = x,
        this.y = y,
        this.color = color,
        this.t = team,
        this.Charged = true,
        this.ChargeTime = 0,
        this.hp = 32,
        this.dmg = 1
    }
}

let spawn = [
//new crt1(200, 200, 'red', 'red'), 
    //new crt1(200, innerHeight / 2, 'red', 'red'),
    //new crt1(200, innerHeight / 3, 'red', 'red'), 
        //new crt1(200, innerHeight / 1.5, 'red', 'red'), 
//new crt1(200, innerHeight - 200, 'red', 'red'), 
//new crt1(innerWidth - 200, 200, 'blue', 'blue'),
    //new crt1(innerWidth - 200, innerHeight / 2, 'blue', 'blue'),
    //new crt2(innerWidth - 200, innerHeight / 3, 'purple', 'blue'),
        //new crt2(innerWidth - 200, innerHeight / 1.5, 'purple', 'blue')
//new crt1(innerWidth - 200, innerHeight - 200, 'blue', 'blue')
]

const speed = 2;
let pause = true;

// runs once per 16ms aka ca 60fps gameLoop //
setInterval( ()=>{

    if(pause == false){
        context.clearRect(0, 0, innerWidth, innerHeight)
        updateCaracthers();
    }
    drawCaracthers();
    //newRandomCrt();

}, 16)

// creates new cubes just for fun //
function newRandomCrt(){
    let yes = new crt1(Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight))
    spawn.push(yes);
}
// <>-<>-<>-<>-<> //

// creates new crt1 //
function newCrt(x, y, color, team){
    let theNewCrt = new crt1(x, y, color, team);
    spawn.push(theNewCrt);
};

// creates new crt2 //
function newCrt2(x, y, color, team){
    let theNewCrt = new crt2(x, y, color, team)
    spawn.push(theNewCrt)
}

// creates new crt3 //
function newCrt3(x, y, color, team){
    let theNewCrt = new crt3(x, y, color, team)
    spawn.push(theNewCrt)
}

function updateCaracthers(){
    // says how fast and were to go and how to go //
    for(let i = 0; i < spawn.length; i++){
        if(spawn[i].hp <= 0){
            spawn.splice(i, 1)
            console.log('ded')
        }
    }



    for(let i = 0; i < spawn.length; i++){
        let closest = getClosest(spawn[i], spawn);
        dx = (closest.x + 25) - (spawn[i].x + 25);
        dy = (closest.y + 25) - (spawn[i].y + 25);
        distance = Math.sqrt(dx*dx + dy*dy);
        dx /= distance;
        dy /= distance;
        if(distance > 25){
            spawn[i].x += dx*speed;
            spawn[i].y += dy*speed;
        }

        if(spawn[i].Charged == false){
            spawn[i].ChargeTime++;
            if(spawn[i].ChargeTime == 60){
                spawn[i].Charged = true;
                spawn[i].ChargeTime = 0;
            }
        }
    }

    // hit //
    /*for(let i = 0; i > spawn.length; i++){
        spawn[i]
    }*/

}

function getClosest(Crt, Crts){
    let closestCrt = null;
    let closestDistance;

    for(let i =  0; i < Crts.length; i++){
        if(Crts[i] == Crt || Crts[i].t == Crt.t) continue;
        let dx = Crts[i].x - Crt.x;
        let dy = Crts[i].y - Crt.y;
        let d = Math.sqrt(dx*dx + dy*dy);

        if(closestCrt == null || d < closestDistance){
            closestCrt = Crts[i];
            closestDistance = d;
        }

    }
    if(closestDistance < 100 && Crt.Charged){ hit(Crt, (Math.sign(dx) * -1) ); Crt.Charged = false }
    return closestCrt;
}

function hit(Crt, hitx){
    context.fillStyle = 'green';
    context.fillRect(Crt.x + (hitx * 50), Crt.y, 50, 50);
    let hitarea = {
        x: (Crt.x + (hitx * 50)),
        y: Crt.y
    }
    for(let i = 0; i < spawn.length; i++){
        if(
            spawn[i].x < hitarea.x + 50 &&
            spawn[i].x + 50 > hitarea.x &&
            spawn[i].y < hitarea.y + 50 &&
            spawn[i].y + 50 > hitarea.y && 
            !(Crt.t == spawn[i].t)
        ){
            console.log(Crt.t + " hited a " + spawn[i].t)
            damageHit(spawn[i], Crt);
        }
    }
}

// calculates damadge //
function damageHit(gotHit, hits){
    dx = (hits.x + 25) - (gotHit.x + 25);
    dy = (hits.y + 25) - (gotHit.y + 25);
    distance = Math.sqrt(dx*dx + dy*dy);
    dx /= distance;
    dy /= distance;
    gotHit.x -= (dx*speed) * 20;
    gotHit.y -= (dy*speed) * 20;

    gotHit.hp -= hits.dmg;
    console.log(gotHit.hp);
}

function drawCaracthers(){
    for(let i = 0; i < spawn.length; i++){
        context.fillStyle = spawn[i].color;
        context.fillRect(spawn[i].x, spawn[i].y, 50, 50);
    }
}

// <>-<>-<> code test purpose only <>-<>-<> //

let mousePos = {
    x: 0,
    y: 0
}

addEventListener('mousemove', (e)=>{
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
})

addEventListener('keypress', (e)=>{
    if(e.key == 'q'){
        newCrt2(mousePos.x - 25, mousePos.y - 25, 'pink', 'red')
    }
    if(e.key == 'a'){
        newCrt(mousePos.x - 25, mousePos.y - 25, 'red', 'red')
    }
    if(e.key == 'z'){
        newCrt3(mousePos.x - 25, mousePos.y - 25, 'darkred', 'red')
    }
    if(e.key == 'u'){
        newCrt2(mousePos.x - 25, mousePos.y - 25, 'lightblue', 'blue')
    }
    if(e.key == 'j'){
        newCrt(mousePos.x - 25, mousePos.y - 25, 'blue', 'blue')
    }
    if(e.key == 'm'){
        newCrt3(mousePos.x - 25, mousePos.y - 25, 'darkblue', 'blue')
    }
    if(e.key == ' '){
        if(pause == true){
            pause = false;
        } else {
            pause = true;
        }
    }
})

addEventListener('mousedown', (e)=>{
    let pos = {
        x: e.clientX,
        y: e.clientY
    }
    spawn[0].x = pos.x;
    spawn[0].y = pos.y;
})