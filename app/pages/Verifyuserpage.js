import React, { useEffect, useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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

    const [name, setName] = useState("Test User")
    const [username, setUsername] = useState('TESTUSER')
    const [canSubmit, setCanSubmit] = useState(false)

    useEffect(() => {
        if(name.length > 1 && name != null){
            // Check if username already exists in the database
                // {code}

            // If it does
                // setCanSubmit(true)
        }
    },[username])

    if (canSubmit){
        submit = 
            <TouchableOpacity
                onPress={() => {
                VerifyUser(name, username, db, currentUser, auth)
                setName()
                setUsername()
            }}
            >
            <Text>Complete!</Text>
            </TouchableOpacity>
    } else if (username == null && username.length == 0){
        submit =
            <></>
    } else {
        submit =
            <Text>Username not available</Text>
    }

    return (
        <>
            <Text>Welcome to chirp</Text>
            <Text>You are almost done with the sign in process</Text>
            <Text>You just need a name your firends know you by</Text>
            <Text>A username to be your uique identifier</Text>
            <TextInput 
                style={{backgroundColor: 'red'}}
                placeholder='Name'
                value={name}
                onChangeText={setName}
            ></TextInput>
            <TextInput
                style={{backgroundColor: 'red'}}
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
            ></TextInput>
            {submit}
        </>
    );
}

const styles = StyleSheet.create({
    
})

export default Verifyuserpage;