import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { openDatabase, getScheduleCards, saveScheduleCard } from '../model'
import { BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2 } from '../styles'
import CreateFAB from '../components/CreateFAB'
import ScheduleCard from '../components/ScheduleCard'

function CronogramaCardsList() {
  const [scheduleCards, setScheduleCards] = useState([])
  const route = useRoute()
  const { id: scheduleId } = route.params

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getScheduleCards(db, scheduleId, setScheduleCards)
    }, []),
  )

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
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]}
      style={styles.container}
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
      <CreateFAB onPress={() => console.log('Create')} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CronogramaCardsList
