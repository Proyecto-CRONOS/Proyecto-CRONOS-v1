import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import CardList from '../components/CardList'

function WorkView({ route }) {
  const { id } = route.params

  return (
    <View>
      <CardList scheduleId={id} seCompleta={true} />
      {/* <Button
        title="Ayuda"
        onPress={() => navigation.navigate('Informacion')}
      /> */}
    </View>
  )
}

WorkView.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

export default WorkView
