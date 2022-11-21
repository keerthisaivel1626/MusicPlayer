//import liraries
import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
// create a component
const SongList = ({albums, songs}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.list}>
      {albums.songs.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={async () => {
              if (item.downloadUrl == false) {
                alert('Sorry!! No Data Found.');
              }
              await AsyncStorage.setItem('songId', index.toString());
              await AsyncStorage.setItem('music', songs.toString());

              navigation.navigate('MusicPlayer', {
                currentIndex: index,
                music: songs,
                setplayer: false,
              });
            }}>
            <View style={styles.box}>
              <Image
                style={styles.songImage}
                source={{uri: `${item.image[0].link}`}}
              />
              <Text style={styles.songName}>{item.name}</Text>
              <MaterialCommunityIcons
                style={styles.icon}
                name="download-circle-outline"
                size={30}
              />
              <MaterialCommunityIcons
                style={styles.icon}
                name="play"
                size={30}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  list: {
   flex:1,
  },
  box: {
    flexDirection: 'row',
    width: '90%',
    elevation: 6,
    shadowColor: 'black',
    shadowOpacity: 0.65,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    backgroundColor: 'white',
    margin: 8,
    padding:10,
    borderRadius:20,
    marginHorizontal: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  songImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  songName: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
    // borderWidth:1,
    width: '65%',
  },
});

//make this component available to the app
export default SongList;
