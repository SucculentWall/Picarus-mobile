'use strict';

var React = require('react-native');
var AppActions = require('../../actions/app-actions.js');
var HeaderTabStore = require('../../stores/app-headerTabStore.js');
var RecentsStore = require('../../stores/app-recentsStore.js');
var Separator = require('../helpers/separator.js');
var Gallery = require('../common/app-gallery.js');
var Requests = require('../common/app-requests.js');

var self;

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
    marginTop: 64,
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


class Recents extends React.Component {

  constructor(props) {
    super(props);
    self = this;
    this.state = {
      tabName: this.props.tabName || 'photos',
      photos: [],
      requests: []
    };
  }

  _onChange() {
    self.setState(getData());
    console.log('SETSTATE called on Recents view: ', self.state);
  }

  componentDidMount() {
    console.log('MOUNTED: Recents view');
    HeaderTabStore.addChangeListener(this._onChange);
    RecentsStore.addChangeListener(this._onChange);
    AppActions.getRecents();
  }

  componentWillUnmount() {
    console.log('UNMOUNTED: Recents view');
    HeaderTabStore.removeChangeListener(this._onChange);
    RecentsStore.removeChangeListener(this._onChange);
  }

  render(){
    if (this.state.tabName === 'photos') {
      return (
        <Gallery navigator={this.props.navigator} photos={this.state.photos} />  
      );
    } else {
      return (
        <Requests navigator={this.props.navigator} requests={this.state.requests} />
      );
    }
    
  }
}

module.exports = Recents;