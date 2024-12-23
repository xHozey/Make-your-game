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
