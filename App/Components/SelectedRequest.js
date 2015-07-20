'use strict';

var React = require('react-native');
var api = require('../Utils/api.js');
var Separator = require('./Helpers/Separator.js');

var {
  View,
  Image,
  Text,
  ListView,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
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
  title: {
    height: 40,
    backgroundColor: '#5F4461',
    justifyContent: 'center'
  },
  titleText: {
    color: '#fff',
    alignSelf: 'center'
  }
});


class SelectedRequest extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.photos),
      error: ''
    };
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image source={{uri: 'http://127.0.0.1:8888/photos/' + rowData.filename}} style={styles.image}/>
          <Text style={styles.username}> Submitted by: {rowData.username} </Text>
          <Text> {rowData.description} </Text>
        </View>
        <Separator/>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    )
  }
}

module.exports = SelectedRequest;