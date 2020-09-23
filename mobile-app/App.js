import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import {Input, Button} from "react-native-elements";

const app = [
    {
        "name": "SL",
        "city": "Stockholm",
    },
    {
        "name": "Skåne-trafik",
        "city": "Malmö",
    }, {
        "name": "SJ",
        "city": "Stockholm",
    }, {
        "name": "Taxi Stockholm",
        "city": "Stockholm",
    }, {
        "name": "Taxi-020",
        "city": "Stockholm",
    },
    {
        "name": "Region väst-trafiken",
        "city": "Göteborg",
    }
]

const App = () => {
    const [text, setText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const searchResult = (searchItem) => {
        const searchData = app.filter(item => item.city.toLowerCase().startsWith(searchItem.toLowerCase()))
        setFilteredData(searchData);
    }
    return (
        <View style={{padding: 50}}>
            <Input
                style={{height: 40}}
                onChangeText={text => setText(text)}
                placeholder="Enter search"
            />
            <Button
                title="Search"
                onPress={() => searchResult(text)}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => {
                    return <Text style={{marginBottom: 20}}>
                        {item.name}
                    </Text>
                }}
            />

        </View>
    );
}

export default App;