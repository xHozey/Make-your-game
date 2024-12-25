import { level_1, Board } from "./levels.js";
import { Player, Bomb } from "./Objects.js";
import { randomMonsterDir, getPosImg } from "./helpers.js";
import {
  checkDownMove,
  checkRightMove,
  checkLeftMove,
  checkUpperMove,
  checkMonsterMove,
} from "./checkers.js";
const size = 30;
let pause = false;
const lifes = document.querySelector("#lifes-id");
const map = document.querySelector(".map");
let currentLifes = Number(lifes.innerHTML);
const boardMap = new Board(map, level_1);
const grids = boardMap.initLevel();
const player = new Player(60, 60, 1, map);
const bomberman = player.initBomberMan(map);
const monsters = boardMap.initMonsters();
const bomb = new Bomb(grids);

const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  switch (key) {
    case "p":
      if (!pause) pause = true;
      else pause = false;
      break;
    case "x":
      bomb.putTheBomb(player.x, player.y, size);
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
  let rowBot;
  let rowTop;
  let colTop;
  let colBot;
  if (!pause) {
    switch (true) {
      case player.moveDown:
        rowBot = Math.floor((player.y + player.speed) / size);
        rowTop = Math.ceil((player.y + player.speed) / size);
        colBot = Math.floor(player.x / size);
        colTop = Math.ceil(player.x / size);
        if (!checkDownMove(grids, rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 8, bomberman);
          player.y += player.speed;
        }
        break;
      case player.moveLeft:
        rowBot = Math.floor(player.y / size);
        rowTop = Math.ceil(player.y / size);
        colBot = Math.floor((player.x - player.speed) / size);
        colTop = Math.ceil((player.x - player.speed) / size);
        if (!checkLeftMove(grids, rowBot, rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 7, bomberman);
          player.x -= player.speed;
        }
        break;
      case player.moveUp:
        rowBot = Math.floor((player.y - player.speed) / size);
        colBot = Math.floor(player.x / size);
        colTop = Math.ceil(player.x / size);
        if (!checkUpperMove(grids, rowBot, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 5, bomberman);
          player.y -= player.speed;
        }
        break;
      case player.moveRight:
        rowBot = Math.floor(player.y / size);
        rowTop = Math.ceil(player.y / size);
        colBot = Math.floor((player.x + player.speed) / size);
        colTop = Math.ceil((player.x + player.speed) / size);
        if (!checkRightMove(grids, rowBot, rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 6, bomberman);
          player.x += player.speed;
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
        switch (enemy.dir) {
          case "up":
            enemy.posY -= enemy.speed;
            getPosImg(enemy.frames[enemy.loop], 4, div);
            break;
          case "down":
            enemy.posY += enemy.speed;
            getPosImg(enemy.frames[enemy.loop], 2, div);
            break;
          case "left":
            enemy.posX -= enemy.speed;
            getPosImg(enemy.frames[enemy.loop], 1, div);
            break;
          case "right":
            enemy.posX += enemy.speed;
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
        div.style.transform = `translate(${enemy.posX}px, ${enemy.posY}px)`;
        if (
          enemy.posX + 15 >= player.x &&
          enemy.posX <= player.x + 15 &&
          enemy.posY + 15 >= player.y &&
          enemy.posY <= player.y + 15
        ) {
          player.x = 60;
          player.y = 60;
          monsters.forEach(mn => {
            mn.posX = mn.startX
            mn.posY = mn.startY
          })
          currentLifes--;
          if (currentLifes === 0) {
            alert('You lose!')
            location.reload();
          }
          lifes.innerHTML = currentLifes
        }

      } else {
        enemy.dir = randomMonsterDir();
      }
    });
  }
  requestAnimationFrame(animateMovement);
};

requestAnimationFrame(animateMovement);

document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);
