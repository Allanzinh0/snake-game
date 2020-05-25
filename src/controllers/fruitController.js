export default class Fruit {
    constructor(screenWidth, screenHeight, size) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.size = size;
        this.type = 0;
        this.color = "#0f0";
        this.randomize();
    }

    draw(context) {
        this.type = Math.floor(Math.random()*Date.now()) % 3;

        switch (this.type) {
            case 0: this.color = "#0f0"; break;
            case 1: this.color = "#00f"; break;
            case 2: this.color = "#f00"; break;
        }

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    detectColision(object) {
        if ((this.x + this.size) > object.x && this.x < (object.x + object.size)) {
            if ((this.y + this.size) > object.y && this.y < (object.y + object.size)) {
            switch (this.type) {
                case 0: 
                    object.points += 1;
                    object.speed = 1;
                    object.size = object.defaultSize;
                    object.tail = [];
                    this.randomize();
                    break;
                case 1:
                    object.points += 2;
                    object.speed = 2;
                    object.size = object.defaultSize / 2;
                    object.tail = [];
                    this.randomize();
                    break;
                case 2:
                    object.speed = -1;
                    object.size = object.defaultSize * 2;
                    object.tail = [];
                    this.randomize();
                    break;
            }
        }
        }
    }

    randomize() {
        this.x = Math.floor((Math.random() * this.screenWidth) / this.size) * this.size;
        this.y = Math.floor((Math.random() * this.screenHeight) / this.size) * this.size;
    }
}