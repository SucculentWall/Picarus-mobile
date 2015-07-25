'use strict';

var React = require('react-native');
var api = require('../../utils/api.js');
var AppActions = require('../../actions/app-actions');

var {
  View,
  Image,
  Text,
  TextInput,
  ListView,
  TouchableHighlight,
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

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: ''
    };
  }

  handleSubmit() {
    console.log('uploadPhoto handleSubmit props ', this.props);
    var username = 'BOB'; // hardcode as BOB
    var request_id = this.props.request_id;
    var photo = this.props.image;
    var tags = this.props.tags;
    var description = this.state.description;
    var size;
    console.log(photo, username, request_id, tags, description, size);
    // AppActions.addPhoto(photo, username, request_id, tags, description, size);
    this.props.navigator.popN(2);
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.image}} style={styles.image}/>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}/>
        <TouchableHighlight
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white'>
          <Text> Submit Photo </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

module.exports = UploadPhoto;