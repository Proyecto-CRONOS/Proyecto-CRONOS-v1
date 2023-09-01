import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CronogramasScreen from '../screens/CronogramasScreen';
import AddCronogramaScreen from '../screens/AddCronogramaScreen';
import CardsScreen from '../screens/CardsScreen';
import AddCardScreen from '../screens/AddCardScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Cronogramas" component={CronogramasScreen} />
        <Tab.Screen name="Agregar Paciente" component={AddCronogramaScreen} />
        <Tab.Screen name="Tarjetas" component={CardsScreen} />
        <Tab.Screen name="Agregar Tarjeta" component={AddCardScreen} />
    </Tab.Navigator>
  );
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