import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SCHEDULES_LIST, SCHEDULE_CREATE } from '../screens'
import CronogramasList from './CronogramasList'
import AddCronograma from './AddCronograma'

const Stack = createStackNavigator()

function Cronogramas() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCHEDULES_LIST} component={CronogramasList} />
      <Stack.Screen name={SCHEDULE_CREATE} component={AddCronograma} />
    </Stack.Navigator>
  )
}

export default Cronogramas
