var solverModel = {
  size: 8,
  squares: [],
  remainingAvailable: [],
  solution: [],
  solutions: [],
  numSolutions: 0,

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
    if( this.numSolutions > 0 ) {
      console.log( "-----" );
      // this.solution = this.solutions[this.solutions.length - 1];
      console.log( "solved", this.numSolutions );           
    } else {
      console.log( "-----" );
      console.log("no solutions")
    }
  },

  iterateSolver: function( available, partialSoln, currentRowNum ) {
    if( partialSoln.length === this.size ) {
      // this.solutions.push( partialSoln );
      this.numSolutions++;
      this.solution = partialSoln;
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
