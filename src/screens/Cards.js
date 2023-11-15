import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { CARDS_LIST, CARD_CREATE } from '../screens'
import AddCard from './AddCard'
import CardsList from './CardsList'

const Stack = createStackNavigator()

function Cards() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={CARDS_LIST} component={CardsList} />
      <Stack.Screen name={CARD_CREATE} component={AddCard} />
    </Stack.Navigator>
  )
}

export default Cards
