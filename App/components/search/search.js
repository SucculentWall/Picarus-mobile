'use strict';

var React = require('react-native');
var AppActions = require('../../actions/app-actions.js');
var HeaderTabStore = require('../../stores/app-headerTabStore.js');
var SearchStore = require('../../stores/app-searchStore.js');
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
  TouchableHighlight,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});

function getData (){
  return {
    tabName: HeaderTabStore.getActiveTab(),
    photos: SearchStore.getPhotos(),
    requests: SearchStore.getRequests()
  };
};



class Search extends React.Component {
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
    console.log(self);
    console.log('SETSTATE called on Search view');
    self.setState(getData());
  }

  componentDidMount() {
    console.log('MOUNTED: Search view');
    AppActions.getSearch(this.props.searchQuery);
    SearchStore.addChangeListener(this._onChange);
    HeaderTabStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    console.log('UNMOUNTED: Search view');
    SearchStore.removeChangeListener(this._onChange);
    HeaderTabStore.removeChangeListener(this._onChange);
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

module.exports = Search;