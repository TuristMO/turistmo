import React, {useEffect, useState} from 'react';
import {
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions, FlatList, SafeAreaView, AlertStatic as Alert
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from "react-native-elements";
// import CheckBox from '@react-native-community/checkbox';
import {connect} from "react-redux";
import {
    emptyServerMessage,
    getAllApplications,
    setActiveCurator,
    postSavePackage, postSignInCurator,
    getAllTags,
} from "../actions";
import Icon from 'react-native-vector-icons/Feather';
// const {width, height} = Dimensions.get("window");

const CuratorCreatePackageScreen = (props) => {
        const {
            rApplications:{loading,applications},
            rTags:{tags},
            rCurator: {curator,jwt},
            packages: {postPackages},
            getAllApplications, navigation,postSavePackage,
            setActiveCurator,
            getAllTags,
        } = props;
    const [savePackage, setSavePackage] = useState({
        city: '',
        tags: [],
        title: '',
        description:'',
        usefulApplications: [],
    });

    useEffect(() => {
       getAllApplications();
       getAllTags();
    }, []);

    function dropDownPickerList () {
       let list = [];
       tags.forEach(e => list.push({label: e.title, value: e, icon: () => <Icon name="flag" size={18} color="#900" />}) )
       return list;
    }

    function setCuratorAndNavigateToProfileScreen(curator) {
        setActiveCurator(curator)
        navigation.navigate('SignedInCuratorScreen')
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
        <View>
            <TextInput
                style={{height: 40, borderWidth: 1}}
                onChangeText={titleChange}
                placeholder={'Package title'}
            />

            <TextInput
                style={{height: 40, borderWidth: 1}}
                onChangeText={descriptionChange}
                placeholder={'Package description'}
            />

            <DropDownPicker
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
                color={'#4AB4FF'}
                title={"Save package"}
                onPress={()=> postSavePackage(savePackage,jwt).then((response)=> response ? setCuratorAndNavigateToProfileScreen(postPackages):Alert.alert("errror","err"))}
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
    return ({rApplications, location, rCurator,packages, rTags}); //define your own keys
}

export default connect(
    mapStateToProps,
    {getAllApplications,
        setActiveCurator,
        getAllTags,
    postSavePackage})
(CuratorCreatePackageScreen);



