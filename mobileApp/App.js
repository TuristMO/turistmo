import 'react-native-gesture-handler'; // MUST BE HERE
import { Provider } from "react-redux";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from './src/reducers'
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/navigators/HomeScreen";
import GuideStack from "./src/navigators/GuideStack";
import AuthenticationStack from "./src/navigators/AuthenticationStack";
import { Icon } from "react-native-elements";
// import 'react-native-gesture-handler'; // MUST BE HERE
navigator.geolocation = require('@react-native-community/geolocation');

const store = createStore(reducers, applyMiddleware(thunk))

const Tab = createBottomTabNavigator();

const MAIN_COLOR = '#009387';

const getTabBarVisibility = (route) => {
  const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
  return !(routeName === 'SignupScreen' || routeName === 'SigninScreen');
}

const App = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                tabBarTestID: 'HomeTab',
                tabBarLabel: props => <Text style={{ fontSize: 10, color: MAIN_COLOR }}> Home </Text>,
                tabBarIcon: ({ color, size }) => (
                    <Icon type={'ant-design'} name="home" color={MAIN_COLOR} size={size}/>
                ),
              }}
          />
          <Tab.Screen
              name="Curator"
              component={AuthenticationStack}
              options={({ route }) => ({
                  tabBarTestID: 'CuratorTab',
                  tabBarVisible:getTabBarVisibility(route),
                  tabBarLabel: props => <Text style={{ fontSize: 10, color: MAIN_COLOR }}> Curator </Text>,
                  tabBarIcon: ({ color, size }) => (
                      <Icon type={'ant-design'} name="user" color={MAIN_COLOR} size={size}/> )

              })}
              // options={{
              //   tabBarTestID: 'CuratorTab',
              //   tabBarLabel: props => <Text style={{ fontSize: 10, color: MAIN_COLOR }}> Curator </Text>,
              //   tabBarIcon: ({ color, size }) => (
              //       <Icon type={'ant-design'} name="user" color={MAIN_COLOR} size={size}/>
              //   ),
              // }}
          />
          <Tab.Screen
              name="Guide"
              component={GuideStack}
              options={{
                tabBarTestID: 'GuideTab',
                tabBarLabel: props => <Text style={{ fontSize: 10, color: MAIN_COLOR }}> Guide </Text>,
                tabBarIcon: ({ color, size }) => (
                    <Icon type={'feather'} name="info" color={MAIN_COLOR} size={size}/>
                ),
              }}
          />
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

