import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'

// FIXME: A better way yo handle this constant
const images = {
  bandera: require('../assets/images/BANDERA.jpg'),
  caballo: require('../assets/images/CABALLO.jpg'),
  montura: require('../assets/images/MONTURA.jpg'),
  arreador: require('../assets/images/ARREADOR.jpg'),
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
