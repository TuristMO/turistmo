import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import PackageScreen from "../screens/PackageScreen";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import PackageScreen2 from "../screens/PackageScreen2";

const Stack = createStackNavigator();  //RETURNS Stack Object -> Stack.Navigator,Stack.Screen

const HomeScreen = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={PackageScreen2}/>
        <Stack.Screen name="Package details" component={PackageDetailsScreen}/>
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen;
