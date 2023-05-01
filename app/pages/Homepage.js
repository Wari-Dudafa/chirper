import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, push, child } from "firebase/database";

import { db, auth } from '../../firebaseConfig';

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("H: Logged in");
  } else {
    currentUser = null;
    console.log("H: Logged out");
  }
});

function Homepage(props) {

  return (
    <SafeAreaView>

    </SafeAreaView>
  );
}

export default Homepage;