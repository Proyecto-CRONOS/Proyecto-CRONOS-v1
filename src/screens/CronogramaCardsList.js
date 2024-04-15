import React, { useState } from 'react'
import { ScrollView, SafeAreaView, ToastAndroid } from 'react-native'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { openDatabase, getScheduleCards, saveScheduleCard } from '../model'
import { STYLES, LINEAR_GRADIENT_BACKGROUND } from '../styles'
import CreateFAB from '../components/CreateFAB'
import ScheduleCard from '../components/ScheduleCard'
import { SCHEDULE_ADD_CARD } from '../screens'

function addCardCronogramaAction(navigation, scheduleId) {
  navigation.navigate(SCHEDULE_ADD_CARD, { scheduleId })
}

function CronogramaCardsList() {
  const [scheduleCards, setScheduleCards] = useState([])
  const navigation = useNavigation()
  const route = useRoute()
  const { id: scheduleId } = route.params

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getScheduleCards(db, scheduleId, setScheduleCards)
      if (route.params?.action) {
        showToast(route.params?.action?.message)
      }
    }, [scheduleId]),
  )

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  const sortScheduleCards = (scheduleCard, direction) => {
    const data = [...scheduleCards]
    const index = data.indexOf(scheduleCard)
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const tempOrder = data[index].order
    data[index].order = data[targetIndex].order
    data[targetIndex].order = tempOrder
    data.sort((a, b) => a.order - b.order)
    setScheduleCards(data)
    saveScheduleCards()
  }

  const saveScheduleCards = () => {
    const db = openDatabase()
    scheduleCards.forEach((scheduleCard) => {
      saveScheduleCard(db, scheduleCard)
    })
  }

  const leftAction = (scheduleCard) => {
    sortScheduleCards(scheduleCard, 'up')
  }

  const rightAction = (scheduleCard) => {
    sortScheduleCards(scheduleCard, 'down')
  }

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <LinearGradient
      colors={LINEAR_GRADIENT_BACKGROUND}
      style={STYLES.linearGradient}
    >
      <ScrollView>
        {scheduleCards.map((scheduleCard, index) => (
          <ScheduleCard
            key={index}
            total={scheduleCards.length}
            scheduleCard={scheduleCard}
            leftAction={leftAction}
            rightAction={rightAction}
          />
        ))}
      </ScrollView>
      <CreateFAB
        onPress={() => addCardCronogramaAction(navigation, scheduleId)}
      />
    </LinearGradient>
    </SafeAreaView>
  )
}

export default CronogramaCardsList
