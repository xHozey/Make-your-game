import { Size } from "./main.js";

import { randomMonsterDir } from "./helpers.js";

export class Player {
  constructor(posX, posY, speed) {
    this.startX = posX
    this.startY = posY
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
    this.rowBot = 0
    this.rowTop = 0
    this.colBot = 0
    this.colTop = 0
  }
  initBomberMan(map) {
    let div = document.createElement("div");
    div.className = "bomber-man";
    const img = new Image();
    img.src = "assets/hitler.png";
    div.style.backgroundImage = `url(${img.src})`;
    div.style.backgroundSize = `${4*Size}px ${8*Size}px`;
    div.style.width = `${Size}px`;
    div.style.height = `${Size}px`;
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
    this.rowBot = 0
    this.rowTop = 0
    this.colBot = 0
    this.colTop = 0
  }
  initMonsters(enemiesTotal, bluePrint, map) {
    const monsters = [];
    for (let i = 0; i < enemiesTotal; i++) {
      const row = Math.floor(Math.random() * bluePrint.length);
      const col = Math.floor(Math.random() * bluePrint[0].length);

      if (bluePrint[row][col] === 0) {
        let currentMonster = new Monster(
          col * Size,
          row * Size,
          i,
          randomMonsterDir(),
          0.5
        );
        monsters.push(currentMonster);
        let div = document.createElement("div");
        div.style.width = `${Size}px`;
        div.style.height = `${Size}px`;
        div.classList.add(`monster`);
        div.classList.add(`monster-${i}`);
        div.style.position = `absolute`;
        div.style.imageRendering = "pixelated";
        div.style.backgroundImage = `url(assets/skull.png)`;
        div.style.backgroundSize = `${3*Size}px ${4*Size}px`;
        map.appendChild(div);
        div.style.transform = `translate(${currentMonster.posX}px, ${currentMonster.posY}px)`;
      } else {
        i--;
      }
    }
    return monsters;
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
