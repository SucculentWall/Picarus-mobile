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
  }

}

module.exports = AppActions;