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
  private infinity = 1000000;
  public borders: Border[];

  constructor(
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

    draw(ctx: CanvasRenderingContext2D) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "white";

      for (let i = 1; i <= this.laneCount - 1; i++) {
        const x = lerp(this.left, this.right, i / this.laneCount);

        ctx.setLineDash([20, 20]);

        ctx.beginPath();
        ctx.moveTo(x, this.top);
        ctx.lineTo(x, this.bottom);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      this.borders.forEach((border) => {
        ctx.beginPath();
        ctx.moveTo(border[0].x, border[0].y);
        ctx.lineTo(border[1].x, border[1].y);
        ctx.stroke();
      })
    }
  }

  export default Road;
