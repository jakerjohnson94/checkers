'use strict'
function DarkSquare(rowIndex, columnIndex) {
  BasicSquare.call(this, rowIndex, columnIndex)
  this.addElement();
  this.addClass('dark')
  this.addStyle('background-color', 'peachpuff');
}

DarkSquare.prototype = BasicSquare.prototype

DarkSquare.prototype.addChecker = function(checker){
  
  this.element.appendChild(checker.element)
}