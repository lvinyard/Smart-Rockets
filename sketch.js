var population;
var lifespan = 1000;
var count = 0;
var lifeP;
var target;


function setup() {
  // put setup code here
  createCanvas(800, 600);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 100);
}

function draw() {
  background(0);
  population.run()
  lifeP.html(count);
  count++;

  ellipse(target.x, target.y, 30, 30);
}

function Population() {
  this.rockets = [];
  this.popsize = 25;
  this.matingpool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function () {
    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();

      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    this.matingpool = [];

    //20 mins i think

  }

  this.run = function () {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}



function DNA() {
  this.genes = [];
  for (var i = 0; i < lifespan; i++) {
    this.genes[i] = p5.Vector.random2D();
    this.genes[i].setMag(0.1);
  }
}


function Rocket() {
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.dna = new DNA();
  this.fitness = 0;


  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.calcFitness = function () {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = 1 / d;
  }

  this.update = function () {
    this.applyForce(this.dna.genes[count]);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function () {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }


}