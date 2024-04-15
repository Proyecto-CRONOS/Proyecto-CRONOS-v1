import { List, IconButton, Tooltip } from 'react-native-paper'
import PropTypes from 'prop-types'

import { STYLES } from '../styles'

function ScheduleCard({ scheduleCard, total, leftAction, rightAction }) {
  const leftDisabled = scheduleCard.order === 1
  const rightDisabled = scheduleCard.order === total

  return (
    <List.Item
      title={scheduleCard.title}
      style={STYLES.card}
      left={() =>
        leftAction && (
          <Tooltip>
            <IconButton
              icon="chevron-double-up"
              mode="outlined"
              compact="true"
              disabled={leftDisabled}
              onPress={() => (!leftDisabled ? leftAction(scheduleCard) : null)}
              style={{ marginLeft: 20 }}
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
              style={{ marginRight: 0 }}
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

export default ScheduleCard
