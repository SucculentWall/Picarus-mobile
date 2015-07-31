'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var { Icon, } = require('react-native-icons');

var {
  CameraRoll,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  iconcontainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    height: 70,
    width: 70
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
        <TouchableHighlight
          onPress={this._takePicture.bind(this)}>
          <View style={styles.iconcontainer}>
            <Icon
              name='ion|camera'
              size={70}
              color='#fff'
              style={styles.icon} />
          </View>
        </TouchableHighlight>
      </Camera>
    );
  }

}

module.exports = CameraView;
