import { level_1, level_2, Board } from "./levels.js";
import { Player, Bomb, Monster } from "./Objects.js";
import {
  randomMonsterDir,
  getPosImg,
  death,
  getPlayerPose,
  Displaymenu,
} from "./helpers.js";
import {
  checkDownMove,
  checkRightMove,
  checkLeftMove,
  checkUpperMove,
  checkMonsterMove,
  checkIfBombed,
  checkIfPortal,
} from "./checkers.js";
const lifes = document.getElementById("lifes-id");
const score = document.getElementById("score-id");
const enemies = document.getElementById("enemies-id");
const timer = document.getElementById("timer-id");
const usedMap = level_2;
const initWidth = Math.floor(window.innerWidth / usedMap[0].length / 1.4);
const initHeight = Math.floor(window.innerHeight / usedMap.length / 1.4);
let size = Math.min(initWidth, initHeight);
export let width = size;
export let height = size;

let currentLifes = 3;
let currentScore = 0;
let enemiesTotal = 5;
let countDown = 160;
timer.innerText = countDown;
enemies.innerText = enemiesTotal;
lifes.innerText = currentLifes;
let initPos = getPlayerPose(usedMap);
let pause = false;
let stopAlert = false;
const map = document.querySelector(".map");
const boardMap = new Board(map, usedMap);
boardMap.randomizeBricks();
const grids = boardMap.initLevel();
const player = new Player(initPos[0] * width, initPos[1] * height, 2, map);
const bomberman = player.initBomberMan(map);
let monsters = new Monster().initMonsters(enemiesTotal, usedMap, map);
const bomb = new Bomb(grids);
const portal = document.querySelector(".portal");
setInterval(() => {
  if (countDown == 0) return;
  if (!pause) {
    countDown--;
    timer.innerText = countDown;
  }
}, 1000);

const playerPos = { x: 60, y: 60 };
let flames;
map.append(bomberman);
bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  switch (key) {
    case "p":
      if (!pause) pause = true;
      else pause = false;
      Displaymenu(map);
      break;
    case "x":
      flames = bomb.putTheBomb(player.x, player.y, map);
      break;
    case "arrowup":
      player.moveUp = true;
      break;
    case "arrowdown":
      player.moveDown = true;
      break;
    case "arrowleft":
      player.moveLeft = true;
      break;
    case "arrowright":
      player.moveRight = true;
      break;
  }
};

const stopPlayer = (e) => {
  let key = e.key.toLowerCase();
  switch (key) {
    case "arrowup":
      player.moveUp = false;
      break;
    case "arrowdown":
      player.moveDown = false;
      break;
    case "arrowleft":
      player.moveLeft = false;
      break;
    case "arrowright":
      player.moveRight = false;
      break;
  }
};

