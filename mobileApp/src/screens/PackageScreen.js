import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    ScrollView, StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {connect} from 'react-redux'
import {
    getAllPackages,
    getAllPackagesBusiness,
    getAllPackagesCulture,
    getAllPackagesFood,
    getAllPackagesTravel, getPackageByPackageGuid
} from "../actions";
import {Input} from "react-native-elements";
import Card from "../components/Card";

const PackageScreen = (props) => {
    const {
        location,
        navigation,
        packages: {loading,packages,packagesTravel,packagesFood, packagesBusiness, packagesCulture, packagesFound},
        getAllPackagesTravel, getAllPackagesFood, getAllPackagesBusiness, getAllPackagesCulture,route,
        getAllPackages, getPackageByPackageGuid,
    } = props;

    const [text, setText] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const MAIN_COLOR = '#4AB4FF';

    useEffect(() => {
        getAllPackagesTravel();
        getAllPackagesFood();
        getAllPackagesBusiness();
        getAllPackagesCulture();
    }, []);

    const searchResult = (searchQuery) => {
        setHasSearched(true)
        getAllPackages(searchQuery.trim());
    }

    const navigateToDetails = (packageDetails) => {
        navigation.navigate('PackageDetails',{path: packageDetails})
    }

    const keyExtractor = (packageData) => {
        return ((item) => packageData.guid + "" + item.guid)
    }

    const renderItemFood = useCallback(
            ({item, index}) =>
                <TouchableOpacity activeOpacity={0.9}
                                  onPress={()=>getPackageByPackageGuid(item.guid
                                      ,navigateToDetails(packagesFood[index]))}>
                    <Card cPackage={item} index={"FoodIndex"+index}/>
                </TouchableOpacity>,
            []);


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1, justifyContent: "center"}}/>
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={MAIN_COLOR} barStyle={"light-content"}/>
            <Input
                testID="searchField"
                accessibilityLabel='searchField'
                onChangeText={text => setText(text)}
                placeholder="Search"
                returnKeyType={"search"}
                onSubmitEditing={() => searchResult(text.trim())}
                leftIcon={{
                    name: "search",
                    type: 'font-awesome',
                    color: '#CCC',
                }}
                leftIconContainerStyle={{marginLeft: '5%'}}
            />
            <View
                style={styles.footer}>
                <ScrollView
                    alwaysBounceHorizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {hasSearched ? <View>
                        <View style={styles.tagHeaderView}>
                        <Text style={styles.tagHeader}>SEARCH RESULT</Text>
                        <TouchableOpacity
                            onPress={() =>setHasSearched(false)}
                            style={styles.tagHeaderOpacity}><Text style={styles.tagHeaderX}> X </Text></TouchableOpacity>
                        </View>
                        {packagesFound
                        ? <FlatList
                            style={{height: 150}}
                            testID="searchPackageFlatList"
                            data={packages}
                            keyExtractor={keyExtractor(packages)}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item, index}) => {
                                return <TouchableOpacity activeOpacity={0.9}
                                                         onPress={() => navigation.navigate('PackageDetails', {path: packages[index]})}>
                                    <Card cPackage={item} index={"SearchIndex"+index}/>
                                </TouchableOpacity>
                            }}/>
                        : <Text>No Results found</Text>}</View> : null}

                    <Text style={styles.tagHeader}>TRAVEL</Text>
                    <FlatList
                        style={{height: 150}}
                        testID="packageFlatList"
                        data={packagesTravel}
                        keyExtractor={keyExtractor(packagesTravel)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item, index}) => {
                            return <TouchableOpacity activeOpacity={0.9}
                                                     onPress={() => navigation.navigate('PackageDetails', {path: packagesTravel[index]})}>
                                <Card cPackage={item} index={"TravelIndex"+index}/>
                            </TouchableOpacity>
                        }}
                    />
                    <Text style={styles.tagHeader}>FOOD</Text>
                    <FlatList
                        style={{height: 150}}
                        testID="packageFlatList"
                        data={packagesFood}
                        keyExtractor={keyExtractor(packagesFood)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item, index}) => {
                            return <TouchableOpacity activeOpacity={0.9}
                                                     onPress={() => navigation.navigate('PackageDetails', {path: packagesFood[index]})}>
                                <Card cPackage={item} index={"FoodIndex" + index}/>
                            </TouchableOpacity>
                        }}
                    />
                    <Text style={styles.tagHeader}>CULTURE</Text>
                    <FlatList
                        style={{height: 150}}
                        testID="packageFlatList"
                        data={packagesCulture}
                        keyExtractor={keyExtractor(packagesCulture)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item, index}) => {
                            return <TouchableOpacity activeOpacity={0.9}
                                                     onPress={() => navigation.navigate('PackageDetails', {path: packagesCulture[index]})}>
                                <Card cPackage={item} index={"CultureIndex"+index}/>
                            </TouchableOpacity>
                        }}
                    />
                    <Text style={styles.tagHeader}>BUSINESS</Text>
                    <FlatList
                        style={{height: 150}}
                        testID="packageFlatList"
                        data={packagesBusiness}
                        keyExtractor={keyExtractor(packagesBusiness)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item, index}) => {
                            return <TouchableOpacity activeOpacity={0.9}
                                                     onPress={() => navigation.navigate('PackageDetails', {path: packagesBusiness[index]})}>
                                <Card cPackage={item} index={"BusinessIndex"+index}/>
                            </TouchableOpacity>
                        }}
                    />
                </ScrollView>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: "4%",
        flex: 1,
    },
    inputfield: {
        marginHorizontal: "1%",
        marginLeft: '1%'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: '5%',
        paddingHorizontal: '5%'
    },
    tagHeaderView: {
        fontWeight: 'bold',
        marginBottom: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tagHeaderX: {
        color: '#ff2a00',
        fontWeight: 'bold',
    },
    tagHeaderOpacity: {
        marginRight: '5%',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#CCC'
    },
    tagHeader: {
        fontWeight: 'bold',
        marginBottom: 10,
        paddingTop: 10,
    },
    packageContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginRight: 25,
        width: 260,
        height: 140,
        justifyContent: 'flex-end',
    },

})
const mapStateToProps = ({location, packages}) => {
    return ({packages, location}); //define your own keys
}

export default connect(
    mapStateToProps,
    {getAllPackages, getAllPackagesTravel,
        getAllPackagesFood, getAllPackagesBusiness,
        getAllPackagesCulture,getPackageByPackageGuid})
(PackageScreen);

