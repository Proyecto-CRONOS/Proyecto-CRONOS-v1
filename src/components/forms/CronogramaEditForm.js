import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { ScrollView, StyleSheet, Text } from 'react-native'
import { TextInput, Button, Divider, HelperText } from 'react-native-paper'

import { PRIMARY_COLOR } from '../../styles'

// FIXME: Merge with CronogramaForm

// NOTE: This could be better
function todaysDate() {
  const today = new Date()
  const yyyy = today.getFullYear()
  let mm = today.getMonth() + 1
  let dd = today.getDate()
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  return dd + '/' + mm + '/' + yyyy
}

// FIXME: In order to be used to edit
function CronogramaEditForm({ schedule, onSave }) {
  const [ editedSchedule, setEditedSchedule ] = useState(schedule)
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    console.log(errors)
    validateForm()
  }, [editedSchedule])
  
  const validateForm = () => {
    let currentErrors = {}

    if (!editedSchedule.name) {
      currentErrors.name = 'El nombre es requerido.'
    }

    if (!editedSchedule.birthDate) {
      currentErrors.birthDate = 'La fecha de nacimiento es requerida.'
    } else if (
      !/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        editedSchedule.birthDate,
      )
    ) {
      currentErrors.birthDate =
        'La fecha de nacimiento es inválida (dd/mm/aaaa).'
    }

    if (!editedSchedule.methodology) {
      currentErrors.methodology = 'La metodología es requerida.'
    }

    if (!editedSchedule.horse) {
      currentErrors.horse = 'El caballo es requerido.'
    }

    if (!editedSchedule.equipment) {
      currentErrors.equipment = 'El equipo es requerido.'
    }

    if (!editedSchedule.considerations) {
      currentErrors.considerations = 'Las consideraciones son requeridas.'
    }

    if (!editedSchedule.date) {
      currentErrors.date = 'La fecha es requerida.'
    } else if (
      !/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        editedSchedule.date,
      )
    ) {
      currentErrors.date = 'La fecha es inválida (dd/mm/aaaa).'
    }

    setErrors(currentErrors)
    setIsFormValid(Object.keys(currentErrors).length === 0)
  }

  const handleSubmit = () => {
    if (isFormValid) {
      onSave(editedSchedule)
    } else {
      // FIXME: Handle errors
      console.log(errors)
      console.log('Form has errors. Please correct them.')
    }
  }

  const handleInputChange = (key, value) => {
    console.log(editedSchedule)

    setEditedSchedule({
      ...editedSchedule,
      [key]: value,
    })
    validateForm()
  }

  // TODO: i18n
  return (
    <ScrollView style={styles.view}>
      <TextInput
        label="Nombre"
        placeholder="Juan Pérez"
        mode="outlined"
        styles={styles.input}
        value={editedSchedule.name}
        onChangeText={(name) => handleInputChange('name', name)}
      />
      <HelperText type="error" visible={errors.name}>
        {errors.name}
      </HelperText>
      <TextInput
        label="Fecha de nacimiento"
        placeholder="20/10/1998"
        mode="outlined"
        styles={styles.input}
        value={editedSchedule.birthDate}
        onChangeText={(birthDate) => handleInputChange('birthDate', birthDate)}
      />
      <HelperText type="error" visible={errors.birthDate}>
        {errors.birthDate}
      </HelperText>

      <TextInput
        label="Metodología"
        placeholder="Una metodología" // FIXME: A better placeholder
        mode="outlined"
        styles={styles.input}
        value={editedSchedule.methodology}
        onChangeText={(methodology) => handleInputChange('methodology', methodology)}
      />
      <HelperText type="error" visible={errors.methodology}>
        {errors.methodology}
      </HelperText>

      <TextInput
        label="Caballo"
        placeholder="Tornado"
        mode="outlined"
        styles={styles.input}
        value={editedSchedule.horse}
        onChangeText={(horse) => handleInputChange('horse', horse)}
      />
      <HelperText type="error" visible={errors.horse}>
        {errors.horse}
      </HelperText>

      <TextInput
        label="Equipo"
        placeholder="Un equipo" // FIXME: A better placeholder
        mode="outlined"
        styles={styles.input}
        value={editedSchedule.equipment}
        onChangeText={(equipment) => handleInputChange('equipment', equipment)}
      />
      <HelperText type="error" visible={errors.equipment}>
        {errors.equipment}
      </HelperText>

      <TextInput
        label="Consideraciones"
        placeholder="Consideraciones" // FIXME: A better placeholder
        mode="outlined"
        styles={styles.input}
        value={editedSchedule.considerations}
        onChangeText={(considerations) => handleInputChange('considerations', considerations)}
      />
      <HelperText type="error" visible={errors.considerations}>
        {errors.considerations}
      </HelperText>

      <TextInput
        label="Fecha"
        placeholder={todaysDate()}
        mode="outlined"
        styles={styles.input}
        value={editedSchedule.date}
        onChangeText={(date) => handleInputChange('date', date)}
      />
      <HelperText type="error" visible={errors.date}>
        {errors.date}
      </HelperText>
      <Divider style={styles.divider} />
      <Button
        icon="content-save"
        mode="contained"
        buttonColor={PRIMARY_COLOR}
        style={{ opacity: isFormValid ? 1 : 0.5 }}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        Guardar
      </Button>
      <Text></Text>
    </ScrollView>
  )
}

CronogramaEditForm.propTypes = {
  schedule: PropTypes.object,
  onSave: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  view: {
    paddingHorizontal: 10,
    paddingVertical: -30,
  },
  divider: {
    marginBottom: 15,
  },
})

export default CronogramaEditForm
