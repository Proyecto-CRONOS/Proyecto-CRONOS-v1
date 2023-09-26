import React from 'react'
import { View, Image, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient'

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(207,226,136)', 'rgb(45,105,129)']}
        style={styles.gradientContainer}
      >
        <Image
          source={require('../assets/images/identidad/logo.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Ingresar"
            color="#2D6981"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => navigation.navigate('Cronos')}
          />
          <Button
            title="Tutorial"
            color="#2D6981"
            onPress={() => navigation.navigate('Tutorial')}
          />
        </View>
      </LinearGradient>
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
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
})

export default Home
