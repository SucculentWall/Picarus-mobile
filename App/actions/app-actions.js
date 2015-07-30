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

  getRequest: function (requestId) {
    api.getRequest(requestId)
      .then((data) => {
        console.log('AppActions.getRequest data result: ', data);
        AppDispatcher.handleViewAction({
          actionType: AppConstants.RECEIVE_REQUEST,
          data: data
        }).catch((err) => {
          console.log('getSearch request failed.  Error: ', err);
        });
      });
  },

  getSearch: function (query) {
    api.getSearch(query)
      .then((data) => {
        console.log('AppActions.getSearch data result: ', data);
        AppDispatcher.handleViewAction({
          actionType: AppConstants.RECEIVE_SEARCH_RESULTS,
          data: data
        }).catch((err) => {
          console.log('getSearch request failed.  Error: ', err);
        });
      });
  },

  getInfoForPhoto: function(photoId) {
    console.log('getInfoForPhoto fired with photoId: ', photoId);
    api.getInfoForPhoto(photoId)
      .then((data) => {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.RECEIVE_PHOTO,
          data: data
        }).catch((err) => {
          console.log('getInfoForPhoto failed.  Error: ', err);
        });
      });
  },

  addPhoto: function(photo, username, request_id, tags, description) {
    api.addPhoto(photo, username, request_id, tags, description);
  },

  addRequest: function(text, username, tags) {
    api.addRequest(text, username, tags)
      .then((result) => {
        AppActions.getRecents();
      });
  },

  addComment: function(text, username, photoId) {
    api.addComment(text, username, photoId)
      .then((result) => {
        console.log('this is from addComment: ', result);
        AppActions.getInfoForPhoto(photoId);
      })
  },

  loggedIn: function(data) {
    console.log('loggedIn data: ', data);
    api.getUserInfo(data.token)
      .then((result) => {
        return api.findOrCreateUser(result.id, result.name, data.token);
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