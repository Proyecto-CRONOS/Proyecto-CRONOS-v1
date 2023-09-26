import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient'

import CardImage from '../components/CardImage'


function Card({ id, title, image, isHorizontal }) {
  let colors = ['rgb(61,111,140)', 'rgb(165,199,61)']
  if (isHorizontal) {
    colors = [colors[1], colors[2]]
  }
  return (
    <View key={id} style={styles.itemContainer}>
      <LinearGradient colors={colors} style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.imageContainer}>
          <CardImage name={image} style={styles.image} />
        </View>
        <Text style={styles.text}>{image}</Text>
      </LinearGradient>
    </View>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isHorizontal: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  imageContainer:{
    width: 100,
    height: 50
  }
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
