import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Divider } from 'react-native-paper'
import {
  openDatabase,
  getScheduleCards,
  getCards,
  saveScheduleCard,
  deleteScheduleCard,
  createScheduleCard,
} from '../model'
import { SCHEDULE_DETAIL } from '../screens'
import {
  PRIMARY_COLOR,
  LINEAR_GRADIENT_BACKGROUND,
  STYLES,
  THEMES,
} from '../styles'
import {
  SAVE,
  SELECT_TEXT,
  SELECTED_TEXT,
  CONFIRM_TEXT,
  SEARCH_PLACEHOLDER_TEXT,
  SELECT_CARDS,
  SCHEDULE_CARDS_SAVED,
} from '../strings'

function ScheduleCardsAdd() {
  const navigation = useNavigation()
  const route = useRoute()
  const { scheduleId } = route.params
  const [selectedItems, setSelectedItems] = useState([])
  const [scheduleCards, setScheduleCards] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchData = () => {
      const db = openDatabase()
      getScheduleCards(db, scheduleId, (scheduleCards) => {
        setScheduleCards(scheduleCards)
        setSelectedItems(
          scheduleCards.map((scheduleCard) => scheduleCard.cardId),
        )
      })
      getCards(db, (data) => {
        setCards(data)
      })
    }
    fetchData()
  }, [])

  const formatCards = (cards) => {
    return [
      {
        name: SELECT_CARDS,
        id: 0,
        children: cards.map((card) => ({
          id: card.id,
          name: card.title,
          description: card.description,
          audio: card.audio,
          image: card.image,
        })),
      },
    ]
  }

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
  }

  const saveCardsToSort = () => {
    if (!scheduleId) {
      console.error('scheduleId is null or undefined')
      return
    }

    let sortedScheduleCards = [...scheduleCards].sort(
      (a, b) => a.order - b.order,
    )
    const deletedScheduleCards = sortedScheduleCards.filter(
      (scheduleCard) => !selectedItems.includes(scheduleCard.cardId),
    )
    sortedScheduleCards = sortedScheduleCards.filter((scheduleCard) =>
      selectedItems.includes(scheduleCard.cardId),
    )
    const missingItems = selectedItems.filter(
      (itemId) => !scheduleCards.some((card) => card.cardId === itemId),
    )

    missingItems.forEach((itemId) => {
      const cardData = cards.find((card) => card.id === itemId)
      if (cardData) {
        sortedScheduleCards.push(
          createScheduleCard(scheduleId, cardData.id, 0, 'OK'),
        )
      }
    })
    sortedScheduleCards.forEach(
      (scheduleCard, index) => (scheduleCard.order = index + 1),
    )

    const db = openDatabase()
    deletedScheduleCards.forEach((scheduleCard) => {
      deleteScheduleCard(db, scheduleCard)
    })
    sortedScheduleCards.forEach((scheduleCard) => {
      saveScheduleCard(db, scheduleCard)
    })
    navigation.navigate(SCHEDULE_DETAIL, {
      id: scheduleId,
      action: { success: true, message: SCHEDULE_CARDS_SAVED },
    })
  }

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <LinearGradient
        colors={LINEAR_GRADIENT_BACKGROUND}
        style={STYLES.linearGradient}
      >
        <View style={[STYLES.card, styles.container]}>
          <SectionedMultiSelect
            items={formatCards(cards)}
            IconRenderer={Icon}
            uniqueKey="id"
            subKey="children"
            selectText={SELECT_TEXT}
            confirmText={CONFIRM_TEXT}
            selectedText={SELECTED_TEXT}
            searchPlaceholderText={SEARCH_PLACEHOLDER_TEXT}
            showDropDowns={false}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            primary="#3D6F8C"
          />
          <Divider theme={THEMES.divider} style={STYLES.divider} />
          <Button
            icon="content-save"
            mode="contained"
            buttonColor={PRIMARY_COLOR}
            style={STYLES.button}
            onPress={saveCardsToSort}
          >
            {SAVE}
          </Button>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
})

export default ScheduleCardsAdd
