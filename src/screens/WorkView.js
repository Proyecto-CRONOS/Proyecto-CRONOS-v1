import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import CardList from '../components/CardList';

function WorkView({ navigation, route }) {
  const { id } = route.params;

  // Estado local para gestionar el estado de las tarjetas
  const [cardStatus, setCardStatus] = useState({});

  // Función para cambiar el estado de una tarjeta
  const toggleCardStatus = (cardId) => {
    setCardStatus((prevStatus) => ({
      ...prevStatus,
      [cardId]: prevStatus[cardId] === 'Pending' ? 'OK' : 'Pending',
    }));
  };

  return (
    <View>
      <Text>Perfil ID: {id}</Text>
      <CardList scheduleId={id} cardStatus={cardStatus} toggleCardStatus={toggleCardStatus} />
      <Button
        title="Ayuda"
        onPress={() => navigation.navigate('Informacion')}
      />
    </View>
  );
}

WorkView.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default WorkView;
