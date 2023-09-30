import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

function Card({ id, title, image, status }) {
  const cardStyles = {
    backgroundColor: status === 'OK' ? 'gray' : 'white',
  };

  const titleStyles = {
    ...styles.text,
    color: status === 'OK' ? 'white' : 'black',
  };

  return (
    <View style={{ ...styles.itemContainer, ...cardStyles }}>
      <Text style={{ ...titleStyles }}>{status === 'OK' ? 'Completado' : title}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
  },
  itemContainer: {
    margin: 25,
    padding: 20,
    borderRadius: 25,
  },
  imageContainer: {
    marginTop: 10,
  },
});

export default Card;
