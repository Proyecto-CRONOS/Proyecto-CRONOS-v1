import React from 'react'
import { SafeAreaView } from 'react-native'

import CronogramaList from '../components/CronogramaList'

function Cronogramas({ navigation }) {
  return (
    <SafeAreaView>
      <CronogramaList navigation={navigation} />
    </SafeAreaView>
  )
}

export default Cronogramas
