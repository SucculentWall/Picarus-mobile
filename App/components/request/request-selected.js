'use strict';

var React = require('react-native');
var AppConstants = require('../../constants/app-constants.js');
var AppActions = require('../../actions/app-actions.js');
var RequestStore = require('../../stores/app-requestStore.js');
var api = require('../../utils/api.js');
var Separator = require('../helpers/separator.js');
var Profile = require('../profile/app-profile');
var Photo = require('../photo/app-photo.js');
var CameraRollView = require('./request-cameraRollView');
var { Icon, } = require('react-native-icons');

var self;

var {
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
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
  row: {
    flexDirection: 'row',
  },
  rowSpaced: {
    flex: 1,
    flexDirection: 'row',
  },
  pullRight: {
    textAlign: 'right',
  },
  title: {
    backgroundColor: '#5F4461',
    justifyContent: 'center',
    padding: 5,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center'
  },
  subtitle: {
    color: '#fff',
  },
  subtitleRight: {
    color: '#fff',
    textAlign: 'right',
  }
});

var getData = function () {
  var result = {
    photos: RequestStore.getPhotos(),
    id: RequestStore.getId(),
    username: RequestStore.getUsername(),
    userId: RequestStore.getUserId(),
    tags: RequestStore.getTags(),
    text: RequestStore.getText()
  };
  return result;
}


class SelectedRequest extends React.Component {

  constructor(props) {
    super(props);
    self = this;
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      photos: [],
      username: '',
      userId: null,
      tags: [],
      text: ''
    };
  }

  _onChange() {
    self.setState(getData());
  }

  componentDidMount() {
    RequestStore.addChangeListener(this._onChange);
    AppActions.getRequest(this.props.request_id);
  }

  componentWillUnmount() {
    RequestStore.removeChangeListener(this._onChange);
  }


  handlePressUser(rowData) {
    this.props.navigator.push({
      title: rowData.username,
      component: Profile,
      passProps: {
        user_id: rowData.user_id,
        navigator: this.props.navigator
      }
    });
  }

  handlePressPhoto(rowData) {
    this.props.navigator.push({
      title: rowData.description,
      component: Photo,
      passProps: {
        photoId: rowData.id,
        navigator: this.props.navigator
      }
    });
  }

  cameraRoll() {
    this.props.navigator.push({
      title: 'Camera Roll',
      component: CameraRollView,
      passProps: {
        request_id: this.props.request_id,
        tags: this.state.tags,
        navigator: this.props.navigator
      }
    });
  }

  renderHeader(){
    var tags = [];
    for (var i=0; i<this.state.tags.length; i++){
      tags.push(this.state.tags[i].tagname);
    }


    return (
      <View style={styles.title}>
        <Text style={styles.titleText}>{this.state.text}</Text>
        <Text style={styles.subtitle}>Tags: {tags.join(' ')}</Text>
        <Text style={styles.subtitleRight}>Requested by: {this.state.username}</Text>
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          
          <TouchableHighlight
            onPress={this.handlePressPhoto.bind(this, rowData)}
            underlayColor='white'> 
            <View>
              <Image source={{uri: AppConstants.PHOTOS_HOST + rowData.filename}} style={styles.image}/>  
              <View style={styles.rowSpaced}>
                <Text> {rowData.likes} likes </Text>
                <Text style={styles.pullRight}>{rowData.comments} comments</Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={styles.row}>
            <Text style={styles.username}> Submitted by: </Text>
            <TouchableHighlight
              onPress={this.handlePressUser.bind(this, rowData)}
              underlayColor='white'> 
              <Text> {rowData.username} </Text>
            </TouchableHighlight>
          </View>  
          <Text> {rowData.description} </Text>
        
        </View>
        <Separator/>
      </View>
    )
  }

  render(){
    var dataSource = this.ds.cloneWithRows(this.state.photos);

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.renderRow.bind(this)} />
        <TouchableHighlight
          onPress={this.cameraRoll.bind(this)}
          underlayColor='white'>
          <View style={styles.iconcontainer}>
            <Icon
              name='ion|images'
              size={40}
              color='#000'
              style={styles.icon} />
            <Text> Upload Photo</Text>
          </View>
          </TouchableHighlight>
      </View>
    )
  }
}

module.exports = SelectedRequest;