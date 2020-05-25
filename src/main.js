import Game from "./controllers/gameController.js";

window.game = new Game(document.querySelector("#game"), 4);
window.game.setup();
window.game.update();