function CheckerPiece(color) {
  this.color = color;

  this.element = document.createElement('div');
  this.element.classList.add(this.color);
  this.element.classList.add('checkerPiece');
}