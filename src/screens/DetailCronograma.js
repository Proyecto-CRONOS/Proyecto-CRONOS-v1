import React, { useState } from 'react'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import { View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'

import { openDatabase, getSchedule } from '../model'

import { SCHEDULE_EDIT, SCHEDULE_CARDS_EDIT } from '../screens'
import {
  CARDS,
  EDIT,
  METHODOLOGY,
  DATE,
  EQUIPMENT,
  HORSE,
  BIRTH_DATE,
  CONSIDERATIONS,
} from '../strings'

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
          <Text>{METHODOLOGY}</Text>
          <Text>{schedule.methodology}</Text>
        </Card.Content>
        <Card.Content>
          <Text>{DATE}</Text>
          <Text>{schedule.date}</Text>
        </Card.Content>
        <Card.Content>
          <Text>{EQUIPMENT}</Text>
          <Text>{schedule.equipment}</Text>
        </Card.Content>
        <Card.Content>
          <Text>{HORSE}</Text>
          <Text>{schedule.horse}</Text>
        </Card.Content>
        <Card.Content>
          <Text>{BIRTH_DATE}</Text>
          <Text>{schedule.birthDate}</Text>
        </Card.Content>
        <Card.Content>
          <Text>{CONSIDERATIONS}</Text>
          <Text>{schedule.considerations}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate(SCHEDULE_EDIT, { id })}>
            {EDIT}
          </Button>
          <Button
            onPress={() => navigation.navigate({ SCHEDULE_CARDS_EDIT }, { id })}
          >
            {CARDS}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

export default DetailCronograma
