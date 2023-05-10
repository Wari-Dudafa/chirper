import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from "firebase/auth";
import { Feather } from '@expo/vector-icons';

import { auth } from './firebaseConfig';
import Homepage from './app/pages/Homepage';
import Signinpage from './app/pages/Signinpage';
import Chirppage from './app/pages/Chirppage';
import Settingspage from './app/pages/Settingspage';
import Myprofilepage from './app/pages/Myprofilepage';
import Notificationspage from './app/pages/Notificationspage';
import Searchpage from './app/pages/Searchpage';
import Verifyuserpage from './app/pages/Verifyuserpage';
import Replypage from './app/pages/Replypage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Chirpstack(){
  return (
    <Stack.Navigator initialRouteName='Homepage' screenOptions={{headerShown: false}}>
      <Stack.Screen
        name='Homepage'
        component={Homepage}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
        name='Chirppage'
        component={Chirppage}
        />
        <Stack.Screen
        name='Replypage'
        component={Replypage}
        />
        <Stack.Screen
        name='Settingspage'
        component={Settingspage}
        />
        <Stack.Screen
        name='Verifyuserpage'
        component={Verifyuserpage}
        />
      </Stack.Group>
    
    </Stack.Navigator>
  );
}

function LoggedIn(){

  const [loggedIn, setLoggedIn] = useState()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      console.log("Logged in");

    } else {
      setLoggedIn(false)
      console.log("Logged out");

    }
  });

  if (loggedIn){
    // Return logged in UI
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Chirpstack"
          screenOptions={{
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Chirpstack"
            component={Chirpstack}
            options={{
              title: "Chirper",
              tabBarIcon: () => (
                <Feather name="home" size={24} color="black" />
              ),
            }}
          />

          <Tab.Screen
            name="Searchpage"
            component={Searchpage}
            options={{
              title: "Search",
              headerShown: false,
              tabBarIcon: () => (
                <Feather name="search" size={24} color="black" />
              ),
            }}
          />

          <Tab.Screen
            name="Notificationspage"
            component={Notificationspage}
            options={{
              title: "Notifications",
              tabBarIcon: () => (
                <Feather name="bell" size={24} color="black" />
              ),
            }}
          />

          <Tab.Screen
            name="Myprofilepage"
            component={Myprofilepage}
            options={{
              title: "My profile",
              tabBarIcon: () => (
                <Feather name="user" size={24} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    // Return not logged in UI
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