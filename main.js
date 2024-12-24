import { level_1 } from "./levels.js";
import { bomberman, getPosImg } from "./bomber.js";

const map = document.querySelector(".map");
const grids = [];

let portal = false;
for (let i = 0; i < 450; i++) {
  const row = Math.floor(Math.random() * level_1.length);
  const col = Math.floor(Math.random() * level_1[0].length);
  if (level_1[row][col] == 4) {
    continue
  }
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
    if (level_1[i][j] == 0 || level_1[i][j] == "x" || level_1[i][j] == 4) {
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



let boombpos = { x: 0, y: 0 };
let dropedtheboomb = false;
const PuttheBoomb = () => {
  if (dropedtheboomb) return;
  dropedtheboomb = true;
  boombpos = { x: playerPos.x, y: playerPos.y };
  grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30)].classList.add('bomb')

  setTimeout(() => {
    grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30) + 1].classList.remove("soft-wall")
    grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30) + 1].classList.contains("wall")?null:grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30) + 1].classList.add("empty");
    grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30) - 1].classList.remove("soft-wall");
    grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30) - 1].classList.contains("wall")?null:grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30) - 1].classList.add("empty");
    grids[Math.floor(boombpos.y / 30) + 1][Math.floor(boombpos.x / 30)].classList.remove("soft-wall");
    grids[Math.floor(boombpos.y / 30) + 1][Math.floor(boombpos.x / 30)].classList.contains("wall")?null:grids[Math.floor(boombpos.y / 30) + 1][Math.floor(boombpos.x / 30)].classList.add("empty");
    grids[Math.floor(boombpos.y / 30) - 1][Math.floor(boombpos.x / 30)].classList.remove("soft-wall");
    grids[Math.floor(boombpos.y / 30) - 1][Math.floor(boombpos.x / 30)].classList.contains("wall")?null:grids[Math.floor(boombpos.y / 30) - 1][Math.floor(boombpos.x / 30)].classList.add("empty");
    grids[Math.floor(boombpos.y / 30)][Math.floor(boombpos.x / 30)].classList.remove('bomb')
    dropedtheboomb = false;
  }, 2000);
};

const playerPos = { x: 60, y: 60 };
let currentLoop = 0;
const downMove = [1, 2, 3, 4];
const upMove = [5, 6, 7, 8];
const leftMove = [9, 10, 11, 12];
const rightMove = [13, 14, 15, 16];
let slowedBy = 0;
let slowFrameRate = 5;
map.append(bomberman);
bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  const playerSpeed = 3;
  switch (key) {
    case "x":
      PuttheBoomb();
      break;
    case "arrowup":
      if (
        (grids[Math.floor(playerPos.y / 30 - 1)][
          Math.floor(playerPos.x / 30)
        ].classList.contains("wall") ||
          grids[Math.floor(playerPos.y / 30 - 1)][
            Math.floor(playerPos.x / 30)
          ].classList.contains("soft-wall")) &&
        playerPos.y % 30 == 0
      )
        return;
      playerPos.y -= playerSpeed;
      getPosImg(upMove[currentLoop], 5);
      break;
    case "arrowdown":
      if (
        (grids[Math.floor(playerPos.y / 30 + 1)][
          Math.floor(playerPos.x / 30)
        ].classList.contains("wall") ||
          grids[Math.floor(playerPos.y / 30 + 1)][
            Math.floor(playerPos.x / 30)
          ].classList.contains("soft-wall")) &&
        playerPos.y % 30 == 0
      )
        return;
      playerPos.y += playerSpeed;
      getPosImg(downMove[currentLoop], 8);
      break;
    case "arrowleft":
      if (
        (grids[Math.floor(playerPos.y / 30)][
          Math.floor(playerPos.x / 30 - 1)
        ].classList.contains("wall") ||
          grids[Math.floor(playerPos.y / 30)][
            Math.floor(playerPos.x / 30 - 1)
          ].classList.contains("soft-wall")) &&
        playerPos.x % 30 == 0
      )
        return;
      playerPos.x -= playerSpeed;
      getPosImg(leftMove[currentLoop], 7);
      break;
    case "arrowright":
      if (
        (grids[Math.floor(playerPos.y / 30)][
          Math.floor(playerPos.x / 30) + 1
        ].classList.contains("wall") ||
          grids[Math.floor(playerPos.y / 30)][
            Math.floor(playerPos.x / 30) + 1
          ].classList.contains("soft-wall")) &&
        playerPos.x % 30 == 0
      )
        return;
      playerPos.x += playerSpeed;
      getPosImg(rightMove[currentLoop], 6);
      break;
    default:
      break;
  }
};

const animateMovement = () => {
  bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  if (slowedBy >= slowFrameRate) {
    if (currentLoop < downMove.length - 1) {
      currentLoop++;
    } else {
      currentLoop = 0;
    }
    slowedBy = 0;
  } else {
    slowedBy++;
  }

  requestAnimationFrame(animateMovement);
};

requestAnimationFrame(animateMovement);

document.addEventListener("keydown", movePlayer);





class monster {
  constructor(y,x,speed) {
  this.startY = y
  this.startX = x
  this.currentindexY = y
  this.currentindexX = x
  this.speed = speed  
  }
}


const monsters = [
  new monster(3*30,15*30,100),
  new monster(150,60,150),
  new monster(150,60,80),
]

monsters.forEach(monster => {
  const directions = ['left','up','down','right']
  let mn = document.createElement('div')
  mn.classList.add('monster')  
  map.append(mn)
  let direction = "right"
  setInterval(() => {
   direction = directions[Math.floor(Math.random()*directions.length)]
  }, 3000);
  
  setInterval(() => { 
    if (direction == 'right') {
    if ((grids[Math.floor(monster.currentindexY/ 30)][Math.floor(monster.currentindexX / 30) + 1].classList.contains("wall") ||grids[Math.floor(monster.currentindexY/ 30)][Math.floor(monster.currentindexX / 30) + 1].classList.contains("soft-wall")) && monster.currentindexX % 30 == 0) {
        return;
      }
      monster.currentindexX += 1
    }
    if (direction == 'left') {
      if (
        (grids[Math.floor(monster.currentindexY/ 30)][
          Math.floor(monster.currentindexX / 30 - 1)
        ].classList.contains("wall") ||
          grids[Math.floor(monster.currentindexY/ 30)][
            Math.floor(monster.currentindexX / 30 - 1)
          ].classList.contains("soft-wall")) &&
        monster.currentindexX % 30 == 0
      ) {
        return;
      }
      monster.currentindexX -= 1
    }
    if (direction == 'up') {
      if (
        (grids[Math.floor(monster.currentindexY/ 30 - 1)][Math.floor(monster.currentindexX / 30)].classList.contains("wall") || 
        grids[Math.floor(monster.currentindexY/ 30 - 1)][Math.floor(monster.currentindexX / 30)].classList.contains("soft-wall")) &&
        monster.currentindexY% 30 == 0) {
          return;
        }
      monster.currentindexY -= 1
    }
    if (direction == 'down') {
      if (
        (grids[Math.floor(monster.currentindexY/ 30 + 1)][
          Math.floor(monster.currentindexX / 30)
        ].classList.contains("wall") ||
          grids[Math.floor(monster.currentindexY/ 30 + 1)][
            Math.floor(monster.currentindexX / 30)
          ].classList.contains("soft-wall")) &&
        monster.currentindexY% 30 == 0
      ) {
        return;
      }
      monster.currentindexY += 1
    }
    mn.style.transform = `translate(${monster.currentindexX}px, ${monster.currentindexY}px)`;
  }, monster.speed);
});