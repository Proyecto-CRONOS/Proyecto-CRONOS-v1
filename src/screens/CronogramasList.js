import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native'
import { Banner } from 'react-native-paper'

import { SCHEDULE_CREATE } from '../strings'
import CreateFAB from '../components/CreateFAB'
import CronogramaListItem from '../components/CronogramaListItem'
import { openDatabase, getSchedules } from '../model'

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
    <SafeAreaView style={styles.container}>
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
      <ScrollView>
        {schedules.map((schedule, index) => (
          <CronogramaListItem key={index} {...schedule} />
        ))}
      </ScrollView>
      <CreateFAB onPress={() => addCronogramaAction(navigation)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CronogramasList
