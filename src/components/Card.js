import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

function Card({ cardId, title, image, isHorizontal, navigation }) {
  let colors = ['rgb(61,111,140)', 'rgb(165,199,61)']
  if (isHorizontal) {
    colors = [colors[1], colors[2]]
  }
  return (
    <View key={cardId} style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image uri={image} style={styles.image} resizeMode="cover" />
      </View>
      <LinearGradient colors={colors} style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  /*image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: '#fff',
  },*/
})

export default Card
