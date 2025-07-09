import { useState } from 'react'
import { Audio } from 'expo-av'
import relinchoSound from '../assets/audios/relincho.mp3'

export default function CardAudio() {
  const [sound, setSound] = useState(null)

  const playSound = async () => {
    // const { sound } = await Audio.Sound.createAsync(
    //   require('../assets/audios/relincho.mp3'), // FIXME: A better way yo handle this constant
    // )
    const { sound } = await Audio.Sound.createAsync(relinchoSound)
    setSound(sound)
    await sound.playAsync()
  }

  return {
    playSound,
    sound,
  }
}
