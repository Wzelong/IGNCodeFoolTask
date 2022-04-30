class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     * @param {string} color - initial color
     * @param {number} colorTime
     * @param {number} hitTime 
     * @param {number} alignTime  
     * @param {number} seperateTime  
     * @param {number} cohesionTime  
     * @param {number} clickTime  
     */
    constructor(x, y, vx = 1, vy = 1, color = "skyblue", colorTime = 0, hitTime = 0, alignTime = 0, seperateTime = 0, cohesionTime = 0, clickTime = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.colorTime = colorTime;
        this.hitTime = hitTime;
        this.alignTime = alignTime;
        this.seperateTime = seperateTime;
        this.cohesionTime = cohesionTime;
        this.clickTime = clickTime;
        this.originColor = color;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.save();
            context.fillStyle = this.color;
            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.translate(this.x, this.y);
            if(this.vx == 0 && this.vy < 0) context.rotate(Math.PI);
            else if(this.vy == 0 && this.vx < 0) context.rotate(Math.PI/2);
            else if(this.vy == 0 && this.vx > 0) context.rotate(-Math.PI/2);
            else if(this.vx < 0 && this.vy < 0) context.rotate(-Math.atan(this.vx/this.vy) - Math.PI);
            else if(this.vy < 0) context.rotate(-Math.atan(this.vx/this.vy) - Math.PI);
            else context.rotate(-Math.atan(this.vx/this.vy));
            context.scale(0.7, 0.7);
            context.beginPath();
            context.arc(0, 0, 8, 0, Math.PI);
            context.moveTo(8, 0);
            context.lineTo(0, -20);
            context.lineTo(-8, 0);
            //context.closePath();
            context.fill();
            context.stroke();
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        if(this.clickTime == 0){
            if(this.hitTime == 0){
                let currentX = this.x;
                let currentY = this.y;
                let currentVx = this.vx;
                let currentVy = this.vy;
                let currentHitTime = 0;
                let alignTime = this.alignTime;
                let seperateTime = this.seperateTime;
                let cohesionTime = this.cohesionTime;
                let color = this.color;
            
                theBoids.forEach(function (boid){
                            let inRange;
                            if(currentX!=boid.x && currentY!=boid.y){
                                if(boid.vx > 0 && boid.vy > 0 && currentX >= boid.x - 50 && currentX <= boid.x && currentY >= boid.y - 50 && currentY <= boid.y) inRange = true;
                                else if(boid.vx < 0 && boid.vy > 0 && currentX >= boid.x && currentX <= boid.x + 50 && currentY >= boid.y - 50 && currentY <= boid.y) inRange = true;
                                else if(boid.vx > 0 && boid.vy < 0 && currentX >= boid.x - 50 && currentX <= boid.x && currentY >= boid.y && currentY <= boid.y + 50) inRange = true;
                                else if(boid.vx < 0 && boid.vy < 0 && currentX >= boid.x && currentX <= boid.x + 50 && currentY >= boid.y && currentY <= boid.y + 50) inRange = true;
                                else inRange = false;
                            }
                            if(alignment == true && alignTime == 0){
                            
                                if(inRange == true && color == boid.color){
                                    currentVx = boid.vx;
                                    currentVy = boid.vy;
                                    alignTime = 20;
                                }
                            }
        
                            if(seperation == true && seperateTime == 0 && color != boid.color){
                                if(inRange == true){
                                    let angle = 0;
                                    if(Math.random() > 0.5) angle = 20 * Math.PI / 180;
                                    else angle = -20 * Math.PI / 180;
                                    const s = Math.sin(angle);
                                    const c = Math.cos(angle);
                                    
                                    let ovx = currentVx;
                                    let ovy = currentVy;
        
                                    currentVx =  ovx * c + ovy * s;
                                    currentVy = -ovx * s + ovy * c;  
                                    seperateTime = 20;
            
                                }
                            }
        
                            if(cohesion == true && cohesionTime == 0 && color == boid.color){
                                if(inRange == true){
                                    
                                    let xdirction = boid.x - currentX;
                                    let ydirction = boid.y - currentY;
                                    let dotProduct = xdirction * currentVx + ydirction * currentVy;
                                    let cross = xdirction * currentVy - ydirction * currentVx;
        
                                    const angle = Math.atan2(cross, dotProduct) * 0.5;
                                    const s = Math.sin(angle);
                                    const c = Math.cos(angle);
    
                                    let ovx = currentVx;
                                    let ovy = currentVy;
    
                                    currentVx =  ovx * c + ovy * s;
                                    currentVy = -ovx * s + ovy * c;
                                    cohesionTime = 10;
                                }
                                
                            }
                             
                        }
                )
    
                this.vx = currentVx;
                this.vy = currentVy;
                this.hitTime = currentHitTime;
                this.seperateTime = seperateTime;
                this.alignTime = alignTime;
                this.cohesionTime = cohesionTime;
            }
    
            
            const angle = 0.3 * Math.PI / 180;
            const s = Math.sin(angle);
            const c = Math.cos(angle);
    
            let ovx = this.vx;
            let ovy = this.vy;
    
            this.vx =  ovx * c + ovy * s;
            this.vy = -ovx * s + ovy * c;
            
        }
    }
}


