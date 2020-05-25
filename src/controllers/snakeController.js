export default class Snake {
    constructor(x, y, size, game) {
        this.name = "player";
        this.defaultSize = size;
        this.size = size;
        this.game = game;
        this.speed = 1;
        this.tail = [];
        this.points = 0;
        this.color = "#fff";

        this.x = x;
        this.xDirection = 1 * this.speed;
        this.xMax = game.width;
        
        this.y = y;
        this.yDirection = 0 * this.speed;
        this.yMax = game.height;
        
    }

    update() {
        this.tail.push({
            x: this.x,
            y: this.y
        });
        if (this.tail.length > this.points) this.tail.shift();
        this.x += this.xDirection * this.size * this.speed;
        this.y += this.yDirection * this.size * this.speed;

        if (this.x >= this.xMax) this.x = 0;
        else if (this.x < 0) this.x = this.xMax - this.size;
        if (this.y >= this.yMax) this.y = 0;
        else if (this.y < 0) this.y = this.yMax - this.size;
    }

    direction(direction) {
        switch (direction) {
            case "ArrowLeft": 
                this.xDirection = (this.xDirection != 1) ? -1 : 1;
                this.yDirection = 0;
                break;
            case "ArrowRight": 
                this.xDirection = (this.xDirection != -1) ? 1 : -1;
                this.yDirection = 0;
                break;
            case "ArrowUp": 
                this.xDirection = 0;
                this.yDirection = (this.yDirection != 1) ? -1 : 1;
                break;
            case "ArrowDown": 
                this.xDirection = 0;
                this.yDirection = (this.yDirection != -1) ? 1 : -1;;
                break;
        }
    }

    tailsColision() {
        this.tail.forEach(tailEl => {
            if ((this.x + this.size) > tailEl.x && this.x < (tailEl.x + this.size)) {
                if ((this.y + this.size) > tailEl.y && this.y < (tailEl.y + this.size)) {
                    this.game.restart();
                }
            }
        });
    }

    randomize() {
        this.x = Math.floor((Math.random() * this.game.width) / this.size) * this.size;
        this.y = Math.floor((Math.random() * this.game.height) / this.size) * this.size;
    }

    draw(context) {
        context.fillStyle = this.color;
        this.tail.forEach(tailEl => {
            context.fillRect(tailEl.x, tailEl.y, this.size, this.size);
        })
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}