import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Platform, Image, StyleSheet, View, ScrollView, Text} from 'react-native'
import {Button} from "react-native-elements";


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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Guide Screen </Text>
            <Button
                title="Install Screen"
                onPress={() => navigation.navigate('Instructions',{path:platform.installPath})}/>
            <Button
                title="Delete Screen"
                onPress={() => navigation.navigate('Instructions',{path:platform.deletePath})}/>
        </View>
    )
}

const styles = StyleSheet.create({})

export default GuideScreen;
