'use strict';

var React = require('react-native');
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


class Search extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render(){
    if (this.props.tabName === 'photos') {
      return (
        <SearchGallery photos={this.props.photos} requests={this.props.requests} navigator={this.props.navigator} />  
      );
    } else {
      return (
        <SearchRequests photos={this.props.photos} requests={this.props.requests} navigator={this.props.navigator} />
      );
    }
    
  }
}

module.exports = Search;