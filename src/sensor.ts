import Car from "./car";
import { Border, Ray } from "./types";
import { getIntersection, lerp } from "./utils";

class Sensor {
  private car: Car;
  private rayCount: number;
  private rayLength: number;
  private raySpread: number;
  private rays: Ray[];
  private readings: any[];

  constructor(car: Car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings = [];
  }

  update(borders: Border[]) {
    this._castRays();
    this.readings = [];
    for (let i = 0; i < this.rayCount; i++) {
      const ray = this.rays[i];
      const reading = this._getClosestIntersection(ray, borders);
      this.readings.push(reading);
    }
  }

  _getClosestIntersection(ray: any, borders: Border[]) {
    let touches = [];

    for (let i = 0; i < borders.length; i++) {
      const border = borders[i];

      const intersection = getIntersection(ray[0], ray[1], border[0], border[1]);
      if (intersection) {
        touches.push(intersection);
      }
    }

    if (touches.length === 0) {
      return null;
    } else {
      const offsets = touches.map((touch: any) => touch.offset);

      const minOffset = Math.min(...offsets);

      return touches.find((touch: any) => touch.offset === minOffset);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i];
      }
      const ray = this.rays[i];
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(ray[0].x, ray[0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();


      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(ray[1].x, ray[1].y);
      ctx.stroke();
    }
  }

  _castRays() {
    this.rays = [] as Ray[];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };

      this.rays.push([start, end]);
    }
  }
}

export default Sensor;
