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

function CreateFAB({ onPress }) {
  return (
    <FAB
      style={styles.fab}
      icon="plus"
      color="white"
      onPress={() => onPress()}
    />
  )
}

CreateFAB.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default CreateFAB
