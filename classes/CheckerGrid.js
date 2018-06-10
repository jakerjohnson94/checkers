'use strict'

function CheckerGrid(rowCount, columnCount, offsets, cellHeight, cellWidth) {
  Grid.call(this, rowCount, columnCount, offsets, cellHeight, cellWidth)


  this.createCheckerBoard()


  if (this.cellHeight && this.cellWidth) this.changeSizeOfAllCells(this.cellHeight, this.cellWidth)

}

CheckerGrid.prototype = Grid.prototype

CheckerGrid.prototype.createCheckerBoard = function () {
  this.cellArray = []
  for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
    const rowElement = document.createElement('div')
    this.outputElement.appendChild(rowElement)
    rowElement.classList.add('row')
    this.cellArray.push([])
    for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
      let cell
      if (
        (rowIndex % 2 === 0 && columnIndex % 2 !== 0) ||
        (rowIndex % 2 !== 0 && columnIndex % 2 === 0)
      ) cell = new DarkSquare(rowIndex, columnIndex)
      else cell = new LightSquare(rowIndex, columnIndex)
      rowElement.appendChild(cell.element)
      this.cellArray[rowIndex].push(cell)
    }
  }
}

CheckerGrid.prototype.findNeighbors = function (selectedCell, currrentPLayer, callback) {
  if (!selectedCell) return;
  selectedCell.neighborCellArray = [];
  let currentOffsets;
  currrentPLayer.color === 'black' ? currentOffsets = Object.values(this.offsets.black) : currentOffsets = Object.values(this.offsets.red)
  console.log(currentOffsets)
  currentOffsets.forEach((offset) => {
    const [rowOffset, colOffset] = offset;
    const neighborRowIndex = Number(selectedCell.rowIndex) + rowOffset;
    const neighborColumnIndex = Number(selectedCell.columnIndex) + colOffset;
    if (this.cellArray[neighborRowIndex] && this.cellArray[neighborRowIndex][neighborColumnIndex] !== undefined) {
      selectedCell.neighborCellArray.push(this.cellArray[neighborRowIndex][neighborColumnIndex]);
    }
  })
  if (callback) return selectedCell.validNeighborCellArray = selectedCell.neighborCellArray.filter(callback);
  else return selectedCell.neighborCellArray;
}
CheckerGrid.prototype.findValidJumps = function (selectedCell, currentPlayer) {
  this.findNeighbors(selectedCell, currentPlayer)
  for (let neighbor of selectedCell.neighborCellArray) {
    if (neighbor.containsChecker && this.findNeighbors(neighbor, currentPlayer).filter(neighbor => !neighbor.containsChecker).length) {

      return this.findNeighbors(neighbor, currentPlayer).filter(neighbor => !neighbor.containsChecker)
    } else return false
  }
}

// CheckerGrid.prototype.eventListeners = {
//   // need to implement the grid prototype filter method, ensure move is valid,
//   // then switch to the other player who can only move certain pieces. game logic should be simple after that
//   // WRITE PSUEDO CODE TOMORROW JAKE