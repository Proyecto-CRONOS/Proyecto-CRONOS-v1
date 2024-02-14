import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'

// FIXME: A better way yo handle this constant
const images = {
  aros: require('../assets/images/AROS.jpg'),
  arreador: require('../assets/images/ARREADOR.jpg'),
  bandera: require('../assets/images/BANDERA.jpg'),
  pelotas: require('../assets/images/PELOTAS.jpg'),
}

function CardImage({ name, style }) {
  let source = null
  if (name.startsWith('file://')) {
    source = { uri: name }
  } else {
    source = images[name]
  }
  return <Image source={source} style={style} resizeMode="contain" />
}

CardImage.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}

export default CardImage
