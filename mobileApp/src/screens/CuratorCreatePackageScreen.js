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
import Icon from 'react-native-vector-icons/Feather';
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
    //let tagList = [];
    const [tagState, setTagState] = useState([]);

    const [savePackage, savePackageData] = useState({
        city: '',
        tags: [],
        title: '',
        description:'',
        usefulApplications: [],
        curator:curator,
    });

    //
    // const [toggleCheckBox, setToggleCheckBox] = useState(false);
    // const [isSelected2, setSelection2] = useState(false);
    // const [isSelected3, setSelection3] = useState(false);
    // const [isSelected4, setSelection4] = useState(false);

    useEffect(() => {
        // TEMPORARY SOLUTION UNTIL GEO LOCATION IS ACCEPTED FROM "PO"
       getAllApplications();
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
        let newList = savePackage.usefulApplications;
        newList.push(application)
        savePackageData({...savePackage,usefulApplications: newList})
    }
    console.log(jwt)
    console.log(savePackage)
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
            {/*        {label: tags[0].title},*/}
            {/*        {label: tags[1].title},*/}
            {/*        {label: tags[2].title},*/}
            {/*        {label: tags[3].title},*/}
            {/*    ]}*/}
            {/*    placeholder={'Select Tag'}*/}
            {/*    defaultIndex={0}*/}
            {/*    containerStyle={{height: 60}}*/}
            {/*    onChangeItem={item => tagChange(item.label)}*/}
            {/*/>*/}

            <DropDownPicker
                items={[{label: 'Culture', value: tags[0], icon: () => <Icon name="flag" size={18} color="#900" />},
                    {label: 'Food', value: tags[1], icon: () => <Icon name="flag" size={18} color="#900" />},
                    {label: 'Travel', value: tags[2], icon: () => <Icon name="flag" size={18} color="#900" />},
                    {label: 'Business', value: tags[3], icon: () => <Icon name="flag" size={18} color="#900" />}
                    ]}
                placeholder={'Select Tag'}
                multiple={true}
                multipleText="%d items have been selected."
                min={0}
                max={10}
                defaultValue={tagState}
                defaultIndex={0}
                containerStyle={{height: 60}}
                onChangeItem={item => tagChange(item.value)}
            />

            {/*<DropDownPicker*/}
            {/*    items={[*/}
            {/*        {label: 'UK', value: 'uk', icon: () => <Icon type='font-awesome' name="flag" size={18} color="#900" />},*/}
            {/*        {label: 'France', value: 'france', icon: () => <Icon type='font-awesome' name="flag" size={18} color="#900" />},*/}
            {/*    ]}*/}

            {/*    multiple={true}*/}
            {/*    multipleText="%d items have been selected."*/}
            {/*    min={0}*/}
            {/*    max={10}*/}
            {/*    defaultValue={"hej"}*/}
            {/*    containerStyle={{height: 40}}*/}
            {/*    itemStyle={{*/}
            {/*        justifyContent: 'flex-start'*/}
            {/*    }}*/}
            {/*    onChangeItem={item => tagChange(item.value)}*/}
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
                onPress={()=> postSavePackage(savePackage,jwt).then(navigation.push('SignedInCuratorScreen'))}
                // onPress={()=> console.log("SPARA HELVETE")}
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



