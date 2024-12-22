import { level_1 } from "./levels.js";
import { bomberman } from "./bomber.js";
const map = document.querySelector(".map");

const grids = [];
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

for (let i = 0; i < level_1.length; i++) {
  grids[i] = [];
  for (let j = 0; j < level_1[i].length; j++) {
    const div = document.createElement("div");
    grids[i].push(div);
    map.appendChild(div);
    if (level_1[i][j] == 0 || level_1[i][j] == "x") {
      div.classList.add("empty");
      continue;
    }
    if (level_1[i][j] == 1) {
      div.classList.add("wall");
      continue;
    }
    if (level_1[i][j] == 2) {
      div.classList.add("soft-wall");
      continue;
    }
    if (level_1[i][j] == 3) {
      div.classList.add("soft-wall", "portal");
      continue;
    }
  }
}

const win = () => {
  //player position in the portal and all enemies are dead
};

const lose = () => {
  //player get expolied by bomber or hited by enemy
};


const playerPos = { x: 59, y: 59 };

map.append(bomberman);
bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;

const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  const playerSpeed = 20;

  switch (key) {
    case "arrowup":
      //change the picture 
      playerPos.y -= playerSpeed;
      break;
    case "arrowdown":
      playerPos.y += playerSpeed;
      break;
    case "arrowleft":
      playerPos.x -= playerSpeed;
      break;
    case "arrowright":
      playerPos.x += playerSpeed;
      break;
    default:
      break;
  }

  requestAnimationFrame(animateMovement);
};

const animateMovement = () => {

  bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  requestAnimationFrame(animateMovement);
};

document.addEventListener("keydown", movePlayer);
