import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';

const {width, height} = Dimensions.get('window');
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import MusicQueue from '../Components/MusicPlayer/MusicQueue';
const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        // Capability.Stop,
      ],
    });
    await TrackPlayer.add(songs);
  } catch (error) {
    console.log(error);
  }
};
var count = 0;
const togglePlayBack = async playBackState => {
  count++;
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack != null) {
    if (playBackState % 2 == 1) {
      await TrackPlayer.play();
    } else if (playBackState % 2 == 0) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const [trackImage, setTrackImage] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const [tracktitle, setTrackTitle] = useState('');
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type == Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, image, artist} = track;
      setTrackArtist(artist);
      setTrackImage(image);
      setTrackTitle(title);
    }
  });
  const skipto = async trackId => {
    await TrackPlayer.skip(trackId);
  };
  const [repeat, setRepeat] = useState('off');
  const repeatIcon = () => {
    if (repeat == 'off') {
      return 'repeat-off';
    }
    if (repeat == 'track') {
      return 'repeat-once';
    }
    if (repeat == 'repeat') {
      return 'repeat';
    }
  };
  const repeatMode = () => {
    if (repeat == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeat('track');
    }
    if (repeat == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeat('repeat');
    }
    if (repeat == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeat('off');
    }
  };
  useEffect(() => {
    setupPlayer();
    scrollX.addListener(async ({value}) => {
      const index = Math.round(value / width);
      skipto(index);
      setSongIndex(index);
      setTimeout(async () => {
        if (count > 0) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      }, 400);
    });
    return () => {
      scrollX.removeAllListeners();
      // TrackPlayer.destroy();
    };
  }, []);
  const skipForward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
    // setTimeout(async () => {
    //   await TrackPlayer.play();
    // }, 400);
  };
  const skipBackward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
    // setTimeout(async () => {
    //   await TrackPlayer.play();
    // }, 400);
  };
  // console.log(progress.position)
  function renderSongs({index, item}) {
    return (
      <Animated.View style={styles.flatlist}>
        <View style={styles.img_box}>
          <Image
            source={trackImage ? {uri: trackImage} : null}
            style={styles.song_image}
          />
        </View>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.main_container}>
      <MusicQueue
        renderSongs={renderSongs}
        scrollX={scrollX}
        tracktitle={tracktitle}
        trackArtist={trackArtist}
        repeatIcon={repeatIcon}
        playBackState={playBackState}
        progress={progress}
        togglePlayBack={togglePlayBack}
        repeatMode={repeatMode}
        skipForward={skipForward}
        skipBackward={skipBackward}
         State={ State}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#040C6F',
  },
});
export default MusicPlayer;
