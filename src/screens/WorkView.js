import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import CardList from '../components/CardList';

export default function WorkView({navigation , route }) {

  const { profileId } = route.params;

  return (
    <View>
      <Text>Perfil ID: {profileId}</Text>
      <CardList profileId={profileId} />
      <Button
            title="Ayuda"
            onPress={() => navigation.navigate('Informacion')}
        />
    </View>
  )
}

const styles = StyleSheet.create({})