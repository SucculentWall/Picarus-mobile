'use strict';

var React = require('react-native');
var HeaderTabStore = require('../../stores/app-headerTabStore.js');
var Separator = require('../helpers/separator.js');
var Gallery = require('../common/app-gallery.js');
var Requests = require('../common/app-requests.js');

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
    tabName: HeaderTabStore.getActiveTab(),
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
    console.log('SETSTATE called on Search view');
    this.setState(getData());
  }

  componentDidMount() {
    HeaderTabStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderTabStore.removeChangeListener(this._onChange);
  }

  render(){
    if (this.state.tabName === 'photos') {
      return (
        <Gallery photos={this.props.photos} />  
      );
    } else {
      return (
        <Requests requests={this.props.requests} />
      );
    }
    
  }
}

module.exports = Search;