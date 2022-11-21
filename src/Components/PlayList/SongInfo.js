import React from 'react';
import { View, Text, StyleSheet,Image ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function SongInfo({albums}) {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Image
          width={200}
          height={200}
          style={styles.backImage}
          source={{uri: `${albums.image[2].link}`}}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '800', color: 'black'}}>
          {albums.name}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', color: 'gray'}}>
          {albums.primaryArtist}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: '#eee',
              borderRadius: 14,
              marginHorizontal: 20,
            }}>
            <Text style={{fontSize: 12, padding: 8, textAlign: 'center'}}>
              {albums.year}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#eee',
              borderRadius: 14,
              marginHorizontal: 20,
            }}>
            <Text style={{fontSize: 12, padding: 8, textAlign: 'center'}}>
              Number of Songs: {albums.songCount}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 12,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#030A5C',
              borderRadius: 30,
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              marginHorizontal: 2,
            }}>
            <View>
              <MaterialCommunityIcons
                name="download-circle-outline"
                size={25}
                color="white"
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.play}>Download All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: '#030A5C',
              borderRadius: 30,
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              marginHorizontal: 2,
            }}>
            <View>
              <MaterialCommunityIcons name="play" size={25} color="white" />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.play}>Play All</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  backImage: {
    flex: 1,
    width:'100%',
    height:300,
    resizeMode:'contain'
  },
  play: {
    flex:1,
    color: 'white',
    fontSize: 18,
  },
});