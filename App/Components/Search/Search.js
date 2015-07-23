'use strict';

var React = require('react-native');
var SearchStore = require('../../stores/app-searchStore.js');
var Separator = require('../Helpers/Separator.js');
var SearchGallery = require('./search-gallery.js');
var SearchRequests = require('./search-requests.js');

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
    backgroundColor: '#F5FCFF',
  }
});

function getData (){
  return {
    tabName: SearchStore.getActiveTab(),
  };
};



class Search extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      tabName: this.props.tabName || 'photos'
    };
  }

  _onChange() {
    this.setState(getData());
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    SearchStores.removeChangeListener(this._onChange);
  }

  render(){
    if (this.state.tabName === 'photos') {
      return (
        <SearchGallery photos={this.props.photos} />  
      );
    } else {
      return (
        <SearchRequests requests={this.props.requests} />
      );
    }
    
  }
}

module.exports = Search;