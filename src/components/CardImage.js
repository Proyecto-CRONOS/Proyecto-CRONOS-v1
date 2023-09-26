import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'

const images = {
  'aro': require('../assets/images/ARO.jpg'),
  'broches': require('../assets/images/BROCHES.jpg'),
  'burbujas': require('../assets/images/BURBUJAS.jpg'),
  'caballo': require('../assets/images/CABALLO.png'),
  'casco': require('../assets/images/CASCO.png'),
  'chapas': require('../assets/images/CHAPAS.jpg'),
  'cubos': require('../assets/images/CUBOS .jpg'),
  'letras': require('../assets/images/LETRAS.jpg'),
  'limpieza': require('../assets/images/LIMPIEZA.jpg'),
  'maracas': require('../assets/images/MARACAS.jpg'),
  'montura': require('../assets/images/MONTURA.png'),
  'palos': require('../assets/images/PALOS.jpg'),
  'pasto': require('../assets/images/PASTO.jpg'),
  'pelota': require('../assets/images/PELOTA.jpg'),
  'pelotaDePato': require('../assets/images/PELOTA DE PATO.jpg'),
  'riendas': require('../assets/images/RIENDAS.jpg'),
  'tarima': require('../assets/images/TARIMA.jpg'),
  'zanahoria': require('../assets/images/ZANAHORIA.jpg'),
}

function CardImage({ name, style }) {
  const source = images[name]
  return <Image source={source} style={style} />
}

CardImage.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}

export default CardImage
