import React, { useState, useEffect } from 'react'
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import * as AudioPicker from 'expo-av'
import PropTypes from 'prop-types'

import { saveCard, openDatabase } from '../model'

function AddCard({navigation}) {
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  const onPressImage = async () => {
    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!imageResult.canceled) {
      setImage(imageResult.assets[0].uri)
    }
  }

  const onPressAudio = async () => {
    const { granted } = await AudioPicker.requestPermissionsAsync();
    if (granted) {
      const audioResult = await AudioPicker.AudioPicker.launchAudioPickerAsync();
      if (!audioResult.cancelled) {
        setAudio(audioResult.uri);
      }
    } else {
      console.log('Sorry, we need audio permissions');
    }
  }

  const onPressSave = async () => {
    console.log(permissionResponse?.granted) // true
    console.log(audio) // null
    console.log(image)
    if (!permissionResponse?.granted) {
      console.log('Sorry, we need media and audio permissions, and both an audio and an image file.')
      return
    }

    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status === 'granted') {
        const imageAsset = await MediaLibrary.createAssetAsync(image)
        const audioAsset = await MediaLibrary.createAssetAsync(audio)
        const db = openDatabase()
        const card = {
          title: title,
          description: description,
          audio: audioAsset,uri,
          image: imageAsset.uri,
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
    <SafeAreaView style={styles.container}>
      <Text>Título</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} placeholder='Ingrese el título de la tarjeta'/>
      <Text>Descripción</Text>
      <TextInput style={styles.input} onChangeText={setDescription} value={description} placeholder='Ingrese una descripción'/>
      <Button title="Seleccionar imagen" color="#2D6981" onPress={onPressImage} />
      <Button title="Seleccionar audio" color="#2D6981" onPress={onPressAudio} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {audio && <Text>Audio seleccionado: {audio}</Text>}
      <Button title="Guardar" color="#2D6981" onPress={() => onPressSave()} />
    </SafeAreaView>
  )
}

AddCard.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container:{
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
