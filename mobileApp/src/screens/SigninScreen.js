import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator, Alert,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Button, Icon, Input } from "react-native-elements";
import * as Animatable from 'react-native-animatable'
import KeyboardDismiss from "../components/KeyboardDismiss";
import GoBackArrow from "../components/GoBackArrow";
import {connect} from "react-redux";
import {emptyErrMessage, isUserFound, postSignInCurator} from "../actions";

const MAIN_COLOR = '#4AB4FF';

const SigninScreen = (props) => {

  const {
    navigation,postSignInCurator,emptyErrMessage,isUserFound, rCurator: {curator,userFound,errorMessageLogin,jwt,loading}
  } = props;

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  const[foundUser,setFoundUser] = useState(false)

  const [curatorS, setCuratorS] = useState({
    email: '',
    password: '',
  })

  const emailInputChange = (val) => {
    if (val.length !== 0) {
      setData({ ...data, email: val, check_textInputChange: true })
    } else {
      setData({ ...data, email: val, check_textInputChange: false })
    }
    setCuratorS({...curatorS, email: val})
  };

  const passwordInputChange = (val) => {
    setData({ ...data, password: val })
    setCuratorS({...curatorS, password: val})
  };

  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };
  //console.log("CURATOR GUID " +curator.guid)
  //console.log("CURATOR EMAIL " +curator.email)
  //console.log("JWT "+jwt)
  //console.log("ERRROR "+errorMessageLogin)

  function checkLogin() {

    //postSignInCurator(curatorS).then(whateveryouReturned => { /*your code here*/})

    postSignInCurator(curatorS)
    console.log(curator)
  }

  return (
      <KeyboardDismiss>
        <View style={styles.container}>
          <StatusBar backgroundColor={MAIN_COLOR} barStyle={"light-content"}/>
          <View style={styles.header}>
            <GoBackArrow testID={'signinGoBackArrow'} navigation={navigation} destination={'CuratorScreen'} />
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View
              animation={'fadeInUpBig'}
              style={styles.footer}>
            <Input
                testID={'signinEmail'}
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
                testID={'signinPassword'}
                autoCapitalize={'none'}
                inputStyle={styles.textInput}
                placeholder='Password'
                secureTextEntry={data.secureTextEntry}
                errorStyle={{ color: 'red' }}
                errorMessage=''
                onChangeText={passwordInputChange}
                leftIcon={{ type: 'feather', name: 'lock' }}
                rightIcon={
                  <TouchableOpacity testID={'signinShowHideToggle'} accessibilityLabel={'signinShowHideToggle'} onPress={updateSecureTextEntry}>
                    <Icon
                        type={'feather'}
                        color='gray'
                        name={data.secureTextEntry ? 'eye-off' : 'eye'}
                    />
                  </TouchableOpacity>}
            />
            <View style={styles.button}>
              <Button
                  testID={"signinSignin"}
                  containerStyle={styles.signInContainer}
                  buttonStyle={styles.signIn}
                  titleStyle={styles.textSign}
                  title="Sign in"
                  // onPress={() => postSignInCurator(curatorS).then(checkLogin()) ? navigation.navigate('SignedInCuratorScreen', {path: curator}): Alert.alert("Wrong credentials")}
                  //onPress={() => checkLogin().then(() => userFound ? console.log("Correct password") : console.log("Wrong password"))}
                  onPress={() => postSignInCurator(curatorS).then((response) => response ?  navigation.navigate('SignedInCuratorScreen', {path: curator}) : Alert.alert("Wrong credentials"))}
              />
              <Button
                  testID={"signinSignUp"}
                  containerStyle={[styles.signInContainer, { marginTop: 10 }]}
                  buttonStyle={[styles.signIn, { borderColor: MAIN_COLOR, borderWidth: 1, backgroundColor: '#fff' }]}
                  titleStyle={[styles.textSign, { color: MAIN_COLOR }]}
                  title="Sign Up"
                  onPress={() => navigation.navigate('SignupScreen')}
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
    backgroundColor: MAIN_COLOR
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  arrow: {
    position: 'absolute',
    top: 50,
    left: 20,
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

const mapStateToProps = ({rCurator}) => {
  return ({rCurator})
}

export default connect(
    mapStateToProps,
    {postSignInCurator,emptyErrMessage,isUserFound})
(SigninScreen);
