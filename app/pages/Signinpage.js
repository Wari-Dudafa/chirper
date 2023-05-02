import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { db, auth } from '../../firebaseConfig';

let currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
    } else {
        currentUser = null;
    }
});

function Signinpage(props) {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });



    const [email, setEmail] = useState("phil@gmail.com")
    const [password, setPassword] = useState("23132132131231")

    return (
        <SafeAreaView>
            <TextInput placeholder='Email' value={email} onChangeText={setEmail}></TextInput>
            <TextInput placeholder='Password' value={password} onChangeText={setPassword}></TextInput>
            <Button title='Sign up' onPress={() => {
                createUserWithEmailAndPassword(auth, email, password)
                setEmail()
                setPassword()
            }}></Button>
            <Button title='Login' onPress={() => {
                signInWithEmailAndPassword(auth, email, password)
                setEmail()
                setPassword()
            }}></Button>
            <Button title='Sign in with google'></Button>
        </SafeAreaView>
    );
}

export default Signinpage;