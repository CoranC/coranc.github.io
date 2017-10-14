// Pressing Control-R will render this sketch.

var particles = [];
var foodList = [];
var maxParticles = 3;
var maxFood = 50;
var frameIntervalNum = 120;
var moveSpeed = 2;
var speedSlider;
var speedTextDiv;
var strategicCheckbox;

function setup() {  //~this is run once.
    createCanvas(400, 400);
    speedTextDiv = createDiv("Current Speed: " + moveSpeed);
    speedSlider = createSlider(0, 10, 2, 0.25);
    speedSlider.style('width', '400px');
    strategicCheckbox = createCheckbox('Run away from Larger Particles', false);
    for(var i = 0; i < 15; i++){
      particles.push(new Particle("P" + i, moveSpeed));
    }
}

function mousePressed() {
  if(mouseY <= height){
    particles.push(new Particle("P" + particles.length, moveSpeed, mouseX, mouseY));
  }
}

function draw() {  //~This is run repeatedly.
    background(0);
    moveSpeed = speedSlider.value();
    speedTextDiv.elt.innerText = "Current Speed: " + moveSpeed;

    //~Set mousePressed to move around a particle
    //if(mousePressed){
    //  try {
    //    particles[0].x = mouseX;
    //    particles[0].y = mouseY;
    //  } catch (IndexOutOfBoundsException e) {
    //    console.log("IndexOutOfBoundsException: " + e.getMessage());
    //  }
    //}

    //~Use mousePresed to create new Particles
    //if(mousePressed){
    //  particles.push(new Particle("P" + particles.length, mouseX, mouseY));
    //}

    //~At interval of frameIntervalNum, run this
    if(frameCount % frameIntervalNum == 0){
      console.log("New food");
      var maxElementOfFood = foodList.length; //particles[i];
      if(maxElementOfFood < maxFood){
        foodList.push(new Food());
      }
    }

    //~TODO:
    //~MAKE IT GET SMALLER OTHERWISE UNTIL 10 PIXLES
    //~MAKE IT POP IF ITS TOO BIG TO SHARE ITS SPACE WITH OTHER PARTICLES
    //~HAVE BABIES WHEN TO BIG

    //~Iterate over particles and render
    for(var i = particles.length - 1; i >= 0; i--){
      particles[i].update(moveSpeed);
      particles[i].render();

      //~If particle diameter is bgiger than width or height, delete it
      if(particles[i].d > min(width, height)){
        console.log(particles[i].name + " > " + min(width, height));
        newBabyParticles = particles[i].createBabies();
        particles.splice(i, 1);
        particles = particles.concat(newBabyParticles);
        break;
      }

      // Iterate over food and remove it if eaten
      for(var foodCount = 0; foodCount < foodList.length; foodCount++){
        var foodItem = foodList[foodCount];
        foodItem.render();
        if(foodItem.isOverlappedBy(particles[i])){
          particles[i].r += foodItem.size;
          foodList.splice(foodCount, 1);
          break;
        }
      }

      for(var j = particles.length - 1; j >= 0; j--){
        if(j == i){
          continue;
        }

        /*
        //~if particle overlaps another run away fast
        if(particles[i].overlaps(particles[j])){
          particles[i].moveAwayFromParticle(particles[j]);
        }
        */

        //~if particle overlaps another, eat the overlapped particle
        if(particles[i].overlaps(particles[j])){

          if(!strategicCheckbox.checked()){
            //~Move towards particle
            particles[i].moveTowardParticle(particles[j]);
          }else{
            //~Move towards or away from particle depending on your size versus theirs
            if(particles[i].r < particles[j].r){
              particles[i].moveAwayFromParticle(particles[j]);
            }else{
              particles[i].moveTowardParticle(particles[j]);
            }
          }

          if(particles[i].fullyOverlaps(particles[j]) && particles[i].r > particles[j].r){
            particles[i].r += particles[j].r;
            console.log("Trying to remove j");
            particles.splice(j, 1);
            break;
        }
      }
    }
  }
}