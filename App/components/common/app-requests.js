'use strict';

var React = require('react-native');
// var RequestsStore = require('../../stores/app-requestsStore.js')
var Separator = require('../helpers/separator.js');
var RecentsHeader = require('./app-tabHeader.js');

var {
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
  NavigatorIOS
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

class Requests extends React.Component {
  constructor(props) {
    super(props);
    console.log('app-requests props: ', props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
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
          <Text> {rowData.text} </Text>
          <Text style={styles.username}> Submitted by: {rowData.username} </Text>
        </View>
        <Separator/>
      </View>
    )
  }

  render(){
    var dataSource = this.ds.cloneWithRows(this.props.requests)

    return (
      <View style={styles.container}>
        <ListView 
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:49}}
          dataSource={dataSource}
          renderRow={this.renderRow} 
          renderSectionHeader={this.renderHeader.bind(this)}/>
      </View>
    );
  }
}

module.exports = Requests;