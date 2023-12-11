import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { openDatabase, getScheduleCards, getCards, saveScheduleCard } from '../model'
import { Button, Banner } from 'react-native-paper'
import {
  SUCCESS_BANNER_BACKGROUND,
  SUCCESS_BANNER_ELEVATION,
  SUCCESS_BANNER_ICON,
  PRIMARY_COLOR,
  BACKGROUND_GRADIENT_1, 
  BACKGROUND_GRADIENT_2
} from '../styles'
import { 
  CLOSE,
  ADD_CARDS,
  SELECT_TEXT,
  SELECTED_TEXT,
  CONFIRM_TEXT,
  SEARCH_PLACEHOLDER_TEXT } from '../strings'


function AddCardCronograma() {
  const route = useRoute()
  const { scheduleId } = route.params
  const [selectedItems, setSelectedItems] = useState([])
  const [scheduleCards, setScheduleCards] = useState([])
  const [cards, setCards] = useState([])
  const [action, setAction] = useState({})
  const [bannerVisible, setBannerVisible] = useState(false)
  const items = [
    {
      name: 'SELECCIONAR TARJETAS',
      id: 0,
      children: cards.map(card => ({
        id: card.id,
        name: card.title,
        description: card.description,
        audio: card.audio,
        image: card.image,
      })),
    },
  ]
  useEffect(() => {
    const db = openDatabase()
    getScheduleCards(db, scheduleId, setScheduleCards)
    getCards(db, setCards)
  }, [])

  
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems)
  }

  const saveCardsToSort = () => {
    if (!scheduleId) {
      console.error('scheduleId is null or undefined')
      return // Stop execution if scheduleId is not valid
    }
    console.log('Guardar tarjetas:', selectedItems)
    let order = 1
    console.log(scheduleCards, scheduleCards == false)
    if (scheduleCards.length) {
      order = scheduleCards[scheduleCards.length - 1].order + 1
    }
    const db = openDatabase()
    selectedItems.forEach((cardId) => {
      const scheduleCard = {
        status: 'OK', // FIXME: To const file
        order,
        cardId,
        scheduleId,
      }
      saveScheduleCard(db, scheduleCard)
      order++
    })
    setSelectedItems([])
    setAction({
      message: 'Las tarjetas fueron agregadas correctamente.', // FIXME: Move to strings
    })
    setBannerVisible(true)
  }

  return (
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]} // FIXME: Replace for
      style={styles.container}
    >
      <View style={styles.view}>
        {action && (
          <Banner
            theme={{ colors: { primary: SUCCESS_BANNER_BACKGROUND } }}
            elevation={SUCCESS_BANNER_ELEVATION}
            visible={bannerVisible}
            actions={[{ label: CLOSE, onPress: () => setBannerVisible(false) }]}
            icon={SUCCESS_BANNER_ICON}
          >
            {action.message}
          </Banner>
        )}
        <SectionedMultiSelect
          items={items}
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
          primary= "#3D6F8C"
        />
      </View>
      <Button
        icon="content-save"
        mode="contained"
        buttonColor={PRIMARY_COLOR}
        style={{ opacity: 1  }}
        onPress={saveCardsToSort}
      >
        {ADD_CARDS}
      </Button>  

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  view: {
    backgroundColor: '#FFFFFF',
  },
})

export default AddCardCronograma
