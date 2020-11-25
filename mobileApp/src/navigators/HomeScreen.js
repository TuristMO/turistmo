import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import PackageDetailsScreen from "../screens/PackageDetailsScreen";
import PackageScreen from "../screens/PackageScreen";
import PackagesFromCuratorScreen from "../screens/PackagesFromCuratorScreen";

const Stack = createStackNavigator();  //RETURNS Stack Object -> Stack.Navigator,Stack.Screen

const HomeScreen = () => {

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={PackageScreen}/>
        <Stack.Screen name="PackageDetails" component={PackageDetailsScreen}/>
        <Stack.Screen name="ShowMoreFromCurator" component={PackagesFromCuratorScreen}/>
      </Stack.Navigator>
  )
}

export default HomeScreen;
