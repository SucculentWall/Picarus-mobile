'use strict';

var React = require('react-native');
var AppConstants = require('../../constants/app-constants.js');
var AppActions = require('../../actions/app-actions.js');
var Separator = require('../helpers/separator.js');
var api = require('../../utils/api.js');
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
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    self.state = {
      comments: getData().photoObj.comments || [],
      filename: getData().photoObj.filename || '',
      id: getData().photoObj.id || -1,
      likes: getData().photoObj.likes || 0,
      tags: getData().photoObj.tags || [],
      username: getData().photoObj.username || '',
      dataSource: this.ds.cloneWithRows([]),
      error: ''
    }
  }

  _onChange() {
    self.setState({
      filename: getData().photoObj.filename
    });
  }

  componentDidMount() {
    PhotoStore.addChangeListener(this._onChange);
    AppActions.getInfoForPhoto(this.props.photoId);
  }

  componentWillUnmount() {
    PhotoStore.removeChangeListener(this._onChange);
  }


  renderHeader(state){
    return (
      <View>
        <Text>HEADER</Text>
      </View>
    );
    // TODO: render photo image and description

    // var profileRequests = [];
    // var profileComments = [];
    // if (state.requests) {
    //   for (var i = 0; i < state.requests.length; i++) {
    //     // profileRequests.push(<ProfileRequest navigator={this.props.navigator} data={state.requests[i]} />);
    //     // profileComments.push(<ProfileComment navigator={this.props.navigator} data={state.comments[i]} />);
    //   }
    // // console.log(profileRequests); 
    // // console.log(profileComments); 
    // }
    // return (
    //   <View>
    //     <Image source={{uri: AppConstants.PHOTOS_HOST + state.avatar}} style={styles.avatar}/>
    //     <Separator/>
    //     <Text> Recent Requests </Text>
    //     {profileRequests}
    //     <Separator/>
    //     <Text> Recent Comments </Text>
    //     {profileComments}
    //     <Separator/>
    //     <Text> Recent Photos </Text>
    //   </View>
    // );
  }

  renderRow(rowData) {
    return (
      <View>
        <Text>renderRow</Text>
      </View>
    );
    // TODO render comments

    // return (
    //   <View>
    //     <View style={styles.rowContainer}>
    //       <Image source={{uri: AppConstants.PHOTOS_HOST + rowData.filename}} style={styles.image}/>
    //       <Text> {rowData.description} </Text>
    //     </View>
    //     <Separator/>
    //   </View>
    // )
  }

  render(){
    return (
      <View style={styles.container}>
        {/*<Text> {this.state.username} </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader.bind(this, this.state)}
          renderRow={this.renderRow}/>*/}
        <Text> image filename is {self.state.filename}</Text>
        <Image source={{uri: AppConstants.PHOTOS_HOST + self.state.filename}} style={styles.image}/>

      </View>
    )
  }

}

module.exports = Photo;