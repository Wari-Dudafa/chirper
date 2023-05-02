import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';

import { auth } from '../../firebaseConfig';

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
        <>
            <View style={{flex: 0.5, justifyContent: 'center', alignContent: 'center'}}>
                <SafeAreaView></SafeAreaView>
                <Text style={styles.maintext}>Chirper</Text>
            </View>
            <View style={styles.textinputcontainer}>
                <SafeAreaView></SafeAreaView>

                <View style={styles.textinput}>
                    <Text style={{fontSize: 25}}>Email: </Text>
                    <TextInput placeholder='Email' value={email} onChangeText={setEmail}></TextInput>
                </View>

                <View style={styles.textinput}>
                    <Text style={{fontSize: 25}}>Password: </Text>
                    <TextInput placeholder='Password' value={password} onChangeText={setPassword}></TextInput>
                </View>
            </View>

            <View style={styles.buttoncontainer}>
                <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                        createUserWithEmailAndPassword(auth, email, password)
                        setEmail()
                        setPassword()
                    }}>
                    <Text>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                        signInWithEmailAndPassword(auth, email, password)
                        setEmail()
                        setPassword()
                    }}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttons}
                >
                    <AntDesign name="google" size={24} color="black" />
                    <Text> Sign in with google</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}}></View>
            
        </>
    );
}

const styles = StyleSheet.create({
    maintext:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
    },
    textinputcontainer:{
        flex: 1,
    },
    textinput: {
        alignItems: 'center',
        borderRadius: "5%",
        margin: 10,
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center'

    },

    buttoncontainer:{
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: "5%",
        backgroundColor: 'grey',
        justifyContent: 'center',
        margin: 10,
        padding: 20,
    }
})

export default Signinpage;