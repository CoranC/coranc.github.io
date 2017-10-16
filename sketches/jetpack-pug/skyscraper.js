class Skyscraper {

  constructor(levelSpeed){
    this.w = 100;
    this.h = random(250, height);
    this.levelSpeed = levelSpeed;
    this.position = createVector(width + random(5, 100), this.h);  // the location of the object
    this.velocity = createVector(-this.levelSpeed, 0);  // how the position moves over time
    this.acceleration = createVector(0, 0);  // how velocity changes over time
  }
  
  isOffScreen(){
    return (this.position.x + this.w) < 0;
  }
  
  createWindows(){
    fill(255, 255, 153);
    let windowWidth = 20;
    let windowBuffer = 10;
    let startingPoint = 10;
    
    for(let i = 0; i < (this.w - windowBuffer) / (windowWidth + windowBuffer); i++){
      for(let j = 0; j < (this.h - windowBuffer) / (windowWidth + windowBuffer); j++){
          //rect(this.position.x + 10, this.position.y + 10, 20, 20);
          rect(this.position.x + startingPoint + (i * (windowWidth + windowBuffer)),
              this.position.y + startingPoint + (j * (windowWidth + windowBuffer)),
              windowWidth, windowWidth);
      }
    }
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
  }
  
  render(){
    stroke(0);
    fill(50);
    rectMode(CORNER);
    rect(this.position.x, this.position.y, this.w, this.h);
    this.createWindows();
  }
}