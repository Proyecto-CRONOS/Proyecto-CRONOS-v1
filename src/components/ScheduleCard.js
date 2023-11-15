import { List, IconButton, Tooltip } from 'react-native-paper'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

function ScheduleCard({ scheduleCard, total, leftAction, rightAction }) {
  const leftDisabled = scheduleCard.order === 1
  const rightDisabled = scheduleCard.order === total

  return (
    <List.Item
      title={scheduleCard.title}
      style={styles.item}
      left={() =>
        leftAction && (
          <Tooltip>
            <IconButton
              icon="chevron-double-up"
              mode="outlined"
              compact="true"
              disabled={leftDisabled}
              onPress={() => (!leftDisabled ? leftAction(scheduleCard) : null)}
            />
          </Tooltip>
        )
      }
      right={() =>
        rightAction && (
          <Tooltip>
            <IconButton
              icon="chevron-double-down"
              mode="outlined"
              compact="true"
              disabled={rightDisabled}
              onPress={() =>
                !rightDisabled ? rightAction(scheduleCard) : null
              }
            />
          </Tooltip>
        )
      }
    />
  )
}

ScheduleCard.propTypes = {
  scheduleCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired,
  total: PropTypes.number.isRequired,
  leftAction: PropTypes.func,
  rightAction: PropTypes.func,
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

export default ScheduleCard
