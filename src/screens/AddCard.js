import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, Text, TextInput } from 'react-native'
import { Divider, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as MediaLibrary from 'expo-media-library'
import { LinearGradient } from 'expo-linear-gradient'
import * as FileSystem from 'expo-file-system'


import { saveCard, openDatabase } from '../model'
import {
  ENTER_DESCRIPTION,
  ENTER_TITLE,
  SAVE,
  SELECT_IMAGE,
  SELECT_AUDIO,
  CARD_SAVED,
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
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' })
      if (!result.canceled ) {
        setAudioFile(result)
      }
    } catch (error) {
      console.error('Error picking audio file:', error)
    }
  }  
  

  const onPressSave = async () => {
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
        if (audioFile) {
          audioAsset = {
            uri: audioFile.assets[0].uri,
            
          }
        }
        if (!audioFile.canceled ) {
          try {
            await FileSystem.copyAsync({ from: fileUri, to: savePath })

            console.log('Audio file saved to:', savePath)
          }catch (error) {
            console.error('Error saving audio file:', error)
          }
        }
        // FIN AUDIO
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
        saveCard(db, card)
        // FIXME: Show something to the user
        navigation.navigate(CARDS_LIST, {
          action: {
            success: true,
            message: CARD_SAVED,
          },
        })
        console.log('Image and audio successfully saved')
      }
    }catch (error) {
      console.error('Error al guardar:', error)
    }
  }

  return (
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]} // FIXME: Replace for
      style={styles.container}
    >
      <View style={styles.view}>
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
        <Button
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1  }}
          onPress={onPressImage}
        >
          {SELECT_IMAGE}
        </Button> 
        {image && (
          <Image source={{ uri: image }} style={{ width: 150, height: 100 }} />
        )}
        <Text>{AUDIO}</Text>
        <Button
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1  }}
          onPress={pickAudio}
        >
          {SELECT_AUDIO}
        </Button>      
        {audioFile && (
          <Text>
            AUDIO SELECCIONADO: {audioFile.assets[0].name}
          </Text>
        )}
        <Divider style={styles.divider} />
        <Button
          icon="content-save"
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1  }}
          onPress={() => onPressSave()}
        >
          {SAVE}
        </Button>  
        
      </View>
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
    padding: 5,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    marginBottom: 32,
    marginTop: 20,
  },
})

export default AddCard
