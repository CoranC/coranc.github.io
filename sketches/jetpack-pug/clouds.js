class Clouds {
  
  constructor(levelSpeed){
    this.w = 80;
    this.h = 50;
    this.levelSpeed = levelSpeed;
    this.position = createVector(random(width, width+50),
        random(0, height-this.h));  // the location of the object
    this.velocity = createVector(-this.levelSpeed, 0);  // how the position moves over time
    this.acceleration = createVector(0, 0);  // how velocity changes over time
  }
  
  isOffScreen(){
    return this.position.x + this.w < 0;
  }

  accelerate(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // wipe out the acceleration so that it doesn't keep increasing exponentially
    this.acceleration.mult(0);
  }
  
  update(levelSpeed){
    this.levelSpeed = levelSpeed;
    console.log("CLOUD VELOCITY is " + this.velocity);
    this.accelerate();
  }
  
  render(pic){
    image(pic, this.position.x, this.position.y, this.w, this.h);
  }
}


  