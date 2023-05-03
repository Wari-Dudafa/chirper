import React, { useEffect, useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert , View, ScrollView } from 'react-native';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { db, auth } from '../../firebaseConfig';

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

async function VerifyUser(name, username, db, currentUser, auth) {
    username = username.toLowerCase()

    try {
      const docRef = await setDoc(doc(db, "users", currentUser.uid), {
        name: name,
        username: username,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    try {
      const docRef = await setDoc(doc(db, "usernames", username), {
        userid: currentUser.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    updateProfile(currentUser, {displayName: name}).then(() => {
        Alert.alert("Sign up process complete, you can close this page")
    })
  
}

function Verifyuserpage(props) {

  let submit;

  const [name, setName] = useState("Name")
  const [username, setUsername] = useState('Username')
  const [canSubmit, setCanSubmit] = useState(true) // When verification logic is setup- this shoudld be a false

  useEffect(() => {
    // Check if username is available
    // If it is, set username to false

    let exists = true

    if(!exists){
      setCanSubmit(true)
    }
  },[username])

  if (canSubmit){
      submit = 
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.button}  
            onPress={() => {
              VerifyUser(name, username, db, currentUser, auth)
              setName()
              setUsername()
          }}
          >
          <Text style={{textAlign: 'center', fontSize: 30}}>Complete!</Text>
          </TouchableOpacity>
        </View>
  } else if (username == null || username.length == 0){
      submit =
          <View style={styles.buttoncontainer}></View>
  } else {
      submit =
        <View style={styles.messagecontainer}>
          <Text style={styles.message}>Username not available</Text>
        </View>
  }

  return (
      <>
        <ScrollView style={styles.textcontainer}>
          <Text style={styles.text}>Welcome to chirp!</Text>
          <Text style={styles.text}>Good news, you are almost done with the sign in process!</Text>
          <Text style={styles.text}>You just need a name your firends know you by!</Text>
          <Text style={styles.text}>And a username to be your unique identifier</Text>
        </ScrollView>

        <View  style={styles.textinputcontainer}>
          <TextInput 
            style={styles.textinput}
            placeholder='Name'
            value={name}
            onChangeText={setName}
          ></TextInput>
          <TextInput
            style={styles.textinput}
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
          ></TextInput>
        </View>

        {submit}
      </>
  );
}

const styles = StyleSheet.create({
  textcontainer: {
    marginTop: 10,
    flex: 1,

  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 20,
  },
  textinputcontainer: {
    flex: 1,
  },
  textinput: {
    backgroundColor: 'slategrey',
    borderRadius: 5,
    flex: 1,
    margin: 10,
    fontSize: 30,
    paddingLeft: 10,
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'grey',
    padding: 20,
  },
  buttoncontainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 30
  },
  message: {
    textAlign: 'center',
    fontSize: 50,
  },
  messagecontainer: {
    backgroundColor: "grey",
    flex: 0.7,
  },
    
})

export default Verifyuserpage;