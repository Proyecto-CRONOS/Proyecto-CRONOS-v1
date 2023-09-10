import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StartStack } from './src/navigation/StartStack';

export default function App() {
  return (
    <NavigationContainer>
      <StartStack/>
    </NavigationContainer>
  );
}
