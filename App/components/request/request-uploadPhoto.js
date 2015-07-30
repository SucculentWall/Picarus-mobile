'use strict';

var React = require('react-native');
var api = require('../../utils/api.js');
var AppActions = require('../../actions/app-actions');
var AuthStore = require('../../stores/app-authStore');

var {
  View,
  Image,
  Text,
  TextInput,
  ListView,
  TouchableHighlight,
  StyleSheet,
  NativeModules
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

function b64toBlob(b64) {
  var binary = atob(b64);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: ''
    };
    NativeModules.ReadImageData.readImage(this.props.image, (image) => {
      var blob = b64toBlob(image);
      this.setState({image: blob});
    });
  }

  handleSubmit() {
    var username = AuthStore.getUsername();
    var request_id = this.props.request_id;
    var photo = this.state.image;
    var tags = this.props.tags;
    var description = this.state.description;
    AppActions.addPhoto(photo, username, request_id, tags, description);
    this.props.navigator.popN(2);
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.image}} style={styles.image}/>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}/>
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