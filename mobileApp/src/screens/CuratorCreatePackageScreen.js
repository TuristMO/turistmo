import React, {useEffect, useState} from 'react';
import {
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions, FlatList, SafeAreaView, Alert
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from "react-native-elements";
import {connect} from "react-redux";
import {
    emptyServerMessage,
    getAllApplications,
    getAllTags,
    getAllPackagesFromCurator,
    setActiveCurator,
    postSavePackage,
} from "../actions";
import Icon from 'react-native-vector-icons/Feather';
// const {width, height} = Dimensions.get("window");

const CuratorCreatePackageScreen = (props) => {
        const {
            rApplications:{loading,applications},
            rTags:{tags},
            rCurator: {curator,jwt},
            packages: {postPackages,packageErrorMessage,packageSuccessMessage},
            getAllPackagesFromCurator,
            getAllApplications,
            getAllTags,
            setActiveCurator,
            postSavePackage,
            navigation,
        } = props;
    const [savePackage, setSavePackage] = useState({
        city: '',
        tags: [],
        title: '',
        description:'',
        usefulApplications: [],
    });

    const showAlertMessage = () => {
        let errorList = ''
        if (packageErrorMessage) {
            packageErrorMessage.forEach(error => errorList += error+'\n');
            return (
                Alert.alert(
                    "Too bad!",
                    errorList,
                    [
                        {
                            text: "Ok, got it!",
                            onPress: () => emptyServerMessage(),
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            )
        }
        if (packageSuccessMessage) {
            return (
                Alert.alert(
                    "Great!",
                    packageSuccessMessage,
                    [
                        {
                            text: "OK!",
                            onPress: () => getAllPackagesFromCurator(jwt, ()=> emptyMessageAndNavigate()),
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            )
        }
    }

    useEffect(() => {
       getAllApplications();
       getAllTags();
       showAlertMessage()
    },[packageErrorMessage,packageSuccessMessage])


    const dropDownPickerList = () =>  {
       let list = [];
       tags.forEach(e => list.push({label: e.title, value: e, icon: () => <Icon name="flag" size={18} color="#900" />}) )
       return list;
    }

    const emptyMessageAndNavigate = () => {
        emptyServerMessage()
        navigation.push('SignedInCuratorScreen')
    }


    const descriptionChange = (val) => {
        setSavePackage({ ...savePackage, description: val})
    };

    const titleChange = (val) => {
        setSavePackage({ ...savePackage, title: val})
    };

    const cityChange = (val) => {
        setSavePackage({ ...savePackage, city: val});
    };
    const addApplication = (application) => {
        let newList = savePackage.usefulApplications;
        newList.push(application)
        setSavePackage({...savePackage, usefulApplications: newList})
    }

    return (
        <View testID="curatorCreatePackageView">
            <TextInput
                testID="curatorCreatePackageTitle"
                accessibilityLabel='curatorCreatePackageTitle'
                style={{height: 40, borderWidth: 1}}
                onChangeText={titleChange}
                placeholder={'Package title'}
            />

            <TextInput
                testID="curatorCreatePackageDescription"
                accessibilityLabel='curatorCreatePackageDescription'
                style={{height: 40, borderWidth: 1}}
                onChangeText={descriptionChange}
                placeholder={'Package description'}
            />

            <DropDownPicker
                testID="curatorCreatePackageCityPicker"
                accessibilityLabel='curatorCreatePackageCityPicker'
                items={[
                    {label: 'Stockholm'},
                    {label: 'Göteborg'},
                    {label: 'Malmö'},
                ]}
                placeholder={'Select city'}
                defaultIndex={0}
                containerStyle={{height: 60}}
                onChangeItem={item => cityChange(item.label)}
            />

            <DropDownPicker
                testID="curatorCreatePackageTagPicker"
                accessibilityLabel='curatorCreatePackageTagPicker'
                items={dropDownPickerList()}
                placeholder={'Select Tag'}
                multiple={true}
                multipleText="%d tags have been selected."
                min={0}
                max={10}
                defaultValue={savePackage.tags}
                containerStyle={{height: 60}}
                onChangeItem={item => setSavePackage({...savePackage, tags:item})}
            />

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:20}}>
                <SafeAreaView >
                    <FlatList
                        testID="curatorCreatePackageAppFlatlist"
                        accessibilityLabel='curatorCreatePackageAppFlatlist'
                        numColumns={4}
                        data={applications}
                        keyExtractor={item => item.guid}
                        renderItem={({item}) => {
                            return <TouchableOpacity testID={item.title} onPress={()=>addApplication(item)}>
                                <Image source={{ uri: item.logo }} style={styles.logo}/>
                            </TouchableOpacity>
                        }}
                    />
                </SafeAreaView>
            </View>
            <Button
                testID="curatorCreatePackageSaveButton"
                accessibilityLabel='curatorCreatePackageSaveButton'
                color={'#4AB4FF'}
                title={"Save package"}
                onPress={()=> postSavePackage(savePackage,jwt, ()=> showAlertMessage())}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    logo: {
        marginHorizontal: 10,
        width: 55,
        height: 55,
        borderRadius: 10,
        marginBottom: '20%'
    },

})
const mapStateToProps = ({location, rApplications,rCurator,packages, rTags}) => {
    return ({rApplications, location, rCurator, packages, rTags}); //define your own keys
}

export default connect(
    mapStateToProps,
        {getAllApplications,
        setActiveCurator,
        getAllTags,
        getAllPackagesFromCurator,
        postSavePackage})
(CuratorCreatePackageScreen);



