import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import {
  PRIMARY_COLOR,
  INACTIVE_COLOR,
  NAVIGATION_SCHEDULES_TAB_ICON,
  NAVIGATION_CARDS_TAB_ICON,
} from '../styles'
import { SCHEDULES_NAME, CARDS_NAME } from '../strings'

import Cronogramas from '../screens/Cronogramas'
import Cards from '../screens/Cards'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === SCHEDULES_NAME) {
            iconName = focused
              ? NAVIGATION_SCHEDULES_TAB_ICON
              : `${NAVIGATION_SCHEDULES_TAB_ICON}-outline`
          } else if (route.name === CARDS_NAME) {
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
        name={SCHEDULES_NAME}
        options={{ headerShown: false }}
        component={Cronogramas}
      />
      <Tab.Screen
        name={CARDS_NAME}
        options={{ headerShown: false }}
        component={Cards}
      />
    </Tab.Navigator>
  )
}
