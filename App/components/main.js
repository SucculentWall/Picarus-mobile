'use strict';

var React = require('react-native');
var Recents = require('./recents/recents.js');
var Requests = require('./request/app-request');
var Profile = require('./profile/app-profile');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    flexDirection: 'column',
  },
  tabContent: {
    backgroundColor: '#5F4461',
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin:70,
    fontSize: 45,
    color: '#ffffff'
  }
});


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'recents'
    }
  }
  setTab(tabId){
    this.setState({selectedTab: tabId})
  }
  render(){
    return (
        <TabBarIOS>
          <TabBarIOS.Item 
          selected={this.state.selectedTab === 'recents'}
          onPress={() => this.setTab('recents')}
          systemIcon="recents">
            <Recents navigator={this.props.navigator} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
          selected={this.state.selectedTab === 'search'}
          onPress={() => this.setTab('search')}
          systemIcon="search">
            <Requests navigator={this.props.navigator} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => this.setTab('favorites')}
          systemIcon="favorites">
            <Profile navigator={this.props.navigator} user_id='1' />
          </TabBarIOS.Item>
          <TabBarIOS.Item
          selected={this.state.selectedTab === 'more'}
          onPress={() => this.setTab('more')}
          systemIcon="more">
            <View style={styles.tabContent}>
              <Text style={styles.tabText}>More</Text>
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

module.exports = Main;