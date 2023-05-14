import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

function Chirpbutton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.chirpbutton}>
      <Feather name="plus" size={34} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chirpbutton: {
    position: "absolute",
    backgroundColor: "slategrey",
    borderRadius: "50%",
    padding: 20,
    top: 585,
    right: 10,
  },
});

export default Chirpbutton;
