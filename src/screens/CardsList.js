import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Banner } from 'react-native-paper'

import CreateFAB from '../components/CreateFAB'
import Card from '../components/Card'
import { CARD_CREATE } from '../screens'
import { openDatabase, getCards, getScheduleCards } from '../model'
import {
  BACKGROUND_GRADIENT_1,
  BACKGROUND_GRADIENT_2,
  SUCCESS_BANNER_BACKGROUND,
  SUCCESS_BANNER_ELEVATION,
  SUCCESS_BANNER_ICON,
} from '../styles'
import { CLOSE } from '../strings'

function addCardAction(navigation) {
  navigation.navigate(CARD_CREATE)
}

// NOTE: What is seCompleta?
function CardList({ scheduleId, seCompleta }) {
  const [cards, setCards] = useState([])
  const [bannerVisible, setBannerVisible] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  let action = false
  if (route.params && route.params.action) {
    action = route.params.action
  }
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
    <SafeAreaView>
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
      <LinearGradient colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]}>
        <ScrollView>
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              seCompleta={seCompleta}
              onDelete={loadCards}
            /> //vuelva a cargar las cards una vez que se elimina/>
          ))}
        </ScrollView>
        <CreateFAB onPress={() => addCardAction(navigation)} />
      </LinearGradient>
    </SafeAreaView>
  )
}

CardList.propTypes = {
  scheduleId: PropTypes.number,
  seCompleta: PropTypes.bool,
}

export default CardList
