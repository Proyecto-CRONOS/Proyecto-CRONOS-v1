import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { TextInput, Button, Divider, HelperText } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { createSchedule } from '../../model'
import { BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2, PRIMARY_COLOR} from '../../styles'
import {
  BIRTH_DATE,
  BIRTH_DATE_INVALID,
  BIRTH_DATE_PLACEHOLDER,
  BIRTH_DATE_REQUIRED,
  CONSIDERATIONS,
  CONSIDERATIONS_PLACEHOLDER,
  CONSIDERATIONS_REQUIRED,
  DATE,
  DATE_INVALID,
  DATE_REQUIRED,
  HORSE,
  HORSE_PLACEHOLDER,
  HORSE_REQUIRED,
  METHODOLOGY,
  METHODOLOGY_PLACEHOLDER,
  METHODOLOGY_REQUIRED,
  NAME,
  NAME_PLACEHOLDER,
  NAME_REQUIRED,
  SAVE,
  EQUIPMENT,
  EQUIPMENT_PLACEHOLDER,
  EQUIPMENT_REQUIRED,
  TITLE_SCHEDULE,
} from '../../strings'

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
function ScheduleForm({ schedule, onSave }) {
  if (!schedule) {
    schedule = createSchedule()
  }
  const [editedSchedule, setEditedSchedule] = useState(schedule)
  const [errors, setErrors] = useState({})
  const [isFormCompleted, setIsFormCompleted] = useState(false)
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    console.log(errors)
    if (formSent) {
      validateForm()
    }
  }, [editedSchedule])

  const validateCompletedForm = () => {
    setIsFormCompleted(
      editedSchedule.name &&
        editedSchedule.birthDate &&
        editedSchedule.methodology &&
        editedSchedule.horse &&
        editedSchedule.equipment &&
        editedSchedule.considerations &&
        editedSchedule.date,
    )
  }

  const validateForm = () => {
    let currentErrors = {}

    if (!editedSchedule.name) {
      currentErrors.name = NAME_REQUIRED
    }

    if (!editedSchedule.birthDate) {
      currentErrors.birthDate = BIRTH_DATE_REQUIRED
    } else if (
      !/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        editedSchedule.birthDate,
      )
    ) {
      currentErrors.birthDate = currentErrors.birthDate = BIRTH_DATE_INVALID
    }

    if (!editedSchedule.methodology) {
      currentErrors.methodology = METHODOLOGY_REQUIRED
    }

    if (!editedSchedule.horse) {
      currentErrors.horse = HORSE_REQUIRED
    }

    if (!editedSchedule.equipment) {
      currentErrors.equipment = EQUIPMENT_REQUIRED
    }

    if (!editedSchedule.considerations) {
      currentErrors.considerations = CONSIDERATIONS_REQUIRED
    }

    if (!editedSchedule.date) {
      currentErrors.date = DATE_REQUIRED
    } else if (
      !/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        editedSchedule.date,
      )
    ) {
      currentErrors.date = DATE_INVALID
    }

    setErrors(currentErrors)
    return Object.keys(currentErrors).length === 0
  }

  const handleSubmit = () => {
    setFormSent(true)
    if (validateForm()) {
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
    validateCompletedForm()
    if (formSent) {
      validateForm()
    }
  }

  // TODO: i18n
  return (
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]}
      style={styles.container}
    >
      <View style={styles.view}>
        <Text>{TITLE_SCHEDULE}</Text>
        <ScrollView style={styles.view}>
          <TextInput
            label={NAME}
            placeholder={NAME_PLACEHOLDER}
            mode="outlined"
            styles={styles.input}
            value={editedSchedule.name}
            onChangeText={(name) => handleInputChange('name', name)}
          />
          <HelperText type="error" visible={errors.name}>
            {errors.name}
          </HelperText>
          <TextInput
            label={BIRTH_DATE}
            placeholder={BIRTH_DATE_PLACEHOLDER}
            mode="outlined"
            styles={styles.input}
            value={editedSchedule.birthDate}
            onChangeText={(birthDate) => handleInputChange('birthDate', birthDate)}
          />
          <HelperText type="error" visible={errors.birthDate}>
            {errors.birthDate}
          </HelperText>
          <TextInput
            label={METHODOLOGY}
            placeholder={METHODOLOGY_PLACEHOLDER}
            mode="outlined"
            styles={styles.input}
            value={editedSchedule.methodology}
            onChangeText={(methodology) =>
              handleInputChange('methodology', methodology)
            }
          />
          <HelperText type="error" visible={errors.methodology}>
            {errors.methodology}
          </HelperText>
          <TextInput
            label={HORSE}
            placeholder={HORSE_PLACEHOLDER}
            mode="outlined"
            styles={styles.input}
            value={editedSchedule.horse}
            onChangeText={(horse) => handleInputChange('horse', horse)}
          />
          <HelperText type="error" visible={errors.horse}>
            {errors.horse}
          </HelperText>
          <TextInput
            label={EQUIPMENT}
            placeholder={EQUIPMENT_PLACEHOLDER}
            mode="outlined"
            styles={styles.input}
            value={editedSchedule.equipment}
            onChangeText={(equipment) => handleInputChange('equipment', equipment)}
          />
          <HelperText type="error" visible={errors.equipment}>
            {errors.equipment}
          </HelperText>
          <TextInput
            label={CONSIDERATIONS}
            placeholder={CONSIDERATIONS_PLACEHOLDER}
            mode="outlined"
            styles={styles.input}
            value={editedSchedule.considerations}
            onChangeText={(considerations) =>
              handleInputChange('considerations', considerations)
            }
          />
          <HelperText type="error" visible={errors.considerations}>
            {errors.considerations}
          </HelperText>
          <TextInput
            label={DATE}
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
            style={{ opacity: isFormCompleted ? 1 : 0.5 }}
            disabled={!isFormCompleted}
            onPress={handleSubmit}
          >
            {SAVE}
          </Button>
          <Text></Text>
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

ScheduleForm.propTypes = {
  schedule: PropTypes.object,
  onSave: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  view: {
    backgroundColor: '#E6E4E9',
    padding: 20,
  },
  divider: {
    marginBottom: 32,
    marginTop: 20,
  },
})

export default ScheduleForm
