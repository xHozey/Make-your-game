import { Size } from "./main.js";

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
        enemy.rowBot = Math.floor((enemy.posY - enemy.speed) / Size);
        enemy.colBot = Math.floor(enemy.posX / Size);
        enemy.colTop = Math.ceil(enemy.posX / Size);
        return checkUpperMove(grids,enemy.rowBot, enemy.colBot, enemy.colTop);
      case "down":
        enemy.rowBot = Math.floor((enemy.posY + enemy.speed) / Size);
        enemy.rowTop = Math.ceil((enemy.posY + enemy.speed) / Size);
        enemy.colBot = Math.floor(enemy.posX / Size);
        enemy.colTop = Math.ceil(enemy.posX / Size);
        return checkDownMove(grids, enemy.rowTop, enemy.colBot, enemy.colTop);
      case "right":
        enemy.rowBot = Math.floor(enemy.posY / Size);
        enemy.rowTop = Math.ceil(enemy.posY / Size);
        enemy.colBot = Math.floor((enemy.posX + enemy.speed) / Size);
        enemy.colTop = Math.ceil((enemy.posX + enemy.speed) / Size);
        return checkRightMove(grids,enemy.rowBot, enemy.rowTop, enemy.colBot, enemy.colTop);
      case "left":
        enemy.rowBot = Math.floor(enemy.posY / Size);
        enemy.rowTop = Math.ceil(enemy.posY / Size);
        enemy.colBot = Math.floor((enemy.posX - enemy.speed) / Size);
        enemy.colTop = Math.ceil((enemy.posX - enemy.speed) / Size);
        return checkLeftMove(grids,enemy.rowBot, enemy.rowTop, enemy.colBot, enemy.colTop);
    }
  }

  export const checkIfBombed = (grids,x,y) => {
    return grids[Math.round(y/Size)][Math.round(x/Size)].classList.contains('explotion')
  }

  export const checkIfPortal = (grids,x,y) => {
    return grids[Math.round(y/Size)][Math.round(x/Size)].classList.contains('portal')
  }