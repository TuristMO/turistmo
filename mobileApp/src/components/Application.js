import React ,{ useCallback} from 'react';
import { Image, StyleSheet, TouchableOpacity ,Linking,Alert} from 'react-native'



const Application = ({ link, logo, id }) => {

  const handlePress = useCallback(async () => {
    //TODO 1. Check which os platform the app is being used.
    //TODO 2. Depending on which platform the app is being used, use the correct link;
    //NOTE! WHEN WE RECEIVE LINKS FROM THE SERVER THERE ARE TWO DIFFERENT LINKS:
    // ONE FOR IOS AND THE OTHER ONE FOR ANDROID.

    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(link);
    } else {
      Alert.alert(`Don't know how to open this URL: ${link}`);
    }
  }, [link]);

  return <TouchableOpacity onPress={handlePress}>
    <Image source={{ uri: logo }} style={styles.logo}/>
  </TouchableOpacity>

}

const styles = StyleSheet.create({
  logo: {
    marginHorizontal: 10,
    width: 55,
    height: 55,
    borderRadius: 10
  },

})

export default Application;
