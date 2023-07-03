import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {
  const handleImagePress = () => {
    navigation.navigate('Amazona');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(219,226,133)', 'rgb(61,111,140)']}
        style={styles.gradientContainer}
      >
        <Text style={styles.text}>BIENVENIDX</Text>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={require('../assets/LOGOcronos.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

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
    height: 400,
  },
});

export default Home;

