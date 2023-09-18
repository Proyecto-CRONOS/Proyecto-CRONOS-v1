import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import CronogramaList from '../components/CronogramaList'

export default function Cronogramas({navigation}) {
  return (
    <SafeAreaView>
      <CronogramaList navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})