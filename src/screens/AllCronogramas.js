import React from 'react'
import { SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'

import CronogramaList from '../components/CronogramaList'

function Cronogramas({ navigation }) {
  return (
    <SafeAreaView>
      <CronogramaList navigation={navigation}  />
    </SafeAreaView>
  )
}

Cronogramas.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default Cronogramas
