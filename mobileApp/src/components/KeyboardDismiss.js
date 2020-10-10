import React from 'react';
import {
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback, Keyboard
} from 'react-native'

const KeyboardDismiss = ({children}) => {

  return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({})

export default KeyboardDismiss;
