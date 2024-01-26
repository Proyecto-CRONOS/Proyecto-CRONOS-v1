import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import {
  PRIMARY_COLOR,
  INACTIVE_COLOR,
  NAVIGATION_SCHEDULES_TAB_ICON,
  NAVIGATION_CARDS_TAB_ICON,
} from '../styles'
import { SCHEDULES, CARDS } from '../screens'

import Schedules from '../screens/Schedules'
import Cards from '../screens/Cards'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === SCHEDULES) {
            iconName = focused
              ? NAVIGATION_SCHEDULES_TAB_ICON
              : `${NAVIGATION_SCHEDULES_TAB_ICON}-outline`
          } else if (route.name === CARDS) {
            iconName = focused
              ? NAVIGATION_CARDS_TAB_ICON
              : `${NAVIGATION_CARDS_TAB_ICON}-outline`
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
      })}
    >
      <Tab.Screen
        name={SCHEDULES}
        options={{ headerShown: false }}
        component={Schedules}
      />
      <Tab.Screen
        name={CARDS}
        options={{ headerShown: false }}
        component={Cards}
      />
    </Tab.Navigator>
  )
}
