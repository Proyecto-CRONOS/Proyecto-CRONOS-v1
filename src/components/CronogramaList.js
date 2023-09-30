import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
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
    <ScrollView>
      {schedules.map((schedule, index) => (
        <Cronograma key={index} navigation={navigation} {...schedule} />
      ))}
    </ScrollView>
  )
}

CronogramaList.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default CronogramaList
