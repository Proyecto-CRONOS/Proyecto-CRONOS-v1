import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import CardImage from '../components/CardImage'
import CardAudio from '../components/CardAudio'

function Card({ id, title, image, seCompleta }) {
  const [marcada, setMarcada] = useState(false)

const handleClick = () => {
  if (seCompleta) {
    if (!marcada){
      playAudio()
    }
    setMarcada(!marcada)
  }
}

  const estiloTarjeta = {
    backgroundColor: marcada ? 'green' : 'white',
  }

  const audioPlayer = CardAudio()

  const playAudio = async () => {
    await audioPlayer.playSound()
  }

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View key={id} style={[estiloTarjeta, styles.tarjeta]}>
        <Text style={styles.text}>{title.toUpperCase()}</Text>
        {marcada ? (
          <Image
            source={require('../assets/images/check.png')}
            style={styles.imageDone}
          />
        ) : (
          <View style={styles.imageContainer}>
            <CardImage name={image} style={styles.image} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  seCompleta: PropTypes.bool,
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  imageDone: {
    width: 100,
    height: 100,
    margin: 100,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
  },
  tarjeta: {
    margin: 25,
    padding: 20,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
})

export default Card
