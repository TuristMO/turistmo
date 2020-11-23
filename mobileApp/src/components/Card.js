import React from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text, FlatList } from 'react-native'
import Application from "./Application";
import {silhouette, tagColor} from "../helpers/helpers";

const Card = ({ cPackage,index }) => {

    const {curator:{firstName, lastName},city,title,tags} = cPackage
    return (
        <View
            accessibilityLabel='resultItem'
            style={styles.packageContainer}>
            <View style={{backgroundColor: tagColor(tags[0].title), flex: 1, paddingTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                <Image source={silhouette(city)}
                       style={{justifyContent: 'flex-end',flex: 1, width: null, height: null, resizeMode: 'cover'}}/>
            </View>
            <View style={{justifyContent: 'center',padding: 5,backgroundColor: '#FFF', flex: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <Text
                    testID={'cardPackageTitle'+index}
                    style={{fontWeight: 'bold', backgroundColor: 'white'}}>{title}</Text>
                <Text
                    testID={'cardPackageTitle'+index}
                    style={{backgroundColor: 'white'}}>{firstName} {lastName}</Text>
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

export default Card;
