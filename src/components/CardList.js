import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { openDatabase, getScheduleCards } from '../model';
import Card from './Card';

function CardList({ scheduleId, cardStatus, toggleCardStatus }) {
  const [cards, setCards] = React.useState([]);

  const isHorizontal = false;

  useEffect(() => {
    const db = openDatabase();
    if (scheduleId) {
      getScheduleCards(db, scheduleId, setCards);
    }
  }, []);

  const [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['rgb(219,226,133)', 'rgb(61,111,140)']} style={styles.gradientContainer}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal={isHorizontal}
          contentContainerStyle={styles.scrollViewContainer}
          showsHorizontalScrollIndicator={!isHorizontal}
          showsVerticalScrollIndicator={isHorizontal ? false : true}
        >
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardContainer}
              onPress={() => toggleCardStatus(card.id)}
            >
              <Card {...card} status={cardStatus[card.id] || 'Pending'} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
  );
}

CardList.propTypes = {
  scheduleId: PropTypes.number,
  cardStatus: PropTypes.object.isRequired,
  toggleCardStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    margin: 25,
  },
});

export default CardList;
