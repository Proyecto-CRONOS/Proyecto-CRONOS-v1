import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'

const images = {
  aros: require('../assets/images/AROS.jpg'),
  arreador: require('../assets/images/ARREADOR.jpg'),
  bajomontura: require('../assets/images/BAJOMONTURA.jpg'), // modifico nombre foto por error al mostrar la imagen
  bandera: require('../assets/images/BANDERA.jpg'),
  bozal: require('../assets/images/BOZAL.jpg'),
  broches: require('../assets/images/BROCHES.jpg'),
  caballo: require('../assets/images/CABALLO.jpg'),
  cabezada: require('../assets/images/CABEZADA.jpg'),
  casco: require('../assets/images/CASCO.jpg'),
  cepillo: require('../assets/images/CEPILLO.jpg'),
  conos: require('../assets/images/CONOS.jpg'),
  cuerda: require('../assets/images/CUERDA.jpg'),
  escarbavasos: require('../assets/images/ESCARBAVASOS.jpg'), // modifico nombre foto por error al mostrar la imagen
  fusta: require('../assets/images/FUSTA.jpg'),
  limpieza: require('../assets/images/LIMPIEZA.jpg'),
  matra: require('../assets/images/MATRA.jpg'),
  montura: require('../assets/images/MONTURA.jpg'),
  monturin: require('../assets/images/MONTURIN.jpg'),
  palenque: require('../assets/images/PALENQUE.jpg'),
  pasto: require('../assets/images/PASTO.jpg'),
  pelotadepato: require('../assets/images/PELOTADEPATO.jpg'), // modifico nombre foto por error al mostrar la imagen
  pelotas: require('../assets/images/PELOTAS.jpg'),
  picadero: require('../assets/images/PICADERO.jpg'),
  pistadeadiestramiento: require('../assets/images/PISTADEADIESTRAMIENTO.jpg'),  // modifico nombre foto por error al mostrar la imagen
  rampa: require('../assets/images/RAMPA.jpg'),
  rasqueta: require('../assets/images/RASQUETA.jpg'),
  riendas: require('../assets/images/RIENDAS.jpg'),
  sombreritos: require('../assets/images/SOMBRERITOS.jpg'),
  sudadera: require('../assets/images/SUDADERA.jpg'),
  tambor: require('../assets/images/TAMBOR.jpg'),
  termine: require('../assets/images/TERMINE.jpg'),
  tranquera: require('../assets/images/TRANQUERA.jpg'),
  vallas: require('../assets/images/VALLAS.jpg'),
  zanahoria: require('../assets/images/ZANAHORIA.jpg'),
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
