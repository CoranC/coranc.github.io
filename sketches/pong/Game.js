function Game(){
  this.p1Score = 0;
  this.p2Score = 0;
  this.powerUps = [];
  this.isOnePlayerMode = true;
  this.randomPowerUpTime = 0;
  this.randomPowerUpDeathTime = 0;
  this.phraseDisplaySeconds = 1;
  this.phraseDisplayFrame = 0;
  this.currentPowerUp;
  this.playMode = "COMPUTER    vs    PLAYER";
  this.playModeXpos = 0;
  this.playModeYpos = (height/2);
  this.startText = "START";
  this.startTextXpos = 0;
  this.startTextYpos = (height - 60);
  this.isTrippy = false;
  this.isGameStarted = false;
  this.isCountdownComplete = false;
  this.countdownStartFrame = 0;
  this.p1ControlText = "W\n\nS";
  this.p2ControlText = "UP\n\nDOWN";
  this.phraseDict = {
    "PaddleBig": "SUPERSIZE!",
    "PaddleSmall": "MINI MODE!",
    "PaddleSpeedDecrease": "TURTLE SPEED!",
    "BallSpeedIncrease": "SPEED IT UP!",
    "BallSpeedDecrease": "SLOW IT DOWN!",
    "Trippy": "TRIPPY!"
  };
  
  // CONTROLS
  this.keyReleased = function(){
    if(keyCode == KEY_W || keyCode == KEY_S){
      p1.stopMove();
    }
    if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
      p2.stopMove();
    }
  }

  
  this.keyPressed = function(){
    if(keyCode == KEY_W || keyCode == KEY_S){
      p1.move(keyCode);
    }
    if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
      p2.move(keyCode);
    }
  }
  
  // POWERUPS
  this.setPowerUpRandomTimes = function(){
    
    if(frameCount < this.phraseDisplayFrame){
      this.displayPowerUpPhrase();
    }
    
    if(frameCount > this.randomPowerUpTime && this.powerUps.length == 0){
      randomFrames = random(2 * FRAMERATE, 5 * FRAMERATE);
      this.randomPowerUpTime = frameCount + randomFrames;
    }

    if(frameCount == this.randomPowerUpDeathTime){
      this.resetPowerUpEffectsTotally();
      }

    if(frameCount == parseInt(this.randomPowerUpTime)){
      this.powerUps.push(new PowerUp());
    }
  
    // iterates over powerups
    for(var i = this.powerUps.length - 1; i >= 0; i--){
      this.powerUps[i].show();
      if(this.powerUps[i].isTouchingBall(ball)){
        this.currentPowerUp = this.powerUps[i];
        this.setPowerEffect(this.powerUps[i]);
        this.powerUps[i].isAlive = false;
        this.randomPowerUpDeathTime = frameCount + this.powerUps[i].lifeSpanFrames;
        this.setDisplayPhrase(this.powerUps[i]);
      }
      if(ball.isOutOfBounds()){
        this.powerUps[i].isAlive = false;
        this.resetPowerUpEffectsTotally();
      }
      if(!this.powerUps[i].isAlive){
        this.powerUps.splice(i, 1);
        background(COLOR_RGB_GRAY);
      }
    }
  }
  
  this.setDisplayPhrase = function(){
    this.phraseDisplayFrame = frameCount + (this.phraseDisplaySeconds * FRAMERATE);
  }
  
  this.displayPowerUpPhrase = function(powerUp){
    phrase = this.phraseDict[this.currentPowerUp.power];
    push();
    fill(this.currentPowerUp.color);
    textSize(40);
    text(phrase, width/2 - textWidth(phrase)/2, (height/2) - 50);
    pop();
  }

  
  this.updateScores = function(){
    if(ball.xdir == DIRECTION_LEFT){
      p2.score++;
    }else{
      p1.score++;
    }
  }
  
  this.displayTitle = function(){
    push();
    textSize(CONTROL_KEYS_SIZE);
    title = "PONG";
    titleXpos = width/2 - (textWidth(title)/2)
    fill(COLOR_RGB_WHITE);
    textSize(COUNTDOWN_NUMBER_SIZE);
    text(title, width/2 - (textWidth(title)/2), (height * 0.2));
    if(this.isOnePlayerMode){
      this.playMode = "COMPUTER    vs    PLAYER";
    }else{
      this.playMode = "PLAYER    vs    PLAYER";
    }
    textSize(CONTROL_KEYS_SIZE);
    this.playModeXpos = width/2 - (textWidth(this.playMode)/2)
    text(this.playMode, this.playModeXpos, this.playModeYpos);
    this.startTextXpos = width/2 - (textWidth(this.startText)/2)
    text(this.startText, this.startTextXpos, this.startTextYpos);
    noFill();
    stroke(COLOR_RGB_WHITE);
    strokeWeight(2);
    rect(this.playModeXpos - 10, this.playModeYpos - CONTROL_KEYS_SIZE, textWidth(this.playMode) + 20, CONTROL_KEYS_SIZE + 10);
    rect(this.startTextXpos - 10, this.startTextYpos - CONTROL_KEYS_SIZE, textWidth(this.startText) + 20, CONTROL_KEYS_SIZE + 10);
    pop();
  }
  
  this.checkMouseClicks = function(mouseX, mouseY){
    textSize(CONTROL_KEYS_SIZE);
    if(mouseX > this.playModeXpos - 10 &&
       mouseY > this.playModeYpos - CONTROL_KEYS_SIZE &&
       mouseX < this.playModeXpos - 10 + textWidth(this.playMode) + 20 &&
       mouseY < this.playModeYpos + CONTROL_KEYS_SIZE + 10){
      this.isOnePlayerMode = !this.isOnePlayerMode;
    }else if(mouseX > this.startTextXpos - 10 &&
       mouseY > this.startTextYpos - CONTROL_KEYS_SIZE &&
       mouseX < this.startTextXpos - 10 + textWidth(this.startText) + 20 &&
       mouseY < this.startTextYpos + CONTROL_KEYS_SIZE + 10){
      this.isGameStarted = true;
      this.countdownStartFrame = frameCount;
    }
  }
  
  
  this.countdownStart = function(seconds){
    totalFrames = this.countdownStartFrame + (seconds * FRAMERATE);
    if(frameCount < totalFrames){
      second = floor((totalFrames - frameCount)/FRAMERATE) + 1;
      push();
      fill(COLOR_RGB_WHITE)
      textSize(COUNTDOWN_NUMBER_SIZE);
      text(second, width/2 - (textWidth(second.toString())/2), (height/2) - 50);
      textSize(CONTROL_KEYS_SIZE);
      if(this.isOnePlayerMode){
        this.p1ControlText = "";
      }else{
        this.p1ControlText = "W\n\nS";
      }
      text(this.p1ControlText, width * 0.1, (height/2) - 50);
      text(this.p2ControlText, width * 0.9 - (textWidth(this.p2ControlText)/2), (height/2) - 50);
      textFont(arcadeFont);
      pop();
      return true;
    }
    return false;
  }


  this.displayScore = function(score, x){
    fill(COLOR_RGB_WHITE)
    textSize(26);
    text(score, x, 25);
  }
  
  this.displayScores = function(){
    this.displayScore(p1.score, 50);
    this.displayScore(p2.score, width-50);
  }


  this.setPowerEffect = function(powerUp){
    if(powerUp.power == POWERUP_PADDLE_BIG){
      if(ball.xdir == DIRECTION_RIGHT){
        this.setPaddleHeightChange(p1, 3);
        p1.color = powerUp.color;
      }else{
        this.setPaddleHeightChange(p2, 3);
        p2.color = powerUp.color;
      }
    }else if(powerUp.power == POWERUP_PADDLE_SMALL){
      if(ball.xdir == DIRECTION_RIGHT){
        this.setPaddleHeightChange(p2, 0.3);
        p2.color = powerUp.color;
      }else{
        this.setPaddleHeightChange(p1, 0.3);
        p1.color = powerUp.color;
      }
    }else if(powerUp.power == POWERUP_PADDLE_SPEED_DECREASE){
      if(ball.xdir == DIRECTION_RIGHT){
        this.setPaddleSpeedChange(p2, 0.3);
        p2.color = powerUp.color;
      }else{
        this.setPaddleSpeedChange(p1, 0.3);
        p1.color = powerUp.color;
      }
    }else if(powerUp.power == POWERUP_BALL_SPEED_INCREASE){
      ball.speed *= 2;
      ball.color = powerUp.color;
    }else if(powerUp.power == POWERUP_BALL_SPEED_DECREASE){
      ball.speed *= 0.3;
      ball.color = powerUp.color;
    }else if(powerUp.power == POWERUP_TRIPPY){
      this.isTrippy = true;
    }
  }

  
  this.setPaddleHeightChange = function(paddle, h){
    paddle.h = paddle.startH * h
  }

  
  this.setPaddleSpeedChange = function(paddle, s){
    paddle.speed = paddle.startSpeed * s;
  }
  
  this.setTrippyEffects = function(){
    background(COLOR_RGB_GRAY, 1);
//    push();
//    noStroke();
//    fill(COLOR_RGB_GRAY);
//    rect(0, 0, p1.pos.x + p1.w, height);
//    rect(p2.pos.x, 0, width, height);
//    pop();
  }
  
  this.drawDottedLine = function(top, bottom, length){
    isWhite = true;
    for(var i = top; i < bottom; i += length){
      if(isWhite){
        lineColor = COLOR_RGB_WHITE;
      }else{
        lineColor = COLOR_RGB_GRAY;
      }
      push();
      stroke(lineColor);
      line(width/2, i, width/2, i + length);
      pop();
      isWhite = !isWhite;
    }
  }

  
  this.resetPowerUpEffectsTotally = function(){
    console.log("resetting power up effects");
    p1.h = p1.startH;
    p2.h = p2.startH;
    p1.speed = p1.startSpeed;
    p2.speed = p2.startSpeed;
    ball.speed = ball.startSpeed;
    p1.color = color(COLOR_RGB_WHITE);
    p2.color = color(COLOR_RGB_WHITE);
    ball.color = color(COLOR_RGB_WHITE);
    this.isTrippy = false;
    background(COLOR_RGB_GRAY);
  }
  
  this.playBackgroundMusic = function(){
    if(!drumsBackground.isPlaying()){
      drumsBackground.play();
    }
  }
}
