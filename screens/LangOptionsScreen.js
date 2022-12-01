import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { 
  Foundation,
  Feather
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LangOptionsScreen = ({route}) => {

  const Languages = ["Arabic", "Bulgarian", "Chinese", "Czech", "Danish", "Dutch", "English", "Esperanto", 
                    "French", "German", "Greek", "Hindi", "Italian", "Japanese", "Lao", "Portugese", "Russian", "Spanish",
                    "Thai", "Vietnamese"];

  const navigation = useNavigation();

  const {text} = route.params;

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
          style={{
            color: 'white',
            fontSize: 15
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
              dispatch(chooseLang({
                selected: Language
              }));
              dispatch(receiveText({
                receivedText: text
              }))
            }}
          >
            <Text className="text-white text-lg">{Language}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default LangOptionsScreen