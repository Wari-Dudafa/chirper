import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from './firebaseConfig';
import Homepage from './app/pages/Homepage';
import Signinpage from './app/pages/Signinpage';
import Chirppage from './app/pages/Chirppage';
import Userpage from './app/pages/Userpage';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

function LoggedIn(){

  const [loggedIn, setLoggedIn] = useState()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      console.log("A: Logged in");

    } else {
      setLoggedIn(false)
      console.log("A: Logged out");

    }
  });

  if (loggedIn){
    // Return not logged in ui
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Homepage">
          <Tab.Screen
            name="Homepage"
            component={Homepage}
          />

          <Tab.Screen
            name="Chirppage"
            component={Chirppage}
          />

          <Tab.Screen
            name="Userpage"
          component={Userpage}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    // Return logged in UI
    return (
      <Signinpage></Signinpage>
    );
  }
}



export default function App() {

  return (
    <>
      <StatusBar></StatusBar>
      <LoggedIn></LoggedIn>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
