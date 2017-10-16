class Plane {
  
  constructor(x, y, m, w, h){
    this.mass = m;
    this.position = createVector(x,y);  // the location of the object
    this.velocity = createVector(0,0);  // how the position moves over time
    this.acceleration = createVector(0,0);  // how velocity changes over time
    this.w = w;
    this.h = h;
    this.isAtTopOfScreen = false;
    this.isHit = false;
  }
  
  applyForce(force) {
    // Using a static method here to divide so 
    // that the original force object isn't modified
    let f = p5.Vector.div(force, this.mass);  // force = mass * acceleration OR acceleration = force / mass
    this.acceleration.add(f);
  }
  
  thrust(){
    if(!this.isAtTopOfScreen){
      let t = createVector(0.0, -2.5);
      this.applyForce(t);
    }
  }
  
  
  accelerate(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // wipe out the acceleration so that it doesn't keep increasing exponentially
    this.acceleration.mult(0);
  }
  
  hitSkyscraper(s){
    return (this.bottomEdge() > s.position.y &&
        this.leftEdge() < (s.position.x + s.w) &&
        this.rightEdge() > s.position.x);

  }
  
  hitFuel(f){
    return (this.bottomEdge() > f.position.y &&
        this.topEdge() < f.position.y &&
        this.leftEdge() < (f.position.x + f.r) &&
        this.rightEdge() > f.position.x + f.r*2);

  }
  
  topEdge(){
    return this.position.y - (this.h / 2);
  }
  
  bottomEdge(){
    return this.position.y + (this.h / 2);
  }
  
  leftEdge(){
    return this.position.x - (this.w / 2);
  }
  
  rightEdge(){
    return this.position.x + (this.w / 2);
  }
  
  update(){
    this.accelerate();
    if(this.position.y + (this.h / 2) < 0){
      this.isAtTopOfScreen = true;
      this.position.y = 0 - (this.h / 2);
    }else{
      this.isAtTopOfScreen = false;
    }
  }
  
  isOffScreen(){
    return this.rightEdge() < 0 ||
      this.topEdge() > height;
      
  }
  
  render(pic){
    fill(255);
    imageMode(CENTER);
    image(pic, this.position.x, this.position.y, this.w, this.h); 
    //rect(this.position.x, this.position.y, this.w, this.h); 
  }
}