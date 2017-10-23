// reference color for particles
const referenceColor = 247;

class Particle {

    constructor() {
        // set spawn area diameter
        const spawnDiameter = 8;

        // set position
        let angle = random(0, 2 * Math.PI);
        this.x = 320 + spawnDiameter * Math.cos(angle);
        this.y = 400 + spawnDiameter * Math.sin(angle);
        this.vx = random(-0.75, 0.75);
        this.vy = random(-1, -2);
        this.disturbance = random(0.3, 0.5);

        // set color
        this.vc = Math.exp(random(1, 1.5));
        this.transparency = 230;
        this.state = referenceColor;
        this.to_disappear = false;
    }

    show() {
        // draw particle
        let k = Math.pow(this.state / referenceColor, 8);
        noStroke();
        fill(referenceColor * k, this.state, this.state, this.transparency);
        ellipse(this.x, this.y, 10);
    }

    update() {
        // update position
        this.x += this.vx * (1 + random(-this.disturbance, this.disturbance));
        this.y += this.vy;

        // update color/tranparency
        if (this.to_disappear) {
            // change transparency
            this.transparency -= this.vc;
        } else {
            // change color
            this.state -= this.vc;
            if (this.state < 0) {
                // set it to disappear
                this.state = 0;
                this.to_disappear = true;
            }
        }
    }

    hasDisappeared() {
        return this.transparency < 0;
    }
}

// create array of particles
let particles = [];

/* Setup canvas */
function setup() {
    createCanvas(640, 480);
}

/* Draw particles */
function draw() {
    // refresh background
    background(0);
    // add particles
    for (let i = 0; i < random(1, 2); i++) {
        particles.push(new Particle());
    }
    // show particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].hasDisappeared()) {
            // remove particle
            particles.splice(i, 1);
        }
    }
}