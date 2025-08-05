import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StartStack } from './src/navigation/StartStack'

import {
  deleteDatabaseFile,
  initializeDatabase,
  openDatabase,
} from './src/model'

function App() {
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

export default App
