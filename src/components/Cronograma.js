import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

function Cronograma({ name, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>{name}</Text>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('Editar')}
        />{' '}
        // TODO: This could go to a i19n file
        <Button
          title="Ver"
          onPress={() => navigation.navigate('Trabajar')}
        />{' '}
        // TODO: This could go to a i19n file
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})

export default Cronograma
