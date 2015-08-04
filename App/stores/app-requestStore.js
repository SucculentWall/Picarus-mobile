///////////////////////////////////////////////////////////////////////////////////////
// NOTE: 
// this store is tied to the specific request page view: request-selected.js component
// NOT tied to app-request.js component
///////////////////////////////////////////////////////////////////////////////////////

var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

// the single request being shown on the page
var _request = {};
// the comments on the above single request
// each item within is an object tied to photoId key
var _comments = {};
// whether or not a photo is liked user_id: photo_id
var _likeLog = {};

function _receiveRequest(data) {
  _request = data;
}

function _receiveComments (photoData) {
  _comments[photoData.data.id] = photoData.data.comments;
}

function _receiveAllPhotoLikes (joinData) {
  // joinData is an array of objects
  _likeLog = {};
  for (var i = 0; i < joinData.length; i++) {
    var obj = joinData[i];
    _likeLog[obj.photo_id] = obj.user_id; 
  }
}


var RequestStore = objectAssign({},EventEmitter.prototype, {

  getPhotos: function() {
    return _request.photos; // an ARRAY of photos
  },

  getId: function () {
    return _request.id;
  },

  getUsername: function () {
    return _request.user.username;
  },

  getUserId: function () {
    return _request.user.id;
  },

  getTags: function () {
    return _request.tags; // [{tagname: 'dogs'}, {}, {} ]
  },

  getText: function () {
    return _request.text;
  },

  getNumComments: function(photoId){
    if (_comments[photoId]) {
      return _comments[photoId].length;
    }
  },

  getPhotoLikeStatus: function (user_id, photo_id) {
    // if the picture has 0 likes
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


  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },


  dispatcherIndex: AppDispatcher.register(function(payload){
    
    switch(payload.actionType) {

      case AppConstants.RECEIVE_REQUEST:
        _receiveRequest(payload.data);
        RequestStore.emitChange();
        break;

      default:
        return true;
    }

    return true;
  })

});

module.exports = RequestStore;
