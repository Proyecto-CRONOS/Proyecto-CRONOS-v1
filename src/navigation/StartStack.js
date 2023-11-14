import { createStackNavigator } from '@react-navigation/stack'
import AddCronograma from '../screens/AddCronograma'
import DetailCronograma from '../screens/DetailCronograma'
import EditCronograma from '../screens/EditCronograma'
import Home from '../screens/Home'
import Navigation from './Navigation'
import Tutorial from '../screens/Tutorial'
import WorkView from '../screens/WorkView'

import {
  HOME,
  NAVIGATION,
  SCHEDULE_CREATE,
  SCHEDULE_DETAIL,
  SCHEDULE_EDIT,
  TUTORIAL,
  WORK,
} from '../screens'

const Stack = createStackNavigator()

function StartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={NAVIGATION} component={Navigation} />
      <Stack.Screen name={TUTORIAL} component={Tutorial} />
      <Stack.Screen name={SCHEDULE_EDIT} component={EditCronograma} />
      <Stack.Screen name={WORK} component={WorkView} />
      <Stack.Screen name={SCHEDULE_DETAIL} component={DetailCronograma} />
      <Stack.Screen name={SCHEDULE_CREATE} component={AddCronograma} />
    </Stack.Navigator>
  )
}

export { StartStack }
