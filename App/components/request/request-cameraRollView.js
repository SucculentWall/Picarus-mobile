'use strict';

var React = require('react-native');
var api = require('../../utils/api.js');
var Separator = require('../helpers/separator.js');
var CameraView = require('./request-cameraView');
var UploadPhoto = require('./request-uploadPhoto');
var { Icon, } = require('react-native-icons');

var {
  CameraRoll,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  iconcontainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    height: 40,
    width: 40
  },
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
  margintop: {
    margin: 10,
    marginTop:65,
    flex: 1,
    flexDirection: 'column',
  }
});


class CameraRollView extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      error: ''
    };
  }

  componentDidMount() {
    var context = this;
    CameraRoll.getPhotos({ first: 20 }, 
      // success
      function(photos) {
        context.setState({
          dataSource: context.ds.cloneWithRows(photos.edges)
        });
      }, 
      // error
      function(err) {
        console.log('CameraRoll ',err);
      });
  }

  submitPhoto(data) {
    this.props.navigator.push({
    title: 'Submit Data',
    component: UploadPhoto,
    passProps: {
      // data should have uri property
      image: data.uri,
      request_id: this.props.request_id,
      tags: this.props.tags,
      navigator: this.props.navigator
      }
    });
  }

  takeNewPhoto() {
    this.props.navigator.push({
    title: 'Take New Photo',
    component: CameraView,
    passProps: {
      navigator: this.props.navigator
      }
    });
  }

  renderRow(rowData) {
    return (
      <View style={styles.rowContainer}>
      <TouchableOpacity
        onPress={this.submitPhoto.bind(this, rowData.node.image)}>
        <Image source={{uri: rowData.node.image.uri}} style={styles.image}/>
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />

        <TouchableHighlight
          onPress={this.takeNewPhoto.bind(this)}
          underlayColor='white'> 
          <View style={styles.iconcontainer}>
            <Icon
              name='ion|camera'
              size={40}
              color='#000'
              style={styles.icon} />
            <Text> Take New Photo </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = CameraRollView;