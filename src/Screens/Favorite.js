import { View, Text,TouchableOpacity,Image,FlatList,StyleSheet } from 'react-native'
import React from 'react';
import Songs from '../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
 const store = async e => {
   try {
     await AsyncStorage.setItem('AlbumId', e);

     navigation.navigate('Playlist');
   } catch (err) {
     console.log(err);
   }
 };
const Favorite = () => {
  return (
    <View>
      <FlatList
        style={styles.flatlist}
        data={Songs}
        horizontal={false}
        showsHorizontalScrollIndicator={true}
        renderItem={({item}) => { 
          console.log("item.......",item)        
            return (
              <TouchableOpacity
                onPress={() => {
                  store(item.id);
                }}>
                <View style={styles.box}>
                  <Image source={{uri: `${item.image}`}} style={styles.image} />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={{color:'gray',}}>{item.artist}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flatlist: {
    width: '98%',
    margin: 10,
  },
  box: {
    width: '90%',
    marginHorizontal: 10,
    height: 80,
    marginVertical: 15,
    flexDirection: 'row',
  alignItems:'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    color: 'black',
    marginHorizontal: 10,
    fontSize:18,
    fontWeight:'600'
  },
});
export default Favorite