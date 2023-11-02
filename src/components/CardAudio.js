import { useState } from 'react'
import { Audio } from 'expo-av'

export default function CardAudio() {
  const [sound, setSound] = useState(null)

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audios/RELINCHO.mp3')
    )
    setSound(sound)
    await sound.playAsync()
  }

  return {
    playSound,
    sound,
  }
}