import { level_1 } from "./levels.js";
import { bomberman, getPosImg } from "./bomber.js";

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

const playerPos = { x: 60, y: 60 };
let currentLoop = 0
const downMove = [1,2,3,4]
const upMove = [5,6,7,8]
const leftMove = [9,10,11,12]
const rightMove = [13,14,15,16]
let slowedBy = 0
let slowFrameRate = 5;
map.append(bomberman);
bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;

const movePlayer = (e) => {
  console.log(playerPos);
  let key = e.key.toLowerCase();
  const playerSpeed = 3;

  switch (key) {
    case "arrowup":
      if (
        (grids[Math.floor(playerPos.y / 30 - 1)][Math.floor(playerPos.x / 30)].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 30 - 1)][Math.floor(playerPos.x / 30)].classList.contains(
          "soft-wall"
        )) && playerPos.y % 30 == 0
      )
        return;
      playerPos.y -= playerSpeed;
      getPosImg(upMove[currentLoop], 5)
      break;
      case "arrowdown":
      if (
        (grids[Math.floor(playerPos.y / 30 + 1)][Math.floor(playerPos.x / 30)].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 30 + 1)][Math.floor(playerPos.x / 30)].classList.contains(
          "soft-wall"
        )) && playerPos.y % 30 == 0
      )
        return;
      playerPos.y += playerSpeed;
      getPosImg(downMove[currentLoop], 8)
      break;
    case "arrowleft":
      if (
        (grids[Math.floor(playerPos.y / 30)][Math.floor(playerPos.x / 30 - 1)].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 30)][Math.floor(playerPos.x / 30 - 1)].classList.contains(
          "soft-wall"
        )) && playerPos.x % 30 == 0
      )
        return;
      playerPos.x -= playerSpeed;
      getPosImg(leftMove[currentLoop], 7)
      break;
      case "arrowright":
      if (
        (grids[Math.floor(playerPos.y / 30)][Math.floor(playerPos.x / 30) + 1].classList.contains(
          "wall"
        ) ||
        grids[Math.floor(playerPos.y / 30)][Math.floor(playerPos.x / 30) + 1].classList.contains(
          "soft-wall"
        )) && playerPos.x % 30 == 0
      )
        return;
      playerPos.x += playerSpeed;
      getPosImg(rightMove[currentLoop], 6)
      break;
    default:
      break;
  }

};

const animateMovement = () => {
  bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  if (slowedBy >= slowFrameRate) {

    if (currentLoop < downMove.length -1) {
      currentLoop++
    } else {
      currentLoop = 0
    }
    slowedBy = 0
  } else {
    slowedBy++
  }

    requestAnimationFrame(animateMovement);
};

requestAnimationFrame(animateMovement);


document.addEventListener("keydown", movePlayer);
