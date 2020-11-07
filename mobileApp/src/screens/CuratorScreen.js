import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    SafeAreaView, FlatList, Button
} from 'react-native'
import {connect} from "react-redux";
import {emptyErrMessage, isUserFound, postSignInCurator} from "../actions";
import Card2 from "../components/Card2";

const CuratorScreen = (props) => {
    const {navigation,rCurator: {curator}} = props;
    console.log(curator)
    return (
        <SafeAreaView
            style={styles.container}>
            <View
                testID="packageDetailpackageContainer"
                accessibilityLabel='packageDetailpackageContainer'
                style={styles.packageContainer}>
                <View
                    style={styles.titleContainer}>
                    <Image
                        testID="packageDetailcuratorAvatar"
                        accessibilityLabel='packageDetailcuratorAvatar'
                        source={{uri: "https://res.cloudinary.com/hkiuhnuto/image/upload/v1604658326/myAvatar_erdwgy.png"}}
                        style={styles.curatorAvatar}/>
                    <Text
                        testID="packageDetailpackageDate"
                        accessibilityLabel='packageDetailpackageDate'
                        style={styles.curatorTitle}>{curator.firstName} {curator.lastName}</Text>
                    <Text
                        testID="packageDetailpackageCity"
                        accessibilityLabel='packageDetailpackageCity'
                        style={styles.curatorEmail}>{curator.email}</Text>
                </View>

            </View>
            <View style={styles.packageContainer}>
                <Text
                    style={styles.packageTitle}>My packages</Text>
                <FlatList
                    style={{height: 150}}
                    testID="packageFlatList"
                    data={curator.packages}
                    keyExtractor={(item) => curator.packages.guid + "" + item.guid}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({item}) => {
                        return <Card2 cPackage={item} />
                    }}
                />
                <Button
                    color={'#4AB4FF'}
                    title={"Create package"}
                    onPress={console.log("Going to create package")}/>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    packageContainer: {
        flex: 3,
        backgroundColor: '#fff',
    },
    curatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    packageTitle: {
        paddingLeft: "5%",
        fontSize: 20,
    },
    packageDescription: {
        paddingHorizontal: '10%',
        fontSize: 15,
        justifyContent: "center",
        alignContent: "center",
    },
    curatorAvatar: {
        marginHorizontal: '7%',
        width: 150,
        height: 150,
        borderRadius: 75,
        borderColor: '#4AB4FF',
        borderWidth: 3,
        paddingBottom: 10,
    },
    curatorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: '1%',
    },
    curatorEmail: {
        fontSize: 12,
        fontWeight: '100',
    },
    curatorDescription: {
        fontSize: 16,
        fontWeight: '100',
        paddingHorizontal: '10%'
    },


})

const mapStateToProps = ({rCurator}) => {
    return ({rCurator})
}

export default connect(
    mapStateToProps,
    {postSignInCurator,emptyErrMessage,isUserFound})
(CuratorScreen);
