import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

import { saveSchedule, openDatabase } from '../model'

function CronogramaForm({navigation}) {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        birthDate: '',
        methodology: '',
        horse: '',
        equipment: '',
        considerations: '',
        date: '',
    })

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSaveSchedule = async () => {
        try {
            const db = openDatabase();
            await saveSchedule(db, formData);
            navigation.navigate('Cronogramas');
            console.log('Schedule successfully saved');
        } catch (error) {
            // Manejar errores de guardado aquí
            console.error('Error al guardar:', error);
        }
    }

    return (
        <View>
        <TextInput
            placeholder="ID"
            value={formData.id}
            onChangeText={(text) => handleInputChange('id', text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Nombre"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Fecha de nacimiento"
            value={formData.birthDate}
            onChangeText={(text) => handleInputChange('birthDate', text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Metodología"
            value={formData.methodology}
            onChangeText={(text) => handleInputChange('methodology', text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Caballo"
            value={formData.horse}
            onChangeText={(text) => handleInputChange('horse', text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Equipo"
            value={formData.equipment}
            onChangeText={(text) => handleInputChange('equipment', text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Consideraciones"
            value={formData.considerations}
            onChangeText={(text) => handleInputChange('considerations', text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Fecha"
            value={formData.date}
            onChangeText={(text) => handleInputChange('date', text)}
            style={styles.input}
        />
        <Button title="Guardar" onPress={handleSaveSchedule} />
        </View>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default CronogramaForm
