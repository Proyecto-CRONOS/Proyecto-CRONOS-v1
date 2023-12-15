import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native'

import { openDatabase, getSchedule, saveSchedule } from '../model'
import { SCHEDULE_DETAIL } from '../screens'
import { SCHEDULE_SAVED } from '../strings'
import ScheduleForm from '../components/forms/ScheduleForm'

function EditCronograma() {
  const [schedule, setSchedule] = useState(null)
  const route = useRoute()
  const { id } = route.params
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getSchedule(db, id, setSchedule)
    }, null),
  )

  const onSave = async (editedSchedule) => {
    try {
      const db = openDatabase()
      await saveSchedule(db, editedSchedule)
      navigation.navigate(SCHEDULE_DETAIL, {
        id: editedSchedule.id,
        action: {
          success: true,
          message: { SCHEDULE_SAVED },
        },
      })
    } catch (error) {
      // TODO: Handle errors
      console.error('Error al guardar:', error)
    }
  }

  return (
    <SafeAreaView>
      {schedule && <ScheduleForm schedule={schedule} onSave={onSave} />}
    </SafeAreaView>
  )
}

export default EditCronograma
