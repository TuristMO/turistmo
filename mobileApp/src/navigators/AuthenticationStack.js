import React from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";


const AuthStack= createStackNavigator();


const AuthenticationStack = () => {
  return (
      <AuthStack.Navigator screenOptions={ { headerShown: false}}>
        <AuthStack.Screen  name={"CuratorScreen"} component={SplashScreen}/>
        <AuthStack.Screen
            name={"SigninScreen"}
            component={SigninScreen}

        />
        <AuthStack.Screen name={"SignupScreen"} component={SignupScreen}/>
      </AuthStack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default AuthenticationStack;
