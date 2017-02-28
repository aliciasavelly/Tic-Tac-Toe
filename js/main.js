const View = require("./ttt-view.js");
const Game = require("./game.js");

$( () => {
  let t = $(".ttt");
  // $(".ttt").css("height", "20px");
  // $(".ttt").css("background", "red");
  let game = new Game();
  let view = new View(game, t);
});
