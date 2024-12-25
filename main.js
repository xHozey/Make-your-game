import { level_1, Board } from "./levels.js";
import { Player, Bomb } from "./Objects.js";
import {randomMonsterDir, getPosImg} from './helpers.js'
let pause = false;
const lifes = document.querySelector("#lifes-id");
let currentLifes = Number(lifes.innerHTML);



const map = document.querySelector(".map");
const boardMap = new Board(map, level_1)
const grids = boardMap.initLevel()
const monsters = boardMap.initMonsters()

const player = new Player(60,60, 1)
const bomberman = player.initBomberMan()
map.append(bomberman);
const bomb = new Bomb(grids)

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


const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  switch (key) {
    case "p":
      if (!pause) pause = true;
      else pause = false;
      break;
    case "x":
      bomb.putTheBomb(player.x,player.y)
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

const checkMonsterMove = (enemy) => {
  let rowBot;
  let rowTop;
  let colBot;
  let colTop;
  switch (enemy.dir) {
    case "up":
      rowBot = Math.floor((enemy.posY - enemy.speed) / 30);
      colBot = Math.floor(enemy.posX / 30);
      colTop = Math.ceil(enemy.posX / 30);
      return checkUpperMove(rowBot, colBot, colTop);
    case "down":
      rowBot = Math.floor((enemy.posY + enemy.speed) / 30);
      rowTop = Math.ceil((enemy.posY + enemy.speed) / 30);
      colBot = Math.floor(enemy.posX / 30);
      colTop = Math.ceil(enemy.posX / 30);
      return checkDownMove(rowTop, colBot, colTop);
    case "right":
      rowBot = Math.floor(enemy.posY / 30);
      rowTop = Math.ceil(enemy.posY / 30);
      colBot = Math.floor((enemy.posX + enemy.speed) / 30);
      colTop = Math.ceil((enemy.posX + enemy.speed) / 30);
      return checkRightMove(rowBot, rowTop, colBot, colTop);
    case "left":
      rowBot = Math.floor(enemy.posY / 30);
      rowTop = Math.ceil(enemy.posY / 30);
      colBot = Math.floor((enemy.posX - enemy.speed) / 30);
      colTop = Math.ceil((enemy.posX - enemy.speed) / 30);
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
      case player.moveDown:
        rowBot = Math.floor((player.y + player.speed) / 30);
        rowTop = Math.ceil((player.y + player.speed) / 30);
        colBot = Math.floor(player.x / 30);
        colTop = Math.ceil(player.x / 30);
        if (!checkDownMove(rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 8, bomberman);
          player.y += player.speed;
        }
        break;
      case player.moveLeft:
        rowBot = Math.floor(player.y / 30);
        rowTop = Math.ceil(player.y / 30);
        colBot = Math.floor((player.x - player.speed) / 30);
        colTop = Math.ceil((player.x - player.speed) / 30);
        if (!checkLeftMove(rowBot, rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 7, bomberman);
          player.x -= player.speed;
        }
        break;
      case player.moveUp:
        rowBot = Math.floor((player.y - player.speed) / 30);
        colBot = Math.floor(player.x / 30);
        colTop = Math.ceil(player.x / 30);
        if (!checkUpperMove(rowBot, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 5, bomberman);
          player.y -= player.speed;
        }
        break;
      case player.moveRight:
        rowBot = Math.floor(player.y / 30);
        rowTop = Math.ceil(player.y / 30);
        colBot = Math.floor((player.x + player.speed) / 30);
        colTop = Math.ceil((player.x + player.speed) / 30);
        if (!checkRightMove(rowBot, rowTop, colBot, colTop)) {
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
      if (!checkMonsterMove(enemy)) {
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
          lifes.innerHTML = currentLifes - 1;
          currentLifes--;
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
