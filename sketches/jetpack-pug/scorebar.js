class ScoreBar {
  
  constructor(){
    this.w = 30;
    this.h = 20;
    this.fuel = 255;
    this.r = 0;
    this.g = 255;
    this.maxFuel = 1000;
    this.fuelLeft = this.maxFuel;
    this.fuelChunkDivision = 5; // the amount to chunk the fuel by
    this.colorReduceSpeed = 0.25;
    this.noFuelLeft = false;
    this.position = createVector(0 + this.w, this.h);    
  }

  fillUpFuel(){
    this.noFuelLeft = false;
    this.r = 0;
    this.g = 255;
  }
  
  emptyFuel(){
    this.noFuelLeft = true;
    this.r = 255;
    this.g = 0;
  }
  
  update(){
    this.fuelLeft -= 1;
    this.changeColor(this.fuelLeft);
  }
  
  changeColor(fuelVal){
    let fuelChunk = this.maxFuel - fuelVal;
    let increaseAmount = (255 * 2) / this.fuelChunkDivision;
    if(fuelChunk % (this.maxFuel/this.fuelChunkDivision) == 0){
      if(this.r < 255){
        this.r += increaseAmount;
      }else{
        this.g -= increaseAmount;
      }
      if(this.g < 0){
        this.g = 0;
        this.noFuelLeft = true;
      }
    }
  }
  
  render(){
    fill(this.r, this.g, 100);
    rect(this.position.x, this.position.y, this.w, this.h);
  }
}