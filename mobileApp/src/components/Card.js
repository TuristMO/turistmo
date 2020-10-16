import React from 'react';
import { Button, TouchableOpacity, Image, StyleSheet, View, ScrollView, Text, FlatList } from 'react-native'
import Application from "./Application";

const Card = ({ cPackage }) => {
  const {curator:{avatarUrl, firstName, lastName},curatorPicture,title,description,date,usefulApplications} = cPackage
  return (
      <View
          accessibilityLabel='resultItem'
          style={styles.packageContainer}>
        <View style={styles.header}>
          <View>
            <Image source={{ uri: "https://api.adorable.io/avatars/285/abott@adorable.png" }} style={styles.headerImage}/>
          </View>
          <View style={{ marginBottom: 5, flexDirection: 'column', flex: 1, justifyContent: 'space-around', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
              <Text
                  testID="curatorName"
                  accessibilityLabel='curatorName'
              >{firstName} {lastName}</Text>
              <Text style={[styles.headerDate]}>{date} </Text>
            </View>
            <Text style={styles.headerTitle}>{title} </Text>
          </View>

        </View>
        <View>
          <Text style={styles.description}>{description} </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.recApp}> RECOMMENDED APPLICATIONS </Text>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={usefulApplications}
              keyExtractor={item => item.guid}
              renderItem={({ item }) => {
                return <Application logo={item.logo} link={item.android_link} id={item.guid} />
              }}
          />
        </View>
      </View>

  )
}

const styles = StyleSheet.create({
  packageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerImage: {
    margin: 5,
    width: 55,
    height: 55,
    borderRadius: 10
  },
  headerDate: {
    fontSize: 14,
    fontWeight: '700',
    color: 'orange',
    textTransform: 'uppercase',
    alignSelf: 'flex-end'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },

  description: {
    paddingHorizontal: 5,
    fontSize: 14,
  },
  recApp: {
    marginVertical: 5,
    paddingLeft: 10,
    fontSize: 13,
    color: 'orange',
    textTransform: 'uppercase',
  },

})

export default Card;
