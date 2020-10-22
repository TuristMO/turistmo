import React from 'react';
import {Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text, Dimensions} from 'react-native'

const {width,height} = Dimensions.get("window");

const GuideInstallScreen = ({navigation,route}) => {
    console.log(route.params.path)

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text></Text>
            <View style={{alignItems:"center",justifyContent:"center"}}>
                <Image testID={"guideVideo"}
                    style={{width:width-50,height:height-153}}
                    source={route.params.path}
                    resizeMode={'cover'}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})

export default GuideInstallScreen;