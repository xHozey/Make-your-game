export let level_1;
import { Monster } from "./Objects.js";
import {randomMonsterDir} from './helpers.js'

level_1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,'x','x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,'x','x',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,'x','x',1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,'x','x',1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let portal = false;
for (let i = 0; i < 450; i++) {
  const row = Math.floor(Math.random() * level_1.length);
  const col = Math.floor(Math.random() * level_1[0].length);

  if (!portal && level_1[row][col] == 0) {
    level_1[row][col] = 3;
    portal = true;
    continue;
  }
  if (level_1[row][col] == 0) level_1[row][col] = 2;
}

export class Board {
  constructor(map, bluePrint) {
    this.map = map;
    this.bluePrint = bluePrint;
  }
  initLevel() {
    const grids = [];
    for (let i = 0; i < this.bluePrint.length; i++) {
      grids[i] = [];
      for (let j = 0; j < this.bluePrint[i].length; j++) {
        const div = document.createElement("div");
        grids[i].push(div);
        this.map.appendChild(div);
        if (this.bluePrint[i][j] == 0 || this.bluePrint[i][j] == "x") {
          div.classList.add("empty");
          continue;
        }
        if (this.bluePrint[i][j] == 1) {
          div.classList.add("wall");
          continue;
        }
        if (this.bluePrint[i][j] == 2) {
          div.classList.add("soft-wall");
          continue;
        }
        if (this.bluePrint[i][j] == 3) {
          div.classList.add("soft-wall", "portal");
          continue;
        }
      }
    }
    return grids;
  }
  initMonsters(enemiesTotal) {
    const monsters = [];
    for (let i = 0; i < enemiesTotal; i++) {
      const row = Math.floor(Math.random() * this.bluePrint.length);
      const col = Math.floor(Math.random() * this.bluePrint[0].length);

      if (this.bluePrint[row][col] === 0) {
        let currentMonster = new Monster(
          col * 30,
          row * 30,
          i,
          randomMonsterDir(),
          0.5
        );
        monsters.push(currentMonster);
        let div = document.createElement("div");
        div.classList.add(`monster`);
        div.classList.add(`monster-${i}`);
        div.style.position = `absolute`;
        div.style.backgroundImage = `url(assets/skull.png)`;
        div.style.backgroundSize = "90px 120px";
        this.map.appendChild(div);
        div.style.transform = `translate(${currentMonster.posX}px, ${currentMonster.posY}px)`;
      } else {
        i--;
      }
    }
    return monsters;
  }
}
