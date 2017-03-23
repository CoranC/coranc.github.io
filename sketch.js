// ENUMS
//   DIRECTIONS
var DIRECTION_RIGHT = 1;
var DIRECTION_LEFT = -1;
var DIRECTION_UP = -1;
var DIRECTION_DOWN = 1;

//   CONTROLS
var KEY_W = 87;
var KEY_S = 83;

//   POWERUPS
var POWERUP_PADDLE_BIG = "PaddleBig";
var POWERUP_PADDLE_SMALL = "PaddleSmall";
var POWERUP_PADDLE_SPEED_DECREASE = "PaddleSpeedDecrease";
var POWERUP_BALL_SPEED_INCREASE = "BallSpeedIncrease";
var POWERUP_BALL_SPEED_DECREASE = "BallSpeedDecrease";
var POWERUP_TRIPPY = "Trippy";

//   COLORS
var COLOR_HEX_GREEN = "#00cc00"
var COLOR_HEX_PINK = "#cc33ff"
var COLOR_HEX_TAN = "#bf8040";
var COLOR_HEX_RED = "#ff3300";
var COLOR_HEX_YELLOW = "#ffff00";
var COLOR_HEX_AQUA = "#00ffff";
var COLOR_RGB_WHITE = 255;
var COLOR_RGB_GRAY = 51;
var ALPHA_20_PERCENT = 0.2;

// TEXT
COUNTDOWN_NUMBER_SIZE = 56;
CONTROL_KEYS_SIZE = 32;

//    GLOBALS
var FRAMERATE = 60;
var SECONDS_60 = 60;
var game, p1, p2, ball;
var arcadeFont;
var paddleLeftHitSound, paddleRightHitSound, bottomSideHitSound, topSideHitSound, drumsBackground;


function preload(){
  arcadeFont = loadFont("./fonts/ARCADECLASSIC.TTF");
  paddleLeftHitSound = loadSound('music/leftBounce.mp3');
  paddleRightHitSound = loadSound('music/rightBounce.mp3');
  bottomSideHitSound = loadSound('music/bottomBounce.mp3');
  topSideHitSound = loadSound('music/topBounce.mp3');
  drumsBackground = loadSound('music/drums_short4.mp3');
}

function setup() {
  createCanvas(800, 400);
  textFont(arcadeFont);
  p1 = new Paddle(20, (height/2) - 15, "L");
  p2 = new Paddle(width - 20 - 10, (height/2) - 15, "R");
  ball = new Ball();
  game = new Game(p1, p2, ball);
  background(COLOR_RGB_GRAY);
  p5.prototype.keyPressed = game.keyPressed;
  p5.prototype.keyReleased = game.keyReleased;
}

function mousePressed(){
  game.checkMouseClicks(mouseX, mouseY);
}


function draw() {
  // Sets Trippy Background when activated
  if(game.isTrippy){
    game.setTrippyEffects()
  }else{
    background(COLOR_RGB_GRAY);
  }
  
  // displays title screen until start button is clicked
  if(!game.isGameStarted){
    game.displayTitle();
    return;
  }
  
  // starts countdown timer if framerate is less than specified amount of seconds
  if(!game.isCountdownComplete){
    isCountdown = game.countdownStart(3);
    if(isCountdown){
      return;
    }
  }
  
  game.playBackgroundMusic();
  
  game.drawDottedLine(0, height, 10);
  
  if(game.isOnePlayerMode){
    p1.moveAI();
  }
  
  // sets up powerup data
  game.setPowerUpRandomTimes();
  
  // displays ball
  ball.show();
  if(ball.isOutOfBounds()){
    game.resetPowerUpEffectsTotally();
    game.updateScores();
  }
  
  // displays scores
  game.displayScores();
  
  // renders and updates paddles
  p1.hitBall(ball);
  p1.update(ball);
  p1.show();
  p2.update(ball);
  p2.show();
}
