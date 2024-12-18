import { level_1 } from "./levels.js";
console.log(level_1.length, "rows");
console.log(level_1[0].length, "cols");


const map = document.querySelector(".map");
const grids = [];

for (let i = 0; i < level_1.length; i++) {
  grids[i] = [];
  for (let j = 0; j < level_1[i].length; j++) {
    let div = document.createElement("div");
    map.appendChild(div);
    grids[i].push(div);
    switch (level_1[i][j]) {
      case 0:
        div.classList.add("empty");
        break;
      case 1:
        div.classList.add("wall");
        break;
      case 2:
        div.classList.add("pac-dots");
        break;
      case 3:
        div.classList.add("power-pullet");
        break;
      default:
        break;
    }
  }
}
