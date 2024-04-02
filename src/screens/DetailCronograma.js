import React, { useState } from 'react'
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native'
import { SafeAreaView, ToastAndroid } from 'react-native'
import { Button, Card, Text, Divider } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

import { openDatabase, getSchedule } from '../model'
import { SCHEDULE_EDIT, SCHEDULE_CARDS_EDIT } from '../screens'
import {
  BIRTH_DATE,
  CARDS,
  CONSIDERATIONS,
  DATE,
  EDIT,
  EQUIPMENT,
  HORSE,
  METHODOLOGY,
} from '../strings'
import {
  CARD_MODE,
  LINEAR_GRADIENT_BACKGROUND,
  PRIMARY_COLOR,
  STYLES,
  THEMES,
} from '../styles'

function DetailCronograma() {
  const [schedule, setSchedule] = useState(null)
  const route = useRoute()
  const { id } = route.params
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      if (id) {
        getSchedule(db, id, setSchedule)
      }
      if (route.params?.action?.message) {
        showToast(route.params.action.message)
      }
    }, [id, setSchedule, route.params?.action?.message]),
  )

  if (!schedule) {
    return null
  }

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <LinearGradient
        colors={LINEAR_GRADIENT_BACKGROUND}
        style={STYLES.linearGradient}
      >
        <Card style={STYLES.card} mode={CARD_MODE}>
          <Card.Title titleVariant="titleLarge" title={schedule.name} />
          <Card.Content>
            <Text>
              <Text style={STYLES.textBold}>{METHODOLOGY}:</Text>{' '}
              {schedule.methodology}
            </Text>
            <Text>
              <Text style={STYLES.textBold}>{DATE}:</Text>{' '}
              {schedule.date.toLocaleDateString('es-AR')}
            </Text>
            <Text>
              <Text style={STYLES.textBold}>{EQUIPMENT}:</Text>{' '}
              {schedule.equipment}
            </Text>
            <Text>
              <Text style={STYLES.textBold}>{HORSE}:</Text> {schedule.horse}
            </Text>
            <Text>
              <Text style={STYLES.textBold}>{BIRTH_DATE}:</Text>{' '}
              {schedule.birthDate.toLocaleDateString('es-AR')}
            </Text>
            <Text>
              <Text style={STYLES.textBold}>{CONSIDERATIONS}:</Text>{' '}
              {schedule.considerations}
            </Text>
          </Card.Content>

          <Divider style={STYLES.divider} theme={THEMES.divider} />

          <Card.Actions style={STYLES.card.actions}>
            <Button
              style={STYLES.button}
              textColor={PRIMARY_COLOR}
              onPress={() => navigation.navigate(SCHEDULE_EDIT, { id })}
            >
              {EDIT}
            </Button>
            <Button
              style={STYLES.button}
              buttonColor={PRIMARY_COLOR}
              onPress={() => navigation.navigate(SCHEDULE_CARDS_EDIT, { id })}
            >
              {CARDS}
            </Button>
          </Card.Actions>
        </Card>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default DetailCronograma
