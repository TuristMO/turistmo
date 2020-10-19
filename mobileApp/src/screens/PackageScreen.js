import React, { useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { getAllPackages } from "../actions";
import { Button, Input } from "react-native-elements";
import Card from "../components/Card";
import Geolocation from '@react-native-community/geolocation';

const PackageScreen = (props) => {
  const { location, packages: { packages, loading }, getAllPackages, navigation } = props;

  const [text, setText] = useState('');
 // const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // TEMPORARY SOLUTION UNTIL GEO LOCATION IS ACCEPTED FROM "PO"
    getAllPackages(text);

    //DOES NOT WORK!
    // Geolocation.getCurrentPosition(
    //     ({ coords }) => getCityByCoordinates(coords),
    //     error => console.log(error), //Om permission denied utöka till städer som redan finns lagrade.
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
  }, []);

  //TODO MOVE THIS TO A REDUCER
  const getCityByCoordinates = ({ latitude, longitude }) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude
        + '&key=' + "AIzaSyDIS1NEPG3DGage-GpC4COw3TWwZ_bjo34")
    .then((response) => response.json())
    .then((responseJson) => {
      const city = responseJson.results[0].address_components[3].long_name;
      //TODO : call API TO GET PACKAGES BASED ON THE CITY
      searchResult(city)
    })
  };

  const searchResult = (searchQuery) => {
    const searchData = packages.filter(item => item.city.toLowerCase().startsWith(searchQuery.toLowerCase()))
    //setFilteredData(searchData);
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: "center" }}/>
  }
    console.log(packages)
  return (
      // <SafeAreaView style={{ marginTop: 20, marginHorizontal: 10, flex: 1 }}>
      <SafeAreaView style={{ marginTop:25, marginHorizontal: 20, flex: 1 }}>
        <Input
            testID="searchField"
            accessibilityLabel='searchField'
            onChangeText={text => setText(text)}
            placeholder="Search"
            returnKeyType={"search"}
            onSubmitEditing={() => getAllPackages(text)}
        />
        <FlatList
            testID="packageFlatList"
            data={packages}
            keyExtractor={(item) => item.guid}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Package details")}>
                         <Card cPackage={item}/>
                    </TouchableOpacity>

            }}
        />
      </SafeAreaView>
  );

}

const styles = StyleSheet.create({})

const mapStateToProps = ({ location, packages }) => {
  return ({ packages, location }); //define your own keys
}

export default connect(mapStateToProps, { getAllPackages })(PackageScreen);
