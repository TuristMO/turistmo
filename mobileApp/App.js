import Card from "./src/components/Card";

navigator.geolocation = require('@react-native-community/geolocation');
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from "react-native-elements";
import { packages } from "./data";
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState(packages);

  useEffect(() => {  //Run the arrow function ONLY when the component is FIRST RENDERED.
    Geolocation.getCurrentPosition(
        getCityByCoordinates,
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 90000, maximumAge: 1000 },
    );
  }, []);

  const searchResult = (searchItem) => {
    const searchData = packages.filter(item => item.city.toLowerCase().startsWith(searchItem.toLowerCase()))
    setFilteredData(searchData);
  }

  const getCityByCoordinates = ({ coords }) => {
    // Temporary solution until we implement expos packages.
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + coords.latitude + ',' + coords.longitude
        + '&key=' + "AIzaSyDIS1NEPG3DGage-GpC4COw3TWwZ_bjo34")
    .then((response) => response.json())
    .then((responseJson) => {
      const city = responseJson.results[0].address_components[3].long_name;
      searchResult(city)
    })
  };


  return (
      <SafeAreaView style={{ marginTop: 30, marginHorizontal: 10, flex: 1 }}>
        <Text testID="stepOne">Step One</Text>
        <Input
            testID="searchField"
            accessibilityLabel='searchField'
            style={{ height: 40 }}
            onChangeText={text => setText(text)}
            placeholder="Search"
        />
        <Button
            testID="searchButton"
            title="Search"
            onPress={() => searchResult(text)}
        />
        <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return <Card cPackage={item} />
            }}
        />
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
})

export default App;
