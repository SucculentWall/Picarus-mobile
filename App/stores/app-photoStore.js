var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _photoObj = {};

function _receivePhoto(data) {
  _photoObj = data;
}

var PhotoStore = objectAssign({},EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  

  getPhotoObj: function() {
    return _photoObj;
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    
    switch(payload.actionType) {

      case AppConstants.RECEIVE_PHOTO:
        _receivePhoto(payload.data);
        PhotoStore.emitChange();
        break;

      default:
        return true;
    }

    return true;
  })
});

module.exports = PhotoStore;
