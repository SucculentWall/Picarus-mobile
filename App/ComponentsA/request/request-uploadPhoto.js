'use strict';

var React = require('react-native');
var api = require('../../utils/api.js');
var AppActions = require('../../actions/app-actions');
// TODO: photostore

var {
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
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

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.data.uri,
      navigator: this.props.navigator,
      error: ''
    };
  }

  handleSubmit() {
    var username = '';
    var request_id = 0;
    var photo = this.state.image;
    var tags = [];
    var description = '';
    var size;
    console.log(photo, username, request_id, tags, description, size);
    // AppActions.addPhoto(photo, username, request_id, tags, description, size);
    this.state.navigator.popN(2);
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.image}} style={styles.image}/>
        <TouchableHighlight
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white'>
          <Text> Submit Photo </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

module.exports = UploadPhoto;