import { Application, Text } from 'pixi.js';
import { BouncingCircle } from './objects/BouncingCircle';
import { SpatialGrid } from './objects/SpatialGrid';

async function init() {
  const app = new Application();

  await app.init({
    width: 600,
    height: 600,
    backgroundColor: 0x1099bb,
  });

  document.body.appendChild(app.canvas);

  const grid = new SpatialGrid(100);
  const circles: BouncingCircle[] = [];

  const statsText = new Text({
    text: '',
    style: {
      fontFamily: 'monospace',
      fontSize: 14,
      fill: 0xffffff,
    },
  });
  statsText.x = 10;
  statsText.y = 10;

  function spawnCircle(x: number, y: number) {
    const radius = Math.random() * 20 + 10;
    const color = Math.floor(Math.random() * 0xffffff);
    const speed = Math.random() * 2 + 1;

    const circle = new BouncingCircle(radius, color, speed, app);
    circle.x = x;
    circle.y = y;

    app.stage.addChild(circle);
    app.stage.addChild(statsText);
    circles.push(circle);
  }

  app.canvas.addEventListener('pointerdown', (e) => {
    const rect = app.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnCircle(x, y);
  });

  app.ticker.add(() => {
    grid.clear();

    for (const circle of circles) {
      circle.update(app);
      grid.insert(circle);
    }

    for (const circle of circles) {
      const nearby = grid.getNearby(circle);
      for (const other of nearby) {
        if (other !== circle) {
          circle.checkCollision(other, app);
        }
      }
    }

    statsText.text = `Balls: ${circles.length}\nFPS: ${Math.round(app.ticker.FPS)}`;
  });
  app.stage.addChild(statsText);
}

init();
