
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function createClockArc(angle, arcDiameter, lineSize, color){
  stroke(color);
  console.log(angle);
  arc(0, 0, arcDiameter, arcDiameter, 0, angle, OPEN);
  push();
  rotate(angle);
  line(0, 0, lineSize, 0);
  pop();
}

function draw() {
  background(51);
  let theSeconds = second();
  let secondsAngle = map(theSeconds, 0, 60, 0, 360);
  let theMinutes = minute();
  let minutesAngle = map(theMinutes, 0, 60, 0, 360);
  let theHours = hour();
  let hoursAngle = map(theHours % 12, 0, 12, 0, 360);
  
  translate(200, 200);
  rotate(-90);
  noFill();
  strokeWeight(4);

  createClockArc(hoursAngle, 200, 40, "Fuchsia");
  createClockArc(minutesAngle, 180, 60, "LawnGreen");
  strokeWeight(2);
  secondsColor = map(theSeconds, 0, 60, 100, 255)
  createClockArc(secondsAngle, 160, 80, color(secondsColor));
  strokeWeight(12);
  stroke(240);
  point(0, 0);
}