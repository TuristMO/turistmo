import 'react-native-gesture-handler'; // MUST BE HERE
import { Provider } from "react-redux";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from './src/reducers'
import IndexScreen from "./src/screens/PackageScreen";
import { StyleSheet } from 'react-native';
// import 'react-native-gesture-handler'; // MUST BE HERE
navigator.geolocation = require('@react-native-community/geolocation');
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CuratorScreen from "./src/screens/CuratorScreen";
import GuideScreen from "./src/screens/GuideScreen";
import HomeScreen from "./src/navigators/HomeScreen";
import GuideStack from "./src/navigators/GuideStack";

const store = createStore(reducers, applyMiddleware(thunk))

const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
          <Tab.Screen name="Curator" component={CuratorScreen} />
          <Tab.Screen name="Guide" component={GuideStack} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({})

export default () => {
  return (
      <Provider store={store}>
        <App/>
      </Provider>
  )
};

