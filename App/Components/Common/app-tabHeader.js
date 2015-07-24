'use strict';

var React = require('react-native');
var AppActions = require('../../actions/app-actions.js');

var {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  tabItem: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  }
});


class Header extends React.Component {

  handlePress(tabName) {
    AppActions.changeTabView(tabName);
  }

  render(){
    return (
      <View style={styles.container}>
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

module.exports = Header;
