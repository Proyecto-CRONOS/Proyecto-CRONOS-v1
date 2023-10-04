import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { CARDS_LIST, CARD_CREATE } from '../strings'
import CardsList from './CardsList'
import AddCard from './AddCard'

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
