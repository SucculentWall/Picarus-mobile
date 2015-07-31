'use strict';

var React = require('react-native');
var Separator = require('../helpers/separator.js');
var self;

var {
  View,
  Image,
  Text,
  StyleSheet,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
  },
  container: {
    marginTop: 64,
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 10,
  }
});

class About extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Picarus</Text>
        <Text style={styles.paragraph}>Picarus provides stunning, unique images on demand. Connect with a community of photographers to get the exact photo you're looking for, anywhere in the world.</Text>  
        <Text style={styles.paragraph}>Visit www.picarus.co to find out more.</Text>
      </View>
    )
  }

}

module.exports = About;