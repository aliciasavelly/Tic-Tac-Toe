const POSITIONS = {
  "0": [0, 0],
  "1": [0, 1],
  "2": [0, 2],
  "3": [1, 0],
  "4": [1, 1],
  "5": [1, 2],
  "6": [2, 0],
  "7": [2, 1],
  "8": [2, 2],
};

let NEXT_MARK = "X";

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    let that = this;

    if (!this.game.isOver()){
      console.log("game is not over");
      $("li").click(function(){
        $(this).attr("clicked","true");
        if (!that.game.isOver()){
          that.makeMove(this);
        }
      });
    }
  }

  makeMove($square) {
    if (!this.game.isOver()){
      console.log("game is not over");
      let pos = $square.getAttribute("position");
      this.game.playMove(POSITIONS[pos]);
      $($square).css("background-color", "white");

      if(NEXT_MARK === "O") {
        $($square).text("O");
        $($square).attr("mark", "O");
        NEXT_MARK = "X";
      } else {
        $($square).text("X");
        $($square).attr("mark", "X");
        NEXT_MARK = "O";
      }
    }

    if (this.game.isOver()) {
      if (this.game.winner()) {
        let winner = this.game.winner().toUpperCase();
        $("<h2>Game over! " + winner + " wins!</h2>").insertAfter($("figure"));
        console.log(winner);
        $("li[mark=" + winner + "]").css('background-color', 'blue');
        $("li[mark=" + winner + "]").css('color', 'white');
        $("li[mark!=" + winner + "]").css('background-color', 'white');
      } else {
        $("<h2>Game over! It was a tie!</h2>").insertAfter($("figure"));
      }
    }

  }

  setupBoard() {
    let $ul = $("<ul></ul>");
    console.log($ul);

    for(let i = 0; i < 9; i++) {
      $ul.append($('<li></li>'));
    }

    this.$el.append($ul);
    for(let i = 0; i < 9; i++) {
      $("li").eq(i).attr("position", `${i}`);
      $("li").eq(i).attr("clicked", "false");
    }

    let that = this;
    if (!this.game.isOver()){
      $("li").hover(function() {
        if (this.getAttribute("clicked") === "false" && !that.game.isOver()) {
          console.log(this.getAttribute("clicked"));
          $(this).css('background-color','yellow');
        }
      }, function(){
        if (this.getAttribute("clicked") === "false" && !that.game.isOver()) {
          $(this).css('background-color','pink');
        }
      });
    }
  }
}

module.exports = View;
