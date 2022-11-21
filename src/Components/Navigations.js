import {View, StyleSheet, Dimensions,useWindowDimensions} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MusicPlayer from '../Screens/MusicPlayer';
import Search from '../Screens/Search';
import Favorite from '../Screens/Favorite';
import Playlist from '../Screens/Playlist';
import Settings from '../Screens/Settings';
const {width, height} = Dimensions.get('window');

const Navigations = () => {

  const {width, height} = useWindowDimensions();
  let roundBackground = 380;
  if (width < 420) {
    roundBackground = 150;
  }
  if (height < 420) {
    roundBackground = 80;
  }
  const bottombackgroundStyle = {
    width: roundBackground,
    height: roundBackground,
    borderRadius: roundBackground / 2,
  };
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#030A5C',
          },
        }}>
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {...styles.focusIcon, bottombackgroundStyle}
                    : styles.unFocusIcon
                }>
                <Icon name="search" size={28} style={{color: 'white'}} />
              </View>
            ),
          }}
          name="Search"
          component={Search}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {...styles.focusIcon, bottombackgroundStyle}
                    : styles.unFocusIcon
                }>
                <MaterialCommunityIcons
                  name="playlist-music"
                  size={28}
                  style={{color: 'white'}}
                />
              </View>
            ),
          }}
          name="Playlist"
          component={Playlist}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {...styles.focusIcon, bottombackgroundStyle}
                    : styles.unFocusIcon
                }>
                <Icon name="musical-note" size={28} style={{color: 'white'}} />
              </View>
            ),
          }}
          name="MusicPlayer"
          component={MusicPlayer}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {...styles.focusIcon, bottombackgroundStyle}
                    : styles.unFocusIcon
                }>
                <Icon name="heart-sharp" size={28} style={{color: 'white'}} />
              </View>
            ),
          }}
          name="Favorite"
          component={Favorite}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={
                  focused
                    ? {...styles.focusIcon, bottombackgroundStyle}
                    : styles.unFocusIcon
                }>
                <Icon
                  name="reorder-three-sharp"
                  size={28}
                  style={{color: 'white'}}
                />
              </View>
            ),
          }}
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  focusIcon: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: (width + height) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 10,
    height: height / 15,
  },
  unFocusIcon: {
    backgroundColor: '#030A5C',
  },
});
export default Navigations;
