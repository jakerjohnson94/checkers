function Player(playerColor, currentGameboard) {
  this.color = playerColor;
  this.numberOfPieces = 8;
  this.gameboard = currentGameboard;
  this.addCheckers();
}

Player.prototype.addCheckers = function() {
  for (let index in this.gameboard.cellArray) {
    for (let square of this.gameboard.cellArray[index]) {
      if (square.isDark) {
        if (
          this.color === "black" &&
          (square.rowIndex === 5 || square.rowIndex === 6 || square.rowIndex === 7)
        ) {
          const blackPiece = new CheckerPiece("black");
          square.addChecker(blackPiece);
        } else if (
          this.color === "red" &&
          (square.rowIndex === 0 || square.rowIndex === 1 || square.rowIndex === 2)
        ) {
          const redPiece = new CheckerPiece("red");
          square.addChecker(redPiece);
        }
      }
    }
  }
};
