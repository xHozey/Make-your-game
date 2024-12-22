let WIDTH = 800;
let HEIGHT = 600;
let SPRITE_HEIGHT = 20;
let SPRITE_WIDTH = 18;
const img = new Image();
let sprite;
let currentLoopIndex = 0;
const animationLoop = [1, 2, 3, 4];
let slowedBy = 0;
let slowFrameRate = 10;

const drawSprite = (frameX, frameY) => {
const x = frameX * SPRITE_WIDTH;
const y = frameY * SPRITE_HEIGHT;
sprite.style.backgroundPosition = `${x}px ${y}px`;
}

const loop = () => {
    if (slowedBy >= slowFrameRate) {
        if (currentLoopIndex < animationLoop.length) {
            drawSprite(animationLoop[currentLoopIndex], 1);
            currentLoopIndex++;
        } else {
            currentLoopIndex = 0;
        }
        slowedBy = 0;
    } else {
     slowedBy++;
    }

window.requestAnimationFrame(loop);
}

window.onload = () => {
img.src = 'https://opengameart.org/sites/default/files/styles/medium/public/ATK-preview.png';
}    

img.onload = () => {
const world = document.getElementById('game');
world.style.width = `${WIDTH}px`;
world.style.height = `${HEIGHT}px`;
world.style.backgroundColor = 'green';

//  Create the sprite element
sprite = document.createElement('div');
sprite.style.height = `${SPRITE_HEIGHT}px`;
sprite.style.width = `${SPRITE_WIDTH}px`;
sprite.style.border = '1px solid #000';
sprite.style.backgroundImage = `url(${img.src})`;
drawSprite(1, 1)
world.appendChild(sprite);
window.requestAnimationFrame(loop)
}