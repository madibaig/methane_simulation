function sun() {
  this.x = -100;
  this.y = 80;
  this.xspeed = 8;
  this.days = 0;
  this.display = function() {
    noStroke();
    fill(249, 178, 42);
    ellipse(this.x,this.y,100);
  }
  this.update = function() {
    if(this.x > 900) {
      this.x = -100;
      this.days += 1;
    } else {
      this.x += this.xspeed;
    }
  }
}
