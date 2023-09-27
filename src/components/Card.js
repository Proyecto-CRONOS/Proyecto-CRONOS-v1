import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import CardImage from '../components/CardImage'

function Card({ id, title, image }) {
  return (
    <View key={id} style={styles.itemContainer}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.imageContainer}>
        <CardImage name={image} style={styles.image} />
      </View>
    </View>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  image: {
    width: '100vw',
    height: 300,
  },
  text:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
  },
  itemContainer: {
    margin: 25,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 25
  }
})

export default Card
