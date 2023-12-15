import React from 'react'
//import { SafeAreaView } from 'react-navigation'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';
import { saveSchedule, openDatabase } from '../model'
import { SCHEDULE_SAVED } from '../strings'
import { SCHEDULES_LIST } from '../screens'
import ScheduleForm from '../components/forms/ScheduleForm'

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
    <SafeAreaView>
      <ScheduleForm onSave={onSave} />
    </SafeAreaView>
  )
}

export default AddCronograma
