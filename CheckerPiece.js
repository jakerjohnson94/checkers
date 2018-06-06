function CheckerPiece(color){
  this.color = color

  this.element = document.createElement('div')
  this.element.classList.add(this.color)
  this.element.classList.add('checkerPiece')
}

CheckerPiece.prototype = {
  placePiece: function(parentElement){
    this.parentElement = parentElement
    this.parentElement.appendChild(this.element)
  },
  moveRight: function(){

  },
  moveLeft: function(){

  },

}