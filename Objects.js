export class Player {
  constructor(posX, posY, speed) {
    this.x = posX;
    this.y = posY;
    this.speed = speed;
    this.loop = 0;
    this.slowFrames = 5;
    this.slow = 0;
    this.frames = [1, 2, 3, 4];
    this.moveLeft = false;
    this.moveDown = false;
    this.moveUp = false;
    this.moveRight = false;
  }
  initBomberMan(map) {
    let div = document.createElement("div");
    div.className = "bomber-man";
    const img = new Image();
    img.src = "assets/hitler.png";
    div.style.backgroundImage = `url(${img.src})`;
    div.style.backgroundSize = "120px 240px";
    map.append(div);
    return div;
  }
}

export class Monster {
  constructor(x, y, id, dir, speed) {
    this.startX = x;
    this.startY = y;
    this.posX = x;
    this.posY = y;
    this.id = id;
    this.dir = dir;
    this.loop = 0;
    this.slow = 0;
    this.speed = speed;
    this.frames = [1, 2, 3];
  }
}

export class Bomb {
  constructor(grids) {
    this.grids = grids;
    this.droped = false;
  }

  putTheBomb(x, y, size) {
    if (this.droped) return;
    this.droped = true;
    this.grids[Math.round(y / size)][Math.round(x / size)].classList.add(
      "bomb"
    );
    let timer;
    timer = setTimeout(() => {
      this.grids[Math.round(y / size)][Math.round(x / size)].classList.remove(
        "bomb"
      );
      this.grids[Math.round(y / size)][
        Math.round(x / size) + 1
      ].classList.remove("soft-wall");
      this.grids[Math.round(y / size)][
        Math.round(x / size) + 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size)][
            Math.round(x / size) + 1
          ].classList.add("empty");
      this.grids[Math.round(y / size)][
        Math.round(x / size) - 1
      ].classList.remove("soft-wall");
      this.grids[Math.round(y / size)][
        Math.round(x / size) - 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size)][
            Math.round(x / size) - 1
          ].classList.add("empty");
      this.grids[Math.round(y / size) + 1][
        Math.round(x / size)
      ].classList.remove("soft-wall");
      this.grids[Math.round(y / size) + 1][
        Math.round(x / size)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size) + 1][
            Math.round(x / size)
          ].classList.add("empty");
      this.grids[Math.round(y / size) - 1][
        Math.round(x / size)
      ].classList.remove("soft-wall");
      this.grids[Math.round(y / size) - 1][
        Math.round(x / size)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size) - 1][
            Math.round(x / size)
          ].classList.add("empty");
      this.droped = false;
      timer = null;
    }, 2000);
    setTimeout(() => {
      this.grids[Math.round(y / size)][Math.round(x / size) + 1].classList.add(
        "explotion"
      );

      this.grids[Math.round(y / size)][Math.round(x / size) - 1].classList.add(
        "explotion"
      );

      this.grids[Math.round(y / size) + 1][Math.round(x / size)].classList.add(
        "explotion"
      );

      this.grids[Math.round(y / size) - 1][Math.round(x / size)].classList.add(
        "explotion"
      );
      this.grids[Math.round(y / size) - 1][
        Math.round(x / size)
      ].classList.remove("empty");
      this.grids[Math.round(y / size)][
        Math.round(x / size) + 1
      ].classList.remove("empty");
      this.grids[Math.round(y / size) + 1][
        Math.round(x / size)
      ].classList.remove("empty");
      this.grids[Math.round(y / size)][
        Math.round(x / size) - 1
      ].classList.remove("empty");
    }, 2000);

    setTimeout(() => {
      this.grids[Math.round(y / size) - 1][
        Math.round(x / size)
      ].classList.remove("explotion");
      this.grids[Math.round(y / size)][
        Math.round(x / size) + 1
      ].classList.remove("explotion");
      this.grids[Math.round(y / size) + 1][
        Math.round(x / size)
      ].classList.remove("explotion");
      this.grids[Math.round(y / size)][
        Math.round(x / size) - 1
      ].classList.remove("explotion");
      this.grids[Math.round(y / size)][
        Math.round(x / size) + 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size)][
            Math.round(x / size) + 1
          ].classList.add("empty");
      this.grids[Math.round(y / size)][
        Math.round(x / size) - 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size)][
            Math.round(x / size) - 1
          ].classList.add("empty");
      this.grids[Math.round(y / size) + 1][
        Math.round(x / size)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size) + 1][
            Math.round(x / size)
          ].classList.add("empty");
      this.grids[Math.round(y / size) - 1][
        Math.round(x / size)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y / size) - 1][
            Math.round(x / size)
          ].classList.add("empty");
    }, 3000);
  }
}
