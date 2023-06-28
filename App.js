import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, } from 'react-native';
import React from 'react';
import Amazona from './src/amazona';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Amazona />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
