let skyscraperList;
let cloudList;
let fuelList;
let plane;
let forces;
let scoreBar;
let levelSpeed;
let pugOff;
let pugOn;
let pugScared;
let boneImg;
let cloudImage;
let cloudRandomFrame;
let nextSpeedIncreaseFrame;
let textsizeNum = 26;
let gameOverText = "";
let gameIsOver;

function setup(){
  createCanvas(640, 360);
  //clouds = new Clouds(width);
  let imgW = 110 * 0.6; 
  let imgH = 92 * 0.6;
  gameIsOver = false
  pugOff = loadImage("assets/JetpackTuckerSmall_ThrustOff.png");
  pugOn = loadImage("assets/JetpackTuckerSmall_ThrustOn.png");
  pugScared = loadImage("assets/JetpackTuckerSmall_Scared.png");
  boneImg = loadImage("assets/bone.png");
  pugOff.resize(imgW, imgH);
  pugOn.resize(imgW, imgH);
  pugScared.resize(imgW, imgH);
  plane = new Plane(100, 100, 20, pugOff.width, pugOff.height);
  cloudImage = loadImage("assets/cloud.png");
  levelSpeed = 2;
  skyscraperList = [new Skyscraper(levelSpeed)];
  cloudList = [new Clouds(levelSpeed)];
  fuelList = [new Fuel(levelSpeed)];
  forces = new Forces();
  scoreBar = new ScoreBar();
}

function draw(){
  
  // ADD IN ROCKETS THAT TILT AS HE GOES FASTER!
  background(0, 153, 255);
  
  if(frameCount % 200 == 0){
    levelSpeed += 0.2;
  }
  
  console.log("FRAME COUNT " + frameCount);
  console.log("CLOUD FRAME COUNT " + cloudRandomFrame);
  
  //generate clouds
  if(cloudList.length == 0){
    cloudRandomFrame = parseInt(random(frameCount , frameCount + 100));
    if(frameCount == cloudRandomFrame){
      cloudList.push(new Clouds(levelSpeed));
    }
  }
  
    
  for(let i = cloudList.length - 1; i >= 0; i--){
    cloud = cloudList[i];
    cloud.update(levelSpeed);
    cloud.render(cloudImage);
    if(cloud.isOffScreen()){
      cloudList.splice(i, 1);
    }
  }
    
  //generate fuel
  if(fuelList.length == 0){
    console.log("adding new fuel");
    fuelList.push(new Fuel(levelSpeed));
  }
  

  for(let j = fuelList.length - 1; j >= 0; j--){
    let f = fuelList[j];
    console.log("about to update fuel");
    f.update(levelSpeed);
    f.render(boneImg);
    if(plane.hitFuel(f)){
      scoreBar.fillUpFuel();
      fuelList.splice(j, 1);
    }
    if(f.isOffScreen()){
      fuelList.splice(j, 1);
    }
  }
  
  // generate skyscrapers
  if(skyscraperList.length == 0){
    console.log("Adding new skyscraper");
    skyscraperList.push(new Skyscraper(levelSpeed));
  }

  
  for(let k = skyscraperList.length - 1; k >= 0; k--){
    let skyscraper = skyscraperList[k];
    skyscraper.update(levelSpeed);
    skyscraper.render();
    if(plane.hitSkyscraper(skyscraper)){
      console.log("HIT");
      let oppositeAcceleration = plane.acceleration.copy();
      oppositeAcceleration.x = (oppositeAcceleration.x * -1);
      plane.position.x = skyscraper.position.x - (plane.w/2);
      if(plane.isOffScreen() && !gameIsOver){
        scoreBar.emptyFuel();
        callGameIsOver();
      }
      //plane.isHit = true;
    }
    if(skyscraper.isOffScreen()){
      skyscraperList.splice(k, 1);
    }
  }
  
  
  // move plane
  if(!plane.isHit){
    plane.applyForce(forces.gravity);
    plane.update();
    if(mouseIsPressed){
      if(scoreBar.noFuelLeft){
        plane.render(pugScared);
      }else{
        plane.thrust();
        plane.render(pugOn);
      }
    }else{
      plane.render(pugOff);
    }
  }
  
  // update Scorebar
  scoreBar.update();
  scoreBar.render();
  
  if(gameIsOver){
    push()
    fill("white");
    text(gameOverText, width/2 - (gameOverText.length/2 * textsizeNum), height/2);
    pop()
  }
  
}

function callGameIsOver(){
  gameIsOver = true;
  gameOverText = "Game Over - Time: " + parseInt(frameCount / frameRate());
  textSize(textsizeNum);
  textFont("Georgia");
  text(gameOverText, width/2 - (gameOverText.length/2 * textsizeNum),
    height/2);
}
