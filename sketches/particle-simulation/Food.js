function Food(){
  this.size = 5;
  this.colorVaryAmount = 30;
  this.x = random(0 + this.size, width - this.size);
  this.y = random(0 + this.size, height - this.size);
  this.randomColorVal = random(0 + this.colorVaryAmount, 255 - this.colorVaryAmount);
  this.c = color(this.randomColorVal, this.randomColorVal, this.randomColorVal);

  this.render = function(){
    fill(this.c);
    stroke(255);
    rect(this.x, this.y, this.size, this.size);
  }

  this.isOverlappedBy = function(p) {
    var particleLeftSide = p.x - p.r;
    var particleRightSide = p.x + p.r;
    var particleTopSide = p.y - p.r;
    var particleBottomSide = p.y + p.r;
    if(this.x > particleLeftSide && this.x + this.size < particleRightSide &&
      this.y > particleTopSide && this.y + this.size < particleBottomSide){
        return true;
    }
    return false;
  }
}