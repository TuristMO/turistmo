import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import IndexScreen from "../screens/PackageScreen";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import GuideScreen from "../screens/GuideScreen";
import GuideInstallScreen from "../screens/GuideInstallScreen";

const Stack = createStackNavigator();  //RETURNS Stack Object -> Stack.Navigator,Stack.Screen

const GuideStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Guide" component={GuideScreen}/>
            <Stack.Screen name="Instructions" component={GuideInstallScreen}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default GuideStack;