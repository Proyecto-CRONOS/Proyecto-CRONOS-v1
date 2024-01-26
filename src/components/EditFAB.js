import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import { PRIMARY_COLOR } from '../styles'

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: PRIMARY_COLOR,
  },
})

function EditFAB({ onPress }) {
  return (
    <FAB
      style={styles.fab}
      icon="pencil"
      color="white"
      onPress={() => onPress()}
    />
  )
}

EditFAB.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default EditFAB
