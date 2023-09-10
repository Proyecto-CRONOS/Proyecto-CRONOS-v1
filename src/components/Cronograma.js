import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function Cronograma({ name, navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.rowContainer}>
            <Text>{name}</Text>
            <Button
                title="Editar"
                onPress={() => navigation.navigate('Editar')}
            />
            <Button
                title="Ver"
                onPress={() => navigation.navigate('Trabajar')}
            />
        </View>    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})