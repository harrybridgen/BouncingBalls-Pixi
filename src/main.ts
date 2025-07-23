import { Application, Graphics } from 'pixi.js';

async function init() {
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
  });

  document.body.appendChild(app.canvas);

  const radius = 20;
  const circleColour = 0xff0000;
  const graphics = new Graphics();

  graphics.circle(0, 0, radius);
  graphics.fill({ color: circleColour });

  graphics.x = app.screen.width / 2;
  graphics.y = app.screen.height / 2;

  app.stage.addChild(graphics);

  const speed = Math.random() * 2 + 1;
  const angle = Math.random() * Math.PI * 2;
  let vx = Math.cos(angle) * speed;
  let vy = Math.sin(angle) * speed;

  app.ticker.add(() => {
    graphics.x += vx;
    graphics.y += vy;

    if (
      graphics.x + radius > app.screen.width ||
      graphics.x - radius < 0
    ) {
      vx *= -1;
    }

    if (
      graphics.y + radius > app.screen.height ||
      graphics.y - radius < 0
    ) {
      vy *= -1;
    }
  });
}

init();
