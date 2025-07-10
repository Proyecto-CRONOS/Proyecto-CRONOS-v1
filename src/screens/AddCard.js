import React, { useState, useEffect } from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import { Divider, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as MediaLibrary from 'expo-media-library'
import { LinearGradient } from 'expo-linear-gradient'
import * as FileSystem from 'expo-file-system'
import { Audio } from 'expo-av'

import { saveCard, openDatabase } from '../model'
import {
  ENTER_DESCRIPTION,
  ENTER_TITLE,
  SAVE,
  SELECT_IMAGE,
  SELECT_AUDIO,
  CARD_SAVED,
  TITLE_CARDS,
  TITLE,
  DESCRIPTION,
  IMAGE,
  AUDIO,
} from '../strings'
import { CARDS_LIST } from '../screens'
import {
  BACKGROUND_GRADIENT_1,
  BACKGROUND_GRADIENT_2,
  PRIMARY_COLOR,
} from '../styles'

function AddCard() {
  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()
  const [audioFile, setAudioFile] = useState(null)
  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  const onPressImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const pickAudio = async () => {
    console.log('PIK')
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        setAudioFile(result)
        console.log('RESULT2', result)
      }
    } catch (error) {
      console.error('Error picking audio file:', error)
    }
  }

  const onPressSave = async () => {
    console.log('SAVE')
    if (!permissionResponse?.granted) {
      console.log('Sorry, we need media permissions')
      return
    }

    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status === 'granted') {
        let imageAsset, audioAsset
        if (image) {
          imageAsset = await MediaLibrary.createAssetAsync(image)
        }
        const fileName = audioFile.assets[0].name
        const fileUri = audioFile.assets[0].uri
        const savePath = `${FileSystem.documentDirectory}${fileName}`
        // AUDIO
        console.log('AUDIO', audioFile)
        if (audioFile) {
          audioAsset = {
            uri: audioFile.assets[0].uri,
          }
        }
        console.log('AUDIO FILE', audioFile)
        if (!audioFile.canceled) {
          try {
            //const fileName = audioFile.assets[0].name;
            //const fileUri = audioFile.assets[0].uri;
            console.log('FILE NAME', fileName)
            console.log('URI', fileUri)
            //const savePath = `${FileSystem.documentDirectory}${fileName}`;
            console.log('PATH', savePath)
            await FileSystem.copyAsync({ from: fileUri, to: savePath })

            console.log('Audio file saved to:', savePath)
          } catch (error) {
            console.error('Error saving audio file:', error)
          }
        }
        // FIN AUDIO
        console.log('BASE DE DATOS')
        const db = openDatabase()
        const card = {
          title: title,
          description: description,
          //audio: fileUri,
          audio: savePath,
          image: imageAsset ? imageAsset.uri : '',
        }

        if (!card.audio) {
          console.log('Por favor, selecciona un archivo de audio.')
          return
        }
        console.log('AUDIOO:', card.audio)
        saveCard(db, card)
        // FIXME: Show something to the user
        navigation.navigate(CARDS_LIST, {
          action: {
            success: true,
            message: CARD_SAVED,
          },
        })
        console.log('Image and audio successfully saved')
        console.log('CARD', card)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]} // FIXME: Replace for
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.view}>
        <Text>{TITLE_CARDS}</Text>
        <Text></Text>
        <Text>{TITLE}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder={ENTER_TITLE}
        />
        <Text>{DESCRIPTION}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder={ENTER_DESCRIPTION}
        />
        <Text>{IMAGE}</Text>
        <Text></Text>
        <Button
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1 }}
          onPress={onPressImage}
        >
          {SELECT_IMAGE}
        </Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Text></Text>
        <Text>{AUDIO}</Text>
        <Text></Text>
        <Button
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1 }}
          onPress={pickAudio}
        >
          {SELECT_AUDIO}
        </Button>

        <Text></Text>
        <Divider style={styles.divider} />
        <Button
          icon="content-save"
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1 }}
          onPress={() => onPressSave()}
        >
          {SAVE}
        </Button>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  view: {
    backgroundColor: '#E6E4E9',
    padding: 30,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0.8,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    marginBottom: 32,
    marginTop: 20,
  },
})

export default AddCard
