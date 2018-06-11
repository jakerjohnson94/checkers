function Game(rowCount, columnCount, offsets, cellWidth, cellHeight) {
  this.rowCount = rowCount;
  this.columnCount = columnCount;
  this.offsets = offsets;
  this.cellWidth = cellWidth;
  this.cellHeight = cellHeight;

  this.gameboard = new CheckerGrid(rowCount, columnCount, offsets, cellWidth, cellHeight);
  this.cellArray = this.gameboard.cellArray;

  this.playerBlack = new Player("black", this.gameboard);
  this.playerRed = new Player("red", this.gameboard);
  this.currentPlayer = this.playerBlack;
  this.clickMode = "select";

  this.addEventListeners();
  document.getElementById("playerColorOutput").textContent = this.currentPlayer.color;
}

Game.prototype.selectPiece = function(selectedSquare) {
  if (
    selectedSquare.containsChecker &&
    selectedSquare.checker &&
    selectedSquare.checker.color === this.currentPlayer.color
  ) {
    this.selectedSquare = selectedSquare;
    this.selectedChecker = selectedSquare.checker;
    this.selectedSquare.isSelected = true;
    this.selectedSquare.element.classList.add("selected");
    this.selectedSquare.neighborCellArray = this.gameboard.findNeighbors(
      this.selectedSquare,
      this.currentPlayer
    );
    if (
      this.gameboard.findNeighbors(
        this.selectedSquare,
        this.currentPlayer,
        square =>
          square.containsChecker &&
          square.checker &&
          square.checker.color !== this.currentPlayer.color
      ).length &&
      this.gameboard.findValidJumps(this.selectedSquare, this.currentPlayer)
    )
      this.clickMode = "selectJump";
    else this.clickMode = "destination";
  }
};

Game.prototype.selectJumpDestination = function(destinationSquare) {
  this.destinationSquare = destinationSquare;
  if (this.selectedSquare.validJumpCellArray.includes(this.destinationSquare)) {
    this.selectedSquare.moveChecker(this.destinationSquare, this.selectedChecker);
    this.clickMode = "select";
    this.toggleCurrentPlayer();
  }
};
Game.prototype.selectDestination = function(destinationSquare) {
  this.destinationSquare = destinationSquare;
  if (
    this.selectedSquare.neighborCellArray.includes(this.destinationSquare) &&
    !this.destinationSquare.containsChecker
  ) {
    this.selectedSquare.moveChecker(destinationSquare, this.selectedChecker);
    this.clickMode = "select";
    if (this.gameboard.findValidJumps(this.destinationSquare, this.currentPlayer).length) {
      this.selectedSquare = destinationSquare;
      this.selectedSquare.element.classList.add("selected");
      this.selectedSquare.isSelected = true;
      this.clickMode = "selectJump";
    } else this.toggleCurrentPlayer();
  }
};
Game.prototype.eventListeners = {
  click(event) {
    const rowIndex = event.currentTarget.dataset.rowIndex;
    const columnIndex = event.currentTarget.dataset.columnIndex;
    let clickedCell = this.cellArray[rowIndex][columnIndex];
    if (this.clickMode === "select" && clickedCell.containsChecker) {
      this.selectPiece(clickedCell);
    } else if (this.clickMode === "destination") {
      this.selectDestination(clickedCell);
    } else if (this.clickMode === "selectJump") {
      this.selectJumpDestination(clickedCell);
    }
  },
};

Game.prototype.toggleCurrentPlayer = function() {
  this.currentPlayer === this.playerRed
    ? (this.currentPlayer = this.playerBlack)
    : (this.currentPlayer = this.playerRed);
  document.getElementById("playerColorOutput").textContent = this.currentPlayer.color;
};

Game.prototype.addEventListeners = function() {
  for (const index in this.cellArray) {
    for (const cell of this.cellArray[index]) {
      if (cell.isDark) cell.element.addEventListener("click", this.eventListeners.click.bind(this));
    }
  }
};
