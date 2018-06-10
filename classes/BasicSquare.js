'use strict';

function BasicSquare(rowIndex, columnIndex) {
  Cell.call(this, rowIndex, columnIndex)

  this.addElement();

}

BasicSquare.prototype = Object.create(Cell.prototype)
BasicSquare.prototype.constructor = BasicSquare