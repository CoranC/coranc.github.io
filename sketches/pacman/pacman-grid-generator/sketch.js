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



function setup() {
  createCanvas(800, 600);
  scl = 40;
  rows = height/scl;
  cols = width/scl;
  
  breakWallButton = createButton("Break Wall");
  breakWallButton.mousePressed(function(){wallType=1;});
  makeWallButton = createButton("Make Wall");
  makeWallButton.mousePressed(function(){wallType=0;});
  clearAllButton = createButton("Clear All");
  clearAllButton.mousePressed(function(){setBoardValuesToZero();})
  background(255);
  startBlock = 2;
  for (var i = 0; i < rows; i++) {
    boardArray[i] = new Array(cols);
  }
  setBoardValuesToZero();
  resultText = createElement('p', '');
  resultText.elt.innerText = printBoardArrayValues();
//  resultText.position(20, 5);
}


function setBoardValuesToZero(){
  for(var row = 0; row < rows; row ++){
    for(var col = 0; col < cols; col++){
      boardArray[row][col] = 0;
    }
  }
}

function mouseReleased(){
  resultText.elt.innerText = printBoardArrayValues();
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


function changeWall(value){
  if(value == 0){
    value = 1;
  }else{
    value = 0;
  }
  return value;
}

function clickIsOnCanvas(){
  return mouseX >= 0 && mouseX < width
    && mouseY >= 0 && mouseY < height;
}

function draw(){
  if(mouseIsPressed && clickIsOnCanvas()){
    var cellX =floor(mouseX / scl);
    var cellY = floor(mouseY / scl);
    boardArray[cellY][cellX] = wallType;
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