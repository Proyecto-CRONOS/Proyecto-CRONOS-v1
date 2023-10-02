import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-navigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Banner } from 'react-native-paper'

import { CARD_CREATE } from '../strings'
import CreateFAB from '../components/CreateFAB'
import { openDatabase, getCards, getScheduleCards } from '../model'
import Card from '../components/Card'

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
    <SafeAreaView>
      {action && (
        <Banner
          theme={{ colors: { primary: 'green' } }}
          elevation="4"
          visible={bannerVisible}
          actions={[
            { label: 'Cerrar', onPress: () => setBannerVisible(false) },
          ]}
          icon="check-bold"
        >
          {action.message}
        </Banner>
      )}
      <LinearGradient colors={['rgb(219,226,133)', 'rgb(61,111,140)']}>
        <ScrollView>
          {cards.map((card, index) => (
            <Card key={index} {...card} seCompleta={seCompleta} />
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
