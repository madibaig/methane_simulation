function sea() {
  this.x = 0;
  this.y = 800;
  this.height = 250;
  this.seaHeight = this.y-this.height;
  this.display = function() {
    noStroke();
    fill(19, 38, 117);
    rectMode(CORNERS);
    rect(this.x,this.y,800,this.seaHeight);
  }
  this.update = function() {
  }
}
