import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import songs from '../../data';
const MusicQueue = ({
  renderSongs,
  scrollX,
  trackArtist,
  tracktitle,
  repeatIcon,
  playBackState,
  progress,
  togglePlayBack,
  repeatMode,
  skipForward,
  skipBackward,
  State,
}) => {
  const songSlider = useRef(null);
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={songSlider}
        data={songs}
        renderItem={renderSongs}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={15}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
      <View>
        <Text style={styles.song_name}>{tracktitle}</Text>
      </View>
      <View>
        <Text style={styles.artist_name}>{trackArtist}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              repeatMode();
            }}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={35}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="heart-outline" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Slider
          style={styles.slider}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="red"
          minimumTrackTintColor="red"
          maximumTrackTintColor="gray"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>
      <View style={styles.song_time}>
        <Text style={styles.time_text}>
          {new Date(progress.position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Text style={styles.time_text}>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .substr(14, 5)}
        </Text>
      </View>
      <View style={styles.music_control}>
        <TouchableOpacity onPress={skipBackward}>
          <Icon
            name="play-skip-back-outline"
            size={50}
            color="white"
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            togglePlayBack(playBackState);
          }}>
          <Icon
            name={
              playBackState == State.Playing
                ? 'pause-circle-outline'
                : 'play-circle-outline'
            }
            size={80}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <Icon
            name="play-skip-forward-outline"
            size={50}
            color="white"
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  song_image: {
    width: 300,
    height: 280,
    borderRadius: 10,
    marginTop: 20,
  },
  img_box: {
    elevation: 5,
  },
  song_name: {
    fontSize: 30,
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  artist_name: {
    color: 'white',
    fontSize: 18,
  },
  slider: {
    width: 350,
    height: 40,
    marginTop: 10,
    // flexDirection: 'row',
  },
  song_time: {
    width: 320,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time_text: {
    fontSize: 15,
    color: 'white',
    margin: 0,
  },
  music_control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    margin: 20,
  },
  flatlist: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MusicQueue;
