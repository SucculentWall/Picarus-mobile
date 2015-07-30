'use strict';

var React = require('react-native');
var AppConstants = require('../../constants/app-constants.js');
var AppActions = require('../../actions/app-actions.js');
var Separator = require('../helpers/separator.js');
var api = require('../../utils/api.js');
var AuthStore = require('../../stores/app-authStore');
var self;

var PhotoStore = require('../../stores/app-photoStore');

var {
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  NavigatorIOS,
  TextInput
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
    marginTop: 64,
    margin: 10,
    flex: 1,
    flexDirection: 'column',
  },
    username: {
    color: '#523A54',
    textAlign: 'right',
    fontSize: 10
  }
});

function getData (){
  return {
    // get state properties from photo store
    photoObj: PhotoStore.getPhotoObj()
  };
};

class Photo extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    self.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    var comms = getData().photoObj.comments;
    console.log('these are comms: ', comms);
    self.state = {
      comments: getData().photoObj.comments || [],
      filename: getData().photoObj.filename || '',
      id: getData().photoObj.id || -1,
      likes: getData().photoObj.likes || 0,
      tags: getData().photoObj.tags || [],
      username: getData().photoObj.username || '',
      dataSource: self.ds.cloneWithRows([]),
      newComment: '',
      error: ''
    }
  }

  _onChange() {
    self.setState({
      filename: getData().photoObj.filename,
      comments: getData().photoObj.comments,
      id: getData().photoObj.id,
      likes: getData().photoObj.likes,
      tags: getData().photoObj.tags,
      username: getData().photoObj.username
      // error: ''
    });
    console.log('here are comments ', self.state.comments, self.state.dataSource);
    self.setState({
      dataSource: self.ds.cloneWithRows(self.state.comments)
    });
  }

  componentDidMount() {
    PhotoStore.addChangeListener(this._onChange);
    AppActions.getInfoForPhoto(this.props.photoId);
  }

  componentWillUnmount() {
    PhotoStore.removeChangeListener(this._onChange);
  }

  handleSubmit() {
    var newComment = self.state.newComment;
    if (!newComment.length) return;
    var username = AuthStore.getUsername();
    self.setState({newComment: ''});
    AppActions.addComment(newComment, username, self.state.id);
  }

  renderHeader(state){
    return (
      <View>
        <Text> {self.state.comments.length} comments </Text>
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData.text} </Text>
          <Text style={styles.username}> Submitted by: {rowData.username} </Text>
        </View>
      <Separator />
      </View>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={{uri: AppConstants.PHOTOS_HOST + self.state.filename}} style={styles.image}/>
        <Text> {self.state.likes} likes</Text>
        <ListView 
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:49}}
          dataSource={self.state.dataSource} 
          renderHeader={self.renderHeader}
          renderRow={self.renderRow} />
        <Text>Make a comment </Text>  
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(newComment) => self.setState({newComment})}
          value={self.state.newComment}/>
        <TouchableHighlight
          onPress={self.handleSubmit}
          underlayColor='white'>
          <Text> Submit! </Text>
          </TouchableHighlight>
      </View>
    )
  }

}

module.exports = Photo;