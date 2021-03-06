import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import GuideScreen from "../screens/GuideScreen";
import GuideInstallScreen from "../screens/GuideInstallScreen";

const Stack = createStackNavigator();  //RETURNS Stack Object -> Stack.Navigator,Stack.Screen

const GuideStack = () => {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false}} >
            <Stack.Screen name="Guide"  options={{ title: ''}} component={GuideScreen}/>
            <Stack.Screen name="Instructions" component={GuideInstallScreen}/>
        </Stack.Navigator>
    )
}


export default GuideStack;
