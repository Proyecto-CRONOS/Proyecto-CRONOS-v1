import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'

import { openDatabase, getSchedule } from '../model'


function DetailCronograma() {
  const [schedule, setSchedule] = useState(null)
  const route = useRoute()
  const { id } = route.params
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getSchedule(db, id, setSchedule)
    }, null),
  )

  if (!schedule) {
    return null
  }

  return (
    <View>
      <Card>
        <Card.Title title={schedule.name} />
        <Card.Content>
          <Text>Metodología</Text>
          <Text>{schedule.methodology}</Text>
        </Card.Content>
        <Card.Content>
          <Text>Fecha</Text>
          <Text>{schedule.date}</Text>
        </Card.Content>
        <Card.Content>
          <Text>Equipo</Text>
          <Text>{schedule.equipment}</Text>
        </Card.Content>
        <Card.Content>
          <Text>Caballo</Text>
          <Text>{schedule.horse}</Text>
        </Card.Content>
        <Card.Content>
          <Text>Fecha de nacimiento</Text>
          <Text>{schedule.birthDate}</Text>
        </Card.Content>
        <Card.Content>
          <Text>Consideraciones</Text>
          <Text>{schedule.considerations}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Editar', { id })}>Editar</Button>
          <Button onPress={() => navigation.navigate('EditarTarjetas', { id })}>Tarjetas</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

export default DetailCronograma
