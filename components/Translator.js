import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { 
  Entypo, 
  Feather, 
  AntDesign, 
  MaterialCommunityIcons, 
  MaterialIcons,
  FontAwesome 
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { sourceLangSelector, targetLangSelector } from '../redux/LanguageSlice';
import * as Speech from 'expo-speech';

const Translator = ({camera, setCamera, startCamera}) => {

  const navigation = useNavigation();
  
  //useState hook to keep track of the text change when user input
  const [input, setInput] = useState(null)
  const [translatedText, setTranslatedText] = useState("")

  //select source and target Language from redux store
  const selectedSourceLang = useSelector(sourceLangSelector).sourceLang;
  const selectedTargetLang = useSelector(targetLangSelector).targetLang;

  //states to keep track of the target, source for the swapLang and changeLang functionalities
  const [sourceLang, setSourceLang] = useState('English en');
  const [targetLang, setTargetLang] = useState('Spanish es');

  //set to new SourceLang and TargetLang after user pick from LangScreens
  useEffect(() => {
      if(selectedSourceLang) {
        setSourceLang(selectedSourceLang)
      }
      if(selectedTargetLang) {
        setTargetLang(selectedTargetLang)
      }
    }, 
    [
      selectedSourceLang, 
      selectedTargetLang,
    ]
  )

  //function to swap between source and target Language
  const swapLang = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  }

  
  //format body of the fetch request
  const encodedParams = {
    "fromLang": sourceLang.split(" ").slice(1).join(),
    "text": input,
    "to": targetLang.split(" ").slice(1).join()
  }

  const encodedParamsJason = JSON.stringify(encodedParams)

  //use Google Translate API and fetch method
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '3c01f096aamsh7cd22fc4a6b0adep1534adjsn6c217207805b',
      'X-RapidAPI-Host': 'cheap-translate.p.rapidapi.com'
    },
    body: encodedParamsJason
  };

  
  const fetchGoogleTranslateAPI = () => {
    return fetch('https://cheap-translate.p.rapidapi.com/translate', options)
    .then(response => response.json())
    .then(response => setTranslatedText(response.translatedText))
    .catch(err => console.error(err));
  }

   useEffect(() => {
    if(input) {
      fetchGoogleTranslateAPI()
    }
  }, [input])

  //function text to speech
  const speakText = () => {
    if(translatedText.length > 0) {
      Speech.speak(translatedText, {
        language: targetLang.split(" ").slice(-1).join()
      });
      console.log(Speech)
    }
  }


  return (
    <View>
      {/** TranslationPair containing sourceLanguage, swapIcon, targetLanguaga*/}
        <View className="flex-row items-center justify-between px-10 py-2 border-gray-500 border-b-2 bg-gray-900">
          {/**Source language */}
          <TouchableOpacity 
            onPress={() => {
              navigation.navigate("Sources", {
                text: "Translate from"
              });
            }}
          >
            <Text className="text-blue-400 text-lg text-center">{sourceLang.split(" ").slice(0,1).join()}</Text> 
          </TouchableOpacity>
          
          {/**SwapIcon with functionalities to swap between source and target language */}
          <TouchableOpacity onPress={() => swapLang()}>
            <Entypo name="swap" size={24} color="gray" />
          </TouchableOpacity>
          
          {/**Target Language */}
          <TouchableOpacity  
            onPress={() => navigation.navigate("Targets", {
              text: "Translate to"
            })}
          >
            <Text className="text-blue-400 text-lg text-center">{targetLang.split(" ").slice(0,1).join()}</Text>
          </TouchableOpacity>
        </View>  

      {/**TranslationInput */}
      <View className=" border-gray-500 border-b-2 bg-gray-900">
        <TextInput 
        placeholder= "Enter text"
        placeholderTextColor={"gray"}
        multiline={true}
        autoFocus={true}
        value={input}
        onChangeText={(value) => setInput(value)}
        style={{
          paddingHorizontal: 15,
          paddingTop: 20,
          fontSize: 17,
          color: 'white',
          height: 120
        }}
      />
      </View>

      {/** TranslationOptions including camera and recording functionality*/}
      <View className="flex-row items-center justify-between px-20 border-gray-500 border-b-2 py-2 bg-gray-900">
        <TouchableOpacity className="items-center"
          onPress={startCamera}
        >
          <Entypo name="camera" size={22} color="#8ED1FC" />
          <Text className="text-white">Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center"
          onPress={() => navigation.navigate('Recording')}
        >
          <FontAwesome name="microphone" size={22} color="#8ED1FC" />
          <Text className="text-white">Record</Text>
        </TouchableOpacity>
      </View>

      {/**The translated texts go here */}

      <View className="m-2 bg-gray-900 p-2">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-gray-600 text-base">{targetLang.split(" ").slice(0,1).join()}</Text>
          <Feather name="star" size={22} color="white" />
        </View>

        {/**The translated Text */}
        <Text className="text-white text-lg mb-6">{translatedText}</Text>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={speakText}>
            <AntDesign name="sound" size={23} color="gray" />
          </TouchableOpacity>
          <View className="flex-row items-center justify-between space-x-3">
            <MaterialCommunityIcons name="progress-upload" size={24} color="gray" />
            <MaterialCommunityIcons name="fullscreen" size={24} color="gray" />
            <MaterialIcons name="content-copy" size={24} color="gray" />
          </View>
        </View>
      </View>

    </View>
  )
}

export default Translator