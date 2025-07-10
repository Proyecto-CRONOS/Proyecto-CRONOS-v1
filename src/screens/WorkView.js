import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
// FIXME: import { useNavigation, useRoute } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import CardList from '../components/CardList'

function WorkView() {
  const route = useRoute()
  const { id } = route.params
  // FIXME: const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <CardList scheduleId={id} seCompleta={true} />
    </SafeAreaView>
    //   {/* FIXME: <Button
    //     title="Ayuda"
    //     onPress={() => navigation.navigate('Informacion')}
    //   /> */}
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default WorkView
