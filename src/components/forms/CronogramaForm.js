import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { TextInput, Button, Divider, HelperText } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import { PRIMARY_COLOR } from '../../styles'

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
function CronogramaForm({ onSave }) {
  const [name, setName] = useState(null)
  const [birthDate, setBirthDate] = useState(null)
  const [methodology, setMethodology] = useState(null)
  const [horse, setHorse] = useState(null)
  const [equipment, setEquipment] = useState(null)
  const [considerations, setConsiderations] = useState(null)
  const [date, setDate] = useState(null)
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    console.log(errors)
    validateForm()
  }, [name, birthDate, methodology, horse, equipment, considerations, date])

  const validateForm = () => {
    let currentErrors = {}

    if (!name) {
      currentErrors.name = 'El nombre es requerido.'
    }

    if (!birthDate) {
      currentErrors.birthDate = 'La fecha de nacimiento es requerida.'
    } else if (
      !/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        birthDate,
      )
    ) {
      currentErrors.birthDate =
        'La fecha de nacimiento es inválida (dd/mm/aaaa).'
    }

    if (!methodology) {
      currentErrors.methodology = 'La metodología es requerida.'
    }

    if (!horse) {
      currentErrors.horse = 'El caballo es requerido.'
    }

    if (!equipment) {
      currentErrors.equipment = 'El equipo es requerido.'
    }

    if (!considerations) {
      currentErrors.considerations = 'Las consideraciones son requeridas.'
    }

    if (!date) {
      currentErrors.date = 'La fecha es requerida.'
    } else if (
      !/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        date,
      )
    ) {
      currentErrors.date = 'La fecha es inválida (dd/mm/aaaa).'
    }

    setErrors(currentErrors)
    setIsFormValid(Object.keys(currentErrors).length === 0)
  }

  const handleSubmit = () => {
    if (isFormValid) {
      onSave({
        name,
        birthDate,
        methodology,
        horse,
        equipment,
        considerations,
        date,
      })
    } else {
      // FIXME: Handle errors
      console.log(errors)
      console.log('Form has errors. Please correct them.')
    }
  }

  // TODO: i18n
  return (
    <LinearGradient
    colors={['rgb(207,226,136)', 'rgb(45,105,129)']}
    style={styles.container}
  >
    <ScrollView style={styles.view}>
      <TextInput
        label="Nombre"
        placeholder="Juan Pérez"
        mode="outlined"
        styles={styles.input}
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <HelperText type="error" visible={errors.name}>
        {errors.name}
      </HelperText>

      <TextInput
        label="Fecha de nacimiento"
        placeholder="20/10/1998"
        mode="outlined"
        styles={styles.input}
        value={birthDate}
        onChangeText={(birthDate) => setBirthDate(birthDate)}
      />
      <HelperText type="error" visible={errors.birthDate}>
        {errors.birthDate}
      </HelperText>

      <TextInput
        label="Metodología"
        placeholder="Una metodología" // FIXME: A better placeholder
        mode="outlined"
        styles={styles.input}
        value={methodology}
        onChangeText={(methodology) => setMethodology(methodology)}
      />
      <HelperText type="error" visible={errors.methodology}>
        {errors.methodology}
      </HelperText>

      <TextInput
        label="Caballo"
        placeholder="Tornado"
        mode="outlined"
        styles={styles.input}
        value={horse}
        onChangeText={(horse) => setHorse(horse)}
      />
      <HelperText type="error" visible={errors.horse}>
        {errors.horse}
      </HelperText>

      <TextInput
        label="Equipo"
        placeholder="Un equipo" // FIXME: A better placeholder
        mode="outlined"
        styles={styles.input}
        value={equipment}
        onChangeText={(equipment) => setEquipment(equipment)}
      />
      <HelperText type="error" visible={errors.equipment}>
        {errors.equipment}
      </HelperText>

      <TextInput
        label="Consideraciones"
        placeholder="Consideraciones" // FIXME: A better placeholder
        mode="outlined"
        styles={styles.input}
        value={considerations}
        onChangeText={(considerations) => setConsiderations(considerations)}
      />
      <HelperText type="error" visible={errors.considerations}>
        {errors.considerations}
      </HelperText>

      <TextInput
        label="Fecha"
        placeholder={todaysDate()}
        mode="outlined"
        styles={styles.input}
        value={date}
        onChangeText={(date) => setDate(date)}
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
    </LinearGradient>
  )
}

CronogramaForm.propTypes = {
  create: PropTypes.bool,
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

export default CronogramaForm
