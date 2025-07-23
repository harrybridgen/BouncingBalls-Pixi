import { BouncingCircle } from './BouncingCircle';


export class SpatialGrid {
  cellSize: number;
  grid: Map<string, BouncingCircle[]>;

  constructor(cellSize: number) {
    this.cellSize = cellSize;
    this.grid = new Map();
  }

  clear() {
    this.grid.clear();
  }

  _cellKey(x: number, y: number): string {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    return `${col},${row}`;
  }

  insert(circle: BouncingCircle) {
    const key = this._cellKey(circle.x, circle.y);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(circle);
  }

  getNearby(circle: BouncingCircle): BouncingCircle[] {
    const col = Math.floor(circle.x / this.cellSize);
    const row = Math.floor(circle.y / this.cellSize);
    const nearby: BouncingCircle[] = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = `${col + dx},${row + dy}`;
        const cell = this.grid.get(key);
        if (cell) nearby.push(...cell);
      }
    }

    return nearby;
  }
}
