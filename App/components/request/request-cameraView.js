'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var UploadPhoto = require('./request-uploadPhoto');

var {
  CameraRoll,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});

class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.constants.Type.back
    };
  }

  render() {

    return (
      <Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this._onBarCodeRead}
        type={this.state.cameraType}>
        <TouchableHighlight onPress={this._switchCamera}>
          <Text>Switch Camera</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._takePicture}>
          <Text>Upload Picture</Text>
        </TouchableHighlight>
      </Camera>
    );
  }

  _onBarCodeRead(e) {
    console.log(e);
  }

  _switchCamera() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  }

  _takePicture() {
    this.refs.cam.capture(function(err, data) {
      console.log(err, data);
      this.props.data.navigator.push({
      title: 'Submit Data',
      component: UploadPhoto,
      passProps: {
        // data should have uri property
        data: data,
        request_id: this.props.data.request_id,
        tags: this.props.data.tags,
        navigator: this.props.data.navigator
        }
      });
    });
  }

}

module.exports = CameraView;
