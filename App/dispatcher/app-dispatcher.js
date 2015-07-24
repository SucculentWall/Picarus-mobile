var Dispatcher = require('./dispatcher.js');
var objectAssign = require('object-assign');

var AppDispatcher = objectAssign(Dispatcher.prototype, {
  handleViewAction: function(action){
    this.dispatch(action)
  }
})

module.exports = AppDispatcher;
