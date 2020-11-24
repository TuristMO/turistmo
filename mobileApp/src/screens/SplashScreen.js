import React from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, Text, View} from 'react-native'
import { Button } from "react-native-elements";
import * as Animatable from 'react-native-animatable'

const SplashScreen = ({navigation}) => {

  return (
      <View style={styles.container}>
        <StatusBar backgroundColor={MAIN_COLOR} barStyle={"light-content"}/>
        <View style={styles.header}>
          <Animatable.Image
              animation={"bounceIn"}
              duration={1500}
              style={styles.logo}
              source={{uri: 'https://res.cloudinary.com/hkiuhnuto/image/upload/v1606125209/curator_rm2c2l.png'}}    //source={{uri: item}}
              resizeMode={'stretch'}
          />
        </View>
        <Animatable.View
            animation={'fadeInUpBig'}
            style={styles.footer}>
          <Text style={styles.title}>Become a curator!</Text>
          <Text style={styles.text}>Start creating your own package </Text>
          <View style={styles.button}>

          <Button
              testID={'getStarted'}
              buttonStyle={styles.signIn}
              icon={{
                name: "navigate-next",
                size: 20,
                color: "white"
              }}
              title="Get Started"
              onPress={() => navigation.navigate('SigninScreen') }
          />
          </View>
        </Animatable.View>
      </View>
  )
}

const { height } = Dimensions.get("screen")
const height_logo = height * 0.28;

const MAIN_COLOR='#4AB4FF';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title:{
    color: '#05375a',
    fontSize:30,
    fontWeight:'bold'
  },
  text: {
    color:'grey',
    marginTop:5
  },
  button: {
    alignItems: 'flex-end',
    marginTop:30,
  },
  signIn: {
    backgroundColor:MAIN_COLOR,
    width:150,
    height:40,
    justifyContent: 'center',
    borderRadius:50,
    flexDirection:'row'
  },
  textSign: {
    color:'white',
    fontWeight: 'bold'
  },
})

export default SplashScreen;
