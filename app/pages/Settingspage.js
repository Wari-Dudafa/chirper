import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from '../../firebaseConfig';

let currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
    } else {
        currentUser = null;
    }
  });

function Settingspage( {navigation} ) {

    let completeSignUp;

    if (currentUser.displayName == null){
        completeSignUp =
            <TouchableOpacity
                onPress={() => navigation.navigate("Verifyuserpage")}
            >
                <Text>Complete sign up</Text>
            </TouchableOpacity>
    }

    return (
        <>
            <Text>Email: {currentUser.email}</Text>
            <Text>Name: {currentUser.displayName}</Text>
            <Text>User id: {currentUser.uid}</Text>
            
            <TouchableOpacity title='Sign out' onPress={() => {
                signOut(auth).then(() => {
                    // Sign-out successful.
                }).catch((error) => {
                    // An error happened.
                });
            }}>
                <Text>Sign out</Text>
            </TouchableOpacity>
            {completeSignUp}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text>Close</Text>
            </TouchableOpacity>
        </>
    );
}

export default Settingspage;