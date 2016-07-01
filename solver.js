

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


var boardView = {

  model: solverModel,
  sideLength:25,

  init: function() {
    this.$grid = $('#board-grid');
    this.render();
  },

  render: function() {
    this.addSquaresToGrid();
    // var side = 100.0 / this.model.size;
    // $('.square').css({
    //   width: side + "%"
    // });
  },


  // change this to size
  addSquaresToGrid: function() {
    for( var row = 0; row < this.model.size; row++ ) {
      var $rowDiv = $("<div class='row-container'></div>");
      for( var col = 0; col < this.model.size; col++ ) {
        var squareIndex = row * this.model.size + col
        var square = this.model.squares[squareIndex];

        // var $squareDiv = $("<div> <div class='name'>" + square.value+ "</div></div>");
        var $squareDiv = $("<div> <div class='table'><div class='table-cell'><img src='Chess_queen_icon.png'/></div></div></div>");
        $squareDiv.addClass('square');
        if( (row + col) % 2 === 0 ) {
          $squareDiv.addClass('dark-square');
        } else {
          $squareDiv.addClass('light-square');          
        }

        $squareDiv.data( 'square-id', square.id );
        $squareDiv.attr( 'id', 'square-' + square.id );
        $rowDiv.append($squareDiv);
      }
      this.$grid.append($rowDiv);
    }
  },
};

var appController = {

  model: solverModel,
  view: boardView,

  init: function(size) {
    console.log('here');
    this.model.init(size);
    this.view.init();
    console.log('there');
  },

};


$(document).ready(function() {

  appController.init(8);

});
