function Paddle(x, y, label){
  this.label = label;
  this.score = 0;
  this.ydir = 0;
  this.pos = createVector(x, y);
  this.startW = 20;
  this.startH = this.startW * 3;
  this.w = this.startW;
  this.h = this.startH;
  this.color = color(COLOR_RGB_WHITE);
  this.startSpeed = 5;
  this.speed = this.startSpeed;
  
  this.hitBall = function(b){
    if(this.pos.y >= b.pos.y + b.r ||
       this.pos.y + this.h <= b.pos.y - b.r){
      return false;
    }
    if(this.label == "L"){
      return (this.pos.x + this.w/2 >= b.pos.x - b.r);
    }
    if(this.label == "R"){
      return (this.pos.x <= b.pos.x + b.r);
    }
    return false;
  }
  
  
  this.update = function(b){
    if(this.hitBall(b)){
      b.xdir *= -1;
      b.ydir = this.calculateAngleOfBall(b);
      if(this.label == "L"){
        paddleLeftHitSound.play();
      }else{
        paddleRightHitSound.play();
      }
    }
    this.pos.y += this.speed * this.ydir;
    this.preventMovingOffScreen();
  }
  
  this.preventMovingOffScreen = function(){
    if(this.pos.y < 0){
      this.pos.y = 1;
    }
    if(this.pos.y + this.h > height){
      this.pos.y = height - this.h;
    }
  }
  
  this.show = function(){
    push();
    stroke(COLOR_RGB_GRAY);
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.w, this.h);
    pop();
  }
  
  this.stopMove = function(){
    this.ydir = 0;
  }
  
  this.calculateAngleOfBall = function(b){
    paddleMiddle = this.pos.x + this.h/2;
    ballMiddle = b.pos.y;
    return map(b.pos.y, this.pos.y, this.pos.y + this.h, -0.5, 0.5);
  }
  
  
  this.move = function(dir){
    if(dir == UP_ARROW || dir == KEY_W){
      this.ydir = DIRECTION_UP;
    }else if(dir == DOWN_ARROW || dir == KEY_S){
      this.ydir = DIRECTION_DOWN;
    }
  }
  
  this.moveAI = function(){
    if(ball.pos.y >= this.pos.y + (this.w / 2)){
      this.ydir = DIRECTION_DOWN;
    }else{
      this.ydir = DIRECTION_UP;
    }
  }
}