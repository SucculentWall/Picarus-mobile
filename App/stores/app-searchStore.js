var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";


var _photos = [];
var _requests = [];

function _receiveSearchResults(data) {
  _photos = data.photos;
  _requests = data.requests;
}

var SearchStore = objectAssign({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  

  getPhotos: function() {
    return _photos;
  },


  getRequests: function() {
    return _requests;
  },


  dispatcherIndex: AppDispatcher.register(function(payload){
    
    switch(payload.actionType) {

      case AppConstants.RECEIVE_SEARCH_RESULTS:
        _receiveSearchResults(payload.data);
        SearchStore.emitChange();
        break;

      default:
        return true;
    }

    return true;
  })
});

module.exports = SearchStore;
