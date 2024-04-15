import React from 'react'
//import { SafeAreaView } from 'react-navigation'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { saveSchedule, openDatabase } from '../model'
import { SCHEDULE_SAVED } from '../strings'
import { SCHEDULES_LIST } from '../screens'
import ScheduleForm from '../components/forms/ScheduleForm'

import { STYLES, LINEAR_GRADIENT_BACKGROUND } from '../styles'
function AddCronograma() {
  const navigation = useNavigation()

  const onSave = async (editedSchedule) => {
    try {
      const db = openDatabase()
      saveSchedule(db, editedSchedule)
      //navigation.navigate(SCHEDULES_LIST)
      navigation.navigate(SCHEDULES_LIST, {
        action: {
          success: true,
          message: SCHEDULE_SAVED,
        },
      })
    } catch (error) {
      // TODO: Handle errors
      console.error('Error al guardar:', error)
    }
  }

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <LinearGradient
        colors={LINEAR_GRADIENT_BACKGROUND}
        style={STYLES.linearGradient}
      >
        <ScheduleForm onSave={onSave} />
      </LinearGradient>
    </SafeAreaView>
  )
}

export default AddCronograma
