var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";


var _photos = [];
var _requests = [];

function _receivePhotos(data) {
  _photos = data;
}

function _receiveRequests(data) {
  _requests = data;
}

var RecentsStore = objectAssign({},EventEmitter.prototype, {
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

      case AppConstants.RECEIVE_REQUESTS:
        _receiveRequests(payload.data);
        RecentsStore.emitChange();
        break;

      case AppConstants.RECEIVE_PHOTOS:
        _receivePhotos(payload.data);
        RecentsStore.emitChange();
        break;

      default:
        return true;
    }

    return true;
  })
});

module.exports = RecentsStore;
