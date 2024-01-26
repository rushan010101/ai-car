import Controls from "./controls";
import { Border, Point } from "./types";
import Sensor from "./sensor";

class Car {
  public x;
  public y;
  private width;
  private height;
  private ctx: CanvasRenderingContext2D;
  private controls;
  private speed;
  private acceleration;
  private maxSpeed;
  private friction;
  public angle;
  private sensor: Sensor;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;

    this.angle = 0;


    this.sensor = new Sensor(this.ctx, this) 

    this.controls = new Controls();
  }

  _move() {
    if (this.controls.forward) {
        this.speed += this.acceleration;
      }
      if (this.controls.reverse) {
        this.speed -= this.acceleration;
      }
  
      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
      }
      if (this.speed < -this.maxSpeed / 2) {
        this.speed = -this.maxSpeed / 2;
      }
  
      if (this.speed > 0) {
        this.speed -= this.friction;
      }
      if (this.speed < 0) {
        this.speed += this.friction;
      }
      if (Math.abs(this.speed) < this.friction) {
        this.speed = 0;
      }
  
      if (this.speed !== 0) {
          const flip = this.speed > 0 ? 1 : -1
        if (this.controls.left) {
          this.angle += 0.03 * flip;
        }
        if (this.controls.right) {
          this.angle -= 0.03 * flip;
        }
      }
  
      this.x -= Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;
  }

  update(borders: Border[]) {
    this._move();
    this.sensor.update(borders);
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(-this.angle);

    this.ctx.beginPath();
    this.ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.ctx.fill();

    this.ctx.restore();

    this.sensor.draw();
  }
}

export default Car;
