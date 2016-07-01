

var solverModel = {
  size: 8,
  squares: [],

  init: function(size) {
    this.size = size;
    var numSquares = Math.pow(this.size, 2);
    for ( var i = 0; i < numSquares; i++ ) {
      this.addSquare(i);
    }
  },

  addSquare: function(i) {
    var newSquare = new this.Square(i, "X")
    this.squares.push( newSquare );
  },

  Square: function(id, value) {
    this.id = id;
    this.value = value;
  },

};


var appController = {

  model: solverModel,
  view: boardView,

  init: function(size) {
    this.model.init(size);
    this.view.init();
  },

};



var boardView = {

  init: function() {
    this.$grid = $('#board-grid');
    this.render();
  }

  render: function() {
    this.addSquaresToGrid();
    var width = 100.0 / this.model.size - 2;
    $('.square').css({
      width: width + "%"
    });
  }

  addSquaresToGrid: function() {
    for( var i = 0; i < this.model.squares.length; i++ ) {
      var square = this.model.squares[i];
      var $squareDiv = $("<div> <div class='name'>" + square.value+ "</div></div>");
      $squareDiv.addClass('square');
      $squareDiv.data( 'square-id', square.id );
      $squareDiv.attr( 'id', 'square-' + square.id );
      this.$grid.append($squareDiv);
    }
  },

};

$(document).ready(function() {

  appController.init(8);

});
