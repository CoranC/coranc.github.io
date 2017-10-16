class Fuel {

  constructor(levelSpeed){
    this.r = 5;
    this.levelSpeed = levelSpeed;
    this.position = createVector(width + random(5, 100), random(10, height - 10));  // the location of the object
    this.velocity = createVector(-this.levelSpeed, 0);  // how the position moves over time
    this.acceleration = createVector(0, 0);  // how velocity changes over time
  }
  
  isOffScreen(){
    return this.position.x + this.r < 0;
  }
  
  accelerate(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // wipe out the acceleration so that it doesn't keep increasing exponentially
    this.acceleration.mult(0);
  }
  
  update(levelSpeed){
    this.levelSpeed = levelSpeed;
    this.accelerate();
    console.log("Fuel", this.position.x, this.position.y);
  }
  
  render(boneImg){
    stroke(0);
    fill(255, 255, 0);
    imageMode(CORNER);
    image(boneImg, this.position.x, this.position.y);
  }
}