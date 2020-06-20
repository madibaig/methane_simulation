function ice() {
  this.x = 400;
  this.y = 800;
  this.iceHeight = 200;
  this.collisions = 0;
  this.capacity = 2000;
  this.stop = false;
  this.display = function() {
    if(this.stop==false) {
      noStroke();
      fill(72, 165, 210);
      rectMode(CENTER);
      rect(this.x,this.y,600,this.iceHeight);
    }
  }
  this.update = function(seaHeight) {
    this.y = seaHeight + this.iceHeight/2;
    if(this.stop==false) {
      this.iceHeight = map(this.collisions,0,this.capacity,200,0);
    }
    //console.log(this.collisions);
    //console.log(this.iceHeight);
    if(this.iceHeight <= 0) {
      this.stop = true;
    }
  }
  this.end = function() {
    if(this.stop) {
        return true;
    }
  }
}
