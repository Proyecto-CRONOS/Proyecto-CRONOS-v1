import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import PropTypes from 'prop-types'

function Cronograma({ id, name, navigation }) {
  // TODO: Editar and Trabajar could go to a i18n file
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>
          {id} {name}
        </Text>
        {/* {<Button
          title="Editar"
          onPress={() => navigation.navigate('Editar', { id })}
        />} */}
        <Button
          title="Trabajar"
          onPress={() => navigation.navigate('Trabajar', { id })}
        />
      </View>
    </View>
  )
}

Cronograma.propTypes = {
  name: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    borderRadius: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})

export default Cronograma
