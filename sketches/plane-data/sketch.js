let skyUrl = "https://static.younoodle.com/static/wordpress/one/img/cloud_bg-25.png";
let planeUrl = "http://www.downloadclipart.net/medium/13228-airplane-clip-art.png"
var skyImg;
let planeImg;

let countOfDataShifts = 0;
let sky;
let plane;
let yearObj;
let data = [{year: 1975, passengers: 421000000},
            {year: 1985, passengers: 783198104},
            {year: 1995, passengers: 1303000000},
            {year: 2005, passengers: 1970000000},
            {year: 2015, passengers: 3464000000}];
let dataObj = {};

function preload(){
  skyImg = loadImage("assets/sky.png");
  planeImg = loadImage("assets/plane.png");
}


function setup() {
  createCanvas(800, 400);
  dataObj = {min:Infinity, max:-Infinity};
  data.forEach((obj)=>{
    if(obj.passengers < dataObj.min){
      dataObj.min = obj.passengers;
    }
    if(obj.passengers > dataObj.max){
      dataObj.max = obj.passengers;
    }
  })
  
  angleMode(DEGREES);
  d1 = data.shift();
  sky = new Sky(0, 0, skyImg.width, skyImg.height, skyImg);
  plane = new Plane(20, height - planeImg.height, planeImg.width/2, planeImg.height/2, planeImg, d1.passengers);
  yearObj = new YearObj(width - 50, 50, 75, d1.year);
}

function draw() {
  background(220);
  sky.update();
  sky.render();
  plane.hover();
  plane.render();
  yearObj.render();
}

class YearObj {
  constructor(x, y, r, year){
    this.x = x;
    this.y = y;
    this.r = r;
    this.year = year;
  }
  
  setYear(year){
    this.year = year;
  }
  
  render(){
    push();
    ellipseMode(CENTER);
    ellipse(this.x, this.y,  this.r, this.r);
    textSize(20);
    fill(255);
    text(this.year, this.x-22, this.y+7);
    fill(0, 102, 153);
    pop();
  }
}

class Plane {
  constructor(x, y, w, h, planeImg, minPassengers) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hoverSpeed = 0.08;
    this.img = planeImg;
    this.moveUp = true;
    this.isClimbing = false;
    this.numericVal = minPassengers;
    this.currentVal = minPassengers;
    this.text = "";
  }

  render() {
    if(this.isClimbing){
    	push();
      translate(this.w, this.h)
      rotate(-45)
      pop()
    }
    image(this.img, this.x, this.y, this.w, this.h);
    this.updateText()
    textSize(32);
    text(this.text, this.x + this.w + 20, this.y + this.h/2 + 10);
    fill(0, 102, 153);
  }

  climb(xVal, yVal) {
    console.log(yVal);
    this.startX = xVal;
    this.startY = yVal;
    this.isClimbing = true;
  }
  
  updateNumericVal(val){
  	this.numericVal = val;
  }

  updateText() {
    if(this.isClimbing){
    	return;
    }
    this.text = formatLargeNum(parseInt(this.numericVal));
  }

  hover() {
    if (this.isClimbing){
      if(this.y > this.startY) {
        this.y -= this.hoverSpeed * 12;
        this.x += this.hoverSpeed * 5;
      }
      if(this.x < this.startX){
        this.x += this.hoverSpeed * 15;
      }
      if(this.x < this.startX || this.y > this.startY){
      return
      }else{
        this.isClimbing = false;
      }
    }
    let hoverAmt = 6;
    if (this.moveUp) {
      this.y -= this.hoverSpeed;
    } else {
      this.y += this.hoverSpeed;
    }
    if (this.y <= this.startY - hoverAmt) {
      this.moveUp = !this.moveUp;
    } else if (this.y >= this.startY + hoverAmt) {
      this.moveUp = !this.moveUp;
    }
  }
}

class Sky {

  constructor(x, y, w, h, skyImg) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.currentImg = skyImg;
    this.nextImg = skyImg;
  }

  render() {
    image(this.currentImg, this.x, this.y);
    image(this.nextImg, this.x + this.w-1, this.y);
  }


  update() {
    if (this.x <= (-this.w)) {
      var temp = this.currentImg;
      this.currentImg = this.nextImg;
      this.nextImg = temp;
      this.x = 0
    }
    this.x -= 1;
  }
}

function formatLargeNum(num){
  str = "" + num + "";
  if(str.length >= 10){
    str = str.substr(0, 1) + "." + str.substr(1, 2) + "b";
  }else if(str.length >= 7){
    str = str.substr(0, 1) + "." + str.substr(1, 2) + "m";
  }
  return str;
}

function mousePressed() {
  if (data.length > 0) {
    let obj = data.shift();
    countOfDataShifts++;
    console.log(obj.min);
    let xPixelClimb = map(countOfDataShifts, 1, 4, 0, width/2);
    let yPixelClimb = map(obj.passengers, dataObj.min, dataObj.max, height-20, 20);      
    plane.updateNumericVal(obj.passengers);
    plane.climb(xPixelClimb, yPixelClimb);
    yearObj.setYear(obj.year)
  }
}