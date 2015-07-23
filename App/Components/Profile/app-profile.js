'use strict';

var React = require('react-native');
var Separator = require('../Helpers/Separator.js');
var api = require('../../utils/api.js');
var ProfileComment = require('./profile-comment');
var ProfileRequest = require('./profile-request');

var {
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
  NavigatorIOS,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  userBar: {
    // margin: -100
  },
  rowContainer: {
    padding: 10,
  },
  avatar: {
    height: 350,
  },
  image: {
    height: 350,
  },
  container: {
    marginTop: 65,
    margin: 10,
    flex: 1,
    flexDirection: 'column',
  }
});


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      error: ''
    };
  }

  componentDidMount() {
    api.getUser(this.props.user_id)
      .then((data) => {
        this.setState({
          username: data.username,
          joinDate: data.created_at,
          avatar: data.avatar,
          karma: data.karma,
          requests: data.requests,
          comments: data.comments,
          dataSource: this.ds.cloneWithRows(data.photos),
        });
      }).catch();
  }

  renderHeader(state){
    var profileRequests = [];
    var profileComments = [];
    if (state.requests) {
      for (var i = 0; i < state.requests.length; i++) {
        profileRequests.push(<ProfileRequest navigator={this.props.navigator} data={state.requests[i]} />);
        profileComments.push(<ProfileComment navigator={this.props.navigator} data={state.comments[i]} />);
      }
    // console.log(profileRequests); 
    // console.log(profileComments); 
    }
    return (
      <View>
        <Image source={{uri: 'http://127.0.0.1:8888/img/' + state.avatar}} style={styles.avatar}/>
        <Separator/>
        <Text> Recent Requests </Text>
        {profileRequests}
        <Separator/>
        <Text> Recent Comments </Text>
        {profileComments}
        <Separator/>
        <Text> Recent Photos </Text>
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image source={{uri: 'http://127.0.0.1:8888/photos/small/' + rowData.filename}} style={styles.image}/>
          <Text> {rowData.description} </Text>
        </View>
        <Separator/>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <Text> {this.state.username} </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader.bind(this, this.state)}
          renderRow={this.renderRow}/>
      </View>
    )
  }

}

module.exports = Profile;