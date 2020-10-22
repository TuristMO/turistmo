import React, { useEffect, useState } from 'react';
import {  TouchableOpacity, Image, StyleSheet, View, ScrollView, Text, StatusBar, Platform } from 'react-native'
import KeyboardDismiss from "../components/KeyboardDismiss";
import { Button,Icon, Input } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import GoBackArrow from "../components/GoBackArrow";


const MAIN_COLOR = '#009387';
const SignupScreen = ({navigation}) => {

  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword:'',
    check_textInputChange: false,
    secureTextEntry: true,
    secureTextEntryConfirmPassword: true
  });



  const emailInputChange = (val) => {
    if (val.length !== 0) {
      setData({ ...data, email: val, check_textInputChange: true })
    } else {
      setData({ ...data, email: val, check_textInputChange: false })
    }
  };

  const passwordInputChange = (val) => {
    setData({ ...data, password: val })
  };

  const confirmPasswordInputChange = (val) => {
    setData({ ...data, password: val })
  };

  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };

  return (
      <KeyboardDismiss>
        <View style={styles.container}>
          <StatusBar backgroundColor={MAIN_COLOR} barStyle={"light-content"}/>
          <View style={styles.header}>
            <GoBackArrow navigation={navigation} destination={'CuratorScreen'} />
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View
              animation={'fadeInUpBig'}
              style={styles.footer}>
            <Input
                testID={'signupEmail'}
                autoCapitalize={'none'}
                inputStyle={styles.textInput}
                placeholder='Email'
                errorStyle={{ color: 'red' }}
                errorMessage=''
                onChangeText={emailInputChange}
                leftIcon={<Icon name={'user-o'} type={'font-awesome'}/>}
                rightIcon={
                  data.check_textInputChange
                      ? <Animatable.View animation={'bounceIn'}>
                        <Icon name={'check-circle'} type={'feather'} color={'green'}/>
                      </Animatable.View>
                      : null
                }
            />
            <Input
                testID={'password'}
                autoCapitalize={'none'}
                inputStyle={styles.textInput}
                placeholder='Password'
                secureTextEntry={data.secureTextEntry}
                errorStyle={{ color: 'red' }}
                errorMessage=''
                onChangeText={passwordInputChange}
                leftIcon={{ type: 'feather', name: 'lock' }}
                rightIcon={
                  <TouchableOpacity testID={'signupShowHideToggle'} accessibilityLabel={'signupShowHideToggle'} onPress={updateSecureTextEntry}>
                    <Icon
                        type={'feather'}
                        color='gray'
                        name={data.secureTextEntry ? 'eye-off' : 'eye'}
                    />
                  </TouchableOpacity>}
            />
            <Input
                testID={'confirmPassword'}
                autoCapitalize={'none'}
                inputStyle={styles.textInput}
                placeholder='Confirm Password'
                secureTextEntry={data.secureTextEntry}
                errorStyle={{ color: 'red' }}
                errorMessage=''
                onChangeText={confirmPasswordInputChange}
                leftIcon={{ type: 'feather', name: 'lock' }}
                rightIcon={
                  <TouchableOpacity onPress={updateSecureTextEntry}>
                    <Icon
                        type={'feather'}
                        color='gray'
                        name={data.secureTextEntry ? 'eye-off' : 'eye'}
                    />
                  </TouchableOpacity>}
            />
            <View style={styles.button}>
              <Button
                  testID={"SignUp"}
                  containerStyle={styles.signInContainer}
                  buttonStyle={styles.signIn}
                  titleStyle={styles.textSign}
                  title="Sign Up"
                  onPress={() => console.log('SignUp')}
              />
              <Button
                  testID={"SignIn"}
                  containerStyle={[styles.signInContainer, { marginTop: 10 }]}
                  buttonStyle={[styles.signIn, { borderColor: MAIN_COLOR, borderWidth: 1, backgroundColor: '#fff' }]}
                  titleStyle={[styles.textSign, { color: MAIN_COLOR }]}
                  title="Sign In"
                  onPress={() => navigation.navigate('SigninScreen')}
              />
            </View>
          </Animatable.View>
        </View>
      </KeyboardDismiss>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05275a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signInContainer: {
    width: '100%',
  },
  signIn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MAIN_COLOR,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
})
export default SignupScreen;
