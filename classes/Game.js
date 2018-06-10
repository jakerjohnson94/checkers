function Game(rowCount, columnCount, offsets, cellWidth, cellHeight) {
  this.rowCount = rowCount;
  this.columnCount = columnCount;
  this.offsets = offsets;
  this.cellWidth = cellWidth;
  this.cellHeight = cellHeight;

  this.gameboard = new CheckerGrid(
    rowCount,
    columnCount,
    offsets,
    cellWidth,
    cellHeight
  );
  this.cellArray = this.gameboard.cellArray;

  this.playerBlack = new Player("black", this.gameboard);
  this.playerRed = new Player("red", this.gameboard);
  this.currentPlayer = this.playerBlack;
  this.clickMode = "select";

  this.addEventListeners();
  document.getElementById(
    "playerColorOutput"
  ).textContent = this.currentPlayer.color;
}

Game.prototype.selectPiece = function(selectedSquare) {
  if (
    selectedSquare.containsChecker &&
    selectedSquare.element.firstElementChild.classList.contains(
      this.currentPlayer.color
    )
  ) {
    this.selectedSquare = selectedSquare;
    this.selectedChecker = selectedSquare.element.firstElementChild;
    this.selectedSquare.isSelected = true;
    this.selectedSquare.element.classList.add("selected");
    this.clickMode = "destination";
    this.selectedSquare.neighborCellArray = this.gameboard
      .findNeighbors(this.selectedSquare, this.currentPlayer)
      .filter(cell => cell.isDark);
    console.log(this.selectedSquare.neighborCellArray);
  }
};

Game.prototype.selectDestination = function(destinationSquare) {
  this.destinationSquare = destinationSquare;
  if (this.selectedSquare.neighborCellArray.includes(this.destinationSquare)) {
    this.destinationSquare.element.appendChild(this.selectedChecker);
    this.selectedSquare.isSelected = false;
    this.selectedSquare.element.classList.remove("selected");
    this.selectedSquare.containsChecker = false;
    this.destinationSquare.containsChecker = true;
    console.log("destination", this.destinationSquare);
    this.clickMode = "select";
    if (
      this.gameboard.findValidJumps(this.destinationSquare, this.currentPlayer)
    ) {
    }
    console.log(this.currentPlayer);
    this.toggleCurrentPlayer();
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
    }
  }
};

Game.prototype.toggleCurrentPlayer = function() {
  this.currentPlayer === this.playerRed
    ? (this.currentPlayer = this.playerBlack)
    : (this.currentPlayer = this.playerRed);
  document.getElementById(
    "playerColorOutput"
  ).textContent = this.currentPlayer.color;
};

Game.prototype.addEventListeners = function() {
  for (const index in this.cellArray) {
    for (const cell of this.cellArray[index]) {
      if (cell.isDark)
        cell.element.addEventListener(
          "click",
          this.eventListeners.click.bind(this)
        );
    }
  }
};
