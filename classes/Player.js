function Player(playerColor, currentGameboard) {
  this.color = playerColor;
  this.numberOfPieces = 8;
  this.gameboard = currentGameboard;
  this.addCheckers();
}


Player.prototype.addCheckers = function () {
  for (let index in this.gameboard.cellArray) {
    for (let square of this.gameboard.cellArray[index]) {
      if (square.isDark) {
        if (this.color === 'red' && (square.rowIndex === 0 || square.rowIndex === 1 || square.rowIndex === 2)) {
          const blackPiece = new CheckerPiece('red');
          square.addChecker(blackPiece);
          square.containsChecker = true;
        } else if (this.color === 'black' && (square.rowIndex === 5 || square.rowIndex === 6 || square.rowIndex === 7)) {
          const redPiece = new CheckerPiece('black');
          square.addChecker(redPiece);
          square.containsChecker = true;
        }
      }
    }
  }
};

Player.prototype.moveChecker = function () {


};