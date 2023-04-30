import React, { useState } from 'react';
import { SafeAreaView, Button, TextInput } from 'react-native';
import { ref, set, onValue } from "firebase/database";
import { db } from '../../firebaseConfig';

const users = ref(db, 'users/');
let data;

function AddData(userId, name, email) {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}

onValue(users, (snapshot) => {
  data = snapshot.val();
});

function Homepage(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    return (
        <SafeAreaView>
            <TextInput placeholder='Name' value={name} onChangeText={setName}></TextInput>
            <TextInput placeholder='Email' value={email} onChangeText={setEmail}></TextInput>
            <Button title='Add data' onPress={() => {
                AddData( data.length,  name, email )
                setName("")
                setEmail("")
            }}></Button>
        </SafeAreaView>
    );
}

export default Homepage;