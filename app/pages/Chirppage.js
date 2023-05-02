import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
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

  set(ref(db, 'chirps/' + currentUser.uid + "/" + chirpid), {
    chirp: chirp,
  });
}

function Chirppage( {navigation} ) {

  const [chirp, setChirp] = useState("");

  return (
    <>
      <View style={styles.buttoncontainer}>

        <TouchableOpacity
          style= {styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            AddData( chirp )
            setChirp("")
            navigation.goBack()
          }}

          style= {styles.button}
        >
          <Text style={styles.text}>Chirp</Text>
        </TouchableOpacity>

      </View>

      <View style= {styles.textinputcontainer}>
        <TextInput multiline={true} style={styles.textinput} placeholder="What's on your mind?" value={chirp} onChangeText={setChirp}></TextInput>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  button:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: '20%',
    backgroundColor: 'grey',
    margin: 10,
  },
  buttoncontainer:{
    flex:1,
    flexDirection: 'row',
  },
  textinput:{
    marginTop: 10,
    marginLeft: 10,
    color: 'black',
    fontSize: 30,

  },
  textinputcontainer:{
    backgroundColor:'slategrey',
    borderRadius: '20%',
    flex:10,
  },
  text:{
    textAlign: 'center',
    fontWeight: 'bold',
  }
})

export default Chirppage;