/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

 /** @type Array<Boid> */
let theBoids = [];
let circleColor = "white";
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));

function resizeCanvasToDisplaySize(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
 
    return false;
 }
let context = canvas.getContext("2d");

let alignment = true;
let seperation = true;
let cohesion= true;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    theBoids.forEach(boid => boid.draw(context));
}

// Give the mouse an out-of-box position
let mouseClickX= -10;
let mouseClickY = -10;

// Onclick function handler
canvas.onclick = function(event) {
    mouseClickX = event.clientX;
    mouseClickY = event.clientY;
    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    mouseClickX -= box.left;
    mouseClickY -= box.top;
}
/**
 * Handle the buttons
 */


let lastTime; // will be undefined by default
/**
 * The Actual Execution
 */
function loop(timestamp) {
    // time step - convert to 1/60th of a second frames
    // 1000ms / 60fps
    resizeCanvasToDisplaySize(canvas);
    const delta = (lastTime ? timestamp-lastTime : 0) * 1000.0/60.0;

    // change directions
    theBoids.forEach(boid => boid.steer(theBoids));

    theBoids.forEach(function (boid) {
        if(mouseClickX >= 0 && mouseClickY >= 0){
            let xdirction = mouseClickX - boid.x;
            let ydirction = mouseClickY - boid.y;
            let dotProduct = xdirction * boid.vx + ydirction * boid.vy;
            let cross = xdirction * boid.vy - ydirction * boid.vx;
        
            const angle = Math.atan2(cross, dotProduct);
            const s = Math.sin(angle);
            const c = Math.cos(angle);

            let ovx = boid.vx;
            let ovy = boid.vy;

            boid.vx =  ovx * c + ovy * s;
            boid.vy = -ovx * s + ovy * c;
            boid.clickTime = 10;
        }
        
    });

    // move forward
    let speed = 6;
    theBoids.forEach(function (boid) {
        boid.x += boid.vx * speed;
        boid.y += boid.vy * speed;
    });
    // make sure that we stay on the screen
    theBoids.forEach(function (boid) {
        let currentColorTime = 0;

        boid.colorTime += currentColorTime;

        if (boid.x < 0){
            boid.vx = -boid.vx; 
            boid.color = "#EBA286"; 
            boid.colorTime = 10;
            boid.hitTime = 20;
        } 
        else if (boid.x > canvas.width){
            boid.vx = -boid.vx; 
            boid.color = "#EBA286"; 
            boid.colorTime = 10;
            boid.hitTime = 20;
        }
        if (boid.y < 0){
            boid.vy = -boid.vy; 
            boid.color = "#EBA286"; 
            boid.colorTime = 10;
            boid.hitTime = 10;
        } 
        else if (boid.y > canvas.height){
            boid.vy = -boid.vy; 
            boid.color = "#EBA286"; 
            boid.colorTime = 10;
            boid.hitTime = 20;
        }
        if(boid.x > canvas.width/2 - 60 && boid.x < canvas.width/2 + 60 && boid.y > canvas.height/2 - 60 && boid.y < canvas.height/2 + 60 && boid.hitTime <= 1){
            boid.vx = -boid.vx;
            boid.vy = -boid.vy;
            circleColor = boid.color;
            boid.colorTime = 10;
            boid.hitTime = 40;
        }

        if(boid.colorTime == 0) boid.color = boid.originColor;
        else boid.colorTime -= 1;

        if(boid.hitTime != 0) boid.hitTime -= 1;
        if(boid.alignTime != 0) boid.alignTime -= 1;
        if(boid.seperateTime != 0) boid.seperateTime -= 1;
        if(boid.cohesionTime != 0) boid.cohesionTime -= 1;
        if(boid.clickTime != 0) boid.clickTime -= 1;
    });
    // now we can draw
    draw();
    // and loop

    context.save();
        context.strokeStyle = circleColor;
        context.lineWidth = 12;
        context.beginPath();
        context.arc(canvas.width/2, canvas.height/2, 50, 0, 2*Math.PI);
        context.closePath();
        context.stroke();
    context.restore();

    mouseClickX = -10;
    mouseClickY = -10;
    window.requestAnimationFrame(loop);

}
// start the loop with the first iteration
window.requestAnimationFrame(loop);

