export class Player {
  constructor(posX, posY, speed) {
    this.x = posX
    this.y = posY
    this.speed = speed
    this.loop = 0
    this.slowFrames = 5
    this.slow = 0
    this.frames = [1,2,3,4]
  }
  initBomberMan() {
    let div = document.createElement("div");
    div.className = "bomber-man";
    const img = new Image();
    img.src = "assets/hitler.png";
    div.style.backgroundImage = `url(${img.src})`;
    div.style.backgroundSize = "120px 240px";
    return div
  }
}

export class Monster {
  constructor(x, y, id, dir, speed) {
    this.posX = x;
    this.posY = y;
    this.id = id;
    this.dir = dir;
    this.loop = 0;
    this.slow = 0;
    this.speed = speed
    this.frames = [1,2,3]
  }
}

