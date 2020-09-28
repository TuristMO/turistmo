import React from 'react';
import { Text, View } from 'react-native';

const App = () => {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text testID="stepOne">Step One</Text>

      </View>
  );
};

export default App;
