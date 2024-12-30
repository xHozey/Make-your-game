import { width, height } from "./main.js";

export const checkUpperMove = (grids, rowBot, colBot, colTop, object) => {
  const leftGrid =
    grids[rowBot][colBot].classList.contains("wall") ||
    grids[rowBot][colBot].classList.contains("soft-wall") ||
    (grids[rowBot][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const rightGrid =
    grids[rowBot][colTop].classList.contains("wall") ||
    grids[rowBot][colTop].classList.contains("soft-wall") ||
    (grids[rowBot][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  if (leftGrid && !rightGrid) {
    return [true, (object.x += object.speed)];
  }
  if (!leftGrid && rightGrid) {
    return [true, (object.x -= object.speed)];
  }
  if (leftGrid && rightGrid) {
    return [true, object.x];
  }
  return [false, object.x];
};

export const checkDownMove = (grids, rowTop, colBot, colTop, object) => {
  const leftGrid =
    grids[rowTop][colBot].classList.contains("wall") ||
    grids[rowTop][colBot].classList.contains("soft-wall") ||
    (grids[rowTop][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const rightGrid =
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall") ||
    (grids[rowTop][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  if (leftGrid && !rightGrid) {
    return [true, (object.x += object.speed)];
  }
  if (!leftGrid && rightGrid) {
    return [true, (object.x -= object.speed)];
  }
  if (leftGrid && rightGrid) {
    return [true, object.x];
  }
  return [false, object.x];
};

export const checkLeftMove = (grids, rowBot, rowTop, colBot, object) => {
  const downGrid =
    grids[rowTop][colBot].classList.contains("wall") ||
    grids[rowTop][colBot].classList.contains("soft-wall") ||
    (grids[rowTop][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const upGrid =
    grids[rowBot][colBot].classList.contains("wall") ||
    grids[rowBot][colBot].classList.contains("soft-wall") ||
    (grids[rowBot][colBot].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  if (upGrid && !downGrid) {
    return [true, (object.y += object.speed)];
  }
  if (!upGrid && downGrid) {
    return [true, (object.y -= object.speed)];
  }
  if (upGrid && downGrid) {
    return [true, object.y];
  }
  return [false, object.y];
};

export const checkRightMove = (grids, rowBot, rowTop, colTop, object) => {
  const upGrid =
    grids[rowBot][colTop].classList.contains("wall") ||
    grids[rowBot][colTop].classList.contains("soft-wall") ||
    (grids[rowBot][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));
  const downGrid =
    grids[rowTop][colTop].classList.contains("wall") ||
    grids[rowTop][colTop].classList.contains("soft-wall") ||
    (grids[rowTop][colTop].classList.contains("bomb-wall") && !checkIfinBomb(grids,object));

  if (upGrid && !downGrid) {
    return [true, (object.y += object.speed)];
  }
  if (!upGrid && downGrid) {
    return [true, (object.y -= object.speed)];
  }
  if (upGrid && downGrid) {
    return [true, object.y];
  }
  return [false, object.y];
};

export const checkMonsterMove = (enemy, grids) => {
  switch (enemy.dir) {
    case "up":
      enemy.rowBot = Math.floor((enemy.y - enemy.speed) / height);
      enemy.colBot = Math.floor(enemy.x / width);
      enemy.colTop = Math.ceil(enemy.x / width);
      return (
        grids[enemy.rowBot][enemy.colBot].classList.contains("wall") ||
        grids[enemy.rowBot][enemy.colBot].classList.contains("soft-wall") ||
        grids[enemy.rowBot][enemy.colTop].classList.contains("wall") ||
        grids[enemy.rowBot][enemy.colTop].classList.contains("soft-wall") ||
        grids[enemy.rowBot][enemy.colTop].classList.contains("bomb-wall") ||
        grids[enemy.rowBot][enemy.colBot].classList.contains("bomb-wall")
      );
    case "down":
      enemy.rowBot = Math.floor((enemy.y + enemy.speed) / height);
      enemy.rowTop = Math.ceil((enemy.y + enemy.speed) / height);
      enemy.colBot = Math.floor(enemy.x / width);
      enemy.colTop = Math.ceil(enemy.x / width);
      return (
        grids[enemy.rowTop][enemy.colBot].classList.contains("wall") ||
        grids[enemy.rowTop][enemy.colBot].classList.contains("soft-wall") ||
        grids[enemy.rowTop][enemy.colTop].classList.contains("wall") ||
        grids[enemy.rowTop][enemy.colTop].classList.contains("soft-wall") ||
        grids[enemy.rowTop][enemy.colBot].classList.contains("bomb-wall") ||
        grids[enemy.rowTop][enemy.colTop].classList.contains("bomb-wall")
      );

    case "right":
      enemy.rowBot = Math.floor(enemy.y / height);
      enemy.rowTop = Math.ceil(enemy.y / height);
      enemy.colBot = Math.floor((enemy.x + enemy.speed) / width);
      enemy.colTop = Math.ceil((enemy.x + enemy.speed) / width);
      return (
        grids[enemy.rowBot][enemy.colTop].classList.contains("wall") ||
        grids[enemy.rowBot][enemy.colTop].classList.contains("soft-wall") ||
        grids[enemy.rowTop][enemy.colTop].classList.contains("wall") ||
        grids[enemy.rowTop][enemy.colTop].classList.contains("soft-wall") ||
        grids[enemy.rowBot][enemy.colTop].classList.contains("bomb-wall") ||
        grids[enemy.rowTop][enemy.colTop].classList.contains("bomb-wall")
      );
    case "left":
      enemy.rowBot = Math.floor(enemy.y / height);
      enemy.rowTop = Math.ceil(enemy.y / height);
      enemy.colBot = Math.floor((enemy.x - enemy.speed) / width);
      enemy.colTop = Math.ceil((enemy.x - enemy.speed) / width);
      return (
        grids[enemy.rowTop][enemy.colBot].classList.contains("wall") ||
        grids[enemy.rowTop][enemy.colBot].classList.contains("soft-wall") ||
        grids[enemy.rowBot][enemy.colBot].classList.contains("wall") ||
        grids[enemy.rowBot][enemy.colBot].classList.contains("soft-wall") ||
        grids[enemy.rowTop][enemy.colBot].classList.contains("bomb-wall") ||
        grids[enemy.rowBot][enemy.colBot].classList.contains("bomb-wall")
      );
  }
};

export const checkIfBombed = (grids, x, y) => {
  return grids[Math.round(y / height)][
    Math.round(x / width)
  ].classList.contains("explotion");
};

export const checkIfPortal = (grids, x, y) => {
  return grids[Math.round(y / height)][
    Math.round(x / width)
  ].classList.contains("portal");
};

const checkIfinBomb = (grids,player) => {
  return grids[Math.round(player.y / height)][
    Math.round(player.x / width)
  ].classList.contains("bomb-wall");
}