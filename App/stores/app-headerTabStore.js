var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

// default to showing photos
var _showTab = 'photos';


function _changeTabView(tabName) {
  _showTab = tabName;
}


var HeaderTabStore = objectAssign(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },


  getActiveTab: function () {
    return _showTab;
  },


  dispatcherIndex: AppDispatcher.register(function(payload){
    
    switch(payload.actionType) {

      case AppConstants.CHANGE_TAB_VIEW:
        _changeTabView(payload.data);
        HeaderTabStore.emitChange();
        break;

      default:
        return true;
    }

    return true;
  })
});

module.exports = HeaderTabStore;
