import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native'
import { Banner } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

import { openDatabase, getSchedules } from '../model'
import { SCHEDULE_CREATE } from '../screens'
import {
  BACKGROUND_GRADIENT_1,
  BACKGROUND_GRADIENT_2,
  SUCCESS_BANNER_BACKGROUND,
  SUCCESS_BANNER_ELEVATION,
  SUCCESS_BANNER_ICON,
} from '../styles'
import { CLOSE } from '../strings'
import CreateFAB from '../components/CreateFAB'
import CronogramaListItem from '../components/CronogramaListItem'

function addCronogramaAction(navigation) {
  navigation.navigate(SCHEDULE_CREATE)
}

function CronogramasList() {
  const [schedules, setSchedules] = useState([])
  const [bannerVisible, setBannerVisible] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  let action = false

  if (route.params && route.params.action) {
    action = route.params.action
  }

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getSchedules(db, setSchedules)
    }, []),
  )

  return (
    <LinearGradient
      colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]}
      style={styles.container}
    >
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
      <ScrollView>
        {schedules.map((schedule, index) => (
          <CronogramaListItem key={index} {...schedule} />
        ))}
      </ScrollView>
      <CreateFAB onPress={() => addCronogramaAction(navigation)} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CronogramasList
