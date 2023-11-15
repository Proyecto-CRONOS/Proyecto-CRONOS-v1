import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  SCHEDULES_LIST,
  SCHEDULE_CARDS_EDIT,
  SCHEDULE_CREATE,
  SCHEDULE_DETAIL,
  SCHEDULE_EDIT,
} from '../screens'
import CronogramasList from './CronogramasList'
import AddCronograma from './AddCronograma'
import DetailCronograma from './DetailCronograma'
import EditCronograma from './EditCronograma'
import CronogramaCardsList from './CronogramaCardsList'

const Stack = createStackNavigator()

function Cronogramas() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCHEDULES_LIST} component={CronogramasList} />
      <Stack.Screen name={SCHEDULE_CREATE} component={AddCronograma} />
      <Stack.Screen name={SCHEDULE_DETAIL} component={DetailCronograma} />
      <Stack.Screen name={SCHEDULE_EDIT} component={EditCronograma} />
      <Stack.Screen
        name={SCHEDULE_CARDS_EDIT}
        component={CronogramaCardsList}
      />
    </Stack.Navigator>
  )
}

export default Cronogramas
