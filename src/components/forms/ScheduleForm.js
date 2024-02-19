import PropTypes from 'prop-types'
import React, { useState, useEffect, useMemo } from 'react'

import { ScrollView, View, Pressable } from 'react-native'
import { TextInput, Button, Divider, HelperText } from 'react-native-paper'
import RNDateTimePicker from '@react-native-community/datetimepicker'

import { createSchedule } from '../../model'
import { PRIMARY_COLOR, THEMES, STYLES } from '../../styles'
import {
  BIRTH_DATE,
  BIRTH_DATE_REQUIRED,
  CONSIDERATIONS,
  CONSIDERATIONS_PLACEHOLDER,
  CONSIDERATIONS_REQUIRED,
  DATE,
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
} from '../../strings'

function ScheduleForm({ schedule, onSave }) {
  if (!schedule) {
    schedule = createSchedule()
  }
  const [editedSchedule, setEditedSchedule] = useState(schedule)
  const [errors, setErrors] = useState({})
  const [isFormCompleted, setIsFormCompleted] = useState(false)
  const [formSent, setFormSent] = useState(false)

  const [scheduleDate, setScheduleDate] = useState(schedule.date)
  const [scheduleBirthDate, setScheduleBirthDate] = useState(schedule.birthDate)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false)

  useEffect(() => {
    if (formSent) {
      validateForm()
    } else if (editedSchedule.id) {
      setFormSent(true)
    }
    validateCompletedForm()
  }, [editedSchedule])

  const validateCompletedForm = () => {
    setIsFormCompleted(
      editedSchedule.name &&
      editedSchedule.birthDate &&
      editedSchedule.methodology &&
      editedSchedule.horse &&
      editedSchedule.equipment &&
      editedSchedule.considerations &&
      editedSchedule.date
    )
  }

  const validateForm = () => {
    let currentErrors = {}

    if (!editedSchedule.name) {
      currentErrors.name = NAME_REQUIRED
    }

    if (!editedSchedule.birthDate) {
      currentErrors.birthDate = BIRTH_DATE_REQUIRED
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
    }

    setErrors(currentErrors)
    console.log('currentErrors: ', currentErrors)
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
    setEditedSchedule({
      ...editedSchedule,
      [key]: value,
    })
    validateCompletedForm()
    if (formSent) {
      validateForm()
    }
  }

  const onPressDateTextInput = () => {
    setShowDatePicker(true)
  }

  const onPressBirthDateTextInput = () => {
    setShowBirthDatePicker(true)
  }

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false)
    if (event.type === 'set') {
      const currentDate = selectedDate || scheduleDate
      setScheduleDate(currentDate)
      handleInputChange('date', currentDate)
    }
  }

  const onChangeBirthDate = (event, selectedDate) => {
    setShowBirthDatePicker(false)
    if (event.type === 'set') {
      const currentDate = selectedDate || scheduleBirthDate
      setScheduleBirthDate(currentDate)
      handleInputChange('birthDate', currentDate)
    }
  }

  const scheduleDatePicker = useMemo(() => {
    return (
      <RNDateTimePicker
        mode="date"
        value={scheduleDate}
        onChange={onChangeDate}
      />
    )
  }, [showDatePicker])

  const scheduleBirthDatePicker = useMemo(() => {
    return (
      <RNDateTimePicker
        mode="date"
        value={scheduleBirthDate}
        onChange={onChangeBirthDate}
      />
    )
  }, [showBirthDatePicker])

  return (
    <ScrollView>
      <View style={[STYLES.card, STYLES.form]}>
        <TextInput
          label={NAME}
          placeholder={NAME_PLACEHOLDER}
          mode="outlined"
          value={editedSchedule.name}
          onChangeText={(name) => handleInputChange('name', name)}
        />
        <HelperText type="error" visible={errors.name}>
          {errors.name}
        </HelperText>
        <Pressable onPress={onPressDateTextInput}>
          <TextInput
            label={DATE}
            placeholder={editedSchedule.date.toLocaleDateString('es-AR')}
            mode="outlined"
            value={editedSchedule.date.toLocaleDateString('es-AR')}
            editable={false}
          />
        </Pressable>
        <HelperText type="error" visible={errors.date}>
          {errors.date}
        </HelperText>
        <TextInput
          label={METHODOLOGY}
          placeholder={METHODOLOGY_PLACEHOLDER}
          mode="outlined"
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
          value={editedSchedule.equipment}
          onChangeText={(equipment) =>
            handleInputChange('equipment', equipment)
          }
        />
        <HelperText type="error" visible={errors.equipment}>
          {errors.equipment}
        </HelperText>
        <TextInput
          label={CONSIDERATIONS}
          placeholder={CONSIDERATIONS_PLACEHOLDER}
          mode="outlined"
          value={editedSchedule.considerations}
          onChangeText={(considerations) =>
            handleInputChange('considerations', considerations)
          }
        />
        <HelperText type="error" visible={errors.considerations}>
          {errors.considerations}
        </HelperText>
        <Pressable onPress={onPressBirthDateTextInput}>
          <TextInput
            label={BIRTH_DATE}
            placeholder={editedSchedule.birthDate.toLocaleDateString('es-AR')}
            mode="outlined"
            value={editedSchedule.birthDate.toLocaleDateString('es-AR')}
            editable={false}
          />
        </Pressable>
        <Divider theme={THEMES.divider} style={STYLES.divider} />
        <Button
          icon="content-save"
          mode="contained"
          buttonColor={PRIMARY_COLOR}
          style={[STYLES.button, { opacity: isFormCompleted ? 1 : 0.5 }]}
          disabled={!isFormCompleted}
          onPress={handleSubmit}
        >
          {SAVE}
        </Button>
        {showDatePicker && scheduleDatePicker}
        {showBirthDatePicker && scheduleBirthDatePicker}
      </View>
    </ScrollView>
  )
}

ScheduleForm.propTypes = {
  schedule: PropTypes.object,
  onSave: PropTypes.func.isRequired,
}

export default ScheduleForm
