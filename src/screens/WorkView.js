import React from 'react'
import { View } from 'react-native'
// FIXME: import { useNavigation, useRoute } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import CardList from '../components/CardList'

function WorkView() {
  const route = useRoute()
  const { id } = route.params
  // FIXME: const navigation = useNavigation()

  return (
    <View>
      <CardList scheduleId={id} seCompleta={true} />
      {/* FIXME: <Button
        title="Ayuda"
        onPress={() => navigation.navigate('Informacion')}
      /> */}
    </View>
  )
}

export default WorkView
