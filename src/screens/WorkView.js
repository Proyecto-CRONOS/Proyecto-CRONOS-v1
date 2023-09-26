import React from 'react'
import { Text, View, Button } from 'react-native'
import PropTypes from 'prop-types'

import CardList from '../components/CardList'

function WorkView({ navigation, route }) {
  const { id } = route.params

  return (
    <View>
      <Text>Perfil ID: {id}</Text>
      <CardList scheduleId={id} />
      <Button
        title="Ayuda"
        onPress={() => navigation.navigate('Informacion')}
      />
    </View>
  )
}

WorkView.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default WorkView
