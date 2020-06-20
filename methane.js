function methane(x,y) {
  if(x==null || y==null) {
    this.x = random(width);
    this.y = random(height-600,height-500);
  } else {
    this.x = x;
    this.y = y;
  }
  this.diameter = random(10, 30);
  this.XSpeed = random(1.5,4);
  this.speed = random(0.5,3);
  this.time = 1;
  this.startTime = (hour() * 60) + minute();
  this.runTime = (hour() * 60) + minute() + this.time;
  this.timer = 0;

  this.move = function(topLimit,bottomLimit) {
    if(this.y <= topLimit) {
      this.y += 10;
    } else if(this.y >= bottomLimit) {
      this.y -= 10;
    } else {
      this.x += random(-this.XSpeed, this.XSpeed);
      this.y += random(-this.speed, this.speed/1.5);
    }
    this.timer = (hour() * 60) + minute();
  }

  this.display = function() {
    stroke(0,0,0);
    fill(255, 83, 83);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

}
