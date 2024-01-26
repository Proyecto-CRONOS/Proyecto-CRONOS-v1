import React, { useState } from 'react'
import { SafeAreaView } from 'react-navigation'
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import { openDatabase, getSchedule, saveSchedule } from '../model'
import { SCHEDULE_DETAIL } from '../screens'
import { SCHEDULE_SAVED } from '../strings'
import ScheduleForm from '../components/forms/ScheduleForm'
import { STYLES, LINEAR_GRADIENT_BACKGROUND } from '../styles'

function ScheduleEdit() {
  const [schedule, setSchedule] = useState(null)
  const route = useRoute()
  const { id } = route.params
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getSchedule(db, id, setSchedule)
    }, []),
  )

  const onSave = async (editedSchedule) => {
    try {
      const db = openDatabase()
      await saveSchedule(db, editedSchedule)
      navigation.navigate(SCHEDULE_DETAIL, {
        id: editedSchedule.id,
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
        {schedule && <ScheduleForm schedule={schedule} onSave={onSave} />}
      </LinearGradient>
    </SafeAreaView>
  )
}

export default ScheduleEdit
