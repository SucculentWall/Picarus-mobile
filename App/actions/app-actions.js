var api = require('../utils/api');
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {

  changeTabView: function(tabName) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_TAB_VIEW,
      data: tabName
    });
  },

  getRecents: function() {
    api.getAllPhotos()
      .then((data) => {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.RECEIVE_PHOTOS,
          data: data
        });
      }).catch((err) => {
        console.log('Request failed', err);
      });

    api.getAllRequests()
      .then((data) => {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.RECEIVE_REQUESTS,
          data: data
        });
      }).catch((err) => {
        console.log('Request failed', err);
      });
  },

  addPhoto: function(photo, username, request_id, tags, description, size) {
    api.addPhoto(photo, username, request_id, tags, description, size);
  },

  addRequest: function(text, username, tags) {
    api.addRequest(text, username, tags);
  },

  loggedIn: function(data) {
    api.getUserInfo(data.token)
      .then((result) => {
        return api.findOrCreateUser(result.id, result.name);
      })
      .then((result) => {
        data.username = result.username;
        data.id = result.id;
        AppDispatcher.handleViewAction({
          actionType: AppConstants.LOGGED_IN,
          data: data
        });
      });
  },

  notLoggedIn: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NOT_LOGGED_IN
    });
  }

};

module.exports = AppActions;