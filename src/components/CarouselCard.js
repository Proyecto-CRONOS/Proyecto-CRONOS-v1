import React, { useRef, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Card from './Card'
import ArrowsNavigation from './ArrowsNavigation'

const { width: PAGE_WIDTH } = Dimensions.get('window')

export function CarouselCard({ cards }) {
  const ref = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    if (currentIndex > 0) {
      ref.current?.scrollTo({ count: -1, animated: true })
    }
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      ref.current?.scrollTo({ count: 1, animated: true })
    }
  }

  return (
    <View>
      <Carousel
        ref={ref}
        loop={false}
        width={PAGE_WIDTH}
        height={500}
        data={cards}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => <Card {...item} seCompleta={true} />}
      />

      <ArrowsNavigation
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={currentIndex}
        total={cards.length}
      />
    </View>
  )
}
