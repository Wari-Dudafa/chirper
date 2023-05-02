import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { onAuthStateChanged } from "firebase/auth";
import { Feather } from '@expo/vector-icons';

import { auth } from './firebaseConfig';
import Homepage from './app/pages/Homepage';
import Signinpage from './app/pages/Signinpage';
import Chirppage from './app/pages/Chirppage';
import Userpage from './app/pages/Userpage';
import Messagespage from './app/pages/Messagespage';
import Notificationspage from './app/pages/Notificationspage';
import Searchpage from './app/pages/Searchpage';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Drawerrootpage(props) {
  // Crashes whenever I use this
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Homepage" component={Homepage} />
      <Drawer.Screen name="Userpage" component={Userpage} />
    </Drawer.Navigator>
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
          initialRouteName="Homepage"
          screenOptions={{
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Homepage"
            component={Homepage}
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
            name="Messagespage"
            component={Messagespage}
            options={{
              title: "Messages",
              tabBarIcon: () => (
                <Feather name="mail" size={24} color="black" />
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