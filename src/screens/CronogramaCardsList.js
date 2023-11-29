import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { openDatabase, getScheduleCards, saveScheduleCard } from '../model'
import { BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2 } from '../styles'
import CreateFAB from '../components/CreateFAB'
import ScheduleCard from '../components/ScheduleCard'
import { SCHEDULE_ADD_CARD } from '../screens'

function addCardCronogramaAction(navigation) {
  navigation.navigate(SCHEDULE_ADD_CARD)
}

function CronogramaCardsList() {
  const [scheduleCards, setScheduleCards] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const navigation = useNavigation()
  const route = useRoute()
  const { id: scheduleId } = route.params

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getScheduleCards(db, scheduleId, setScheduleCards)
    }, []),
  )

  useEffect(() => {
    const selected = route.params?.selectedItems;
    console.log("Seleccionadas", this.selected)
     if (selected) {
      setSelectedItems(selected);
     }
   }, [route.params?.selectedItems]);

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
      <CreateFAB onPress={() => addCardCronogramaAction(navigation)} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CronogramaCardsList
