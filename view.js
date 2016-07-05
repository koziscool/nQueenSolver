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

