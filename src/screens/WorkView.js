import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function WorkView({navigation}) {
  return (
    <View>
      <Text>WorkView</Text>
      <Button
            title="Ayuda"
            onPress={() => navigation.navigate('Informacion')}
        />
    </View>
  )
}

const styles = StyleSheet.create({})