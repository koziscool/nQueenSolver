

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
    // var newSquare = new this.Square(i, "X", this.size);
    // this.squares.push( newSquare );
    this.squares.push( i );
  },

  rowNumber: function(i) {
    return Math.floor( i / this.size );
  },

  colNumber: function(i) {
    return  i % this.size;
  },

  solve: function( ) {
    var partialSoln = [];
    var partialSolnPath = [[]];
    var remainingAvailable = this.squares.slice();
    var remainingAvailablePath = [ this.squares.slice() ];
    var newQueen;

    while (partialSoln.length < this.size && remainingAvailable.length > 0) {
      newQueen = remainingAvailable[0];
      console.log( "before", newQueen, partialSoln, partialSolnPath, remainingAvailable, remainingAvailablePath );
      var retArr  = this.iterateSolver( newQueen, partialSoln, partialSolnPath, remainingAvailable, remainingAvailablePath );
      partialSoln = retArr[0];
      partialSolnPath = retArr[1];
      remainingAvailable = retArr[2];
      remainingAvailablePath = retArr[3];
      console.log( "after", newQueen, partialSoln, partialSolnPath, remainingAvailable, remainingAvailablePath );

      if ( partialSoln.length === this.size ) {
        console.log( "solved", partialSoln );     
      }
    }
  },

  iterateSolver: function( newQueen, partialSoln, partialSolnPath, remainingAvailable, remainingAvailablePath ) {
    // console.log(remainingAvailable);
    var newAvailable = this.removeNeighbors( newQueen, remainingAvailable );

    if ( newAvailable.length >= this.size - partialSoln.length - 1 ) {
      partialSoln.push( newQueen );
      // console.log( partialSoln );
      partialSolnPath.push( partialSoln.slice() );
      remainingAvailable = newAvailable.slice();
      remainingAvailablePath.push( remainingAvailable );
    } else {
      remainingAvailable.shift();
      if( remainingAvailable.length === 0 ) {
        remainingAvailablePath.pop();
        console.log( remainingAvailablePath );

        remainingAvailable = remainingAvailablePath[remainingAvailablePath.length - 1];
        remainingAvailable.shift();
        console.log( remainingAvailable );

        partialSolnPath.pop();
        console.log( partialSolnPath );

        partialSoln = partialSolnPath[partialSolnPath.length - 1];
        console.log( partialSoln );
      }
    }

    return [ partialSoln, partialSolnPath, remainingAvailable, remainingAvailablePath ];
  },




  removeNeighbors: function( newQueen, remainingAvailable ){
    var modelContext = this;
    var newRow = modelContext.rowNumber( newQueen );
    var newCol = modelContext.colNumber( newQueen);

    return remainingAvailable.filter( function(item){
      return ( modelContext.rowNumber( item ) !== newRow && modelContext.colNumber( item ) !== newCol &&
       modelContext.rowNumber( item ) + modelContext.colNumber( item ) !== newRow + newCol && 
       modelContext.rowNumber( item ) - modelContext.colNumber( item ) !== newRow - newCol );
    });
  }

};


var boardView = {
  model: solverModel,

  init: function() {
    this.$grid = $('#board-grid');
    this.render();
  },

  render: function() {
    this.addSquaresToGrid();
  },

  addSquaresToGrid: function() {
    for( var row = 0; row < this.model.size; row++ ) {
      var $rowDiv = $("<div class='row-container'></div>");
      for( var col = 0; col < this.model.size; col++ ) {
        var squareIndex = row * this.model.size + col
        var square = this.model.squares[squareIndex];

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
    this.model.solve();
    console.log("there");
    // console.log(solverModel.squares);
  },
};

$(document).ready(function() {
  appController.init(8);
});
