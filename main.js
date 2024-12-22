import { level_1 } from "./levels.js";
const map = document.querySelector(".map");
console.log(level_1.length, level_1[0].length);

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

let bomberman = document.createElement("div");
bomberman.classList.add("bomber-man");
const playerPos = { x: 32, y: 32 };
let currentPos = { ...playerPos };

bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
map.appendChild(bomberman);

const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  const playerSpeed = 16;
  switch (key) {
    case "arrowup":
      if (
        grids[Math.floor(playerPos.y / 16 - 1)][Math.floor(playerPos.x / 16)].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 16 - 1)][Math.floor(playerPos.x / 16)].classList.contains(
          "soft-wall"
        )
      )
        return;
      playerPos.y -= playerSpeed;
      break;
    case "arrowdown":
      if (
        grids[Math.floor(playerPos.y / 16 + 1)][Math.floor(playerPos.x / 16)].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 16 + 1)][Math.floor(playerPos.x / 16)].classList.contains(
          "soft-wall"
        )
      )
        return;
      playerPos.y += playerSpeed;
      break;
    case "arrowleft":
      if (
        grids[Math.floor(playerPos.y / 16)][Math.floor(playerPos.x / 16 - 1)].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 16)][Math.floor(playerPos.x / 16 - 1)].classList.contains(
          "soft-wall"
        )
      )
        return;
      playerPos.x -= playerSpeed;
      break;
    case "arrowright":
      if (
        grids[Math.floor(playerPos.y / 16)][Math.floor(playerPos.x / 16 + 1)].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 16)][Math.floor(playerPos.x / 16 + 1)].classList.contains(
          "soft-wall"
        )
      )
        return;
      playerPos.x += playerSpeed;
      break;
    default:
      break;
  }

  requestAnimationFrame(animateMovement);
};

const animateMovement = () => {
  bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  if (playerPos.x != currentPos.x || playerPos.y != currentPos.y) {
    currentPos = { ...playerPos };
    requestAnimationFrame(animateMovement);
  }
};

document.addEventListener("keydown", movePlayer);
