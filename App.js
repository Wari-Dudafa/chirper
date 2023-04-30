import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import Homepage from './app/pages/Homepage';

export default function App() {
  return (
    <View>
      <StatusBar></StatusBar>
      <Homepage></Homepage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
