import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, StatusBar, Text } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'

import { openDatabase, getCards, getScheduleCards } from '../model'
import Card from './Card'

function CardList({ scheduleId, seCompleta }) {
  const [cards, setCards] = useState([])

  // const [isHorizontal, setIsHorizontal] = useState(false) // FIXME: Where setIsHorizontal is used?
  const isHorizontal = false // FIXME: Above line is commented, so this line is added

  const loadCards = () => {
    const db = openDatabase()
    if (scheduleId) {
      getScheduleCards(db, scheduleId, setCards)
    } else {
      getCards(db, setCards)
    }
  }

  useEffect(() => {
    loadCards()
  }, [])
  const [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Regular.ttf'), // FIXME: A better way yo handle this constant
  })
  if (!fontsLoaded) {
    return null
  }

  return (
    <LinearGradient
      colors={['rgb(219,226,133)', 'rgb(61,111,140)']}
      style={styles.gradientContainer}
    >
      {cards.length > 0 ? (
        <View style={styles.cards}>
          <ScrollView
            horizontal={isHorizontal}
            contentContainerStyle={styles.scrollViewContainer}
            showsHorizontalScrollIndicator={!isHorizontal}
            showsVerticalScrollIndicator={isHorizontal ? false : true}
          >
            {cards.map((card, index) => (
              <Card key={card.id} {...card} seCompleta={seCompleta} />
            ))}
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      ) : (
        <View style={styles.noCardsContainer}>
          <Text>No hay tarjetas cargadas.</Text>
        </View>
      )}
    </LinearGradient>
  )
}

CardList.propTypes = {
  scheduleId: PropTypes.number,
  seCompleta: PropTypes.bool,
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1, // necesario para ocupar todo
  },
  cards: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CardList
