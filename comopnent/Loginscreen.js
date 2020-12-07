import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LogInScreen extends Component {

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
    }
  }


  logIn = async () => {
    console.warn("email++++++++++++++++++++++++",this.state.email);
    let user = await AsyncStorage.getItem(this.state.email);
    user = JSON.parse(user);
    console.log(user,"letUser")
    console.warn(AsyncStorage.getAllKeys())
    console.warn("password------------",this.state.password);
    // await AsyncStorage.setItem("loggedInUserEmail", this.state.email);
    if (user && this.state.password===user.password) {
      // let user_details=JSON.stringify({email: "s@gmail.com"});
      // await AsyncStorage.setItem("loggedInUserEmail", user_details);
      this.props.navigation.navigate("Home")
    }else{
      Alert.alert("Please register before login.");
    }
}

navRegister= () =>{
   this.props.navigation.navigate("RegisterForm")
}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image 
            style={styles.inputIcon} 
            source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput 
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image 
            style={styles.inputIcon} 
            source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput 
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight 
          style={[styles.buttonContainer, styles.loginButton]} 
          onPress={this.logIn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.buttonContainer} 
          onPress={ this.navRegister}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});