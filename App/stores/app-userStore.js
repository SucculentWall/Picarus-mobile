var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

//  user data
var _user = {
  requests: [],
  comments: [],
  photos: []
};

function _receiveProfileInfo (data) {
  _user = data;
};

function _receiveRequest (requestData) {
  if (!_user.requests) _user.requests = [];
  _user.requests.push(requestData);
};

function _receiveComment (commentData) {
  if (!_user.comments) _user.comments = [];
  _user.comments.push(commentData);
};

function _receivePhoto (photoData) {
  if (!_user.photos) _user.photos = [];
  _user.photos.push(photoData);
};

function _receiveAvatar (filename, id) {
  id = +id;
  _user.id = +_user.id;
  if (_user.id === id) {
    _user.avatar = filename;
  }
};

var UserStore = objectAssign({},EventEmitter.prototype, {
  
  getUserId: function() {
    return _user.id;
  },

  getFacebookId: function() {
    return _user.FacebookId;
  },

  getUsername: function() {
    return _user.username;
  },

  getJoinDate: function() {
    return _user.created_at;
  },

  getUserKarma: function() {
    return _user.karma;
  },

  getRecentUserRequests: function(recent) {
    var recentUserRequests = [];
    if (!_user.requests) return [];
    for (var i = _user.requests.length-1; i >= 0 && i >= _user.requests.length-recent; i--) {
      recentUserRequests.push(_user.requests[i]);
    }
    return recentUserRequests;
  },

  getRecentUserComments: function(recent) {
    var recentUserComments = [];
    if (!_user.comments) return [];
    for (var i = _user.comments.length-1; i >= 0 && i >= _user.comments.length-recent; i--) {
      recentUserComments.push(_user.comments[i]);
    }
    return recentUserComments;
  },

  getUserPhotos: function() {
    return _user.photos;
  },

  getLikes: function(id){
    for (var i = 0; i < _user.photos.length; i++) {
      var aPhoto = _user.photos[i];
      if (aPhoto.id === id) {
        return aPhoto.likes;
      }    
    } 
    return 0;
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

  getDisplayToggle: function(id){
    return {
      showCommentEntry: _commentDisplay[id],
      showModal: _modalDisplay[id]
    };
  },

  getAvatar: function() {
    return _user.avatar;
  },

  getAllUserRequests: function() {
    return _user.requests;
  },

  getAllUserComments: function() {
    return _user.comments;
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

module.exports = UserStore;
