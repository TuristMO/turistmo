import React from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text } from 'react-native'

const PackageDetailsScreen = ({navigation}) => {

    //Should we send the package as props or call the selected package via API?

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Package Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default PackageDetailsScreen;
