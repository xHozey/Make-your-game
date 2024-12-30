export let level_2;
import { width,height } from "./main.js";

level_2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 'x', 'x', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 'x', 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 'x', 'x', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export class Board {
  constructor(map, bluePrint) {
    this.map = map;
    this.bluePrint = bluePrint;
  }
  randomizeBricks() {
    let portal = false;
    for (let i = 0; i < (this.bluePrint.length*this.bluePrint[0].length)/2; i++) {
      const row = Math.floor(Math.random() * this.bluePrint.length);
      const col = Math.floor(Math.random() * this.bluePrint[0].length);

      if (!portal && this.bluePrint[row][col] == 0) {
        this.bluePrint[row][col] = 3;
        portal = true;
        continue;
      }
      if (this.bluePrint[row][col] == 0) this.bluePrint[row][col] = 2;
    }
  }
  initLevel() {
    this.map.style.width = `${this.bluePrint[0].length * width}px`;
    this.map.style.height = `${this.bluePrint.length * height}px`;
    const grids = [];
    for (let i = 0; i < this.bluePrint.length; i++) {
      grids[i] = [];
      for (let j = 0; j < this.bluePrint[i].length; j++) {
        const div = document.createElement("div");
        div.style.imageRendering = "pixelated";
        grids[i].push(div);
        this.map.appendChild(div);
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
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

}
