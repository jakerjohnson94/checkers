'use strict'

function CheckerGrid(rowCount, columnCount, offsets, cellHeight, cellWidth) {
  Grid.call(this, rowCount, columnCount, offsets, cellHeight, cellWidth)
  this.clickMode = 'select'
  this.createCheckerBoard()
  if (this.cellHeight && this.cellWidth) this.changeSizeOfAllCells(this.cellHeight, this.cellWidth);
  this.addCheckers()

}

CheckerGrid.prototype = Grid.prototype

CheckerGrid.prototype.addCheckers = function () {
  this.checkerArray = []
  for (let index in this.cellArray) {
    this.checkerArray.push([])
    for (let square of this.cellArray[index]) {
      if (square.element.classList.contains('dark')) {
        console.log(square)
        if (square.rowIndex === 0 || square.rowIndex === 1) {
          const blackPiece = new CheckerPiece('black')
          square.addChecker(blackPiece)
          square.containsChecker = true
          this.checkerArray[index].push(blackPiece)
        } else if (square.rowIndex === 6 || square.rowIndex === 7) {
          const redPiece = new CheckerPiece('red')
          square.addChecker(redPiece)
          square.containsChecker = true
          this.checkerArray[index].push(redPiece)
        }
      }
    }
  }
}
CheckerGrid.prototype.createCheckerBoard = function () {
  this.cellArray = []
  for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
    const rowElement = document.createElement('div');
    this.outputElement.appendChild(rowElement);
    rowElement.classList.add('row');
    this.cellArray.push([]);
    for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
      let cell;
      if ((rowIndex % 2 === 0 && columnIndex % 2 !== 0) || (rowIndex % 2 !== 0 && columnIndex % 2 === 0)) cell = new DarkSquare(rowIndex, columnIndex);
      else cell = new LightSquare(rowIndex, columnIndex);

      rowElement.appendChild(cell.element);
      this.cellArray[rowIndex].push(cell);
      cell.element.addEventListener("click", this.eventListeners.click.bind(this));
    }
  }
}
CheckerGrid.prototype.selectPiece = function (selectedPiece) {
  this.selectedPiece = selectedPiece.element.firstElementChild
  console.log(this.selectedPiece)
    this.selectPiece.isSelected = true
    this.clickMode = 'destination'
  },
  CheckerGrid.prototype.selectDestination = function (destinationSquare) {
    this.destinationSquare = destinationSquare
    this.clickMode = 'select'
  }

CheckerGrid.prototype.eventListeners = {

  click: function (event) {
    const rowIndex = event.currentTarget.dataset.rowIndex
    const columnIndex = event.currentTarget.dataset.columnIndex

    let clickedCell = this.cellArray[rowIndex][columnIndex];
    if (this.clickMode === 'select' && clickedCell.containsChecker) {

      this.selectPiece(clickedCell)
      console.log('This click selects a cell')
    } else if (this.clickMode === 'destination') {
     
      this.selectDestination(clickedCell)
      console.log('destination', this.destinationSquare)
      console.log('selectedpiece', this.selectedPiece)
      this.destinationSquare.element.appendChild(this.selectedPiece)
   
      console.log(this.checkerArray)

      console.log('this click selects a destination')
    }




  },

}