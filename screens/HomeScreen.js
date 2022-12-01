import { View, Text } from 'react-native'
import React from 'react'
import Translator from '../components/Translator'
import Header from '../components/Header'

const HomeScreen = ({route}) => {

  return (
    <View className="bg-black flex-1">
      <Header />
      <Translator />
    </View>
  )
}

export default HomeScreen