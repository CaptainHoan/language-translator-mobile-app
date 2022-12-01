import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Avatar } from "@rneui/base";
import Parse from 'parse/react-native';
import * as AppleAuthentication from 'expo-apple-authentication';

const header = () => {

  const logInWithApple = async() => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(credential)
    }
    catch(error) {
      console.log("login error is", error.message)
    }
  }

  return (
    <View className="flex-row items-center justify-between bg-gray-700 pt-7 pb-3 px-3">
      <Text className="text-gray-700">google</Text>
      <Text className="text-white text-lg">Google Translate</Text>
      <TouchableOpacity onPress={logInWithApple}>
        <Avatar
          activeOpacity={0.2}
          containerStyle={{ backgroundColor: "#BDBDBD" }}
          rounded
          size="small"
          source={{ uri: "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720" }}
        />
      </TouchableOpacity>
      
    </View>
  )
}

export default header