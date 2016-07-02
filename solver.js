

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
    var partialSolnPath  = [ partialSoln.slice() ];
    console.log( partialSolnPath );
    var remainingAvailable = this.squares.slice();
    var remainingAvailablePath = [ remainingAvailable.slice() ];
    var ttt = 0;

    while ( remainingAvailablePath[0].length > 0 && ttt < 3 ) {

      //  this one we should check for rows prob
      while ( partialSoln.length < this.size && remainingAvailable.length > 0 ) {
        console.log("-----------")
        console.log("partial", partialSoln);
        console.log("partial path", partialSolnPath);
        // console.log( remainingAvailable.length );
        console.log( "remaining", remainingAvailable );
        console.log( "remaining path", remainingAvailablePath );

        var newQueen = remainingAvailable[0];
        console.log("new queen", newQueen);

        var newAvailable = this.removeNeighbors( newQueen, remainingAvailable ) 
        console.log("new", newAvailable);
        // console.log("new", newAvailable.length);

        if ( newAvailable.length >= this.size - partialSoln.length - 1 ) {
          partialSoln.push( newQueen );
          console.log( "true", partialSoln );
          partialSolnPath.push( partialSoln.slice() );
          console.log( "true", partialSolnPath );
          remainingAvailablePath.push( newAvailable );
          remainingAvailable = newAvailable.slice();
          console.log( "true", remainingAvailable.length );
        } else {

          remainingAvailable.shift();
          console.log( "false remaining", remainingAvailable);

          if( remainingAvailable.length === 0 ) {
            console.log("false false partial path", partialSolnPath);
            console.log("false false remaining path", remainingAvailablePath);

            remainingAvailablePath = remainingAvailablePath.slice(0, -2);
            partialSolnPath = partialSolnPath.slice(0, -2);

            remainingAvailable = remainingAvailablePath[remainingAvailablePath.length - 1];
            partialSoln = partialSolnPath[partialSolnPath.length - 1];

            // remainingAvailable = remainingAvailablePath.pop()
            // partialSoln = partialSolnPath.pop();
          }
          console.log( "false partial", partialSoln ); 
          console.log( "false remaining", remainingAvailable );


          // console.log( "false partial", partialSolnPath ); 
          // partialSoln = partialSolnPath.pop();

          // console.log( "false", remainingAvailablePath );
          // console.log( "false", remainingAvailablePath.length );

          // remainingAvailable = remainingAvailablePath.pop()
          // console.log( "false", remainingAvailable );
          // remainingAvailable.shift();
          // console.log( "false", remainingAvailable );
        }

      }

      if ( partialSoln.length === this.size ) {
        // write soln
        console.log( partialSoln );     
      }
      ttt++;
    }

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
  }


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
  appController.init(4);
});
