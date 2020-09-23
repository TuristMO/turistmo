import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, FlatList } from 'react-native';
import {Input, Button} from "react-native-elements";

const app = [{
    "name": "SL",
    "country": "Stockholm",
},
    {
        "name": "Region väst-trafiken",
        "country": "Göteborg",
    }]

const App = () => {
  const [text, setText] = useState('');
  const [filteredData,setFilteredData] = useState([]);
  const searchResult = (searchItem) => {
     const searchData = app.filter(item => item.country===searchItem)
      setFilteredData(searchData);
  }
  return (
      <View style={{padding: 50}}>
        <Input
            style={{height: 40}}
            onChangeText={text => searchResult(text)}
            defaultValue="Enter search"
        />
        <FlatList
            data={filteredData}
            keyExtractor={(item)=>item.name}
            renderItem={({item})=>{
                return <Text style={{marginBottom:20}}>
                    {item.name}
                </Text>
            }}
        />

        <Text style={{padding: 10, fontSize: 42}}>
          {text}
        </Text>
      </View>
  );
}

export default App;