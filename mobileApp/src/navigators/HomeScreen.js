import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import IndexScreen from "../screens/PackageScreen";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";

const Stack = createStackNavigator();  //RETURNS Stack Object -> Stack.Navigator,Stack.Screen

const HomeScreen = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={IndexScreen}/>
        <Stack.Screen name="Package details" component={PackageDetailsScreen}/>
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen;
