
var appController = {

  model: solverModel,
  view: boardView,

  init: function(size) {
    var start =new Date();
    console.log('start', start);
    this.model.init(size);
    this.view.init();

    this.model.solve();
    this.view.showSolutionView();
    var finish =new Date();
    console.log("finished", finish );
    console.log("elapsed", finish - start, "milliseconds" );
  },
};

$(document).ready(function() {
  appController.init( 8 );
});
