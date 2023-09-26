import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

function Cronograma({ name, navigation, profileId }) {
  // TODO: Editar and Trabajar could go to a i19n file
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>{profileId}{name}</Text>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('Editar',{ profileId })}
        />
        <Button
          title="Ver"
          onPress={() => navigation.navigate('Trabajar',{ profileId })}
        />
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
