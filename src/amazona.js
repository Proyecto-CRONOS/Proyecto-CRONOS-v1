import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, useWindowDimensions, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';


const data = [
  {
    id: 1,
    title: "Aro",
    imageUrl: require('../assets/ARO.jpg'),
  },
  {
    id: 2,
    title: "Broches",
    imageUrl: require('../assets/BROCHES.jpg'),
  },
  {
    id: 3,
    title: "Burbujas ",
    imageUrl: require('../assets/BURBUJAS.jpg'),
  },
  {
    id: 4,
    title: "Caballo ",
    imageUrl: require('../assets/CABALLO.png'),
  },
  {
    id: 5,
    title: "Pasto ",
    imageUrl: require('../assets/PASTO.jpg'),
  },
  {
    id: 6,
    title: "Tarima ",
    imageUrl: require('../assets/TARIMA.jpg'),
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

  return (
    <LinearGradient
      colors={['rgb(219,226,133)', 'rgb(61,111,140)']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.Text2}>CRONOS </Text>
        {isHorizontal ? (
          <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer} showsHorizontalScrollIndicator={false}>
            {data.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />
                </View>
                <Text style={styles.Text}>{item.title}</Text>
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
                <Text style={styles.Text}>{item.title}</Text>
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
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
  Text: {
    fontSize: 25,
    paddingTop: 6,
  },
  Text2: {
    fontSize: 25,
    paddingTop: 6,
    color: "#f1f2f6",
    display: 'flex',
  },
});








