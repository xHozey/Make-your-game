import { level_1 } from "./levels.js";
import {
  bomberman,
  getPosImg,
} from "./bomber.js";
const lifes = document.querySelector('#lifes-id')
let currentLifes = Number(lifes.innerHTML)
const map = document.querySelector(".map");
const grids = [];

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

let pause = false

const win = () => {
  //player position in the portal and all enemies are dead
};


const playerPos = { x: 60, y: 60 };
let currentLoop = 0;
const playerFrame = [1,2,3,4]
const monsterFrame = [1,2,3]
let slowedBy = 0;
let slowFrameRate = 5;
map.append(bomberman);

let boombpos = { x: 0, y: 0 };
let dropedtheboomb = false;
const putTheBomb = () => {
  if (dropedtheboomb) return;
  dropedtheboomb = true;
  boombpos = { x: playerPos.x, y: playerPos.y };
  grids[Math.round(boombpos.y / 30)][Math.round(boombpos.x / 30)].classList.add(
    "bomb"
  );

  setTimeout(() => {
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30)
    ].classList.remove("bomb");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) + 1
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) + 1
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30)][
          Math.round(boombpos.x / 30) + 1
        ].classList.add("empty");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) - 1
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) - 1
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30)][
          Math.round(boombpos.x / 30) - 1
        ].classList.add("empty");
    grids[Math.round(boombpos.y / 30) + 1][
      Math.round(boombpos.x / 30)
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30) + 1][
      Math.round(boombpos.x / 30)
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30) + 1][
          Math.round(boombpos.x / 30)
        ].classList.add("empty");
    grids[Math.round(boombpos.y / 30) - 1][
      Math.round(boombpos.x / 30)
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30) - 1][
      Math.round(boombpos.x / 30)
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30) - 1][
          Math.round(boombpos.x / 30)
        ].classList.add("empty");
    dropedtheboomb = false;
  }, 2000);
};

const checkUpperMove = (rowBot, colBot, colTop) => {
  return (
    grids[rowBot][colBot].classList.contains("wall") ||
    grids[rowBot][colBot].classList.contains("soft-wall") ||
    grids[rowBot][colTop].classList.contains("wall") ||
    grids[rowBot][colTop].classList.contains("soft-wall")
  );
};

const checkDownMove = (rowTop, colBot, colTop) => {
  return (
    grids[rowTop][colBot].classList.contains("wall") ||
    grids[rowTop][colBot].classList.contains("soft-wall") ||
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall")
  );
};

const checkLeftMove = (rowBot, rowTop, colBot, colTop) => {
  return (
    grids[rowTop][colBot].classList.contains("wall") ||
    grids[rowTop][colBot].classList.contains("soft-wall") ||
    grids[rowBot][colBot].classList.contains("wall") ||
    grids[rowBot][colBot].classList.contains("soft-wall") ||
    grids[rowBot][colTop].classList.contains("wall") ||
    grids[rowBot][colTop].classList.contains("soft-wall") ||
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall")
  );
};

const checkRightMove = (rowBot, rowTop, colBot, colTop) => {
  return (
    grids[rowTop][colBot].classList.contains("wall") ||
    grids[rowTop][colBot].classList.contains("soft-wall") ||
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall") ||
    grids[rowBot][colTop].classList.contains("wall") ||
    grids[rowBot][colTop].classList.contains("soft-wall") ||
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall")
  );
};

let moveLeft = false;
let moveDown = false;
let moveUp = false;
let moveRight = false;
const playerSpeed = 1;

