import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";

import { auth } from "../../firebaseConfig";

function Signinpage(props) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Setup new user with some sort of furthur sign up page
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  const [email, setEmail] = useState("testuser@gmail.com");
  const [password, setPassword] = useState("testuserpassword");

  return (
    <>
      <View style={styles.maintextcontainer}>
        <SafeAreaView></SafeAreaView>
        <Text style={styles.maintext}>Chirper</Text>
      </View>

      <View style={styles.textinputcontainer}>
        <SafeAreaView></SafeAreaView>

        <View style={styles.textinput}>
          <TextInput
            style={styles.text}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>

        <View style={styles.textinput}>
          <TextInput
            style={styles.text}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          ></TextInput>
        </View>
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            if (email != null && password != null) {
              createUserWithEmailAndPassword(auth, email, password);
              setEmail();
              setPassword();
            }
          }}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            if (email != null && password != null) {
              signInWithEmailAndPassword(auth, email, password);
              setEmail();
              setPassword();
            }
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons}>
          <AntDesign name="google" size={24} color="black" />
          <Text> Sign in with google </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.5 }}></View>
    </>
  );
}

const styles = StyleSheet.create({
  maintextcontainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  maintext: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 60,
  },
  text: {
    flex: 1,
    fontSize: 25,
    marginLeft: 10,
  },
  textinputcontainer: {
    flex: 0.8,
  },
  textinput: {
    alignItems: "center",
    borderRadius: "5%",
    margin: 10,
    flex: 1,
    backgroundColor: "slategrey",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttoncontainer: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "5%",
    backgroundColor: "slategrey",
    justifyContent: "center",
    margin: 10,
    padding: 20,
  },
});

export default Signinpage;
