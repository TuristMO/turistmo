import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import IndexScreen from "../screens/PackageScreen";

const Stack = createStackNavigator();  //RETURNS Stack Object -> Stack.Navigator,Stack.Screen

const HomeScreen = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={IndexScreen}/>
        {/*<Screen name="Second Screen" component={CuratorScreen}/>*/}
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen;