const movePlayer = (e) => {
  let key = e.key.toLowerCase();
<<<<<<< HEAD
  console.log(playerPos)
  const playerSpeed = 3;
=======
>>>>>>> origin/saliheddine
  switch (key) {
    case 'p':
      if (!pause) pause = true
      else pause = false
      break
    case "x":
      putTheBomb();
      break;
    case "arrowup":
      moveUp = true;
      break;
    case "arrowdown":
<<<<<<< HEAD
      if (
        (grids[Math.floor(playerPos.y / 30)+1][
          Math.ceil(playerPos.x / 30)
        ].classList.contains("wall") ||
          grids[Math.floor(playerPos.y / 30)+1][
            Math.ceil(playerPos.x / 30)
          ].classList.contains("soft-wall")) 
        //  playerPos.x % 30 == 0
      )
        return;
      playerPos.y += playerSpeed;
      getPosImg(downMove[currentLoop], 8);
=======
      moveDown = true;
>>>>>>> origin/saliheddine
      break;
    case "arrowleft":
      moveLeft = true;
      break;
    case "arrowright":
<<<<<<< HEAD
      if (
        (grids[Math.floor(playerPos.y / 31)+1][
          Math.floor(playerPos.x / 31) + 1
        ].classList.contains("wall") ||
          grids[Math.floor(playerPos.y / 31)+1][
            Math.floor(playerPos.x / 31) + 1
          ].classList.contains("soft-wall")) 
        // playerPos.x % 30 == 0
      )
        return;
      playerPos.x += playerSpeed;
      getPosImg(rightMove[currentLoop], 6);
=======
      moveRight = true;
>>>>>>> origin/saliheddine
      break;
  }
};

const stopPlayer = (e) => {
  let key = e.key.toLowerCase();
  switch (key) {
    case "arrowup":
      moveUp = false;
      break;
    case "arrowdown":
      moveDown = false;
      break;
    case "arrowleft":
      moveLeft = false;
      break;
    case "arrowright":
      moveRight = false;
      break;
  }
};

const randomMonsterDir = () => {
  const directions = ["left", "up", "down", "right"];
  return directions[Math.floor(directions.length * Math.random())];
};
class monster {
  constructor(x, y, id, dir) {
    this.posX = x;
    this.posY = y;
    this.id = id;
    this.dir = dir;
    this.loop = 0
    this.slow = 0
  }
}
const monsters = [];
for (let i = 0; i < 5; i++) {
  const row = Math.floor(Math.random() * level_1.length);
  const col = Math.floor(Math.random() * level_1[0].length);

  if (level_1[row][col] === 0) {
    let currentMonster = new monster(col * 30, row * 30, i, randomMonsterDir());
    monsters.push(currentMonster);
    let div = document.createElement("div");
    div.classList.add(`monster`);
    div.classList.add(`monster-${i}`);
    div.style.position = `absolute`;
    div.style.backgroundImage = `url(assets/skull.png)`;
    div.style.backgroundSize = "90px 120px";
    map.appendChild(div);
    div.style.transform = `translate(${currentMonster.posX}px, ${currentMonster.posY}px)`;
  } else {
    i--;
  }
}

const monsterSpeed = 1;

const checkMonsterMove = (enemy) => {
  let rowBot;
  let rowTop;
  let colBot;
  let colTop;
  switch (enemy.dir) {
    case "up":
      rowBot = Math.floor((enemy.posY - monsterSpeed) / 30);
      colBot = Math.floor(enemy.posX / 30);
      colTop = Math.ceil(enemy.posX / 30);
      return checkUpperMove(rowBot, colBot, colTop);
    case "down":
      rowBot = Math.floor((enemy.posY + monsterSpeed) / 30);
      rowTop = Math.ceil((enemy.posY + monsterSpeed) / 30);
      colBot = Math.floor(enemy.posX / 30);
      colTop = Math.ceil(enemy.posX / 30);
      return checkDownMove(rowTop, colBot, colTop);
    case "right":
      rowBot = Math.floor(enemy.posY / 30);
      rowTop = Math.ceil(enemy.posY / 30);
      colBot = Math.floor((enemy.posX + monsterSpeed) / 30);
      colTop = Math.ceil((enemy.posX + monsterSpeed) / 30);
      return checkRightMove(rowBot, rowTop, colBot, colTop);
    case "left":
      rowBot = Math.floor(enemy.posY / 30);
      rowTop = Math.ceil(enemy.posY / 30);
      colBot = Math.floor((enemy.posX - monsterSpeed) / 30);
      colTop = Math.ceil((enemy.posX - monsterSpeed) / 30);
      return checkLeftMove(rowBot, rowTop, colBot, colTop);
  }
};


