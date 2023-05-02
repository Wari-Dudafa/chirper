import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { onAuthStateChanged, signOut } from "firebase/auth";
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

function Userpage(props) {
    return (
        <SafeAreaView>
            <Text>Email: {currentUser.email}</Text>
            <Button title='Sign out' onPress={() => {
                signOut(auth).then(() => {
                    // Sign-out successful.
                }).catch((error) => {
                    // An error happened.
                });
            }}></Button>
        </SafeAreaView>
    );
}

export default Userpage;