import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  SCHEDULES_LIST,
  SCHEDULE_CARDS_EDIT,
  SCHEDULE_CREATE,
  SCHEDULE_DETAIL,
  SCHEDULE_EDIT,
  SCHEDULE_CARDS_ADD,
} from '../screens'
import ScheduleList from './ScheduleList'
import ScheduleCreate from './ScheduleCreate'
import ScheduleCardsAdd from './ScheduleCardsAdd'
import ScheduleDetail from './ScheduleDetail'
import ScheduleEdit from './ScheduleEdit'
import ScheduleCardsList from './ScheduleCardsList'

const Stack = createStackNavigator()

function Schedules() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCHEDULES_LIST} component={ScheduleList} />
      <Stack.Screen name={SCHEDULE_CREATE} component={ScheduleCreate} />
      <Stack.Screen name={SCHEDULE_CARDS_ADD} component={ScheduleCardsAdd} />
      <Stack.Screen name={SCHEDULE_DETAIL} component={ScheduleDetail} />
      <Stack.Screen name={SCHEDULE_EDIT} component={ScheduleEdit} />
      <Stack.Screen
        name={SCHEDULE_CARDS_EDIT}
        component={ScheduleCardsList}
      />
    </Stack.Navigator>
  )
}

export default Schedules
