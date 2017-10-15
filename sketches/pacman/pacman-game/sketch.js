var scl;
var boardArray = [];
var rows;
var cols;
var wallType = 0;

// html elements
var breakWallButton;
var makeWallButton;
var clearAllButton;
var resultText;

// characters
var pacman;
var ghost1;
var ghost2;

GRID = [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


function clickIsOnCanvas(){
  return mouseX >= 0 && mouseX < width
    && mouseY >= 0 && mouseY < height;
}

function generateRandomEmptyBoardPosition(){
  var pos = {x:parseInt(random(0, GRID.length-1)), y:parseInt(random(0, GRID[0].length-1))};
//  var pos = {x:parseInt(random(0, GRID[0].length-1)), y:parseInt(random(0, GRID.length-1))};
  return pos;
}


function setup() {
  createCanvas(800, 600);
  scl = 40;
  rows = height/scl;
  cols = width/scl;
  background(255);
  boardArray = GRID;
  startPos = [];
  for(var i = 0; i < 3; i++){
    var pos = generateRandomEmptyBoardPosition();
    if(i == 0){
      while(GRID[pos.x][pos.y] != 1){
        pos = generateRandomEmptyBoardPosition();
        console.log(GRID[pos.x][pos.y])
      }
      startPos.push(pos);
    }else{
      while(GRID[pos.x][pos.y] != 1 || pos == startPos[i-1]){
        pos = generateRandomEmptyBoardPosition();
      }
    startPos.push(pos);  
    }
  }
  pacman = new Pacman(startPos[0].y * scl, startPos[0].x * scl);
  ghost1 = new Ghost(startPos[1].y * scl, startPos[1].x * scl, 1);
  ghost2 = new Ghost(startPos[2].y * scl, startPos[2].x * scl, 2);
}



// Controls

var P1_CONTROL_MAP = {
  38: "UP",
  40: "DOWN",
  37: "LEFT",
  39: "RIGHT",
  13: "SHOOT"
};

function keyPressed() {
  if (Object.keys(P1_CONTROL_MAP).indexOf(String(keyCode)) > -1) {
    pacman.move(P1_CONTROL_MAP, keyCode);
  };
}

//
//function keyReleased() {
//  if (Object.keys(P1_CONTROL_MAP).indexOf(String(keyCode)) > -1) {
//    pacman.stopMove(P1_CONTROL_MAP, keyCode);
//  };
//  return 0;
//}


// board

function setBoardValuesToZero(){
  for(var row = 0; row < rows; row ++){
    for(var col = 0; col < cols; col++){
      boardArray[row][col] = 0;
    }
  }
}

function createBoard(grid2dArray){
  for(var row = 0; row < grid2dArray.length; row ++){
    for(var col = 0; col < grid2dArray.length[0]; col++){
      boardArray[row][col] = grid2dArray[row][col];
    }
  }
}


function printBoardArrayValues(){
  var rowString = "";
  for(var row = 0; row < height/scl; row ++){
    rowString += "[";
    for(var col = 0; col < width/scl; col++){
      rowString += boardArray[row][col];
      if(col != (width/scl)-1){
        rowString += ", ";
      }
    }
    rowString += "],\n";
  }
  return rowString;
}

function getBoardCellCoordinates(x, y, isFloor){
  if(isFloor){
    var cellX = floor(x / scl);
    var cellY = floor(y / scl);
  }else{
    var cellX = ceil(x / scl);
    var cellY = ceil(y / scl);
  }
  if(cellY < 0){
    cellY = GRID.length - 1;
  }
  if(cellY >= GRID.length){
    cellY = 0;
  }
  if(cellX < 0){
    cellX = GRID[cellY].length - 1;
  }
  if(cellX >= GRID[cellY].length){
    cellX = 0;
  }
  return boardArray[cellY][cellX];
}


function isCellWall(cell){
  if(cell == 0){
    return true;
  }else{
    return false;
  }
}

function mousePressed(){
  var cellX =floor(mouseX / scl);
  var cellY = floor(mouseY / scl);
  var wallType = boardArray[cellY][cellX];
  boardArray[cellY][cellX] = (wallType == 0) ? 1 : 0;
}


function draw(){
  drawBoard();
  pacman.update();
  pacman.render();
  ghost1.update();
  ghost1.render();
  ghost2.update(pacman);
  ghost2.render();
}

function drawBoard(){
  if(mouseIsPressed && clickIsOnCanvas()){

  }
  
  for(var row = 0; row < height/scl; row ++){
    for(var col = 0; col < width/scl; col++){
      if(boardArray[row][col] == 0){
        stroke(51);
        fill(255);
        rect(col*scl, row*scl, scl, scl);
      }else{
        stroke(51);
        fill(51);
        rect(col*scl, row*scl, scl, scl);
      }
    }
  }
}


function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
