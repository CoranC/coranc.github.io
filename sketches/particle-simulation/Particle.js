function Particle(name, moveSpeed, x, y, c) {
  this.x = x || random(0, 400);
  this.y = y || random(0, 400);
  this.r = random(8, 12);
  this.d = this.r * 2;
  this.name = name;
  this.c = c || color(random(0,255), random(0,255), random(0,255));
  this.dir = 1;
  this.moveSpeed = moveSpeed;

  this.move = function() {
    this.x += random(1, this.moveSpeed) * this.dir;
    this.y += random(1, this.moveSpeed) * this.dir;
  }

  this.moveRandomly = function() {
    this.x += random(-this.moveSpeed, this.moveSpeed);
    this.y += random(-this.moveSpeed, this.moveSpeed);
  }

  this.moveAwayFromParticle = function(otherParticle){
    if(this.x < otherParticle.x && this.y < otherParticle.y){
      this.x -= this.moveSpeed;
      this.y -= this.moveSpeed;
    }else{
      this.x += this.moveSpeed;
      this.y += this.moveSpeed;
    }
  }

  this.moveTowardParticle = function(otherParticle){
    if(this.x < otherParticle.x && this.y < otherParticle.y){
      this.x += this.moveSpeed * 0.5;
      this.y += this.moveSpeed * 0.5;
    }else{
      this.x -= this.moveSpeed * 0.5;
      this.y -= this.moveSpeed * 0.5;
    }
  }

  this.overlaps = function(otherParticle) {
    this.distBetweenParticles = dist(this.x, this.y, otherParticle.x, otherParticle.y);
    if((this.r + otherParticle.r) > this.distBetweenParticles) {
      console.log(this.name + " Overlapping");
      return true;
    }
    return false;
  }

    this.fullyOverlaps = function(otherParticle) {
    this.distBetweenParticles = dist(this.x, this.y, otherParticle.x, otherParticle.y); 
    if(this.distBetweenParticles < Math.abs(this.r - otherParticle.r)) {
      console.log(this.name + " has fully overlapped another");
      return true;
    }
    return false;
  }

  this.hitEdges = function() {
    if(this.x + this.r > width || this.x - this.r < 0 ||
      this.y + this.r > height || this.y - this.r < 0) {
        console.log(this.name + " Hitting an edge");
        return true;
      }
    return false;
  }

  this.moveAwayFromEdges = function(){
    if((this.x - this.r) < 0){
      this.x += this.moveSpeed * 4;
    }
    if((this.x + this.r) > width){
      this.x -= this.moveSpeed * 4;
    }
    if((this.y - this.r) < 0){
      this.y += this.moveSpeed * 4;
    }
    if((this.y + this.r) > height){
      this.y -= this.moveSpeed * 4;
    }
  }


  this.update = function(moveSpeed, currentFrame) {
    this.d = this.r * 2;
    this.moveSpeed = moveSpeed;
    this.frameCount = currentFrame;
  }

  this.render = function() {
      noStroke();
      //stroke(0);
      fill(this.c);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
      if(this.hitEdges()) {
        this.moveAwayFromEdges();
      }else{
        this.moveRandomly();
      }
  }

  this.createBabies = function(){
    var newParticles = [];
    var parentR = this.c.levels[0];
    var parentG = this.c.levels[1];
    var parentB = this.c.levels[2];
    for(var i = 0; i < 10; i++){
      newParticles.push(new Particle(this.name + " - c" + i,
                                     this.moveSpeed,
                                     this.x + random(-100, 100),
                                     this.y + random(-100, 100),
                                     color(
                                      parentR + random(-60, 60),
                                      parentG + random(-60, 60),
                                      parentB + random(-60, 60)
                                      )
                                     ));
    }
    return newParticles;
  }
}



