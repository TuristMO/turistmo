import React from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text } from 'react-native'
import { Icon } from "react-native-elements";

const GoBackArrow = ({navigation,destination,testID}) => {
  return (
      <TouchableOpacity
          testID={testID}
          style={styles.arrow}
          onPress={() => navigation.navigate(destination)}>
        <Icon color={'white'} size={30} type={'feather'} name="x"/>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  arrow: {
    flex:1,
    position: 'absolute',
    top: 50,
    right: 30,
  },
})

export default GoBackArrow;
