import React, {useCallback, useEffect, useState} from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    StatusBar, ScrollView, ActivityIndicator,
} from 'react-native'
import {Icon, Button} from 'react-native-elements';

import GoBackArrowPush from "../components/GoBackArrowPush";
import {connect} from "react-redux";
import {getAllPackagesByCuratorGuid} from "../actions";
import Card from "../components/Card";

const PackagesFromCuratorScreen = (props) => {

    const {packages: {loading, packagesByCuratorGuid}, route, navigation, getAllPackagesByCuratorGuid} = props;
    const {guid, firstName, lastName, description, avatarUrl} = route.params.path

    const renderItem = useCallback(
        ({item, index}) =>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
            navigation.navigate('PackageDetails', {path: item})
        }}>
            <Card cPackage={item} index={"packagesByCuratorGuid" + index}/>
        </TouchableOpacity>,
        []);

    const keyExtractor = useCallback((item) => packagesByCuratorGuid.guid + "" + item.guid, []);

    const filteredPackages = (filterValue) => {
        return packagesByCuratorGuid.filter((e) => e.city === filterValue)
    }

    useEffect(() => {
        getAllPackagesByCuratorGuid(guid)

    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1, justifyContent: "center"}}/>
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image
                    testID="packageDetailcuratorAvatar"
                    accessibilityLabel='packageDetailcuratorAvatar'
                    source={{uri: avatarUrl}}
                    style={styles.curatorAvatar}/>
                <Text
                    testID="packageDetailpackageDate"
                    accessibilityLabel='packageDetailpackageDate'
                    style={styles.curatorTitle}>{firstName} {lastName}</Text>
                <Text
                    testID="packageDetailpackageCity"
                    accessibilityLabel='packageDetailpackageCity'
                    style={styles.curatorDescription}>{description}</Text>
            </View>
            <View
                style={styles.footer}>
                <ScrollView
                    alwaysBounceHorizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <Text style={styles.tagHeader}>STOCKHOLM</Text>
                    {filteredPackages('Stockholm').length > 0 ?
                    <FlatList
                        style={{height: 150}}
                        testID="packageFlatList"
                        data={filteredPackages('Stockholm')}
                        keyExtractor={keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={renderItem}
                    />
                    : <Text style={{color: '#333'}}>{firstName} hasn't created any packages for Stockholm yet.</Text>}
                    <Text style={styles.tagHeader}>GÖTEBORG</Text>
                    {filteredPackages('Göteborg').length > 0 ?
                    <FlatList
                        style={{height: 150}}
                        testID="packageFlatList"
                        data={filteredPackages('Göteborg')}
                        keyExtractor={keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={renderItem}
                    />
                    : <Text style={{color: '#333'}}>{firstName} hasn't created any packages for Göteborg yet.</Text>}
                    <Text style={styles.tagHeader}>MALMÖ</Text>
                    {filteredPackages('Malmö').length > 0 ?
                    <FlatList
                        style={{height: 150}}
                        testID="packageFlatList"
                        data={filteredPackages('Malmö')}
                        keyExtractor={keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={renderItem}
                    />
                    : <Text style={{color: '#333'}}>{firstName} hasn't created any packages for Malmö yet.</Text>}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        marginTop: '5%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    curatorAvatar: {
        marginHorizontal: '2%',
        width: 100,
        height: 100,
        borderRadius: 75,
        borderColor: '#4AB4FF',
        borderWidth: 3,
        paddingBottom: '1%',
    },
    curatorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: '1%',
    },
    curatorDescription: {
        fontSize: 12,
        fontWeight: '100',
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
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

const mapStateToProps = ({packages, location}) => {
    return ({packages, location});
}

export default connect(
    mapStateToProps,
    {getAllPackagesByCuratorGuid})
(PackagesFromCuratorScreen);
