"use strict";

function DarkSquare(rowIndex, columnIndex) {
  BasicSquare.call(this, rowIndex, columnIndex);
  this.addElement();
  this.isDark = true;
  this.addClass("dark");
}

DarkSquare.prototype = Object.create(BasicSquare.prototype);
DarkSquare.prototype.constructor = BasicSquare;

DarkSquare.prototype.addChecker = function(checker) {
  this.element.appendChild(checker.element);
};
