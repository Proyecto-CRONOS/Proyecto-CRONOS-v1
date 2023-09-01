import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, useWindowDimensions, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const data = [
  {
    id: 1,
    title: "Aro",
    imageUrl: require('../assets/images/ARO.jpg'),
  },
  {
    id: 2,
    title: "Broches",
    imageUrl: require('../assets/images/BROCHES.jpg'),
  },
  {
    id: 3,
    title: "Burbujas ",
    imageUrl: require('../assets/images/BURBUJAS.jpg'),
  },
  {
    id: 4,
    title: "Caballo ",
    imageUrl: require('../assets/images/CABALLO.png'),
  },
  {
    id: 5,
    title: "Pasto ",
    imageUrl: require('../assets/images/PASTO.jpg'),
  },
  {
    id: 6,
    title: "Tarima ",
    imageUrl: require('../assets/images/TARIMA.jpg'),
  },
];

export default function Amazona() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsHorizontal(width > height);
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => subscription.remove();
  }, []);

  const [fontsLoaded] = useFonts({
    'Roboto': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['rgb(219,226,133)', 'rgb(61,111,140)']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        {isHorizontal ? (
          <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer} showsHorizontalScrollIndicator={false}>
            {data.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />
                </View>
                <LinearGradient
                  colors={['rgb(61,111,140)', 'rgb(165,199,61)']}
                  style={styles.textContainer}
                >
                  <Text style={styles.Text}>{item.title}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            {data.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />
                </View>
                <LinearGradient
                  colors={['rgb(219,226,133)', 'rgb(61,111,140)']}
                  style={styles.textContainer}
                >
                  <Text style={styles.Text}>{item.title}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  /* gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
  },
  scrollViewContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#70aaff",
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  Text: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: '#fff',
  },
  Text2: {
    fontFamily: 'Roboto',
    fontSize: 25,
    paddingTop: 1,
    color: "#f1f2f6",
    display: 'flex',
    
  }, */
});