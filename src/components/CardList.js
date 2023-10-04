import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'

import { openDatabase, getCards, getScheduleCards } from '../model'
import Card from './Card'

function CardList({ scheduleId, seCompleta }) {
  const [cards, setCards] = useState([])
  // const [isHorizontal, setIsHorizontal] = useState(false) // FIXME: Where setIsHorizontal is used?
  const isHorizontal = false // FIXME: Above line is commented, so this line is added

  useEffect(() => {
    const db = openDatabase()
    if (scheduleId) {
      getScheduleCards(db, scheduleId, setCards)
    } else {
      getCards(db, setCards)
    }
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
      <View style={styles.cards}>
        <ScrollView
          horizontal={isHorizontal}
          contentContainerStyle={styles.scrollViewContainer}
          showsHorizontalScrollIndicator={!isHorizontal}
          showsVerticalScrollIndicator={isHorizontal ? false : true}
        >
          {cards.map((card, index) => (
            <Card key={index} {...card} seCompleta={seCompleta} />
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </LinearGradient>
  )
}

CardList.propTypes = {
  scheduleId: PropTypes.number,
  seCompleta: PropTypes.bool,
}

const styles = StyleSheet.create({
  cards: {
    height: '100vh',
  },
})

export default CardList
