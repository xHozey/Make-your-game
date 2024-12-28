import { width, height } from "./main.js";

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
    div.style.backgroundSize = `${4 * width}px ${8 * height}px`;
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
    this.x = x * width;
    this.y = y * height;
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
          col,
          row,
          i,
          randomMonsterDir(),
          1
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
        div.style.backgroundSize = `${3 * width}px ${4 * height}px`;
        map.appendChild(div);
        div.style.transform = `translate(${currentMonster.x}px, ${currentMonster.y}px)`;
      } else {
        i--;
      }
    }
    return monsters;
  }
}

export class explotion {
  constructor(x, y,map, id) {
    this.map = map
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.frames = [1,2,3,4,5]
    this.slowFrames = 5
    this.slow = 0
    this.loop = 0
    this.id = id
  }
  initExplotion(grids) {
    let currentDiv = grids[this.y][this.x]
    if (!currentDiv.classList.contains('wall')) {
      const fire = document.createElement('div')
      fire.style.backgroundImage = 'url(assets/inTheFire.png)'
      fire.style.backgroundSize = `${width*5}px ${height*2}px`
      fire.style.width = `${width}px`;
      fire.style.height = `${height}px`;
      fire.style.backgroundPosition = `${width}px ${height*2}px`
      fire.style.position = `absolute`
      this.map.appendChild(fire)
      fire.style.transform = `translate(${this.x*width}px, ${this.y*height}px)`
      currentDiv.classList.remove("soft-wall");
      currentDiv.classList.contains("wall") ? null : currentDiv.classList.add("empty");
      currentDiv.classList.add('explotion')
      fire.classList.add(`fire-${this.id}`)
      return [fire, currentDiv]
    }
  }
}

export class Bomb {
  constructor(grids) {
    this.grids = grids;
    this.droped = false;
    this.frames = [1, 2, 3]
    this.loop = 0
    this.slowFrames = 5
    this.slow = 0
  }

  putTheBomb(x, y, map) {
    if (this.droped) return;
    this.droped = true;
    let bomb = document.createElement('div')
    bomb.classList.add('bomb')
    bomb.style.backgroundImage = 'url(assets/bomb.png)'
    bomb.style.backgroundSize = `${width * 3}px ${height}px`
    bomb.style.width = `${width}px`;
    bomb.style.height = `${height}px`;
    bomb.style.backgroundPosition = `${width}px ${height}px`
    bomb.style.position = `absolute`
    map.appendChild(bomb)
    let xPos = Math.round(x / width)
    let yPos = Math.round(y / height)
    bomb.style.transform = `translate(${xPos * width}px, ${yPos * height}px)`

    let timer;
    let explotions = []
    let centerEx = new explotion(xPos, yPos,map,1)
    let rightEx = new explotion(xPos + 1, yPos,map,2)
    let leftEx =new explotion(xPos - 1, yPos,map,3)
    let downEx= new explotion(xPos, yPos + 1,map,4)
    let upEx = new explotion(xPos, yPos - 1,map,5)
    timer = setTimeout(() => {
      map.removeChild(bomb)
      this.droped = false
      explotions = [
        centerEx.initExplotion(this.grids),
        rightEx.initExplotion(this.grids),
        leftEx.initExplotion(this.grids),
        downEx.initExplotion(this.grids),
        upEx.initExplotion(this.grids),
      ]
      this.droped = false;
      timer = null;
    }, 2000);
    
    setTimeout(() => {
        explotions.forEach(element => {
          if (element != undefined) {
            map.removeChild(element[0])
            element[1].classList.remove('explotion')
          }          
        });
      }, 3500);

        return [centerEx,upEx,leftEx,rightEx,downEx]
  }
}