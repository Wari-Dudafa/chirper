import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { db, auth } from '../../firebaseConfig';
import Chirpbutton from '../components/Chirpbutton';
import Chirpcontainer from '../components/Chirpcontainer';

let currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

function Homepage( {navigation} ) {

  const [chirps, setChirps] = useState([]);
  const [reload, setReload] = useState();

  async function GetChirps(){

    let chirpContainer = [];
  
    const querySnapshot = await getDocs(collection(db, "chirps"));
    querySnapshot.forEach((allChirps) => {
      chirpContainer.push(allChirps.data())
    });
    
    setChirps(chirpContainer)
  }

  if (currentUser.displayName == null){
    useEffect(() => {
      navigation.navigate("Verifyuserpage")
    });
  }

  useEffect(() => {
    GetChirps()
  }, [reload]);

  const showChirps = () => {
    return chirps.map((chirp, index) => {
      return(
        <Chirpcontainer chirp={chirp.chirp}/>
      );
  });
  }

  return (
    <SafeAreaView>
      <ScrollView>
      <Button
        title='Reload'
        onPress={() => {setReload(!reload)}}
      ></Button>
        {showChirps()}
      </ScrollView>
      <Chirpbutton onPress={() => navigation.navigate("Chirppage")}></Chirpbutton>
    </SafeAreaView>
  );
}

export default Homepage;