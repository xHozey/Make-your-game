import { level_1, Board } from "./levels.js";
import { Player } from "./charcaters.js";
import {randomMonsterDir, getPosImg} from './helpers.js'

const lifes = document.querySelector("#lifes-id");
let currentLifes = Number(lifes.innerHTML);


const map = document.querySelector(".map");
const boardMap = new Board(map, level_1)
const grids = boardMap.initLevel()
const monsters = boardMap.initMonsters()
let pause = false;

const player = new Player(60,60, 1)
const bomberman = player.initBomberMan()
const monsterFrame = [1, 2, 3];
map.append(bomberman);

let boombpos = { x: 0, y: 0 };
let dropedtheboomb = false;
const putTheBomb = () => {
  if (dropedtheboomb) return;
  dropedtheboomb = true;
  boombpos = { x: player.x, y: player.y };
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

const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  switch (key) {
    case "p":
      if (!pause) pause = true;
      else pause = false;
      break;
    case "x":
      putTheBomb();
      break;
    case "arrowup":
      moveUp = true;
      break;
    case "arrowdown":
      moveDown = true;
      break;
    case "arrowleft":
      moveLeft = true;
      break;
    case "arrowright":
      moveRight = true;
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
      case moveDown:
        rowBot = Math.floor((player.y + player.speed) / 30);
        rowTop = Math.ceil((player.y + player.speed) / 30);
        colBot = Math.floor(player.x / 30);
        colTop = Math.ceil(player.x / 30);
        if (!checkDownMove(rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 8, bomberman);
          player.y += player.speed;
        }
        break;
      case moveLeft:
        rowBot = Math.floor(player.y / 30);
        rowTop = Math.ceil(player.y / 30);
        colBot = Math.floor((player.x - player.speed) / 30);
        colTop = Math.ceil((player.x - player.speed) / 30);
        if (!checkLeftMove(rowBot, rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 7, bomberman);
          player.x -= player.speed;
        }
        break;
      case moveUp:
        rowBot = Math.floor((player.y - player.speed) / 30);
        colBot = Math.floor(player.x / 30);
        colTop = Math.ceil(player.x / 30);
        if (!checkUpperMove(rowBot, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 5, bomberman);
          player.y -= player.speed;
        }
        break;
      case moveRight:
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
            getPosImg(monsterFrame[enemy.loop], 4, div);
            break;
          case "down":
            enemy.posY += enemy.speed;
            getPosImg(monsterFrame[enemy.loop], 2, div);
            break;
          case "left":
            enemy.posX -= enemy.speed;
            getPosImg(monsterFrame[enemy.loop], 1, div);
            break;
          case "right":
            enemy.posX += enemy.speed;
            getPosImg(monsterFrame[enemy.loop], 3, div);
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
