import { createStackNavigator } from '@react-navigation/stack'
import Navigation from './Navigation'
import Tutorial from '../screens/Tutorial'
import EditCronograma from '../screens/EditCronograma'
import WorkView from '../screens/WorkView'
import DetailCronograma from '../screens/DetailCronograma'
import AddCronograma from '../screens/AddCronograma'
import HOME from '../screens/Home'

const Stack = createStackNavigator()

function StartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HOME" component={HOME} /> 
      <Stack.Screen name="CRONOS" component={Navigation} />
      <Stack.Screen name="Tutorial" component={Tutorial} /> 
      <Stack.Screen name="Editar" component={EditCronograma} /> 
      <Stack.Screen name="TRABAJAR" component={WorkView} />
      <Stack.Screen name="Informacion" component={DetailCronograma} /> 
      <Stack.Screen name="AddCronograma" component={AddCronograma} /> 
    </Stack.Navigator>
  )
}

export { StartStack }
