import "../style.css";
import Car from "./car";
import Road from "./road";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(ctx, canvas.width/2, canvas.width * 0.9)
const car = new Car(ctx, road.getLaneCenter(1), 100, 30, 50);


animate();

function animate() {
    car.update(road.borders)
    
    canvas.height = window.innerHeight;


    ctx.save();
    ctx.translate(0, -car.y+canvas.height*0.7);

    road.draw();
    car.draw();

    ctx.restore();
    requestAnimationFrame(animate);
}