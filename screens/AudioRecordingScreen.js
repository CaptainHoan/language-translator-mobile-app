import { View, Text, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'


const AudioRecordingScreen = () => {

    const [recording, setRecording] = useState()
    const [uri, setUri] = useState()
    const [audioUri, setAudioUri] = useState()
    const [uploadURL, setUploadURL] = useState()
    const [transcript, setTranscript] = useState()

    const recordingOptions = {
      // android not currently in use, but parameters are required
      android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
      },
      ios: {
          extension: '.wav',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
      },
  };

    const recordVoice = async() => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
            })
            const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
            setRecording(recording);
          
        } catch (error) {
            console.log(error.message)
        }
    }

    const stopRecording = async() =>  {
        setRecording(undefined);
        await recording.stopAndUnloadAsync(recordingOptions);
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const info = await FileSystem.getInfoAsync(recording.getURI())
        const uri = info.uri;
        setUri(uri)
    }

    console.log('uri is',uri)

  const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'audio/x-wav',
      // could be anything 
      name: 'speech2text'
    });

    const uploadAssembly = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
        authorization: "be28cf83ab4f4b4aab8d74c041877118",
        "transfer-encoding": "chunked",
    },
    })
    const upload1 = () => {
      uploadAssembly.post("/upload", formData).then((res) => {
        //console.log(res.data)
        setUploadURL(res.data.upload_url)
      })
      .catch((err) => console.error(err));
    }

    console.log('uploadURL',uploadURL )

    const assembly = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
          authorization: "be28cf83ab4f4b4aab8d74c041877118",
      },
  });

  const transcribe1 = () => {
    assembly.post("/transcript", {
      audio_url: "https://bit.ly/3yxKEIY"
    })
    .then((res) => {
      //console.log(res.data)
      setTranscript(res.data.id)
    })
    .catch((err) => console.error(err));
  }

  console.log('transcript id is', transcript)

  const transcribe2 = () => {
    assembly
    .get(`/transcript/${transcript}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
  }

  return (
    <View className="bg-black flex-1">
      <Text className='text-white text-2xl mt-3'>Currently recording . . .</Text>
      <Button 
        title={recording ? 'Stop Recording' : 'Start Recording'} 
        onPress={recording ? stopRecording : recordVoice}
      />

      <Button title="UPLOAD" onPress={upload1} />
      <Button title="process" onPress={transcribe1}/>
      <Button title="transcribe" onPress={transcribe2}/>
      <Text className='text-white text-xl'></Text>
    </View>
  )
}

export default AudioRecordingScreen