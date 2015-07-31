var React = require('react-native');
var Main = require('./main');
var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;
var api = require('../utils/api');
var AppActions = require('../actions/app-actions.js');

var {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#523A54',
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 0,
    color: '#fff',
    fontSize: 50,
    fontWeight: '200',
    textAlign: 'center'
  },
  continue: {
    height: 30,
    marginTop: 20,
    marginLeft: 105,
    marginRight: 105,
    // backgroundColor: '#FF6EB4',
    backgroundColor: '#4F7CAC',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
    // // borderColor: '#4F7CAC'
    borderColor: 'pink'
  },
  logintext: {
    fontWeight: '200',
    fontSize: 20,
    color: '#fff'
  },  
  loginContainer: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
    borderWidth: 0,
    marginBottom: 110
  },
  filler: {
    height: 30,
    marginTop: 20,
    marginLeft: 105,
    marginRight: 105,
    marginBottom: 110

  }
});

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null
    };
  }

  handlePress() {
    this.props.navigator.push({
      title: 'Picarus',
      component: Main,
      passProps: { user: this.state.user}
    });
  }

  render() {
    var _this = this;
    return (
      <Image 
        source={{uri:'http://www.myiphone5wallpaper.com/Gallery/56_iOS7/iPhone-5C-Stock-Wallpaper-iOS7-2013_7.jpg'}} 
        style={styles.container}>
        <Text style={styles.title}> Picarus </Text>
        <View style={styles.loginContainer}>
          { this.state.user ? <TouchableHighlight 
            style={styles.continue}
            onPress={_this.handlePress.bind(_this)}
            underlayColor='#4F8CAC'>
            <Text style={styles.logintext}> Go </Text>
          </TouchableHighlight> : <View style={styles.filler}></View> }


          <FBLogin style={styles.button}
            permissions={["email","user_friends"]}
            onLogin={function(data){
              console.log("Logged in!");
              AppActions.loggedIn(data.credentials);
              _this.setState({ user : data.credentials });

              _this.props.navigator.push({
                title: 'Picarus',
                component: Main,
                passProps: { user: _this.state.user }
              });
            }}
            onLogout={function(){
              console.log("Logged out.");
              AppActions.notLoggedIn();
              _this.setState({ user : null });
            }}
            onLoginFound={function(data){
              console.log("Existing login found.");
              AppActions.loggedIn(data.credentials);
              _this.setState({ user : data.credentials });

            }}
            onLoginNotFound={function(){
              console.log("No user logged in.");
              AppActions.notLoggedIn();
              _this.setState({ user : null });
            }}
            onError={function(data){
              console.log("ERROR");
              console.log(data);
            }}
            onCancel={function(){
              console.log("User cancelled.");
            }}
            onPermissionsMissing={function(data){
              console.log("Check permissions!");
              console.log(data);
            }}
          />
        </View>
      </Image>
    );
  }
};

module.exports = Login;