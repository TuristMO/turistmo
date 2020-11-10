import React, {useEffect, useState} from 'react';
import {
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions, FlatList, SafeAreaView
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from "react-native-elements";
// import CheckBox from '@react-native-community/checkbox';
import Application from "../components/Application";
import {connect} from "react-redux";
import {
    emptyErrMessage,
    getAllApplications, isUserFound,
    postSavePackage, postSignInCurator,
    getAllTags,
} from "../actions";

// const {width, height} = Dimensions.get("window");

const CuratorCreatePackageScreen = (props) => {
        const {
            rApplications:{loading,applications},
            rTags:{tags},
            rCurator: {curator,jwt},
            getAllApplications, navigation,postSavePackage,
            getAllTags,
        } = props;

    const [city, setCity] = useState('')
    const [tag, setTag] = useState('')
    const [description, setDescription] = useState('');
    let applicationList = [];
    const [applicationsState, setApplicationsState] = useState(applicationList);
    let tagList = [];
    const [tagState, setTagState] = useState(tagList);

    const [savePackage, savePackageData] = useState({
        city: '',
        tags: [],
        title: '',
        description:'',
        applicationPackageData: []
    });

    //
    // const [toggleCheckBox, setToggleCheckBox] = useState(false);
    // const [isSelected2, setSelection2] = useState(false);
    // const [isSelected3, setSelection3] = useState(false);
    // const [isSelected4, setSelection4] = useState(false);

    useEffect(() => {
        // TEMPORARY SOLUTION UNTIL GEO LOCATION IS ACCEPTED FROM "PO"
       getAllApplications();
    }, []);

    useEffect(() => {
        // TEMPORARY SOLUTION UNTIL GEO LOCATION IS ACCEPTED FROM "PO"
        getAllTags();
    }, []);

    const descriptionChange = (val) => {
        savePackageData({ ...savePackage, description: val})
    };

    const titleChange = (val) => {
        savePackageData({ ...savePackage, title: val})
    };

    const tagChange = (val) => {
        let newList = savePackage.tags;
        newList.push(val)
        savePackageData({...savePackage,tags: newList})
    };

    const cityChange = (val) => {
        savePackageData({ ...savePackage, city: val});
    };
    const addApplication = (application) => {
        let newList = savePackage.applicationPackageData;
        newList.push(application)
        savePackageData({...savePackage,applicationPackageData: newList})
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



            {/*<DropDownPicker*/}
            {/*    items={[*/}
            {/*        {label: 'Food'},*/}
            {/*        {label: 'Business'},*/}
            {/*        {label: 'Culture'},*/}
            {/*        {label: 'Travel'},*/}
            {/*    ]}*/}
            {/*    placeholder={'Select Tag'}*/}
            {/*    defaultIndex={0}*/}
            {/*    containerStyle={{height: 60}}*/}
            {/*    onChangeItem={item => tagChange(item.label)}*/}
            {/*/>*/}

            {/*<SafeAreaView >*/}
            {/*    <DropDownPicker*/}
            {/*        placeholder={'Select Tag'}*/}
            {/*        data={tags}*/}
            {/*        keyExtractor={item =>  item.guid}*/}
            {/*        renderItem={({item}) => {*/}
            {/*            items={label:item}*/}
            {/*            return  onChangeItem={items => tagChange(item.label)}*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</SafeAreaView>*/}

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:20}}>
                <SafeAreaView >
                    <FlatList
                        numColumns={4}
                        data={applications}
                        keyExtractor={item =>  item.guid}
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
                // onPress={navigation.navigate('CreatePackageScreen')}/>
                onPress={()=> postSavePackage(savePackage,jwt)}
            />
            {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:20}}>*/}
            {/*    <SafeAreaView >*/}
            {/*        <FlatList*/}
            {/*            numColumns={4}*/}
            {/*            data={packageData.applicationPackageData}*/}
            {/*            keyExtractor={item =>  item.guid}*/}
            {/*            renderItem={({item}) => {*/}
            {/*                return <TouchableOpacity testID={item.title} onPress={()=>addApplication(item)}>*/}
            {/*                    <Image source={{ uri: item.logo }} style={styles.logo}/>*/}
            {/*                </TouchableOpacity>*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </SafeAreaView>*/}
            {/*</View>*/}

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
        getAllTags,
    postSavePackage})
(CuratorCreatePackageScreen);



