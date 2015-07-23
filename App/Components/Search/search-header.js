'use strict';

var React = require('react-native');
// var Search = require('./Search.js');  // Moved to funtion scope to avoid cyclic dependency

var {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 20,
    textAlign: 'center',
  }
});


class SearchHeader extends React.Component {

  handlePress(tabName) {
    var Search = require('./Search.js');

    this.props.navigator.push({
      title: tabName,
      component: Search,
      passProps: {
        photos: this.props.photos, 
        requests: this.props.requests,
        tabName: tabName,
        navigator: this.props.navigator
      }
    });
  }

  render(){
    return (
      <View style={styles.tabContainer}>
        <TouchableHighlight style={styles.tabContainer}
          onPress={this.handlePress.bind(this, 'photos')}
          underlayColor='white'> 
          <Text style={styles.tabItem}>Photos</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tabContainer}
          onPress={this.handlePress.bind(this, 'requests')}
          underlayColor='white'> 
          <Text style={styles.tabItem}>Requests</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = SearchHeader;
