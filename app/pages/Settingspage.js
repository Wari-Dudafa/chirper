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
    return (
        <>
            <Text>Email: {currentUser.email}</Text>
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
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text>Close</Text>
            </TouchableOpacity>
        </>
    );
}

export default Settingspage;