import React, { useState } from 'react'
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native'
import { View, StyleSheet } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2, PRIMARY_COLOR } from '../styles'
import { openDatabase, getSchedule } from '../model'
import { LinearGradient } from 'expo-linear-gradient'
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
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]}
      style={styles.container}
    >
      <View >
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
            <Button 
              textColor={PRIMARY_COLOR}
              onPress={() => navigation.navigate(SCHEDULE_EDIT, { id })}>
              {EDIT}
            </Button>
            <Button
              buttonColor={PRIMARY_COLOR}
              onPress={() => navigation.navigate(SCHEDULE_CARDS_EDIT, { id })}
            >
              {CARDS}
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default DetailCronograma
