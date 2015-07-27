var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _user = {};

var _logout = function() {
  _user = {};
};

var _logIn = function(data) {
  _user.FacebookId = data.userId;
  _user.id = data.id;
  _user.username = data.username;
  _user.token = data.token;
};

var AuthStore = objectAssign({},EventEmitter.prototype, {
  loggedIn: function() {
    return _user.username !== undefined;
  },

  getId: function() {
    return _user.id;
  },

  getFacebookId: function() {
    return _user.FacebookId;
  },

  getUsername: function() {
    return _user.username;
  },

  getToken: function() {
    return _user.token;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    switch(payload.actionType) {

      case AppConstants.LOGGED_IN:
        _logIn(payload.data);
        AuthStore.emitChange();
        break;

      case AppConstants.NOT_LOGGED_IN:
        _logOut();
        AuthStore.emitChange();
        break;

      default:
        return true;
    }
  })

});


module.exports = AuthStore;

