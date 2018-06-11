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
  this.containsChecker = true;
  this.checker = checker;
};
DarkSquare.prototype.moveChecker = function(destinationSquare, selectedChecker) {
  destinationSquare.element.appendChild(selectedChecker.element);
  this.isSelected = false;
  this.element.classList.remove("selected");
  this.containsChecker = false;
  destinationSquare.containsChecker = true;
  this.checker = null;
  destinationSquare.checker = selectedChecker;
};
