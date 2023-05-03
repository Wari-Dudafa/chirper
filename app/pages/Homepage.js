import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../../firebaseConfig';
import Chirpbutton from '../components/Chirpbutton';

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

function Homepage( {navigation} ) {

  if (currentUser.displayName == null){
    useEffect(() => {
      navigation.navigate("Verifyuserpage")
    });
  }

  return (
    <View>
      <Chirpbutton onPress={() => navigation.navigate("Chirppage")}></Chirpbutton>
    </View>
  );
}

export default Homepage;