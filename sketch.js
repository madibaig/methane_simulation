var sun;
var sea;
var ice;
var mPars = [];
var longwaves = [];
var days = 0;
var shortwaves = [];
var methaneVolume;
var iceVolume;
var temp;
var runtimeH;
var runtimeM;
var runtimeS;
var startS=0;
var endTime;
var endDays;
var ended = false;
var iceMethane = false;
var prevVol = 100;
var backgroundCol = 230;
function setup() {
  createCanvas(800,800);
  sun = new sun();
  sea = new sea();
  ice = new ice();
  startS = second() + (minute()*60) + (hour()*3600);
  for (var i=0; i < 30; i++) {
    mPars.push(new methane());
  }
  var iceMethaneCheck = createCheckbox('Ice Methane', false);
  iceMethaneCheck.changed(checkChange);
}

function draw() {
  //backgroundCol = map(sun.x,-100,900,240,170);
  background(backgroundCol,backgroundCol,backgroundCol);
  sun.display();
  sun.update();
  sea.display();
  sea.update();
  days = sun.days;
  ice.display(sea.seaHeight);
  ice.update(sea.seaHeight);
  for (var i=0; i < mPars.length; i++) {
    mPars[i].move(150,sea.seaHeight);
    mPars[i].display();
    //if(mPars[i].timer > mPars[i].runTime) {
    //  mPars.splice(i,1);
    //}
  }
  push();
  strokeWeight(10);
  stroke(0,0,0);
  line(0,150,800,150);
  pop();
  longwaveSpawn();
  for(var i = 0; i < shortwaves.length; i++) {
    shortwaves[i].move();
    shortwaves[i].display();
    if(shortwaves[i].seaCollision(sea.seaHeight)) {
      ice.collisions += 3;
    }
    if(shortwaves[i].topCollision()) {
      shortwaves.splice(i,1);
    } else if(shortwaves[i].collisions >= 8) {
      shortwaves.splice(i,1);
    }
  }
  for(var i = 0; i < longwaves.length; i++) {
    longwaves[i].move();
    longwaves[i].display();
    if(longwaves[i].collision(sea.seaHeight)==true) {
      ice.collisions += 5;
      shortwaves.push(new shortwave(longwaves[i].x,sea.seaHeight,true));
      shortwaves.push(new shortwave(longwaves[i].x,sea.seaHeight,false));
      longwaves.splice(i,1);
    }
  }
  mShortCollision();
  iceVolUpdate();
  textUpdate();
}

function longwaveSpawn() {
  if(sun.x == 100 || sun.x == 200 || sun.x == 300 || sun.x == 400 || sun.x == 500 || sun.x == 600 || sun.x == 700) {
    longwaves.push(new longwave(sun.x,sun.y));
  }
}

function mShortCollision() {
  var mParVectors = [];
  var mDiameters = [];
  for(var i = 0; i < mPars.length;i++) {
    mParVectors.push(createVector(mPars[i].x,mPars[i].y));
    mDiameters.push(mPars[i].diameter);
  }
  for(var i = 0; i < shortwaves.length; i++) {
    shortwaves[i].mCollision(mParVectors,mDiameters);
  }
}

function iceVolUpdate() {
  if(ended) {
    iceVolume = 0;
  } else {
    iceVolume = Math.floor(map(ice.iceHeight,0,200,0,100));
  }
  if(iceMethane) {
    if(iceVolume < prevVol) {
      for(var i = 0; i < 1; i++) {
          mPars.push(new methane(random(50,750),750));
      }
    }
  }
  prevVol = iceVolume;
  console.log(prevVol);
}

function textUpdate() {
  push();
  fill(255, 94, 16);
  noStroke();
  runtimeS = second() + (minute()*60) + (hour()*3600)-startS;
  runtimeH = Math.floor(runtimeS/3600);
  runtimeM = Math.floor(runtimeS / 60);
  if(runtimeS >= 60) {
    runtimeS = runtimeS % 60;
  }
  text("Runtime: " + runtimeH + ":" + runtimeM + ":" + runtimeS,20,20);
  text("Ice Volume: " + iceVolume + "%",120,20);
  text("Days: " + days,230,20);
  text("Longwaves: " + longwaves.length,290,20);
  text("Shortwaves: " + shortwaves.length,380,20);
  text("Methane Particles: " + mPars.length,475,20);
  if(ice.end()) {
    textSize(20);
    fill(255,255,255);
    textAlign(CENTER);
    if(ended==false) {
      endDays = days;
      endTime = runtimeH + ":" + runtimeM + ":" + runtimeS;
      ended = true;
    }
    text("Ice melted in " + endDays + " days (" + endTime + ")",400,675);
  }
  pop();
}

function checkChange() {
  if (this.checked()) {
    iceMethane = true;
    console.log('Ice methane on');
  } else {
    iceMethane = false;
    console.log('Ice methane off');
  }
}
