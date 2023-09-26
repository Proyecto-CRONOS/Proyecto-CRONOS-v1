import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'

import { openDatabase, getCards, getScheduleCards } from '../model'
import Card from './Card'

function CardList({scheduleId}) {
  const [cards, setCards] = useState([])
  const [isHorizontal, setIsHorizontal] = useState(false) // FIXME: Where setIsHorizontal is used?

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
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal={isHorizontal}
          contentContainerStyle={styles.scrollViewContainer}
          showsHorizontalScrollIndicator={!isHorizontal}
          showsVerticalScrollIndicator={isHorizontal ? false : true}
        >
          {cards.map((card, index) => (
            <Card key={index} isHorizontal={isHorizontal} {...card} />
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
  )
}

CardList.propTypes = {
  scheduleId: PropTypes.number,
}

const styles = StyleSheet.create({
  /* gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
  },
  scrollViewContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#70aaff",
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  Text: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: '#fff',
  },
  Text2: {
    fontFamily: 'Roboto',
    fontSize: 25,
    paddingTop: 1,
    color: "#f1f2f6",
    display: 'flex',
    
  }, */
})

export default CardList
