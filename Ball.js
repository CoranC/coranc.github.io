function Ball(){
  this.startX = width/2;
  this.startY = 20;
  this.startSpeed = 2;
  this.pos = createVector(this.startX, this.startY);
  this.r = 10;
  this.speed = this.startSpeed;
  this.color = color(COLOR_RGB_WHITE);
  this.xdir = -1;
  this.ydir = 0;
  
  this.isOutOfBounds = function(){
    return (this.pos.x - this.r > p2.pos.x + p2.w || 
            this.pos.x + this.r < p1.pos.x);
  }
  
  
  this.update = function(){
    if(this.isOutOfBounds()){
      this.speed = this.startSpeed;
      this.pos.x = this.startX;
      this.pos.y = this.startY;
    }
    if(this.pos.y - this.r <= 0){
      this.ydir = 1;
      topSideHitSound.play();
    }
    if(this.pos.y + this.r >= height){
      this.ydir = -1;
      bottomSideHitSound.play();
    }
    this.pos.x += this.speed * this.xdir;
    this.pos.y += this.speed * this.ydir;
  }
  
  this.show = function(){
    this.update();
    if((frameCount % 60) == 0){
      this.speed += 0.2;
    }
    push();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    pop();
  }
}