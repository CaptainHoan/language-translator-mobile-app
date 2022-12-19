import { View, Text } from 'react-native'
import React from 'react'
import { Camera, CameraType } from 'expo-camera'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const ExpoCamera = ({cameraView, takePicture}) => {

    const [type, setType] = useState(CameraType.back)

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }

  return (
    <Camera
        style={{flex: 1,width:"100%"}}
        ref={(r) => {
          cameraView = r
        }}
        type={type}
        >
        <View className='absolute bottom-0 flex-row flex-1 w-full p-5 justify-between'>
            <View className='self-center flex-1 items-center'>
                  <TouchableOpacity
                    onPress={takePicture}
                    className='w-16 h-16 bottom-0 rounded-full bg-white'
                  />
            </View>
            
        </View>
        <TouchableOpacity className='absolute bottom-6 right-5'
            onPress={toggleCameraType}
        >
            <Ionicons name="camera-reverse" size={45} color="white" />
        </TouchableOpacity>
    </Camera>
  )
}

export default ExpoCamera