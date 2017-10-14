function PowerUp(){
  this.r = random(7, 14);
  this.pos = createVector(random(50, width - 50), random(0 + this.r, height - this.r));
  this.lifeSpanSeconds = 20 * 60;
  this.isAlive = true;
  this.birth = frameCount;
  this.powerList = [POWERUP_PADDLE_BIG, POWERUP_PADDLE_SMALL, 
                    POWERUP_PADDLE_SPEED_DECREASE, POWERUP_BALL_SPEED_INCREASE,
                    POWERUP_BALL_SPEED_DECREASE, POWERUP_TRIPPY];
  this.power = random(this.powerList);
  this.colorDict = {
    "PaddleBig": COLOR_HEX_GREEN,
    "PaddleSmall": COLOR_HEX_PINK,
    "PaddleSpeedDecrease": COLOR_HEX_TAN,
    "BallSpeedIncrease": COLOR_HEX_RED,
    "BallSpeedDecrease": COLOR_HEX_YELLOW,
    "Trippy": COLOR_HEX_AQUA
  };

  this.color = color(this.colorDict[this.power]);
  
  this.isTouchingBall = function(b){
    return (abs(this.pos.x - b.pos.x) <= this.r*2 &&
            abs(this.pos.y - b.pos.y) <= this.r*2);
  }
  
  this.update = function(b){
    if(frameCount > this.birth + this.lifeSpanSeconds){
      this.isAlive = false;
    }
  }
  
  this.show = function(){
    push();
    fill(random(0, COLOR_RGB_WHITE), random(0, COLOR_RGB_WHITE), random(0, COLOR_RGB_WHITE));
    fill(this.color);
    strokeWeight(2);
    stroke(COLOR_RGB_WHITE);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    pop();
  }
}
