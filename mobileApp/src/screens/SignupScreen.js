import React, {useEffect, useState} from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    StatusBar,
    Platform,
    ActivityIndicator, Alert
} from 'react-native'
import KeyboardDismiss from "../components/KeyboardDismiss";
import {Button, Icon, Input} from "react-native-elements";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {postSignUpCurator, emptyServerMessage, getAllPackagesFromCurator} from "../actions";
import GoBackArrowPush from "../components/GoBackArrowPush";


const MAIN_COLOR = '#4AB4FF';
const SignupScreen = (props) => {

    const {
        navigation, postSignUpCurator, emptyServerMessage,getAllPackagesFromCurator, rCurator: {successMessageSignUp, errorMessageSignUp, jwt, loading}
    } = props;

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        check_textMailInputChange: false,
        check_textFirstNameInputChange: false,
        check_textLastNameInputChange: false,
        secureTextEntry: true,
        secureTextEntryConfirmPassword: true
    });

    const [curatorS, setCurator] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    })

    const emailInputChange = (val) => {
        if (val.length !== 0) {
            setData({...data, email: val.trim(), check_textMailInputChange: true})
        } else {
            setData({...data, email: val.trim(), check_textMailInputChange: false})
        }
        setCurator({...curatorS, email: val.trim()})
    };

    const passwordInputChange = (val) => {
        setData({...data, password: val.trim()})
        setCurator({...curatorS, password: val.trim()})
    };

    const confirmPasswordInputChange = (val) => {
        setData({...data, confirmPassword: val.trim()})
        setCurator({...curatorS, confirmPassword: val.trim()})
    };

    const firstNameInputChange = (val) => {
        if (val.length !== 0) {
            setData({...data, firstName: val.trim(), check_textFirstNameInputChange: true})
        } else {
            setData({...data, firstName: val.trim(), check_textFirstNameInputChange: false})
        }
        setCurator({...curatorS, firstName: val.trim()})
    };

    const lastNameInputChange = (val) => {
        if (val.length !== 0) {
            setData({...data, lastName: val.trim(), check_textLastNameInputChange: true})
        } else {
            setData({...data, lastName: val.trim(), check_textLastNameInputChange: false})
        }
        setCurator({...curatorS, lastName: val.trim()})
    };

    const updateSecureTextEntry = () => {
        setData({...data, secureTextEntry: !data.secureTextEntry});
    };

    const showAlertMessage = () => {
        if (errorMessageSignUp) {
            return (
                Alert.alert(
                    "Too bad!",
                    errorMessageSignUp,
                    [
                        {
                            text: "Ok, got it!",
                            onPress: () => emptyServerMessage(),
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            )
        }
        if (successMessageSignUp) {
            return (
                Alert.alert(
                    "Welcome!",
                    successMessageSignUp,
                    [
                        {
                            text: "OK!",
                            onPress: () => navigation.navigate('SigninScreen'),
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            )
        }
    }

    useEffect(() => {
        showAlertMessage()
    }, [errorMessageSignUp, successMessageSignUp])

    return (
        <KeyboardDismiss>
            <View style={styles.container}>
                <StatusBar backgroundColor={MAIN_COLOR} barStyle={"light-content"}/>
                <View style={styles.header}>
                    <GoBackArrowPush testID={'signupGoBackArrow'} navigation={navigation}
                                     destination={'CuratorScreen'}/>
                    <Text style={styles.text_header}>Welcome!</Text>
                </View>
                <Animatable.View
                    animation={'fadeInUpBig'}
                    style={styles.footer}>
                    <ScrollView>
                        <Input
                            testID={'signupEmail'}
                            autoCapitalize={'none'}
                            inputStyle={styles.textInput}
                            placeholder='Email'
                            errorStyle={{color: 'red'}}
                            errorMessage=''
                            onChangeText={emailInputChange}
                            leftIcon={<Icon name={'user-o'} type={'font-awesome'}/>}
                            rightIcon={
                                data.check_textMailInputChange
                                    ? <Animatable.View animation={'bounceIn'}>
                                        <Icon name={'check-circle'} type={'feather'} color={'green'}/>
                                    </Animatable.View>
                                    : null
                            }
                        />
                        <Input
                            testID={'signupPassword'}
                            autoCapitalize={'none'}
                            inputStyle={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={data.secureTextEntry}
                            errorStyle={{color: 'red'}}
                            errorMessage=''
                            onChangeText={passwordInputChange}
                            leftIcon={{type: 'feather', name: 'lock'}}
                            rightIcon={
                                <TouchableOpacity testID={'signupShowHideToggle'}
                                                  accessibilityLabel={'signupShowHideToggle'}
                                                  onPress={updateSecureTextEntry}>
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
                            errorStyle={{color: 'red'}}
                            errorMessage=''
                            onChangeText={confirmPasswordInputChange}
                            leftIcon={{type: 'feather', name: 'lock'}}
                            rightIcon={
                                <TouchableOpacity onPress={updateSecureTextEntry}>
                                    <Icon
                                        type={'feather'}
                                        color='gray'
                                        name={data.secureTextEntry ? 'eye-off' : 'eye'}
                                    />
                                </TouchableOpacity>}
                        />
                        <Input
                            testID={'signupfirstName'}
                            autoCapitalize={'none'}
                            inputStyle={styles.textInput}
                            placeholder='First name'
                            errorStyle={{color: 'red'}}
                            errorMessage=''
                            onChangeText={firstNameInputChange}
                            leftIcon={<Icon name={'user-o'} type={'font-awesome'}/>}
                            rightIcon={
                                data.check_textFirstNameInputChange
                                    ? <Animatable.View animation={'bounceIn'}>
                                        <Icon name={'check-circle'} type={'feather'} color={'green'}/>
                                    </Animatable.View>
                                    : null
                            }
                        />
                        <Input
                            testID={'signuplastName'}
                            autoCapitalize={'none'}
                            inputStyle={styles.textInput}
                            placeholder='Last name'
                            errorStyle={{color: 'red'}}
                            errorMessage=''
                            onChangeText={lastNameInputChange}
                            leftIcon={<Icon name={'user-o'} type={'font-awesome'}/>}
                            rightIcon={
                                data.check_textLastNameInputChange
                                    ? <Animatable.View animation={'bounceIn'}>
                                        <Icon name={'check-circle'} type={'feather'} color={'green'}/>
                                    </Animatable.View>
                                    : null
                            }
                        />
                    </ScrollView>
                    <View style={styles.button}>
                        <Button
                            testID={"signupSignUp"}
                            containerStyle={styles.signInContainer}
                            buttonStyle={styles.signIn}
                            titleStyle={styles.textSign}
                            title="Sign Up"
                            onPress={() => postSignUpCurator(curatorS, () => showAlertMessage())}
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
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 15
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

const mapStateToProps = ({rCurator,packages}) => {
    return ({rCurator,packages})
}

export default connect(
    mapStateToProps,
    {postSignUpCurator, emptyServerMessage,getAllPackagesFromCurator})
(SignupScreen);

