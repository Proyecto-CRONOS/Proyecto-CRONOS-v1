import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'
import { List, IconButton, Tooltip } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { PRIMARY_COLOR } from '../styles'
import { WORK, SCHEDULE_DETAIL } from '../screens'

function description({ horse, date }) {
  return `Fecha: ${date} - Caballo: ${horse}`
}

function CronogramaListItem({ id, name, horse, date }) {
  const navigation = useNavigation()
  // TODO: Editar and Trabajar could go to a i18n file
  /*
  <View>
    <IconButton
      icon="clock-edit"
      mode="outlined"
      compact="true"
      iconColor={PRIMARY_COLOR}
      onPress={() => navigation.navigate('Editar', { id })}
    />
    */
  return (
    <List.Item
      style={styles.item}
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
            onPress={() => navigation.navigate({ WORK }, { id })}
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
  date: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#dfdfdf', // FIXME: Move to styles
    borderColor: '#ccc', // FIXME: Move to styles
    borderWidth: 0, // FIXME: Move to styles
    borderBottomWidth: 1, // FIXME: Move to styles
    marginBottom: 10,
  },
})

export default CronogramaListItem
