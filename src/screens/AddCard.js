import React, { useState, useEffect } from 'react'
import { Button, Image, StyleSheet, Text, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { LinearGradient } from 'expo-linear-gradient'

import { saveCard, openDatabase } from '../model'
import {
  ENTER_DESCRIPTION,
  ENTER_TITLE,
  SAVE,
  SELECT_IMAGE,
  CARD_SAVED,
} from '../strings'
import { CARDS_LIST } from '../screens'
import {
  BACKGROUND_GRADIENT_1,
  BACKGROUND_GRADIENT_2,
  PRIMARY_BUTTON_COLOR,
} from '../styles'

function AddCard() {
  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

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

  const onPressSave = async () => {
    if (!permissionResponse?.granted) {
      console.log('Sorry, we need media permissions')
      return
    }

    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(image)
        const db = openDatabase()
        const card = {
          title: title,
          description: description,
          audio: '',
          image: asset.uri,
        }
        saveCard(db, card)
        // FIXME: Show something to the user
        navigation.navigate(CARDS_LIST, {
          action: {
            success: true,
            message: CARD_SAVED,
          },
        })
        console.log('Image successfully saved')
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
      <Text>Título</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder={ENTER_TITLE}
      />
      <Text>Descripción</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder={ENTER_DESCRIPTION}
      />
      <Button
        title={SELECT_IMAGE}
        color={PRIMARY_BUTTON_COLOR}
        onPress={onPressImage}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        title={SAVE}
        color={PRIMARY_BUTTON_COLOR}
        onPress={() => onPressSave()}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default AddCard
