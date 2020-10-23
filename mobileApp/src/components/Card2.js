import React from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text, FlatList } from 'react-native'
import Application from "./Application";

const Card2 = ({ cPackage }) => {

    const silhuette = city => {
        switch(city) {
            case 'Stockholm':
                return require('../images/sthlm-w.png');
            case 'Göteborg':
                return require('../images/gbg-w.png');
            case 'Malmö':
                return require('../images/malmo-w.png');
        }
    }

    const colorTag = tag => {
        switch(tag) {
            case 'Travel':
                return '#FFAA7D';
            case 'Culture':
                return '#F07D75';
            case 'Food':
                return '#B3F2BA';
            case 'Business':
                return '#7D7DFF';
            default:
                return '#4AB4FF';

        }
    }

    const {curator:{avatarUrl, firstName, lastName},city,curatorPicture,title,description,date,usefulApplications,tags} = cPackage

    //console.log(tags[0].title);
    return (
        <View
            accessibilityLabel='resultItem'
            style={styles.packageContainer}>
            <View style={{backgroundColor: colorTag(tags[0].title), flex: 1, paddingTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                <Image source={silhuette(city)}
                       style={{justifyContent: 'flex-end',flex: 1, width: null, height: null, resizeMode: 'cover'}}/>
            </View>
            <View style={{justifyContent: 'center',padding: 5,backgroundColor: '#FFF', flex: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <Text
                    testID={'cardPackageTitle'}
                    style={{fontWeight: 'bold', backgroundColor: 'white'}}>{title}</Text>
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
        paddingVertical: 20,
        paddingHorizontal: 30
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
        // marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginRight: 25,
        width: 260,
        height: 140,
        justifyContent: 'flex-end',
        // paddingHorizontal: 5,
        // paddingVertical: 10,
    },
})

export default Card2;
