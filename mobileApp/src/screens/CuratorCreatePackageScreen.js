import React, {useEffect, useState} from 'react';
import {
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions, FlatList, SafeAreaView, Alert, ActivityIndicator
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {Button, Input} from "react-native-elements";
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

    const [pickerState, setPickerState] = useState({
        isVisibleA: false,
        isVisibleB: false
    });
    const visibilityChange = (showA,showB) => {
        setPickerState({ ...pickerState, isVisibleA: showA,isVisibleB: showB})
    };


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
       tags.forEach(e => list.push({label: e.title, value: e, icon: () => <Icon name="tag" size={18} color="#CCC" />}) )
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

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1, justifyContent: "center"}}/>
    }

    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.inputContainer}
                testID="packageTitleField"
                accessibilityLabel='packageTitleField'
                onChangeText={titleChange}
                placeholder="Package title"
                returnKeyType={"next"}
            />
            <Input
                containerStyle={styles.inputContainer}
                testID="packageDescriptionField"
                accessibilityLabel='packageDescriptionField'
                onChangeText={descriptionChange}
                placeholder="Package description"
                returnKeyType={"done"}
            />

            <DropDownPicker
                items={[
                    {label: 'Stockholm'},
                    {label: 'Göteborg'},
                    {label: 'Malmö'},
                ]}
                placeholder={'Select city'}
                isVisible={pickerState.isVisibleA}
                onOpen={()=>visibilityChange(true,false)}
                onClose={()=>visibilityChange(false,false)}
                defaultIndex={0}
                style={styles.dropDownPicker}
                labelStyle={styles.dropDownLabel}
                itemStyle={styles.dropDownItem}
                containerStyle={styles.dropDownPickerContainer}
                onChangeItem={item => cityChange(item.label)}
            />

            <DropDownPicker
                items={dropDownPickerList()}
                placeholder={'Select tag'}
                multiple={true}
                multipleText="%d tags have been selected."
                min={0}
                max={10}
                defaultValue={savePackage.tags}
                isVisible={pickerState.isVisibleB}
                onOpen={()=>visibilityChange(false,true)}
                onClose={()=>visibilityChange(false,false)}
                defaultIndex={0}
                style={styles.dropDownPicker}
                labelStyle={styles.dropDownLabel}
                itemStyle={styles.dropDownItem}
                containerStyle={styles.dropDownPickerContainer}
                onChangeItem={item => setSavePackage({...savePackage, tags:item})}
            />
            <Text style={{fontSize: 18,marginTop: '2%',alignSelf:'center'}}>Select applications</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:20, flex: 1}}>
                <View>
                    <FlatList
                        numColumns={4}
                        data={applications}
                        keyExtractor={item => item.guid}
                        scrollEnabled={true}
                        renderItem={({item}) => {
                            return <TouchableOpacity testID={item.title} onPress={()=>addApplication(item)}>
                                <Image source={{ uri: item.logo }} style={styles.logo}/>
                            </TouchableOpacity>
                        }}
                    />
                </View>
            </View>
            <Button
                buttonStyle={styles.savePackage}
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
    container: {
        flex: 1,
    },
    savePackage: {
        marginTop: '5%'
    },
    inputContainer: {
        marginTop: '2%',
        marginBottom: '-7%'
    },
    dropDownPickerContainer: {
        height: 60,
    },
    dropDownPicker: {
        backgroundColor: 'rgba(255,255,225,0.1)',
    },
    dropDownLabel: {
        fontSize: 18,
        textAlign: 'left',
        color: '#333'
    },
    dropDownItem: {
        fontSize: 14,
        justifyContent: 'center',
        color: '#333'
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



