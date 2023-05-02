import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

function Chirpbutton(props) {
    return (
        <TouchableOpacity style={styles.chirpbutton}>
            <Feather name="plus" size={34} color="black" />
        </TouchableOpacity>
    );
}

export default Chirpbutton;

const styles = StyleSheet.create({
    chirpbutton :{
        position: 'absolute',
        backgroundColor: "grey",
        borderRadius: "50%",
        padding: 20,
        top: 585,
        right: 10,
    }
    
})