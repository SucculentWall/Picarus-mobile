'use strict';

var React = require('react-native');
var AppActions = require('../../actions/app-actions.js');
var HeaderTabStore = require('../../stores/app-headerTabStore.js');
var RecentsStore = require('../../stores/app-recentsStore.js');
var Separator = require('../Helpers/Separator.js');
var Gallery = require('../Common/app-gallery.js');
var Requests = require('../Common/app-requests.js');

var {
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
    flexDirection: 'row',
  }
});

function getData (){
  return {
    tabName: HeaderTabStore.getActiveTab(),
    photos: RecentsStore.getPhotos(),
    requests: RecentsStore.getRequests()
  };
};


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabName: this.props.tabName || 'photos',
      photos: RecentsStore.getPhotos(),
      requests: RecentsStore.getRequests()
    };
  }

  _onChange() {
    console.log('SETSTATE called on Recents view');
    this.setState(getData());
  }

  componentDidMount() {
    console.log('MOUNTED: Recents view');
    AppActions.getRecents();
    HeaderTabStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    console.log('UNMOUNTED: Recents view');
    HeaderTabStore.removeChangeListener(this._onChange.bind(this));
  }

  render(){
    if (this.state.tabName === 'photos') {
      return (
        <Gallery photos={this.state.photos} />  
      );
    } else {
      return (
        <Requests requests={this.state.requests} />
      );
    }
    
  }
}

module.exports = Search;