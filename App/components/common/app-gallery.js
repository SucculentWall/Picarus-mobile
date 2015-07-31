'use strict';

var React = require('react-native');
var AppConstants = require('../../constants/app-constants.js');
var Separator = require('../helpers/separator.js');
var RecentsHeader = require('./app-tabHeader.js');
var Photo = require('../photo/app-photo.js');
var Profile = require('../profile/app-profile.js');

var {
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
  NavigatorIOS,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
  },
  image: {
    height: 350,
  },
  container: {
    marginTop: 64,
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    color: '#523A54',
    textAlign: 'right',
    fontSize: 10
  }
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }

  handlePressPhoto (rowData) {
    this.props.navigator.push({
      title: 'Photo by ' + rowData.username,
      component: Photo,
      passProps: {
        photoId: rowData.id
      }
    });
  }

  handlePressUser (rowData) {
    this.props.navigator.push({
      title: rowData.username,
      component: Profile,
      passProps: {
        user_id: rowData.user_id,
        navigator: this.props.navigator
      }
    });
  }

  renderHeader(){
    return (
      <RecentsHeader />
    )
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>

          <TouchableHighlight 
            onPress={this.handlePressPhoto.bind(this, rowData)}
            underlayColor='#384846' >
            <Image 
             source={{uri: AppConstants.PHOTOS_HOST + rowData.filename}} 
             style={styles.image} />
          </TouchableHighlight>

          <Text style={styles.username}> Submitted by: </Text>
          <TouchableHighlight
            onPress={this.handlePressUser.bind(this, rowData)}
            underlayColor='white'> 
            <Text style={styles.username}> {rowData.username} </Text>
          </TouchableHighlight>
          <Text> {rowData.description} </Text>

        </View>
        <Separator/>
      </View>
    )
  }

  render(){
    var dataSource = this.ds.cloneWithRows(this.props.photos);

    return (
      <View style={styles.container}>
        <ListView 
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:49}}
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)} 
          renderSectionHeader={this.renderHeader.bind(this)}/>
      </View>
    );
  }
}

module.exports = Gallery;