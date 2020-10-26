import React, {useState} from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    StatusBar,
} from 'react-native'
import {Icon, Button} from 'react-native-elements';
import Application from "../components/Application";
import GoBackArrowPush from "../components/GoBackArrowPush";

const PackageDetailsScreen = ({navigation, route}) => {
    const {guid, title, city, description, createdDate, curator, usefulApplications, tags} = route.params.path;
    // console.log(route.params.path)
    const color = tags[0].title;
    // console.log(tagColor(color));
    console.log(title)
    const date = createdDate.substr(0, 10)
    const MAIN_COLOR = tagColor(color);

    const [numberLike, setNumberLike] = useState(0);
    const [numberDislike, setNumberDislike] = useState(0);

    return (
        <SafeAreaView
            style={styles.container}>
            <StatusBar backgroundColor={MAIN_COLOR} barStyle={"light-content"}/>
            <View
                testID="packageDetailtitleContainer"
                accessibilityLabel='packageDetailtitleContainer'
                style={[styles.titleContainer, {backgroundColor: MAIN_COLOR}]}>
                <View style={{flex: 3, paddingTop: '10%'}}>
                    <Text
                        testID="packageDetailpackageTitle"
                        accessibilityLabel='packageDetailpackageTitle'
                        style={styles.packageTitle}
                    >{title}</Text>
                </View>
                <View style={{flex: 1}}>
                    <GoBackArrowPush navigation={navigation} destination={'Home'}/>
                </View>
            </View>
            <View
                testID="packageDetailpackageContainer"
                accessibilityLabel='packageDetailpackageContainer'
                style={styles.packageContainer}>
                <Text
                    testID="packageDetailpackageCity"
                    accessibilityLabel='packageDetailpackageCity'
                    style={styles.packageCity}>{city}</Text>
                <Text
                    testID="packageDetailpackageDate"
                    accessibilityLabel='packageDetailpackageDate'
                    style={styles.packageDate}>{date}</Text>
                <Text
                    testID="packageDetailpackageDetailsHead"
                    accessibilityLabel='packageDetailpackageDetailsHead'
                    style={styles.packageDetailsHead}>Details</Text>
                <Text
                    testID="packageDetailpackageDescription"
                    accessibilityLabel='packageDetailpackageDescription'
                    style={styles.packageDescription}>{description}</Text>
                <FlatList
                    style={styles.packageAppList}
                    numColumns={4}
                    showsHorizontalScrollIndicator={false}
                    data={usefulApplications}
                    keyExtractor={item => guid +" "+ item.guid}
                    renderItem={({item, index}) => {
                        return <Application logo={item.logo} link={item.android_link} id={item.guid}/>
                    }}
                />
            </View>
            <View
                testID='packageDetailratingContainer'
                accessibilityLabel='ratingContainer'
                style={styles.ratingContainer}>
                <Icon
                    title={'Like'}
                    testID='packageDetailLikeButton'
                    accessibilityLabel='likeButton'
                    name={'thumbs-up'}
                    size={40}
                    color='#00AAFF'
                    type='font-awesome'
                    onPress={() => setNumberLike(numberLike + 1)} //Make sure to save this in db later on
                /><Text testID={'numberLike'} style={styles.likeText}>{numberLike}</Text>
                <Icon
                    title={'Dislike'}
                    testID='packageDetailDislikeButton'
                    accessibilityLabel='dislikeButton'
                    onPress={() => setNumberDislike(numberDislike + 1)} //Make sure to save this in db later on
                    name={'thumbs-down'}
                    size={40}
                    color='#f50'
                    type='font-awesome'
                /><Text testID={'numberDislike'} style={styles.likeText}>{numberDislike}</Text>
                <Button
                    testID="packageDetailReportButton"
                    accessibilityLabel='reportButton'
                    buttonStyle={styles.reportButton}
                    // icon={{
                    //     name: "pencil",
                    //     type: 'font-awesome',
                    //     size: 30,
                    //     color: '#ff2a00',
                    // }}
                    title="Report"
                    titleStyle={{paddingTop: '10%',fontSize: 20, color: '#ff2a00'}}
                    onPress={() => console.log("This will get reported")}/>
            </View>
            <View
                testID="packageDetailcuratorContainer"
                accessibilityLabel='curatorContainer'
                style={styles.curatorContainer}>
                <TouchableOpacity onPress={() => console.log("Off to curator")}>
                    <View
                        testID="packageDetailcuratorTouchableOp"
                        accessibilityLabel='packageDetailcuratorTouchableOp'
                        style={{flexDirection: 'row'}}>
                        <Image
                            testID="packageDetailcuratorAvatar"
                            accessibilityLabel='packageDetailcuratorAvatar'
                            source={{uri: "https://api.adorable.io/avatars/285/abott@adorable.png"}}
                            style={styles.curatorAvatar}/>
                        <View
                            testID="packageDetailcuratorText"
                            accessibilityLabel='packageDetailcuratorText'
                            style={styles.curatorText}>
                            <Text
                                testID="curatorName"
                                accessibilityLabel='curatorName'
                                style={styles.curatorTitle}
                            >{curator.firstName} {curator.lastName}</Text>
                            <Text style={styles.curatorShow}>Show more from {curator.firstName}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export const tagColor = tag => {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
    },
    packageContainer: {
        flex: 3,
    },
    ratingContainer: {
        flex: 0.5,
        paddingTop: '2%',
        paddingLeft: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    curatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    packageTitle: {
        marginTop: "2%",
        paddingLeft: "5%",
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold",
    },
    packageDescription: {
        paddingHorizontal: '10%',
        fontSize: 15,
        justifyContent: "center",
        alignContent: "center",
    },
    packageCity: {
        padding: 5,
        marginRight: 10,
        fontSize: 20,
        alignSelf: 'flex-end',
        fontWeight: "bold",
    },
    packageAppList: {
        margin: 20,
    },
    packageDate: {
        paddingRight: 20,
        alignSelf: 'flex-end',
    },
    packageDetailsHead: {
        paddingLeft: "10%",
        fontSize: 20,
        fontWeight: "bold",
    },
    curatorAvatar: {
        marginLeft: '7%',
        marginRight: '7%',
        width: 60,
        height: 60,
        borderRadius: 10,
        paddingBottom: 50,
    },
    curatorTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    curatorShow: {
        fontSize: 16,
    },
    reportButton: {
        marginBottom: 10,
        width: 120,
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0)',
        color: '#ff2a00',
    },
    likeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },


})

export default PackageDetailsScreen;
