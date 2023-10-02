import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { useNavigation } from '@react-navigation/native'

import { saveSchedule, openDatabase } from '../model'
import { SCHEDULES_LIST } from '../strings'
import CronogramaForm from '../components/forms/CronogramaForm'

function AddCronograma() {
  const navigation = useNavigation()

  const onSave = async (cronograma) => {
    try {
      const db = openDatabase()
      await saveSchedule(db, cronograma)
      navigation.navigate(SCHEDULES_LIST, {
        action: {
          success: true,
          message: 'Cronograma guardado exitosamente.',
        },
      })
    } catch (error) {
      // TODO: Handle errors
      console.error('Error al guardar:', error)
    }
  }

  return (
    <SafeAreaView>
      <CronogramaForm onSave={onSave} />
    </SafeAreaView>
  )
}

export default AddCronograma
