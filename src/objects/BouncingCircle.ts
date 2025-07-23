import { Graphics, Container, Application } from 'pixi.js';

export class BouncingCircle extends Container {
  radius: number;
  vx: number;
  vy: number;
  shape: Graphics;

  constructor(radius: number, color: number, speed: number, app: Application) {
    super();

    this.radius = radius; 

    this.shape = new Graphics();
    this.shape.circle(0, 0, radius);
    this.shape.fill({ color });
    this.addChild(this.shape);

    this.x = app.screen.width / 2;
    this.y = app.screen.height / 2;

    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  update(app: Application) {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x + this.radius > app.screen.width || this.x - this.radius < 0) {
      this.vx *= -1;
    }
    if (this.y + this.radius > app.screen.height || this.y - this.radius < 0) {
      this.vy *= -1;
    }
  }
}
