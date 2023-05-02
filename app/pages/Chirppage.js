import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, push, child } from "firebase/database";

import { db, auth } from '../../firebaseConfig';

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

function AddData(chirp) {
  const chirpid = push(child(ref(db), currentUser.uid)).key;
  console.log(chirpid);

  set(ref(db, 'chirps/' + currentUser.uid + "/" + chirpid), {
    chirp: chirp,
  });
}

function Chirppage(props) {

  const [chirp, setChirp] = useState("");

  return (
    <SafeAreaView>
      <TextInput placeholder='chirp' value={chirp} onChangeText={setChirp}></TextInput>
      <Button title='Chirp!' onPress={() => {
        AddData( chirp )
        setChirp("")
      }}></Button>
    </SafeAreaView>
  );
}

export default Chirppage;