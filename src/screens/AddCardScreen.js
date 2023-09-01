import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const NewCard = () => {
  const [newCard, setNewCard] = useState({
    title:"",
    desciption:"",
    image: null,
    archivoAudio: null, // FaltaAlmacenar audio
  });

  const [archivoAudio, setArchivoAudio] = useState(null);

  const handleSubmit = () => {
    // Lógica para agregar la tarjeta a BD 
     console.log('Se creo la tarjeta', { newCard });
  };

  const handleSeleccionarAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*', // Asegúrate de que el tipo de archivo sea correcto para archivos de audio
      });

      if (result.type === 'success') {
        setArchivoAudio(result.uri);
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo de audio:', error);
    }
  };

  const handleChangeText = (name, value) => {
    setNewCard({ ...newCard, [name]: value});
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      apect: [4,3],
    });

    if (!result.canceled) {
      setNewCard({ ...newCard, image: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Crea una nueva tarjeta</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.input}>
          <TextInput
            placeholder="Título"
            value={newCard.title}
            onChangeText={(value) => handleChangeText("title", value)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Descripcion"
            value={newCard.desciption}
            onChangeText={(value) => handleChangeText("description", value)}
            multiline={true}
            numberOfLines={12}
            style={{textAlignVertical:"top"}}
          />
        </View>

        <View style={styles.buttonOpen}>
            <Button title="Seleccionar una imagen" onPress={pickImage}/>
            {newCard.image && <Image source={{ uri: newCard.image}} style={{ width: 200, height: 200 }} />}
        </View>

        <View style={styles.buttonOpen}>
            <Button title="Seleccionar un audio" onPress={handleSeleccionarAudio}/>
            {newCard.audio && <Text>Audio Seleccionado: {newCard.audio}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar tarjeta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff'
  },
  titlecontainer: {
    alignItems: "center",
    marginTop: 10
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  },
  form: {
    padding: 40
  },
  input:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  button:{
    alignItems: "center",
    backgroundColor: "#000",
    padding:12,
    borderRadius:5,
    width:"100%"
  },
  buttonText: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonOpen: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding:12,
    borderRadius:5,
    width:"100%"
  }

})


export default NewCard;

