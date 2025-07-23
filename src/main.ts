import { Application } from 'pixi.js';
import { BouncingCircle } from './objects/BouncingCircle';

async function init() {
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
  });

  document.body.appendChild(app.canvas);

  const circles: BouncingCircle[] = [];

  function spawnCircle(x: number, y: number) {
    const radius = Math.random() * 20 + 10; 
    const color = Math.floor(Math.random() * 0xffffff);
    const speed = Math.random() * 2 + 1; 

    const circle = new BouncingCircle(radius, color, speed, app);

    circle.x = x;
    circle.y = y;

    app.stage.addChild(circle);
    circles.push(circle);
  }

  spawnCircle(app.screen.width / 2, app.screen.height / 2);

  app.canvas.addEventListener('pointerdown', (e) => {
    const rect = app.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spawnCircle(x, y);
  });

  app.ticker.add(() => {
    // Update positions
    for (const circle of circles) {
      circle.update(app);
    }

    // Check collisions between every pair
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        circles[i].checkCollision(circles[j]);
      }
    }
  });
}

init();
