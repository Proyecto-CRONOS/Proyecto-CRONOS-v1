import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AllCronogramas from '../screens/AllCronogramas'
import AddCronograma from '../screens/AddCronograma'
import AllCards from '../screens/AllCards'
import AddCard from '../screens/AddCard'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cronogramas" component={AllCronogramas} />
      <Tab.Screen name="Crear Cronograma" component={AddCronograma} />
      <Tab.Screen name="Tarjetas" component={AllCards} />
      <Tab.Screen name="Crear Tarjeta" component={AddCard} />
    </Tab.Navigator>
  )
}

/* <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Amazona" component={Amazona} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  }); */
