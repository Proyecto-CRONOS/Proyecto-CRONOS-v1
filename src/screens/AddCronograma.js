import React from 'react'
import { View } from 'react-native'
import CronogramaForm from '../components/CronogramaForm';

function AddCronograma({navigation}) {
  return (
    <View>
      <CronogramaForm navigation={navigation}/>
    </View>
  )
}

export default AddCronograma
