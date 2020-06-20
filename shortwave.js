function shortwave(x,y,right) {
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.stop = false;
  this.down = false;
  this.collisions = 0;
  this.heatPoints = 3;
  if(right) {
    this.right = true;
  } else {
    this.right = false;
  }
  this.v1 = createVector(this.x,this.y);
  if(this.right) {
    this.v2 = createVector(this.x + 25, this.y - 20);
  } else {
    this.v2 = createVector(this.x - 25, this.y - 20);
  }
  this.move = function() {
    if(this.stop==false) {
      if(this.down) {
        if(this.right) {
          this.v1.add(-this.speed,this.speed);
          this.v2.add(-this.speed,this.speed);
        } else {
          this.v1.add(this.speed,this.speed);
          this.v2.add(this.speed,this.speed);
        }
      } else {
        if(this.right) {
          this.v1.add(this.speed,-this.speed);
          this.v2.add(this.speed,-this.speed);
        } else {
          this.v1.add(-this.speed,-this.speed);
          this.v2.add(-this.speed,-this.speed);
        }
      }
    }
    if(this.v2.x >= 800) {
      this.right = false;
      this.tempX = this.v1.x;
      this.v1.x = 800;
      this.v1.y = this.v2.y;
      this.v2.x = this.tempX;
      this.v2.y -= 20;
    } else if(this.v2.x <= 0) {
      this.right = true;
      this.tempX = this.v1.x;
      this.v1.x = 0;
      this.v1.y = this.v2.y;
      this.v2.x = this.tempX;
      this.v2.y -= 20;
    } /**else if(this.v1.x >= 800) {
      this.right = false;
      this.down = true;
      this.tempX = this.v2.x;
      this.v2.x = 800;
      this.v2.y = this.v1.y;
      this.v1.x = this.tempX;
      this.v1.y += 20;
    } else if(this.v1.x <= 0) {
      this.right = true;
      this.down = true;
      this.tempX = this.v2.x;
      this.v2.x = 0;
      this.v2.y = this.v1.y;
      this.v1.x = this.tempX;
      this.v1.y += 20;
    } **/
  }

  this.display = function() {
    if(this.stop==false) {
      push();
      stroke(205, 87, 154);
      strokeWeight(4);
      line(this.v1.x,this.v1.y,this.v2.x,this.v2.y);
      pop();
    }
  }

  this.mCollision = function(mParVectors,mDiameters) {
    for(i = 0; i < mParVectors.length; i++) {
      if(this.v2.x >= mParVectors[i].x - mDiameters[i] && this.v2.x <= mParVectors[i].x + mDiameters[i]) {
        if(this.v2.y >= mParVectors[i].y - mDiameters[i] && this.v2.y <= mParVectors[i].y + mDiameters[i]) {
          this.chance = random(0,100);
          if(this.chance > 75) {
              this.down = true;
              this.collisions += 1;
          }
        }
      }
    }
  }

  this.topCollision = function() {
    if(this.v2.y <= 0) {
      this.stop = true;
      return true;
    } else {
      return false;
    }
  }

  this.seaCollision = function(seaHeight) {
    if(this.v2.y >= seaHeight || this.v1.y >= seaHeight) {
      this.down = false;
      return true;
    }
  }
}
