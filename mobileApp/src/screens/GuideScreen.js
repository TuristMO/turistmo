import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Platform, Image, StyleSheet, View, ScrollView, Text, Dimensions} from 'react-native'
import {Button} from "react-native-elements";
import * as Animatable from "react-native-animatable";


const platForms = {
    "ios": {
        installPath: "ios installations",
        deletePath: "ios delete"
    },
    "android": {
        installPath: "android installations",
        deletePath: "android delete"
    }
}


const GuideScreen = ({navigation}) => {
    const [platform, setPlatform] = useState({})
    useEffect(() => {
        Platform.OS  === 'ios' ? setPlatform(platForms.ios) : setPlatform(platForms.android)
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation={"bounceIn"}
                    duration={1500}
                    style={styles.logo}
                    source={require('../images/help.png')}    //source={{uri: item}}
                    resizeMode={'stretch'}
                />
            </View>
            <Animatable.View
                animation={'fadeInUpBig'}
                style={styles.footer}>
                <Text style={styles.title}>Need help!</Text>
                <Text style={styles.text}>Choose what you need </Text>
                <View style={styles.button}>
                    <Button
                        buttonStyle={styles.signIn}
                        icon={{
                            name: "navigate-next",
                            size: 20,
                            color: "white"
                        }}
                        title="Install"
                        onPress={() => navigation.navigate('Instructions',{path:platform.installPath})}/>
                    <Button
                        buttonStyle={styles.signIn}
                        icon={{
                            name: "navigate-next",
                            size: 20,
                            color: "white"
                        }}
                        title="Delete"
                        onPress={() => navigation.navigate('Instructions',{path:platform.deletePath})}/>
                    <Button
                        buttonStyle={styles.signIn}
                        icon={{
                            name: "navigate-next",
                            size: 20,
                            color: "white"
                        }}
                        title="Curator"
                        onPress={() => navigation.navigate('Instructions',{path:platform.deletePath})}/>
                </View>
            </Animatable.View>
        </View>
    )
}

const { height } = Dimensions.get("screen")
const height_logo = height * 0.28;

const MAIN_COLOR='#009387';

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
        alignItems: 'center',
        margin:30,


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

export default GuideScreen;
