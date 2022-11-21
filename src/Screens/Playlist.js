import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Trending from '../Components/Trending';
import SongInfo from '../Components/PlayList/SongInfo';
import SongList from '../Components/PlayList/SongList';

const Playlist = ({navigation, route}) => {
  const [albums, setAlbums] = useState(null);
  const [songs, setSongs] = useState(null);
  const [trending, setTrending] = useState(null);
  const getAlbum = async () => {
    try {
      const id = await AsyncStorage.getItem('AlbumId');
      const res = await fetch(`https://saavn.me/albums?id=${id}`);
      const albumData = await res.json();
      setAlbums(albumData.results);
      const temp = [];
      for (var i = 0; i < albumData.results.songs.length; i++) {
        const length = albumData.results.songs[i].downloadUrl.length;
        temp.push({
          id: albumData.results.songs[i].id,
          name: albumData.results.songs[i].name,
          artist: albumData.results.songs[i].primaryArtists,
          url: albumData.results.songs[i].downloadUrl[length - 1].link,
          image: albumData.results.songs[i].image[2].link,
        });
      }
      setSongs(temp);
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      getTrending();
      getAlbum();
    });
  }, [navigation]);
  const getTrending = async () => {
    const res = await fetch('https://saavn.me/home');
    const data = await res.json();
    setTrending(data.results.new_trending);
  };

  return (
    <View style={{flex: 1}}>
      {albums ? (
        <ScrollView style={styles.container} scrollEnabled>
          <View style={{flex: 1}}>
            <SongInfo albums={albums} />
          </View>
          <View style={{flex: 1}}>
            <SongList albums={albums} songs={songs} />
          </View>
          {trending ? (
            <View style={{flex: 1}}>
              <ScrollView>
                <Trending
                  album={trending}
                  title={'Trending'}
                  skip={'playlist'}
                  navigation={navigation}
                />
              </ScrollView>
            </View>
          ) : (
            <ActivityIndicator style={styles.loading} size={'large'} />
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator style={styles.loading} size={'large'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Playlist;
