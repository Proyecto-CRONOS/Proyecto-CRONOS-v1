import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Text, ScrollView, StyleSheet, View } from 'react-native'
import {
  BACKGROUND_GRADIENT_1,
  BACKGROUND_GRADIENT_2,
  PRIMARY_COLOR,
} from '../styles'
import { Divider, Button } from 'react-native-paper'
import * as DocumentPicker from 'expo-document-picker'
import * as MediaLibrary from 'expo-media-library'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AUDIO, SAVE, SELECT_AUDIO } from '../strings'
import { ToastAndroid } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { openDatabase, updateCardAudio } from '../model'

export function EditCard() {
  const [audioFile, setAudioFile] = useState(null)
  const route = useRoute()
  const navigation = useNavigation()
  const { id } = route.params
  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        setAudioFile(result)
      }
    } catch (error) {
      console.error('Error picking audio file:', error)
    }
  }

  const onSave = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      console.log('Se necesita permiso para acceder al almacenamiento.')
      return
    }

    if (!audioFile || audioFile.canceled) {
      ToastAndroid.show(
        'Por favor seleccioná un archivo de audio.',
        ToastAndroid.SHORT,
      )
      return
    }

    try {
      const fileName = audioFile.assets[0].name
      const fileUri = audioFile.assets[0].uri
      const savePath = `${FileSystem.documentDirectory}${fileName}`

      await FileSystem.copyAsync({ from: fileUri, to: savePath })
      console.log('Audio guardado en:', savePath)

      const db = openDatabase()

      updateCardAudio(db, id, savePath, () => {
        ToastAndroid.show('Audio modificado correctamente', ToastAndroid.SHORT)
      })

      navigation.goBack()
    } catch (error) {
      console.error('Error al guardar el audio:', error)
    }
  }
  return (
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.view}>
        <Text style={styles.label}>{AUDIO}</Text>
        {audioFile && (
          <View style={styles.audioInfo}>
            <Text>🎵 {audioFile.assets[0].name}</Text>
          </View>
        )}

        <Button
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1 }}
          onPress={pickAudio}
        >
          {SELECT_AUDIO}
        </Button>

        <Divider style={styles.divider} />

        <Button
          icon="content-save"
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={{ opacity: 1 }}
          onPress={onSave}
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
  label: {
    fontSize: 16,
    marginBottom: 12,
  },
  audioInfo: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  divider: {
    marginBottom: 32,
    marginTop: 20,
  },
})
