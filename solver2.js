

var solverModel = {
  size: 8,
  squares: [],
  remainingAvailable: [],
  solution: [],
  solutions: [],

  init: function(size) {
    this.size = size;
    var numSquares = Math.pow(this.size, 2);
    for ( var i = 0; i < numSquares; i++ ) {
      this.addSquare(i);
    }
  },

  addSquare: function(i) {
    this.squares.push( i );
    this.remainingAvailable.push( i );
  },

  rowNumber: function(i) {
    return Math.floor( i / this.size );
  },

  colNumber: function(i) {
    return  i % this.size;
  },

  solve: function( ) {
    var partialSoln = [];
    var currentRowNum = 0;

    this.iterateSolver( this.remainingAvailable.slice(), partialSoln, currentRowNum )
    if( this.solutions.length > 0 ) {
      console.log( "-----" );
      this.solution = this.solutions[0];
      console.log( "solved", this.solutions.length );           
    } else {
      console.log( "-----" );
      console.log("no solutions")
    }
  },

  iterateSolver: function( available, partialSoln, currentRowNum ) {
    if( partialSoln.length === this.size ) {
      this.solutions.push( partialSoln );
      return true;
    }

    if( available.length <= 0 ) {
      return false;
    }

    var newQueen;
    while( available[0] < (currentRowNum + 1) * this.size ) {
      newQueen = available[0];
      var newAvailable = this.removeNeighbors( newQueen, available);
      var newPartial = partialSoln.slice()
      newPartial.push( newQueen );
      this.iterateSolver( newAvailable, newPartial, currentRowNum + 1 )
      available.shift();
    }
    return false;
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

        var $squareDiv = $("<div> <div class='table'><div class='table-cell'></div></div></div>");
        $squareDiv.addClass('square');
        if( (row + col) % 2 === 0 ) {
          $squareDiv.addClass('dark-square');
        } else {
          $squareDiv.addClass('light-square');          
        }

        $squareDiv.data( 'square-id', squareIndex );
        $squareDiv.attr( 'id', 'square-' + squareIndex );
        $rowDiv.append($squareDiv);
      }
      this.$grid.append($rowDiv);
    }
  },

  showSolutionView: function() {
    for (var i = 0; i < this.model.squares.length; i++ ) {
      if( this.model.solution.indexOf(i) > -1 ) {
        var idString = '#square-' + i.toString();
        $squareDiv =  $(idString);
        $squareDiv.addClass('has-queen');
      }
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
    this.view.showSolutionView();
    console.log("there");
    // console.log(solverModel.squares);
  },
};

$(document).ready(function() {
  appController.init( 8 );
});
