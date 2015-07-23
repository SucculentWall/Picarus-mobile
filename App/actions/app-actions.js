var api = require('../utils/api');
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  changeSearchView: function(tabName) {

    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_SEARCH_VIEW,
      data: tabName
    });
  },
}

module.exports = AppActions;