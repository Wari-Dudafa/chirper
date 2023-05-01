import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput } from 'react-native';
import { ref, set } from "firebase/database";
import { db } from '../../firebaseConfig';

let userid = "1/";

function AddData(chirp) {

  set(ref(db, 'chirps/' + userid ), {
    chirp: chirp,
  });
}

function Homepage(props) {

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

export default Homepage;