"use strict";

function CheckerGrid(rowCount, columnCount, offsets, cellHeight, cellWidth) {
  Grid.call(this, rowCount, columnCount, offsets, cellHeight, cellWidth);
  this.createCheckerBoard();
  if (this.cellHeight && this.cellWidth) this.changeSizeOfAllCells(this.cellHeight, this.cellWidth);
}

CheckerGrid.prototype = Grid.prototype;

CheckerGrid.prototype.createCheckerBoard = function() {
  this.cellArray = [];
  for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
    const rowElement = document.createElement("div");
    this.outputElement.appendChild(rowElement);
    rowElement.classList.add("row");
    this.cellArray.push([]);
    for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
      let cell;
      if (
        (rowIndex % 2 === 0 && columnIndex % 2 !== 0) ||
        (rowIndex % 2 !== 0 && columnIndex % 2 === 0)
      )
        cell = new DarkSquare(rowIndex, columnIndex);
      else cell = new LightSquare(rowIndex, columnIndex);
      rowElement.appendChild(cell.element);
      this.cellArray[rowIndex].push(cell);
    }
  }
};

CheckerGrid.prototype.findNeighbors = function(selectedCell, currentPlayer, callback) {
  if (!selectedCell) return;
  selectedCell.neighborCellArray = [];
  let currentOffsets;
  currentPlayer.color === "black"
    ? (currentOffsets = Object.values(this.offsets.black))
    : (currentOffsets = Object.values(this.offsets.red));
  currentOffsets.forEach(offset => {
    const [rowOffset, colOffset] = offset;
    const neighborRowIndex = Number(selectedCell.rowIndex) + rowOffset;
    const neighborColumnIndex = Number(selectedCell.columnIndex) + colOffset;
    if (
      this.cellArray[neighborRowIndex] &&
      this.cellArray[neighborRowIndex][neighborColumnIndex] !== undefined &&
      this.cellArray[neighborRowIndex][neighborColumnIndex].isDark
    ) {
      selectedCell.neighborCellArray.push(this.cellArray[neighborRowIndex][neighborColumnIndex]);
    }
  });
  if (callback) {
    if (selectedCell.neighborCellArray.filter(callback) !== undefined)
      return (selectedCell.validNeighborCellArray = selectedCell.neighborCellArray.filter(
        callback
      ));
    else return false;
  } else return selectedCell.neighborCellArray;
};
CheckerGrid.prototype.findValidJumps = function(selectedCell, currentPlayer) {
  let currentJumpOffsets;
  selectedCell.validJumpCellArray = [];
  currentPlayer.color === "black"
    ? (currentJumpOffsets = Object.values(this.offsets.blackJump))
    : (currentJumpOffsets = Object.values(this.offsets.redJump));

  for (let offset of currentJumpOffsets) {
    const [rowOffset, colOffset] = offset;
    const neighborRowIndex = Number(selectedCell.rowIndex) + rowOffset;
    const neighborColumnIndex = Number(selectedCell.columnIndex) + colOffset;
    if (
      this.cellArray[neighborRowIndex] &&
      this.cellArray[neighborRowIndex][neighborColumnIndex] !== undefined &&
      this.cellArray[neighborRowIndex][neighborColumnIndex].isDark &&
      !this.cellArray[neighborRowIndex][neighborColumnIndex].checker
    ) {
      selectedCell.validJumpCellArray.push(this.cellArray[neighborRowIndex][neighborColumnIndex]);
    }
  }

  return selectedCell.validJumpCellArray.length ? selectedCell.validJumpCellArray : false;
};
