import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NewAmazona = () => {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = () => {
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    console.log('Formulario enviado:', { nombre, email, mensaje });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre y Apellido:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingresa el nombre del paciente"
      />

      <Text style={styles.label}>Dni</Text>
      <TextInput
        style={styles.input}
        value={dni}
        onChangeText={setDni}
        placeholder="Ingresa el dni del paciente"
      />

      <Text style={styles.label}>Edad</Text>
      <TextInput
        style={styles.input}
        value={edad}
        onChangeText={setEdad}
        placeholder="Ingresa el dni del paciente"
      />

      <Text style={styles.label}>Email de contacto</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingresa tu email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Consideraciones a tener en cuenta en la jornada</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={mensaje}
        onChangeText={setMensaje}
        placeholder="Escribe tu mensaje"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    height: 100,
  },
  button: {
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
});

export default NewAmazona;