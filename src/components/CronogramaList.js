import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import Cronograma from './Cronograma'
import { openDatabase, getSchedules } from '../model'

function CronogramaList({ navigation }) {
  const [schedules, setSchedules] = useState([])

  useEffect(() => {
    const db = openDatabase()
    getSchedules(db, setSchedules)
  }, [])

  return (
    <View>
      {schedules.map((schedule, index) => (
        <Cronograma key={index} navigation={navigation} {...schedule} />
      ))}
    </View>
  )
}

CronogramaList.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default CronogramaList
