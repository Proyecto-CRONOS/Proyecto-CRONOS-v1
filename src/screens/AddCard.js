import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient'; 

import { saveCard, openDatabase } from '../model';

function AddCard({ navigation }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const onPressImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onPressSave = async () => {
    if (!permissionResponse?.granted) {
      console.log('Sorry, we need media permissions');
      return;
    }

    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(image);
        const db = openDatabase();
        const card = {
          title: title,
          description: description,
          audio: '',
          image: asset.uri,
        };
        saveCard(db, card);
        // FIXME: Show something to the user
        navigation.navigate('TARJETAS');
        console.log('Image successfully saved');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient 
      colors={['rgb(207,226,136)', 'rgb(45,105,129)']}
      style={styles.container}
    >
      <Text>Título</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Ingrese el título de la tarjeta"
      />
      <Text>Descripción</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Ingrese una descripción"
      />
      <Button
        title="Seleccionar imagen"
        color="#2D6981"
        onPress={onPressImage}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Guardar" color="#2D6981" onPress={() => onPressSave()} />
    </LinearGradient>
  );
}

AddCard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

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
});

export default AddCard;
