import { View, Pressable, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { PRIMARY_TEXT_COLOR } from '../styles'

export default function ArrowsNavigation({
  onPrev,
  onNext,
  currentIndex,
  total,
}) {
  return (
    <View style={styles.controls}>
      <IconButton
        mode="contained"
        icon="chevron-left"
        size={24}
        iconColor={PRIMARY_TEXT_COLOR}
        containerColor={currentIndex === 0 ? '#888' : '#000'}
        onPress={onPrev}
        disabled={currentIndex === 0}
      />

      <IconButton
        onPress={onNext}
        disabled={currentIndex === total - 1}
        mode="contained"
        icon="chevron-right"
        size={24}
        iconColor={PRIMARY_TEXT_COLOR}
        containerColor={currentIndex === total - 1 ? '#888' : '#000'}
      ></IconButton>
    </View>
  )
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
})
