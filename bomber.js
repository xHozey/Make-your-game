export let bomberman;
bomberman = document.createElement("div");
bomberman.className = "bomber-man";
const img = new Image();
img.src = "assets/hitler.png";

bomberman.style.backgroundImage = `url(${img.src})`;
bomberman.style.backgroundSize = "120px 240px";
export const getPosImg = (frameX, frameY) => {
  const x = frameX * 30;
  const y = frameY * 30;
  bomberman.style.backgroundPosition = `${x}px ${y}px`;
};
export const upMove = [5, 6, 7, 8];
export const leftMove = [9, 10, 11, 12];
export const rightMove = [13, 14, 15, 16];
export const downMove = [1, 2, 3, 4];