import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { StartStack } from './src/navigation/StartStack'

import { initializeDatabase, openDatabase } from './src/model'

export default function App() {
  useEffect(() => {
    const db = openDatabase()
    initializeDatabase(db)
  }, [])

  return (
    <NavigationContainer>
      <StartStack />
    </NavigationContainer>
  )
}