const form = document.getElementById('vote-form');

function vote(color) {
    const choice = document.getElementById(color).value;
    const data = {color: choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
    
}

document.getElementById("red-button").onclick = function () {
    vote("red");
};
document.getElementById("blue-button").onclick = function () {
    vote("blue");
};
document.getElementById("green-button").onclick = function () {
    vote("green");
};
document.getElementById("orange-button").onclick = function () {
    vote("orange");
};


fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;
        // Count vote points - acc/current
        const voteCounts = votes.reduce((acc, vote) => 
            ((acc[vote.color] = (acc[vote.color] || 0) + parseInt(vote.points)), acc), {});
        
        let dataPoints = [
                {label: 'Red', y:voteCounts.Red},
                {label: 'Blue', y:voteCounts.Blue},
                {label: 'Green', y:voteCounts.Green},
                {label: 'Orange', y:voteCounts.Orange}
        ];

        let colors = ["hsl(317 100% 54%)",
        "lightskyblue",
        "darkseagreen",
        "rgb(255, 127, 80)"];

        function initialize(){
            let speedX = 0;
            let speedY = 0;
            let x = 0;
            let y = 0;
            for(let j = 0; j < 4; ++j){
                for(let i = 0; i < dataPoints[j].y; ++i){
                    if(Math.random()>0.5) speedX = 1;
                    else speedY = 1;
                    if(Math.random()> 0.5){
                        y = Math.random()*canvas.height;
                        if(Math.random()>0.5) x = Math.random()*200;
                        else x = Math.random()*canvas.width/4 + canvas.width/2;
                    }
                    else{
                        x = Math.random()*canvas.width;
                        if(Math.random()>0.5) y = Math.random()*200;
                        else y = Math.random()*canvas.height/4 + canvas.height/2;
                    }
                    
                    theBoids.push(new Boid(x, y, speedX, speedY, colors[j]));
                    speedX = 0;
                    speedY = 0;
                }
            }
            
        }
        initialize();

        
        const chartContainer = document.querySelector('#chartContainer');
        CanvasJS.addColorSet("greenShades",
        [//colorSet Array
        "hsl(317 100% 54%)",
        "lightskyblue",
        "darkseagreen",
        "rgb(255, 127, 80)"                
        ]);
        
        if(chartContainer) {
                const chart = new CanvasJS.Chart('chartContainer', {
                    animationEnabled: true,
                    theme: 'theme1',
                    backgroundColor: 'black',
                    colorSet:"greenShades",
                    lineColor:"white",
                    title: {
                        text:`Color Votes`,
                        fontColor: 'white'
                    },
                    data: [
                        {
                            type: 'pie',
                            dataPoints: dataPoints
                        }
                    ]
                });
                chart.render();
            
                 // Enable pusher logging - don't include this in production
                 Pusher.logToConsole = true;
            
                 var pusher = new Pusher('777bd7c75b0bde5c46b2', {
                   cluster: 'us2'
                 });
             
                 var channel = pusher.subscribe('color-poll');
                 channel.bind('color-vote', function(data) {
                   dataPoints = dataPoints.map(x => {
                       if(x.label == data.color) {
                            x.y += data.points;
                            let speedX = 0;
                            let speedY = 0;
                            let xboid = 0;
                            let color = data.color;
                            if(color == "Red") color = "hsl(317 100% 54%)";
                            else if(color == "Blue") color = "lightskyblue";
                            else if(color == "Green") color = "darkseagreen";
                            else if(color == "Orange") color = "rgb(255, 127, 80)";

                            let y = 0;
                            for(let i = 0; i < 1; ++i){
                                if(Math.random()>0.5) speedX = 1;
                                else speedY = 1;
                                if(Math.random()> 0.5){
                                    y = Math.random()*600;
                                    if(Math.random()>0.5) xboid = Math.random()*200;
                                    else xboid = Math.random()*200 + 400;
                                }
                                else{
                                    xboid = Math.random()*600;
                                    if(Math.random()>0.5) y = Math.random()*200;
                                    else y = Math.random()*200 + 400;
                                }
                                
                                theBoids.push(new Boid(xboid, y, speedX, speedY, color));
                                speedX = 0;
                                speedY = 0;
                            }
                           return x;
                       } else {
                           return x;
                       }
                       
                   });
                   chart.render();
                 });
            
            
        }
            
    })
    
    

    
