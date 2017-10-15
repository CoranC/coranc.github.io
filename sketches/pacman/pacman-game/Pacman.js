function Pacman(x, y){

  this.pos = createVector(x, y);
  this.speed = 2;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.nextMoveTemplate = {x: 0, y: 0};
  this.nextMove = {x: 1, y: 0};
  this.neighbours = {};
  
  
  this.getNeighbours = function(){
    this.neighbours = {
      "UP" : getBoardCellCoordinates(this.pos.x, this.pos.y - scl, false),
      "DOWN" : getBoardCellCoordinates(this.pos.x, this.pos.y + scl, true),
      "LEFT" : getBoardCellCoordinates(this.pos.x - scl, this.pos.y, false),
      "RIGHT" : getBoardCellCoordinates(this.pos.x + scl, this.pos.y, true)
    }
  }

  this.isFullyOnPath = function(){
    return (this.pos.x % scl == 0 &&
           this.pos.y % scl == 0);
  }
  
  this.setNextMove = function(_x, _y){
    this.nextMove.x = _x * this.speed;
    this.nextMove.y = _y * this.speed;
  }
  
  this.checkForWalls = function(){
    if(this.xSpeed != 0){
      if(this.xSpeed > 0){
        if(isCellWall(this.neighbours["RIGHT"])){
          this.xSpeed = 0;
        }
      }
      if(this.xSpeed < 0){
        if(isCellWall(this.neighbours["LEFT"])){
          this.xSpeed = 0;
        }
      }
    }
    if(this.ySpeed != 0){
      if(this.ySpeed > 0){
        if(isCellWall(this.neighbours["DOWN"])){
          this.ySpeed = 0;
        }
      }
      if(this.ySpeed < 0){
        if(isCellWall(this.neighbours["UP"])){
          this.ySpeed = 0;
        }
      }
    }
  }
  
  this.tryNextMove = function(){
    if(!compare(this.nextMove, this.nextMoveTemplate)){
      if(this.isFullyOnPath()){
        if(this.nextMove.x > 0 || this.nextMove.x < 0){
           this.xSpeed = this.nextMove.x;
           this.ySpeed = 0;
           }
        if(this.nextMove.y > 0 || this.nextMove.y < 0){
           this.ySpeed = this.nextMove.y;
           this.xSpeed = 0;
         }
        this.nextMove.x = this.nextMoveTemplate.x;
        this.nextMove.y = this.nextMoveTemplate.y;
      }
    }  
  }
  
//  this.tryNextMove = function(){
//    if(!compare(this.nextMove, this.nextMoveTemplate)){
//      if(this.isFullyOnPath()){
//        if(this.nextMove.x > 0 && !isCellWall(this.neighbours["RIGHT"]) ||
//            this.nextMove.x < 0 && !isCellWall(this.neighbours["LEFT"])){
//           this.xSpeed = this.nextMove.x;
//           this.ySpeed = 0;
//           }
//          if(this.nextMove.y > 0 && !isCellWall(this.neighbours["DOWN"]) ||
//            this.nextMove.y < 0 && !isCellWall(this.neighbours["UP"])){
//           this.ySpeed = this.nextMove.y;
//           this.xSpeed = 0;
//           }
//        this.nextMove.x = this.nextMoveTemplate.x;
//        this.nextMove.y = this.nextMoveTemplate.y;
//      }
//    }  
//  }

  this.move = function(controlMap, pressedKeyCode) {
    if (controlMap[pressedKeyCode] == "UP") {
        this.setNextMove(0, -1)
    } else if (controlMap[pressedKeyCode] == "DOWN") {
      this.setNextMove(0, 1)
    } else if (controlMap[pressedKeyCode] == "LEFT") {
      console.log("LEFT");
      this.setNextMove(-1, 0)
    } else if (controlMap[pressedKeyCode] == "RIGHT") {
      this.setNextMove(1, 0)
    }
    return 0;
  }
  
//  this.move = function(controlMap, pressedKeyCode) {
//    if (controlMap[pressedKeyCode] == "UP") {
//      if(!isCellWall(this.neighbours["UP"])){
//        this.xSpeed = 0;
//        this.ySpeed = -1;// * this.speed;
//       }else{
//         console.log("can't go up");
//         console.log(this.neighbours["UP"]);
//       }
//    } else if (controlMap[pressedKeyCode] == "DOWN") {
//      this.xSpeed = 0;
//      this.ySpeed = 1;// * this.speed;
//    } else if (controlMap[pressedKeyCode] == "LEFT") {
//      console.log("LEFT");
//      this.ySpeed = 0;
//      this.xSpeed = -1;// * this.speed;
//    } else if (controlMap[pressedKeyCode] == "RIGHT") {
//      this.ySpeed = 0;
//      this.xSpeed = 1;// * this.speed;
//    }
//    return 0;
//  }

  this.stopMove = function(controlMap, pressedKeyCode) {
    if (controlMap[pressedKeyCode] == "UP" || controlMap[pressedKeyCode] == "DOWN") {
      this.ySpeed = 0;
    } else if (controlMap[pressedKeyCode] == "LEFT" || controlMap[pressedKeyCode] == "RIGHT") {
      this.xSpeed = 0;
    }
  }
  
  this.swapSide = function(){
    if(this.pos.x + (scl/2) >= width){
      this.pos.x = 0;
    }
    if(this.pos.x < 0-(scl/2)){
      this.pos.x = width - scl;
    }
    if(this.pos.y + (scl/2) >= height){
      this.pos.y = 0;
    }
    if(this.pos.y < 0-(scl/2)){
      this.pos.y = height - scl;
    }
  }
  
  
  this.update = function(){
    this.getNeighbours();
    this.tryNextMove();
    this.checkForWalls();
    this.pos.x += this.xSpeed;
    this.pos.y += this.ySpeed;
    this.swapSide();
  }
  
  this.render = function(){
    fill(255, 255, 0);
    ellipseMode(CORNER);
    ellipse(this.pos.x, this.pos.y, scl, scl);
  }
}