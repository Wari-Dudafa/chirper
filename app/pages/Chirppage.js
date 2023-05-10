import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 

import { db, auth } from '../../firebaseConfig';

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

function Chirppage( {navigation} ) {
  
  const [chirp, setChirp] = useState()
  
  async function AddChirp(chirp, db, currentUser) {
    if (chirp.length > 250){
      Alert.alert('Chirp is too long')
      return
    }
    try {
      date = new Date();
      const docRef = await addDoc(collection(db, "chirps"), {
        chirp: chirp,
        userid: currentUser.uid,
        likecount: 0,
        chirptime: date.getTime(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  const characterCounter = () => {
    let colour = 'green'
    if (chirp == null){
      return
    } else{
      if (chirp.length > 250){
        colour = 'red'
        return (
          <Text style={{paddingLeft: 5, color: colour}}>{chirp.length}</Text>
        )
      } else {
        return (
          <Text style={{paddingLeft: 5, color: colour}}>{chirp.length}</Text>
        )
      }
    }
  }

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
            AddChirp(chirp, db, currentUser)
            setChirp()
            navigation.goBack()
          }}

          style= {styles.button}
        >
          <Text style={styles.text}>Chirp</Text>
        </TouchableOpacity>

      </View>

      <View style= {styles.textinputcontainer}>
        <TextInput multiline={true} style={styles.textinput} placeholder="What's on your mind?" value={chirp} onChangeText={setChirp}></TextInput>
        {characterCounter()}
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
    marginLeft: 5,
    marginRight: 5,
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