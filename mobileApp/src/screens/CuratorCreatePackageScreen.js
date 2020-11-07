import React, {useEffect, useState} from 'react';
import {
    Button,
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
import CheckBox from '@react-native-community/checkbox';
import Application from "../components/Application";
import {connect} from "react-redux";
import {
    getAllApplications,
    getAllPackages,
    getAllPackagesBusiness,
    getAllPackagesCulture,
    getAllPackagesFood,
    getAllPackagesTravel
} from "../actions";

const {width, height} = Dimensions.get("window");

const CuratorCreatePackageScreen = (props) => {
    // const {guid, title, city, description, createdDate, curator, usefulApplications, tags} = route.params.path;

        const {
            location, rApplications:{loading,applications},
            getAllApplications, navigation
        } = props;

    const [City, setCity] = useState('')
    const [Tags, setTags] = useState('')
    const [value, onChangeText] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const [isSelected3, setSelection3] = useState(false);
    const [isSelected4, setSelection4] = useState(false);

    useEffect(() => {
        // TEMPORARY SOLUTION UNTIL GEO LOCATION IS ACCEPTED FROM "PO"
       getAllApplications()
    }, []);

    let tagList = [];

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: '1 App ',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: '2 App ',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: '3 App ',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa9fghfg',
            title: '4 App ',
        },
        {
            id: '58694a0f-3da1-471f-fgh96-145571e29d72',
            title: '5 App ',
        },
    ];

    const Item = ({title}) => (
        <Text style={styles.title}>{title}</Text>
    );

    const renderItem = ({item}) => (
        <Item title={item.title}/>
    );

    return (
        <View>
            <DropDownPicker
                items={[
                    {label: 'Stockholm'},
                    {label: 'Göteborg'},
                    {label: 'Malmö'},
                ]}
                placeholder={'Select city'}
                defaultIndex={0}
                containerStyle={{height: 60}}
                onChangeItem={item => setCity(item.label)}
            />

            <TextInput
                style={{height: 40, borderWidth: 1}}
                onChangeText={text => onChangeText(text)}
                placeholder={'Package description'}
                value={value}
            />

            <DropDownPicker
                items={[
                    {label: 'Food'},
                    {label: 'Business'},
                    {label: 'Culture'},
                    {label: 'Travel'},
                ]}
                placeholder={'Select Tag'}
                defaultIndex={0}
                containerStyle={{height: 60}}
                onChangeItem={item => setTags(item.label)}
            />

            {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
            {/*    <CheckBox*/}
            {/*        disabled={false}*/}
            {/*        value={toggleCheckBox}*/}
            {/*        onValueChange={(newValue) => setToggleCheckBox(newValue)}*/}
            {/*    />*/}
            {/*    <Text style={styles.label}>Food</Text>*/}

            {/*    <CheckBox*/}
            {/*        value={isSelected2}*/}
            {/*        onValueChange={setSelection2}*/}
            {/*        style={styles.checkbox}*/}
            {/*    />*/}
            {/*    <Text style={styles.label}>Business</Text>*/}
            {/*    <CheckBox*/}
            {/*        value={isSelected3}*/}
            {/*        onValueChange={setSelection3}*/}
            {/*        style={styles.checkbox}*/}
            {/*    />*/}
            {/*    <Text style={styles.label}>Culture</Text>*/}

            {/*    <CheckBox*/}
            {/*        value={isSelected4}*/}
            {/*        onValueChange={setSelection4}*/}
            {/*        style={styles.checkbox}*/}
            {/*    />*/}
            {/*    <Text style={styles.label}>Travel</Text>*/}
            {/*</View>*/}

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:20}}>
                <SafeAreaView >
                    <FlatList
                        numColumns={4}
                        data={DATA}
                        keyExtractor={item =>  item.id}
                        // renderItem={renderItem}
                        renderItem={({renderItem}) => (
                            <TouchableOpacity

                                onPress={() => console.log("clicked")}
                            >
                                <Item name={renderItem} color="red"/>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({})

const mapStateToProps = ({location, rApplications}) => {
    return ({rApplications, location}); //define your own keys
}

export default connect(
    mapStateToProps,
    {getAllApplications})
(CuratorCreatePackageScreen);