import Snake from "./snakeController.js";
import Fruit from "./fruitController.js";

export default class Game {
    constructor(canvas, scale) {
        this.width = 160 * scale;
        this.height = 120 * scale;
        this.scale = scale;
        this.fps = 45;

        canvas.setAttribute("width", this.width);
        canvas.setAttribute("height", this.height);
        this.gameCtx = canvas.getContext("2d");
        this.player = new Snake(32, 32, this.scale * 2, this);
        this.fruit = new Fruit(this.width, this.height, this.scale * 2);
    }

    setup() {
        document.addEventListener("keydown", evt => {
            this.player.direction(evt.key);
        });
    }

    update() {
        setInterval(() => {
            this.player.update();
            this.player.tailsColision();
            this.fruit.detectColision(this.player);
            this.graphicsDraw();
            document.querySelector("#points").innerHTML = this.player.points;
        }, 1000 / this.fps);
    }

    graphicsDraw() {
        this.gameCtx.clearRect(0, 0, this.width, this.height);
        this.player.draw(this.gameCtx);
        this.fruit.draw(this.gameCtx);
    }

    restart() {
        alert("Game over!!!\nYour points: " + this.player.points);

        this.player.points =  1;
        this.player.speed = 1;
        this.player.size = this.player.defaultSize;
        this.player.tail = [];
        this.player.randomize();
        this.fruit.randomize();
    }
}