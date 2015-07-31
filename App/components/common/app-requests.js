'use strict';

var React = require('react-native');
var SelectedRequest = require('../request/request-selected');
var Separator = require('../helpers/separator.js');
var RecentsHeader = require('./app-tabHeader.js');

var {
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
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
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
  }

  renderHeader(){
    return (
      <RecentsHeader />
    )
  }

  handlePress (rowData) {
    this.props.navigator.push({
      title: rowData.text,
      component: SelectedRequest,
      passProps: {
        request_id: rowData.id,
      }
    });
  }

  renderRow(rowData) {
    return (
      <View>
        <TouchableHighlight 
          style={styles.rowContainer}
          onPress={this.handlePress.bind(this, rowData)}
          underlayColor='white'>
          
          <View style={styles.rowContainer}>
            <Text> {rowData.text} </Text>
          </View>
        
        </TouchableHighlight>
        
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
          renderRow={this.renderRow.bind(this)} 
          renderSectionHeader={this.renderHeader.bind(this)}/>
      </View>
    );
  }
}

module.exports = Requests;