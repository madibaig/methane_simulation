function longwave(x,y) {
  this.x = x;
  this.y = y;
  this.x2 = x;
  this.y2 = y + 40;
  this.speed = 0.5;

  this.move = function() {
    this.y += 5;
    this.y2 += 5;
  }

  this.display = function() {
    push();
    stroke(255,0,0);
    strokeWeight(6);
    line(this.x,this.y,this.x2,this.y2);
    pop();
  }
  this.collision = function(seaHeight) {
    if(this.y2 >= seaHeight) {
      return true;
      console.log('collision');
    } else {
      return false;
    }
  }
}