const animateMovement = () => {

  let rowBot;
  let rowTop;
  let colTop;
  let colBot;
  if (!pause) {

  switch (true) {
    case moveDown:
      rowBot = Math.floor((playerPos.y + playerSpeed) / 30);
      rowTop = Math.ceil((playerPos.y + playerSpeed) / 30);
      colBot = Math.floor(playerPos.x / 30);
      colTop = Math.ceil(playerPos.x / 30);
      if (!checkDownMove(rowTop, colBot, colTop)) {
        getPosImg(playerFrame[currentLoop], 8, bomberman);
        playerPos.y += playerSpeed;
      }
      break;
    case moveLeft:
      rowBot = Math.floor(playerPos.y / 30);
      rowTop = Math.ceil(playerPos.y / 30);
      colBot = Math.floor((playerPos.x - playerSpeed) / 30);
      colTop = Math.ceil((playerPos.x - playerSpeed) / 30);
      if (!checkLeftMove(rowBot, rowTop, colBot, colTop)) {
        getPosImg(playerFrame[currentLoop], 7, bomberman);
        playerPos.x -= playerSpeed;
      }
      break;
    case moveUp:
      rowBot = Math.floor((playerPos.y - playerSpeed) / 30);
      colBot = Math.floor(playerPos.x / 30);
      colTop = Math.ceil(playerPos.x / 30);
      if (!checkUpperMove(rowBot, colBot, colTop)) {
        getPosImg(playerFrame[currentLoop], 5, bomberman);
        playerPos.y -= playerSpeed;
      }
      break;
    case moveRight:
      rowBot = Math.floor(playerPos.y / 30);
      rowTop = Math.ceil(playerPos.y / 30);
      colBot = Math.floor((playerPos.x + playerSpeed) / 30);
      colTop = Math.ceil((playerPos.x + playerSpeed) / 30);
      if (!checkRightMove(rowBot, rowTop, colBot, colTop)) {
        getPosImg(playerFrame[currentLoop], 6, bomberman);
        playerPos.x += playerSpeed;
      }
      break;
  }

  bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  if (slowedBy >= slowFrameRate) {
    if (currentLoop < playerFrame.length - 1) {
      currentLoop++;
    } else {
      currentLoop = 0;
    }
    slowedBy = 0;
  } else {
    slowedBy++;
  }

  monsters.forEach((enemy) => {

    if (!checkMonsterMove(enemy)) {
      let div = document.querySelector(`.monster-${enemy.id}`);
      switch (enemy.dir) {
        case "up":
          enemy.posY -= monsterSpeed
          getPosImg(monsterFrame[enemy.loop],4,div)
          break;
        case "down":
          enemy.posY += monsterSpeed
          getPosImg(monsterFrame[enemy.loop],2,div)
          break;
        case "left":
          enemy.posX -= monsterSpeed
          getPosImg(monsterFrame[enemy.loop],1,div)
          break;
        case "right":
          enemy.posX += monsterSpeed
          getPosImg(monsterFrame[enemy.loop],3,div)
          break;
      }
      if (enemy.slow >= slowFrameRate) {
        if (enemy.loop < playerFrame.length - 1) {
          enemy.loop++;
        } else {
          enemy.loop = 0;
        }
        enemy.slow = 0;
      } else {
        enemy.slow++;
      } 
      div.style.transform = `translate(${enemy.posX}px, ${enemy.posY}px)`;
      if (enemy.posX+15  >= playerPos.x && enemy.posX <= playerPos.x+15  && enemy.posY+15  >= playerPos.y && enemy.posY <= playerPos.y+15   ) {
        lifes.innerHTML = currentLifes - 1
        currentLifes--
      }
    } else {
      enemy.dir = randomMonsterDir()
    }

  });

}
  requestAnimationFrame(animateMovement);

};

requestAnimationFrame(animateMovement);

document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);
