"use strict";

function LightSquare(rowIndex, columnIndex) {
  BasicSquare.call(this, rowIndex, columnIndex);

  this.addElement();
  this.addClass("light");
}
LightSquare.prototype = Object.create(BasicSquare.prototype);
LightSquare.prototype.constructor = LightSquare;
