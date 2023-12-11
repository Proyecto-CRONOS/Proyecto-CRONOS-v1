import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, Text, TextInput } from 'react-native'
import { Divider, Button } from 'react-native-paper'
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
      <View style={styles.view}>
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
          style={{ opacity: 1  }}
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
          style={{ opacity: 1  }}
          onPress={onPressImage}
        >
          {SELECT_AUDIO}
        </Button>      
        <Text></Text>
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
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    marginBottom: 32,
    marginTop: 20,
  },
})

export default AddCard
