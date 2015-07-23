'use strict';

var React = require('react-native');
var Separator = require('../Helpers/Separator.js');
var SearchHeader = require('./search-header.js');

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
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    color: '#523A54',
    textAlign: 'right',
    fontSize: 10
  }
});


class SearchRequests extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.requests),
      error: ''
    };
  }

  renderHeader(){
    return (
      <SearchHeader />
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
    return (
      <ListView style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow} 
        renderSectionHeader={this.renderHeader.bind(this)}/>
    );
  }
}

module.exports = SearchRequests;