import React, {useEffect, useState} from 'react';
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    SafeAreaView, FlatList, TouchableHighlight, TouchableOpacity, ActivityIndicator
} from 'react-native'
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {emptyServerMessage, getAllPackagesFromCurator, postSignInCurator, deletePackage} from "../actions";

import {SwipeListView} from "react-native-swipe-list-view";
import GoBackArrow from "../components/GoBackArrow";

const CuratorScreen = (props) => {
    const {navigation, rCurator: {curator, jwt}, packages: {loading, packagesBelongingToCurator}, deletePackage, getAllPackagesFromCurator} = props;

    const [listData, setListData] = useState(
        packagesBelongingToCurator.map((NotificationItem, index) => ({
            key: `${index}`,
            title: NotificationItem.title,
            details: NotificationItem.description,
        })),
    );
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        deletePackage(jwt, packagesBelongingToCurator[prevIndex], () => getAllPackagesFromCurator)
        const newData = [...listData];
        newData.splice(prevIndex, 1);
        setListData(newData);
    }

    const VisibleItem = props => {
        const {data} = props;
        return (
            <View style={styles.rowFront}>
                <TouchableHighlight
                    style={styles.rowFrontVisible}>
                    <View>
                        <Text style={styles.title}
                              numberOfLines={1}>{data.item.title}
                        </Text>
                        <Text style={styles.details}
                              numberOfLines={1}>{data.item.details}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    const renderItem = (data, rowMap) => {
        return (
            <VisibleItem data={data}/>
        )
    };

    const HiddenItemWithActions = props => {
        const {onClose, onDelete} = props;

        return (
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
                    <Text>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        )

    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1, justifyContent: "center"}}/>
    }


    return (
        <View style={styles.container}>
            <GoBackArrow testID={'signinGoBackArrow'} navigation={navigation} destination={'CuratorScreen'}/>
            <View style={styles.titleContainer}>
                <Image
                    testID="packageDetailcuratorAvatar"
                    accessibilityLabel='packageDetailcuratorAvatar'
                    source={{uri: curator.avatarUrl}}
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
            <View style={styles.footerTop}/>
            <SwipeListView
                testID="packageDetailpackageContainer"
                accessibilityLabel='packageDetailpackageContainer'
                style={styles.packageContainer}
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={45}  // positivt för att det pushas från vänster till höger
                rightOpenValue={-150} // negativt för att det pushas från höger till vänster
                //disableLeftSwipe  > Ifall vi disable
                disableRightSwipe
            />
            <View style={{backgroundColor: '#FFF'}}>
                <Button
                    buttonStyle={{marginTop: '5%'}}
                    color={'#4AB4FF'}
                    title={"Create package"}
                    onPress={() => navigation.push('CreatePackageScreen')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4AB4FF',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerTop: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '3%',
    },
    packageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
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
        marginHorizontal: '2%',
        width: 100,
        height: 100,
        borderRadius: 75,
        borderColor: '#B3F2BA',
        borderWidth: 5,
        paddingBottom: '1%',
    },
    curatorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: '1%',
        color: '#FFF'
    },
    curatorEmail: {
        fontSize: 12,
        fontWeight: '100',
        color: '#FFF'
    },
    curatorDescription: {
        fontSize: 16,
        fontWeight: '100',
        paddingHorizontal: '10%'
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 5,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: '2%',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: '25%',
        height: '120%',
        paddingRight: 5,
    },
    backRightBtnLeft: {
        backgroundColor: '#4AB4FF',
        right: '24%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    backRightBtnRight: {
        backgroundColor: '#ff2a00',
        right: '0%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: '10%',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
        paddingBottom: '5%'
    },

})

const mapStateToProps = ({rCurator, packages}) => {
    return ({rCurator, packages})
}

export default connect(
    mapStateToProps,
    {postSignInCurator, getAllPackagesFromCurator, deletePackage, emptyServerMessage})
(CuratorScreen);
