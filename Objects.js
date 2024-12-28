import { width,height } from "./main.js";

import { randomMonsterDir } from "./helpers.js";

export class Player {
  constructor(x, y, speed) {
    this.startX = x
    this.startY = y
    this.x = x;
    this.y = y;
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
    div.style.backgroundSize = `${4*width}px ${8*height}px`;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    map.append(div);
    return div;
  }
}

export class Monster {
  constructor(x, y, id, dir, speed) {
    this.startX = x;
    this.startY = y;
    this.x = x*width;
    this.y = y*height;
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
          col ,
          row ,
          i,
          randomMonsterDir(),
          Math.floor(width/14)
        );
        monsters.push(currentMonster);
        let div = document.createElement("div");
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.classList.add(`monster`);
        div.classList.add(`monster-${i}`);
        div.style.position = `absolute`;
        div.style.imageRendering = "pixelated";
        div.style.backgroundImage = `url(assets/skull.png)`;
        div.style.backgroundSize = `${3*width}px ${4*height}px`;
        map.appendChild(div);
        div.style.transform = `translate(${currentMonster.x}px, ${currentMonster.y}px)`;
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

  putTheBomb(x, y, map) {
    if (this.droped) return;
    this.droped = true;
    let bomb = document.createElement('div')
    bomb.classList.add('bomb')
    map.append(bomb)

   /* this.grids[Math.round(y / height)][Math.round(x / width)].classList.add(
      "bomb"
    );*/
    let timer;
    timer = setTimeout(() => {
      this.grids[Math.round(y/height)][Math.round(x/width)].classList.remove(
        "bomb"
      );
      this.grids[Math.round(y/height)][
        Math.round(x/width) + 1
      ].classList.remove("soft-wall");
      this.grids[Math.round(y/height)][
        Math.round(x/width) + 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height)][
            Math.round(x/width) + 1
          ].classList.add("empty");
      this.grids[Math.round(y/height)][
        Math.round(x/width) - 1
      ].classList.remove("soft-wall");
      this.grids[Math.round(y/height)][
        Math.round(x/width) - 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height)][
            Math.round(x/width) - 1
          ].classList.add("empty");
      this.grids[Math.round(y/height) + 1][
        Math.round(x/width)
      ].classList.remove("soft-wall");
      this.grids[Math.round(y/height) + 1][
        Math.round(x/width)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height) + 1][
            Math.round(x/width)
          ].classList.add("empty");
      this.grids[Math.round(y/height) - 1][
        Math.round(x/width)
      ].classList.remove("soft-wall");
      this.grids[Math.round(y/height) - 1][
        Math.round(x/width)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height) - 1][
            Math.round(x/width)
          ].classList.add("empty");
      this.droped = false;
      timer = null;
    }, 2000);
    setTimeout(() => {
      this.grids[Math.round(y/height)][Math.round(x/width) + 1].classList.add(
        "explotion"
      );

      this.grids[Math.round(y/height)][Math.round(x/width) - 1].classList.add(
        "explotion"
      );

      this.grids[Math.round(y/height) + 1][Math.round(x/width)].classList.add(
        "explotion"
      );

      this.grids[Math.round(y/height) - 1][Math.round(x/width)].classList.add(
        "explotion"
      );
      this.grids[Math.round(y/height) - 1][
        Math.round(x/width)
      ].classList.remove("empty");
      this.grids[Math.round(y/height)][
        Math.round(x/width) + 1
      ].classList.remove("empty");
      this.grids[Math.round(y/height) + 1][
        Math.round(x/width)
      ].classList.remove("empty");
      this.grids[Math.round(y/height)][
        Math.round(x/width) - 1
      ].classList.remove("empty");
    }, 2000);

    setTimeout(() => {
      this.grids[Math.round(y/height) - 1][
        Math.round(x/width)
      ].classList.remove("explotion");
      this.grids[Math.round(y/height)][
        Math.round(x/width) + 1
      ].classList.remove("explotion");
      this.grids[Math.round(y/height) + 1][
        Math.round(x/width)
      ].classList.remove("explotion");
      this.grids[Math.round(y/height)][
        Math.round(x/width) - 1
      ].classList.remove("explotion");
      this.grids[Math.round(y/height)][
        Math.round(x/width) + 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height)][
            Math.round(x/width) + 1
          ].classList.add("empty");
      this.grids[Math.round(y/height)][
        Math.round(x/width) - 1
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height)][
            Math.round(x/width) - 1
          ].classList.add("empty");
      this.grids[Math.round(y/height) + 1][
        Math.round(x/width)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height) + 1][
            Math.round(x/width)
          ].classList.add("empty");
      this.grids[Math.round(y/height) - 1][
        Math.round(x/width)
      ].classList.contains("wall")
        ? null
        : this.grids[Math.round(y/height) - 1][
            Math.round(x/width)
          ].classList.add("empty");
    }, 3000);
  }
}
