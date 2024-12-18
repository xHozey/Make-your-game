import { level_1 } from "./levels.js";

const height = 576;
const width = 448;
const map = document.querySelector(".map");
const grids = [];

// Create grid structure
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


const playerPos = { x: 14, y: 21 };  
const pacMan = document.createElement("div");
pacMan.classList.add("pac-man");
map.appendChild(pacMan);  
  pacMan.style.transform = `translate(${playerPos.x*16}px, ${playerPos.y*16}px)`


const playerMov = (e) => {

  const key = e.key.toLowerCase();


  switch (key) {
    case "w":
    case "arrowup":
      if (playerPos.y > 0) playerPos.y--;  
      break;
    case "s":
    case "arrowdown":
      if (playerPos.y < level_1.length - 1) playerPos.y++; 
      break;
    case "a":
    case "arrowleft":
      if (playerPos.x > 0) playerPos.x--;  
      break;
    case "d":
    case "arrowright":
      if (playerPos.x < level_1[0].length - 1) playerPos.x++;  
      break;
  }

  pacMan.style.transform = `translate(${playerPos.x*16}px, ${playerPos.y*16}px)`
};


document.addEventListener("keydown", playerMov);
