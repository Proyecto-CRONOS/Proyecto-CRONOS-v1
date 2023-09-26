import React from 'react'
import { SafeAreaView } from 'react-native'

import CardList from '../components/CardList'

function Cards() {
  return (
    <SafeAreaView>
      <CardList profileId={1} />
    </SafeAreaView>
  )
}

export default Cards
