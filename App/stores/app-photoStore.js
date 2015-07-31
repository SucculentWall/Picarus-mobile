var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _photoObj = {};
var _likeLog = {};

function _receivePhoto(data) {
  _photoObj = data;
}

function _receiveAllPhotoLikes (joinData) {
  // joinData is an array of objects
  _likeLog = {};
  for (var i = 0; i < joinData.length; i++) {
    var obj = joinData[i];
    _likeLog[obj.photo_id] = obj.user_id; 
  }
}

function _updatePhotoLikes (data) {
  var likeOrUnlike = data.likeOrUnlike; // true or false
  var photoId = data.id;
  var currUserId = data.currUserId;
  // if was a like
  if (likeOrUnlike) {
    // put in log
    _likeLog[photoId] = currUserId;
  } else {
    // remove from log
    delete _likeLog[photoId];
  }
  _photoObj.likes = data.likes;
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

  getPhotoLikeStatus: function(user_id, photo_id) {
    // check photos_users
    if (Object.keys(_likeLog).length === 0) {
      return true;
    }
    if (_likeLog[photo_id] !== user_id) {
      // this is how we try to init unliked
      return true;
    } else {
      return false;
    }
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    
    switch(payload.actionType) {

      case AppConstants.RECEIVE_PHOTO:
        _receivePhoto(payload.data);
        PhotoStore.emitChange();
        break;

      // case AppConstants.RECEIVE_LIKE_CHECK:
      //   console.log('from receive like check: ', payload);
      //   _receiveLikeCheck(payload.data);
      //   PhotoStore.emitChange();
      //   break;

      case AppConstants.LIKE_PHOTO:
        _updatePhotoLikes(payload.data);
        PhotoStore.emitChange();
        break;

      case AppConstants.RECEIVE_PHOTO_LIKES:
        _receiveAllPhotoLikes(payload.data);
        PhotoStore.emitChange();
        break;

      default:
        return true;
    }

    return true;
  })
});

module.exports = PhotoStore;
