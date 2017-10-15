function Ghost(x, y, moveType){

  this.pos = createVector(x, y);
  this.speed = 1.5;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.nextMoveTemplate = {x: 0, y: 0};
  this.nextMove = {x: 1, y: 0};
  this.neighbours = {};
  this.color;
  this.moveType = moveType;
  if(this.moveType == 1){
    this.color = color(255, 153, 0); // orange
  }else if(this.moveType == 2){
    this.color = color(255, 0, 0); //red 
  }else if(this.moveType == 3){
    this.color = color(255, 204, 204); //pink
  }else if(this.moveType == 4){
    this.color = color(0, 255, 255); //aqua
  }
  
  
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
    //console.log("setting next move");
    this.nextMove.x = _x * this.speed;
    this.nextMove.y = _y * this.speed;
    //console.log("Next move is " + this.nextMove.x + ", " + this.nextMove.y);
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

  this.move = function() {
    var randomMove = floor(random(1,5));
    if (randomMove == 1) {
      this.setNextMove(0, -1)
    } else if (randomMove == 2) {
      this.setNextMove(0, 1)
    } else if (randomMove == 3) {
      this.setNextMove(-1, 0)
    } else if (randomMove == 4) {
      this.setNextMove(1, 0)
    }
    return 0;
  }

  this.moveTowardsPacman = function(pacman) {
    if(pacman.pos.x >= this.pos.x && pacman.pos.y >= this.pos.y){
        this.setNextMove(0, 1);
      }else{
        //console.log("B")
        this.setNextMove(0, -1);
      }
//    }else{
      if(pacman.pos.y > this.pos.y){
        //console.log("C")
        this.setNextMove(-1, 0);
      }else{
        //console.log("D")
        this.setNextMove(1, 0);
      }
  //  }
    return 0;
  }
  
//  this.move = function(controlMap, pressedKeyCode) {
//    if (controlMap[pressedKeyCode] == "UP") {
//      if(!isCellWall(this.neighbours["UP"])){
//        this.xSpeed = 0;
//        this.ySpeed = -1;// * this.speed;
//       }else{
//         //console.log("can't go up");
//         //console.log(this.neighbours["UP"]);
//       }
//    } else if (controlMap[pressedKeyCode] == "DOWN") {
//      this.xSpeed = 0;
//      this.ySpeed = 1;// * this.speed;
//    } else if (controlMap[pressedKeyCode] == "LEFT") {
//      //console.log("LEFT");
//      this.ySpeed = 0;
//      this.xSpeed = -1;// * this.speed;
//    } else if (controlMap[pressedKeyCode] == "RIGHT") {
//      this.ySpeed = 0;
//      this.xSpeed = 1;// * this.speed;
//    }
//    return 0;
//  }

  
  this.swapSide = function(){
    //right side
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
  
  
  this.update = function(pacman){
    this.getNeighbours();
    if(this.moveType == 1){
      this.move();
    }else if(this.moveType == 2){
      this.moveTowardsPacman(pacman);
    }
    this.tryNextMove();
    this.checkForWalls();
    this.pos.x += this.xSpeed;
    this.pos.y += this.ySpeed;
    this.swapSide();
  }
  
  this.render = function(){
    fill(this.color);
    ellipseMode(CORNER);
    ellipse(this.pos.x, this.pos.y, scl, scl);
  }
}