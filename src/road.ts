import { lerp } from "./utils";
import { Border, Point } from "./types";

class Road {
  private x: number;
  private width: number;
  private laneCount: number;
  private left: number;
  private right: number;
  private top: number;
  private bottom: number;
  private ctx: CanvasRenderingContext2D;
  private infinity = 1000000;
  public borders: Border[];

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    width: number,
    laneCount: number = 3
  ) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - this.width / 2;
    this.right = x + this.width / 2;

    this.top = -this.infinity;
    this.bottom = this.infinity;
    this.ctx = ctx;

    const topLeft: Point = { x: this.left, y: this.top };
    const topRight: Point = { x: this.right, y: this.top };
    const bottomLeft: Point = { x: this.left, y: this.bottom };
    const bottomRight: Point = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

    getLaneCenter(laneIndex: number) {
      const laneWidth = this.width / this.laneCount;

      return (
        this.left +
        laneWidth / 2 +
        Math.min(laneIndex, this.laneCount - 1) * laneWidth
      );
    }

    draw() {
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = "white";

      for (let i = 1; i <= this.laneCount - 1; i++) {
        const x = lerp(this.left, this.right, i / this.laneCount);

        this.ctx.setLineDash([20, 20]);

        this.ctx.beginPath();
        this.ctx.moveTo(x, this.top);
        this.ctx.lineTo(x, this.bottom);
        this.ctx.stroke();
      }

      this.ctx.setLineDash([]);
      this.borders.forEach((border) => {
        this.ctx.beginPath();
        this.ctx.moveTo(border[0].x, border[0].y);
        this.ctx.lineTo(border[1].x, border[1].y);
        this.ctx.stroke();
      })
    }
  }

  export default Road;
