'use strict';

var React = require('react-native');
var Recents = require('./recents/recents.js');
var Requests = require('./request/app-request');
var Profile = require('./profile/app-profile');
var AuthStore = require('../stores/app-authStore.js');
var About = require('./about/app-about');
var { TabBarIOS, } = require('react-native-icons');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
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
          name='New'
          iconName={'ion|star'}
          title={'New'}
          iconSize={32}
          selected={this.state.selectedTab === 'recents'}
          onPress={() => this.setTab('recents')}>
            <Recents navigator={this.props.navigator} />
          </TabBarIOS.Item>

          <TabBarIOS.Item
          name='Search'
          iconName={'ion|search'}
          title={'Search'}
          iconSize={32}
          selected={this.state.selectedTab === 'search'}
          onPress={() => this.setTab('search')}>
            <Requests navigator={this.props.navigator} />
          </TabBarIOS.Item>

          <TabBarIOS.Item
          name='Profile'
          iconName={'ion|person'}
          title={'Profile'}
          iconSize={32}
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => this.setTab('favorites')}>
          {/* user_id hardcoded */}
            <Profile navigator={this.props.navigator} user_id='1' />
          </TabBarIOS.Item>
          
          <TabBarIOS.Item
          name='About'
          iconName={'ion|information'}
          title={'About'}
          iconSize={32}
          selected={this.state.selectedTab === 'more'}
          onPress={() => this.setTab('more')}>
            <About navigator={this.props.navigator} />
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

module.exports = Main;