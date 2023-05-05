import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from '../../firebaseConfig';
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
    <SafeAreaView>
      <Chirpbutton onPress={() => navigation.navigate("Chirppage")}></Chirpbutton>
    </SafeAreaView>
  );
}

export default Homepage;