const animateMovement = () => {
  let bombDiv = document.querySelector(".bomb");
  if (bombDiv) {
    if (bomb.slow >= bomb.slowFrames) {
      if (bomb.loop < bomb.frames.length - 1) {
        getPosImg(bomb.frames[bomb.loop], 1, bombDiv);
        bomb.loop++;
      } else {
        bomb.loop = 0;
      }
      bomb.slow = 0;
    } else {
      bomb.slow++;
    }
  }
  if (flames) {
    flames.forEach((flame) => {
      let flameDiv = document.querySelector(`.fire-${flame.id}`);
      if (flameDiv) {
        if (flame.slow >= flame.slowFrames) {
          if (flame.loop < flame.frames.length - 1) {
            getPosImg(flame.frames[flame.loop], 1, flameDiv);
            flame.loop++;
          } else {
            flame.loop = 0;
          }
          flame.slow = 0;
        } else {
          flame.slow++;
        }
      }
    });
  }
  if (portal.classList.contains("empty")) {
    portal.innerText = "";
    portal.classList.remove("empty");
    portal.style.backgroundImage = `url('assets/door.jpg')`;
    portal.style.backgroundSize = `${width}px ${height}px`;
  }
  if (
    enemiesTotal === 0 &&
    checkIfPortal(grids, player.x, player.y) &&
    !stopAlert
  ) {
    stopAlert = true;
    alert("You won!");
    location.reload();
  }
  if (!pause) {
    let checkObj;
    switch (true) {
      case player.moveDown:
        player.rowBot = Math.floor((player.y + player.speed) / height);
        player.rowTop = Math.ceil((player.y + player.speed) / height);
        player.colBot = Math.floor(player.x / width);
        player.colTop = Math.ceil(player.x / width);
        checkObj = checkDownMove(
          grids,
          player.rowTop,
          player.colBot,
          player.colTop,
          player
        );
        player.x = checkObj[1];
        getPosImg(player.frames[player.loop], 8, bomberman);
        if (!checkObj[0]) {
          player.y += player.speed;
        }
        break;
      case player.moveLeft:
        player.rowBot = Math.floor(player.y / height);
        player.rowTop = Math.ceil(player.y / height);
        player.colBot = Math.floor((player.x - player.speed) / width);
        player.colTop = Math.ceil((player.x - player.speed) / width);
        checkObj = checkLeftMove(
          grids,
          player.rowBot,
          player.rowTop,
          player.colBot,
          player
        );
        player.y = checkObj[1];
        getPosImg(player.frames[player.loop], 7, bomberman);
        if (!checkObj[0]) {
          player.x -= player.speed;
        }
        break;
      case player.moveUp:
        player.rowBot = Math.floor((player.y - player.speed) / height);
        player.colBot = Math.floor(player.x / width);
        player.colTop = Math.ceil(player.x / width);
        checkObj = checkUpperMove(
          grids,
          player.rowBot,
          player.colBot,
          player.colTop,
          player
        );
        player.x = checkObj[1];
        getPosImg(player.frames[player.loop], 5, bomberman);
        if (!checkObj[0]) {
          player.y -= player.speed;
        }
        break;
      case player.moveRight:
        player.rowBot = Math.floor(player.y / height);
        player.rowTop = Math.ceil(player.y / height);
        player.colBot = Math.floor((player.x + player.speed) / width);
        player.colTop = Math.ceil((player.x + player.speed) / width);

        checkObj = checkRightMove(
          grids,
          player.rowBot,
          player.rowTop,
          player.colTop,
          player
        );
        player.y = checkObj[1];
        getPosImg(player.frames[player.loop], 6, bomberman);
        if (!checkObj[0]) {
          player.x += player.speed
        }
        break;
    }

    bomberman.style.transform = `translate(${player.x}px, ${player.y}px)`;
    if (player.slow >= player.slowFrames) {
      if (player.loop < player.frames.length - 1) {
        player.loop++;
      } else {
        player.loop = 0;
      }
      player.slow = 0;
    } else {
      player.slow++;
    }

    monsters.forEach((enemy) => {
      if (!checkMonsterMove(enemy, grids)) {
        let div = document.querySelector(`.monster-${enemy.id}`);
        if (checkIfBombed(grids, enemy.x, enemy.y)) {
          map.removeChild(div);
          monsters = monsters.filter((monster) => monster.id !== enemy.id);
          currentScore += 100;
          enemiesTotal--;
          enemies.innerText = enemiesTotal;
          score.innerText = currentScore;
        }
        if (div) {
          switch (enemy.dir) {
            case "up":
              enemy.y -= enemy.speed;
              getPosImg(enemy.frames[enemy.loop], 4, div);
              break;
            case "down":
              enemy.y += enemy.speed;
              getPosImg(enemy.frames[enemy.loop], 2, div);
              break;
            case "left":
              enemy.x -= enemy.speed;
              getPosImg(enemy.frames[enemy.loop], 1, div);
              break;
            case "right":
              enemy.x += enemy.speed;
              getPosImg(enemy.frames[enemy.loop], 3, div);
              break;
          }
          if (enemy.slow >= player.slowFrames) {
            if (enemy.loop < player.frames.length - 1) {
              enemy.loop++;
            } else {
              enemy.loop = 0;
            }
            enemy.slow = 0;
          } else {
            enemy.slow++;
          }
          div.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
          if (
            enemy.x + size/2 >= player.x &&
            enemy.x <= player.x + size/2 &&
            enemy.y + size/2 >= player.y &&
            enemy.y <= player.y + size/2 &&
            !bomberman.classList.contains("immune")
          ) {
            death(player, monsters, bomberman);
            currentLifes--;
            lifes.innerHTML = currentLifes;
          }
        }
      } else {
        enemy.dir = randomMonsterDir();
      }
    });
  }
  if (
    checkIfBombed(grids, player.x, player.y) &&
    !bomberman.classList.contains("immune")
  ) {
    death(player, monsters, bomberman);
    
    currentLifes--;
    lifes.innerHTML = currentLifes;
  }
  if ((currentLifes === 0 || countDown === 0) && !stopAlert) {
    stopAlert = true;
    alert("You lose!");
    location.reload();
  }
  requestAnimationFrame(animateMovement);
};

requestAnimationFrame(animateMovement);

document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);
document.getElementById("continue").addEventListener("click", () => {
  if (!pause) pause = true;
  else {
    Displaymenu(map);
    pause = false;
  }
});

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    location.reload();
  }, 1000);
});
