import React from 'react'
import { Image, StyleSheet, SafeAreaView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'

import { LinearGradient } from 'expo-linear-gradient'
import { NAVIGATION } from '../screens'
import {
  PRIMARY_BUTTON_COLOR,
  STYLES,
  LINEAR_GRADIENT_BACKGROUND,
} from '../styles'
import { LOGIN } from '../strings'

function Home() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={STYLES.safeAreaView}>
      <LinearGradient
        style={STYLES.linearGradient}
        colors={LINEAR_GRADIENT_BACKGROUND}
      >
        <View style={styles.container}>
          <Image
            source={require('../assets/images/branding/logo.png')} // FIXME: A better way yo handle this constant
            style={styles.logo}
            resizeMode="cover"
          />
          <View style={styles.buttonContainer}>
            <Button
              style={STYLES.button}
              buttonColor="#FFFFFF"
              textColor={PRIMARY_BUTTON_COLOR}
              onPress={() => navigation.navigate(NAVIGATION)}
            >
              {LOGIN}
            </Button>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/branding/cedica.png')} // FIXME: A better way yo handle this constant
              style={styles.image}
            />
            <View style={styles.separator}></View>
            <Image
              source={require('../assets/images/branding/info.png')} // FIXME: A better way yo handle this constant
              style={styles.image}
            />
            <View style={styles.separator}></View>
            <Image
              source={require('../assets/images/branding/unlp.png')} // FIXME: A better way yo handle this constant
              style={styles.image}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
  },
  logo: {
    width: 225,
    height: 450,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: 90,
    height: 90,
  },
  separator: {
    width: 1,
    backgroundColor: '#FFF',
    height: 50,
    marginLeft: 15,
    marginRight: 15,
  },
})

export default Home
