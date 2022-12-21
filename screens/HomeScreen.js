import { View, Alert} from 'react-native'
import React, { useState } from 'react'
import Translator from '../components/Translator'
import Header from '../components/Header'
import { Camera } from 'expo-camera'
import ExpoCamera from '../components/ExpoCamera'

const HomeScreen = () => {

  const [camera, setCamera] = useState(false)
  let cameraView
  const startCamera = async() => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    if(status === 'granted') {
      setCamera(true)
    }else {
      Alert.alert('Access denied')
    }
  }

  return (
    camera 
      ? (
        <ExpoCamera 
          cameraView={cameraView}
          camera={camera}
          setCamera={setCamera}
        />
      )
      : (
        <View className="bg-black flex-1">
          <Header />
          <Translator 
            camera={camera} 
            setCamera={setCamera} 
            startCamera={startCamera} 
          />
        </View>
      )
  )
}

export default HomeScreen