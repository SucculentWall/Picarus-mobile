var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";


var _photos = [];
var _requests = [];

var _showTab = 'photos';


function _changeSearchView(tabName) {
  console.log('searchStore _changeSearchView funtion fired');
  _showTab = tabName;
}


var SearchStore = objectAssign(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  

  getState: function() {
    return {
      photos: _photos,
      requests: _requests
    }
  },

  getActiveTab: function () {
    return _showTab;
  },


  dispatcherIndex: AppDispatcher.register(function(payload){
    
    switch(payload.actionType) {

      case AppConstants.CHANGE_SEARCH_VIEW:
        _changeSearchView(payload.data);
        break;


      default:
        return true;
    }

    SearchStore.emitChange();

    return true;
  })
});

module.exports = SearchStore;
