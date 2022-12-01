import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { 
  Foundation,
  Feather
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { chooseTargetLang } from '../redux/LanguageSlice';

const TargetLangScreen = ({route}) => {

  const [targetLangInput, setTargetLangInput] = useState("")

  const dataLanguages = [
    "Arabic ar", "Bulgarian bg", "Chinese zh-Han", "Czech cs", "Danish da", 
    "Dutch nl", "English en", "Esperanto eo", 
    "French fr", "German de", "Greek el", "Hindi hi", "Italian it", "Japanese ja", 
    "korean ko", "Lao lo", "Portugese pt", "Russian ru", "Spanish es",
    "Thai th", "Vietnamese vi"
  ];

  const Languages = dataLanguages.filter(Language => 
    targetLangInput === "" ? Language : Language.includes(targetLangInput)
  )

  const navigation = useNavigation();

  const {text} = route.params;

  const dispatch = useDispatch();

  return (
    <View className="bg-black flex-1 pt-3">
      <View className="flex-row items-center justify-between border-gray-800 border-b-2 pb-3 px-4">
        <Text className="text-white text-2xl">{text}</Text>
        <TouchableOpacity onPress={() => navigation.goBack("Home") }>
          <Foundation name="x-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row space-x-1 border-gray-800 border-b-2 py-3 px-4">
        <Feather name="search" size={24} color="gray" />
        <TextInput 
          placeholder='Search'
          placeholderTextColor={"gray"}
          value={targetLangInput}
          onChangeText={value => setTargetLangInput(value)}
          style={{
            color: 'white',
            fontSize: 15,
            flex: 1
          }}
        />
      </View>

      <View className=" border-gray-800 border-b-2 py-3 px-4 bg-gray-800">
        <Text className="text-gray-400">All Languages</Text>
      </View>

      <ScrollView>
        {Languages.map((Language, index) => (
          <TouchableOpacity 
            key={index} 
            className="border-gray-800 border-b-2 py-3 px-4"
            onPress={() => {
              navigation.navigate("Home");
              dispatch(chooseTargetLang({
                targetLang: Language
              }))
            }}
          >
            <Text className="text-white text-lg">
              {Language.split(" ").slice(0,1).join()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default TargetLangScreen