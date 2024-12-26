import { width,height } from "./main.js";

export const checkUpperMove = (grids,rowBot, colBot, colTop) => {
  
    return (
      grids[rowBot][colBot].classList.contains("wall") ||
      grids[rowBot][colBot].classList.contains("soft-wall") ||
      grids[rowBot][colTop].classList.contains("wall") ||
      grids[rowBot][colTop].classList.contains("soft-wall")
    );
  };
  
  export const checkDownMove = (grids,rowTop, colBot, colTop) => {
    return (
      grids[rowTop][colBot].classList.contains("wall") ||
      grids[rowTop][colBot].classList.contains("soft-wall") ||
      grids[rowTop][colTop].classList.contains("wall") ||
      grids[rowTop][colTop].classList.contains("soft-wall")
    );
  };
  
  export const checkLeftMove = (grids,rowBot, rowTop, colBot, colTop) => {
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
  
  export const checkRightMove = (grids,rowBot, rowTop, colBot, colTop) => {
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

  export const checkMonsterMove = (enemy, grids) => {
    switch (enemy.dir) {
      case "up":
        enemy.rowBot = Math.floor((enemy.posY - enemy.speed) / height);
        enemy.colBot = Math.floor(enemy.posX / width);
        enemy.colTop = Math.ceil(enemy.posX / width);
        return checkUpperMove(grids,enemy.rowBot, enemy.colBot, enemy.colTop);
      case "down":
        enemy.rowBot = Math.floor((enemy.posY + enemy.speed) / height);
        enemy.rowTop = Math.ceil((enemy.posY + enemy.speed) / height);
        enemy.colBot = Math.floor(enemy.posX / width);
        enemy.colTop = Math.ceil(enemy.posX / width);
        return checkDownMove(grids, enemy.rowTop, enemy.colBot, enemy.colTop);
      case "right":
        enemy.rowBot = Math.floor(enemy.posY / height);
        enemy.rowTop = Math.ceil(enemy.posY / height);
        enemy.colBot = Math.floor((enemy.posX + enemy.speed) / width);
        enemy.colTop = Math.ceil((enemy.posX + enemy.speed) / width);
        return checkRightMove(grids,enemy.rowBot, enemy.rowTop, enemy.colBot, enemy.colTop);
      case "left":
        enemy.rowBot = Math.floor(enemy.posY / height);
        enemy.rowTop = Math.ceil(enemy.posY / height);
        enemy.colBot = Math.floor((enemy.posX - enemy.speed) / width);
        enemy.colTop = Math.ceil((enemy.posX - enemy.speed) / width);
        return checkLeftMove(grids,enemy.rowBot, enemy.rowTop, enemy.colBot, enemy.colTop);
    }
  }

  export const checkIfBombed = (grids,x,y) => {
    return grids[Math.round(y/height)][Math.round(x/width)].classList.contains('explotion')
  }

  export const checkIfPortal = (grids,x,y) => {
    return grids[Math.round(y/height)][Math.round(x/width)].classList.contains('portal')
  }