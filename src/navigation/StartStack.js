import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Navigation from './Navigation'
import Tutorial from '../screens/Tutorial'
import EditCronograma from '../screens/EditCronograma'
import WorkView from '../screens/WorkView'
import DetailCronograma from '../screens/DetailCronograma'
import AddCronograma from '../screens/AddCronograma'

const Stack = createStackNavigator()

function StartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cronos" component={Navigation} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="Editar" component={EditCronograma} />
      <Stack.Screen name="Trabajar" component={WorkView} />
      <Stack.Screen name="Informacion" component={DetailCronograma} />
      <Stack.Screen name="AddCronograma" component={AddCronograma} />
    </Stack.Navigator>
  )
}

export { StartStack }
