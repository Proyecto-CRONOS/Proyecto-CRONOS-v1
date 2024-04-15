import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, ToastAndroid } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native'

import { openDatabase, getSchedules } from '../model'
import { SCHEDULE_CREATE } from '../screens'
import { LINEAR_GRADIENT_BACKGROUND, STYLES } from '../styles'
import CreateFAB from '../components/CreateFAB'
import CronogramaListItem from '../components/CronogramaListItem'

function CronogramasList() {
  const [schedules, setSchedules] = useState([])
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    const db = openDatabase()
    getSchedules(db, setSchedules)

    if (route.params?.action) {
      showToast(route.params?.action?.message)
    }

  }, [route.params])

  useFocusEffect(
    React.useCallback(() => {
      const db = openDatabase()
      getSchedules(db, setSchedules)
    }, []),
  )

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <LinearGradient
        style={STYLES.linearGradient}
        colors={LINEAR_GRADIENT_BACKGROUND}
      >
        <ScrollView>
          {schedules.map((schedule, index) => (
            <CronogramaListItem key={index} {...schedule} />
          ))}
        </ScrollView>
        <CreateFAB onPress={() => navigation.navigate(SCHEDULE_CREATE)} />
      </LinearGradient>
    </SafeAreaView>
  )
}

export default CronogramasList
