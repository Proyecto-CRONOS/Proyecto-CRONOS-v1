import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

import Cronograma from './Cronograma'
import { openDatabase, getSchedules } from '../model'

function CronogramaList({ navigation }) {
  const [schedules, setSchedules] = useState([])

  useEffect(() => {
    const db = openDatabase()
    getSchedules(db, 1, setSchedules) // FIXME: id should be dynamic
  }, [])

  return (
    <View>
      {schedules.map((schedule, index) => (
        <Cronograma key={index} navigation={navigation} {...schedule} />
      ))}
    </View>
  )
}

export default CronogramaList
