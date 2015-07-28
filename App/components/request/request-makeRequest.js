'use strict';

var React = require('react-native');
var api = require('../../utils/api.js');
var AppActions = require('../../actions/app-actions');
var AuthStore = require('../../stores/app-authStore');

var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  makeRequest: {
    marginBottom: 60,
  }
});

class MakeRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRequest: '',
      error: ''
    };
  }

  handleSubmit() {
    var newRequest = this.state.newRequest;
    if (!newRequest.length) return;
    var username = AuthStore.getUsername();
    var tagRegEx = /\S*#(?:\[[^\]]+\]|\S+)/ig;
    var tags = newRequest.match(tagRegEx);
    var refinedTags;
    if (tags) {
      refinedTags = tags.map(function(tag){
        return tag.substr(1).toLowerCase();
      });
    }
    this.setState({newRequest: ''});
    AppActions.addRequest(newRequest, username, refinedTags);
  }

  render(){
    return (
      <View style={styles.makeRequest}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(newRequest) => this.setState({newRequest})}
          value={this.state.newRequest}/>
        <TouchableHighlight
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white'>
          <Text> Make New Request </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

module.exports = MakeRequest;