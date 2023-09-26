import React, { useState, useEffect } from 'react'
import { Button, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import PropTypes from 'prop-types'

import { saveCard, openDatabase } from '../model'

function AddCard({navigation}) {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)
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
          description: '',
          audio: '',
          image: asset.uri,
        }
        saveCard(db, card)
        // FIXME: Show something to the user
        navigation.navigate('Tarjetas')
        console.log('Image successfully saved')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <Button title="Seleccionar imagen" onPress={onPressImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Guardar" onPress={() => onPressSave()} />
    </SafeAreaView>
  )
}

AddCard.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default AddCard
