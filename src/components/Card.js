import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ToastAndroid,
} from 'react-native'
import { DELETE_BACKGROUND_COLOR, PRIMARY_COLOR } from '../styles'
import { IconButton } from 'react-native-paper'
import PropTypes from 'prop-types'
import CardImage from '../components/CardImage'
import CardAudio from '../components/CardAudio'
import { Audio } from 'expo-av'
import { deleteCard, openDatabase } from '../model'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CARD_EDIT } from '../screens'

function Card({ id, title, image, audio, seCompleta, onDelete }) {
  const [marcada, setMarcada] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState(null)
  //Sound y setSound state los utilizo para manejar el pausado del sonido y el condicional del boton

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        handleStopAudio()
      }
    }, [sound]),
  )
  const navigation = useNavigation()
  const handleClick = () => {
    if (seCompleta) {
      if (!marcada) {
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

  const handleDeleteCard = () => {
    const db = openDatabase()
    deleteCard(db, id, () => {
      ToastAndroid.show('Tarjeta eliminada correctamente', ToastAndroid.SHORT)
      if (onDelete) onDelete() //mando a llamar el evento del padre
    })
  }
  const handleAudioPlay = async () => {
    try {
      if (!audio) return

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audio })
      setSound(newSound)
      await newSound.playAsync()
      setIsPlaying(true)

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          newSound.unloadAsync()
          setSound(null)
          setIsPlaying(false)
        }
      })
    } catch (err) {
      console.error('Error al reproducir audio:', err)
    }
  }

  const handleStopAudio = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync()
        if (status.isLoaded) {
          await sound.stopAsync()
          await sound.unloadAsync()
          setSound(null)
          setIsPlaying(false)
        }
      }
    } catch (err) {
      console.error('Error al detener audio:', err)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View key={id} style={[estiloTarjeta, styles.tarjeta]}>
        <Text style={styles.text}>{title.toUpperCase()}</Text>
        {marcada ? (
          <Image
            source={require('../assets/images/check.png')} // FIXME: A better way yo handle this constant
            style={styles.imageDone}
          />
        ) : (
          <View style={styles.imageContainer}>
            <View style={styles.iconsInLine}>
              <View style={{ flexDirection: 'row' }}>
                {audio.startsWith('file:///') ? (
                  !isPlaying ? (
                    <IconButton
                      icon="music"
                      size={30}
                      iconColor={PRIMARY_COLOR}
                      mode="contained"
                      onPress={handleAudioPlay}
                    />
                  ) : (
                    <IconButton
                      icon="pause"
                      size={30}
                      iconColor={PRIMARY_COLOR}
                      mode="contained"
                      onPress={handleStopAudio}
                    />
                  )
                ) : (
                  <IconButton disabled />
                )}
              </View>

              <View style={{ flexDirection: 'row' }}>
                {!seCompleta && (
                  <>
                    <IconButton
                      icon="delete"
                      size={30}
                      iconColor={DELETE_BACKGROUND_COLOR}
                      mode="contained"
                      onPress={() => handleDeleteCard(id)}
                    />
                    <IconButton
                      icon="pencil"
                      size={30}
                      iconColor={PRIMARY_COLOR}
                      mode="contained"
                      onPress={() => navigation.navigate(CARD_EDIT, { id })}
                    />
                  </>
                )}
              </View>
            </View>

            {/* El !seCompleta lo utilizo para que en la view de WorkView no aparezca el boton */}
            {/* Reutilizo el mismo flag */}

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
  onDelete: PropTypes.func,

  audio: PropTypes.string.isRequired,
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
    marginRight: 10,
  },
  tarjeta: {
    margin: 25,
    padding: 20,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  iconsInLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default Card
