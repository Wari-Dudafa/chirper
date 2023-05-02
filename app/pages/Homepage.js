import React from 'react';
import { View } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../../firebaseConfig';
import Chirpbutton from '../components/Chirpbutton';
import Settingsbutton from '../components/Settingsbutton';

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

function Homepage( {navigation} ) {

  return (
    <View>
      <Settingsbutton onPress={() => navigation.navigate("Settingspage")}></Settingsbutton>
      <Chirpbutton onPress={() => navigation.navigate("Chirppage")}></Chirpbutton>
    </View>
  );
}

export default Homepage;