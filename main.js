import { level_1, Board } from "./levels.js";
import { Player, Bomb } from "./Objects.js";
import {randomMonsterDir, getPosImg} from './helpers.js'
const size = 30
let pause = false;
const lifes = document.querySelector("#lifes-id");
const map = document.querySelector(".map");
let currentLifes = Number(lifes.innerHTML);
const boardMap = new Board(map, level_1)
const grids = boardMap.initLevel()
const player = new Player(60,60, 1, map)
const bomberman = player.initBomberMan()
const monsters = boardMap.initMonsters()
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
<<<<<<< HEAD
  console.log(playerPos)
  const playerSpeed = 3;
=======
>>>>>>> origin/saliheddine
  switch (key) {
    case "p":
      if (!pause) pause = true;
      else pause = false;
      break;
    case "x":
      bomb.putTheBomb(player.x,player.y, size)
      break;
    case "arrowup":
      player.moveUp = true;
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
      player.moveDown = true;
>>>>>>> origin/saliheddine
      break;
    case "arrowleft":
      player.moveLeft = true;
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
      rowBot = Math.floor((enemy.posY - enemy.speed) / size);
      colBot = Math.floor(enemy.posX / size);
      colTop = Math.ceil(enemy.posX / size);
      return checkUpperMove(rowBot, colBot, colTop);
    case "down":
      rowBot = Math.floor((enemy.posY + enemy.speed) / size);
      rowTop = Math.ceil((enemy.posY + enemy.speed) / size);
      colBot = Math.floor(enemy.posX / size);
      colTop = Math.ceil(enemy.posX / size);
      return checkDownMove(rowTop, colBot, colTop);
    case "right":
      rowBot = Math.floor(enemy.posY / size);
      rowTop = Math.ceil(enemy.posY / size);
      colBot = Math.floor((enemy.posX + enemy.speed) / size);
      colTop = Math.ceil((enemy.posX + enemy.speed) / size);
      return checkRightMove(rowBot, rowTop, colBot, colTop);
    case "left":
      rowBot = Math.floor(enemy.posY / size);
      rowTop = Math.ceil(enemy.posY / size);
      colBot = Math.floor((enemy.posX - enemy.speed) / size);
      colTop = Math.ceil((enemy.posX - enemy.speed) / size);
      return checkLeftMove(rowBot, rowTop, colBot, colTop);
  }
}

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
        if (!checkDownMove(rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 8, bomberman);
          player.y += player.speed;
        }
        break;
      case player.moveLeft:
        rowBot = Math.floor(player.y / size);
        rowTop = Math.ceil(player.y / size);
        colBot = Math.floor((player.x - player.speed) / size);
        colTop = Math.ceil((player.x - player.speed) / size);
        if (!checkLeftMove(rowBot, rowTop, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 7, bomberman);
          player.x -= player.speed;
        }
        break;
      case player.moveUp:
        rowBot = Math.floor((player.y - player.speed) / size);
        colBot = Math.floor(player.x / size);
        colTop = Math.ceil(player.x / size);
        if (!checkUpperMove(rowBot, colBot, colTop)) {
          getPosImg(player.frames[player.loop], 5, bomberman);
          player.y -= player.speed;
        }
        break;
      case player.moveRight:
        rowBot = Math.floor(player.y / size);
        rowTop = Math.ceil(player.y / size);
        colBot = Math.floor((player.x + player.speed) / size);
        colTop = Math.ceil((player.x + player.speed) / size);
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
