import PropTypes from 'prop-types'
import React from 'react'
import { List, IconButton, Tooltip } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { PRIMARY_COLOR, STYLES } from '../styles'
import { WORK, SCHEDULE_DETAIL } from '../screens'

function description({ horse, date }) {
  return `Fecha: ${date.toLocaleDateString('es-AR')} - Caballo: ${horse}`
}

function CronogramaListItem({ id, name, horse, date }) {
  const navigation = useNavigation()
  return (
    <List.Item
      style={STYLES.card}
      title={name.toUpperCase()}
      description={description({ horse, date })}
      onPress={() => navigation.navigate(SCHEDULE_DETAIL, { id })}
      left={(props) => <List.Icon {...props} icon="calendar" />}
      right={() => (
        <Tooltip title={WORK}>
          <IconButton
            icon="horse-human"
            mode="outlined"
            compact="true"
            iconColor={PRIMARY_COLOR}
            onPress={() => navigation.navigate(WORK, { id })}
          />
        </Tooltip>
      )}
    />
  )
}

CronogramaListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  horse: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
}

export default CronogramaListItem
