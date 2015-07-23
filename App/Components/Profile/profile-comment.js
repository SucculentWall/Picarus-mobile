'use strict';

var React = require('react-native');
var api = require('../../utils/api.js');
var SelectedRequest = require('../SelectedRequest');

var {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
  },
  image: {
    height: 350,
  },
  container: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    height: 40,
    backgroundColor: '#5F4461',
    justifyContent: 'center'
  },
  titleText: {
    color: '#fff',
    alignSelf: 'center'
  }
});

class ProfileComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handlePress(data) {
    api.getRequest(data.user_id)
      .then((res) => {
        this.props.navigator.push({
          title: res.text,
          component: SelectedRequest,
          passProps: {
            photos: res.photos,
            tags: res.tags,
            user: res.user
          }
        });
      });
  //   this.props.navigator.push({
  //     title: data.username,
  //     component: SelectedRequest,
  //     passProps: {
  //       user_id: data.user_id
  //     }
  //   });
  }

  render(){
    var formattedDate = new Date(this.props.data.created_at).toLocaleString();
    return (
      <View>
        <Text> {formattedDate} </Text>
        <TouchableHighlight
          onPress={this.handlePress.bind(this, this.props.data)}
          underlayColor='white'> 
          <Text> {this.props.data.text} </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
      // {!this.props.data ? null : 'sup'}

module.exports = ProfileComment;
