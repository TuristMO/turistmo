import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import CuratorScreen from "../screens/CuratorScreen";

const AuthStack = createStackNavigator();

const AuthenticationStack = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name={"CuratorScreen"} component={SplashScreen}/>
            <AuthStack.Screen
                name={"SigninScreen"}
                component={SigninScreen}
            />
            <AuthStack.Screen
                name={"SignedInCuratorScreen"}
                component={CuratorScreen}
            />
            <AuthStack.Screen
                name={"SignupScreen"}
                component={SignupScreen}/>
        </AuthStack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default AuthenticationStack;
