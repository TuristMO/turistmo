import React, {useEffect, useState} from 'react';
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    SafeAreaView, FlatList, TouchableHighlight, TouchableOpacity
} from 'react-native'
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {emptyServerMessage, getAllPackagesFromCurator, postSignInCurator,deletePackage} from "../actions";

import {SwipeListView} from "react-native-swipe-list-view";

const CuratorScreen = (props) => {
    const {navigation, rCurator: {curator, jwt}, packages: {packagesBelongingToCurator},deletePackage, getAllPackagesFromCurator} = props;

    const [listData, setListData] = useState(
        packagesBelongingToCurator.map((NotificationItem, index) => ({
            key: `${index}`,
            title: NotificationItem.title,
            details: NotificationItem.description,
        })),
    );
    const closeRow = (rowMap, rowKey) => {
        if(rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        deletePackage(jwt,packagesBelongingToCurator[prevIndex],()=>getAllPackagesFromCurator)
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
             <VisibleItem data={data} />
        )
    };

    const HiddenItemWithActions = props => {
        const {onClose, onDelete} = props;

        return (
            <View style={styles.rowBack}>
                <Text>Left</Text>
                <TouchableOpacity testID="curatorHiddenClosePackageButton" accessibilityLabel='curatorHiddenClosePackageButton' style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
                    <Text>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity testID="curatorHiddenDeletePackageButton" accessibilityLabel='curatorHiddenDeletePackageButton' style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
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


    return (
        <View style={styles.container}>
             <View style={styles.titleContainer}>
                 <Image
                     testID="curatorAvatar"
                     accessibilityLabel='curatorAvatar'
                     source={{uri: "https://res.cloudinary.com/hkiuhnuto/image/upload/v1604658326/myAvatar_erdwgy.png"}}
                     style={styles.curatorAvatar}/>
                 <Text
                     testID="curatorFullName"
                     accessibilityLabel='curatorFullName'
                     style={styles.curatorTitle}>{curator.firstName} {curator.lastName}</Text>
                 <Text
                     testID="curatorEmail"
                     accessibilityLabel='curatorEmail'
                     style={styles.curatorEmail}>{curator.email}</Text>
             </View>


            <SwipeListView
                testID="curatorSwipePackageList"
                accessibilityLabel='curatorSwipePackageList'
                style={styles.packageContainer}
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}  // positivt för att det pushas från vänster till höger
                rightOpenValue={-150} // negativt för att det pushas från höger till vänster
                //disableLeftSwipe  > Ifall vi disable
                disableRightSwipe
            />
            <Button
                testID="curatorCreateButton"
                accessibilityLabel='curatorCreateButton'
                color={'#4AB4FF'}
                title={"Create package"}
                onPress={()=> navigation.push('CreatePackageScreen')}
            />
        </View>
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
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
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
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
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
    },

})

const mapStateToProps = ({rCurator, packages}) => {
    return ({rCurator, packages})
}

export default connect(
    mapStateToProps,
    {postSignInCurator, getAllPackagesFromCurator,deletePackage, emptyServerMessage})
(CuratorScreen);
