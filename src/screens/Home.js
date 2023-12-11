import React from 'react'
import { View, Image, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'
import { NAVIGATION } from '../screens'
import {
  BACKGROUND_GRADIENT_1,
  BACKGROUND_GRADIENT_2,
  PRIMARY_BUTTON_COLOR,
} from '../styles'
import { LOGIN } from '../strings'

function Home() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[BACKGROUND_GRADIENT_1, BACKGROUND_GRADIENT_2]}
        style={styles.gradientContainer}
      >
        <Image
          source={require('../assets/images/identidad/logo.png')} // FIXME: A better way yo handle this constant
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.buttonContainer}>
          <Button
            title={LOGIN}
            color={PRIMARY_BUTTON_COLOR}
            accessibilityLabel="Learn more about this purple button"
            onPress={() => navigation.navigate(NAVIGATION)}
          />
        </View>
        <View >
          <Image
            source={require('../assets/images/identidad/cedica_info.png')} // FIXME: A better way yo handle this constant
            style={styles.imageHome}
          />
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 70,
    color: '#000',
  },
  image: {
    width: 300,
    height: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  imageHome: {
    width: 410,
    height: 60,
    marginTop: 20,
  },
})

export default Home
