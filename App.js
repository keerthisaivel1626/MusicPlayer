import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import Navigations from './src/Components/Navigations'
import { SafeAreaView } from 'react-native-safe-area-context'
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#040C6F" barStyle="light-content" />
      <Navigations />
    </SafeAreaView>
  );
}

export default App