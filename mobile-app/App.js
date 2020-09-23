import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  return (
      <View style={{padding: 50}}>
        <TextInput
            style={{height: 40}}
            onChangeText={text => setText(text)}
            defaultValue="Enter search"
        />
        <Button title="Search" onPress={
          console.log({text})
        }/>
        <Text style={{padding: 10, fontSize: 42}}>
          {text}
        </Text>
      </View>
  );
}

export default App;