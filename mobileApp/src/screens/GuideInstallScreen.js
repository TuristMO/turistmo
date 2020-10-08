import React from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text } from 'react-native'

const GuideInstallScreen = ({navigation,route}) => {
    console.log(route.params.path)
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>How to install applications </Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default GuideInstallScreen;