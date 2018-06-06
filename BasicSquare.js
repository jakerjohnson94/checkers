'use strict';

function BasicSquare(rowIndex, columnIndex) {
  Cell.call(this, rowIndex, columnIndex)

  this.addElement();

}

BasicSquare.prototype = Cell.prototype