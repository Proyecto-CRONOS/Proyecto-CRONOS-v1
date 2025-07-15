import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Navigation from './Navigation'
import Tutorial from '../screens/Tutorial'
import WorkView from '../screens/WorkView'

import { HOME, NAVIGATION, TUTORIAL, WORK } from '../screens'

const Stack = createStackNavigator()

function StartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={NAVIGATION} component={Navigation} />
      <Stack.Screen name={TUTORIAL} component={Tutorial} />
      {/* <Stack.Screen name={WORK} component={WorkView} /> */}
    </Stack.Navigator>
  )
}

export { StartStack }
