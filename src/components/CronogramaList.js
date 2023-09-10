import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Cronograma from './Cronograma'

export default function CronogramaList({navigation}) {
  return (
    <View>
      <Cronograma name={"Juan Perez"} navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({})