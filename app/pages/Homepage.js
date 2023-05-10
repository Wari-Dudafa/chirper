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
    var today = new Date()  

    return chirps.map((chirp, index) => {
      let name = "Name"
      let username = '@username'

      return(
        <Chirpcontainer 
          key ={index}
          chirp={chirp.chirp}
          name={name}
          username={username}
          time={chirp.chirptime}
          today={today.getTime()}
          onLike={() => console.log('liked')}
          onReply={() => navigation.navigate("Replypage")}
        />
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