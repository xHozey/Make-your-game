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
let currentPos = { ...playerPos };
let currentLoop = 0
const downMove = [1,2,3,4]
const upMove = [5,6,7,8]
const leftMove = [9,10,11,12]
const rightMove = [13,14,15,16]
let slowedBy = 0
let slowFrameRate = 5;
map.append(bomberman);
bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
function isFloat(n) {
  return Math.floor(n) !== n;
}
let boombpos = { x:0, y:0 };
let boomb = document.createElement('div')
let dropedtheboomb = false
const PuttheBoomb = () => {
  if (dropedtheboomb) return;
  dropedtheboomb = true
  boombpos = {x: playerPos.x, y:playerPos.y}
  if (isFloat(boombpos.y/30) || isFloat(boombpos.x/30)) return  
  boomb.classList.add('boomb')

  boomb.style.transform = `translate(${boombpos.x}px, ${boombpos.y}px)`;
  map.append(boomb);
  setTimeout(() => {
    boomb.classList.remove('boomb')
    dropedtheboomb = false
    if (grids[boombpos.y/30][boombpos.x/30+1].classList.contains('soft-wall')) {
       grids[boombpos.y/30][boombpos.x/30+1].classList.remove('soft-wall')
       grids[boombpos.y/30][boombpos.x/30+1].classList.add('empty')
    }
  }, 2000);
  //right
}

const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  const playerSpeed = 3;
  switch (key) {
    case " ":
    PuttheBoomb()
      break;
    case "arrowup":
      getPosImg(upMove[currentLoop], 5)
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
      break;
      case "arrowdown":
      getPosImg(downMove[currentLoop], 8)
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
      break;
    case "arrowleft":
      getPosImg(leftMove[currentLoop], 7)
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
      break;
      case "arrowright":
      getPosImg(rightMove[currentLoop], 6)
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
      break;
    default:
      break;
  }

  requestAnimationFrame(animateMovement);
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
  if (currentPos.x !== playerPos.x && currentPos.y !== playerPos.y) {

    currentPos = { ...playerPos };
    requestAnimationFrame(animateMovement);
  }
};

document.addEventListener("keydown", movePlayer);
