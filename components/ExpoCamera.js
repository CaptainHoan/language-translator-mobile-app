import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Camera, CameraType } from 'expo-camera'
import { TouchableOpacity } from 'react-native'
import { Ionicons, AntDesign} from '@expo/vector-icons';
import { useState } from 'react';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, withTiming, PinchGestureHandlerGestureEvent } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')

const ExpoCamera = ({cameraView, camera, setCamera}) => {

    const [type, setType] = useState(CameraType.back)

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }

    //photo preview
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    //take picture
    const takePicture = async() => {
      console.log('haha')
      if(!camera) return
      const photo = await cameraView.takePictureAsync()
      try{
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
      }
      catch(error) {
        console.lof(error.message)
      }
    }

    //close camera
    const closeCamera = () => {
      setCamera(false)
    }

    //handle Camera zoom with Pinch Gesture Handler
    const [zoom, setZoom] = useState(0)

    const pinchGestureHandler = (event) => {
      if (event.nativeEvent.scale > 1 && zoom < 1) {
        setZoom(zoom + 0.005);
      }
      if (event.nativeEvent.scale < 1 && zoom > 0) {
        setZoom(zoom - 0.005);
      }
    }
      

  return (
    <PinchGestureHandler onGestureEvent={(event) => pinchGestureHandler(event)}>
      <View style={{ flex: 1, maxHeight: height }}>
        <Camera
            style={{flex: 1}}
            ref={(r) => {
              cameraView = r
            }}
            ratio="1:1"
            type={type}
            zoom={zoom}
        >
            <View className="flex-1">
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
              <TouchableOpacity className='absolute top-10 left-5'
                onPress={closeCamera}
              >
                <AntDesign name="close" size={35} color="white" />
              </TouchableOpacity>
              {previewVisible && capturedImage &&
                (
                  <View className="absolute bottom-6 left-5 flex-1 ">
                    <View className='w-12 h-12 bottom-0 bg-white border-2 border-white' >
                      <ImageBackground 
                        style={{flex: 1, }}
                        source={{uri: capturedImage && capturedImage.uri}}
                      />
                    </View>
                  </View>
                )
              }
            </View>
        </Camera>
      </View>
    </PinchGestureHandler>
  )
}

export default ExpoCamera