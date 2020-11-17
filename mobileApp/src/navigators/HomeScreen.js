import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import PackageScreen from "../screens/PackageScreen";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import PackageScreen2 from "../screens/PackageScreen2";

const Stack = createStackNavigator();  //RETURNS Stack Object -> Stack.Navigator,Stack.Screen

const HomeScreen = () => {

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={PackageScreen2}/>
          <Stack.Screen name="PackageDetails" component={PackageDetailsScreen}/>

      </Stack.Navigator>
  )
}

export default HomeScreen;
