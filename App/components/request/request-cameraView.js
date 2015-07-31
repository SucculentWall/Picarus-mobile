'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var Icon = require('react-native-icons');

var {
  CameraRoll,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

class CameraView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.constants.Type.back
    };
  }

  _onBarCodeRead(e) {
    console.log(e);
  }

  _takePicture() {
    var context = this.props.data;
    this.refs.cam.capture();
    this.props.navigator.pop();
  }

  render() {

    return (
      <Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this._onBarCodeRead}
        type={this.state.cameraType}>
        <TouchableOpacity
          style={styles.button}
          onPress={this._takePicture.bind(this)}>
        </TouchableOpacity>
      </Camera>
    );
  }
}

module.exports = CameraView;
