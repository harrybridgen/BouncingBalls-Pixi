import { Application, Graphics } from 'pixi.js';

async function init() {
  const app = new Application(); // Step 1: create instance

  await app.init({               // Step 2: init with settings
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
  });

  document.body.appendChild(app.canvas);

  const graphics = new Graphics();

  graphics.circle(100, 100, 50);
  graphics.fill({ color: 0xff0000 }); // fill *after* drawing shape
  
  app.stage.addChild(graphics);
  
}

init();
