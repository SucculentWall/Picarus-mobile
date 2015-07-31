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
  likesContainer: {
    flexDirection: 'row'
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
}

var checkLiked = function(id){
  var currUserId = AuthStore.getId() || 0;
  // return bool based on whether there is entry in join table
  return PhotoStore.getPhotoLikeStatus(currUserId, id);
}

class Photo extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    self.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    var comms = getData().photoObj.comments;
    self.state = {
      comments: getData().photoObj.comments || [],
      filename: getData().photoObj.filename || '',
      id: getData().photoObj.id || 0,
      likes: getData().photoObj.likes,
      tags: getData().photoObj.tags || [],
      username: getData().photoObj.username || '',
      dataSource: self.ds.cloneWithRows([]),
      request_id: getData().photoObj.request_id || 0,
      newComment: '',
      currUserId: AuthStore.getId(),
      error: ''
    };
    self.state.notYetLiked = checkLiked(self.state.id) || false;
  }

  _onId(){
    self.setState({
      currUserId: AuthStore.getId(),
      notYetLiked: checkLiked(self.state.id)
    });
  }

  _onChange() {
    self.setState({
      filename: getData().photoObj.filename,
      comments: getData().photoObj.comments,
      id: getData().photoObj.id,
      likes: getData().photoObj.likes,
      tags: getData().photoObj.tags,
      username: getData().photoObj.username,
      request_id: getData().photoObj.request_id
      // error: ''
    });
    self.setState({
      notYetLiked: checkLiked(self.state.id),
      dataSource: self.ds.cloneWithRows(self.state.comments)
    });
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onId);
    PhotoStore.addChangeListener(this._onChange);
    AppActions.getInfoForPhoto(this.props.photoId);
    AppActions.getPhotoLikes(AuthStore.getId());
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onId);
    PhotoStore.removeChangeListener(this._onChange);
  }

  handleSubmit() {
    var newComment = self.state.newComment;
    if (!newComment.length) return;
    var username = AuthStore.getUsername();
    self.setState({newComment: ''});
    AppActions.addComment(newComment, username, self.state.id, self.state.request_id);
  }

  handleLike(){
    // set Like vs Unlike display optimistically
    self.setState({notYetLiked: false});
    AppActions.likeOrUnlikePhoto(self.state.id, self.state.currUserId, true);
  }

  handleUnlike(){
    self.setState({notYetLiked: true});
    AppActions.likeOrUnlikePhoto(self.state.id, self.state.currUserId, false);
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
    // console.log('user has not yet liked: ',self.state.notYetLiked);
    // console.log('self.state.likes: ', self.state.likes);
    return (
      <View style={styles.container}>
        <Image source={{uri: AppConstants.PHOTOS_HOST + self.state.filename}} style={styles.image}/>
        <View style={styles.likesContainer}>
          {self.state.notYetLiked ? 
            <TouchableHighlight
              onPress={self.handleLike}
              underlayColor='grey'>
              <Text> Like </Text>
            </TouchableHighlight>: 
            <TouchableHighlight
              onPress={self.handleUnlike}
              underlayColor='grey'>
              <Text> Unlike </Text>
            </TouchableHighlight>}
          <Text> {self.state.likes} likes</Text>
        </View>
        <ListView 
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:49}}
          dataSource={self.state.dataSource} 
          renderHeader={self.renderHeader}
          renderRow={self.renderRow} />
        <Text> Make a comment </Text>  
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